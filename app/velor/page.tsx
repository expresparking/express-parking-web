import type { Metadata } from "next";
import { ArrowIcon, CheckIcon } from "../ui";
import VelorBooking from "./VelorBooking";

export const metadata: Metadata = {
  title: "Velor Car Care | While-You-Park Service",
  description: "Waterless mobile detailing, non-toxic interior cleaning, and eco-friendly vehicle care while your car is parked.",
};

export default function VelorPage() {
  return (
    <main className="velor-page">
      <section className="velor-hero" style={{ background: "#090B0B" }}>
        <div className="shell velor-hero-grid">
          <div>
            <span className="velor-wordmark">VELOR <small>CAR CARE</small></span>
            <h1>Your car is parked. Let us care for it.</h1>
            <p>Specialized vehicle appearance care delivered where the car is already parked: waterless mobile detailing, non-toxic interior cleaning, and eco-friendly preservation.</p>
            <div className="button-row">
              <a className="button velor-primary" href="#book-velor">Book Velor Car Care <ArrowIcon /></a>
            </div>
            <div className="velor-trust">
              <span><CheckIcon />Waterless detailing</span>
              <span><CheckIcon />Non-toxic interior care</span>
              <span><CheckIcon />Eco-friendly vehicle preservation</span>
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
          <div className="velor-section-head"><span>HOW IT WORKS</span><h2>Car care without an extra stop.</h2></div>
          <div className="velor-steps">
            <article><span>01</span><h3>Park</h3><p>Leave your vehicle at a participating Express garage or surface lot.</p></article>
            <article><span>02</span><h3>Book</h3><p>Select the service, date, vehicle, plate, and exact parking location.</p></article>
            <article><span>03</span><h3>We detail</h3><p>Velor verifies the vehicle, documents its condition, and completes the selected service.</p></article>
            <article><span>04</span><h3>Return to clean</h3><p>Receive completion confirmation and return to a professionally cared-for vehicle.</p></article>
          </div>
        </div>
      </section>

      <section className="velor-tiers shell">
        <div className="velor-section-head"><span>VELOR SERVICES</span><h2>Focused vehicle appearance care.</h2><p>Packages can vary by vehicle and participating location.</p></div>
        <div className="velor-tier-grid">
          <article><span>EXTERIOR</span><h3>Waterless Mobile Detailing</h3><p>Low-water, zero-runoff exterior care designed for active garage and lot environments.</p><ul><li>Waterless exterior cleaning</li><li>Wheel and tire appearance care</li><li>Exterior touch-up detailing</li><li>Before-and-after photo documentation</li></ul></article>
          <article className="featured"><span>INTERIOR</span><h3>Non-Toxic Interior Care</h3><p>Interior cleaning with products selected for occupant safety and material compatibility.</p><ul><li>Interior vacuum and surface cleaning</li><li>Dashboard and trim care</li><li>Glass cleaning</li><li>Eco-conscious product selection</li></ul></article>
        </div>
        <div className="button-row"><a className="button velor-primary" href="#book-velor">Book Velor Car Care <ArrowIcon /></a></div>
      </section>

      <section className="velor-standard">
        <div className="shell velor-standard-grid">
          <div><span>THE VELOR STANDARD</span><h2>Vehicle preservation with minimal site impact.</h2></div>
          <div><p>Velor is designed specifically for parked vehicles. Our process emphasizes low runoff, careful material treatment, photo documentation, and efficient service inside active parking environments.</p><div className="velor-standard-list"><span>Waterless / low-runoff exterior methods</span><span>Non-toxic interior product selection</span><span>Property-approved service zones</span><span>Photo-documented completion</span></div></div>
        </div>
      </section>

      <section className="velor-booking-section" id="book-velor">
        <div className="shell"><VelorBooking /></div>
      </section>
    </main>
  );
}
