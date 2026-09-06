"use client";

import { FormEvent, useState } from "react";

export function InquiryForm({ compact = false, title = "Request a site assessment", defaultService = "" }: { compact?: boolean; title?: string; defaultService?: string }) {
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSending(true);
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send inquiry.");
      setReference(data.reference || "Submitted");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send inquiry. Please call 203-941-0954.");
    } finally {
      setSending(false);
    }
  }

  if (reference) {
    return <div className={`form-success ${compact ? "compact" : ""}`} role="status"><span>✓</span><div><h3>Inquiry received.</h3><p>Your reference number is <strong>{reference}</strong>. We will reply using the contact information you provided.</p></div></div>;
  }

  return (
    <form className={`inquiry-form ${compact ? "compact" : ""}`} onSubmit={handleSubmit}>
      <div className="form-head"><span>Inquiry</span><h2>{title}</h2><p>Share the essentials. We’ll route it to the right Express team.</p></div>
      <div className="form-grid">
        <label htmlFor="inquiry-name"><span>Name</span><input id="inquiry-name" required name="name" placeholder="Your name" /></label>
        <label htmlFor="inquiry-email"><span>Email</span><input id="inquiry-email" required type="email" name="email" placeholder="name@company.com" /></label>
        {!compact && <label htmlFor="inquiry-phone"><span>Phone</span><input id="inquiry-phone" type="tel" name="phone" placeholder="(000) 000-0000" /></label>}
        <label htmlFor="inquiry-property"><span>Property type</span><select id="inquiry-property" name="property"><option value="">Choose one</option><option>Parking facility</option><option>Commercial property</option><option>Residential property</option><option>Healthcare or campus</option><option>Hospitality or event venue</option><option>Other</option></select></label>
        <label className="form-wide" htmlFor="inquiry-service"><span>Service</span><select id="inquiry-service" required name="service" defaultValue={defaultService}><option value="">Choose one</option><option>Parking management</option><option>Parking ambassadors</option><option>Property Care</option><option>Velor Car Care</option><option>General inquiry</option></select></label>
        {!compact && <label className="form-wide" htmlFor="inquiry-message"><span>Message</span><textarea id="inquiry-message" name="message" rows={4} placeholder="Location, current need, and timing." /></label>}
      </div>
      {error && <p role="alert" style={{ color: "#a51d1d", fontWeight: 700 }}>{error}</p>}
      <button className="button button-primary" type="submit" disabled={sending}>{sending ? "Sending…" : "Send inquiry →"}</button>
    </form>
  );
}
