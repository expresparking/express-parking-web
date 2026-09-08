import { NextResponse } from "next/server";
import { GRANT_GARAGE } from "../../../../lib/self-pay";
import { supabaseRequest } from "../../../../lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = { status: string; plate: string; plate_state: string; option_label: string; amount_cents: number; starts_at: string; expires_at: string };

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const rows = await supabaseRequest<Row[]>(`parking_sessions?id=eq.${encodeURIComponent(id)}&select=status,plate,plate_state,option_label,amount_cents,starts_at,expires_at&limit=1`);
    if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const row = rows[0];
    return NextResponse.json({ status: row.status, plate: row.plate, plateState: row.plate_state, optionLabel: row.option_label, amountCents: row.amount_cents, startsAt: row.starts_at, expiresAt: row.expires_at, locationName: GRANT_GARAGE.name }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Parking session lookup error", error);
    return NextResponse.json({ error: "Unable to verify parking" }, { status: 500 });
  }
}

