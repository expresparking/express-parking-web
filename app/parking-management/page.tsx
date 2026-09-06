import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = {
  title: "Garage & Parking Management in Connecticut",
  description: "Commercial garage operations, daily and monthly commuter parking, pay systems, valet, and access management from Express Parking & Mobility.",
};

const capabilities = [
  "Commercial garage operations",
  "Daily and monthly commuter parking",
  "Automated pay and access systems",
  "Permit and validation programs",
  "Valet operations",
  "Revenue reconciliation and reporting",
];

const garageServices = [
  ["Garage Operations", "Daily facility oversight, opening and closing procedures, traffic flow, access control, staffing, and customer support."],
  ["Daily & Monthly Parking", "Clear transient rates, commuter programs, monthly permits, validations, and tenant parking administration."],
  ["Payments & Revenue Control", "Pay stations, mobile pay, PARCS, reconciliations, exception review, and documented owner reporting."],
];

export default function ParkingLandingPage() {
  return <main>
    <section className="parking-landing-hero">
      <div className="shell parking-landing-grid">
        <div>
          <span className="eyebrow light"><span className="eyebrow-line" />Commercial Garage Operations</span>
          <h1>Garage management built for daily use and monthly commuters.</h1>
          <p>Express Parking manages commercial garages, commuter parking, pay systems, access, and valet operations with direct local accountability.</p>
          <div className="button-row"><Link className="button button-primary" href="/contact">Request a parking proposal <ArrowIcon /></Link><Link className="button button-quiet" href="/find-parking">View parking locations <ArrowIcon /></Link></div>
          <div className="trust-row parking-trust"><span><CheckIcon />Established 2004</span><span><CheckIcon />Daily &amp; monthly programs</span><span><CheckIcon />Revenue controls</span></div>
        </div>
        <div className="parking-command parking-command-photo" aria-label="Well-lit commercial parking garage">
          <img src="/images/modern-garage-exterior.jpg" alt="Well-lit entrance of a modern multi-level commercial parking garage" />
          <div className="parking-command-head"><span>EXPRESS PARKING</span><b>GARAGE OPERATIONS</b></div>
        </div>
      </div>
    </section>

    <section className="section shell garage-management-highlight">
      <div className="section-heading split-heading">
        <div><span className="eyebrow"><span className="eyebrow-line" />Garage Management Services</span><h2>Operate the garage. Serve the parker. Protect the revenue.</h2></div>
        <p>Our core parking business is built around commercial garage operations and reliable daily and monthly parking programs.</p>
      </div>
      <div className="garage-highlight-grid">
        <div className="garage-highlight-image"><img src="/images/modern-garage-interior.jpg" alt="Bright secure commercial parking garage interior" /></div>
        <div className="garage-highlight-services">
          {garageServices.map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>

    <section className="section shell parking-intro" id="capabilities">
      <div><span className="eyebrow"><span className="eyebrow-line" />Core scope</span><h2>Parking only.<br /><em>Managed end to end.</em></h2></div>
      <div><p>This division stays focused on vehicle access, parking revenue, payment systems, permits, customer flow, and valet operations.</p><div className="parking-capabilities">{capabilities.map(item => <span key={item}><CheckIcon />{item}</span>)}</div></div>
    </section>

    <section className="section shell cta-panel">
      <div><span className="eyebrow"><span className="eyebrow-line" />Parking management</span><h2>Have a garage, lot, or valet operation to discuss?</h2></div>
      <div><p>Send the property type and basic operating details and we’ll respond with the right next step.</p><Link className="button button-primary" href="/contact">Request a parking proposal <ArrowIcon /></Link></div>
    </section>
  </main>;
}
