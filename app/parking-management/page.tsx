import type { Metadata } from "next";
import { InquiryForm } from "../components/InquiryForm";
import { CheckIcon } from "../ui";

export const metadata: Metadata = {
  title: "Parking Management in Connecticut",
  description: "Garage management, hourly and daily parking, monthly parking, automated payment systems, access control, and valet operations for Connecticut properties.",
};

const capabilities = [
  "Garage and surface-lot management",
  "Hourly, daily, and monthly parking programs",
  "Automated pay stations and mobile payment systems",
  "Permit, validation, and access-control administration",
  "Valet parking and vehicle arrival operations",
  "Parking revenue reconciliation and operating reports",
];

const markets = [
  ["Commercial + residential", "Parking access for office, mixed-use, apartment, and condominium properties."],
  ["Healthcare + universities", "Daily, permit, valet, and visitor parking for medical and education campuses."],
  ["Hospitality + events", "Valet, event parking, traffic control, and high-volume arrival operations."],
  ["Municipal + district", "Garage, surface-lot, pay-station, permit, and downtown parking operations."],
];

export default function ParkingLandingPage() {
  return <main className="parking-division-page">
    <section className="parking-landing-hero">
      <div className="shell parking-landing-grid">
        <div>
          <span className="eyebrow light"><span className="eyebrow-line" />EXPRESS PARKING</span>
          <h1>Vehicle access and parking operations, managed locally.</h1>
          <p>Express Parking manages the parking journey from entry to exit: garage and lot operations, hourly and daily parking, monthly permits, automated payment systems, access control, and valet service.</p>
          <div className="trust-row parking-trust">
            <span><CheckIcon />Garage management</span>
            <span><CheckIcon />Pay systems</span>
            <span><CheckIcon />Valet operations</span>
          </div>
        </div>
        <div className="parking-command parking-command-photo" aria-label="Modern parking garage exterior">
          <img src="/images/modern-garage-exterior.jpg" alt="Sunlit entrance of a modern multi-level parking garage" />
          <div className="parking-command-head"><span>EXPRESS PARKING</span><b>ON SITE</b></div>
          <div className="parking-command-list"><span><i />Entry and exit lanes active</span><span><i />Payment systems monitored</span><span><i />Parking operation staffed</span></div>
        </div>
      </div>
    </section>

    <section className="parking-promise"><div className="shell"><span>CONTROL ACCESS</span><span>PROCESS PAYMENT</span><span>MANAGE PARKING</span><span>REPORT REVENUE</span></div></section>

    <section className="section shell parking-intro" id="capabilities">
      <div><span className="eyebrow"><span className="eyebrow-line" />PARKING CAPABILITIES</span><h2>One operator for the full parking cycle.</h2></div>
      <div><p>We structure each operation around how vehicles enter, pay, park, validate, and exit. Staffing, technology, permits, rates, and valet procedures are coordinated as one parking system.</p><div className="parking-capabilities">{capabilities.map(item => <span key={item}><CheckIcon />{item}</span>)}</div></div>
    </section>

    <section className="parking-markets"><div className="shell"><div className="section-heading split-heading"><div><span className="eyebrow light"><span className="eyebrow-line" />WHERE WE OPERATE</span><h2>Parking programs built around vehicle demand.</h2></div><p>Daily parkers, monthly users, visitors, valet guests, and event traffic each require clear access and payment rules.</p></div><div className="parking-market-grid">{markets.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section shell parking-process"><div className="section-heading split-heading"><div><span className="eyebrow"><span className="eyebrow-line" />OPERATING TRANSITION</span><h2>From site review to live parking operations.</h2></div><p>We review access, rates, equipment, staffing, permits, valet requirements, and revenue controls before launch.</p></div><div className="big-step-grid">{[["01", "Review the parking system", "Map entrances, exits, equipment, rates, permits, validations, valet flow, and demand patterns."], ["02", "Build the operating plan", "Set staffing, payment procedures, access rules, reconciliation, and escalation responsibilities."], ["03", "Launch + monitor", "Start operations, review transactions and traffic flow, and adjust the parking program as needed."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="form-section" id="parking-inquiry"><div className="shell form-section-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />REQUEST A PARKING PROPOSAL</span><h2>Tell us about your garage, lot, or valet operation.</h2><p>Share the location, parking capacity, current equipment, rate structure, and operating challenge. We’ll recommend the right parking model.</p><div className="parking-contact-note"><small>DIRECT CONTACT</small><a href="tel:+12039410954">203-941-0954</a><a href="mailto:info@expresparking.com">info@expresparking.com</a><span>96 Orange Street, New Haven, CT 06510</span></div></div><InquiryForm title="Request a parking proposal" defaultService="Parking management" /></div></section>
  </main>;
}
