import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./ui";

const divisions = [
  {
    label: "EXPRESS PARKING",
    headline: "Vehicle Access. Smarter.",
    role: "Garage management, hourly/daily parking, pay systems, and valet operations.",
    href: "/parking-management",
    cta: "Explore Parking",
    image: "/images/modern-garage-interior.jpg",
    accent: "#F97316",
    className: "division-parking",
  },
  {
    label: "EXPRESS PROPERTY CARE",
    headline: "Properties Run Better.",
    role: "On-site oversight, keyholding, routine site checks, vendor access, photo reporting, and 24/7 local dispatch.",
    href: "/property-care",
    cta: "Explore Property Care",
    image: "/images/property-care-building.jpg",
    accent: "#3B82F6",
    className: "division-property",
  },
  {
    label: "VELOR CAR CARE",
    headline: "A Cleaner Drive Forward.",
    role: "Waterless detailing, non-toxic interior cleaning, and eco-friendly vehicle care.",
    href: "/velor",
    cta: "Explore Velor",
    image: "/images/velor-car-care.jpg",
    accent: "#10B981",
    className: "division-velor",
  },
];

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
      <div className="division-card-grid">
        {divisions.map((division) => <article className={`division-card ${division.className}`} key={division.label} style={{"--division-accent": division.accent, "--division-image": `url(${division.image})`} as React.CSSProperties}>
          <div className="division-card-content"><span className="division-label">{division.label}</span><h3>{division.headline}</h3><p>{division.role}</p><Link href={division.href}>{division.cta} <ArrowIcon /></Link></div>
        </article>)}
      </div>
    </section>

    <section className="section shell industries-section"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" />Industries we serve</span><h2>Built for places where vehicle access and property operations matter.</h2></div><div className="industry-grid">{industries.map((industry,index)=><div key={industry}><span>{String(index+1).padStart(2,"0")}</span>{industry}</div>)}</div></section>

    <section className="section shell cta-panel"><div><span className="eyebrow"><span className="eyebrow-line" />Choose the right division</span><h2>Parking, property oversight, and car care—kept separate by design.</h2></div><div><p>Tell us which service you need and we’ll route the request to the right Express team.</p><Link className="button button-primary" href="/contact">Contact Express <ArrowIcon /></Link></div></section>
  </main>;
}
