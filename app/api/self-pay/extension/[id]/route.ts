import { NextResponse } from "next/server";
import { GRANT_GARAGE } from "../../../../lib/self-pay";
import { supabaseRequest } from "../../../../lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ExtensionRow = {
  id: string;
  parking_session_id: string;
  option_label: string;
  amount_cents: number;
  previous_expires_at: string;
  new_expires_at: string;
  status: string;
};

type SessionRow = {
  plate: string;
  plate_state: string;
  space_number: string;
};

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const extensions = await supabaseRequest<ExtensionRow[]>(
      `parking_session_extensions?id=eq.${encodeURIComponent(id)}&select=id,parking_session_id,option_label,amount_cents,previous_expires_at,new_expires_at,status&limit=1`,
    );
    const extension = extensions[0];
    if (!extension) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const sessions = await supabaseRequest<SessionRow[]>(
      `parking_sessions?id=eq.${encodeURIComponent(extension.parking_session_id)}&select=plate,plate_state,space_number&limit=1`,
    );
    const session = sessions[0];
    if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({
      status: extension.status,
      optionLabel: extension.option_label,
      amountCents: extension.amount_cents,
      previousExpiresAt: extension.previous_expires_at,
      newExpiresAt: extension.new_expires_at,
      plate: session.plate,
      plateState: session.plate_state,
      spaceNumber: session.space_number,
      locationName: GRANT_GARAGE.name,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Parking extension lookup error", error);
    return NextResponse.json({ error: "Unable to verify parking extension" }, { status: 500 });
  }
}
