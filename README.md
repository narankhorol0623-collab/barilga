# Гүнд Саплай

Next.js 16 / React 19 property website.

## Development

```sh
bun install
bun dev
```

Copy `.env.example` to `.env` if needed. Set `SUPABASE_URL` and
`SUPABASE_PUBLISHABLE_KEY`. Apartment inventory comes from Supabase; there is
no seed file or preview inventory. During a connection failure, the confirmed N7
building, floors and supplied A/B/C plan sheets remain browsable. Live apartment
availability and inquiry submission remain unavailable until the database is connected. No generated apartments or availability counts are used.

If local Node reports `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, configure a trusted CA
bundle before starting Node, for example on this Mac:

```sh
NODE_EXTRA_CA_CERTS=/etc/ssl/cert.pem bun dev
NODE_EXTRA_CA_CERTS=/etc/ssl/cert.pem npm run db:check
```

The Node launcher reads `.env` before starting Next or the database checker, so
`NODE_EXTRA_CA_CERTS` can also be stored there. Do not disable TLS verification.

## Database

Use Supabase **Connect → Session pooler** to set `SUPABASE_DB_URL`; set the database
password in `SUPABASE_PASSWORD`. The unrelated Prisma `DATABASE_URL` is not used.

```sh
bun run db:migrate
bun run db:check
```

The migration runner checks the project host/user and records applied migrations
in `barilga_migrations.applied`. Alternatively run the SQL files under
`supabase/migrations` in order in Supabase's SQL Editor, once each. If the original
four catalog tables already exist, start with `202609280001_residence_inquiries.sql`.
The runner recognizes an existing original four-table schema. Do not mix manual
execution of the new migration with the runner unless its history is also recorded.

The new migration stores the confirmed N7 building, floors 1–2 as garages, floors
3–15 as residential, and A (101.23 m² / 4 rooms), B (81 m² / 3 rooms), C (68.18 m² /
3 rooms) layouts with the supplied room areas. Other blocks become unselectable,
including direct public REST reads. Existing records are preserved. No sample
units, prices, availability counts or apartment numbers are inserted.

### Plans and apartment numbers

The supplied plan images are stored in `public/plans/a.jpg`, `b.jpg`, and `c.jpg`.
`src/lib/residence-layouts.ts` holds their areas and room details. Visitors can
open these layouts even when Supabase is unavailable; they do not represent
confirmed available apartment numbers. Published database layouts use these local
images when `plan_image` is null.

To add 3D interior renders, place images in `public/designs` and add `{ src,
caption }` entries under A, B or C in `residenceDesigns` in that same file. They
appear in the selected layout's detail dialog. Until images are supplied, that
section shows a coming-soon message.

Enter real apartments in `catalog_units` with `block_slug=n7`, the actual `floor`,
`number`, `layout_code` (A/B/C), `rooms`, `area`, `status`, and `published=true`.
When a floor has published units, visitors select those exact units. Until then,
they can leave an inquiry for a floor and layout; it is not an apartment reservation.
Keep `catalog_floors.available` and `total` null until counts are confirmed.

### Contact requests and admin

Visitors open a plan and submit their phone number. `submit_residence_inquiry`
validates the published, selectable building, residential floor, layout and any
specified available unit in the database. It stores a `residence_inquiries` record
without changing the apartment's sale status. Repeat submissions of the same
phone/selection within 10 minutes are deduplicated; each phone is limited to three
requests per day. These limits are not a substitute for CAPTCHA under heavy abuse.

Create the staff account in **Supabase Authentication → Users**, then add its UUID
to `catalog_admins.user_id` using Table Editor (or a trusted SQL session). Staff
sign in at `/admin/login` with that account's email and password. There is no public
admin signup or default password. Login lasts up to one hour, then requires signing
in again. `/admin` shows the latest 100 requests, their phone, floor, layout and
actual unit number where provided. Staff can mark requests as contacted. Older
requests remain in Supabase.

RLS prevents public users from reading phone numbers or granting themselves admin
rights. Admin authorization is checked on the server and in database policies.
The app does not use the Supabase secret/service-role key. Session cookies are
HTTP-only and secure in production. See [Supabase RLS documentation](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Validation

```sh
npm test
npm run lint
npx tsc --noEmit
npm run build
bun run db:check
```
