import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

export async function DELETE(request: Request) {
  try {
    const token = await getAdminToken();
    if (!token) return NextResponse.json({ error: "Нэвтрэх шаардлагатай." }, { status: 401 });

    const id = new URL(request.url).searchParams.get("id");
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
      return NextResponse.json({ error: "Хүсэлтийн ID буруу байна." }, { status: 400 });
    }

    for (const table of ["contact_inquiries", "residence_inquiries"]) {
      const response = await supabaseRequest(
        `/rest/v1/${table}?id=eq.${encodeURIComponent(id)}&select=id`,
        { method: "DELETE", headers: { Prefer: "return=representation" } },
        token,
      );
      if (!response.ok) {
        console.error("delete-phonenumber database error:", await response.text().catch(() => "unknown error"));
        return NextResponse.json({ error: "Хүсэлтийг устгаж чадсангүй." }, { status: 502 });
      }
      const deleted = await response.json().catch(() => []);
      if (Array.isArray(deleted) && deleted.length) {
        return NextResponse.json({ success: true, deleted: 1 });
      }
    }

    return NextResponse.json({ error: "Хүсэлт олдсонгүй." }, { status: 404 });
  } catch (error) {
    console.error("delete-phonenumber:", error);
    return NextResponse.json({ error: "Сервертэй холбогдож чадсангүй." }, { status: 500 });
  }
}
