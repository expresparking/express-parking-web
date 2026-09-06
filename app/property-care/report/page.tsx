"use client";

import { FormEvent, useState } from "react";

export default function PropertyIssuePage() {
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [mediaSummary, setMediaSummary] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/property-care/request", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to submit request.");
      setReference(data.reference || "Submitted");
      form.reset();
      setMediaSummary("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit request. Please call 203-941-0954, Ext. 2.");
    } finally {
      setSending(false);
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files?.length) return setMediaSummary("");
    const totalMb = Array.from(files).reduce((sum, file) => sum + file.size, 0) / 1024 / 1024;
    setMediaSummary(`${files.length} file${files.length === 1 ? "" : "s"} selected • ${totalMb.toFixed(1)} MB total`);
  }

  if (reference) return <main className="property-care-theme"><section className="section shell"><div className="form-success" role="status"><span>✓</span><div><h1>Request received.</h1><p>Your Express Property Care reference number is <strong>{reference}</strong>.</p><p>Our team will review the request and respond using the contact information you provided. For urgent property assistance, call 203-941-0954, Ext. 2.</p></div></div></section></main>;

  return <main className="property-care-theme">
    <section className="contact-hero property-care-request-hero"><div className="shell contact-grid">
      <div className="contact-copy">
        <span className="eyebrow light"><span className="eyebrow-line" />Express Property Care</span>
        <h1>Report a Property Issue</h1>
        <p>For tenants and property owners. Tell us what is happening, where it is happening, and how urgent it is.</p>
        <div className="contact-details"><div><small>PROPERTY CARE</small><a href="tel:+12039410954">203-941-0954 • Ext. 2</a></div><div><small>OFFICE</small><span>96 Orange Street, New Haven, CT 06510</span></div></div>
        <p><strong>Fire, suspected gas leak, medical emergency, or immediate danger:</strong> call 911 first.</p>
      </div>
      <form className="inquiry-form" onSubmit={submit} encType="multipart/form-data">
        <div className="form-head"><span>Service request</span><h2>What needs attention?</h2><p>Provide enough information for our team to assess the right next step.</p></div>
        <div className="form-grid">
          <label><span>I am a</span><select required name="role" defaultValue=""><option value="" disabled>Choose one</option><option>Tenant</option><option>Property owner</option><option>Authorized representative</option></select></label>
          <label><span>Urgency</span><select required name="urgency" defaultValue="Routine"><option>Routine</option><option>Urgent</option><option>Emergency property issue</option></select></label>
          <label><span>Name</span><input required name="name" placeholder="Your name" /></label>
          <label><span>Phone</span><input required type="tel" name="phone" placeholder="(000) 000-0000" /></label>
          <label className="form-wide"><span>Email</span><input required type="email" name="email" placeholder="name@email.com" /></label>
          <label className="form-wide"><span>Property address</span><input required name="address" placeholder="Street address, New Haven, CT" /></label>
          <label><span>Apartment / Unit</span><input name="unit" placeholder="Unit, floor, or area" /></label>
          <label><span>Issue type</span><select required name="issue" defaultValue=""><option value="" disabled>Choose one</option><option>Plumbing / water</option><option>Electrical / lighting</option><option>Heating / cooling</option><option>Lock / access</option><option>Minor maintenance</option><option>Trash / recycling staging</option><option>Common area</option><option>Cleaning / appearance</option><option>Damage</option><option>Other</option></select></label>
          <label className="form-wide"><span>Describe the issue</span><textarea required name="description" rows={5} placeholder="What happened? When did you notice it? Include any useful details." /></label>
          <label><span>Permission to enter</span><select required name="entry"><option>Call me first</option><option>Yes — authorized access</option><option>No — I must be present</option></select></label>
          <label><span>Best access time</span><input name="accessTime" placeholder="Example: weekdays after 3 PM" /></label>
          <label className="form-wide media-upload-field"><span>Photos or short video</span><input type="file" name="media" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime" multiple onChange={(e) => handleFiles(e.currentTarget.files)} /><small>Add up to 4 files. For this review version, keep the combined upload under 3.5 MB so the files can be securely delivered with the request email.</small>{mediaSummary && <strong>{mediaSummary}</strong>}</label>
        </div>
        {error && <p role="alert" style={{ color: "#a51d1d", fontWeight: 700 }}>{error}</p>}
        <button className="button property-care-button" type="submit" disabled={sending}>{sending ? "Sending…" : "Submit Property Request →"}</button>
        <small>For urgent issues, submitting this form does not replace calling 203-941-0954, Ext. 2.</small>
      </form>
    </div></section>
  </main>;
}
