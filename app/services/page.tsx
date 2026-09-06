import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "../ui";

export const metadata: Metadata = {
  title: "Services",
  description: "Three focused divisions from Express Parking & Mobility: parking management, property care, and Velor Car Care.",
};

const divisions = [
  {
    name: "Express Parking",
    copy: "Garage and lot management, hourly/daily/monthly parking, automated pay systems, access control, and valet operations.",
    href: "/parking-management",
    accent: "#C9A24A",
    background: "#171A1F",
  },
  {
    name: "Express Property Care",
    copy: "Secure keyholding, site checks, vendor access supervision, photo reporting, issue coordination, and 24/7 local emergency dispatch.",
    href: "/property-care",
    accent: "#4B7FE6",
    background: "#173A63",
  },
  {
    name: "Velor Car Care",
    copy: "Waterless mobile detailing, non-toxic interior cleaning, and eco-conscious vehicle preservation while the car is parked.",
    href: "/velor",
    accent: "#2F7D64",
    background: "#090B0B",
  },
];

export default function ServicesPage() {
  return <main>
    <section className="inner-hero services-hero"><div className="shell"><span className="eyebrow light"><span className="eyebrow-line" />Services</span><h1>Three divisions. Three clear scopes.</h1><p>Choose the service line that matches the work you need.</p></div></section>
    <section className="section shell"><div className="service-grid home-service-grid" style={{gridTemplateColumns:"repeat(3,1fr)"}}>{divisions.map((division, index) => <article className="service-card home-service-card" key={division.name} style={{background:division.background,color:"#fff",borderColor:division.background}}><div className="service-top"><span style={{color:division.accent}}>0{index+1}</span></div><h3 style={{color:"#fff"}}>{division.name}</h3><p style={{color:"#d9dde2"}}>{division.copy}</p><Link href={division.href} style={{color:division.accent}}>Explore {division.name} <ArrowIcon /></Link></article>)}</div></section>
  </main>;
}
