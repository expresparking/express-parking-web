import type { Metadata } from "next";
import { SelfPayForm } from "./self-pay-form";

export const metadata: Metadata = {
  title: "Pay for Parking | Grant Garage",
  description: "Pay for parking at Grant Garage, 96 Orange Street, New Haven.",
};

export default function GrantGaragePayPage() {
  return <SelfPayForm />;
}

