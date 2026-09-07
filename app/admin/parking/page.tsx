"use client";

import { useMemo, useState } from "react";
import type { FormEvent, CSSProperties } from "react";
import { demoPermits } from "../../lib/parking-data";
import type { ParkingPermit } from "../../lib/parking-data";

type FormState = {
  name: string;
  phone: string;
  email: string;
  year: string;
  make: string;
  model: string;
  color: string;
  plate: string;
  state: string;
  location: string;
  assignedSpace: string;
  monthlyRate: string;
  validThrough: string;
};

type Field = {
  key: keyof FormState;
  label: string;
  type: string;
  required?: boolean;
};

const emptyForm: FormState = {
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

const fields: Field[] = [
  { key: "name", label: "Customer name", type: "text", required: true },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "email", label: "Email", type: "email" },
  { key: "year", label: "Vehicle year", type: "number" },
  { key: "make", label: "Make", type: "text", required: true },
  { key: "model", label: "Model", type: "text", required: true },
  { key: "color", label: "Color", type: "text" },
  { key: "plate", label: "License plate", type: "text", required: true },
  { key: "state", label: "State", type: "text" },
  { key: "location", label: "Parking location", type: "text", required: true },
  { key: "assignedSpace", label: "Assigned space", type: "text" },
  { key: "monthlyRate", label: "Monthly rate", type: "number" },
  { key: "validThrough", label: "Valid through", type: "date", required: true },
];

export default function ParkingAdminPage() {
  const [permits, setPermits] = useState<ParkingPermit[]>(demoPermits);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [selected, setSelected] = useState<ParkingPermit | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return permits;
    return permits.filter((permit) =>
      [permit.permitNumber, permit.id, permit.customer.name, permit.vehicle.plate, permit.location]
        .some((value) => value.toLowerCase().includes(q))
    );
  }, [permits, search]);

  const activeCount = permits.filter((permit) => permit.status === "active" && permit.paid).length;
  const attentionCount = permits.length - activeCount;
  const revenue = permits
    .filter((permit) => permit.status === "active" && permit.paid)
    .reduce((sum, permit) => sum + permit.monthlyRate, 0);

  function addParker(event: FormEvent<HTMLFormElement>) {
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
    <main style={pageStyle}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={brandStyle}>EXPRESS PARKING & MOBILITY</div>
            <h1 style={{ margin: "6px 0 4px", fontSize: 36 }}>Monthly Parking Manager</h1>
            <p style={{ margin: 0, color: "#676d75" }}>Create permits, manage vehicles and prepare windshield credentials.</p>
          </div>
          <button type="button" onClick={() => setShowForm((value) => !value)} style={primaryButton}>
            {showForm ? "Close Form" : "+ Add Monthly Parker"}
          </button>
        </header>

        <section style={metricsGrid}>
          <Metric label="Monthly parkers" value={String(permits.length)} />
          <Metric label="Active & paid" value={String(activeCount)} />
          <Metric label="Needs attention" value={String(attentionCount)} />
          <Metric label="Active monthly revenue" value={`$${revenue.toLocaleString()}`} />
        </section>

        {showForm ? (
          <form onSubmit={addParker} style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Add Monthly Parker</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
              {fields.map((field) => (
                <label key={field.key} style={labelStyle}>
                  {field.label}
                  <input
                    required={field.required}
                    type={field.type}
                    value={form[field.key]}
                    onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                    style={inputStyle}
                  />
                </label>
              ))}
            </div>
            <button type="submit" style={{ ...primaryButton, marginTop: 16 }}>Create Permit</button>
          </form>
        ) : null}

        <section style={{ ...cardStyle, overflow: "hidden", padding: 0 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #eceef0" }}>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, plate, permit or location" style={{ ...inputStyle, width: "100%", maxWidth: 460 }} />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr style={{ textAlign: "left", fontSize: 12, color: "#737982" }}>
                  {["Permit", "Customer", "Vehicle / Plate", "Location", "Valid Through", "Status"].map((heading) => (
                    <th key={heading} style={tableCell}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((permit) => {
                  const ok = permit.status === "active" && permit.paid;
                  return (
                    <tr key={permit.id} onClick={() => setSelected(permit)} style={{ cursor: "pointer" }}>
                      <td style={tableCell}><strong>{permit.permitNumber}</strong><div style={subtle}>{permit.id}</div></td>
                      <td style={tableCell}>{permit.customer.name}</td>
                      <td style={tableCell}>{permit.vehicle.year} {permit.vehicle.make} {permit.vehicle.model}<div style={subtle}>{permit.vehicle.state} {permit.vehicle.plate}</div></td>
                      <td style={tableCell}>{permit.location}</td>
                      <td style={tableCell}>{permit.validThrough}</td>
                      <td style={tableCell}><span style={statusPill(ok)}>{ok ? "ACTIVE" : "ATTENTION"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {selected ? (
          <section style={{ marginTop: 20, background: "#16181c", color: "white", borderRadius: 18, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ ...brandStyle, color: "#ff8a4c" }}>PERMIT CREDENTIAL</div>
                <h2 style={{ margin: "7px 0" }}>{selected.customer.name}</h2>
                <div>{selected.vehicle.year} {selected.vehicle.make} {selected.vehicle.model} · {selected.vehicle.state} {selected.vehicle.plate}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{selected.permitNumber}</div>
                <div style={{ opacity: 0.72 }}>{selected.id}</div>
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
        ) : null}
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metricCard}><div style={subtle}>{label}</div><div style={{ marginTop: 5, fontSize: 30, fontWeight: 900 }}>{value}</div></div>;
}

const pageStyle: CSSProperties = { minHeight: "100vh", background: "#f5f6f7", padding: 24, color: "#16181c" };
const brandStyle: CSSProperties = { fontSize: 12, fontWeight: 900, letterSpacing: 1.4, color: "#ff5a00" };
const metricsGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginTop: 24 };
const cardStyle: CSSProperties = { marginTop: 20, background: "white", padding: 20, borderRadius: 18, boxShadow: "0 8px 30px rgba(0,0,0,.06)" };
const metricCard: CSSProperties = { background: "white", borderRadius: 16, padding: 18, boxShadow: "0 6px 22px rgba(0,0,0,.05)" };
const primaryButton: CSSProperties = { border: 0, borderRadius: 12, minHeight: 48, padding: "0 20px", background: "#ff5a00", color: "white", fontWeight: 900, cursor: "pointer" };
const inputStyle: CSSProperties = { minHeight: 44, border: "1px solid #d7dbe0", borderRadius: 10, padding: "0 12px", fontSize: 15, background: "white" };
const labelStyle: CSSProperties = { display: "grid", gap: 6, fontSize: 12, fontWeight: 800, color: "#5d6269" };
const tableCell: CSSProperties = { padding: 14, borderBottom: "1px solid #f0f1f2", verticalAlign: "top" };
const subtle: CSSProperties = { fontSize: 12, color: "#777d85", marginTop: 3 };

function statusPill(ok: boolean): CSSProperties {
  return {
    display: "inline-block",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    fontWeight: 900,
    background: ok ? "#e7f7ed" : "#fff0ec",
    color: ok ? "#176d3a" : "#a83b24",
  };
}
