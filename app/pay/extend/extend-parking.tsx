"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { getExtensionOptions } from "../../lib/self-pay";

type Session = {
  status: string;
  plate: string;
  plateState: string;
  spaceNumber: string;
  optionLabel: string;
  amountCents: number;
  startsAt: string;
  expiresAt: string;
  locationName: string;
};

export function ExtendParking() {
  const params = useSearchParams();
  const sessionId = params.get("session");
  const paymentState = params.get("payment");
  const [session, setSession] = useState<Session | null>(null);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("This parking extension link is invalid.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const response = await fetch(`/api/self-pay/session/${encodeURIComponent(sessionId!)}`, { cache: "no-store" });
        if (!response.ok) throw new Error();
        setSession(await response.json());
      } catch {
        setError("We could not load this parking session.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [sessionId]);

  const options = useMemo(
    () => session?.status === "active" ? getExtensionOptions(session.expiresAt) : [],
    [session],
  );

  const format = (value: string) => new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sessionId || !selected) {
      setError("Choose how much time you want to add.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/self-pay/extend/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, option: selected }),
      });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Unable to start checkout.");
      window.location.assign(result.checkoutUrl);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to start checkout.");
      setSubmitting(false);
    }
  }

  return (
    <main className="self-pay-page">
      <section className="self-pay-shell">
        <div className="self-pay-heading">
          <span className="self-pay-kicker">EXPRESS PARKING</span>
          <h1>Extend your parking</h1>
          <p>Add time to your current Grant Garage session without entering your vehicle information again.</p>
        </div>

        {paymentState === "failed" ? <p className="self-pay-error" role="alert">The extension payment was not completed. Your current parking expiration has not changed.</p> : null}
        {paymentState === "cancelled" ? <p className="self-pay-error" role="alert">Extension payment was cancelled. Your current parking expiration has not changed.</p> : null}

        {loading ? <div className="self-pay-notice">Loading your parking session…</div>
          : error && !session ? <div className="confirmation-problem"><h1>Unable to extend parking</h1><p>{error}</p></div>
          : session?.status !== "active" ? <div className="confirmation-problem"><h1>Parking is not active</h1><p>This session cannot be extended.</p></div>
          : options.length === 0 ? <div className="confirmation-problem"><h1>No extension is available</h1><p>Your current parking already runs to the available day-parking cutoff, or there is not enough time left in the daytime parking window.</p><p>Current expiration: <strong>{format(session.expiresAt)}</strong></p></div>
          : (
            <form className="self-pay-form" onSubmit={submit}>
              <fieldset>
                <legend>Current parking</legend>
                <div className="confirmation-active">
                  <dl>
                    <div><dt>Plate</dt><dd>{session.plateState} · {session.plate}</dd></div>
                    <div><dt>Parking space</dt><dd>{session.spaceNumber}</dd></div>
                    <div><dt>Current expiration</dt><dd>{format(session.expiresAt)}</dd></div>
                  </dl>
                </div>
              </fieldset>

              <fieldset>
                <legend>Choose additional time</legend>
                <div className="self-pay-options">
                  {options.map((option) => (
                    <label className={selected === option.code ? "selected" : ""} key={option.code}>
                      <input type="radio" name="extension-option" value={option.code} checked={selected === option.code} onChange={() => setSelected(option.code)} />
                      <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                      <b>{'$'}{(option.amountCents / 100).toFixed(2)}</b>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="self-pay-agreement">
                <input type="checkbox" required />
                <span>I understand the added time begins at my current expiration time and is active only after Clover confirms payment.</span>
              </label>

              {error ? <p className="self-pay-error" role="alert">{error}</p> : null}
              <button className="self-pay-submit" type="submit" disabled={submitting}>{submitting ? "Opening secure checkout…" : "Pay & extend with Clover"}</button>
              <p className="self-pay-secure">Your plate and space stay the same. No new ticket is required.</p>
            </form>
          )}
      </section>
    </main>
  );
}
