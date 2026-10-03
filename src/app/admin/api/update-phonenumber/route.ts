import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

export async function PATCH(request: Request) {
  try {
    const token = await getAdminToken();
    if (!token)
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай." },
        { status: 401 },
      );
    const body = await request.json();
    if (
      typeof body.id !== "string" ||
      !/^[0-9a-f-]{36}$/i.test(body.id) ||
      !["new", "contacted"].includes(body.status)
    ) {
      return NextResponse.json(
        { error: "Хүсэлтийн төлөв буруу байна." },
        { status: 400 },
      );
    }
    for (const table of ["contact_inquiries", "residence_inquiries"]) {
      const response = await supabaseRequest(
        `/rest/v1/${table}?id=eq.${encodeURIComponent(body.id)}&select=id,status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({ status: body.status }),
        },
        token,
      );
      if (!response.ok) {
        console.error(
          "update-phonenumber database error:",
          await response.text().catch(() => "unknown error"),
        );
        return NextResponse.json(
          { error: "Хүсэлтийн төлөвийг хадгалж чадсангүй." },
          { status: 502 },
        );
      }
      const updated = await response.json().catch(() => []);
      if (Array.isArray(updated) && updated.length)
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Хүсэлт олдсонгүй." }, { status: 404 });
  } catch (error) {
    console.error("update-phonenumber:", error);
    return NextResponse.json(
      { error: "Сервертэй холбогдож чадсангүй." },
      { status: 500 },
    );
  }
}
