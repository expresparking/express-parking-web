create table if not exists velor_bookings (
  id uuid primary key default gen_random_uuid(),
  location_code text not null,
  service_code text not null,
  service_name text not null,
  amount_cents integer not null check (amount_cents > 0),
  service_date date not null,
  window_code text not null,
  window_label text not null,
  capacity_slot smallint not null check (capacity_slot between 1 and 2),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  plate text not null,
  plate_state text not null default 'CT',
  space_number text not null,
  first_name text not null,
  last_name text,
  phone text not null,
  email text not null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'scheduled', 'in_progress', 'completed', 'declined', 'failed', 'cancelled')),
  clover_checkout_session_id text unique,
  clover_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_velor_bookings_schedule
on velor_bookings (location_code, service_date, window_code, status);

create unique index if not exists idx_velor_bookings_capacity_slot
on velor_bookings (location_code, service_date, window_code, capacity_slot)
where status in ('pending', 'paid', 'scheduled', 'in_progress');

create index if not exists idx_velor_bookings_plate
on velor_bookings (upper(plate), upper(plate_state), service_date desc);

create index if not exists idx_velor_bookings_clover_checkout
on velor_bookings (clover_checkout_session_id);

alter table velor_bookings enable row level security;
