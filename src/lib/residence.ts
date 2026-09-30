export type ResidenceBlock = {
  slug: string;
  name: string;
  total_floors: number;
  garage_floors: number;
};
export type ResidenceFloor = {
  block_slug: string;
  floor: number;
  available: number | null;
  total: number | null;
  usage: "residential" | "garage";
};
export type ResidenceLayout = {
  block_slug: string;
  code: string;
  rooms: number;
  area: number;
  spaces: [string, number][];
  plan_image: string | null;
};
export type ResidenceUnit = {
  block_slug: string;
  floor: number;
  number: string;
  rooms: number;
  area: number;
  layout_code: string | null;
  status: "available" | "reserved" | "sold";
};

export const residenceTower: ResidenceBlock = {
  slug: "n7",
  name: "N7 Блок",
  total_floors: 15,
  garage_floors: 2,
};
export const residenceTowerFloors: ResidenceFloor[] = Array.from(
  { length: 15 },
  (_, index) => {
    const floor = 15 - index;
    return {
      block_slug: "n7",
      floor,
      available: null,
      total: null,
      usage: floor <= 2 ? "garage" : "residential",
    };
  },
);
export const residenceMap = {
  n7: {
    points: "313,194 343,182 375,191 379,311 347,324 314,312",
    label: [346, 254] as const,
  },
};

export function normalizePhone(value: string) {
  return value
    .trim()
    .replace(/^\+976[ -]?/, "")
    .replace(/[ -]/g, "");
}
