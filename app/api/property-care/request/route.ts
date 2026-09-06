import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max = 1000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[char] ?? char));
}

function makeReference() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const code = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `EPC-${stamp}-${code}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot for basic bot filtering.
    if (clean(body.companyWebsite, 200)) {
      return NextResponse.json({ ok: true, reference: makeReference() });
    }

    const role = clean(body.role, 80);
    const urgency = clean(body.urgency, 80);
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 60);
    const email = clean(body.email, 160);
    const address = clean(body.address, 240);
    const unit = clean(body.unit, 100);
    const issue = clean(body.issue, 120);
    const description = clean(body.description, 3000);
    const entry = clean(body.entry, 160);
    const accessTime = clean(body.accessTime, 200);

    if (!role || !urgency || !name || !phone || !email || !address || !issue || !description || !entry) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json(
        { error: "Online notifications are being connected. Please call 203-941-0954, Ext. 3." },
        { status: 503 }
      );
    }

    const reference = makeReference();
    const notifyEmail = process.env.PROPERTY_CARE_NOTIFY_EMAIL || "nebyat@expresparking.com";
    const fromEmail = process.env.PROPERTY_CARE_FROM_EMAIL || "Express Property Care <onboarding@resend.dev>";

    const safe = {
      reference: escapeHtml(reference), role: escapeHtml(role), urgency: escapeHtml(urgency),
      name: escapeHtml(name), phone: escapeHtml(phone), email: escapeHtml(email), address: escapeHtml(address),
      unit: escapeHtml(unit || "Not provided"), issue: escapeHtml(issue), description: escapeHtml(description),
      entry: escapeHtml(entry), accessTime: escapeHtml(accessTime || "Not provided"),
    };

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#17324D">
        <h2>New Express Property Care Request</h2>
        <p><strong>Reference:</strong> ${safe.reference}</p>
        <p><strong>Urgency:</strong> ${safe.urgency}</p>
        <hr />
        <p><strong>Submitted by:</strong> ${safe.name} (${safe.role})</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Property:</strong> ${safe.address}</p>
        <p><strong>Unit / area:</strong> ${safe.unit}</p>
        <p><strong>Issue:</strong> ${safe.issue}</p>
        <p><strong>Description:</strong><br />${safe.description.replaceAll("\n", "<br />")}</p>
        <p><strong>Entry permission:</strong> ${safe.entry}</p>
        <p><strong>Best access time:</strong> ${safe.accessTime}</p>
        <hr />
        <p>Express Property Care • 96 Orange Street, New Haven • 203-941-0954 Ext. 3</p>
      </div>`;

    const notifyResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyEmail],
        reply_to: email,
        subject: `[${urgency}] Property Care Request ${reference} — ${address}${unit ? ` / ${unit}` : ""}`,
        html: internalHtml,
      }),
    });

    if (!notifyResponse.ok) {
      console.error("Resend internal notification failed", await notifyResponse.text());
      return NextResponse.json({ error: "We could not send the request. Please call 203-941-0954, Ext. 3." }, { status: 502 });
    }

    // Send the requester a receipt. If this second email fails, the internal request is still accepted.
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `Express Property Care request received — ${reference}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#17324D"><h2>We received your property request.</h2><p>Reference: <strong>${safe.reference}</strong></p><p>Property: ${safe.address}${unit ? `, ${safe.unit}` : ""}</p><p>Issue: ${safe.issue}</p><p>Our team will review the request and respond using the contact information you provided.</p><p>For urgent property assistance, call <strong>203-941-0954, Ext. 3</strong>.</p><p>For fire, suspected gas leak, medical emergency, or immediate danger, call 911.</p><hr /><p>Express Property Care<br />96 Orange Street, New Haven, CT 06510</p></div>`,
      }),
    }).catch(() => undefined);

    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error("Property Care request error", error);
    return NextResponse.json({ error: "Unable to process the request. Please call 203-941-0954, Ext. 3." }, { status: 500 });
  }
}
