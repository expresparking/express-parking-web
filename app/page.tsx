import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./ui";

const industries = ["Commercial buildings", "Office campuses", "Hospitals", "Hotels", "Universities", "Municipalities", "Residential communities", "Shopping centers", "Special events", "Airports"];

export default function Home() {
  return <main className="parking-home">
    <section className="hero shell">
      <div className="hero-copy reveal">
        <span className="eyebrow"><span className="eyebrow-line" />Commercial Garages • Daily & Monthly Parking</span>
        <h1>Commercial Parking Management. <em>Local Facility Operations.</em></h1>
        <p className="hero-lede">Express Parking manages commercial garages and commuter parking with disciplined vehicle access, daily and monthly programs, payment controls, valet operations, and direct local accountability.</p>
        <div className="button-row"><Link className="button button-primary" href="/contact">Request a Management Proposal <ArrowIcon /></Link><Link className="button button-quiet" href="/find-parking">Find Parking <ArrowIcon /></Link></div>
        <div className="trust-row"><span><CheckIcon />Established 2004</span><span><CheckIcon />Daily &amp; monthly parking</span><span><CheckIcon />Connecticut operator</span></div>
      </div>
      <div className="hero-visual hero-photo reveal reveal-delay">
        <img src="/images/modern-garage-interior.jpg" alt="Well-lit commercial parking garage with organized driving lanes" />
        <div className="hero-photo-label"><span>EXPRESS PARKING</span><strong>Garage operations built around access and control.</strong><small>Garages • Payments • Monthly parking • Valet</small></div>
        <div className="parking-mark"><b>P</b><span>GARAGE<br />OPERATIONS</span></div>
      </div>
    </section>

    <section className="section shell" id="featured-facility">
      <div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Featured Facility</span><h2>96 Orange Street Garage.</h2><p>A downtown New Haven operating location that reflects the practical, hands-on approach behind Express Parking.</p></div>
      <div className="division-card-grid" style={{gridTemplateColumns:"1.35fr 1fr"}}>
        <article className="division-card division-parking" style={{"--division-accent":"#F97316","--division-image":"url(/images/modern-garage-interior.jpg)", minHeight:420} as React.CSSProperties}>
          <div className="division-card-content"><span className="division-label">DOWNTOWN NEW HAVEN</span><h3>Local garage operations.</h3><p>Daily and monthly parking supported by on-site operating oversight and convenient downtown access.</p><Link href="/find-parking">View Parking Details <ArrowIcon /></Link></div>
        </article>
        <article style={{border:"1px solid #e3e5e8",borderTop:"4px solid #F97316",borderRadius:18,padding:"32px",background:"#fff"}}>
          <span className="eyebrow" style={{color:"#EA580C"}}>GARAGE MANAGEMENT SERVICES</span>
          <h3 style={{fontSize:"1.65rem",marginTop:18}}>Parking is the core operation.</h3>
          <p>Express focuses on the systems and field execution that keep commercial parking facilities organized and accountable.</p>
          <div style={{display:"grid",gap:16,marginTop:26}}><div><strong>Garage operations</strong><p>Vehicle access, traffic flow, staffing, and valet operations.</p></div><div><strong>Daily &amp; monthly parking</strong><p>Commuter access and recurring monthly parking programs.</p></div><div><strong>Payments &amp; controls</strong><p>Pay systems, operating controls, and revenue-focused oversight.</p></div></div>
          <Link className="button button-primary" href="/parking-management" style={{marginTop:26}}>Explore Garage Management <ArrowIcon /></Link>
        </article>
      </div>
    </section>

    <section className="home-positioning"><div className="shell"><span className="parking-tab">Core: Express Parking</span><span className="property-tab">Supporting: Property Care</span><span className="velor-tab">Supporting: Velor Car Care</span></div></section>

    <section className="section shell division-section" id="services">
      <div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Additional Express Services</span><h2>Support around the property and the vehicle.</h2><p>Property Care and Velor remain distinct service lines supporting the broader Express operation.</p></div>
      <div className="division-card-grid" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
        <article className="division-card division-property" style={{"--division-accent":"#3B82F6","--division-image":"url(/images/property-care-building.jpg)"} as React.CSSProperties}>
          <div className="division-card-content"><span className="division-label">EXPRESS PROPERTY CARE</span><h3>Properties Run Better.</h3><p>On-site oversight, keyholding, routine site checks, vendor access, photo reporting, and local emergency dispatch.</p><Link href="/property-care">Explore Property Care <ArrowIcon /></Link></div>
        </article>
        <article className="division-card division-velor velor-booking-card">
          <div className="velor-booking-content"><span className="division-label">VELOR CAR CARE</span><small>WHILE YOU PARK</small><h3>One-time car care</h3><div className="velor-included velor-included-full"><strong>Included with every visit</strong><span>✓ Eco-conscious process</span><span>✓ Zero-runoff service method</span><span>✓ Before-and-after photos</span><span>✓ Completion notification</span></div><p>Select your location, service window, and vehicle details on the Velor booking page.</p><Link className="velor-book-button" href="/velor">Book Now <ArrowIcon /></Link></div>
        </article>
      </div>
    </section>

    <section className="section shell industries-section"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Industries we serve</span><h2>Parking operations for properties with real vehicle-access demands.</h2></div><div className="industry-grid">{industries.map((industry,index)=><div key={industry}><span>{String(index+1).padStart(2,"0")}</span>{industry}</div>)}</div></section>

    <section className="section shell cta-panel"><div><span className="eyebrow"><span className="eyebrow-line" />Parking Management</span><h2>Need a stronger parking operation?</h2></div><div><p>Talk with Express about garage management, daily and monthly parking, vehicle access, payment controls, or valet operations.</p><Link className="button button-primary" href="/contact">Request a Management Proposal <ArrowIcon /></Link></div></section>
  </main>;
}
