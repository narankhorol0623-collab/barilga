import "server-only";
import { connection } from "next/server";
import type {
  ResidenceBlock,
  ResidenceFloor,
  ResidenceUnit,
  ResidenceLayout,
} from "./residence";

export type ResidenceInventory = {
  blocks: ResidenceBlock[];
  floors: ResidenceFloor[];
  units: ResidenceUnit[];
  layouts: ResidenceLayout[];
  error: boolean;
};

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

async function readCatalog<T>(
  table: string,
  query: string,
): Promise<Result<T>> {
  await connection();
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)) {
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

export async function getResidenceInventory(): Promise<ResidenceInventory> {
  const [blocks, floors, units, layouts] = await Promise.all([
    readCatalog<ResidenceBlock>(
      "catalog_blocks",
      "select=slug,name,total_floors,garage_floors&slug=eq.n7&selectable=eq.true&published=eq.true",
    ),
    readCatalog<ResidenceFloor>(
      "catalog_floors",
      "select=block_slug,floor,available,total,usage&block_slug=eq.n7&published=eq.true&order=floor.desc&limit=1000",
    ),
    readCatalog<ResidenceUnit>(
      "catalog_units",
      "select=block_slug,floor,number,rooms,area,status,layout_code&block_slug=eq.n7&published=eq.true&order=floor.asc,number.asc&limit=1000",
    ),
    readCatalog<ResidenceLayout>(
      "catalog_layouts",
      "select=block_slug,code,area,rooms,spaces,plan_image&block_slug=eq.n7&published=eq.true&order=code.asc",
    ),
  ]);
  const error = blocks.error || floors.error || units.error || layouts.error;
  return {
    blocks: error ? [] : blocks.data,
    floors: error ? [] : floors.data,
    units: error ? [] : units.data,
    layouts: error ? [] : layouts.data,
    error,
  };
}
