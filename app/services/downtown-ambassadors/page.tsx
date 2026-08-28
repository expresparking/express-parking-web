import type { Metadata } from "next";
import { ServiceDetail } from "../../components/ServiceDetail";
import { services } from "../../service-data";
export const metadata: Metadata = { title: "Downtown & Street Cleaning Ambassadors", description: "Downtown hospitality, sidewalk cleaning, wayfinding, issue reporting, and visible district support from Express Parking." };
export default function Page() { return <ServiceDetail service={services["downtown-ambassadors"]} />; }
