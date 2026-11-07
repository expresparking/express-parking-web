# Task 05.03 — SMS Consent Storage: Review Checklist

Status: DESIGN ONLY — not deployed or applied. November 7, 2026.

## Blocker discovered
The connected Supabase project `expresparking's Project` currently reports INACTIVE, and a read-only table listing failed ("Database is possibly not accessible"). Do not make schema changes or rely on consent database writes until the project is available and the actual production database/project is confirmed. No database changes were performed.

## Security and proof requirements
- Keep an append-only `sms_consent_events` audit ledger (opt-in, opt-out), never treat a phone number or a selected radio option alone as consent.
- Event fields: generated id, event time set by server, source form (parking/Velor), brand and message program, normalized mobile phone, action (opt_in/opt_out), disclosure version, rendered disclosure text (or immutable hash), form/checkout reference where applicable, and source channel. Store minimum necessary data. Do not include plates/payment details by default.
- Confirm phone number was intentionally provided for texting and a separately unchecked consent checkbox was checked. Reject SMS selection without consent, but allow email/non-SMS checkout.
- Server must validate an approved disclosure version and the action; a client Boolean alone is not sufficient audit evidence. Never infer consent from a required booking acknowledgment.
- Enforce opt-out (STOP) centrally and suppress later messages until a valid new opt-in. Configure Twilio webhook signature validation and HELP handling before sending.
- Limit access: RLS enabled, revoke anon/authenticated table grants, server-only service role key, no direct browser REST calls, no general public read. Never place a service key in NEXT_PUBLIC.
- Set retention and access/delete procedures after legal/operations review. Test both consent and decline paths.
- Use an idempotency key to avoid duplicate consent events when checkout is retried.
- Avoid letting an audit-ledger failure silently grant SMS permission. Record failure and avoid sending SMS; do not break working Clover payments.
- Test opt-in/opt-out, privacy/terms links, SMS disabled flag, backend validation, app build, and Clover checkout independently.
- Existing draft code only captures a Velor consent Boolean and email audit timestamp and checks parking SMS consent; it is NOT yet secure persistent consent history.
- Confirm actual live opt-in URL before providing Twilio campaign proof. Review policy drafts against actual practice prior to publishing.

## Proposed table (not executed)
```sql
create table public.sms_consent_events (
  id uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  customer_phone text not null,
  source_form text not null check (source_form in ('parking','velor')),
  program text not null,
  action text not null check (action in ('opt_in','opt_out')),
  disclosure_version text not null,
  disclosure_text text not null,
  service_reference text,
  idempotency_key text unique not null
);
alter table public.sms_consent_events enable row level security;
revoke all on public.sms_consent_events from anon, authenticated;
-- No broad public client policies. Use server-side approved credentials only.
```

Do not treat this as a ready-to-run migration until the target project, data flow, operational retention, Twilio opt-out synchronization, and tests have been reviewed.
