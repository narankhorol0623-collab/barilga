import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_PUBLISHABLE_KEY;
if (!url || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url) || !key) {
  console.error("Set SUPABASE_URL=https://<project-ref>.supabase.co and SUPABASE_PUBLISHABLE_KEY in .env.");
  process.exit(1);
}

const tables = {
  catalog_projects: "slug,name,meta,status,image,sort_order",
  catalog_blocks: "slug,name,href,sort_order",
  catalog_floors: "block_slug,floor,available,total",
  catalog_units: "block_slug,floor,number,rooms,area,status",
};
for (const [table, columns] of Object.entries(tables)) {
  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}?select=${columns}&published=eq.true&limit=1`, {
      headers: { apikey: key },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error(`${table}: HTTP ${response.status}. Check the URL, publishable key, migration and read policies.`);
      process.exitCode = 1;
      continue;
    }
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error("Invalid response");
    console.log(`${table}: connected (${rows.length ? "published content found" : "no published content"}).`);
  } catch {
    console.error(`${table}: connection failed.`);
    process.exitCode = 1;
  }
}
