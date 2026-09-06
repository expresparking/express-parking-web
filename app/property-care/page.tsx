import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Care & Maintenance",
  description: "Local property oversight, secure keyholding, site checks, minor maintenance, vendor access, visual reporting, and emergency response in New Haven.",
};

const propertyBlue = "#0F2742";
const propertyAccent = "#3B82F6";
const propertyBlueSoft = "#F5F8FC";

const services = [
  ["Secure Keyholding", "Authorized key storage and controlled access when owners cannot be on site."],
  ["Routine Site Checks", "Scheduled visual checks of common areas, exterior conditions, vacant units, and agreed inspection points."],
  ["Minor Maintenance & Trash Staging", "Light repairs, bulb/filter swaps, and routine garbage and recycling container take-out for scheduled pickup days."],
  ["Vendor Access & Reporting", "Meet contractors, supervise access, and provide clear photo/video visual documentation after visits and inspections."],
  ["Issue Triage & Coordination", "Assess reported problems and coordinate the appropriate next step or qualified licensed vendor."],
  ["24/7 Local Emergency Dispatch", "A local response path for urgent access, condition checks, or building-security needs."],
];

export default function PropertyCarePage() {
  return (
    <main className="property-care-theme" style={{ "--property-blue": propertyBlue } as React.CSSProperties}>
      <section className="service-hero property-care-main-hero" style={{ borderTop: `5px solid ${propertyAccent}`, background: "#fff" }}>
        <div className="shell">
          <span className="property-care-brand">EXPRESS PROPERTY CARE</span>
          <h1>Local oversight when you cannot be there.</h1>
          <p className="hero-lede">Physical building support for independent and absentee property owners.</p>
          <p>Express provides boots-on-the-ground access, routine checks, minor upkeep, documentation, vendor coordination, and local response.</p>
          <div className="button-row"><Link className="button property-care-button" href="/property-care/report">Report a Property Issue →</Link></div>
          <p className="property-care-phone">Property Care: <a href="tel:+12039410954"><strong>203-941-0954 • Ext. 2</strong></a></p>
        </div>
      </section>

      <section className="section property-care-services" style={{ background: propertyBlueSoft }}>
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow" style={{ color: propertyAccent }}>PROPERTY OVERSIGHT</span>
            <h2>Your property. Our local presence.</h2>
            <p>Designed for owners who manage the investment but need a trusted local point of contact for what happens on the ground.</p>
          </div>
          <div className="owner-proof-grid">
            {services.map(([title, copy], i) => (
              <article className="owner-proof-card" key={title}>
                <span className="owner-proof-number">{String(i + 1).padStart(2, "0")}</span>
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
