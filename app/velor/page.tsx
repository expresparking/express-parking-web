import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "../ui";
import VelorBooking from "./VelorBooking";

export const metadata: Metadata = {
  title: "Velor Car Care | While-You-Park Service",
  description: "Book eco-conscious Velor car care while your vehicle is parked at an Express Parking location.",
};

export default function VelorPage() {
  return (
    <main className="velor-page">
      <section className="velor-hero">
        <div className="shell velor-hero-grid">
          <div>
            <span className="velor-wordmark">VELOR <small>CAR CARE</small></span>
            <h1>Your car is parked. Let us care for it.</h1>
            <p>Premium, eco-conscious car care completed right where you leave your vehicle—without an extra stop in your day.</p>
            <div className="button-row">
              <a className="button velor-primary" href="#book-velor">Book car care <ArrowIcon /></a>
              <Link className="button velor-secondary" href="/find-parking">Find an Express location</Link>
            </div>
            <div className="velor-trust">
              <span><CheckIcon />Zero-runoff method</span>
              <span><CheckIcon />Before &amp; after photos</span>
              <span><CheckIcon />While-you-park convenience</span>
            </div>
          </div>
          <div className="velor-hero-art" aria-label="Velor while-you-park car care">
            <div className="velor-car-line"><span></span></div>
            <div className="velor-hero-ticket"><span>EXPRESS PARKING × VELOR</span><b>Park. Book. Return to clean.</b><small>New Haven, Connecticut</small></div>
          </div>
        </div>
      </section>

      <section className="velor-how">
        <div className="shell">
          <div className="velor-section-head"><span>HOW IT WORKS</span><h2>As simple as parking your car.</h2></div>
          <div className="velor-steps">
            <article><span>01</span><h3>Park</h3><p>Leave your vehicle at a participating Express garage or surface lot.</p></article>
            <article><span>02</span><h3>Book</h3><p>Choose a plan, service window, and enter your plate and exact parking space.</p></article>
            <article><span>03</span><h3>We care</h3><p>Our detailer verifies the vehicle, photographs it, and completes the service.</p></article>
            <article><span>04</span><h3>Drive clean</h3><p>Receive completion confirmation and return to a professionally cared-for car.</p></article>
          </div>
        </div>
      </section>

      <section className="velor-tiers shell">
        <div className="velor-section-head"><span>CHOOSE YOUR RHYTHM</span><h2>One visit or care every month.</h2><p>Final packages and pricing can vary by vehicle and participating location.</p></div>
        <div className="velor-tier-grid">
          <article><span>FLEXIBLE</span><h3>One-Time Car Care</h3><p>Convenient service on the day your car is already parked.</p><ul><li>Choose an available date and window</li><li>Exterior or interior service options</li><li>Before-and-after photo proof</li><li>Completion notification</li></ul><a href="#book-velor">Choose one-time care <ArrowIcon /></a></article>
          <article className="featured"><span>BEST ROUTINE</span><h3>Monthly Membership</h3><p>A consistent car-care schedule with less planning each time.</p><ul><li>Recurring monthly service</li><li>Priority schedule access</li><li>Member service history</li><li>Secure recurring Clover payment once connected</li></ul><a href="#book-velor">Choose membership <ArrowIcon /></a></article>
        </div>
      </section>

      <section className="velor-standard">
        <div className="shell velor-standard-grid">
          <div><span>THE VELOR STANDARD</span><h2>Thoughtful car care. Minimal site impact.</h2></div>
          <div><p>Velor is designed for active parking environments. Our water-conscious, zero-runoff process helps protect the garage while carefully treating the vehicle.</p><div className="velor-standard-list"><span>Eco-conscious product selection</span><span>Interior-safe care protocols</span><span>Property-approved service zones</span><span>Photo-documented completion</span></div></div>
        </div>
      </section>

      <section className="velor-booking-section" id="book-velor">
        <div className="shell"><VelorBooking /></div>
      </section>
    </main>
  );
}
