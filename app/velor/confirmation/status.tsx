"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Booking = {
  status: string;
  serviceName: string;
  amountCents: number;
  serviceDate: string;
  windowLabel: string;
  plate: string;
  plateState: string;
  spaceNumber: string;
  firstName: string;
  locationName: string;
};

export function VelorConfirmationStatus() {
  const params = useSearchParams();
  const bookingId = params.get("booking");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [failed, setFailed] = useState(!bookingId);

  useEffect(() => {
    if (!bookingId) return;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    async function check() {
      try {
        const response = await fetch(`/api/velor/booking/${encodeURIComponent(bookingId!)}`, { cache: "no-store" });
        if (!response.ok) throw new Error();
        const result = await response.json();
        setBooking(result);
        attempts += 1;
        if (result.status === "pending" && attempts < 12) timer = setTimeout(check, 2000);
      } catch { setFailed(true); }
    }
    check();
    return () => clearTimeout(timer);
  }, [bookingId]);

  const paid = booking && ["paid", "scheduled", "in_progress", "completed"].includes(booking.status);

  return <main className="self-pay-page"><section className="self-pay-shell confirmation-shell">
    {failed ? <div className="confirmation-problem"><h1>We could not verify this Velor booking</h1><p>Please check your Clover receipt or call Velor at <a href="tel:+12039410954">203-941-0954</a>.</p></div>
      : !booking || booking.status === "pending" ? <div className="confirmation-pending"><span className="confirmation-spinner" /><h1>Confirming your payment</h1><p>Please keep this page open. Your appointment is not confirmed until payment is verified.</p></div>
      : !paid ? <div className="confirmation-problem"><h1>Your booking is not confirmed</h1><p>Payment was not confirmed. Please try again or call Velor.</p><a className="self-pay-submit" href="/velor#book-velor">Return to booking</a></div>
      : <div className="confirmation-active">
        <div className="confirmation-check" aria-hidden="true">✓</div>
        <span className="self-pay-kicker">PAYMENT VERIFIED</span>
        <h1>Velor booking confirmed</h1>
        <p>Thank you, {booking.firstName}. Your vehicle is reserved for service.</p>
        <dl>
          <div><dt>Service</dt><dd>{booking.serviceName}</dd></div>
          <div><dt>Date</dt><dd>{new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "America/New_York" }).format(new Date(`${booking.serviceDate}T12:00:00-04:00`))}</dd></div>
          <div><dt>Time window</dt><dd>{booking.windowLabel}</dd></div>
          <div><dt>Vehicle</dt><dd>{booking.plateState} · {booking.plate}</dd></div>
          <div><dt>Parking space</dt><dd>{booking.spaceNumber}</dd></div>
          <div><dt>Location</dt><dd>{booking.locationName}</dd></div>
          <div><dt>Payment</dt><dd className="paid-label">PAID · ${(booking.amountCents / 100).toFixed(2)}</dd></div>
        </dl>
        <strong className="no-ticket">Leave your vehicle parked in the space shown above.</strong>
        <p>Velor will contact you if the crew needs help locating the vehicle and again when service is complete.</p>
      </div>}
  </section></main>;
}
