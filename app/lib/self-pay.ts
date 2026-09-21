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

export type NotificationMethod = "email" | "sms";

export type ParkingExtensionOptionCode = "plus-one-hour" | "plus-two-hours" | "plus-three-hours";

export type ParkingExtensionOption = {
  code: ParkingExtensionOptionCode;
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

export function getExtensionOptions(currentExpiresAt: string, now = new Date()): ParkingExtensionOption[] {
  const currentExpiry = new Date(currentExpiresAt);
  if (Number.isNaN(currentExpiry.getTime()) || currentExpiry <= now) return [];

  const parts = localParts(currentExpiry);
  if (parts.weekday === 0) return [];

  const expiryMinutes = parts.hour * 60 + parts.minute;
  const dayEndMinutes = 17 * 60;

  // Daytime hourly sessions can be extended only up to the 5 PM day-parking cutoff.
  // Evening and overnight options already run to their permitted exit time.
  if (expiryMinutes >= dayEndMinutes) return [];

  const dayEnd = easternDate(parts, 17);
  const choices = [
    { code: "plus-one-hour" as const, minutes: 60, label: "+1 Hour", amountCents: 500 },
    { code: "plus-two-hours" as const, minutes: 120, label: "+2 Hours", amountCents: 1000 },
    { code: "plus-three-hours" as const, minutes: 180, label: "+3 Hours", amountCents: 1500 },
  ];

  return choices
    .map((choice) => {
      const expiresAt = new Date(currentExpiry.getTime() + choice.minutes * 60_000);
      return {
        code: choice.code,
        label: choice.label,
        detail: `New expiration: ${new Intl.DateTimeFormat("en-US", { timeZone: GRANT_GARAGE.timeZone, timeStyle: "short" }).format(expiresAt)}`,
        amountCents: choice.amountCents,
        expiresAt: expiresAt.toISOString(),
      };
    })
    .filter((choice) => new Date(choice.expiresAt) <= dayEnd);
}

export function normalizePlate(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
}

export function normalizeSpaceNumber(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 8);
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 15);
}

export function optionByCode(code: string, now = new Date()) {
  return getParkingOptions(now).find((option) => option.code === code);
}

export function extensionOptionByCode(code: string, currentExpiresAt: string, now = new Date()) {
  return getExtensionOptions(currentExpiresAt, now).find((option) => option.code === code);
}
