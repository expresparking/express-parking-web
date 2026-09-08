import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { GRANT_GARAGE, normalizePlate, optionByCode } from "../../../lib/self-pay";
import { hasParkingDatabase, supabaseRequest } from "../../../lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plate = normalizePlate(String(body.plate || ""));
    const plateState = String(body.state || "CT").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
    const email = String(body.email || "").trim().toLowerCase();
    const option = optionByCode(String(body.option || ""));
    if (body.location !== GRANT_GARAGE.code || plate.length < 2 || !plateState || !/^\S+@\S+\.\S+$/.test(email) || !option) {
      return NextResponse.json({ error: "That parking selection is no longer available. Please review your information." }, { status: 400 });
    }

    const merchantId = process.env.CLOVER_MERCHANT_ID;
    const privateKey = process.env.CLOVER_PRIVATE_KEY;
    if (!merchantId || !privateKey || !hasParkingDatabase()) {
      return NextResponse.json({ error: "Online payment is being connected. Please see the attendant or call 203-941-0954." }, { status: 503 });
    }

    const id = randomUUID();
    const startsAt = new Date().toISOString();
    await supabaseRequest("parking_sessions", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        id,
        location_code: GRANT_GARAGE.code,
        plate,
        plate_state: plateState,
        email,
        parking_option: option.code,
        option_label: option.label,
        amount_cents: option.amountCents,
        starts_at: startsAt,
        expires_at: option.expiresAt,
        status: "pending",
      }),
    });

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.expresparking.com").replace(/\/$/, "");
    const cloverBase = (process.env.CLOVER_API_BASE_URL || "https://api.clover.com").replace(/\/$/, "");
    const response = await fetch(`${cloverBase}/invoicingcheckoutservice/v1/checkouts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Clover-Merchant-Id": merchantId,
        Authorization: `Bearer ${privateKey}`,
      },
      body: JSON.stringify({
        pageConfigUuid: process.env.CLOVER_PAGE_CONFIG_UUID || "B1SEXQJM5TXGP",
        customer: { email },
        shoppingCart: { lineItems: [{ name: `${GRANT_GARAGE.name} — ${option.label}`, note: `Plate ${plateState} ${plate}`, price: option.amountCents, unitQty: 1 }] },
        redirectUrls: {
          success: `${siteUrl}/pay/confirmation?session=${id}`,
          failure: `${siteUrl}/pay/grant-garage?payment=failed`,
          cancel: `${siteUrl}/pay/grant-garage?payment=cancelled`,
        },
      }),
    });

    if (!response.ok) {
      console.error("Clover checkout error", response.status, await response.text());
      await supabaseRequest(`parking_sessions?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ status: "failed" }) });
      return NextResponse.json({ error: "Clover checkout is temporarily unavailable. Please try again." }, { status: 502 });
    }
    const checkout = await response.json();
    if (!checkout.href || !checkout.checkoutSessionId) throw new Error("Invalid Clover checkout response.");
    await supabaseRequest(`parking_sessions?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ clover_checkout_session_id: checkout.checkoutSessionId }),
    });
    return NextResponse.json({ checkoutUrl: checkout.href });
  } catch (error) {
    console.error("Self-pay checkout error", error);
    return NextResponse.json({ error: "Unable to start payment. Please try again." }, { status: 500 });
  }
}

