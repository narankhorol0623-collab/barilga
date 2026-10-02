import { NextResponse } from "next/server";
import { apartments } from "@/app/admin/lib/apartments";

// GET /admin/api/get-apartment?id=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id shaardlagatai" }, { status: 400 });
    }

    const apartment = apartments.find((a) => a.id === id);
    if (!apartment) {
      return NextResponse.json({ error: "Oldsongui" }, { status: 404 });
    }

    return NextResponse.json({ apartment });
  } catch (err) {
    console.error("get-apartment:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
