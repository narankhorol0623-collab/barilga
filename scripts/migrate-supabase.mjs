import { SQL } from 'bun';
import { readdir } from 'node:fs/promises';

const raw = process.env.SUPABASE_DB_URL;
if (!raw) throw new Error('Set SUPABASE_DB_URL to the Supabase Session pooler connection string. DATABASE_URL is intentionally not used.');
const url = new URL(raw);
const ref = new URL(process.env.SUPABASE_URL).hostname.split('.')[0];
if (!((url.hostname.endsWith('.pooler.supabase.com') && decodeURIComponent(url.username) === `postgres.${ref}`) || url.hostname === `db.${ref}.supabase.co`)) {
  throw new Error('Database host/user must match the configured Supabase project.');
}
const caFile = process.env.NODE_EXTRA_CA_CERTS;
const db = new SQL({
  hostname: url.hostname, port: Number(url.port) || 5432,
  username: decodeURIComponent(url.username), password: process.env.SUPABASE_PASSWORD || decodeURIComponent(url.password),
  database: url.pathname.slice(1) || 'postgres', max: 1, connectionTimeout: 15,
  tls: { rejectUnauthorized: true, ...(caFile ? { ca: await Bun.file(caFile).text() } : {}) },
});
try {
  await db`create schema if not exists barilga_migrations`;
  await db`create table if not exists barilga_migrations.applied (name text primary key, applied_at timestamptz not null default now())`;
  for (const name of (await readdir('supabase/migrations')).filter(n => n.endsWith('.sql')).sort()) {
    if ((await db`select name from barilga_migrations.applied where name = ${name}`).length) continue;
    // The original catalog migration may already have been run in the SQL editor.
    if (name === '202609240001_catalog.sql') {
      const existing = await db`select count(*)::int as count from information_schema.tables where table_schema = 'public' and table_name in ('catalog_projects','catalog_blocks','catalog_floors','catalog_units')`;
      if (existing[0].count === 4) {
        await db`insert into barilga_migrations.applied (name) values (${name})`;
        continue;
      }
      if (existing[0].count !== 0) throw new Error('Partial catalog schema found; inspect before applying migrations.');
    }
    const sql = (await Bun.file(`supabase/migrations/${name}`).text()).replace(/^\s*begin;/i, '').replace(/commit;\s*$/i, '');
    await db.begin(async tx => {
      await tx.unsafe(sql).simple();
      await tx`insert into barilga_migrations.applied (name) values (${name})`;
    });
    console.log(`Applied ${name}`);
  }
  await db`notify pgrst, 'reload schema'`;
} catch (error) {
  // Never dump connection strings, passwords or arbitrary SQL parameter values.
  console.error('Migration failed:', error instanceof Error ? error.name : 'unknown');
  process.exitCode = 1;
} finally { await db.close(); }
