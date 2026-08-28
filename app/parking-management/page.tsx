import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "../components/InquiryForm";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = {
  title: "Parking Management in Connecticut",
  description: "Professional parking facility management, staffing, customer support, traffic coordination, and reporting for Connecticut properties.",
};

const capabilities = ["Daily and monthly parking operations", "On-site staffing and shift supervision", "Tenant, visitor, and permit-holder support", "Traffic flow, lane, and event coordination", "Facility inspections and incident documentation", "Clear activity and performance reporting"];
const markets = [["Commercial + residential", "Office, mixed-use, apartment, and condominium parking."], ["Healthcare + universities", "Medical centers and education campuses with complex daily demand."], ["Hospitality + events", "Guest-first arrivals, wayfinding, and flexible event coverage."], ["Municipal + district", "Public garages, downtown districts, and community facilities."]];

export default function ParkingLandingPage() {
  return <main>
    <section className="parking-landing-hero"><div className="shell parking-landing-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Connecticut parking management</span><h1>A better parking experience starts with a better operator.</h1><p>Express Parking provides responsive local management for garages, lots, campuses, residential communities, and destination properties—from the first arrival to the final operating report.</p><div className="button-row"><a className="button button-primary" href="#parking-inquiry">Request a parking proposal <ArrowIcon /></a><a className="button button-light" href="#capabilities">See capabilities</a></div><div className="trust-row parking-trust"><span><CheckIcon />Local leadership</span><span><CheckIcon />Uniformed teams</span><span><CheckIcon />Documented performance</span></div></div><div className="parking-command parking-command-photo" aria-label="Modern parking garage exterior"><img src="/images/modern-garage-exterior.jpg" alt="Sunlit entrance of a modern multi-level parking garage" /><div className="parking-command-head"><span>EXPRESS OPERATIONS</span><b>ON SITE</b></div><div className="parking-command-list"><span><i />Facility open and checked</span><span><i />Ambassador coverage active</span><span><i />Owner reporting scheduled</span></div></div></div></section>

    <section className="parking-promise"><div className="shell"><span>MANAGE THE FACILITY</span><span>SUPPORT THE CUSTOMER</span><span>PROTECT THE PROPERTY</span><span>REPORT THE RESULT</span></div></section>

    <section className="section shell parking-intro" id="capabilities"><div><span className="eyebrow"><span className="eyebrow-line" />Complete operating support</span><h2>More than a staffed booth.<br /><em>A managed operation.</em></h2></div><div><p>Every site has a different mix of customers, traffic patterns, equipment, policies, and service expectations. We build the operating plan around the property—not around a generic template.</p><div className="parking-capabilities">{capabilities.map(item => <span key={item}><CheckIcon />{item}</span>)}</div></div></section>

    <section className="parking-markets"><div className="shell"><div className="section-heading split-heading"><div><span className="eyebrow light"><span className="eyebrow-line" />Where we work</span><h2>Parking programs shaped around the people they serve.</h2></div><p>From monthly parkers to first-time visitors, Express creates clear arrivals, helpful service, and accountable daily coverage.</p></div><div className="parking-market-grid">{markets.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section shell parking-process"><div className="section-heading split-heading"><div><span className="eyebrow"><span className="eyebrow-line" />A practical transition</span><h2>From site walk to steady operations.</h2></div><p>We evaluate the opportunity, define responsibilities, and launch with clear standards.</p></div><div className="big-step-grid">{[["01", "Walk the property", "Review traffic, staffing, equipment, customer needs, and current service gaps."], ["02", "Build the plan", "Define coverage, responsibilities, reporting, training, and measurable priorities."], ["03", "Launch + improve", "Start with visible supervision, document performance, and refine the program with you."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="form-section" id="parking-inquiry"><div className="shell form-section-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Request a proposal</span><h2>Let’s talk about your parking facility.</h2><p>Share the location, property type, and operating challenge. Express will recommend the most practical next step.</p><div className="parking-contact-note"><small>DIRECT CONTACT</small><a href="tel:+12039410954">203-941-0954</a><a href="mailto:info@expresparking.com">info@expresparking.com</a><span>96 Orange Street, New Haven, CT 06510</span></div></div><InquiryForm title="Request a parking proposal" defaultService="Parking management" /></div></section>

    <section className="section shell cta-panel"><div><span className="eyebrow"><span className="eyebrow-line" />More property support</span><h2>One parking partner can support the whole arrival experience.</h2></div><div><p>Add ambassadors, concierge coverage, light maintenance, property operations, or eco-friendly mobile car care as your needs grow.</p><Link className="button button-primary" href="/services">Explore all services <ArrowIcon /></Link></div></section>
  </main>;
}
