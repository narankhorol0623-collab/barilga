-- Existing website sample content. Review before publishing as real inventory.
-- Optional: run after the migration on a development project.
begin;

insert into public.catalog_projects (slug, name, meta, status, image, published, sort_order) values
('mandala-tower', 'Мандала Тауэр', 'ХУД, 15-р хороо · 25 давхар', 'Бэлэн', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhRO932mXDS3WpQb6MSRMGo6DB4u3ILRdd6UTZuJGDFV24hTgX2zsCOroYg556nYGMWXH7wfaV_x1mq7oFSwCvJfimzH3Od6uOlEmG-37xTWkSkU7RnxaeZN8ShU6d_-y_lfU0_3HlIKhxiw4xsyapD9Dd0iuF3a7V1CgqmarnRRJSqomnZFvpNwhN-3p8-nOA3ebj5sZjgszdwp86YGLxhyMtmxaJxo4HYFpEFIT2ubL07YjQLevN', true, 0),
('neo-city', 'Нео Сити', 'СХД, 20-р хороо · 18 давхар', 'Борлуулалт', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdpwODxQM6i0uS9HH1pqXhqOsZ4XXlD2XI-tH4fnV759vmGL-Aa4fshVCcNP4Q_W8d6zdlEKwgRZYpffCHWEl-ycmYfat9zMtCgLH4MUfF_VWNjHb5Bp-PDA2bJKMiBW72BgtIPggDyDTgF43z7eJETVaIe9GChshg5dEtdKvZMvqrlnR9YTLJHD8yoHoGbMDeFmOs0NcsmjK8uK5n4k6-S-CIsBHi12h_DyM5lyGSly8EK3LQXxmV', true, 1)
on conflict do nothing;

insert into public.catalog_blocks (slug, name, href, published, sort_order) values
('n1', 'N1 Блок', '/projects/n1', true, 0),
('n2', 'N2 Блок', null, true, 1),
('n3', 'N3 Блок', null, true, 2),
('n4', 'N4 Блок', null, true, 3),
('n7', 'N7 Блок', null, true, 4),
('other', 'Бусад төлөвлөлт', null, true, 5)
on conflict do nothing;

insert into public.catalog_floors (block_slug, floor, available, total, published) values
('n1', 1, 1, 4, true),
('n1', 2, 2, 4, true),
('n1', 3, 2, 4, true),
('n1', 4, 4, 4, true),
('n1', 5, 0, 4, true),
('n1', 6, 4, 4, true),
('n1', 7, 4, 4, true),
('n1', 8, 1, 4, true),
('n1', 9, 3, 4, true),
('n1', 10, 1, 5, true),
('n1', 11, 0, 4, true),
('n1', 12, 3, 4, true),
('n1', 13, 2, 4, true),
('n1', 14, 4, 4, true),
('n1', 15, 4, 4, true)
on conflict do nothing;

insert into public.catalog_units (block_slug, floor, number, rooms, area, status, published) values
('n1', 10, '1001', 3, 98.2, 'reserved', true),
('n1', 10, '1002', 3, 120.93, 'available', true),
('n1', 10, '1003', 2, 76.5, 'sold', true),
('n1', 10, '1004', 4, 145.2, 'sold', true),
('n1', 10, '1005', 3, 110.8, 'sold', true)
on conflict do nothing;

commit;
