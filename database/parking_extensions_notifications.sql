-- Parking extensions + expiration reminder preferences
-- Apply to Supabase before deploying feature/parking-extend.

alter table parking_sessions add column if not exists phone text;
alter table parking_sessions add column if not exists notification_method text not null default 'email';
alter table parking_sessions add column if not exists reminder_sent_at timestamptz;
alter table parking_sessions add column if not exists expiration_notice_sent_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'parking_sessions_notification_method_check'
  ) then
    alter table parking_sessions
      add constraint parking_sessions_notification_method_check
      check (notification_method in ('email','sms'));
  end if;
end $$;

create table if not exists parking_session_extensions (
  id uuid primary key default gen_random_uuid(),
  parking_session_id uuid not null references parking_sessions(id) on delete cascade,
  option_code text not null,
  option_label text not null,
  amount_cents integer not null check (amount_cents > 0),
  previous_expires_at timestamptz not null,
  new_expires_at timestamptz not null,
  status text not null default 'pending'
    check (status in ('pending','active','declined','failed','cancelled')),
  clover_checkout_session_id text unique,
  clover_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_parking_session_extensions_session
  on parking_session_extensions(parking_session_id, created_at desc);

create index if not exists idx_parking_session_extensions_checkout
  on parking_session_extensions(clover_checkout_session_id);

create index if not exists idx_parking_sessions_reminder_due
  on parking_sessions(status, expires_at, reminder_sent_at);

alter table parking_session_extensions enable row level security;
