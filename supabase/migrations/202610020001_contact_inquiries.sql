begin;

create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  phone text not null check (phone ~ '^[0-9]{8}$'),
  status text not null default 'new' check (status in ('new', 'contacted')),
  created_at timestamptz not null default now()
);
create index contact_inquiries_created_at_idx on public.contact_inquiries (created_at desc);
create index contact_inquiries_phone_created_at_idx on public.contact_inquiries (phone, created_at desc);

alter table public.contact_inquiries enable row level security;
revoke all on public.contact_inquiries from anon, authenticated;
grant select, update (status), delete on public.contact_inquiries to authenticated;
grant all on public.contact_inquiries to service_role;
create policy "Admins read contact inquiries" on public.contact_inquiries for select to authenticated using (
  exists (select 1 from public.catalog_admins where user_id = (select auth.uid()))
);
create policy "Admins delete contact inquiries" on public.contact_inquiries for delete to authenticated using (
  exists (select 1 from public.catalog_admins where user_id = (select auth.uid()))
);
create policy "Admins update contact inquiries" on public.contact_inquiries for update to authenticated using (
  exists (select 1 from public.catalog_admins where user_id = (select auth.uid()))
) with check (exists (select 1 from public.catalog_admins where user_id = (select auth.uid())));
grant delete on public.residence_inquiries to authenticated;
create policy "Admins delete residence inquiries" on public.residence_inquiries for delete to authenticated using (
  exists (select 1 from public.catalog_admins where user_id = (select auth.uid()))
);

create function public.submit_contact_inquiry(p_phone text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare request_id uuid;
begin
  if p_phone is null or p_phone !~ '^[0-9]{8}$' then
    raise exception 'invalid_phone' using errcode = '22023';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_phone, 0));
  if (select count(*) from public.contact_inquiries
      where phone = p_phone and created_at > now() - interval '1 day') >= 3 then
    raise exception 'too_many_requests' using errcode = 'P0001';
  end if;
  insert into public.contact_inquiries (phone) values (p_phone) returning id into request_id;
  return request_id;
end;
$$;
revoke all on function public.submit_contact_inquiry(text) from public;
grant execute on function public.submit_contact_inquiry(text) to anon, authenticated;

commit;
