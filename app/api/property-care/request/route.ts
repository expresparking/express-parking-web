import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILES = 4;
const MAX_TOTAL_BYTES = 3.5 * 1024 * 1024;
const ALLOWED_MEDIA_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime"]);

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
    const formData = await request.formData();

    const role = clean(formData.get("role"), 80);
    const urgency = clean(formData.get("urgency"), 80);
    const name = clean(formData.get("name"), 120);
    const phone = clean(formData.get("phone"), 60);
    const email = clean(formData.get("email"), 160);
    const address = clean(formData.get("address"), 240);
    const unit = clean(formData.get("unit"), 100);
    const issue = clean(formData.get("issue"), 120);
    const description = clean(formData.get("description"), 3000);
    const entry = clean(formData.get("entry"), 160);
    const accessTime = clean(formData.get("accessTime"), 200);

    if (!role || !urgency || !name || !phone || !email || !address || !issue || !description || !entry) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const media = formData.getAll("media").filter((item): item is File => item instanceof File && item.size > 0);
    if (media.length > MAX_FILES) {
      return NextResponse.json({ error: `Please upload no more than ${MAX_FILES} files.` }, { status: 400 });
    }

    const totalBytes = media.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json({ error: "Photo/video files must be under 3.5 MB combined for this review version." }, { status: 400 });
    }

    for (const file of media) {
      if (!ALLOWED_MEDIA_TYPES.has(file.type)) {
        return NextResponse.json({ error: "Uploads must be JPG, PNG, WebP, MP4, or MOV files." }, { status: 400 });
      }
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json(
        { error: "Online notifications are being connected. Please call 203-941-0954, Ext. 2." },
        { status: 503 }
      );
    }

    const reference = makeReference();
    const notifyEmail = process.env.PROPERTY_CARE_NOTIFY_EMAIL || "nebyat@expresparking.com";
    const configuredFrom = process.env.PROPERTY_CARE_FROM_EMAIL || "propertycare@expresparking.com";
    const fromEmail = configuredFrom.includes("<") ? configuredFrom : `Express Property Care <${configuredFrom}>`;

    const safe = {
      reference: escapeHtml(reference), role: escapeHtml(role), urgency: escapeHtml(urgency),
      name: escapeHtml(name), phone: escapeHtml(phone), email: escapeHtml(email), address: escapeHtml(address),
      unit: escapeHtml(unit || "Not provided"), issue: escapeHtml(issue), description: escapeHtml(description),
      entry: escapeHtml(entry), accessTime: escapeHtml(accessTime || "Not provided"),
    };

    const attachmentSummary = media.length ? `${media.length} photo/video attachment${media.length === 1 ? "" : "s"}` : "No attachments";
    const internalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#17324D">
        <h2>New Express Property Care Request</h2>
        <p><strong>Reference:</strong> ${safe.reference}</p>
        <p><strong>Urgency:</strong> ${safe.urgency}</p>
        <p><strong>Media:</strong> ${attachmentSummary}</p>
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
        <p>Express Property Care • 96 Orange Street, New Haven • 203-941-0954 Ext. 2</p>
      </div>`;

    const attachments = await Promise.all(media.map(async (file) => ({
      filename: file.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })));

    const notifyResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyEmail],
        reply_to: email,
        subject: `[${urgency}] Property Care Request ${reference} — ${address}${unit ? ` / ${unit}` : ""}`,
        html: internalHtml,
        ...(attachments.length ? { attachments } : {}),
      }),
    });

    if (!notifyResponse.ok) {
      const resendError = await notifyResponse.text();
      console.error("Resend internal notification failed", resendError);
      return NextResponse.json({ error: "We could not send the request. Please call 203-941-0954, Ext. 2." }, { status: 502 });
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `Express Property Care request received — ${reference}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#17324D"><h2>We received your property request.</h2><p>Reference: <strong>${safe.reference}</strong></p><p>Property: ${safe.address}${unit ? `, ${safe.unit}` : ""}</p><p>Issue: ${safe.issue}</p><p>Our team will review the request and respond using the contact information you provided.</p><p>For Property Care assistance, call <strong>203-941-0954, Ext. 2</strong>.</p><p>For fire, suspected gas leak, medical emergency, or immediate danger, call 911.</p><hr /><p>Express Property Care<br />96 Orange Street, New Haven, CT 06510</p></div>`,
      }),
    }).catch(() => undefined);

    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error("Property Care request error", error);
    return NextResponse.json({ error: "Unable to process the request. Please call 203-941-0954, Ext. 2." }, { status: 500 });
  }
}
