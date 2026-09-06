import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Care & Maintenance",
  description: "Local property support, keyholding, inspections, maintenance coordination, documentation, vendor access, and emergency response in New Haven.",
};

const services = [
  ["Secure Keyholding & Property Access", "Secure key storage and coordinated access for authorized contractors, service providers, utilities, and tenants."],
  ["Routine Property Checks", "Scheduled visual checks of common areas, exterior conditions, vacant units, and other agreed-upon areas to identify problems early."],
  ["Maintenance Response & Coordination", "We respond to maintenance requests, assess the issue, handle appropriate minor maintenance, or coordinate qualified service professionals when needed."],
  ["Photo & Video Documentation", "Clear before-and-after documentation following property checks, maintenance visits, and service calls."],
  ["Vendor Access & Oversight", "We can meet contractors and service providers, provide authorized access, and document completed work for the owner."],
  ["24/7 Emergency Response", "A defined local escalation path for urgent situations requiring assessment, authorized access, or help securing the property."],
];

export default function PropertyCarePage() {
  return (
    <main className="property-care-theme">
      <section className="service-hero property-care-hero">
        <div className="shell">
          <span className="eyebrow"><span className="eyebrow-line" />Express Property Care</span>
          <h1>Property Care &amp; Maintenance</h1>
          <p className="hero-lede">Local support for property owners who need reliable eyes, ears, and hands on the ground.</p>
          <p>Whether you live across town or out of state, Express provides dependable local support to help protect your property and handle day-to-day issues without the overhead of a full-time on-site manager.</p>
          <div className="button-row">
            <Link className="button property-care-button" href="/property-care/report">Report a Property Issue →</Link>
            <a className="button button-quiet" href="tel:+12039410954">Call 203-941-0954 • Ext. 3</a>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <span className="eyebrow"><span className="eyebrow-line" />Local property support</span>
          <h2>Your property. Our local presence.</h2>
          <p>From our downtown New Haven office at 96 Orange Street, Express gives independent property owners a reliable local point of contact when they cannot be there themselves.</p>
        </div>
        <div className="owner-proof-grid">
          {services.map(([title, copy], i) => (
            <article className="owner-proof-card property-care-card" key={title}>
              <span className="owner-proof-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell cta-panel property-care-cta">
        <div><span className="eyebrow"><span className="eyebrow-line" />Tenants &amp; owners</span><h2>Something needs attention?</h2></div>
        <div><p>Send the property address, unit, issue details, urgency, and access instructions online. For urgent property assistance, call 203-941-0954, Ext. 3.</p><Link className="button property-care-button" href="/property-care/report">Submit a Request →</Link></div>
      </section>
    </main>
  );
}
