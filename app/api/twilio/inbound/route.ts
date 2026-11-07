import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const xml = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

function twiml(status = 200) {
  return new NextResponse(xml, { status, headers: { "Content-Type": "text/xml; charset=utf-8", "Cache-Control": "no-store" } });
}

function validateTwilioRequest(request: Request, params: URLSearchParams): boolean {
  const token = process.env.TWILIO_AUTH_TOKEN;
  // Set this to the exact public HTTPS webhook URL configured in Twilio.
  // Never derive signature validation URL from untrusted forwarded headers.
  const url = process.env.TWILIO_INBOUND_WEBHOOK_URL;
  const signature = request.headers.get("x-twilio-signature");
  if (!token || !url || !url.startsWith("https://") || !signature) return false;
  const values = Array.from(params.entries());
  if (new Set(values.map(([key]) => key)).size !== values.length) return false;
  const signed = url + values.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
    .map(([key, value]) => key + value).join("");
  const expected = createHmac("sha1", token).update(signed).digest();
  let provided: Buffer;
  try { provided = Buffer.from(signature, "base64"); } catch { return false; }
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

function phoneNumber(value: string): string | null {
  // US SMS scope only.
  return /^\\+1[2-9]\\d{9}$/.test(value) ? value : null;
}

/**
 * Draft inbound Twilio endpoint. This does not activate a Twilio webhook;
 * it must be deployed and configured after controlled tests.
 * Twilio already handles STOP/HELP/START auto-responses. Return empty TwiML
 * to avoid duplicate replies.
 */
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/x-www-form-urlencoded")) {
    return new NextResponse("Unsupported content type", { status: 415 });
  }
  const raw = await request.text();
  if (raw.length > 16384) return new NextResponse("Request too large", { status: 413 });
  const params = new URLSearchParams(raw);
  if (!validateTwilioRequest(request, params)) return new NextResponse("Unauthorized", { status: 403 });

  const eventKind = (params.get("OptOutType") || params.get("Body") || "").trim().toUpperCase();
  const messageSid = params.get("MessageSid") || params.get("SmsMessageSid");
  const phone = phoneNumber(params.get("From") || "");
  if (!phone || !messageSid || !/^SM[a-f0-9]{32}$/i.test(messageSid)) {
    return new NextResponse("Invalid message", { status: 400 });
  }

  // The fallback recognizes the basic STOP keywords if Advanced Opt-Out is off.
  // Twilio is responsible for customer-facing opt-out and help replies.
  const stopWords = new Set(["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT", "REVOKE", "OPTOUT"]);
  if (eventKind !== "STOP" && !stopWords.has(eventKind)) return twiml();

  try {
    for (const program of ["express_parking", "velor_service"] as const) {
      await supabaseRequest("sms_consent_events?on_conflict=idempotency_key", {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
        body: JSON.stringify({
          customer_phone: phone,
          source_form: "twilio_webhook",
          program,
          action: "opt_out",
          disclosure_version: "twilio-inbound-stop-v1",
          disclosure_text: "Customer sent STOP or an opt-out keyword to the Twilio messaging number.",
          service_reference: messageSid,
          idempotency_key: `twilio:stop:${messageSid}:${program}`,
          channel: "twilio_webhook",
        }),
      });
    }
  } catch (error) {
    console.error("Unable to persist Twilio SMS opt-out", error);
    // Twilio can retry, and outbound SMS MUST independently check opt-outs.
    return new NextResponse("Temporary error", { status: 503 });
  }

  return twiml();
}
