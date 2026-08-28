import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "../components/InquiryForm";
import { serviceList } from "../service-data";
import { ArrowIcon, CheckIcon, ServiceIcon } from "../ui";

export const metadata: Metadata = { title: "Services", description: "Parking management, property operations, concierge, parking and downtown ambassadors, street cleaning, light maintenance, and eco-friendly car care from Express Parking." };

export default function ServicesPage() {
  return <main>
    <section className="inner-hero services-hero"><div className="shell inner-hero-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Services</span><h1>Everything between arrival and a well-run property.</h1><p>Build one focused program or combine services under a single local operating team.</p></div><div className="hero-index">{serviceList.map(s => <Link key={s.slug} href={`/services/${s.slug}`}><span>{s.number}</span><b>{s.eyebrow}</b><ArrowIcon /></Link>)}</div></div></section>
    <section className="service-card-canvas"><div className="shell service-stack">
      {serviceList.map(service => <article key={service.slug} className="service-row"><div className={`service-row-icon accent-${service.accent}`}><span>{service.number}</span><ServiceIcon name={service.icon} /></div><div><span className="eyebrow">{service.eyebrow}</span><h2>{service.title}</h2><p>{service.short}</p><div className="tag-row">{service.bestFor.map(item => <span key={item}>{item}</span>)}</div></div><Link href={`/services/${service.slug}`} className="round-link" aria-label={`View ${service.eyebrow}`}><ArrowIcon /></Link></article>)}
    </div></section>
    <section className="package-section"><div className="shell"><div className="section-heading split-heading"><div><span className="eyebrow light"><span className="eyebrow-line" />Ways to engage</span><h2>Start focused.<br /><em>Expand with proof.</em></h2></div><p>Pricing is tailored after a site walk. These package structures make it easy to test the relationship and scale only when the service is working.</p></div><div className="package-grid">{[
      ["Complete Parking Operations", "Day-to-day parking leadership built around your facility.", ["Staffing and shift oversight", "Traffic and lane coordination", "Tenant and guest support", "Documented operating reports"]],
      ["Welcome + Mobility", "Flexible staffed coverage where people need help most.", ["Ambassador or concierge post", "4-hour scheduling minimum", "Site-specific training", "Shift activity report"]],
      ["Property + Amenity Partner", "A combined program with one assigned account lead.", ["Property and guest services", "Light maintenance coordination", "Optional mobile car care", "Quarterly property review"]]
    ].map(([title, copy, items], index) => <article key={title as string}><span>0{index + 1}</span><h3>{title as string}</h3><p>{copy as string}</p><ul>{(items as string[]).map(i => <li key={i}><CheckIcon />{i}</li>)}</ul><Link href="/contact">Discuss this package <ArrowIcon /></Link></article>)}</div></div></section>
    <section className="form-section"><div className="shell form-section-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Quick inquiry</span><h2>Not sure which service fits?</h2><p>Tell us about the property and we’ll recommend the simplest place to begin.</p></div><InquiryForm compact title="Find the right starting point" /></div></section>
  </main>;
}
