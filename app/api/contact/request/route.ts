import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, property, service, message } = body ?? {};

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

    return NextResponse.json({ reference });
  } catch (error) {
    console.error("Contact request error", error);
    return NextResponse.json({ error: "Unable to send your inquiry. Please call 203-941-0954." }, { status: 500 });
  }
}
