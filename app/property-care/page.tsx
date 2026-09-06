import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Care & Maintenance",
  description: "Boots-on-the-ground property oversight, keyholding, site checks, vendor access, photo reporting, and local emergency response in New Haven.",
};

const propertyBlue = "#173A63";
const propertyAccent = "#2F6FDB";
const propertyBlueSoft = "#F3F7FC";

const services = [
  ["Secure Keyholding & Access", "Authorized local keyholding for owner-approved property entry, contractor access, and urgent response."],
  ["Routine Site Checks", "Scheduled visual checks of exterior conditions, common areas, vacant units, and agreed-upon building areas."],
  ["Vendor Access Supervision", "We meet approved vendors, provide authorized access, confirm arrival, and document completed work for the owner."],
  ["Photo & Video Reporting", "Clear visual documentation from property checks, service visits, damage observations, and completed work."],
  ["Local Issue Response", "A local point of contact to assess reported conditions and coordinate the appropriate next step."],
  ["24/7 Emergency Dispatch", "Local dispatch for urgent property situations requiring assessment, authorized access, vendor coordination, or building security support."],
];

export default function PropertyCarePage() {
  return (
    <main style={{ "--property-blue": propertyBlue } as React.CSSProperties}>
      <section className="service-hero" style={{ borderTop: `5px solid ${propertyAccent}`, background: propertyBlue, color: "white" }}>
        <div className="shell">
          <span className="eyebrow" style={{ color: "#AFC9FF" }}>EXPRESS PROPERTY CARE</span>
          <h1 style={{ color: "white" }}>Local building oversight when you can’t be there.</h1>
          <p className="hero-lede" style={{ color: "#DCE7F5" }}>Boots-on-the-ground property support for independent and absentee owners who need a trusted local presence.</p>
          <p style={{ color: "#DCE7F5" }}>Express Property Care focuses on physical building oversight: keyholding, site checks, vendor access, visual reporting, and local emergency response. You remain in control of the property while we handle what needs attention on the ground.</p>
          <div className="button-row">
            <Link className="button" style={{ background: propertyAccent, color: "white" }} href="/property-care/report">Report a Property Issue →</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: propertyBlueSoft }}>
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow" style={{ color: propertyAccent }}>PHYSICAL PROPERTY OVERSIGHT</span>
            <h2>Your property. Our local presence.</h2>
            <p>From 96 Orange Street in downtown New Haven, Express provides a local operating presence for owners who need someone nearby to check, document, coordinate, and respond.</p>
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

      <section className="section shell cta-panel" style={{ borderTop: `4px solid ${propertyAccent}`, background: "#fff" }}>
        <div>
          <span className="eyebrow" style={{ color: propertyAccent }}>TENANTS &amp; OWNERS</span>
          <h2>Something needs attention?</h2>
        </div>
        <div>
          <p>Send the address, unit or area, issue details, urgency, and access instructions online. For urgent property assistance, call 203-941-0954, Ext. 3.</p>
          <Link className="button" style={{ background: propertyAccent, color: "white" }} href="/property-care/report">Submit a Request →</Link>
        </div>
      </section>
    </main>
  );
}
