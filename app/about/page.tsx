import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "../ui";

export const metadata: Metadata = {
  title: "Company | Established 2004",
  description: "Express Parking & Mobility is a Connecticut parking operator established in 2004, now with distinct Parking, Property Care, and Velor service divisions.",
};

export default function AboutPage() {
  return <main>
    <section className="inner-hero about-hero">
      <div className="shell inner-hero-grid">
        <div className="about-hero-copy">
          <span className="eyebrow light"><span className="eyebrow-line" />Established 2004</span>
          <h1>Local operating experience built over two decades.</h1>
          <p>Founded in 2004, Express Parking &amp; Mobility began with parking operations in Connecticut and has grown into three focused service divisions: Express Parking, Express Property Care, and Velor Car Care.</p>
          <Link className="button button-primary" href="/contact">Contact Express <ArrowIcon /></Link>
        </div>
        <aside className="about-quote" aria-label="Express Parking operating focus">
          <span>ONE LOCAL COMPANY</span>
          <blockquote>Parking, property care, and vehicle care—separate by scope, connected by local accountability.</blockquote>
          <small>Express Parking &amp; Mobility • New Haven, Connecticut</small>
        </aside>
      </div>
    </section>

    <section className="section shell story-grid">
      <div><span className="eyebrow"><span className="eyebrow-line" />How we work</span><h2>Focused divisions. Clear responsibility.</h2></div>
      <div><p><strong>Express Parking</strong> handles vehicle access, garages, lots, payment systems, monthly parking, and valet operations.</p><p><strong>Express Property Care</strong> provides local keyholding, site checks, minor upkeep, vendor access, documentation, and emergency dispatch for owners.</p><p><strong>Velor Car Care</strong> provides waterless mobile detailing and non-toxic interior vehicle care.</p></div>
    </section>

    <section className="value-strip"><div className="shell">{[["LOCAL", "Decisions stay close to the property."], ["DEFINED", "Each division has a clear scope."], ["DOCUMENTED", "Important work is recorded and reported."], ["ACCOUNTABLE", "Clients know who owns the relationship."]].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  </main>;
}
