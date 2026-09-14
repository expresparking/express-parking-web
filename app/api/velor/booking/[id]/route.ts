import { NextResponse } from "next/server";
import { supabaseRequest } from "../../../../lib/supabase-rest";
import { VELOR_LOCATION } from "../../../../lib/velor-booking";

export const dynamic = "force-dynamic";

type BookingRow = {
  id: string;
  status: string;
  service_name: string;
  amount_cents: number;
  service_date: string;
  window_label: string;
  plate: string;
  plate_state: string;
  space_number: string;
  first_name: string;
};

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid booking" }, { status: 400 });
  try {
    const rows = await supabaseRequest<BookingRow[]>(
      `velor_bookings?select=id,status,service_name,amount_cents,service_date,window_label,plate,plate_state,space_number,first_name&id=eq.${id}&limit=1`,
    );
    const row = rows[0];
    if (!row) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    return NextResponse.json({
      status: row.status,
      serviceName: row.service_name,
      amountCents: row.amount_cents,
      serviceDate: row.service_date,
      windowLabel: row.window_label,
      plate: row.plate,
      plateState: row.plate_state,
      spaceNumber: row.space_number,
      firstName: row.first_name,
      locationName: VELOR_LOCATION.name,
    });
  } catch {
    return NextResponse.json({ error: "Unable to verify booking" }, { status: 500 });
  }
}
