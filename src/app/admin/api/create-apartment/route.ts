import { NextResponse } from "next/server";
import { Apartment, apartments, nextId } from "../../lib/apartments";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, number, floor, rooms, area, price, status } = body;

    if (!projectId || !number || area == null || price == null) {
      return NextResponse.json(
        { error: "projectId, number, area, price shaardlagatai" },
        { status: 400 },
      );
    }

    const apartment: Apartment = {
      id: nextId(),
      projectId: String(projectId),
      number: String(number),
      floor: floor != null ? Number(floor) : null,
      rooms: rooms != null ? Number(rooms) : null,
      area: Number(area),
      price: Number(price),
      status: status ?? "AVAILABLE",
    };

    apartments.push(apartment);

    return NextResponse.json({ apartment }, { status: 201 });
  } catch (err) {
    console.error("create-apartment:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
