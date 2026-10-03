import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = {
  title: "Find Parking in New Haven",
  description: "View hourly, daily, overnight, and monthly parking options from Express Parking in downtown New Haven, Connecticut.",
};

export default function FindParkingPage() {
  return <main>
    <section className="find-hero"><div className="shell find-hero-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Downtown New Haven parking</span><h1>Simple parking.<br /><em>Right downtown.</em></h1><p>Choose a convenient Express location for hourly, daily, overnight, or monthly parking.</p></div></div></section>

    <section className="section shell location-list">
      <article className="location-card location-featured">
        <div className="location-gallery"><img src="/images/96-orange-exterior.jpeg" alt="Street entrance to the 96 Orange Street parking garage" /><img src="/images/96-orange-interior.jpeg" alt="Interior driving area of the 96 Orange Street parking garage" /></div>
        <div className="location-content"><div className="location-kicker"><span>GARAGE</span><small>96 Orange Street</small></div><h2>Grant Garage</h2><p>96 Orange Street, New Haven, CT 06510</p><div className="location-facts"><span><CheckIcon />Covered parking</span><span><CheckIcon />Hourly + monthly</span><span><CheckIcon />Downtown location</span></div><div className="rate-grid"><div><small>HOURLY</small><strong>$5</strong><span>per hour</span></div><div><small>2 HOURS</small><strong>$10</strong><span>hourly parking</span></div><div><small>3 HOURS</small><strong>$15</strong><span>hourly parking</span></div><div><small>DAILY MAX</small><strong>$20</strong><span>until 5 PM</span></div><div><small>EVENING</small><strong>$10</strong><span>flat rate</span></div><div><small>OVERNIGHT</small><strong>$20</strong><span>exit by 9 AM</span></div></div><div className="hours-box"><strong>Operating hours</strong><span>Monday–Thursday: 6:00 AM–9:00 PM</span><span>Friday–Saturday: 6:00 AM–2:00 AM</span><span>Sunday: Closed</span></div><div className="button-row"><Link className="button button-primary" href="/pay/grant-garage">Pay &amp; start parking <ArrowIcon /></Link><a className="button button-quiet" href="https://www.google.com/maps/search/?api=1&query=96+Orange+Street+New+Haven+CT+06510" target="_blank" rel="noreferrer">Get directions</a></div></div>
      </article>

      <article className="location-card surface-card"><div className="surface-visual"><span>EXPRESS PARKING</span><strong>11</strong><small>ORANGE STREET</small><i>P</i></div><div className="location-content"><div className="location-kicker"><span>SURFACE LOT</span><small>11 Orange Street</small></div><h2>11 Orange Street Surface Lot</h2><p>11 Orange Street, New Haven, CT</p><div className="location-facts"><span><CheckIcon />Open surface lot</span><span><CheckIcon />Daily parking</span><span><CheckIcon />Monthly parking</span></div><div className="rate-grid rate-grid-two"><div><small>DAILY</small><strong>$10</strong><span>per day</span></div><div><small>MONTHLY</small><strong>$100</strong><span>per month</span></div></div><p className="rate-note">Availability is subject to posted signs and lot conditions. Contact Express for monthly parking enrollment.</p><div className="button-row"><Link className="button button-primary" href="/contact">Ask about monthly parking <ArrowIcon /></Link><a className="button button-quiet" href="https://www.google.com/maps/search/?api=1&query=11+Orange+Street+New+Haven+CT" target="_blank" rel="noreferrer">Get directions</a></div></div></article>
    </section>

    <section id="coach-parking" className="section shell coach-parking-section">
      <div className="coach-parking-card">
        <span className="coach-kicker">96 ORANGE STREET / NEW HAVEN</span>
        <h2>Tour &amp; coach buses.<br />Park overnight. Refresh for the road.</h2>
        <p className="coach-lead">For operators bringing groups to New Haven tours, Yale campus visits, athletic trips and other group events.</p>
        <div className="coach-service-grid">
          <article><h3>Overnight Coach Parking</h3><p>Advance reservations with confirmed vehicle fit, space, and arrival/departure arrangements. Coach parking is separately quoted.</p></article>
          <article><h3>Parking + Cabin Refresh</h3><p>Add trash collection, aisle and floor cleaning, accessible surfaces, and interior glass while the coach is parked.</p></article>
          <article><h3>Additional Coach Cleaning</h3><p>Upholstery spots, luggage compartments, and suitable exterior cleaning are quoted separately after assessment.</p></article>
        </div>
        <p className="coach-note">Provide bus count, length, width, total height including roof equipment, arrival/departure times, and cleaning needs. Every booking requires fit and access confirmation. No walk-in coach availability is guaranteed.</p>
        <div className="button-row"><Link className="coach-button" href="/contact">Request Coach Parking <ArrowIcon /></Link></div>
      </div>
    </section>

    <section className="parking-note"><div className="shell"><div><span className="eyebrow light"><span className="eyebrow-line" />Before you park</span><h2>Rates and access made clear.</h2></div><div><p>Posted facility signs and on-site instructions govern parking. Rates and operating hours may change for holidays, special events, or operational needs.</p><Link className="button button-light" href="/contact">Contact Express <ArrowIcon /></Link></div></div></section>
  </main>;
}
