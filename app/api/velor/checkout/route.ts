import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { hasParkingDatabase, supabaseRequest } from "../../../lib/supabase-rest";
import {
  bookingWindow,
  normalizeVelorPlate,
  normalizeVelorSpace,
  VELOR_LOCATION,
  VELOR_WINDOW_CAPACITY,
  velorService,
} from "../../../lib/velor-booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ExistingSlot = { capacity_slot: number };

export async function POST(request: Request) {
  let bookingId = "";
  try {
    const body = await request.json();
    const service = velorService(String(body.service || ""));
    const serviceDate = String(body.date || "");
    const window = bookingWindow(serviceDate, String(body.window || ""));
    const plate = normalizeVelorPlate(String(body.plate || ""));
    const plateState = String(body.state || "CT").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
    const spaceNumber = normalizeVelorSpace(String(body.spaceNumber || ""));
    const firstName = String(body.firstName || "").trim().slice(0, 60);
    const lastName = String(body.lastName || "").trim().slice(0, 60);
    const phone = String(body.phone || "").replace(/[^0-9+]/g, "").slice(0, 16);
    const email = String(body.email || "").trim().toLowerCase();

    if (!service || !window || plate.length < 2 || !plateState || !spaceNumber || !firstName || phone.replace(/\D/g, "").length < 10 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please review the service, schedule, vehicle, and contact information." }, { status: 400 });
    }

    const merchantId = process.env.CLOVER_MERCHANT_ID;
    const privateKey = process.env.CLOVER_PRIVATE_KEY;
    const pageConfigUuid = process.env.CLOVER_VELOR_PAGE_CONFIG_UUID;
    if (!merchantId || !privateKey || !pageConfigUuid || !hasParkingDatabase()) {
      return NextResponse.json({ error: "Online Velor booking is being connected. Please call 203-941-0954." }, { status: 503 });
    }

    const staleBefore = new Date(Date.now() - 20 * 60 * 1000).toISOString();
    await supabaseRequest(`velor_bookings?status=eq.pending&created_at=lt.${encodeURIComponent(staleBefore)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status: "cancelled", updated_at: new Date().toISOString() }),
    });

    const occupied = await supabaseRequest<ExistingSlot[]>(
      `velor_bookings?select=capacity_slot&location_code=eq.${VELOR_LOCATION.code}&service_date=eq.${serviceDate}&window_code=eq.${window.window.code}&status=in.(pending,paid,scheduled,in_progress)`,
    );
    const used = new Set(occupied.map((item) => item.capacity_slot));
    const capacitySlot = Array.from({ length: VELOR_WINDOW_CAPACITY }, (_, index) => index + 1).find((slot) => !used.has(slot));
    if (!capacitySlot) return NextResponse.json({ error: "That time window is full. Please choose another window or date." }, { status: 409 });

    bookingId = randomUUID();
    await supabaseRequest("velor_bookings", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        id: bookingId,
        location_code: VELOR_LOCATION.code,
        service_code: service.code,
        service_name: service.name,
        amount_cents: service.amountCents,
        service_date: serviceDate,
        window_code: window.window.code,
        window_label: window.window.label,
        capacity_slot: capacitySlot,
        starts_at: window.startsAt,
        ends_at: window.endsAt,
        plate,
        plate_state: plateState,
        space_number: spaceNumber,
        first_name: firstName,
        last_name: lastName || null,
        phone,
        email,
        status: "pending",
      }),
    });

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.expresparking.com").replace(/\/$/, "");
    const cloverBase = (process.env.CLOVER_API_BASE_URL || "https://api.clover.com").replace(/\/$/, "");
    const cloverResponse = await fetch(`${cloverBase}/invoicingcheckoutservice/v1/checkouts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Clover-Merchant-Id": merchantId,
        Authorization: `Bearer ${privateKey}`,
      },
      body: JSON.stringify({
        pageConfigUuid,
        customer: { email },
        shoppingCart: {
          lineItems: [{
            name: `Velor — ${service.name}`,
            note: `${serviceDate} · ${window.window.label} · ${plateState} ${plate} · Space ${spaceNumber} · ${firstName} ${lastName}`.trim(),
            price: service.amountCents,
            unitQty: 1,
          }],
        },
        redirectUrls: {
          success: `${siteUrl}/velor/confirmation?booking=${bookingId}`,
          failure: `${siteUrl}/velor?payment=failed#book-velor`,
          cancel: `${siteUrl}/velor?payment=cancelled#book-velor`,
        },
      }),
    });

    if (!cloverResponse.ok) {
      console.error("Velor Clover checkout error", cloverResponse.status, await cloverResponse.text());
      await markFailed(bookingId);
      return NextResponse.json({ error: "Clover checkout is temporarily unavailable. Please try again." }, { status: 502 });
    }
    const checkout = await cloverResponse.json();
    if (!checkout.href || !checkout.checkoutSessionId) throw new Error("Invalid Clover checkout response.");
    await supabaseRequest(`velor_bookings?id=eq.${bookingId}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ clover_checkout_session_id: checkout.checkoutSessionId, updated_at: new Date().toISOString() }),
    });
    return NextResponse.json({ checkoutUrl: checkout.href });
  } catch (error) {
    console.error("Velor checkout error", error);
    if (bookingId) await markFailed(bookingId).catch(() => undefined);
    return NextResponse.json({ error: "Unable to start Velor payment. Please try again." }, { status: 500 });
  }
}

async function markFailed(id: string) {
  return supabaseRequest(`velor_bookings?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status: "failed", updated_at: new Date().toISOString() }),
  });
}
