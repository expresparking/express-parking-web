import Link from "next/link";
import { ArrowIcon, CheckIcon, ServiceIcon } from "./ui";

const divisions = [
  {
    number: "01",
    title: "Express Parking",
    role: "Vehicle access and parking management for drivers, shoppers, commuters, residents, and guests.",
    points: ["Garage management", "Hourly & daily parking", "Monthly parking", "Automated pay systems", "Valet operations"],
    href: "/parking-management",
    icon: "parking" as const,
    background: "#171A1F",
    accent: "#C9A24A",
    text: "#FFFFFF",
    muted: "#D4D6DA",
  },
  {
    number: "02",
    title: "Express Property Care",
    role: "Physical building oversight and operational support for independent and absentee property owners.",
    points: ["Secure keyholding", "Routine site checks", "Vendor access supervision", "Photo reporting", "24/7 local emergency dispatch"],
    href: "/property-care",
    icon: "building" as const,
    background: "#173A63",
    accent: "#4B7FE6",
    text: "#FFFFFF",
    muted: "#DCE7F5",
  },
  {
    number: "03",
    title: "Velor Car Care",
    role: "Specialized vehicle appearance and detailing services while the vehicle is already parked.",
    points: ["Waterless mobile detailing", "Non-toxic interior cleaning", "Eco-friendly vehicle preservation", "Photo-documented service"],
    href: "/velor",
    icon: "car" as const,
    background: "#090B0B",
    accent: "#2F7D64",
    text: "#FFFFFF",
    muted: "#D6E5DF",
  },
];

const strengths = [
  "Established local operator",
  "Modern parking technology",
  "Direct local accountability",
  "Documented operating controls",
  "Scalable site coverage",
  "Connecticut market knowledge",
];

const industries = [
  "Commercial buildings",
  "Office campuses",
  "Hospitals",
  "Hotels",
  "Universities",
  "Municipalities",
  "Residential communities",
  "Shopping centers",
  "Special events",
  "Airports",
];

export default function Home() {
  return (
    <main className="parking-home">
      <section className="hero shell">
        <div className="hero-copy reveal">
          <span className="eyebrow"><span className="eyebrow-line" />Parking • Property Care • Velor</span>
          <h1>Parking Made Simple. <em>Mobility Made Better.</em></h1>
          <p className="hero-lede">
            Three focused service divisions: parking operations, local property oversight, and while-you-park vehicle care.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/find-parking">Find parking <ArrowIcon /></Link>
          </div>
          <div className="trust-row" aria-label="Express Parking service qualities">
            <span><CheckIcon />Established 2004</span>
            <span><CheckIcon />Local operations</span>
            <span><CheckIcon />Direct accountability</span>
          </div>
        </div>

        <div className="hero-visual hero-photo reveal reveal-delay">
          <img src="/images/modern-garage-interior.jpg" alt="Bright, modern parking garage with organized driving lanes" />
          <div className="hero-photo-label">
            <span>EXPRESS PARKING &amp; MOBILITY</span>
            <strong>Parking. Property oversight. Vehicle care.</strong>
            <small>Express Parking • Express Property Care • Velor</small>
          </div>
          <div className="parking-mark"><b>P</b><span>ARRIVAL<br />MANAGED</span></div>
        </div>
      </section>

      <section className="home-positioning">
        <div className="shell">
          <span style={{ borderTop: "3px solid #C9A24A" }}>Express Parking</span>
          <span style={{ borderTop: "3px solid #4B7FE6" }}>Express Property Care</span>
          <span style={{ borderTop: "3px solid #2F7D64" }}>Velor Car Care</span>
        </div>
      </section>

      <section className="section shell" id="services">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />Three distinct service lines</span>
            <h2>Clear scope. Clear responsibility.</h2>
          </div>
          <p>Each division has a defined role, its own operating focus, and a separate visual identity.</p>
        </div>
        <div className="service-grid home-service-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {divisions.map((division) => (
            <article
              className="service-card home-service-card"
              key={division.number}
              style={{
                background: division.background,
                color: division.text,
                borderColor: division.background,
                boxShadow: "0 18px 42px rgba(22,24,28,.12)",
              }}
            >
              <div className="service-top">
                <span style={{ color: division.accent }}>{division.number}</span>
                <ServiceIcon name={division.icon} />
              </div>
              <h3 style={{ color: division.text }}>{division.title}</h3>
              <p style={{ color: division.muted }}>{division.role}</p>
              <ul>
                {division.points.map((point) => <li key={point} style={{ color: division.muted, borderColor: "rgba(255,255,255,.12)" }}>{point}</li>)}
              </ul>
              <Link href={division.href} aria-label={`Explore ${division.title}`} style={{ color: division.accent }}>Explore {division.title} <ArrowIcon /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="why-express">
        <div className="shell why-grid">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />Why Express</span>
            <h2>Local operating control without national-company distance.</h2>
            <p>Express combines local decision-making, documented procedures, modern parking tools, and direct owner communication across Connecticut properties.</p>
          </div>
          <div className="strength-grid">
            {strengths.map((strength, index) => (
              <div key={strength}><span>0{index + 1}</span><strong>{strength}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="owner-proof-section">
        <div className="shell owner-proof-inner">
          <div className="owner-proof-header">
            <span className="eyebrow"><span className="eyebrow-line" />Built for parking owners</span>
            <h2>Parking management with financial visibility.</h2>
            <p>
              Express Parking &amp; Mobility structures parking operations around revenue controls,
              access, payment systems, customer flow, and clearly defined contract responsibilities.
            </p>
          </div>

          <div className="owner-proof-grid">
            <article className="owner-proof-card">
              <span className="owner-proof-number">01</span>
              <h3>Financial &amp; Contract Models</h3>
              <strong>Flexible agreements. Clear financial alignment.</strong>
              <p>
                Choose a management agreement, including fee-based and cost-plus structures,
                or explore a lease option designed around the parking asset&apos;s operating priorities.
              </p>
              <ul className="owner-proof-list">
                <li>Management fee and cost-plus options</li>
                <li>Fixed-rent and participation lease options</li>
                <li>Parking-specific budgets and operating plans</li>
                <li>Clear responsibilities and performance expectations</li>
              </ul>
              <Link href="/contact">Discuss the right contract model <ArrowIcon /></Link>
            </article>

            <article className="owner-proof-card">
              <span className="owner-proof-number">02</span>
              <h3>Revenue Protection &amp; Auditing</h3>
              <strong>Every parking transaction accounted for.</strong>
              <p>
                Reconciliation, payment-channel review, and exception tracking strengthen
                accountability across gated, ungated, mobile-pay, and staffed operations.
              </p>
              <ul className="owner-proof-list">
                <li>Daily parking revenue reconciliation</li>
                <li>Cash, mobile-pay, and PARCS transaction review</li>
                <li>Validation and exception monitoring</li>
                <li>Monthly owner reporting</li>
                <li>Audit-ready operating records</li>
              </ul>
              <Link href="/contact">Request a revenue review <ArrowIcon /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell industries-section">
        <div className="section-heading">
          <span className="eyebrow"><span className="eyebrow-line" />Industries we serve</span>
          <h2>Built for places where vehicle access and property operations matter.</h2>
        </div>
        <div className="industry-grid">
          {industries.map((industry, index) => (
            <div key={industry}><span>{String(index + 1).padStart(2, "0")}</span>{industry}</div>
          ))}
        </div>
      </section>

      <section className="section shell cta-panel">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" />Choose the right division</span>
          <h2>Parking, property oversight, and car care—kept separate by design.</h2>
        </div>
        <div>
          <p>Tell us which service you need and we’ll route the request to the right Express team.</p>
          <Link className="button button-primary" href="/contact">Contact Express <ArrowIcon /></Link>
        </div>
      </section>
    </main>
  );
}
