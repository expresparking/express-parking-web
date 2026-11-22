export const GRANT_GARAGE = {
  code: "grant-garage",
  name: "Grant Garage",
  address: "96 Orange Street, New Haven, CT 06510",
  timeZone: "America/New_York",
} as const;

export type ParkingOptionCode = "one-hour" | "two-hours" | "three-hours" | "daily-max" | "day-evening" | "evening" | "overnight";

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

// Rates remain separate: daytime $5/hour ($20 maximum), evening $10,
// and overnight $20 through 9 AM. Times use the garage's local timezone.
export function getParkingOptions(now = new Date()): ParkingOption[] {
  const parts = localParts(now);
  const time = parts.hour * 60 + parts.minute;
  const eveningStart = 17 * 60;
  const eveningEnd = (parts.weekday === 5 || parts.weekday === 6)
    ? easternDate(parts, 2, 0, 1)
    : easternDate(parts, 21);
  const morningEnd = easternDate(parts, 9);
  const dayEnd = easternDate(parts, 17);

  // Before 9 AM, the overnight tariff includes the remaining morning hours.
  // Early Saturday/Sunday mornings retain Friday/Saturday's 2 AM evening cutoff.
  if (time < 9 * 60) {
    const afterLateEvening = time >= 2 * 60 || (parts.weekday !== 0 && parts.weekday !== 6);
    const options: ParkingOption[] = [];
    if (!afterLateEvening && time < 2 * 60) {
      options.push({
        code: "evening", label: "Evening",
        detail: "Exit by 2 AM", amountCents: 1000,
        expiresAt: easternDate(parts, 2).toISOString(),
      });
    }
    options.push({
      code: "overnight", label: "Overnight",
      detail: "Exit by 9 AM", amountCents: 2000,
      expiresAt: morningEnd.toISOString(),
    });
    return options;
  }

  if (time < eveningStart) {
    const remainingMinutes = Math.max(0, Math.floor((dayEnd.getTime() - now.getTime()) / 60_000));
    const options: ParkingOption[] = [];
    for (const hours of [1, 2, 3] as const) {
      if (remainingMinutes >= hours * 60) {
        const code = hours === 1 ? "one-hour" : hours === 2 ? "two-hours" : "three-hours";
        options.push({
          code, label: `${hours} Hour${hours > 1 ? "s" : ""}`,
          detail: `Park for ${hours} hour${hours > 1 ? "s" : ""}`,
          amountCents: hours * 500,
          expiresAt: new Date(now.getTime() + hours * 60 * 60_000).toISOString(),
        });
      }
    }
    options.push({
      code: "daily-max", label: "Until 5 PM",
      detail: "Day parking maximum", amountCents: 2000,
      expiresAt: dayEnd.toISOString(),
    });
    // Customers who span the 5 PM boundary pay daytime plus the evening rate.
    // Round a partial daytime hour up; cap daytime at $20.
    const daytimeHours = Math.ceil((dayEnd.getTime() - now.getTime()) / 3_600_000);
    const eveningDeparture = (parts.weekday === 5 || parts.weekday === 6)
      ? easternDate(parts, 2, 0, 1)
      : easternDate(parts, 21);
    options.push({
      code: "day-evening", label: "Day + Evening",
      detail: `Daytime plus $10 evening; exit by ${parts.weekday === 5 || parts.weekday === 6 ? "2 AM" : "9 PM"}`,
      amountCents: Math.min(2000, daytimeHours * 500) + 1000,
      expiresAt: eveningDeparture.toISOString(),
    });
    return options;
  }

  const options: ParkingOption[] = [];
  if (now < eveningEnd) {
    options.push({
      code: "evening", label: "Evening",
      detail: parts.weekday === 5 || parts.weekday === 6 ? "Exit by 2 AM" : "Exit by 9 PM",
      amountCents: 1000, expiresAt: eveningEnd.toISOString(),
    });
  }
  options.push({
    code: "overnight", label: "Overnight",
    detail: "Exit by 9 AM tomorrow", amountCents: 2000,
    expiresAt: easternDate(parts, 9, 0, 1).toISOString(),
  });
  return options;
}

export function getExtensionOptions(currentExpiresAt: string, now = new Date()): ParkingExtensionOption[] {
  const currentExpiry = new Date(currentExpiresAt);
  if (Number.isNaN(currentExpiry.getTime()) || currentExpiry <= now) return [];

  // Extensions can be purchased at any hour, including Sundays and across midnight.
  return ([1, 2, 3] as const).map((hours) => {
    const expiresAt = new Date(currentExpiry.getTime() + hours * 3_600_000);
    return {
      code: (hours === 1 ? "plus-one-hour" : hours === 2 ? "plus-two-hours" : "plus-three-hours") as ParkingExtensionOptionCode,
      label: `+${hours} Hour${hours > 1 ? "s" : ""}`,
      detail: `New expiration: ${new Intl.DateTimeFormat("en-US", { timeZone: GRANT_GARAGE.timeZone, dateStyle: "short", timeStyle: "short" }).format(expiresAt)}`,
      amountCents: hours * 500,
      expiresAt: expiresAt.toISOString(),
    };
  });
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
