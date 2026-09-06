import Link from "next/link";
import { ArrowIcon, CheckIcon, ServiceIcon } from "./ui";

const services = [
  {
    number: "01",
    title: "Parking Garages",
    copy: "Professional garage operations built around revenue, access, safety, and customer service.",
    points: ["Garage operations", "Revenue management", "Access control", "Customer service"],
    href: "/parking-management",
    icon: "parking" as const,
  },
  {
    number: "02",
    title: "Surface & Open Lots",
    copy: "Reliable daily and monthly parking programs for open lots of every size.",
    points: ["Daily parking", "Monthly parking", "Permit management", "Enforcement"],
    href: "/find-parking",
    icon: "parking" as const,
  },
  {
    number: "03",
    title: "Event Parking",
    copy: "Organized arrivals and departures for venues, campuses, festivals, and private events.",
    points: ["Stadiums & festivals", "Universities", "Private events", "Traffic coordination"],
    href: "/contact",
    icon: "concierge" as const,
  },
  {
    number: "04",
    title: "Valet Parking",
    copy: "A polished first and last impression for hospitality, healthcare, residential, and events.",
    points: ["Hotels & restaurants", "Medical offices", "Residential buildings", "Luxury events"],
    href: "/contact",
    icon: "car" as const,
  },
  {
    number: "05",
    title: "Parking Ambassadors",
    copy: "Visible, professional support for drivers, pedestrians, wayfinding, and busy arrival areas.",
    points: ["Customer assistance", "Traffic direction", "Wayfinding", "Incident observation"],
    href: "/services/parking-ambassadors",
    icon: "concierge" as const,
  },
  {
    number: "06",
    title: "Property Care & Maintenance",
    copy: "Reliable local support for property owners who need trusted eyes, ears, and hands on the ground.",
    points: ["Secure keyholding", "Routine property checks", "Maintenance coordination", "24/7 emergency response"],
    href: "/property-care",
    icon: "building" as const,
    propertyCare: true,
  },
  {
    number: "07",
    title: "Velor Car Care",
    copy: "Premium eco-conscious car care completed conveniently while the vehicle is parked.",
    points: ["Eco-friendly wash", "Interior cleaning", "While-you-park service", "Monthly memberships"],
    href: "/velor",
    icon: "car" as const,
    velor: true,
  },
];

const strengths = [
  "Experienced parking professionals",
  "Modern technology",
  "Customer-first service",
  "Sustainable solutions",
  "Scalable operations",
  "Local expertise",
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
          <span className="eyebrow"><span className="eyebrow-line" />Parking operations + property care + mobility services</span>
          <h1>Parking Made Simple. <em>Mobility Made Better.</em></h1>
          <p className="hero-lede">
            Serving businesses, municipalities, hospitals, residential communities, and event venues with professional parking, property care, and mobility solutions.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/find-parking">Find parking <ArrowIcon /></Link>
            <Link className="button button-quiet" href="/contact">Request management services</Link>
          </div>
          <div className="trust-row" aria-label="Express Parking service qualities">
            <span><CheckIcon />Professional teams</span>
            <span><CheckIcon />Local expertise</span>
            <span><CheckIcon />Scalable operations</span>
          </div>
        </div>

        <div className="hero-visual hero-photo reveal reveal-delay">
          <img src="/images/modern-garage-interior.jpg" alt="Bright, modern parking garage with organized driving lanes" />
          <div className="hero-photo-label">
            <span>EXPRESS PARKING &amp; MOBILITY</span>
            <strong>Professional operations. Better arrivals.</strong>
            <small>Parking • Property Care • Valet • Events • Velor</small>
          </div>
          <div className="parking-mark"><b>P</b><span>ARRIVAL<br />MANAGED</span></div>
        </div>
      </section>

      <section className="home-positioning">
        <div className="shell">
          <span>Parking Solutions.</span>
          <span>Property Care.</span>
          <span>Premium Customer Experience.</span>
        </div>
      </section>

      <section className="section shell" id="services">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />Our services</span>
            <h2>Local operations that keep properties moving.</h2>
          </div>
          <p>Express brings parking, property care, mobility, and car-care services together under one accountable local team.</p>
        </div>
        <div className="service-grid home-service-grid">
          {services.map((service) => (
            <article className={`service-card home-service-card${service.velor ? " velor-card" : ""}${service.propertyCare ? " property-care-card" : ""}`} key={service.number}>
              <div className="service-top">
                <span>{service.number}</span>
                <ServiceIcon name={service.icon} />
              </div>
              {service.velor && <span className="powered-by">POWERED BY VELOR</span>}
              {service.propertyCare && <span className="powered-by">EXPRESS PROPERTY CARE</span>}
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul>
                {service.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <Link href={service.href} aria-label={`Learn more about ${service.title}`}>Explore service <ArrowIcon /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="why-express">
        <div className="shell why-grid">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />Why choose Express</span>
            <h2>A stronger operation customers can feel.</h2>
            <p>We combine disciplined parking management with local property support and the human service that makes properties safer, easier to navigate, and more welcoming.</p>
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
            <span className="eyebrow"><span className="eyebrow-line" />Built for property owners</span>
            <h2>A parking partnership built around your asset.</h2>
            <p>
              Express Parking &amp; Mobility combines responsive local leadership,
              transparent financial controls, and flexible technology integration.
              Every operating plan is structured around your property&apos;s revenue
              goals, customer experience, and long-term value.
            </p>
          </div>

          <div className="owner-proof-grid">
            <article className="owner-proof-card">
              <span className="owner-proof-number">01</span>
              <h3>Financial &amp; Contract Models</h3>
              <strong>Flexible agreements. Clear financial alignment.</strong>
              <p>
                Choose a management agreement, including fee-based and cost-plus
                structures, or explore a lease option designed around the property&apos;s
                operating and ownership priorities.
              </p>
              <ul className="owner-proof-list">
                <li>Management fee and cost-plus options</li>
                <li>Fixed-rent and participation lease options</li>
                <li>Property-specific budgets and operating plans</li>
                <li>Clear responsibilities and performance expectations</li>
              </ul>
              <Link href="/contact">Discuss the right contract model <ArrowIcon /></Link>
            </article>

            <article className="owner-proof-card">
              <span className="owner-proof-number">02</span>
              <h3>Revenue Protection &amp; Auditing</h3>
              <strong>Every transaction accounted for.</strong>
              <p>
                Our zero-leakage control approach uses disciplined reconciliation,
                payment-channel review, and exception tracking to strengthen
                accountability and owner visibility.
              </p>
              <ul className="owner-proof-list">
                <li>Daily revenue reconciliation</li>
                <li>Cash, mobile-pay, and PARCS transaction review</li>
                <li>Validation and exception monitoring</li>
                <li>Monthly owner reporting</li>
                <li>Audit-ready operational records</li>
              </ul>
              <Link href="/contact">Request a revenue review <ArrowIcon /></Link>
            </article>

            <article className="owner-proof-card">
              <span className="tech-badge">Tech &amp; PARCS agnostic</span>
              <h3>Keep what works. Modernize what doesn&apos;t.</h3>
              <p>
                Express can operate with your existing parking technology or help
                evaluate practical upgrades without locking your property into one
                equipment manufacturer or payment platform.
              </p>
              <ul className="owner-proof-list">
                <li>Gated and ungated facilities</li>
                <li>PARCS and pay-on-foot systems</li>
                <li>License Plate Recognition cameras</li>
                <li>Mobile-pay and digital permit platforms</li>
                <li>Validation and access-control hardware</li>
              </ul>
              <Link href="/contact">Review your parking technology <ArrowIcon /></Link>
            </article>
          </div>

          <div className="owner-proof-cta">
            <div>
              <span className="eyebrow"><span className="eyebrow-line" />Local insight. Immediate value.</span>
              <h3>Is your parking asset reaching its full potential?</h3>
              <p>In 15 minutes, we can identify operational gaps, revenue risks, customer-service concerns, and immediate improvement opportunities.</p>
            </div>
            <div className="owner-proof-actions">
              <Link className="button button-primary" href="/contact">Request a 15-Minute Site Audit <ArrowIcon /></Link>
              <a className="owner-proof-phone" href="tel:+12039410954">Call 203-941-0954</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell industries-section">
        <div className="section-heading">
          <span className="eyebrow"><span className="eyebrow-line" />Industries we serve</span>
          <h2>Built for places where every arrival matters.</h2>
        </div>
        <div className="industry-grid">
          {industries.map((industry, index) => (
            <div key={industry}><span>{String(index + 1).padStart(2, "0")}</span>{industry}</div>
          ))}
        </div>
      </section>

      <section className="velor-feature">
        <div className="shell velor-feature-grid">
          <div>
            <span className="velor-kicker">VELOR CAR CARE</span>
            <h2>Your car is already parked.</h2>
            <p>Why not have it professionally cleaned before you leave? Velor adds premium, eco-conscious car care directly to the parking experience.</p>
            <Link className="button velor-button" href="/velor">Book Velor Car Care <ArrowIcon /></Link>
          </div>
          <div className="velor-promise">
            <span>WHILE-YOU-PARK CONVENIENCE</span>
            <strong>Clean car.<br />No extra trip.</strong>
            <small>Eco-friendly wash • Interior care • Memberships</small>
          </div>
        </div>
      </section>

      <section className="section shell cta-panel">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" />Let’s improve your operation</span>
          <h2>One local partner for parking, property care, and mobility.</h2>
        </div>
        <div>
          <p>Tell us about your property, garage, lot, or event. We’ll recommend a practical operating plan built around your real needs.</p>
          <Link className="button button-primary" href="/contact">Request a proposal <ArrowIcon /></Link>
        </div>
      </section>
    </main>
  );
}
