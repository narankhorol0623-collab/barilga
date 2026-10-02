// Mock data - database bhgu tul ene fileaas data avna.
// Anhaaruulga: memory dotor hadgalagdana. Server restart / redeploy hiihed anhnii utga руу буцна.

export type ApartmentStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export type Apartment = {
  id: string;
  projectId: string;
  number: string;
  floor: number | null;
  rooms: number | null;
  area: number;
  price: number;
  status: ApartmentStatus;
};

const initialData: Apartment[] = [
  {
    id: "1",
    projectId: "p1",
    number: "101",
    floor: 1,
    rooms: 2,
    area: 56,
    price: 168000000,
    status: "AVAILABLE",
  },
  {
    id: "2",
    projectId: "p1",
    number: "102",
    floor: 1,
    rooms: 3,
    area: 78,
    price: 234000000,
    status: "RESERVED",
  },
  {
    id: "3",
    projectId: "p1",
    number: "201",
    floor: 2,
    rooms: 2,
    area: 58,
    price: 174000000,
    status: "SOLD",
  },
  {
    id: "4",
    projectId: "p2",
    number: "301",
    floor: 3,
    rooms: 1,
    area: 38,
    price: 114000000,
    status: "AVAILABLE",
  },
];

// Dev-d hot reload hiihed data алдагдахгүйн тулд globalThis дээр хадгална
const g = globalThis as unknown as { __apartments?: Apartment[] };
if (!g.__apartments) g.__apartments = [...initialData];

export const apartments: Apartment[] = g.__apartments;

export function nextId(): string {
  const max = apartments.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0);
  return String(max + 1);
}
