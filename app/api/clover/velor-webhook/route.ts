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
  const actual = Buffer.from(values.v1, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export async function POST(request: Request) {
  try {
    const secret = process.env.CLOVER_VELOR_WEBHOOK_SECRET;
    const signature = request.headers.get("clover-signature") || "";
    const rawBody = await request.text();
    if (!secret || !validSignature(signature, rawBody, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    const event = JSON.parse(rawBody);
    const data = event.Data ?? event.data;
    const checkoutSessionId = String(typeof data === "string" ? data : data?.checkoutSessionId ?? data?.checkout_session_id ?? event.checkoutSessionId ?? event.checkout_session_id ?? "");
    const status = String(event.Status || event.status || "").toUpperCase();
    const type = String(event.Type || event.type || "").toUpperCase();
    console.info("Clover Velor webhook received", { type, status, hasCheckoutSessionId: Boolean(checkoutSessionId), checkoutSessionSuffix: checkoutSessionId ? checkoutSessionId.slice(-6) : "" });
    if (!checkoutSessionId || type !== "PAYMENT") {
      console.warn("Clover Velor webhook ignored", { type, status, hasCheckoutSessionId: Boolean(checkoutSessionId) });
      console.info("Clover Velor booking update attempted", { checkoutSessionSuffix: checkoutSessionId.slice(-6), status: update.status });
    return NextResponse.json({ received: true });
    }

    const update = status === "APPROVED"
      ? { status: "paid", paid_at: new Date().toISOString(), clover_payment_id: String(event.Id || event.id || ""), updated_at: new Date().toISOString() }
      : { status: "declined", updated_at: new Date().toISOString() };
    await supabaseRequest(`velor_bookings?clover_checkout_session_id=eq.${encodeURIComponent(checkoutSessionId)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(update),
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Velor Clover webhook error", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
