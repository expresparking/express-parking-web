"use client";

import { FormEvent, useState } from "react";

type Permit = {
  id: string;
  permitNumber: string;
  status: "active" | "expired";
  paid: boolean;
  validThrough: string;
  location: string;
  customer: { name: string };
  vehicle: {
    year: number;
    make: string;
    model: string;
    color: string;
    plate: string;
    state: string;
  };
  assignedSpace: string | null;
  lastEntry: string | null;
  velor: {
    scheduled: boolean;
    service: string | null;
    time: string | null;
  };
};

export default function ExpressOpsPage() {
  const [permitId, setPermitId] = useState("XP-P-7K4M92");
  const [permit, setPermit] = useState<Permit | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup(id: string) {
    const cleanId = id.trim().toUpperCase();
    if (!cleanId) return;

    setLoading(true);
    setError("");
    setPermit(null);

    try {
      const response = await fetch(`/api/permits/${encodeURIComponent(cleanId)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Permit lookup failed");
      setPermit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Permit lookup failed");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void lookup(permitId);
  }

  const active = permit?.status === "active" && permit.paid;

  return (
    <main style={{ minHeight: "100vh", background: "#f6f7f8", padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <header style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, color: "#ff5a00" }}>
            EXPRESS PARKING & MOBILITY
          </div>
          <h1 style={{ margin: "8px 0 4px", fontSize: 34, color: "#16181c" }}>Express Ops</h1>
          <p style={{ margin: 0, color: "#5d626b" }}>Monthly parker verification for attendants and Clover Flex.</p>
        </header>

        <section style={{ background: "white", borderRadius: 18, padding: 20, boxShadow: "0 8px 30px rgba(0,0,0,.07)" }}>
          <form onSubmit={onSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={permitId}
              onChange={(e) => setPermitId(e.target.value)}
              placeholder="Scan or enter permit ID"
              autoCapitalize="characters"
              style={{ flex: "1 1 300px", minHeight: 52, borderRadius: 12, border: "1px solid #d9dde2", padding: "0 16px", fontSize: 18 }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ minHeight: 52, border: 0, borderRadius: 12, padding: "0 22px", background: "#16181c", color: "white", fontSize: 16, fontWeight: 800, cursor: "pointer" }}
            >
              {loading ? "Checking…" : "Verify Permit"}
            </button>
          </form>

          <div style={{ marginTop: 12, fontSize: 13, color: "#737982" }}>
            Demo IDs: <button onClick={() => { setPermitId("XP-P-7K4M92"); void lookup("XP-P-7K4M92"); }} style={linkButton}>XP-P-7K4M92</button> · <button onClick={() => { setPermitId("XP-P-EXPIRED"); void lookup("XP-P-EXPIRED"); }} style={linkButton}>XP-P-EXPIRED</button>
          </div>
        </section>

        {error && (
          <section style={{ marginTop: 18, borderRadius: 16, padding: 20, background: "#fff2f0", border: "1px solid #ffd0c8", color: "#8b2518" }}>
            <strong>Permit not verified</strong>
            <div style={{ marginTop: 6 }}>{error}</div>
          </section>
        )}

        {permit && (
          <section style={{ marginTop: 18, background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.07)" }}>
            <div style={{ padding: "18px 20px", background: active ? "#e9f8ef" : "#fff0ec", borderBottom: active ? "1px solid #bfe7cc" : "1px solid #ffc8bc" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: active ? "#136f3a" : "#b6381f" }}>
                {active ? "✓ ACTIVE MONTHLY PARKER" : "⚠ EXPIRED / PAYMENT REQUIRED"}
              </div>
              <div style={{ marginTop: 4, color: "#555" }}>{permit.permitNumber} · {permit.location}</div>
            </div>

            <div style={{ padding: 20, display: "grid", gap: 18 }}>
              <div>
                <div style={eyebrow}>VEHICLE</div>
                <div style={{ fontSize: 24, fontWeight: 850, color: "#16181c", marginTop: 3 }}>
                  {permit.vehicle.year} {permit.vehicle.make} {permit.vehicle.model}
                </div>
                <div style={{ marginTop: 5, fontSize: 17, color: "#4b5058" }}>
                  {permit.vehicle.color} · {permit.vehicle.state} {permit.vehicle.plate}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
                <InfoCard label="Payment" value={permit.paid ? "Paid" : "Unpaid"} />
                <InfoCard label="Valid through" value={permit.validThrough} />
                <InfoCard label="Assigned space" value={permit.assignedSpace || "Not assigned"} />
                <InfoCard label="Last entry" value={permit.lastEntry ? new Date(permit.lastEntry).toLocaleString() : "No entry recorded"} />
              </div>

              {permit.velor.scheduled && (
                <div style={{ border: "1px solid #cfded6", borderRadius: 14, padding: 16, background: "#f7fbf8" }}>
                  <div style={eyebrow}>VELOR CAR CARE</div>
                  <div style={{ marginTop: 5, fontSize: 18, fontWeight: 800 }}>{permit.velor.service} scheduled today · {permit.velor.time}</div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button style={primaryAction}>Check In</button>
                <button style={secondaryAction}>Check Out</button>
                <button style={secondaryAction}>Report Issue</button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid #e4e7eb", borderRadius: 14, padding: 14 }}>
      <div style={eyebrow}>{label}</div>
      <div style={{ marginTop: 4, fontWeight: 800, color: "#25282d" }}>{value}</div>
    </div>
  );
}

const eyebrow = { fontSize: 11, letterSpacing: 1.1, fontWeight: 900, color: "#7a8089" } as const;
const linkButton = { border: 0, padding: 0, background: "none", color: "#cb4900", textDecoration: "underline", cursor: "pointer", font: "inherit" } as const;
const primaryAction = { minHeight: 48, border: 0, borderRadius: 11, padding: "0 20px", background: "#ff5a00", color: "white", fontWeight: 850, cursor: "pointer" } as const;
const secondaryAction = { minHeight: 48, border: "1px solid #cfd3d8", borderRadius: 11, padding: "0 20px", background: "white", color: "#222", fontWeight: 800, cursor: "pointer" } as const;
