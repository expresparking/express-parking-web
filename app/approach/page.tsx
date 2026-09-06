import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "../ui";

export const metadata: Metadata = { title: "Our Approach", description: "A simple operating method for visible, documented, accountable service." };

const standards = [
  ["Prepared", "Scope, contacts, access rules, and escalation paths are defined before work begins."],
  ["Present", "Assigned team members know the site, the task, and who to contact."],
  ["Documented", "Important inspections, incidents, and handoffs are recorded consistently."],
  ["Accountable", "One responsible contact owns communication and follow-through."],
];

export default function ApproachPage() {
  return <main>
    <section className="inner-hero approach-hero"><div className="shell inner-hero-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Our approach</span><h1>Clear scope. Fast response. Useful reporting.</h1><p>Every Express assignment starts with defined responsibilities and a simple operating rhythm.</p><Link className="button button-primary" href="/contact">Discuss your site <ArrowIcon /></Link></div><div className="approach-orbit"><div className="orbit-center">EXPRESS<small>CONTROL</small></div><span className="orbit-item one">SEE</span><span className="orbit-item two">ACT</span><span className="orbit-item three">REPORT</span><span className="orbit-item four">IMPROVE</span></div></div></section>

    <section className="section shell"><div className="section-heading split-heading"><div><span className="eyebrow"><span className="eyebrow-line" />Operating rhythm</span><h2>See it. Act on it. Report it.</h2></div><p>A repeatable method keeps field work practical and client communication concise.</p></div><div className="big-step-grid">
      <article><span>01</span><strong>SEE</strong><h3>Observe the site.</h3><p>Checks, staff presence, and direct reports identify what needs attention.</p><ul><li><CheckIcon />Site conditions</li><li><CheckIcon />Access and traffic observations</li><li><CheckIcon />Open issues</li></ul></article>
      <article><span>02</span><strong>ACT</strong><h3>Use the right response.</h3><p>Complete the approved task, coordinate the right vendor, or escalate promptly.</p><ul><li><CheckIcon />Defined scope</li><li><CheckIcon />Approved response path</li><li><CheckIcon />Qualified vendor coordination</li></ul></article>
      <article><span>03</span><strong>REPORT</strong><h3>Close the loop.</h3><p>Owners receive concise status, documentation, and next steps.</p><ul><li><CheckIcon />Inspection records</li><li><CheckIcon />Photo documentation</li><li><CheckIcon />Open-item tracking</li></ul></article>
    </div></section>

    <section className="standards-section"><div className="shell standards-grid"><div><span className="eyebrow light"><span className="eyebrow-line" />Standard</span><h2>Professional service is a system.</h2><p>Clear expectations, defined roles, and consistent follow-through matter more than slogans.</p></div><div className="standard-list">{standards.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

    <section className="section shell reporting-grid"><div className="reporting-visual"><span className="report-label">SITE SUMMARY</span><h3>Operating status</h3><div className="score-row"><strong>92</strong><span>/ 100<br /><b>ON TRACK</b></span></div><div className="mini-bars"><i style={{width:"92%"}} /><i style={{width:"76%"}} /><i style={{width:"84%"}} /></div><div className="report-items"><span><b>18</b> completed</span><span><b>03</b> open</span><span><b>01</b> decision</span></div></div><div><span className="eyebrow"><span className="eyebrow-line" />Reporting</span><h2>Useful visibility without unnecessary noise.</h2><p className="section-lede">Reporting scales to the assignment—from a short shift note to a property summary with open issues, documentation, and recurring trends.</p><div className="button-row"><Link className="button button-primary" href="/contact">Request a sample plan <ArrowIcon /></Link></div></div></section>
  </main>;
}
