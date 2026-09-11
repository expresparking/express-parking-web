import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILES = 4;
const MAX_TOTAL_BYTES = 3.5 * 1024 * 1024;
const MAX_SUBMISSIONS = 2;
const LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const MIN_FORM_TIME_MS = 3000;
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

function signLimitPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function readSubmissionLimit(request: NextRequest, secret: string) {
  const raw = request.cookies.get("epc_submission_limit")?.value;
  if (!raw) return { startedAt: Date.now(), count: 0 };

  const [startedAtRaw, countRaw, signature] = raw.split(".");
  const payload = `${startedAtRaw}.${countRaw}`;
  const expected = signLimitPayload(payload, secret);

  try {
    const a = Buffer.from(signature || "", "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return { startedAt: Date.now(), count: 0 };
  } catch {
    return { startedAt: Date.now(), count: 0 };
  }

  const startedAt = Number(startedAtRaw);
  const count = Number(countRaw);
  if (!Number.isFinite(startedAt) || !Number.isFinite(count) || Date.now() - startedAt >= LIMIT_WINDOW_MS) {
    return { startedAt: Date.now(), count: 0 };
  }

  return { startedAt, count };
}

function setSubmissionLimit(response: NextResponse, startedAt: number, count: number, secret: string) {
  const payload = `${startedAt}.${count}`;
  const signature = signLimitPayload(payload, secret);
  response.cookies.set("epc_submission_limit", `${payload}.${signature}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(LIMIT_WINDOW_MS / 1000),
  });
}

export async function POST(request: NextRequest) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json(
        { error: "Online notifications are being connected. Please call 203-941-0954, Ext. 2." },
        { status: 503 }
      );
    }

    const limit = readSubmissionLimit(request, resendKey);
    if (limit.count >= MAX_SUBMISSIONS) {
      return NextResponse.json(
        { error: "For spam protection, this form allows no more than 2 requests in 24 hours. For additional help, call 203-941-0954, Ext. 2." },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    // Hidden bot trap. Real customers never see or fill this field.
    if (clean(formData.get("website"), 200)) {
      return NextResponse.json({ ok: true, reference: "Received" });
    }

    // Reject submissions that arrive unrealistically fast or use an old/stale form.
    const formStartedAt = Number(clean(formData.get("formStartedAt"), 30));
    const formAge = Date.now() - formStartedAt;
    if (!Number.isFinite(formStartedAt) || formAge < MIN_FORM_TIME_MS || formAge > 2 * 60 * 60 * 1000) {
      return NextResponse.json({ error: "Please reload the form and try again." }, { status: 400 });
    }

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
      return NextResponse.json({ error: "Photo/video files must be under 3.5 MB combined." }, { status: 400 });
    }

    for (const file of media) {
      if (!ALLOWED_MEDIA_TYPES.has(file.type)) {
        return NextResponse.json({ error: "Uploads must be JPG, PNG, WebP, MP4, or MOV files." }, { status: 400 });
      }
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

    // Only one outbound email is sent per accepted request. The customer receives
    // the reference number immediately on the website instead of a second email.
    const response = NextResponse.json({ ok: true, reference });
    setSubmissionLimit(response, limit.startedAt, limit.count + 1, resendKey);
    return response;
  } catch (error) {
    console.error("Property Care request error", error);
    return NextResponse.json({ error: "Unable to process the request. Please call 203-941-0954, Ext. 2." }, { status: 500 });
  }
}
