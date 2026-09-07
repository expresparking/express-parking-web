export type PermitStatus = "active" | "expired" | "suspended";

export type ParkingPermit = {
  id: string;
  permitNumber: string;
  status: PermitStatus;
  paid: boolean;
  monthlyRate: number;
  validThrough: string;
  location: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
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

export const demoPermits: ParkingPermit[] = [
  {
    id: "XP-P-7K4M92",
    permitNumber: "XP-000123",
    status: "active",
    paid: true,
    monthlyRate: 165,
    validThrough: "2026-09-30",
    location: "Express Parking - New Haven",
    customer: {
      name: "Demo Monthly Parker",
      phone: "203-555-0111",
      email: "demo@example.com",
    },
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
  {
    id: "XP-P-EXPIRED",
    permitNumber: "XP-000124",
    status: "expired",
    paid: false,
    monthlyRate: 165,
    validThrough: "2026-08-31",
    location: "Express Parking - New Haven",
    customer: {
      name: "Demo Expired Parker",
      phone: "203-555-0112",
      email: "expired@example.com",
    },
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
];

export function findPermit(id: string) {
  return demoPermits.find((permit) => permit.id === id);
}
