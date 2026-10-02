import { NextResponse } from "next/server";
import { phones } from "@/app/admin/lib/phones";

// DELETE /admin/api/delete-phonenumber?id=2   esvel body: { id } esvel { ids: [...] }
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const body = await req.json().catch(() => null);

    const ids: string[] = body?.ids
      ? body.ids.map(String)
      : [searchParams.get("id") ?? body?.id].filter(Boolean).map(String);

    if (ids.length === 0) {
      return NextResponse.json({ error: "id shaardlagatai" }, { status: 400 });
    }

    let deleted = 0;
    for (const id of ids) {
      const index = phones.findIndex((p) => p.id === id);
      if (index !== -1) {
        phones.splice(index, 1);
        deleted++;
      }
    }

    if (deleted === 0) {
      return NextResponse.json({ error: "Oldsongui" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted });
  } catch (err) {
    console.error("delete-phonenumber:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
