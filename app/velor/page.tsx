import type { Metadata } from "next";
import { ArrowIcon, CheckIcon } from "../ui";
import VelorBooking from "./VelorBooking";

export const metadata: Metadata = {
  title: "Velor Car Care | While-You-Park Service",
  description: "Waterless mobile detailing and non-toxic interior care while your vehicle is parked.",
};

export default function VelorPage() {
  return (
    <main className="velor-page">
      <section className="velor-hero">
        <div className="shell velor-hero-grid">
          <div>
            <span className="velor-wordmark">VELOR <small>CAR CARE</small></span>
            <h1>Vehicle care without the extra trip.</h1>
            <p>Waterless mobile detailing, non-toxic interior cleaning, and eco-conscious vehicle preservation completed where your car is already parked.</p>
            <div className="button-row"><a className="button velor-primary" href="#book-velor">Book Velor <ArrowIcon /></a></div>
            <div className="velor-trust"><span><CheckIcon />Waterless method</span><span><CheckIcon />Non-toxic interior care</span><span><CheckIcon />Photo-documented service</span></div>
          </div>
          <div className="velor-hero-art" aria-label="Velor while-you-park car care"><div className="velor-car-line"><span /></div><div className="velor-hero-ticket"><span>EXPRESS PARKING × VELOR</span><b>Park. Book. Return to clean.</b><small>New Haven, Connecticut</small></div></div>
        </div>
      </section>

      <section className="velor-how"><div className="shell"><div className="velor-section-head"><span>HOW IT WORKS</span><h2>Four simple steps.</h2></div><div className="velor-steps">
        <article><span>01</span><h3>Park</h3><p>Leave your vehicle at a participating Express location.</p></article>
        <article><span>02</span><h3>Book</h3><p>Select the service window and enter your vehicle and space details.</p></article>
        <article><span>03</span><h3>We care</h3><p>Velor verifies the vehicle, documents it, and completes the service.</p></article>
        <article><span>04</span><h3>Return</h3><p>Receive completion confirmation and return to a cared-for vehicle.</p></article>
      </div></div></section>

      <section className="velor-standard"><div className="shell velor-standard-grid"><div><span>THE VELOR STANDARD</span><h2>Low-impact care for active parking environments.</h2></div><div><p>Velor is designed to work cleanly inside garages and lots without creating unnecessary water runoff or disruption.</p><div className="velor-standard-list"><span>Waterless exterior process</span><span>Non-toxic interior products</span><span>Property-approved service zones</span><span>Photo-documented completion</span></div></div></div></section>

      <section className="velor-booking-section" id="book-velor"><div className="shell"><VelorBooking /></div></section>
    </main>
  );
}
