import { createHash, randomUUID } from "node:crypto";
import { supabaseRequest } from "./supabase-rest";

export const PARKING_SMS_DISCLOSURE_VERSION = "express-parking-sms-2026-11-07";
export const VELOR_SMS_DISCLOSURE_VERSION = "velor-service-sms-2026-11-07";

// Keep these texts identical to the opt-in checkbox descriptions on the forms.
export const PARKING_SMS_DISCLOSURE = "I agree to receive parking-related text messages from Express Parking & Mobility, including parking expiration and extension reminders. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not required to purchase parking. Privacy Policy | SMS Terms.";
export const VELOR_SMS_DISCLOSURE = "I agree to receive service-related SMS messages from Express Parking & Mobility, including Velor Car Care, about my booking, reminders, and service updates. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance. Consent is not required to purchase. Privacy Policy | SMS Terms.";

type SmsProgram = "express_parking" | "velor_service";

function normalizeUsMobile(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

/**
 * Called only after a separate unchecked checkbox was affirmed in the incoming
 * booking request. Consent proof is server-time stamped by the database.
 * Failure must NOT be interpreted as SMS permission.
 */
export async function recordWebSmsOptIn(args: {
  phone: string;
  program: SmsProgram;
  sourceForm: "parking" | "velor";
  serviceReference: string;
  disclosureVersion: string;
}): Promise<void> {
  const phone = normalizeUsMobile(args.phone);
  const expected = args.program === "express_parking"
    ? { source: "parking", version: PARKING_SMS_DISCLOSURE_VERSION, text: PARKING_SMS_DISCLOSURE }
    : { source: "velor", version: VELOR_SMS_DISCLOSURE_VERSION, text: VELOR_SMS_DISCLOSURE };
  if (!phone || args.sourceForm !== expected.source || args.disclosureVersion !== expected.version) {
    throw new Error("SMS consent verification failed.");
  }
  if (!args.serviceReference || args.serviceReference.length > 160) {
    throw new Error("SMS consent reference missing.");
  }
  const idempotencyKey = createHash("sha256")
    .update(`${args.program}:opt_in:${args.serviceReference}:${phone}`)
    .digest("hex");
  await supabaseRequest("sms_consent_events?on_conflict=idempotency_key", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({
      id: randomUUID(),
      customer_phone: phone,
      source_form: args.sourceForm,
      program: args.program,
      action: "opt_in",
      disclosure_version: expected.version,
      disclosure_text: expected.text,
      service_reference: args.serviceReference,
      idempotency_key: idempotencyKey,
      channel: "web_form",
    }),
  });
}
