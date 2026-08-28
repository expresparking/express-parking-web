"use client";

import { FormEvent, useState } from "react";

export function InquiryForm({ compact = false, title = "Request a site assessment", defaultService = "" }: { compact?: boolean; title?: string; defaultService?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={`form-success ${compact ? "compact" : ""}`} role="status">
        <span>✓</span>
        <div><h3>Thank you—your inquiry is ready.</h3><p>This demonstration does not send data yet. Connect the form to your business email or CRM before launch.</p></div>
      </div>
    );
  }

  return (
    <form className={`inquiry-form ${compact ? "compact" : ""}`} onSubmit={handleSubmit}>
      <div className="form-head"><span>Site inquiry</span><h2>{title}</h2><p>Tell us what you manage and where the gaps are. We’ll recommend a practical next step.</p></div>
      <div className="form-grid">
        <label htmlFor="inquiry-name"><span>Name</span><input id="inquiry-name" required name="name" placeholder="Your name" /></label>
        <label htmlFor="inquiry-email"><span>Work email</span><input id="inquiry-email" required type="email" name="email" placeholder="name@company.com" /></label>
        {!compact && <label htmlFor="inquiry-phone"><span>Phone</span><input id="inquiry-phone" type="tel" name="phone" placeholder="(000) 000-0000" /></label>}
        <label htmlFor="inquiry-property"><span>Property type</span><select id="inquiry-property" name="property"><option>Choose one</option><option>Parking facility</option><option>Mixed-use building</option><option>Office or medical</option><option>Residential property</option><option>Campus or district</option><option>Other</option></select></label>
        <label className="form-wide" htmlFor="inquiry-service"><span>Services of interest</span><select id="inquiry-service" name="service" defaultValue={defaultService}><option value="">Choose a service</option><option>Parking management</option><option>Property operations</option><option>Concierge services</option><option>Parking ambassadors</option><option>Downtown and street cleaning ambassadors</option><option>Light maintenance</option><option>Eco-friendly car care</option><option>Combined program</option></select></label>
        {!compact && <label className="form-wide" htmlFor="inquiry-message"><span>What would you like help with?</span><textarea id="inquiry-message" name="message" rows={4} placeholder="Describe the property, current challenge, or coverage you are considering." /></label>}
      </div>
      <button className="button button-primary" type="submit">Send inquiry <span aria-hidden="true">→</span></button>
      <small>Placeholder form for demonstration. No information is transmitted.</small>
    </form>
  );
}
