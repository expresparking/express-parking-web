# Express Ops MVP

## Goal
Turn the existing Express Parking website and Clover Flex workflow into a simple operations platform for monthly parker verification.

## Credential
Each monthly parker receives a windshield sticker containing:
- Express Parking & Mobility branding
- Monthly Parker label
- Unique permit ID
- QR code encoding only the permit ID or a secure lookup URL

Do not encode customer name, phone number, plate, or payment status directly in the QR code.

Example permit ID:
`XP-P-7K4M92`

## Attendant flow
1. Attendant scans the credential with Clover Flex.
2. The permit ID is sent to Express Ops.
3. Express Ops returns the current account and vehicle record.
4. The screen shows ACTIVE, EXPIRED, or NOT FOUND prominently.
5. Attendant can check the vehicle in/out or report an issue.

## MVP data model
### Customer
- customer_id
- name
- email
- phone

### Vehicle
- vehicle_id
- customer_id
- year
- make
- model
- color
- plate
- state

### Permit
- permit_id
- permit_number
- customer_id
- vehicle_id
- location_id
- status
- paid
- valid_through
- assigned_space

### Location
- location_id
- name
- address

### Activity
- activity_id
- permit_id
- event_type: check_in | check_out | issue
- timestamp
- attendant_id
- notes

### Velor service
- service_id
- permit_id
- scheduled_date
- scheduled_time
- service_type
- status

## Current demo routes
- `/ops` — attendant verification screen
- `/api/permits/XP-P-7K4M92` — active demo permit
- `/api/permits/XP-P-EXPIRED` — expired demo permit

## Production architecture
Recommended next step is to replace the in-code demo records with a hosted PostgreSQL database (for example, a Vercel-compatible managed Postgres provider) and add authentication for attendants and managers.

Clover integration should remain a thin scanner/client layer. The Express database should remain the source of truth so Express is not locked into one payment terminal vendor.

## Security principles
- QR code stores only an opaque permit identifier or signed lookup URL.
- No personal information printed in the QR code.
- Attendant screen requires authentication before production use.
- Record scans/check-ins for auditability.
- Separate manager permissions from attendant permissions.
- Never treat a printed sticker itself as proof of payment; always verify current server status.

## Next build steps
1. Production database and migrations.
2. Admin dashboard for creating customers, vehicles, permits, and locations.
3. Sticker/QR generator.
4. Check-in/check-out activity logging.
5. Attendant authentication.
6. Clover Flex scanner integration.
7. Monthly billing/payment synchronization.
8. Velor booking integration.
