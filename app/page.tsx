import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./ui";

export default function Home() {
  return <main className="parking-home">
    <section className="hero shell">
      <div className="hero-copy reveal">
        <span className="eyebrow"><span className="eyebrow-line" />Commercial Garage Operations • Connecticut</span>
        <h1>Commercial Garage Management &amp; Downtown Parking Operations</h1>
        <p className="hero-lede">Over 20 years of hands-on parking management, revenue optimization, and facility operations.</p>
        <div className="button-row"><Link className="button button-primary" href="/contact">Get a Management Quote <ArrowIcon /></Link><Link className="button button-quiet" href="/find-parking">Find Monthly Parking <ArrowIcon /></Link></div>
        <div className="trust-row"><span><CheckIcon />Established 2004</span><span><CheckIcon />Daily &amp; monthly programs</span><span><CheckIcon />Local operating accountability</span></div>
      </div>
      <div className="hero-visual hero-photo hero-garage-exterior reveal reveal-delay">
        <img src="/images/modern-garage-hero.webp" alt="Illustrative modern multi-level parking garage with wide entrance and exit lanes" />
        <div className="hero-photo-label"><span>EXPRESS PARKING</span><strong>Parking operations built around access, revenue and service.</strong><small>Garages • Payments • Monthly parking • Valet</small></div>
        <div className="parking-mark"><b>P</b><span>GARAGE<br />OPERATIONS</span></div>
      </div>
    </section>

    <section className="section shell garage-hero-feature" id="garage-management">
      <div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Garage Management</span><h2>Big-facility discipline. Local operating control.</h2><p>Express Parking manages the day-to-day systems that keep commercial garages moving: access, staffing, payments, monthly programs, customer service and revenue accountability.</p></div>
      <div className="garage-feature-grid">
        <article className="garage-feature-photo"><img src="/images/garage-pay-station.webp" alt="Illustrative large modern parking garage with a pay station at the entrance" /><div><span>COMMERCIAL GARAGE OPERATIONS</span><h3>Parking is our core business.</h3><p>Hands-on field management for owners who want direct accountability and practical operating control.</p></div></article>
        <div className="garage-feature-services">
          <article><span>01</span><h3>Garage Operations</h3><p>Opening and closing procedures, traffic flow, staffing, customer support and on-site controls.</p></article>
          <article><span>02</span><h3>Daily + Monthly Parking</h3><p>Commuter programs, permits, validations and recurring access management.</p></article>
          <article><span>03</span><h3>Payments + Revenue Control</h3><p>Payment systems, reconciliation, operating controls and revenue-focused reporting.</p></article>
          <Link className="button button-primary" href="/parking-management">Explore Garage Management <ArrowIcon /></Link>
        </div>
      </div>
    </section>

    <section className="section shell cta-panel"><div><span className="eyebrow"><span className="eyebrow-line" />Parking Management</span><h2>Need a stronger parking operation?</h2></div><div><p>Talk with Express about garage management, daily and monthly parking, vehicle access, payment controls or valet operations.</p><Link className="button button-primary" href="/contact">Get a Management Quote <ArrowIcon /></Link></div></section>
  </main>;
}
