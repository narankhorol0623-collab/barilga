begin;

alter table public.catalog_blocks
  add column selectable boolean not null default false,
  add column total_floors integer,
  add column garage_floors integer;

-- Unknown apartment counts stay NULL until the actual unit inventory is entered.
alter table public.catalog_floors alter column total drop not null;
alter table public.catalog_floors alter column available drop not null;
alter table public.catalog_floors add column usage text not null default 'residential'
  check (usage in ('residential', 'garage'));

create table public.catalog_layouts (
  block_slug text not null references public.catalog_blocks(slug),
  code text not null,
  area numeric(8,2) not null check (area > 0),
  rooms integer not null check (rooms > 0),
  spaces jsonb not null default '[]',
  plan_image text check (plan_image ~ '^/[^/]' or plan_image ~ '^https://'),
  published boolean not null default false,
  primary key (block_slug, code)
);
alter table public.catalog_units add column layout_code text;
alter table public.catalog_units add foreign key (block_slug, layout_code)
  references public.catalog_layouts(block_slug, code);

-- The only currently selectable building is the supplied rear 15-storey tower.
update public.catalog_blocks set selectable = false;
insert into public.catalog_blocks (slug, name, href, published, sort_order, selectable, total_floors, garage_floors)
values ('n7', 'N7 Блок', null, true, 4, true, 15, 2)
on conflict (slug) do update set published = true, selectable = true, total_floors = 15, garage_floors = 2;
insert into public.catalog_floors (block_slug, floor, available, total, published, usage)
select 'n7', level, null, null, true, case when level <= 2 then 'garage' else 'residential' end
from generate_series(1, 15) as level
on conflict (block_slug, floor) do update set published = true, usage = excluded.usage;

insert into public.catalog_layouts (block_slug, code, area, rooms, spaces, published) values
('n7', 'A', 101.23, 4, '[["Үүдний хэсэг",4.03],["Зочны өрөө, гал тогоо",33.61],["Ариун цэврийн өрөө",3.94],["Унтлагын өрөө",13.93],["Унтлагын өрөө",14.21],["Унтлагын өрөө",14.35],["Ариун цэврийн өрөө",4.83],["Коридор",8.85],["Тагт",3.5]]', true),
('n7', 'B', 81, 3, '[["Үүдний хэсэг",3.24],["Зочны өрөө, гал тогоо",32.84],["Ариун цэврийн өрөө",3.73],["Ариун цэврийн өрөө",5.32],["Унтлагын өрөө",12.05],["Унтлагын өрөө",13.27],["Коридор",5.87],["Тагт",4.68]]', true),
('n7', 'C', 68.18, 3, '[["Үүдний хэсэг",4.43],["Зочны өрөө, гал тогоо",23.53],["Ариун цэврийн өрөө",3.51],["Ариун цэврийн өрөө",5.08],["Унтлагын өрөө",13.09],["Унтлагын өрөө",13.17],["Тагт",5.4]]', true);

alter table public.catalog_layouts enable row level security;
revoke all on public.catalog_layouts from anon, authenticated;
grant select on public.catalog_layouts to anon, authenticated;
grant all on public.catalog_layouts to service_role;
create policy "Selectable layouts" on public.catalog_layouts for select to anon, authenticated using (
  published and exists (select 1 from public.catalog_blocks b where b.slug = block_slug and b.published and b.selectable)
);
-- Hide disabled blocks and their contents even when queried directly over REST.
drop policy "Published blocks" on public.catalog_blocks;
create policy "Published blocks" on public.catalog_blocks for select to anon, authenticated using (published and selectable);

create table public.catalog_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.catalog_admins enable row level security;
revoke all on public.catalog_admins from anon, authenticated;
grant select on public.catalog_admins to authenticated;
grant all on public.catalog_admins to service_role;
create policy "Own admin membership" on public.catalog_admins for select to authenticated using (user_id = (select auth.uid()));

create table public.residence_inquiries (
  id uuid primary key default gen_random_uuid(),
  block_slug text not null,
  floor integer not null,
  layout_code text not null,
  unit_number text,
  phone text not null check (phone ~ '^[0-9]{8}$'),
  status text not null default 'new' check (status in ('new', 'contacted')),
  created_at timestamptz not null default now(),
  foreign key (block_slug, floor) references public.catalog_floors(block_slug, floor),
  foreign key (block_slug, layout_code) references public.catalog_layouts(block_slug, code),
  foreign key (block_slug, floor, unit_number) references public.catalog_units(block_slug, floor, number)
);
create index on public.residence_inquiries (created_at desc);
create index on public.residence_inquiries (phone, created_at desc);
alter table public.residence_inquiries enable row level security;
revoke all on public.residence_inquiries from anon, authenticated;
grant select on public.residence_inquiries to authenticated;
grant update (status) on public.residence_inquiries to authenticated;
grant all on public.residence_inquiries to service_role;
create policy "Admins read inquiries" on public.residence_inquiries for select to authenticated using (
  exists (select 1 from public.catalog_admins where user_id = (select auth.uid()))
);
create policy "Admins update inquiries" on public.residence_inquiries for update to authenticated using (
  exists (select 1 from public.catalog_admins where user_id = (select auth.uid()))
) with check (exists (select 1 from public.catalog_admins where user_id = (select auth.uid())));

-- Anonymous visitors can submit validated requests, but cannot read phone numbers.
create function public.submit_residence_inquiry(
  p_block text, p_floor integer, p_layout text, p_phone text, p_unit text default null
) returns uuid language plpgsql security definer set search_path = '' as $$
declare request_id uuid;
begin
  if p_phone is null or p_phone !~ '^[0-9]{8}$' then
    raise exception 'invalid_phone' using errcode = '22023';
  end if;
  if not exists (
    select 1 from public.catalog_blocks b
    join public.catalog_floors f on f.block_slug = b.slug
    join public.catalog_layouts l on l.block_slug = b.slug
    where b.slug = p_block and b.selectable and b.published
      and f.floor = p_floor and f.usage = 'residential' and f.published
      and l.code = p_layout and l.published
  ) then raise exception 'invalid_selection' using errcode = '22023'; end if;
  if p_unit is not null and not exists (
    select 1 from public.catalog_units u where u.block_slug = p_block and u.floor = p_floor
      and u.number = p_unit and u.layout_code = p_layout and u.published and u.status = 'available'
  ) then raise exception 'invalid_selection' using errcode = '22023'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_phone, 0));
  select id into request_id from public.residence_inquiries
    where phone = p_phone and block_slug = p_block and floor = p_floor and layout_code = p_layout
      and unit_number is not distinct from p_unit and created_at > now() - interval '10 minutes'
    order by created_at desc limit 1;
  if request_id is not null then return request_id; end if;
  if (select count(*) from public.residence_inquiries where phone = p_phone and created_at > now() - interval '1 day') >= 3 then
    raise exception 'too_many_requests' using errcode = 'P0001';
  end if;
  insert into public.residence_inquiries (block_slug, floor, layout_code, unit_number, phone)
    values (p_block, p_floor, p_layout, p_unit, p_phone) returning id into request_id;
  return request_id;
end;
$$;
revoke all on function public.submit_residence_inquiry(text, integer, text, text, text) from public;
grant execute on function public.submit_residence_inquiry(text, integer, text, text, text) to anon, authenticated;

commit;
