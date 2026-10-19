create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  company text check (company is null or char_length(company) <= 160),
  service text not null check (service in (
    'Software a medida',
    'Aplicaciones web',
    'Automatización e integración',
    'Datos y dashboards'
  )),
  budget text check (budget is null or budget in (
    'Menos de 5.000 €',
    '5.000 € — 15.000 €',
    '15.000 € — 40.000 €',
    'Más de 40.000 €'
  )),
  preference text check (preference is null or preference in (
    'Correo electrónico',
    'Videollamada',
    'Teléfono (al configurarlo)'
  )),
  description text not null check (char_length(description) between 20 and 5000),
  privacy_consent boolean not null check (privacy_consent = true),
  consented_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'contacted', 'proposal_sent', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);
create index if not exists contact_requests_status_created_at_idx
  on public.contact_requests (status, created_at desc);

create table if not exists public.contact_notification_outbox (
  id uuid primary key default gen_random_uuid(),
  contact_request_id uuid not null unique references public.contact_requests(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'sent')),
  attempts integer not null default 0 check (attempts >= 0),
  last_attempt_at timestamptz,
  sent_at timestamptz,
  provider_message_id text,
  last_error text,
  created_at timestamptz not null default now()
);

create index if not exists contact_notification_outbox_pending_idx
  on public.contact_notification_outbox (created_at)
  where status = 'pending';

-- Only a one-way hash of the source IP is retained for short-window abuse controls.
create table if not exists public.contact_submission_events (
  id bigint generated always as identity primary key,
  source_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists contact_submission_events_source_created_idx
  on public.contact_submission_events (source_hash, created_at desc);

alter table public.contact_requests enable row level security;
alter table public.contact_notification_outbox enable row level security;
alter table public.contact_submission_events enable row level security;

revoke all on public.contact_requests from anon, authenticated;
revoke all on public.contact_notification_outbox from anon, authenticated;
revoke all on public.contact_submission_events from anon, authenticated;

-- Atomic insert of the lead, notification outbox event and abuse-control event.
create or replace function public.create_contact_request(payload jsonb, p_source_hash text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent_count integer;
  new_request_id uuid;
  new_outbox_id uuid;
begin
  if p_source_hash is null or length(p_source_hash) < 32 or length(p_source_hash) > 128 then
    raise exception using errcode = '22023', message = 'invalid source hash';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(p_source_hash));

  select count(*)::integer into recent_count
  from public.contact_submission_events
  where contact_submission_events.source_hash = p_source_hash
    and created_at > now() - interval '10 minutes';

  if recent_count >= 5 then
    raise exception using errcode = 'P0001', message = 'CONTACT_RATE_LIMIT';
  end if;

  insert into public.contact_submission_events (source_hash) values (p_source_hash);

  insert into public.contact_requests (
    name, email, company, service, budget, preference, description,
    privacy_consent, consented_at
  ) values (
    payload->>'name',
    payload->>'email',
    nullif(payload->>'company', ''),
    payload->>'service',
    nullif(payload->>'budget', ''),
    nullif(payload->>'preference', ''),
    payload->>'description',
    (payload->>'privacyConsent')::boolean,
    now()
  ) returning id into new_request_id;

  insert into public.contact_notification_outbox (contact_request_id)
  values (new_request_id)
  returning id into new_outbox_id;

  return jsonb_build_object('request_id', new_request_id, 'outbox_id', new_outbox_id);
end;
$$;

revoke all on function public.create_contact_request(jsonb, text) from public, anon, authenticated;
grant execute on function public.create_contact_request(jsonb, text) to service_role;

-- Retry worker claims one pending item at a time to avoid duplicate concurrent sends.
create or replace function public.claim_contact_notification()
returns table (
  outbox_id uuid,
  request_id uuid,
  name text,
  email text,
  company text,
  service text,
  budget text,
  preference text,
  description text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query
  with picked as (
    select o.id
    from public.contact_notification_outbox o
    where o.status = 'pending'
      and o.attempts < 8
      and (o.last_attempt_at is null or o.last_attempt_at < now() - interval '2 minutes')
    order by o.created_at
    for update skip locked
    limit 1
  ),
  updated as (
    update public.contact_notification_outbox o
    set attempts = attempts + 1, last_attempt_at = now()
    from picked
    where o.id = picked.id
    returning o.id, o.contact_request_id
  )
  select updated.id, r.id, r.name, r.email, r.company, r.service, r.budget,
         r.preference, r.description, r.created_at
  from updated
  join public.contact_requests r on r.id = updated.contact_request_id;
end;
$$;

revoke all on function public.claim_contact_notification() from public, anon, authenticated;
grant execute on function public.claim_contact_notification() to service_role;
