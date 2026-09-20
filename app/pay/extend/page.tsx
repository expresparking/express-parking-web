import type { Metadata } from "next";
import { Suspense } from "react";
import { ExtendParking } from "./extend-parking";

export const metadata: Metadata = {
  title: "Extend Parking | Grant Garage",
  description: "Add time to an active Express Parking session at Grant Garage.",
};

export default function ExtendParkingPage() {
  return (
    <Suspense fallback={<main className="self-pay-page"><section className="self-pay-shell"><div className="self-pay-notice">Loading your parking session…</div></section></main>}>
      <ExtendParking />
    </Suspense>
  );
}
