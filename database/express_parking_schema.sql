-- Express Parking & Mobility operations schema
-- Designed for PostgreSQL / Supabase.

create extension if not exists pgcrypto;

create table if not exists parking_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  state text,
  postal_code text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists parking_customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists parking_vehicles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references parking_customers(id) on delete cascade,
  year integer,
  make text not null,
  model text not null,
  color text,
  plate text not null,
  state text not null default 'CT',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (upper(plate), upper(state))
);

create table if not exists parking_permits (
  id uuid primary key default gen_random_uuid(),
  permit_token text not null unique,
  permit_number text not null unique,
  customer_id uuid not null references parking_customers(id),
  vehicle_id uuid not null references parking_vehicles(id),
  location_id uuid not null references parking_locations(id),
  status text not null default 'active' check (status in ('active','expired','suspended','cancelled')),
  paid boolean not null default false,
  monthly_rate numeric(10,2) not null default 0,
  assigned_space text,
  start_date date not null default current_date,
  valid_through date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists parking_activity (
  id uuid primary key default gen_random_uuid(),
  permit_id uuid not null references parking_permits(id) on delete cascade,
  activity_type text not null check (activity_type in ('scan','check_in','check_out','payment','issue','status_change')),
  source text not null default 'ops' check (source in ('ops','clover','admin','system')),
  staff_name text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists parking_incidents (
  id uuid primary key default gen_random_uuid(),
  permit_id uuid references parking_permits(id) on delete set null,
  location_id uuid references parking_locations(id) on delete set null,
  category text not null,
  description text not null,
  status text not null default 'open' check (status in ('open','in_progress','resolved')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists idx_permits_token on parking_permits(permit_token);
create index if not exists idx_permits_status on parking_permits(status, paid);
create index if not exists idx_vehicle_plate on parking_vehicles(upper(plate), upper(state));
create index if not exists idx_activity_permit_created on parking_activity(permit_id, created_at desc);

create table if not exists parking_sessions (
  id uuid primary key default gen_random_uuid(),
  location_code text not null,
  plate text not null,
  plate_state text not null default 'CT',
  email text not null,
  parking_option text not null,
  option_label text not null,
  amount_cents integer not null check (amount_cents > 0),
  starts_at timestamptz not null,
  expires_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending','active','expired','declined','failed','cancelled')),
  clover_checkout_session_id text unique,
  clover_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_parking_sessions_plate on parking_sessions(upper(plate), upper(plate_state), expires_at desc);
create index if not exists idx_parking_sessions_status_expiry on parking_sessions(status, expires_at desc);
create index if not exists idx_parking_sessions_clover_checkout on parking_sessions(clover_checkout_session_id);

alter table parking_sessions enable row level security;

-- Important security direction:
-- The QR code should contain only parking_permits.permit_token.
-- Never embed customer name, phone, email, plate, payment status, or other PII directly in the QR code.
