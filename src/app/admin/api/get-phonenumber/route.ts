import { NextResponse } from "next/server";
import { phones } from "../../lib/phones";

// GET /admin/api/get-phonenumber             -> buh dugaar (shineees nuguu)
// GET /admin/api/get-phonenumber?id=2        -> neg dugaar
// GET /admin/api/get-phonenumber?q=9911      -> dugaar/neriin daguu haih
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const q = searchParams.get("q")?.trim().toLowerCase();

    if (id) {
      const item = phones.find((p) => p.id === id);
      if (!item) {
        return NextResponse.json({ error: "Oldsongui" }, { status: 404 });
      }
      return NextResponse.json({ phoneNumber: item });
    }

    let result = [...phones].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
    if (q) {
      result = result.filter(
        (p) => p.phone.includes(q) || (p.name ?? "").toLowerCase().includes(q),
      );
    }

    return NextResponse.json({ phoneNumbers: result, total: result.length });
  } catch (err) {
    console.error("get-phonenumber:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
