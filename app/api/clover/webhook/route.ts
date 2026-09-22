import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function validSignature(header: string, rawBody: string, secret: string) {
  const values = Object.fromEntries(header.split(",").map((part) => part.trim().split("=")));
  if (!values.t || !values.v1 || !/^\d+$/.test(values.t)) return false;
  const timestamp = Number(values.t);
  if (Math.abs(Date.now() / 1000 - timestamp) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${values.t}.${rawBody}`).digest("hex");
  const actualBuffer = Buffer.from(values.v1, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

type SessionMatch = { id: string };
type ExtensionMatch = { id: string; parking_session_id: string; new_expires_at: string };

export async function POST(request: Request) {
  try {
    const secret = process.env.CLOVER_WEBHOOK_SECRET;
    const signature = request.headers.get("clover-signature") || "";
    const rawBody = await request.text();
    if (!secret || !validSignature(signature, rawBody, secret)) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

    const event = JSON.parse(rawBody);
    const data = event.Data ?? event.data;
    const checkoutSessionId = String(typeof data === "string" ? data : data?.checkoutSessionId ?? data?.checkout_session_id ?? event.checkoutSessionId ?? event.checkout_session_id ?? "");
    const status = String(event.Status || event.status || "").toUpperCase();
    const type = String(event.Type || event.type || "").toUpperCase();
    console.info("Clover parking webhook received", { type, status, hasCheckoutSessionId: Boolean(checkoutSessionId), checkoutSessionSuffix: checkoutSessionId ? checkoutSessionId.slice(-6) : "" });
    if (!checkoutSessionId || type !== "PAYMENT") { console.warn("Clover parking webhook ignored", { type, status, hasCheckoutSessionId: Boolean(checkoutSessionId) }); return NextResponse.json({ received: true }); }

    const paymentId = String(event.Id || event.id || "");

    // Normal self-pay transactions are checked first so existing parking checkout
    // continues to work even if the extension migration has not been applied yet.
    const sessions = await supabaseRequest<SessionMatch[]>(
      `parking_sessions?clover_checkout_session_id=eq.${encodeURIComponent(checkoutSessionId)}&select=id&limit=1`,
    );
    console.info("Clover parking session lookup", { checkoutSessionSuffix: checkoutSessionId.slice(-6), matches: sessions.length });
    if (sessions[0]) {
      const update = status === "APPROVED"
        ? { status: "active", paid_at: new Date().toISOString(), clover_payment_id: paymentId }
        : { status: "declined" };

      await supabaseRequest(`parking_sessions?id=eq.${sessions[0].id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(update),
      });
      console.info("Clover parking session updated", { sessionId: sessions[0].id, status: update.status });
      return NextResponse.json({ received: true });
    }

    const extensions = await supabaseRequest<ExtensionMatch[]>(
      `parking_session_extensions?clover_checkout_session_id=eq.${encodeURIComponent(checkoutSessionId)}&select=id,parking_session_id,new_expires_at&limit=1`,
    );
    const extension = extensions[0];
    if (!extension) return NextResponse.json({ received: true });

    if (status === "APPROVED") {
      const paidAt = new Date().toISOString();
      await supabaseRequest(`parking_session_extensions?id=eq.${extension.id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ status: "active", paid_at: paidAt, clover_payment_id: paymentId }),
      });
      await supabaseRequest(`parking_sessions?id=eq.${extension.parking_session_id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ expires_at: extension.new_expires_at, updated_at: paidAt, reminder_sent_at: null, expiration_notice_sent_at: null }),
      });
    } else {
      await supabaseRequest(`parking_session_extensions?id=eq.${extension.id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ status: "declined" }),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Clover webhook error", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
