export type ResidenceBlock = {
  slug: string;
  name: string;
  points: string;
  label: [number, number];
};
export type ResidenceFloor = {
  block_slug: string;
  floor: number;
  available: number;
  total: number;
};
export type ResidenceUnit = {
  block_slug: string;
  floor: number;
  number: string;
  rooms: number;
  area: number;
  status: "available" | "reserved" | "sold";
};

// Provisional block labels; coordinates refer to the original 720 × 720 photograph.
export const residenceBlocks: ResidenceBlock[] = [
  {
    slug: "n7",
    name: "N7 Блок",
    points: "313,194 343,182 375,191 379,311 347,324 314,312",
    label: [346, 254],
  },
  {
    slug: "n4",
    name: "N4 Блок",
    points: "114,310 151,299 198,305 205,358 169,402 126,389",
    label: [150, 330],
  },
  {
    slug: "n3",
    name: "N3 Блок",
    points: "146,358 198,348 247,355 253,409 215,445 155,432",
    label: [190, 374],
  },
  {
    slug: "n2",
    name: "N2 Блок",
    points: "173,409 221,396 276,404 287,498 235,515 177,502",
    label: [228, 451],
  },
  {
    slug: "n1",
    name: "N1 Блок",
    points: "153,537 194,502 291,495 303,527 305,639 229,659 171,650",
    label: [235, 584],
  },
];

// Preview inventory is deliberately separate from Supabase and is never written to it.
export function createPreviewInventory() {
  const floors: ResidenceFloor[] = [];
  const units: ResidenceUnit[] = [];
  for (const block of residenceBlocks) {
    const floorCount = block.slug === "n7" ? 15 : 6;
    for (let floor = 1; floor <= floorCount; floor++) {
      const floorUnits: ResidenceUnit[] = Array.from({ length: 4 }, (_, i) => ({
        block_slug: block.slug,
        floor,
        number: `${floor}${String(i + 1).padStart(2, "0")}`,
        rooms: [2, 3, 3, 4][i],
        area: [76.5, 98.2, 120.93, 145.2][i],
        status:
          (floor + i) % 7 === 0
            ? "sold"
            : (floor + i) % 5 === 0
              ? "reserved"
              : "available",
      }));
      floors.push({
        block_slug: block.slug,
        floor,
        total: floorUnits.length,
        available: floorUnits.filter((u) => u.status === "available").length,
      });
      units.push(...floorUnits);
    }
  }
  return { floors, units };
}

export function filterResidenceUnits(
  units: ResidenceUnit[],
  block: string,
  floor: number | null,
  rooms: number,
  availableOnly: boolean,
) {
  return units.filter(
    (unit) =>
      unit.block_slug === block &&
      unit.floor === floor &&
      (!rooms || unit.rooms === rooms) &&
      (!availableOnly || unit.status === "available"),
  );
}
