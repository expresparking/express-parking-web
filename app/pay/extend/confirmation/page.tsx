import type { Metadata } from "next";
import { Suspense } from "react";
import { ExtensionConfirmationStatus } from "./status";

export const metadata: Metadata = { title: "Parking Extended" };

export default function ExtensionConfirmationPage() {
  return (
    <Suspense fallback={<main className="self-pay-page"><section className="self-pay-shell confirmation-shell"><div className="confirmation-pending"><span className="confirmation-spinner" /><h1>Confirming your extension</h1></div></section></main>}>
      <ExtensionConfirmationStatus />
    </Suspense>
  );
}
