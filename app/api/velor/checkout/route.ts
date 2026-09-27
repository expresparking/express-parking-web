import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// The revised size-based menu is request-only until Velor authorization and
// end-to-end payment validation are complete. Block stale clients as well.
// Express parking checkout routes and Clover configuration are unchanged.
export async function POST() {
  return NextResponse.json({
    error: 'Velor online payment is temporarily unavailable. Request an appointment at /velor or call 203-941-0954. We will confirm your service and price before payment.',
  }, { status: 503 });
}
