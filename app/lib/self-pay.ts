export const GRANT_GARAGE = {
  code: "grant-garage",
  name: "Grant Garage",
  address: "96 Orange Street, New Haven, CT 06510",
  timeZone: "America/New_York",
} as const;

export type ParkingOptionCode = "one-hour" | "two-hours" | "three-hours" | "daily-max" | "evening" | "overnight";

export type ParkingOption = {
  code: ParkingOptionCode;
  label: string;
  detail: string;
  amountCents: number;
  expiresAt: string;
};

type LocalParts = { year: number; month: number; day: number; hour: number; minute: number; weekday: number };

function localParts(date: Date): LocalParts {
  const values = new Intl.DateTimeFormat("en-US", {
    timeZone: GRANT_GARAGE.timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => values.find((value) => value.type === type)?.value || "0";
  const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    year: Number(part("year")),
    month: Number(part("month")),
    day: Number(part("day")),
    hour: Number(part("hour")),
    minute: Number(part("minute")),
    weekday: weekdays[part("weekday")],
  };
}

function easternOffset(date: Date) {
  const tzName = new Intl.DateTimeFormat("en-US", {
    timeZone: GRANT_GARAGE.timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "GMT-05:00";
  const match = tzName.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return -300;
  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === "+" ? minutes : -minutes;
}

function easternDate(parts: LocalParts, hour: number, minute = 0, addDays = 0) {
  const rough = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + addDays, hour, minute));
  const offset = easternOffset(rough);
  return new Date(rough.getTime() - offset * 60_000);
}

export function getParkingOptions(now = new Date()): ParkingOption[] {
  const parts = localParts(now);
  if (parts.weekday === 0) return [];

  const time = parts.hour * 60 + parts.minute;
  const dayStart = 6 * 60;
  const eveningStart = 17 * 60;
  const weekdayClose = 21 * 60;
  const lateClose = 24 * 60 + 2 * 60;

  if (time < dayStart) return [];

  if (time < eveningStart) {
    const dayEnd = easternDate(parts, 17);
    const remainingMinutes = Math.max(0, Math.floor((dayEnd.getTime() - now.getTime()) / 60_000));
    const options: ParkingOption[] = [];
    if (remainingMinutes >= 60) options.push({ code: "one-hour", label: "1 Hour", detail: "Park for one hour", amountCents: 500, expiresAt: new Date(now.getTime() + 60 * 60_000).toISOString() });
    if (remainingMinutes >= 120) options.push({ code: "two-hours", label: "2 Hours", detail: "Park for two hours", amountCents: 1000, expiresAt: new Date(now.getTime() + 120 * 60_000).toISOString() });
    if (remainingMinutes >= 180) options.push({ code: "three-hours", label: "3 Hours", detail: "Park for three hours", amountCents: 1500, expiresAt: new Date(now.getTime() + 180 * 60_000).toISOString() });
    options.push({ code: "daily-max", label: "Until 5 PM", detail: "Day parking maximum", amountCents: 2000, expiresAt: dayEnd.toISOString() });
    return options;
  }

  const closeMinutes = parts.weekday <= 4 ? weekdayClose : lateClose;
  const close = closeMinutes > 24 * 60 ? easternDate(parts, closeMinutes - 24 * 60, 0, 1) : easternDate(parts, closeMinutes / 60);
  if (now >= close) return [];

  const options: ParkingOption[] = [{
    code: "evening",
    label: "Evening",
    detail: parts.weekday <= 4 ? "Exit by 9 PM" : "Exit by 2 AM",
    amountCents: 1000,
    expiresAt: close.toISOString(),
  }];

  if (parts.weekday >= 1 && parts.weekday <= 5) {
    options.push({
      code: "overnight",
      label: "Overnight",
      detail: "Exit by 9 AM",
      amountCents: 2000,
      expiresAt: easternDate(parts, 9, 0, 1).toISOString(),
    });
  }
  return options;
}

export function normalizePlate(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
}

export function optionByCode(code: string, now = new Date()) {
  return getParkingOptions(now).find((option) => option.code === code);
}

