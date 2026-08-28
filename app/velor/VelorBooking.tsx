"use client";

import { FormEvent, useMemo, useState } from "react";

const locations = [
  "96 Orange Street Garage",
  "11 Orange Street Surface Lot",
  "Another Express-managed location",
];

export default function VelorBooking() {
  const [plan, setPlan] = useState<"single" | "monthly">("single");
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState(locations[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("While parked today · 9 AM–5 PM");
  const [plate, setPlate] = useState("");
  const [space, setSpace] = useState("");

  const summary = useMemo(() => ({
    plan: plan === "single" ? "One-time car care" : "Monthly membership",
    location,
    schedule: [date, time].filter(Boolean).join(" · ") || "Choose a date and time",
    vehicle: plate ? `${plate}${space ? ` · Space ${space}` : ""}` : "Add plate and space",
  }), [plan, location, date, time, plate, space]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    document.getElementById("velor-confirmation")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="velor-booking-shell">
      <form className="velor-booking-form" onSubmit={submit}>
        <div className="velor-form-head">
          <span>BOOK YOUR SERVICE</span>
          <h2>Car care that fits your parking day.</h2>
          <p>Select the service plan and tell us exactly where your vehicle will be parked.</p>
        </div>

        <fieldset>
          <legend>1. Choose your plan</legend>
          <div className="velor-plan-options">
            <label className={plan === "single" ? "selected" : ""}>
              <input type="radio" name="plan" value="single" checked={plan === "single"} onChange={() => setPlan("single")} />
              <span><b>One-Time Care</b><small>Book only when you need it</small></span>
            </label>
            <label className={plan === "monthly" ? "selected" : ""}>
              <input type="radio" name="plan" value="monthly" checked={plan === "monthly"} onChange={() => setPlan("monthly")} />
              <span><b>Monthly Membership</b><small>Recurring care and priority scheduling</small></span>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>2. Select location and schedule</legend>
          <div className="velor-field-grid">
            <label><span>Garage or lot</span><select value={location} onChange={(e) => setLocation(e.target.value)}>{locations.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label><span>Service date</span><input type="date" required value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label className="velor-field-wide"><span>Time window</span><select value={time} onChange={(e) => setTime(e.target.value)}><option>While parked today · 9 AM–5 PM</option><option>Morning · 9 AM–12 PM</option><option>Afternoon · 12 PM–5 PM</option><option>Request another window</option></select></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>3. Tell us which vehicle</legend>
          <div className="velor-field-grid">
            <label><span>License plate</span><input required value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} placeholder="ABC 1234" /></label>
            <label><span>Floor / space number</span><input required value={space} onChange={(e) => setSpace(e.target.value)} placeholder="Floor 3 · Space 214" /></label>
            <label><span>Mobile number</span><input required type="tel" placeholder="(203) 000-0000" /></label>
            <label><span>Email</span><input required type="email" placeholder="you@example.com" /></label>
          </div>
        </fieldset>

        <label className="velor-consent"><input type="checkbox" required /><span>I confirm the vehicle location is accurate and authorize Velor to contact me about this service.</span></label>
        <button className="velor-submit" type="submit">Review booking <span aria-hidden="true">→</span></button>
      </form>

      <aside className="velor-order-card" aria-label="Booking summary">
        <span>YOUR BOOKING</span>
        <h3>{summary.plan}</h3>
        <dl>
          <div><dt>Location</dt><dd>{summary.location}</dd></div>
          <div><dt>Schedule</dt><dd>{summary.schedule}</dd></div>
          <div><dt>Vehicle</dt><dd>{summary.vehicle}</dd></div>
        </dl>
        <div className="velor-included"><b>Included with every visit</b><span>Eco-conscious process</span><span>Zero-runoff service method</span><span>Before-and-after photos</span><span>Completion notification</span></div>
        <small>Final service selection and price will be confirmed before payment.</small>
      </aside>

      {submitted && (
        <section className="velor-confirmation" id="velor-confirmation" role="status">
          <div className="velor-confirmation-mark">✓</div>
          <div>
            <span>BOOKING DETAILS READY</span>
            <h2>One last connection is needed.</h2>
            <p>Your booking details have been prepared. Secure Clover checkout and automatic SMS dispatch are not connected yet, so no payment was charged and no message was sent.</p>
            <div className="velor-confirmation-actions">
              <button type="button" disabled>Continue to Clover checkout</button>
              <a href="tel:+12039410954">Call 203-941-0954</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
