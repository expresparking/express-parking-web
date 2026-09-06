import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "../ui";

export const metadata: Metadata = {
  title: "Company | Established 2004",
  description: "Express Parking & Mobility is a Connecticut parking operator established in 2004, now with distinct Parking, Property Care, and Velor service divisions.",
};

const sectors = [
  "Parking owners + operators",
  "Commercial + mixed-use properties",
  "Healthcare + medical campuses",
  "Residential communities",
  "Universities + education campuses",
  "Hospitality + event venues",
  "Municipal + district buyers",
];

export default function AboutPage() {
  return <main>
    <section className="inner-hero about-hero">
      <div className="shell inner-hero-grid">
        <div className="about-hero-copy">
          <span className="eyebrow light"><span className="eyebrow-line" />Established 2004</span>
          <h1>Local operating experience built over two decades.</h1>
          <p>Express Parking &amp; Mobility began with parking operations in Connecticut and has grown into three focused service divisions: Express Parking, Express Property Care, and Velor Car Care.</p>
          <Link className="button button-primary" href="/contact">Contact Express <ArrowIcon /></Link>
        </div>
        <aside className="about-quote" aria-label="Express Parking operating focus">
          <span>ONE LOCAL COMPANY</span>
          <blockquote>Parking management, property oversight, and vehicle care—kept separate by scope and connected by local accountability.</blockquote>
          <small>Express Parking &amp; Mobility • New Haven, Connecticut</small>
        </aside>
      </div>
    </section>

    <section className="section shell story-grid">
      <div><span className="eyebrow"><span className="eyebrow-line" />How we work</span><h2>Focused divisions. Clear responsibility.</h2></div>
      <div><p><strong>Express Parking</strong> handles vehicle access, garages, lots, payment systems, monthly parking, and valet operations.</p><p><strong>Express Property Care</strong> provides local keyholding, site checks, minor upkeep, vendor access, documentation, and emergency dispatch for owners.</p><p><strong>Velor Car Care</strong> provides waterless mobile detailing and non-toxic interior vehicle care.</p></div>
    </section>

    <section className="value-strip"><div className="shell">{[["LOCAL", "Decisions stay close to the property."], ["DEFINED", "Each division has a clear scope."], ["DOCUMENTED", "Important work is recorded and reported."], ["ACCOUNTABLE", "Clients know who owns the relationship."]].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="client-section"><div className="shell client-grid improved-client-grid"><div className="client-intro"><span className="eyebrow light"><span className="eyebrow-line" />Who we serve</span><h2>Connecticut properties with real operating needs.</h2><p>Express is built for organizations that value clear responsibility, responsive field operations and local accountability.</p></div><div className="client-types client-card-grid">{sectors.map((item,index) => <span key={item}><b>{String(index + 1).padStart(2,"0")}</b>{item}</span>)}</div></div></section>
  </main>;
}
