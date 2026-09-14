export const VELOR_LOCATION = {
  code: "grant-garage",
  name: "96 Orange Street Garage",
  address: "96 Orange Street, New Haven, CT",
} as const;

export const VELOR_SERVICES = [
  { code: "eco-exterior", name: "Eco Exterior", amountCents: 3500 },
  { code: "interior-refresh", name: "Interior Refresh", amountCents: 3000 },
  { code: "eco-complete", name: "Eco Complete", amountCents: 5500 },
] as const;

export const VELOR_WINDOWS = [
  { code: "morning", label: "Morning · 9 AM–12 PM", startHour: 9, endHour: 12 },
  { code: "afternoon", label: "Afternoon · 12 PM–5 PM", startHour: 12, endHour: 17 },
] as const;

export const VELOR_WINDOW_CAPACITY = 2;

export function velorService(code: string) {
  return VELOR_SERVICES.find((service) => service.code === code);
}

export function velorWindow(code: string) {
  return VELOR_WINDOWS.find((window) => window.code === code);
}

export function normalizeVelorPlate(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
}

export function normalizeVelorSpace(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 12);
}

export function bookingWindow(date: string, windowCode: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const window = velorWindow(windowCode);
  if (!window) return null;
  const day = new Date(`${date}T12:00:00-04:00`);
  if (Number.isNaN(day.getTime()) || day.getDay() === 0) return null;

  const now = new Date();
  const earliest = new Date();
  earliest.setHours(0, 0, 0, 0);
  const latest = new Date(earliest);
  latest.setDate(latest.getDate() + 30);
  if (day < earliest || day > latest) return null;

  const offset = isEasternDaylightTime(day) ? "-04:00" : "-05:00";
  const startsAt = new Date(`${date}T${String(window.startHour).padStart(2, "0")}:00:00${offset}`);
  const endsAt = new Date(`${date}T${String(window.endHour).padStart(2, "0")}:00:00${offset}`);
  if (startsAt <= now) return null;
  return { window, startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString() };
}

function isEasternDaylightTime(date: Date) {
  const year = date.getFullYear();
  const march = new Date(year, 2, 1);
  const november = new Date(year, 10, 1);
  const secondSundayMarch = 8 + ((7 - march.getDay()) % 7);
  const firstSundayNovember = 1 + ((7 - november.getDay()) % 7);
  const month = date.getMonth();
  return month > 2 && month < 10 || month === 2 && date.getDate() >= secondSundayMarch || month === 10 && date.getDate() < firstSundayNovember;
}
