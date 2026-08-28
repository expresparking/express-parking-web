import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = { title: "Our Approach", description: "How Express Parking delivers visible, documented, accountable property and guest services." };

const standards = [
  ["Prepared", "Site guides, post orders, contacts, and approved scopes are in place before the first shift."],
  ["Present", "Uniformed team members understand that visibility, awareness, and hospitality are part of the work."],
  ["Documented", "Inspections, incidents, service tasks, and important handoffs are recorded consistently."],
  ["Accountable", "One account lead owns communication, follow-through, and the client review rhythm."],
];

export default function ApproachPage() {
  return <main>
    <section className="inner-hero approach-hero"><div className="shell inner-hero-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Our approach</span><h1>We make service visible—and responsibility clear.</h1><p>A simple operating system connects what happens on the property to what the owner needs to know.</p><Link className="button button-primary" href="/contact">Build a service plan <ArrowIcon /></Link></div><div className="approach-orbit"><div className="orbit-center">EXPRESS<small>CONTROL</small></div><span className="orbit-item one">INSPECT</span><span className="orbit-item two">RESPOND</span><span className="orbit-item three">REPORT</span><span className="orbit-item four">IMPROVE</span></div></div></section>

    <section className="section shell"><div className="section-heading split-heading"><div><span className="eyebrow"><span className="eyebrow-line" />The operating rhythm</span><h2>See it. Solve it.<br /><em>Show it.</em></h2></div><p>The promise is intentionally simple. It gives every team member a repeatable way to think—and every client a clear expectation for what happens next.</p></div><div className="big-step-grid">
      <article><span>01</span><strong>SEE IT</strong><h3>Observe the whole property.</h3><p>Scheduled inspections, visible staff, and shift awareness identify issues before they grow.</p><ul><li><CheckIcon />Site condition checks</li><li><CheckIcon />Guest and traffic observations</li><li><CheckIcon />Safety and appearance awareness</li></ul></article>
      <article><span>02</span><strong>SOLVE IT</strong><h3>Act at the right level.</h3><p>The team completes approved tasks, coordinates a vendor, or escalates the issue without delay.</p><ul><li><CheckIcon />Clear scope boundaries</li><li><CheckIcon />Approved response paths</li><li><CheckIcon />Licensed trade coordination</li></ul></article>
      <article><span>03</span><strong>SHOW IT</strong><h3>Close the communication loop.</h3><p>Owners receive the right amount of evidence and status—not a pile of noise.</p><ul><li><CheckIcon />Shift and inspection records</li><li><CheckIcon />Photo documentation</li><li><CheckIcon />Open-item and trend reporting</li></ul></article>
    </div></section>

    <section className="standards-section"><div className="shell standards-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Service standard</span><h2>Professional does not happen by accident.</h2><p>Family-first staffing means people receive opportunity. Express standards determine who earns responsibility.</p></div><div className="standard-list">{standards.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

    <section className="section shell reporting-grid"><div className="reporting-visual"><span className="report-label">MONTHLY SITE SUMMARY</span><h3>Property health</h3><div className="score-row"><strong>92</strong><span>/ 100<br /><b>ON TRACK</b></span></div><div className="mini-bars"><i style={{width:"92%"}} /><i style={{width:"76%"}} /><i style={{width:"84%"}} /></div><div className="report-items"><span><b>18</b> items completed</span><span><b>03</b> open items</span><span><b>01</b> owner decision</span></div></div><div><span className="eyebrow"><span className="eyebrow-line" />Useful reporting</span><h2>Enough visibility to lead. Not enough noise to ignore.</h2><p className="section-lede">Reporting is scaled to the assignment—from a concise ambassador shift note to a property dashboard that shows inspections, open issues, incidents, utilization, and recurring trends.</p><div className="button-row"><Link className="button button-primary" href="/contact">Request a sample plan <ArrowIcon /></Link><Link className="button button-quiet" href="/services">Explore services</Link></div></div></section>
  </main>;
}
