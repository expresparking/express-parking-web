"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { GRANT_GARAGE, getParkingOptions, normalizePlate } from "../../lib/self-pay";

const STATES = ["CT", "NY", "MA", "NJ", "RI", "PA", "ME", "NH", "VT", "DE", "MD", "VA", "DC", "Other"];

export function SelfPayForm() {
  const [mounted, setMounted] = useState(false);
  const [plate, setPlate] = useState("");
  const [state, setState] = useState("CT");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const options = mounted ? getParkingOptions() : [];

  useEffect(() => setMounted(true), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const cleanPlate = normalizePlate(plate);
    if (cleanPlate.length < 2 || !selected || !email) {
      setError("Enter your license plate, state, email, and parking option.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/self-pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate: cleanPlate, state, email, option: selected, location: GRANT_GARAGE.code }),
      });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Unable to start checkout.");
      window.location.assign(result.checkoutUrl);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to start checkout.");
      setLoading(false);
    }
  }

  return (
    <main className="self-pay-page">
      <section className="self-pay-shell">
        <div className="self-pay-heading">
          <span className="self-pay-kicker">EXPRESS SELF-PAY PARKING</span>
          <h1>Pay &amp; start parking</h1>
          <p><strong>{GRANT_GARAGE.name}</strong><br />{GRANT_GARAGE.address}</p>
        </div>

        {!mounted ? <div className="self-pay-notice">Checking today&apos;s parking options…</div> : options.length === 0 ? (
          <div className="self-pay-closed" role="status">
            <strong>Self-pay is currently closed</strong>
            <p>Grant Garage opens Monday–Saturday at 6:00 AM. Sunday is closed.</p>
          </div>
        ) : (
          <form className="self-pay-form" onSubmit={submit}>
            <fieldset>
              <legend>1. Enter your vehicle</legend>
              <div className="self-pay-fields">
                <label className="self-pay-plate">License plate
                  <input value={plate} onChange={(event) => setPlate(normalizePlate(event.target.value))} autoCapitalize="characters" autoCorrect="off" inputMode="text" placeholder="ABC1234" maxLength={10} required />
                </label>
                <label>State
                  <select value={state} onChange={(event) => setState(event.target.value)} required>
                    {STATES.map((value) => <option value={value} key={value}>{value}</option>)}
                  </select>
                </label>
              </div>
              <label>Email for receipt
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required />
              </label>
            </fieldset>

            <fieldset>
              <legend>2. Choose parking</legend>
              <div className="self-pay-options">
                {options.map((option) => (
                  <label className={selected === option.code ? "selected" : ""} key={option.code}>
                    <input type="radio" name="parking-option" value={option.code} checked={selected === option.code} onChange={() => setSelected(option.code)} />
                    <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                    <b>${(option.amountCents / 100).toFixed(2)}</b>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="self-pay-agreement">
              <input type="checkbox" required />
              <span>I confirm my plate is correct and agree to exit by the time shown after payment.</span>
            </label>
            {error ? <p className="self-pay-error" role="alert">{error}</p> : null}
            <button className="self-pay-submit" type="submit" disabled={loading}>{loading ? "Opening secure checkout…" : "Pay securely with Clover"}</button>
            <p className="self-pay-secure">Secure card and mobile payment provided by Clover. No ticket needs to be displayed.</p>
          </form>
        )}
      </section>
    </main>
  );
}

