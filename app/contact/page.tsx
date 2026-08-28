import type { Metadata } from "next";
import { InquiryForm } from "../components/InquiryForm";
import { CheckIcon } from "../ui";

export const metadata: Metadata = { title: "Contact", description: "Request a property services site assessment from Express Parking." };

export default function ContactPage() {
  return <main>
    <section className="contact-hero"><div className="shell contact-grid"><div className="contact-copy"><span className="eyebrow light"><span className="eyebrow-line" />Let’s talk</span><h1>Start with the property you know needs attention.</h1><p>Whether the need is a complete parking operation, one ambassador shift, or a property-care program, the best first step is a focused conversation and site walkthrough.</p><div className="contact-points"><span><CheckIcon />No-obligation initial conversation</span><span><CheckIcon />Site-specific scope and pilot recommendation</span><span><CheckIcon />Clear pricing before service begins</span></div><div className="contact-details"><div><small>PHONE</small><a href="tel:+12039410954">203-941-0954</a></div><div><small>EMAIL</small><a href="mailto:info@expresparking.com">info@expresparking.com</a></div><div><small>OFFICE</small><span>96 Orange Street, New Haven, CT 06510</span></div><div><small>SERVICE AREA</small><span>New Haven + surrounding Connecticut markets</span></div></div></div><InquiryForm /></div></section>

    <section className="section shell next-steps"><div><span>01</span><h3>Introductory call</h3><p>We learn the property, current coverage, service gaps, decision process, and desired timeline.</p></div><div><span>02</span><h3>Site walkthrough</h3><p>We observe the operating environment and identify where Express can create the most value.</p></div><div><span>03</span><h3>Pilot proposal</h3><p>You receive a clear scope, staffing plan, service levels, reporting approach, and pilot price.</p></div></section>
  </main>;
}
