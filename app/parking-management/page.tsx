import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = {
  title: "Parking Management Services in Connecticut",
  description: "Commercial garage, healthcare, hospitality, residential, university, municipal, event, and mixed-use parking operations from Express Parking & Mobility.",
};

const garageServices = [
  ["Garage Operations", "Daily facility oversight, opening and closing procedures, traffic flow, access control, staffing, and customer support."],
  ["Daily & Monthly Parking", "Transient parking, commuter programs, monthly permits, validations, and tenant parking administration."],
  ["Payments & Revenue Control", "Pay systems, mobile payment, access systems, reconciliation, exception review, and documented owner reporting."],
];

const sectors = [
  ["01", "Class A Office", "High-capacity garage operations, tenant commuter programs, and executive monthly passes."],
  ["02", "Commercial & Mixed-Use", "Transient rate management, mobile pay setups, and customer validation workflows."],
  ["03", "Healthcare & Clinics", "Dedicated parking solutions serving clinic patients, employees, and daily visitors."],
  ["04", "Hospitality & Valet", "Professional front-door greeting, uniformed attendants, and special event coordination."],
  ["05", "Residential & Condos", "Resident permit tracking, visitor access enforcement, and controlled keycard entry programs."],
  ["06", "Universities & Education", "Campus perimeter management, event traffic direction, and student permit oversight."],
  ["07", "Municipal & District", "Transparent accounting, city lot management, district compliance, and public access."],
  ["08", "Events & Venues", "High-volume arrival management, staff direction, and rapid payment processing."],
];

const capabilities = [
  "Garage and surface-lot operations",
  "Daily, monthly, and permit parking",
  "Payment and access systems",
  "Validation and tenant programs",
  "Valet and guest-arrival operations",
  "Revenue reconciliation and reporting",
];

export default function ParkingLandingPage() {
  return <main>
    <section className="parking-landing-hero refined-parking-hero">
      <div className="shell parking-landing-grid refined-parking-hero-grid">
        <div className="refined-parking-hero-copy">
          <span className="parking-hero-kicker">Parking Management &amp; Services</span>
          <h1>Parking operations built around the property.</h1>
          <p>Express Parking manages commercial garages, surface lots, daily and monthly parking, valet operations, payment systems, and vehicle access with direct local accountability.</p>
          <div className="button-row refined-hero-actions">
            <Link className="button button-primary" href="/contact">Partner with Express <ArrowIcon /></Link>
            <Link className="button button-quiet" href="#locations">Find Parking Locations <ArrowIcon /></Link>
          </div>
        </div>
        <div className="parking-command parking-command-photo refined-parking-photo" aria-label="Commercial parking garage">
          <img src="/images/modern-garage-exterior.jpg" alt="Express Parking commercial garage facility" />
        </div>
      </div>
    </section>

    <section className="section shell garage-management-highlight" id="services">
      <div className="section-heading split-heading">
        <div><span className="eyebrow"><span className="eyebrow-line" />Garage Management</span><h2>Operate the garage. Serve the parker. Protect the revenue.</h2></div>
        <p>Commercial garage management remains a core Express capability, supported by disciplined field operations, parking programs, and revenue controls.</p>
      </div>
      <div className="garage-highlight-grid">
        <div className="garage-highlight-image"><img src="/images/modern-garage-interior.jpg" alt="Commercial parking garage interior" /></div>
        <div className="garage-highlight-services">
          {garageServices.map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>

    <section className="section parking-sector-section" id="sectors">
      <div className="shell">
        <div className="parking-sector-heading">
          <span className="parking-sector-kicker">Target Sectors</span>
          <h2>Parking expertise across the sectors we serve.</h2>
        </div>
        <div className="parking-sector-grid">
          {sectors.map(([number,title,copy]) => <article className="parking-sector-card" key={title}>
            <span className="parking-sector-number">{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section shell parking-intro" id="capabilities">
      <div><span className="eyebrow"><span className="eyebrow-line" />Operating Scope</span><h2>One parking operator.<br /><em>Multiple property environments.</em></h2></div>
      <div><p>From a downtown garage to a healthcare campus, residential property, hotel, office building, or event venue, the operating fundamentals remain clear: control access, serve the parker, protect revenue, and report the operation.</p><div className="parking-capabilities">{capabilities.map(item => <span key={item}><CheckIcon />{item}</span>)}</div></div>
    </section>

    <section className="section shell parking-local-proof" id="locations">
      <div className="parking-local-photo"><img src="/images/96-orange-interior.jpeg" alt="Express Parking operating location at 96 Orange Street in New Haven" /></div>
      <div className="parking-local-copy"><span className="eyebrow"><span className="eyebrow-line" />Express in Operation</span><h2>Local experience, not a remote operating model.</h2><p>Express Parking has operated in Connecticut since 2004. Our approach combines hands-on local accountability with the operating controls property owners expect from a professional parking manager.</p><div className="parking-local-facts"><span><b>20+</b> Years operating</span><span><b>CT</b> Local accountability</span><span><b>96</b> Orange Street</span></div><Link className="button button-quiet" href="/find-parking">View operating locations <ArrowIcon /></Link></div>
    </section>

    <section className="section shell cta-panel" id="partner">
      <div><span className="eyebrow"><span className="eyebrow-line" />Parking Management</span><h2>Looking for a better parking operator?</h2></div>
      <div><p>Tell us about the garage, lot, valet operation, or property environment. We’ll discuss an operating approach built around access, service, and revenue performance.</p><Link className="button button-primary" href="/contact">Partner with Express <ArrowIcon /></Link></div>
    </section>
  </main>;
}
