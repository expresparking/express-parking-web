import type { Metadata } from "next";
import { InquiryForm } from "../components/InquiryForm";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = {
  title: "Parking Management in Connecticut",
  description: "Garage, lot, pay-system, monthly parking, valet, and access operations from Express Parking & Mobility.",
};

const capabilities = [
  "Garage and surface-lot operations",
  "Hourly, daily, and monthly parking",
  "Automated pay and access systems",
  "Permit and validation programs",
  "Valet operations",
  "Revenue reconciliation and reporting",
];

const markets = [
  ["Commercial + residential", "Office, mixed-use, apartment, and condominium parking."],
  ["Healthcare + universities", "Medical and campus parking with complex daily demand."],
  ["Hospitality + events", "Valet, event arrivals, and temporary traffic coverage."],
  ["Municipal + district", "Public garages, downtown districts, and community facilities."],
];

export default function ParkingLandingPage() {
  return <main>
    <section className="parking-landing-hero">
      <div className="shell parking-landing-grid">
        <div>
          <span className="eyebrow light"><span className="eyebrow-line" />Express Parking</span>
          <h1>Parking operations built around access, payment, and control.</h1>
          <p>Express Parking manages garages, lots, pay systems, monthly programs, and valet operations across Connecticut.</p>
          <div className="button-row"><a className="button button-primary" href="#parking-inquiry">Request a parking proposal <ArrowIcon /></a></div>
          <div className="trust-row parking-trust"><span><CheckIcon />Established 2004</span><span><CheckIcon />Local management</span><span><CheckIcon />Documented revenue controls</span></div>
        </div>
        <div className="parking-command parking-command-photo" aria-label="Modern parking garage exterior">
          <img src="/images/modern-garage-exterior.jpg" alt="Sunlit entrance of a modern multi-level parking garage" />
          <div className="parking-command-head"><span>EXPRESS PARKING</span><b>ON SITE</b></div>
        </div>
      </div>
    </section>

    <section className="section shell parking-intro" id="capabilities">
      <div><span className="eyebrow"><span className="eyebrow-line" />Core scope</span><h2>Parking only.<br /><em>Managed end to end.</em></h2></div>
      <div><p>We keep this division focused on vehicle access, parking revenue, payment systems, permits, customer flow, and valet operations.</p><div className="parking-capabilities">{capabilities.map(item => <span key={item}><CheckIcon />{item}</span>)}</div></div>
    </section>

    <section className="parking-markets">
      <div className="shell">
        <div className="section-heading split-heading"><div><span className="eyebrow light"><span className="eyebrow-line" />Where we work</span><h2>Parking programs matched to the property.</h2></div><p>Coverage, equipment, staffing, and reporting are configured around actual site demand.</p></div>
        <div className="parking-market-grid">{markets.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>

    <section className="section shell parking-process">
      <div className="section-heading split-heading"><div><span className="eyebrow"><span className="eyebrow-line" />Transition</span><h2>Assess. Configure. Operate.</h2></div><p>A concise transition process reduces disruption and establishes clear controls from day one.</p></div>
      <div className="big-step-grid">
        <article><span>01</span><h3>Assess the site</h3><p>Review traffic, equipment, rates, staffing, permits, and current operating gaps.</p></article>
        <article><span>02</span><h3>Configure the operation</h3><p>Set coverage, payment controls, responsibilities, reporting, and launch standards.</p></article>
        <article><span>03</span><h3>Operate + report</h3><p>Manage the facility, reconcile activity, and report performance clearly.</p></article>
      </div>
    </section>

    <section className="form-section" id="parking-inquiry">
      <div className="shell form-section-grid">
        <div><span className="eyebrow light"><span className="eyebrow-line" />Parking proposal</span><h2>Tell us about the facility.</h2><p>Share the location, parking type, and current operating challenge.</p><div className="parking-contact-note"><small>DIRECT</small><a href="tel:+12039410954">203-941-0954</a><a href="mailto:info@expresparking.com">info@expresparking.com</a><span>96 Orange Street, New Haven, CT 06510</span></div></div>
        <InquiryForm title="Request a parking proposal" defaultService="Parking management" />
      </div>
    </section>
  </main>;
}
