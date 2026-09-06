import type { Metadata } from "next";
import { InquiryForm } from "../components/InquiryForm";
import { CheckIcon } from "../ui";

export const metadata: Metadata = { title: "Contact", description: "Contact Express Parking & Mobility for parking management, property care, or Velor Car Care." };

export default function ContactPage() {
  return <main>
    <section className="contact-hero">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <span className="eyebrow light"><span className="eyebrow-line" />Contact Express</span>
          <h1>Tell us which service you need.</h1>
          <p>We’ll route your inquiry to Express Parking, Express Property Care, or Velor Car Care.</p>
          <div className="contact-points"><span><CheckIcon />Parking management</span><span><CheckIcon />Property Care</span><span><CheckIcon />Velor Car Care</span></div>
          <div className="contact-details"><div><small>PHONE</small><a href="tel:+12039410954">203-941-0954</a></div><div><small>EMAIL</small><a href="mailto:info@expresparking.com">info@expresparking.com</a></div><div><small>OFFICE</small><span>96 Orange Street, New Haven, CT 06510</span></div><div><small>PROPERTY CARE</small><span>Extension 3</span></div></div>
        </div>
        <InquiryForm title="Send an inquiry" />
      </div>
    </section>

    <section className="section shell next-steps"><div><span>01</span><h3>Send the basics</h3><p>Location, service needed, current issue, and timing.</p></div><div><span>02</span><h3>We route it</h3><p>Your request goes to the correct Express division.</p></div><div><span>03</span><h3>Next step</h3><p>We respond with the appropriate call, site visit, or service path.</p></div></section>
  </main>;
}
