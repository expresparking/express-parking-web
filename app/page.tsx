import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./ui";

const industries = ["Commercial buildings", "Office campuses", "Hospitals", "Hotels", "Universities", "Municipalities", "Residential communities", "Shopping centers", "Special events", "Airports"];

export default function Home() {
  return <main className="parking-home">
    <section className="hero shell">
      <div className="hero-copy reveal">
        <span className="eyebrow"><span className="eyebrow-line" />Parking • Property Care • Velor</span>
        <h1>Parking Made Simple. <em>Mobility Made Better.</em></h1>
        <p className="hero-lede">Three focused service divisions: parking operations, local property oversight, and while-you-park vehicle care.</p>
        <div className="button-row"><Link className="button button-primary" href="/find-parking">Find parking <ArrowIcon /></Link></div>
        <div className="trust-row"><span><CheckIcon />Established 2004</span><span><CheckIcon />Local operations</span><span><CheckIcon />Direct accountability</span></div>
      </div>
      <div className="hero-visual hero-photo reveal reveal-delay">
        <img src="/images/modern-garage-interior.jpg" alt="Bright, modern parking garage with organized driving lanes" />
        <div className="hero-photo-label"><span>EXPRESS PARKING &amp; MOBILITY</span><strong>Parking. Property oversight. Vehicle care.</strong><small>Express Parking • Express Property Care • Velor</small></div>
        <div className="parking-mark"><b>P</b><span>ARRIVAL<br />MANAGED</span></div>
      </div>
    </section>

    <section className="home-positioning"><div className="shell"><span className="parking-tab">Express Parking</span><span className="property-tab">Express Property Care</span><span className="velor-tab">Velor Car Care</span></div></section>

    <section className="section shell division-section" id="services">
      <div className="division-card-grid approved-card-grid">
        <article className="division-card division-parking" style={{"--division-accent":"#F97316","--division-image":"url(/images/modern-garage-interior.jpg)"} as React.CSSProperties}>
          <div className="division-card-content">
            <span className="division-label">EXPRESS PARKING</span>
            <h3>Vehicle Access. Smarter.</h3>
            <p>Garage management, hourly/daily parking, pay systems, and valet operations.</p>
            <Link href="/parking-management">Explore Parking <ArrowIcon /></Link>
          </div>
        </article>

        <article className="division-card division-property" style={{"--division-accent":"#3B82F6","--division-image":"url(/images/property-care-building.jpg)"} as React.CSSProperties}>
          <div className="division-card-content">
            <span className="division-label">EXPRESS PROPERTY CARE</span>
            <h3>Properties Run Better.</h3>
            <p>On-site oversight, keyholding, routine site checks, vendor access, photo reporting, and 24/7 local dispatch.</p>
            <Link href="/property-care">Explore Property Care <ArrowIcon /></Link>
          </div>
        </article>

        <article className="division-card division-velor velor-booking-card">
          <div className="velor-booking-content">
            <span className="division-label">VELOR CAR CARE</span>
            <small>YOUR BOOKING</small>
            <h3>One-time car care</h3>
            <div className="velor-booking-grid">
              <div className="velor-booking-details">
                <div><b>LOCATION</b><span>96 Orange Street Garage</span></div>
                <div><b>SCHEDULE</b><span>While parked today · 9 AM–5 PM</span></div>
                <div><b>VEHICLE</b><span>Add plate and space</span></div>
              </div>
              <div className="velor-included">
                <strong>Included with every visit</strong>
                <span>✓ Eco-conscious process</span>
                <span>✓ Zero-runoff service method</span>
                <span>✓ Before-and-after photos</span>
                <span>✓ Completion notification</span>
              </div>
            </div>
            <p>Final service selection and price will be confirmed before payment.</p>
            <Link className="velor-book-button" href="/velor">Book Now <ArrowIcon /></Link>
          </div>
        </article>
      </div>
    </section>

    <section className="section shell industries-section"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Industries we serve</span><h2>Built for places where vehicle access and property operations matter.</h2></div><div className="industry-grid">{industries.map((industry,index)=><div key={industry}><span>{String(index+1).padStart(2,"0")}</span>{industry}</div>)}</div></section>

    <section className="section shell cta-panel"><div><span className="eyebrow"><span className="eyebrow-line" />Choose the right division</span><h2>Parking, property oversight, and car care—kept separate by design.</h2></div><div><p>Tell us which service you need and we’ll route the request to the right Express team.</p><Link className="button button-primary" href="/contact">Contact Express <ArrowIcon /></Link></div></section>
  </main>;
}
