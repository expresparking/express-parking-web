"use client";

import { FormEvent, useMemo, useState } from "react";
import { VELOR_LOCATION, VELOR_SERVICES, VELOR_WINDOWS } from "../lib/velor-booking";

function localDate(daysFromToday = 0) {
  const value = new Date();
  value.setDate(value.getDate() + daysFromToday);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function VelorBooking() {
  const [service, setService] = useState<(typeof VELOR_SERVICES)[number]["code"]>(VELOR_SERVICES[2].code);
  const [date, setDate] = useState("");
  const [windowCode, setWindowCode] = useState<(typeof VELOR_WINDOWS)[number]["code"]>(VELOR_WINDOWS[0].code);
  const [plate, setPlate] = useState("");
  const [plateState, setPlateState] = useState("CT");
  const [spaceNumber, setSpaceNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedService = VELOR_SERVICES.find((item) => item.code === service)!;
  const selectedWindow = VELOR_WINDOWS.find((item) => item.code === windowCode)!;
  const summary = useMemo(() => ({
    service: selectedService.name,
    price: `$${(selectedService.amountCents / 100).toFixed(2)}`,
    schedule: [date, selectedWindow.label].filter(Boolean).join(" · ") || "Choose a date and window",
    vehicle: plate ? `${plateState} · ${plate}${spaceNumber ? ` · Space ${spaceNumber}` : ""}` : "Add plate and space",
  }), [selectedService, selectedWindow, date, plate, plateState, spaceNumber]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/velor/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, date, window: windowCode, plate, state: plateState, spaceNumber, firstName, lastName, phone, email }),
      });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Unable to start checkout.");
      window.location.assign(result.checkoutUrl);
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Unable to start checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="velor-booking-shell">
      <form className="velor-booking-form" onSubmit={submit}>
        <div className="velor-form-head">
          <span>BOOK YOUR SERVICE</span>
          <h2>Car care that fits your parking day.</h2>
          <p>Choose your service and tell us exactly where your vehicle will be parked.</p>
        </div>

        <fieldset>
          <legend>1. Choose your service</legend>
          <div className="velor-plan-options">
            {VELOR_SERVICES.map((item) => <label key={item.code} className={service === item.code ? "selected" : ""}>
              <input type="radio" name="service" value={item.code} checked={service === item.code} onChange={() => setService(item.code)} />
              <span><b>{item.name}</b><small>${(item.amountCents / 100).toFixed(2)}</small></span>
            </label>)}
          </div>
        </fieldset>

        <fieldset>
          <legend>2. Select location and schedule</legend>
          <div className="velor-field-grid">
            <label><span>Garage or lot</span><input value={VELOR_LOCATION.name} readOnly /></label>
            <label><span>Service date</span><input type="date" required min={localDate()} max={localDate(30)} value={date} onChange={(event) => setDate(event.target.value)} /></label>
            <label className="velor-field-wide"><span>Time window</span><select value={windowCode} onChange={(event) => setWindowCode(event.target.value as typeof windowCode)}>{VELOR_WINDOWS.map((item) => <option value={item.code} key={item.code}>{item.label}</option>)}</select><small>Maximum two vehicles per window. Sunday service is unavailable.</small></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>3. Tell us which vehicle</legend>
          <div className="velor-field-grid">
            <label><span>License plate</span><input required value={plate} maxLength={12} onChange={(event) => setPlate(event.target.value.toUpperCase())} placeholder="ABC 1234" /></label>
            <label><span>Plate state</span><input required value={plateState} maxLength={3} onChange={(event) => setPlateState(event.target.value.toUpperCase())} placeholder="CT" /></label>
            <label className="velor-field-wide"><span>Floor / space number</span><input required value={spaceNumber} maxLength={12} onChange={(event) => setSpaceNumber(event.target.value.toUpperCase())} placeholder="Floor 3 · Space 214" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>4. Contact information</legend>
          <div className="velor-field-grid">
            <label><span>First name</span><input required autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} /></label>
            <label><span>Last name <small>(optional)</small></span><input autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)} /></label>
            <label><span>Mobile number</span><input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(203) 000-0000" /></label>
            <label><span>Email</span><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
          </div>
        </fieldset>

        <label className="velor-consent"><input type="checkbox" required /><span>I confirm the vehicle location is accurate and authorize Velor to care for this vehicle and contact me about the service.</span></label>
        {error && <p className="self-pay-error" role="alert">{error}</p>}
        <button className="velor-submit" type="submit" disabled={loading}>{loading ? "Opening secure checkout…" : `Pay ${summary.price} securely`} <span aria-hidden="true">→</span></button>
        <small>You will review the total on Clover before payment. Your booking is confirmed only after payment is verified.</small>
      </form>

      <aside className="velor-order-card" aria-label="Booking summary">
        <span>YOUR BOOKING</span>
        <h3>{summary.service}</h3>
        <dl>
          <div><dt>Price</dt><dd>{summary.price}</dd></div>
          <div><dt>Location</dt><dd>{VELOR_LOCATION.name}</dd></div>
          <div><dt>Schedule</dt><dd>{summary.schedule}</dd></div>
          <div><dt>Vehicle</dt><dd>{summary.vehicle}</dd></div>
        </dl>
        <div className="velor-included"><b>Included with every visit</b><span>Eco-conscious process</span><span>Zero-runoff service method</span><span>Before-and-after photos</span><span>Service status tracked by Velor</span></div>
        <small>Service prices and availability can be updated as Velor expands.</small>
      </aside>
    </div>
  );
}
