import { Suspense } from "react";
import { VelorConfirmationStatus } from "./status";

export default function VelorConfirmationPage() {
  return <Suspense fallback={null}><VelorConfirmationStatus /></Suspense>;
}
