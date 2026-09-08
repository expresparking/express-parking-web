import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmationStatus } from "./status";

export const metadata: Metadata = { title: "Parking Confirmation" };

export default function ConfirmationPage() {
  return <Suspense fallback={<main className="self-pay-page"><section className="self-pay-shell confirmation-shell"><div className="confirmation-pending"><span className="confirmation-spinner" /><h1>Confirming your payment</h1></div></section></main>}><ConfirmationStatus /></Suspense>;
}
