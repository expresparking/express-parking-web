import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./ui";

const industries = ["Commercial buildings", "Office campuses", "Hospitals", "Hotels", "Universities", "Municipalities", "Residential communities", "Shopping centers", "Special events", "Airports"];

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
      <div className="hero-visual hero-photo reveal reveal-delay">
        <img src="/images/modern-garage-interior.jpg" alt="Clean, well-lit commercial parking garage" />
        <div className="hero-photo-label"><span>EXPRESS PARKING</span><strong>Parking operations built around access, revenue and service.</strong><small>Garages • Payments • Monthly parking • Valet</small></div>
        <div className="parking-mark"><b>P</b><span>GARAGE<br />OPERATIONS</span></div>
      </div>
    </section>

    <section className="section shell garage-hero-feature" id="garage-management">
      <div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Garage Management</span><h2>Big-facility discipline. Local operating control.</h2><p>Express Parking manages the day-to-day systems that keep commercial garages moving: access, staffing, payments, monthly programs, customer service and revenue accountability.</p></div>
      <div className="garage-feature-grid">
        <article className="garage-feature-photo"><img src="/images/modern-garage-interior.jpg" alt="Commercial garage managed by Express Parking" /><div><span>COMMERCIAL GARAGE OPERATIONS</span><h3>Parking is our core business.</h3><p>Hands-on field management for owners who want direct accountability and practical operating control.</p></div></article>
        <div className="garage-feature-services">
          <article><span>01</span><h3>Garage Operations</h3><p>Opening and closing procedures, traffic flow, staffing, customer support and on-site controls.</p></article>
          <article><span>02</span><h3>Daily + Monthly Parking</h3><p>Commuter programs, permits, validations and recurring access management.</p></article>
          <article><span>03</span><h3>Payments + Revenue Control</h3><p>Payment systems, reconciliation, operating controls and revenue-focused reporting.</p></article>
          <Link className="button button-primary" href="/parking-management">Explore Garage Management <ArrowIcon /></Link>
        </div>
      </div>
    </section>

    <section className="section shell featured-location-section">
      <div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Featured Operating Location</span><h2>96 Orange Street Garage.</h2><p>Downtown New Haven • Covered garage • Daily and monthly parking.</p></div>
      <div className="featured-location-card"><img src="/images/96-orange-interior.jpeg" alt="96 Orange Street parking garage interior" /><div><span>DOWNTOWN NEW HAVEN</span><h3>A real operating location behind the Express brand.</h3><p>See current parking details, rates and access information on the Find Parking page.</p><Link className="button button-quiet" href="/find-parking">View Parking Details <ArrowIcon /></Link></div></div>
    </section>

    <section className="section shell division-section" id="services">
      <div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Additional Property Services</span><h2>Support beyond the parking operation.</h2><p>Two focused service lines are available without competing with the core parking-management message.</p></div>
      <div className="supporting-service-grid">
        <article className="division-card division-property" style={{"--division-accent":"#3B82F6","--division-image":"url(/images/property-care-building.jpg)"} as React.CSSProperties}><div className="division-card-content"><span className="division-label">EXPRESS PROPERTY CARE</span><h3>Properties Run Better.</h3><p>Local keyholding, site checks, minor upkeep, vendor access, visual reporting and emergency dispatch.</p><Link href="/property-care">Explore Property Care <ArrowIcon /></Link></div></article>
        <article className="division-card division-velor velor-booking-card"><div className="velor-booking-content"><span className="division-label">VELOR CAR CARE</span><small>WHILE YOU PARK</small><h3>Vehicle care without the extra trip.</h3><div className="velor-included velor-included-full"><strong>Included with every visit</strong><span>✓ Eco-conscious process</span><span>✓ Zero-runoff service method</span><span>✓ Before-and-after photos</span><span>✓ Completion notification</span></div><Link className="velor-book-button" href="/velor">Explore Velor <ArrowIcon /></Link></div></article>
      </div>
    </section>

    <section className="section shell industries-section"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Industries we serve</span><h2>Parking operations for properties with real vehicle-access demands.</h2></div><div className="industry-grid">{industries.map((industry,index)=><div key={industry}><span>{String(index+1).padStart(2,"0")}</span>{industry}</div>)}</div></section>

    <section className="section shell cta-panel"><div><span className="eyebrow"><span className="eyebrow-line" />Parking Management</span><h2>Need a stronger parking operation?</h2></div><div><p>Talk with Express about garage management, daily and monthly parking, vehicle access, payment controls or valet operations.</p><Link className="button button-primary" href="/contact">Get a Management Quote <ArrowIcon /></Link></div></section>
  </main>;
}
