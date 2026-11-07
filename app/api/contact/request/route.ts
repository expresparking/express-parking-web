import { NextResponse } from "next/server";
import { VELOR_SMS_DISCLOSURE_VERSION, recordWebSmsOptIn } from "../../../lib/sms-consent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, property, service, message, smsConsent, smsConsentDisclosureVersion, requestKind } = body ?? {};
    const isVelorBooking = requestKind === "velor_booking" && typeof service === "string" && (service.startsWith("Velor appointment request") || service.startsWith("Velor monthly plan"));
    const wantsVelorSms = isVelorBooking && smsConsent === true && smsConsentDisclosureVersion === VELOR_SMS_DISCLOSURE_VERSION;

    if (!name || !email || !service) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.PROPERTY_CARE_NOTIFY_EMAIL || "nebyat@expresparking.com";
    if (!apiKey) return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });

    const reference = `EXP-${Date.now().toString().slice(-8)}`;
    const text = [
      `Express website inquiry ${reference}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Property type: ${property || "Not provided"}`,
      `Service: ${service}`,
      "",
      `Message: ${message || "Not provided"}`,
      ...(typeof smsConsent === "boolean" ? [
        "",
        `SMS consent: ${smsConsent ? "YES" : "NO"}`,
        `SMS consent disclosure: ${smsConsentDisclosureVersion === "velor-service-sms-2026-11-07" ? smsConsentDisclosureVersion : "Unverified"}`,
        `SMS consent received at (server UTC): ${new Date().toISOString()}`,
        "SMS source: Velor website booking request",
      ] : []),
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Express Website <website@expresparking.com>",
        to: [notifyEmail],
        reply_to: email,
        subject: `Website inquiry: ${service} — ${reference}`,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend contact error", detail);
      return NextResponse.json({ error: "Unable to send your inquiry. Please call 203-941-0954." }, { status: 502 });
    }

    let smsConsentRecorded = false;
    if (wantsVelorSms) {
      try {
        await recordWebSmsOptIn({
          phone: String(phone || ""),
          program: "velor_service",
          sourceForm: "velor",
          serviceReference: reference,
          disclosureVersion: VELOR_SMS_DISCLOSURE_VERSION,
        });
        smsConsentRecorded = true;
      } catch (auditError) {
        // The booking inquiry was delivered. Do not claim SMS is enabled,
        // and don't fail the inquiry or trigger repeat emails on retries.
        console.error("Unable to record Velor SMS consent", auditError);
      }
    }
    return NextResponse.json({ reference, smsConsentRecorded });
  } catch (error) {
    console.error("Contact request error", error);
    return NextResponse.json({ error: "Unable to send your inquiry. Please call 203-941-0954." }, { status: 500 });
  }
}
