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
        <div className="location-content"><div className="location-kicker"><span>GARAGE</span><small>96 Orange Street</small></div><h2>96 Orange Street Parking Garage</h2><p>96 Orange Street, New Haven, CT 06510</p><div className="location-facts"><span><CheckIcon />Covered parking</span><span><CheckIcon />Hourly + monthly</span><span><CheckIcon />Downtown location</span></div><div className="rate-grid"><div><small>HOURLY</small><strong>$5</strong><span>per hour</span></div><div><small>DAILY MAX</small><strong>$20</strong><span>per day</span></div><div><small>OVERNIGHT</small><strong>$20</strong><span>per night</span></div><div><small>MONTHLY</small><strong>$175</strong><span>per month</span></div></div><div className="hours-box"><strong>Operating hours</strong><span>Monday–Thursday: 6:00 AM–9:00 PM</span><span>Friday–Saturday: 6:00 AM–2:00 AM</span><span>Sunday: Closed for now</span></div><div className="button-row"><Link className="button button-primary" href="/contact">Parking inquiry <ArrowIcon /></Link><a className="button button-quiet" href="https://www.google.com/maps/search/?api=1&query=96+Orange+Street+New+Haven+CT+06510" target="_blank" rel="noreferrer">Get directions</a></div></div>
      </article>

      <article className="location-card surface-card"><div className="surface-visual"><span>EXPRESS PARKING</span><strong>11</strong><small>ORANGE STREET</small><i>P</i></div><div className="location-content"><div className="location-kicker"><span>SURFACE LOT</span><small>11 Orange Street</small></div><h2>11 Orange Street Surface Lot</h2><p>11 Orange Street, New Haven, CT</p><div className="location-facts"><span><CheckIcon />Open surface lot</span><span><CheckIcon />Daily parking</span><span><CheckIcon />Monthly parking</span></div><div className="rate-grid rate-grid-two"><div><small>DAILY</small><strong>$10</strong><span>per day</span></div><div><small>MONTHLY</small><strong>$100</strong><span>per month</span></div></div><p className="rate-note">Availability is subject to posted signs and lot conditions. Contact Express for monthly parking enrollment.</p><div className="button-row"><Link className="button button-primary" href="/contact">Ask about monthly parking <ArrowIcon /></Link><a className="button button-quiet" href="https://www.google.com/maps/search/?api=1&query=11+Orange+Street+New+Haven+CT" target="_blank" rel="noreferrer">Get directions</a></div></div></article>
    </section>

    <section className="parking-note"><div className="shell"><div><span className="eyebrow light"><span className="eyebrow-line" />Before you park</span><h2>Rates and access made clear.</h2></div><div><p>Posted facility signs and on-site instructions govern parking. Rates and operating hours may change for holidays, special events, or operational needs.</p><Link className="button button-light" href="/contact">Contact Express <ArrowIcon /></Link></div></div></section>
  </main>;
}
