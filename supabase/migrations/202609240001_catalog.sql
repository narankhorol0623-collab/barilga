begin;

create table public.catalog_projects (
  slug text primary key,
  name text not null,
  meta text not null,
  status text not null,
  image text not null check (image ~ '^https://'),
  published boolean not null default false,
  sort_order integer not null default 0
);

create table public.catalog_blocks (
  slug text primary key,
  name text not null,
  href text check (href ~ '^/projects/[a-z0-9/-]+$'),
  published boolean not null default false,
  sort_order integer not null default 0
);

create table public.catalog_floors (
  block_slug text not null references public.catalog_blocks(slug),
  floor integer not null check (floor > 0),
  available integer not null check (available >= 0),
  total integer not null check (total > 0 and available <= total),
  published boolean not null default false,
  primary key (block_slug, floor)
);

create table public.catalog_units (
  block_slug text not null,
  floor integer not null,
  number text not null,
  rooms integer not null check (rooms > 0),
  area numeric(8,2) not null check (area > 0),
  status text not null check (status in ('available', 'reserved', 'sold')),
  published boolean not null default false,
  primary key (block_slug, floor, number),
  foreign key (block_slug, floor) references public.catalog_floors(block_slug, floor)
);

alter table public.catalog_projects enable row level security;
alter table public.catalog_blocks enable row level security;
alter table public.catalog_floors enable row level security;
alter table public.catalog_units enable row level security;

revoke all on public.catalog_projects, public.catalog_blocks, public.catalog_floors, public.catalog_units from anon, authenticated;
grant select on public.catalog_projects, public.catalog_blocks, public.catalog_floors, public.catalog_units to anon, authenticated;
grant all on public.catalog_projects, public.catalog_blocks, public.catalog_floors, public.catalog_units to service_role;

create policy "Published projects" on public.catalog_projects for select to anon, authenticated using (published);
create policy "Published blocks" on public.catalog_blocks for select to anon, authenticated using (published);
create policy "Published floors" on public.catalog_floors for select to anon, authenticated using (
  published and exists (select 1 from public.catalog_blocks b where b.slug = block_slug and b.published)
);
create policy "Published units" on public.catalog_units for select to anon, authenticated using (
  published and exists (select 1 from public.catalog_floors f where f.block_slug = catalog_units.block_slug and f.floor = catalog_units.floor and f.published)
);

commit;
