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

export async function POST(request: Request) {
  try {
    const secret = process.env.CLOVER_WEBHOOK_SECRET;
    const signature = request.headers.get("clover-signature") || "";
    const rawBody = await request.text();
    if (!secret || !validSignature(signature, rawBody, secret)) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    const event = JSON.parse(rawBody);
    const checkoutSessionId = String(event.Data || event.data || "");
    const status = String(event.Status || event.status || "").toUpperCase();
    const type = String(event.Type || event.type || "").toUpperCase();
    if (!checkoutSessionId || type !== "PAYMENT") return NextResponse.json({ received: true });
    const update = status === "APPROVED" ? { status: "active", paid_at: new Date().toISOString(), clover_payment_id: String(event.Id || event.id || "") } : { status: "declined" };
    await supabaseRequest(`parking_sessions?clover_checkout_session_id=eq.${encodeURIComponent(checkoutSessionId)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(update),
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Clover webhook error", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

