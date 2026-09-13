"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Session = { status: string; plate: string; plateState: string; optionLabel: string; amountCents: number; startsAt: string; expiresAt: string; locationName: string };

export function ConfirmationStatus() {
  const params = useSearchParams();
  const sessionId = params.get("session");
  const [session, setSession] = useState<Session | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!sessionId) { setFailed(true); return; }
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    async function check() {
      try {
        const response = await fetch(`/api/self-pay/session/${encodeURIComponent(sessionId!)}`, { cache: "no-store" });
        if (!response.ok) throw new Error();
        const result = await response.json();
        setSession(result);
        attempts += 1;
        if (result.status === "pending" && attempts < 12) timer = setTimeout(check, 2000);
      } catch { setFailed(true); }
    }
    check();
    return () => clearTimeout(timer);
  }, [sessionId]);

  const format = (value: string) => new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

  return <main className="self-pay-page"><section className="self-pay-shell confirmation-shell">
    {failed ? <div className="confirmation-problem"><h1>We could not verify this parking session</h1><p>Please check your Clover receipt or call Express Parking at <a href="tel:+12039410954">203-941-0954</a>.</p></div>
      : !session || session.status === "pending" ? <div className="confirmation-pending"><span className="confirmation-spinner" /><h1>Confirming your payment</h1><p>Please keep this page open. Parking is not active until payment is verified.</p></div>
      : session.status !== "active" ? <div className="confirmation-problem"><h1>Parking is not active</h1><p>Your payment was not confirmed. Please try again or call Express Parking.</p><a className="self-pay-submit" href="/pay/grant-garage">Return to payment</a></div>
      : <div className="confirmation-active">
        <div className="confirmation-check" aria-hidden="true">✓</div>
        <span className="self-pay-kicker">PAYMENT VERIFIED</span>
        <h1>Parking active</h1>
        <dl>
          <div><dt>Plate</dt><dd>{session.plateState} · {session.plate}</dd></div>
          <div><dt>Location</dt><dd>{session.locationName}</dd></div>
          <div><dt>Started</dt><dd>{format(session.startsAt)}</dd></div>
          <div><dt>Expires</dt><dd>{format(session.expiresAt)}</dd></div>
          <div><dt>Parking purchased</dt><dd>{session.optionLabel}</dd></div>
          <div><dt>Payment</dt><dd className="paid-label">PAID · ${(session.amountCents / 100).toFixed(2)}</dd></div>
        </dl>
        <strong className="no-ticket">No ticket needs to be displayed.</strong>
        <p>Make sure your vehicle exits before the expiration time shown above.</p>
      </div>}
  </section></main>;
}

