import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = {
  title: "Company | Established 2004",
  description: "Express Parking & Mobility has delivered trusted parking, traffic-flow, guest-care, and site-presentation operations across Connecticut since 2004.",
};

export default function AboutPage() {
  return <main>
    <section className="inner-hero about-hero">
      <div className="shell inner-hero-grid">
        <div className="about-hero-copy">
          <span className="eyebrow light"><span className="eyebrow-line" />Our heritage &amp; experience</span>
          <h1>Over two decades of mastering the operational details properties cannot ignore.</h1>
          <p>Since 2004, Express Parking &amp; Mobility has managed high-volume arrivals, traffic flow, guest care, and site presentation across Connecticut properties. We bring over 20 years of refined local execution to protect your asset&apos;s reputation and revenue.</p>
          <Link className="button button-primary about-audit-button" href="/contact">Schedule a 15-Min Site Audit <ArrowIcon /></Link>
        </div>
        <aside className="about-quote" aria-label="Express Parking operational standard">
          <span>THE OPERATIONAL STANDARD</span>
          <blockquote>“One accountable local operator bringing 20+ years of parking, property appearance, and guest management together.”</blockquote>
          <small>Express Parking — Trusted local partner since 2004</small>
        </aside>
      </div>
    </section>

    <section className="section shell story-grid"><div><span className="eyebrow"><span className="eyebrow-line" />Why this move makes sense</span><h2>The operating skills already transfer.</h2></div><div><p>Parking is not only about storing vehicles. It is a live operating environment where people need direction, properties need attention, and small issues can quickly affect safety or customer confidence.</p><p>Express Property + Guest Services extends those same strengths—visible people, clear response, local relationships, and disciplined reporting—into a broader service platform for owners and operators.</p></div></section>

    <section className="value-strip"><div className="shell">{[["LOCAL", "Decision-making stays close to the property."], ["PRACTICAL", "Programs are built around real site needs."], ["HOSPITABLE", "People are treated as guests, not interruptions."], ["ACCOUNTABLE", "One person owns the client relationship."]].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="section shell family-section"><div><span className="eyebrow"><span className="eyebrow-line" />Family-first model</span><h2>Opportunity first.<br /><em>Standards always.</em></h2><p className="section-lede">Express can draw on a large family network with business, technology, and operational talent. That is an advantage only when the company still runs with professional roles, legal employment practices, and clear accountability.</p></div><div className="role-grid">{[
      ["Leadership + sales", "Client relationships, proposals, account reviews, and pricing discipline."],
      ["Control desk", "Scheduling, work orders, timekeeping, photos, and owner reports."],
      ["Field delivery", "Site leads, ambassadors, porters, and trained maintenance team members."],
      ["Quality + growth", "Audits, training, technology, brand standards, and expansion support."]
    ].map(([title, copy]) => <article key={title}><CheckIcon /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className="client-section"><div className="shell client-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Who we serve</span><h2>Built for properties that need more coverage—not more vendors.</h2></div><div className="client-types">{["Parking owners + operators", "Commercial + mixed-use properties", "Healthcare + medical campuses", "Residential communities", "Universities + education campuses", "Hospitality + event venues", "Municipal + district buyers"].map(item => <span key={item}>{item}</span>)}</div></div></section>

    <section className="section shell cta-panel"><div><span className="eyebrow"><span className="eyebrow-line" />Start local</span><h2>One property is enough to prove the model.</h2></div><div><p>A focused 90-day pilot can test service quality, reporting, staffing, and economics before either side makes a larger commitment.</p><Link className="button button-primary" href="/contact">Request a 90-Day Pilot <ArrowIcon /></Link></div></section>
  </main>;
}
