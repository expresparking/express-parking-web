import type { Metadata } from "next";
import { ServiceDetail } from "../../components/ServiceDetail";
import { services } from "../../service-data";
export const metadata: Metadata = { title: "Property Operations" };
export default function Page() { return <ServiceDetail service={services["property-operations"]} />; }
