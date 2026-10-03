import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin";
import { apartments } from "@/app/admin/lib/apartments";

export async function PATCH(req: Request) {
  try {
    if (!(await getAdminToken())) {
      return NextResponse.json({ error: "Админ эрхээр нэвтэрнэ үү." }, { status: 401 });
    }
    const body = await req.json();
    const { id, number, floor, rooms, area, price, status } = body;

    if (!id) {
      return NextResponse.json({ error: "id shaardlagatai" }, { status: 400 });
    }

    const apartment = apartments.find((a) => a.id === String(id));
    if (!apartment) {
      return NextResponse.json({ error: "Oldsongui" }, { status: 404 });
    }

    if (number !== undefined) apartment.number = String(number);
    if (floor !== undefined)
      apartment.floor = floor === null ? null : Number(floor);
    if (rooms !== undefined)
      apartment.rooms = rooms === null ? null : Number(rooms);
    if (area !== undefined) apartment.area = Number(area);
    if (price !== undefined) apartment.price = Number(price);
    if (status !== undefined) apartment.status = status;

    return NextResponse.json({ apartment });
  } catch (err) {
    console.error("update-apartment:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
