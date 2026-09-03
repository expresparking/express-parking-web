"use client";

import { FormEvent, useMemo, useState } from "react";
import { demoPermits, ParkingPermit } from "../../lib/parking-data";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  year: "",
  make: "",
  model: "",
  color: "",
  plate: "",
  state: "CT",
  location: "Express Parking - New Haven",
  assignedSpace: "",
  monthlyRate: "165",
  validThrough: "2026-09-30",
};

export default function ParkingAdminPage() {
  const [permits, setPermits] = useState<ParkingPermit[]>(demoPermits);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState<ParkingPermit | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return permits;
    return permits.filter((permit) =>
      [
        permit.permitNumber,
        permit.id,
        permit.customer.name,
        permit.vehicle.plate,
        permit.location,
      ].some((value) => value.toLowerCase().includes(q))
    );
  }, [permits, search]);

  const active = permits.filter((permit) => permit.status === "active" && permit.paid).length;
  const attention = permits.length - active;
  const monthlyRevenue = permits
    .filter((permit) => permit.status === "active" && permit.paid)
    .reduce((sum, permit) => sum + permit.monthlyRate, 0);

  function addParker(event: FormEvent) {
    event.preventDefault();
    const sequence = String(125 + permits.length).padStart(6, "0");
    const token = Math.random().toString(36).slice(2, 8).toUpperCase();
    const permit: ParkingPermit = {
      id: `XP-P-${token}`,
      permitNumber: `XP-${sequence}`,
      status: "active",
      paid: true,
      monthlyRate: Number(form.monthlyRate) || 0,
      validThrough: form.validThrough,
      location: form.location,
      customer: { name: form.name, phone: form.phone, email: form.email },
      vehicle: {
        year: Number(form.year) || new Date().getFullYear(),
        make: form.make,
        model: form.model,
        color: form.color,
        plate: form.plate.toUpperCase(),
        state: form.state.toUpperCase(),
      },
      assignedSpace: form.assignedSpace || null,
      lastEntry: null,
      velor: { scheduled: false, service: null, time: null },
    };
    setPermits((current) => [permit, ...current]);
    setForm(emptyForm);
    setShowForm(false);
    setSelected(permit);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f5f6f7", padding: 24, color: "#16181c" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.4, color: "#ff5a00" }}>EXPRESS PARKING & MOBILITY</div>
            <h1 style={{ margin: "6px 0 4px", fontSize: 36 }}>Monthly Parking Manager</h1>
            <p style={{ margin: 0, color: "#676d75" }}>Create permits, manage vehicles and prepare windshield credentials.</p>
          </div>
          <button onClick={() => setShowForm((value) => !value)} style={primaryButton}>
            {showForm ? "Close Form" : "+ Add Monthly Parker"}
          </button>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginTop: 24 }}>
          <Metric label="Monthly parkers" value={String(permits.length)} />
          <Metric label="Active & paid" value={String(active)} />
          <Metric label="Needs attention" value={String(attention)} />
          <Metric label="Active monthly revenue" value={`$${monthlyRevenue.toLocaleString()}`} />
        </section>

        {showForm && (
          <form onSubmit={addParker} style={{ marginTop: 20, background: "white", padding: 20, borderRadius: 18, boxShadow: "0 8px 30px rgba(0,0,0,.06)" }}>
            <h2 style={{ marginTop: 0 }}>Add Monthly Parker</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
              {[
                ["name", "Customer name", "text"], ["phone", "Phone", "tel"], ["email", "Email", "email"],
                ["year", "Vehicle year", "number"], ["make", "Make", "text"], ["model", "Model", "text"],
                ["color", "Color", "text"], ["plate", "License plate", "text"], ["state", "State", "text"],
                ["location", "Parking location", "text"], ["assignedSpace", "Assigned space", "text"],
                ["monthlyRate", "Monthly rate", "number"], ["validThrough", "Valid through", "date"],
              ].map(([key, label, type]) => (
                <label key={key} style={labelStyle}>
                  {label}
                  <input
                    required={["name", "make", "model", "plate", "location", "validThrough"].includes(key)}
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((current) => ({ ...current, [key]: e.target.value }))}
                    style={inputStyle}
                  />
                </label>
              ))}
            </div>
            <button type="submit" style={{ ...primaryButton, marginTop: 16 }}>Create Permit</button>
          </form>
        )}

        <section style={{ marginTop: 20, background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.06)" }}>
          <div style={{ padding: 16, borderBottom: "1px solid #eceef0" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, plate, permit or location" style={{ ...inputStyle, width: "100%", maxWidth: 460 }} />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr style={{ textAlign: "left", fontSize: 12, color: "#737982" }}>
                  {['Permit','Customer','Vehicle / Plate','Location','Valid Through','Status'].map((h) => <th key={h} style={{ padding: 14, borderBottom: "1px solid #eceef0" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((permit) => (
                  <tr key={permit.id} onClick={() => setSelected(permit)} style={{ cursor: "pointer" }}>
                    <td style={td}><strong>{permit.permitNumber}</strong><div style={subtle}>{permit.id}</div></td>
                    <td style={td}>{permit.customer.name}</td>
                    <td style={td}>{permit.vehicle.year} {permit.vehicle.make} {permit.vehicle.model}<div style={subtle}>{permit.vehicle.state} {permit.vehicle.plate}</div></td>
                    <td style={td}>{permit.location}</td>
                    <td style={td}>{permit.validThrough}</td>
                    <td style={td}><span style={statusPill(permit.status === "active" && permit.paid)}>{permit.status === "active" && permit.paid ? "ACTIVE" : "ATTENTION"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <section style={{ marginTop: 20, background: "#16181c", color: "white", borderRadius: 18, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 1.2, fontWeight: 900, color: "#ff8a4c" }}>PERMIT CREDENTIAL</div>
                <h2 style={{ margin: "7px 0" }}>{selected.customer.name}</h2>
                <div>{selected.vehicle.year} {selected.vehicle.make} {selected.vehicle.model} · {selected.vehicle.state} {selected.vehicle.plate}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{selected.permitNumber}</div>
                <div style={{ opacity: .72 }}>{selected.id}</div>
              </div>
            </div>
            <div style={{ marginTop: 18, padding: 18, borderRadius: 14, background: "white", color: "#16181c", maxWidth: 380 }}>
              <div style={{ fontWeight: 900, fontSize: 20 }}>EXPRESS</div>
              <div style={{ color: "#ff5a00", fontWeight: 800, fontSize: 12, letterSpacing: 1.2 }}>PARKING & MOBILITY</div>
              <div style={{ marginTop: 18, fontSize: 12, color: "#6d737b" }}>MONTHLY PARKER</div>
              <div style={{ marginTop: 4, fontSize: 24, fontWeight: 900 }}>{selected.permitNumber}</div>
              <div style={{ marginTop: 14, padding: 14, border: "2px dashed #aeb4bb", borderRadius: 10, textAlign: "center", fontFamily: "monospace", fontWeight: 900 }}>{selected.id}</div>
              <div style={{ marginTop: 10, fontSize: 12, color: "#6d737b" }}>This secure permit ID will become the QR code printed on the windshield sticker.</div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={{ background: "white", borderRadius: 16, padding: 18, boxShadow: "0 6px 22px rgba(0,0,0,.05)" }}><div style={subtle}>{label}</div><div style={{ marginTop: 5, fontSize: 30, fontWeight: 900 }}>{value}</div></div>;
}

const primaryButton = { border: 0, borderRadius: 12, minHeight: 48, padding: "0 20px", background: "#ff5a00", color: "white", fontWeight: 900, cursor: "pointer" } as const;
const inputStyle = { minHeight: 44, border: "1px solid #d7dbe0", borderRadius: 10, padding: "0 12px", fontSize: 15, background: "white" } as const;
const labelStyle = { display: "grid", gap: 6, fontSize: 12, fontWeight: 800, color: "#5d6269" } as const;
const td = { padding: 14, borderBottom: "1px solid #f0f1f2", verticalAlign: "top" } as const;
const subtle = { fontSize: 12, color: "#777d85", marginTop: 3 } as const;
const statusPill = (ok: boolean) => ({ display: "inline-block", borderRadius: 999, padding: "5px 9px", fontSize: 11, fontWeight: 900, background: ok ? "#e7f7ed" : "#fff0ec", color: ok ? "#176d3a" : "#a83b24" } as const);
