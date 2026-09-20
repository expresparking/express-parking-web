import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { GRANT_GARAGE, extensionOptionByCode } from "../../../../lib/self-pay";
import { hasParkingDatabase, supabaseRequest } from "../../../../lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ParkingSessionRow = {
  id: string;
  location_code: string;
  plate: string;
  plate_state: string;
  space_number: string;
  email: string;
  expires_at: string;
  status: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId = String(body.sessionId || "");
    const optionCode = String(body.option || "");

    if (!/^[0-9a-f-]{36}$/i.test(sessionId) || !hasParkingDatabase()) {
      return NextResponse.json({ error: "Unable to extend this parking session." }, { status: 400 });
    }

    const sessions = await supabaseRequest<ParkingSessionRow[]>(
      `parking_sessions?id=eq.${encodeURIComponent(sessionId)}&select=id,location_code,plate,plate_state,space_number,email,expires_at,status&limit=1`,
    );
    const session = sessions[0];
    if (!session || session.location_code !== GRANT_GARAGE.code || session.status !== "active") {
      return NextResponse.json({ error: "This parking session is not active." }, { status: 400 });
    }

    const now = new Date();
    if (new Date(session.expires_at) <= now) {
      return NextResponse.json({ error: "This parking session has already expired." }, { status: 400 });
    }

    const option = extensionOptionByCode(optionCode, session.expires_at, now);
    if (!option) {
      return NextResponse.json({ error: "That extension is no longer available." }, { status: 400 });
    }

    const merchantId = process.env.CLOVER_MERCHANT_ID;
    const privateKey = process.env.CLOVER_PRIVATE_KEY;
    if (!merchantId || !privateKey) {
      return NextResponse.json({ error: "Online payment is temporarily unavailable." }, { status: 503 });
    }

    const extensionId = randomUUID();
    await supabaseRequest("parking_session_extensions", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        id: extensionId,
        parking_session_id: session.id,
        option_code: option.code,
        option_label: option.label,
        amount_cents: option.amountCents,
        previous_expires_at: session.expires_at,
        new_expires_at: option.expiresAt,
        status: "pending",
      }),
    });

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.expresparking.com").replace(/\/$/, "");
    const cloverBase = (process.env.CLOVER_API_BASE_URL || "https://api.clover.com").replace(/\/$/, "");
    const newExpiration = new Intl.DateTimeFormat("en-US", {
      timeZone: GRANT_GARAGE.timeZone,
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(option.expiresAt));

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
        customer: { email: session.email },
        shoppingCart: {
          lineItems: [{
            name: `${GRANT_GARAGE.name} — Extend ${option.label}`,
            note: `Plate ${session.plate_state} ${session.plate} · Space ${session.space_number} · New expiration ${newExpiration}`,
            price: option.amountCents,
            unitQty: 1,
          }],
        },
        redirectUrls: {
          success: `${siteUrl}/pay/extend/confirmation?extension=${extensionId}`,
          failure: `${siteUrl}/pay/extend?session=${session.id}&payment=failed`,
          cancel: `${siteUrl}/pay/extend?session=${session.id}&payment=cancelled`,
        },
      }),
    });

    if (!response.ok) {
      console.error("Clover extension checkout error", response.status, await response.text());
      await supabaseRequest(`parking_session_extensions?id=eq.${extensionId}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ status: "failed" }),
      });
      return NextResponse.json({ error: "Clover checkout is temporarily unavailable. Please try again." }, { status: 502 });
    }

    const checkout = await response.json();
    if (!checkout.href || !checkout.checkoutSessionId) throw new Error("Invalid Clover checkout response.");

    await supabaseRequest(`parking_session_extensions?id=eq.${extensionId}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ clover_checkout_session_id: checkout.checkoutSessionId }),
    });

    return NextResponse.json({ checkoutUrl: checkout.href });
  } catch (error) {
    console.error("Parking extension checkout error", error);
    return NextResponse.json({ error: "Unable to start extension payment. Please try again." }, { status: 500 });
  }
}
