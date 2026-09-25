# Гүнд Саплай

Next.js 16 / React 19 property website. The supplied GUND SUPPLY logo is in
`public/gund-supply-logo.webp`; brand colors are defined in `src/app/globals.css`.

## Local development

```sh
npm install
npm run dev
```

## Supabase setup

1. Copy `.env.example` to `.env` only if you do not already have an environment file.
2. Set `SUPABASE_URL` to the project's HTTPS URL from Supabase Dashboard → Project
   Settings → Data API. Set `SUPABASE_PUBLISHABLE_KEY` to its publishable key.
   A publishable key is not a URL. The existing Prisma `DATABASE_URL` is not used
   by this integration and must not be substituted for the Supabase URL.
3. Run `supabase/migrations/202609240001_catalog.sql` once in that project's SQL
   Editor (or apply it through your Supabase migration workflow).
4. Add projects, blocks, floors and units in Table Editor and set `published=true`.
   `supabase/seed.sql` optionally imports the previous website's sample content;
   review it before presenting it as real inventory. It never overwrites existing rows.
5. Run `npm run db:check` to verify all four tables using the application's key.

The application reads Supabase's REST API from server components with a publishable
key and row-level security. Only published content is readable. Anonymous writes
are denied. Floor and unit records also require their parents to be published.
Secret keys and database passwords are not used by website queries.
See the [Supabase API key guide](https://supabase.com/docs/guides/getting-started/api-keys).

The four tables are `catalog_projects`, `catalog_blocks`, `catalog_floors`, and
`catalog_units`. Queries use explicit field lists, have an eight-second timeout,
and read fresh data on each request. Missing configuration and connection failures
show a user-facing unavailable state; an empty table shows an empty state. No
sample apartment availability is silently displayed when the database fails.

## Luxury Residence apartment selector

`/master-plan` uses the supplied photograph with keyboard-accessible building
outlines. Choose a block, floor and apartment; filter by room count and availability.
The old N1 and floor-10 URLs redirect into this selector. The homepage's primary
button opens it directly.

Coordinates and provisional block labels live in `src/lib/residence.ts` and use
pixel coordinates from the original 720 × 720 photograph. Update this mapping when
official block numbering is supplied. Real floors and apartments are loaded from
Supabase by `block_slug` and `floor`. Keep floor availability totals consistent
with apartment records in Table Editor.

When a database request fails, the entire selector switches to a clearly labelled
preview dataset. Preview information is never mixed with live inventory or written
to Supabase, and does not create reservations. Successful empty database results
remain empty. Real floor-plan drawings and prices are not available in the current
schema, so the selector does not fabricate them.

## Validation

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run db:check
```

Configure the same Supabase URL and publishable key in your deployment environment.
