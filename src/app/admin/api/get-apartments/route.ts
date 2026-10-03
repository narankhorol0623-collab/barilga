import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin";
import { apartments } from "@/app/admin/lib/apartments";

// GET /admin/api/get-apartments?projectId=p1&status=AVAILABLE&q=101
export async function GET(req: Request) {
  try {
    if (!(await getAdminToken())) {
      return NextResponse.json({ error: "Админ эрхээр нэвтэрнэ үү." }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const q = searchParams.get("q")?.trim().toLowerCase();

    let result = apartments;

    if (projectId) result = result.filter((a) => a.projectId === projectId);
    if (status) result = result.filter((a) => a.status === status);
    if (q) result = result.filter((a) => a.number.toLowerCase().includes(q));

    return NextResponse.json({ apartments: result, total: result.length });
  } catch (err) {
    console.error("get-apartments:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
