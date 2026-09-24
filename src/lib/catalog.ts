import "server-only";
import { connection } from "next/server";

type Result<T> = { data: T[]; error: boolean };
export type Project = {
  slug: string;
  name: string;
  meta: string;
  status: string;
  image: string;
};
export type Block = { slug: string; name: string; href: string | null };
export type Floor = { floor: number; available: number; total: number };
export type Unit = {
  number: string;
  rooms: number;
  area: number;
  status: "available" | "reserved" | "sold";
};

// Explicit projections and published filters keep private fields out of page props.
async function readCatalog<T>(
  table: string,
  query: string,
): Promise<Result<T>> {
  await connection();
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)) {
    // Incomplete setup is handled by DataNotice, not a Next.js error overlay.
    console.warn(
      "Supabase catalog is not configured. Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY, then run npm run db:check.",
    );
    return { data: [], error: true };
  }
  try {
    const response = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/${table}?${query}`,
      {
        headers: { apikey: key },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) {
      console.warn(
        `Supabase catalog: ${table} returned HTTP ${response.status}.`,
      );
      return { data: [], error: true };
    }
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid catalog response");
    return { data: data as T[], error: false };
  } catch {
    console.warn(`Supabase catalog: unable to load ${table}.`);
    return { data: [], error: true };
  }
}

export function getProjects() {
  return readCatalog<Project>(
    "catalog_projects",
    "select=slug,name,meta,status,image&published=eq.true&order=sort_order.asc",
  );
}
export function getBlocks() {
  return readCatalog<Block>(
    "catalog_blocks",
    "select=slug,name,href&published=eq.true&order=sort_order.asc",
  );
}
export function getFloors() {
  return readCatalog<Floor>(
    "catalog_floors",
    "select=floor,available,total&block_slug=eq.n1&published=eq.true&order=floor.asc",
  );
}
export function getUnits() {
  return readCatalog<Unit>(
    "catalog_units",
    "select=number,rooms,area,status&block_slug=eq.n1&floor=eq.10&published=eq.true&order=number.asc",
  );
}

export async function getResidenceInventory() {
  const [blocks, floors, units] = await Promise.all([
    getBlocks(),
    readCatalog<import("./residence").ResidenceFloor>(
      "catalog_floors",
      "select=block_slug,floor,available,total&published=eq.true&order=floor.desc&limit=1000",
    ),
    readCatalog<import("./residence").ResidenceUnit>(
      "catalog_units",
      "select=block_slug,floor,number,rooms,area,status&published=eq.true&order=block_slug.asc,floor.asc,number.asc&limit=1000",
    ),
  ]);
  return {
    blocks: blocks.data,
    floors: floors.data,
    units: units.data,
    error: blocks.error || floors.error || units.error,
  };
}
