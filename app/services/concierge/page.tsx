import type { Metadata } from "next";
import { ServiceDetail } from "../../components/ServiceDetail";
import { services } from "../../service-data";
export const metadata: Metadata = { title: "Concierge Services" };
export default function Page() { return <ServiceDetail service={services.concierge} />; }
