"use client";

import { FormEvent, useState } from "react";

export default function PropertyIssuePage() {
  const [submitted, setSubmitted] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSubmitted(true); }

  if (submitted) return <main><section className="section shell"><div className="form-success" role="status"><span>✓</span><div><h1>Request recorded on this page.</h1><p>The live notification connection is the next setup step. Until that is activated, please call 203-941-0954 for service.</p></div></div></section></main>;

  return <main>
    <section className="contact-hero"><div className="shell contact-grid">
      <div className="contact-copy">
        <span className="eyebrow light"><span className="eyebrow-line" />Express Property Care</span>
        <h1>Report a Property Issue</h1>
        <p>For tenants and property owners. Tell us what is happening, where it is happening, and how urgent it is.</p>
        <div className="contact-details"><div><small>URGENT PROPERTY ASSISTANCE</small><a href="tel:+12039410954">203-941-0954</a></div><div><small>OFFICE</small><span>96 Orange Street, New Haven, CT 06510</span></div></div>
        <p><strong>Fire, suspected gas leak, medical emergency, or immediate danger:</strong> call 911 first.</p>
      </div>
      <form className="inquiry-form" onSubmit={submit}>
        <div className="form-head"><span>Service request</span><h2>What needs attention?</h2><p>Provide enough information for our team to assess the right next step.</p></div>
        <div className="form-grid">
          <label><span>I am a</span><select required name="role" defaultValue=""><option value="" disabled>Choose one</option><option>Tenant</option><option>Property owner</option><option>Authorized representative</option></select></label>
          <label><span>Urgency</span><select required name="urgency" defaultValue="Routine"><option>Routine</option><option>Urgent</option><option>Emergency property issue</option></select></label>
          <label><span>Name</span><input required name="name" placeholder="Your name" /></label>
          <label><span>Phone</span><input required type="tel" name="phone" placeholder="(000) 000-0000" /></label>
          <label className="form-wide"><span>Email</span><input required type="email" name="email" placeholder="name@email.com" /></label>
          <label className="form-wide"><span>Property address</span><input required name="address" placeholder="Street address, New Haven, CT" /></label>
          <label><span>Apartment / Unit</span><input name="unit" placeholder="Unit, floor, or area" /></label>
          <label><span>Issue type</span><select required name="issue" defaultValue=""><option value="" disabled>Choose one</option><option>Plumbing / water</option><option>Electrical / lighting</option><option>Heating / cooling</option><option>Lock / access</option><option>Appliance</option><option>Common area</option><option>Cleaning / appearance</option><option>Damage</option><option>Other</option></select></label>
          <label className="form-wide"><span>Describe the issue</span><textarea required name="description" rows={5} placeholder="What happened? When did you notice it? Include any useful details." /></label>
          <label><span>Permission to enter</span><select required name="entry"><option>Call me first</option><option>Yes — authorized access</option><option>No — I must be present</option></select></label>
          <label><span>Best access time</span><input name="accessTime" placeholder="Example: weekdays after 3 PM" /></label>
        </div>
        <p><strong>Photo/video upload will be added when secure request storage is connected.</strong></p>
        <button className="button button-primary" type="submit">Submit Property Request →</button>
        <small>For urgent issues, submitting this form does not replace calling 203-941-0954.</small>
      </form>
    </div></section>
  </main>;
}
