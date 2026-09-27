'use client';
import { FormEvent, useState, useEffect } from 'react';
import { addons, packages, sizes } from '../lib/velor-menu';
import { VELOR_WINDOWS } from '../lib/velor-booking';

export default function VelorBooking() {
  const [size, setSize] = useState(0);
  const [service, setService] = useState(0);
  const [extras, setExtras] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState('');
  const [sent, setSent] = useState(false);
  const total = sizes[size].prices[service] + extras.reduce((sum, i) => sum + addons[i].price, 0);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true); setResult('');
    try {
      const response = await fetch('/api/contact/request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        name: data.get('name'), email: data.get('email'), phone: data.get('phone'), property: '96 Orange Street Garage', service: `Velor appointment request — ${packages[service].name}`,
        message: [`Vehicle: ${sizes[size].name}`, `Package: ${packages[service].name}`, `Add-ons: ${extras.map(i => addons[i].name).join(', ') || 'None'}`, `Menu total: $${total}; parking separate unless location benefit confirmed`, ...Array.from(data.entries()).filter(([key]) => !['name','email','phone'].includes(key)).map(([key,value]) => `${key}: ${value}`), 'REQUEST ONLY: confirm availability, service duration, access and final price before payment.'].join('\n'),
      }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Unable to send. Please call 203-941-0954.');
      setSent(true); setResult(`Request received — ${body.reference}. Your appointment is not yet confirmed. We will contact you to confirm the service window, access and price before payment.`);
    } catch (error) { setResult(error instanceof Error ? error.message : 'Please call 203-941-0954.'); }
    finally { setBusy(false); }
  }
  return <div className="vr-card"><h2>Request your visit.</h2><p>Choose your care. We confirm availability and enough time before your departure. No payment is taken here.</p>
    {sent ? <p role="status">{result}</p> : <form onSubmit={submit} className="vr-form">
      <label>Vehicle size<select value={size} onChange={e => setSize(Number(e.target.value))}>{sizes.map((s,i) => <option key={s.id} value={i}>{s.name} — {s.detail}</option>)}</select></label>
      <label>Service<select value={service} onChange={e => { setService(Number(e.target.value)); setExtras([]); }}>{packages.map((p,i) => <option key={p.name} value={i}>{p.name}</option>)}</select></label>
      {service > 0 && <fieldset className="vr-full"><legend>Optional add-ons</legend>{addons.map((a,i) => <label className="vr-check" key={a.name}><input type="checkbox" checked={extras.includes(i)} onChange={e => setExtras(e.target.checked ? [...extras,i] : extras.filter(v => v !== i))}/><span>{a.name} · ${a.price}<small>{a.scope}</small></span></label>)}</fieldset>}
      <label className="vr-full">Location<input value="96 Orange Street Garage, New Haven" readOnly/><small>Other properties: use the inquiry form below. Any parking benefit is confirmed with your appointment; standard parking rates otherwise apply.</small></label>
      <label>Service date<input name="service date" type="date" required min={new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })}/></label>
      <label>Preferred service window<select name="service window" required defaultValue=""><option value="">Choose a window</option>{VELOR_WINDOWS.map(window => <option key={window.code} value={window.label}>{window.label}</option>)}</select></label>
      <label>License plate + state<input name="plate and state" required maxLength={30}/></label><label>Space number<input name="space" required maxLength={30} placeholder="Enter “not yet parked” if needed"/></label>
      <label>Vehicle make, model and color<input name="vehicle" required maxLength={120}/></label>
      <label>Interior access<select name="interior access" required><option value="">Choose an arrangement</option><option>Meet the Velor attendant</option><option>Please contact me to arrange key handoff</option>{service === 0 && <option>Exterior only — no interior access needed</option>}</select></label>
      <label>Name<input name="name" autoComplete="name" required maxLength={100}/></label><label>Email<input name="email" type="email" autoComplete="email" required/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required/></label>
      <label className="vr-full">Anything we should know?<textarea name="notes" rows={3} maxLength={2000} placeholder="Vehicle condition, access needs or fragrance request. No added fragrance is our default."/></label>
      <div className="vr-full vr-total"><strong>Service total: ${total}</strong><p>{extras.length ? `Includes up to ${extras.reduce((s,i) => s + addons[i].minutes, 0)} additional minutes of add-on work. ` : ''}We confirm your service window, full service duration and final payable amount, including any applicable tax, before payment. Parking is separate unless a location offer applies. Additional work requires your approval.</p></div>
      <label className="vr-check vr-full"><input type="checkbox" required/><span>I understand this is an appointment request, subject to confirmation. Vehicle and space will be verified before work; private service photos document the condition and completed work.</span></label>
      <button className="vr-button" disabled={busy}>{busy ? 'Sending…' : 'Request appointment'}</button><p className="vr-full" role="status">{result}</p>
    </form>}
  </div>;
}

export function InquiryLink({ interest, children }: { interest: string; children: React.ReactNode }) {
  return <a className="vr-button vr-outline" href="#velor-inquiry" onClick={() => window.dispatchEvent(new CustomEvent('velor-interest', { detail: interest }))}>{children}</a>;
}

export function VelorInquiry() {
  const [interest, setInterest] = useState('Fleet & Business Vehicle Care');
  useEffect(() => {
    const listener = (event: Event) => setInterest((event as CustomEvent<string>).detail);
    window.addEventListener('velor-interest', listener);
    return () => window.removeEventListener('velor-interest', listener);
  }, []);
  const [busy,setBusy] = useState(false); const [result,setResult] = useState(''); const [sent,setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); setBusy(true); setResult('');
    try {
      const response = await fetch('/api/contact/request', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:data.get('name'),email:data.get('email'),phone:data.get('phone'),property:data.get('location'),service:data.get('service'),message:Array.from(data.entries()).filter(([k])=>!['name','email','phone','service'].includes(k)).map(([k,v])=>`${k}: ${v}`).join('\n')})});
      const body = await response.json(); if (!response.ok) throw new Error(body.error || 'Please call 203-941-0954.'); setSent(true); setResult(`Inquiry received — ${body.reference}. We will contact you to discuss availability, scope and pricing.`);
    } catch(error) {setResult(error instanceof Error ? error.message : 'Please call 203-941-0954.');} finally {setBusy(false);}
  }
  return <div className="vr-card" id="velor-inquiry"><h2>Let’s plan your service.</h2><p>For fleets, coaches, employee gifts, property partnerships and monthly plans. All arrangements are confirmed in advance.</p>{sent ? <p role="status">{result}</p> : <form className="vr-form" onSubmit={submit}>
    <label className="vr-full">I’m interested in<select name="service" required value={interest} onChange={e => setInterest(e.target.value)}><option>Fleet & Business Vehicle Care</option><option>Bus Parking & Cleaning</option><option>Corporate Clean Car Day</option><option>Bring Velor to Your Property</option><option>Monthly Exterior Care plan</option><option>Monthly Complete Care plan</option><option>Oversized or specialty vehicle / additional cleaning</option></select></label>
    <label>Name / operator contact<input name="name" required/></label><label>Company or organization<input name="organization"/></label><label>Email<input name="email" type="email" required/></label><label>Phone<input name="phone" type="tel" required/></label><label>Service location<input name="location" required/></label><label>Vehicle or bicycle count<input name="count" type="number" min="1" required/></label>
    <label className="vr-full">Vehicle types / bus dimensions<input name="vehicle types and dimensions" placeholder="For coaches: length, width and total height including roof equipment" required/></label>
    <label>Preferred arrival / service date<input name="arrival" type="datetime-local" required/><small>New Haven local time</small></label><label>Departure / end time<input name="departure" type="datetime-local" required/></label>
    <label className="vr-full">Cleaning needs, frequency and budget<textarea name="needs" required rows={4} placeholder="For buses, include parking-only or cabin refresh and any additional cleaning. For employee gifts, include sponsorship or voucher preferences."/></label>
    <button className="vr-button" disabled={busy}>{busy ? 'Sending…' : 'Send inquiry'}</button><p className="vr-full" role="status">{result}</p>
  </form>}</div>;
}
