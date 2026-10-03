import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin";
import { apartments } from "@/app/admin/lib/apartments";

export async function DELETE(req: Request) {
  try {
    if (!(await getAdminToken())) {
      return NextResponse.json({ error: "Админ эрхээр нэвтэрнэ үү." }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await req.json().catch(() => null);
      id = body?.id ?? null;
    }

    if (!id) {
      return NextResponse.json({ error: "id shaardlagatai" }, { status: 400 });
    }

    const index = apartments.findIndex((a) => a.id === String(id));
    if (index === -1) {
      return NextResponse.json({ error: "Oldsongui" }, { status: 404 });
    }

    apartments.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("delete-apartment:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
