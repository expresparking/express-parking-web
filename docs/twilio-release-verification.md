# PR #18 — Pre-deployment verification

Release branch: `release/twilio-policy-velor-proof-20261107`
Purpose: Publish working SMS policy pages and visible Velor consent evidence for Twilio A2P review.

## Release scope
- `/privacy`: policy titled Privacy Policy
- `/sms-terms`: page titled Terms & Conditions, SMS Terms section
- `/velor`: separate, optional, unchecked SMS checkbox with links to both pages
- Footer links to Privacy Policy and SMS Terms
- Velor booking API: recorded opt-in on server via Supabase `sms_consent_events`, no SMS sending
- **Not included:** Parking checkout updates, Clover payment code, Twilio webhook route, auto-SMS sending

## Checks before merge
- [ ] Next.js build completes on a preview deployment.
- [ ] Visit preview `/privacy` and `/sms-terms`: both return 200, render content and links.
- [ ] Preview Velor booking shows unchecked SMS opt-in; policy links open.
- [ ] Velor inquiry without SMS consent sends existing notification email; no consent event created.
- [ ] Velor inquiry with SMS consent sends existing notification email and records exactly one event in Supabase.
- [ ] Resubmissions and invalid phone numbers do not mistakenly activate SMS.
- [ ] Velor booking email failures do not create an SMS opt-in event.
- [ ] Confirm service key available only to server; not exposed to client.
- [ ] Spot-check Grant Garage self-pay, confirmation, and Clover redirects remain unchanged.
- [ ] Review policy language for truthful practice and legal compliance.
- [ ] After authorized merge/deployment, verify all public URLs and run Twilio campaign error check before submitting.

## Current observations (Nov 7, 2026)
- GitHub Actions runs associated with initial PR head: none.
- GitHub PR reviews and inline threads: none.
- External Vercel preview URL/build outcome: not available from connected tooling; **not verified**.
- GitHub connector returned PR mergeable=false at creation; do not presume cause.
- Policy heading changed to `Terms & Conditions` for clearer carrier matching.
- No live website deployment or payment changes performed.
