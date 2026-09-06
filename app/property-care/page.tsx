import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Care & Maintenance",
  description: "Local property oversight, secure keyholding, site checks, vendor access, photo reporting, and emergency response in New Haven.",
};

const propertyBlue = "#173A63";
const propertyAccent = "#4B7FE6";
const propertyBlueSoft = "#F4F7FB";

const services = [
  ["Secure Keyholding", "Authorized key storage and controlled access when owners cannot be on site."],
  ["Routine Site Checks", "Scheduled visual checks of common areas, exterior conditions, vacant units, and agreed inspection points."],
  ["Vendor Access Supervision", "Meet contractors, provide authorized access, and confirm arrival and completion."],
  ["Photo & Video Reporting", "Clear visual documentation after inspections, service visits, and reported issues."],
  ["Issue Triage & Coordination", "Assess reported problems and coordinate the appropriate next step or qualified vendor."],
  ["24/7 Local Emergency Dispatch", "A local response path for urgent access, condition checks, or building-security needs."],
];

export default function PropertyCarePage() {
  return (
    <main style={{ "--property-blue": propertyBlue } as React.CSSProperties}>
      <section className="service-hero" style={{ borderTop: `5px solid ${propertyAccent}`, background: "#fff" }}>
        <div className="shell">
          <span className="eyebrow" style={{ color: propertyAccent }}>EXPRESS PROPERTY CARE</span>
          <h1>Local oversight when you cannot be there.</h1>
          <p className="hero-lede">Physical building support for independent and absentee property owners.</p>
          <p>From our downtown New Haven office, Express provides boots-on-the-ground access, site checks, documentation, vendor coordination, and local response.</p>
          <div className="button-row"><Link className="button" style={{ background: propertyBlue, color: "white" }} href="/property-care/report">Report a Property Issue →</Link></div>
          <p style={{ marginTop: 18, color: "#5e6670" }}>Urgent property assistance: <a href="tel:+12039410954"><strong>203-941-0954 • Ext. 3</strong></a></p>
        </div>
      </section>

      <section className="section" style={{ background: propertyBlueSoft }}>
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow" style={{ color: propertyAccent }}>PROPERTY OVERSIGHT</span>
            <h2>Your property. Our local presence.</h2>
            <p>Designed for owners who manage the investment but need a trusted local point of contact for what happens on the ground.</p>
          </div>
          <div className="owner-proof-grid">
            {services.map(([title, copy], i) => (
              <article className="owner-proof-card" style={{ borderTop: `3px solid ${propertyAccent}`, background: "#fff" }} key={title}>
                <span className="owner-proof-number" style={{ color: propertyAccent }}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
