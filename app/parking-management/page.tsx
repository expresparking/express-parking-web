import type { Metadata } from "next";
import Link from "next/link";
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

export default function ParkingLandingPage() {
  return <main>
    <section className="parking-landing-hero">
      <div className="shell parking-landing-grid">
        <div>
          <span className="eyebrow light"><span className="eyebrow-line" />Express Parking</span>
          <h1>Parking operations built around access, payment, and control.</h1>
          <p>Express Parking manages garages, lots, pay systems, monthly programs, and valet operations across Connecticut.</p>
          <div className="button-row"><Link className="button button-primary" href="/contact">Request a parking proposal <ArrowIcon /></Link></div>
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

    <section className="section shell cta-panel">
      <div><span className="eyebrow"><span className="eyebrow-line" />Parking management</span><h2>Have a garage, lot, or valet operation to discuss?</h2></div>
      <div><p>Send the location and basic operating details and we’ll respond with the right next step.</p><Link className="button button-primary" href="/contact">Request a parking proposal <ArrowIcon /></Link></div>
    </section>
  </main>;
}
