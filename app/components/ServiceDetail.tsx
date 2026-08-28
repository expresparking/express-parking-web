import Link from "next/link";
import { Service } from "../service-data";
import { ArrowIcon, CheckIcon, ServiceIcon } from "../ui";
import { InquiryForm } from "./InquiryForm";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <main>
      <section className={`inner-hero service-hero accent-${service.accent}`}>
        <div className="shell inner-hero-grid">
          <div>
            <span className="eyebrow light"><span className="eyebrow-line" />{service.eyebrow}</span>
            <h1>{service.title}</h1>
            <p>{service.short}</p>
            <div className="button-row"><Link className="button button-primary" href="/contact">Discuss your property <ArrowIcon /></Link><Link className="button button-outline-light" href="/services">All services</Link></div>
          </div>
          <div className="service-hero-panel">
            <span>{service.number}</span><ServiceIcon name={service.icon} />
            <p>{service.promise}</p>
            <div>{service.bestFor.map((item) => <small key={item}>{item}</small>)}</div>
          </div>
        </div>
      </section>

      <section className="section shell detail-grid">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" />What’s included</span>
          <h2>A clear scope from day one.</h2>
          <p className="section-lede">The final service plan is tailored to the property, but every engagement begins with a written responsibility map and a measurable reporting standard.</p>
        </div>
        <div className="check-list">
          {service.includes.map((item) => <div key={item}><CheckIcon /><span>{item}</span></div>)}
        </div>
      </section>

      <section className="outcome-band">
        <div className="shell outcome-grid">
          {service.outcomes.map((item) => <article key={item.label}><strong>{item.metric}</strong><h3>{item.label}</h3><p>{item.note}</p></article>)}
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading"><div><span className="eyebrow"><span className="eyebrow-line" />How delivery works</span><h2>Simple, visible,<br /><em>repeatable.</em></h2></div><p>Express uses the same operating rhythm at every site: understand the property, set a practical service standard, then document the work and improve it.</p></div>
        <div className="step-grid">{service.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
      </section>

      <section className="form-section"><div className="shell form-section-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Start a conversation</span><h2>Could this service work at your property?</h2><p>Share a few details and we’ll shape a site-specific walkthrough or 90-day pilot.</p></div><InquiryForm compact title="Ask about this service" defaultService={service.slug === "downtown-ambassadors" ? "Downtown and street cleaning ambassadors" : service.eyebrow.charAt(0).toUpperCase() + service.eyebrow.slice(1)} /></div></section>
    </main>
  );
}
