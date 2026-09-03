import { NextResponse } from "next/server";

const permits = {
  "XP-P-7K4M92": {
    id: "XP-P-7K4M92",
    permitNumber: "XP-000123",
    status: "active",
    paid: true,
    validThrough: "2026-09-30",
    location: "Express Parking - New Haven",
    customer: { name: "Demo Monthly Parker" },
    vehicle: {
      year: 2024,
      make: "Volvo",
      model: "V60",
      color: "Black",
      plate: "DEMO123",
      state: "CT",
    },
    assignedSpace: "B-214",
    lastEntry: "2026-09-03T08:14:00-04:00",
    velor: {
      scheduled: true,
      service: "Exterior Care",
      time: "1:30 PM",
    },
  },
  "XP-P-EXPIRED": {
    id: "XP-P-EXPIRED",
    permitNumber: "XP-000124",
    status: "expired",
    paid: false,
    validThrough: "2026-08-31",
    location: "Express Parking - New Haven",
    customer: { name: "Demo Expired Parker" },
    vehicle: {
      year: 2022,
      make: "Toyota",
      model: "Camry",
      color: "Silver",
      plate: "TEST456",
      state: "CT",
    },
    assignedSpace: null,
    lastEntry: null,
    velor: { scheduled: false, service: null, time: null },
  },
} as const;

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const permit = permits[id as keyof typeof permits];

  if (!permit) {
    return NextResponse.json(
      { error: "Permit not found", id },
      { status: 404 }
    );
  }

  return NextResponse.json(permit);
}
