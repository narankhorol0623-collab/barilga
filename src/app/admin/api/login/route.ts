import { NextResponse } from "next/server";
import { validateAdmin } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password) {
      return NextResponse.json(
        { error: "И-мэйл, нууц үгээ оруулна уу." },
        { status: 400 },
      );
    }

    const response = await supabaseRequest(
      "/auth/v1/token?grant_type=password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    const result = await response.json().catch(() => ({}));
    if (!response.ok || typeof result.access_token !== "string") {
      return NextResponse.json(
        { error: "И-мэйл эсвэл нууц үг буруу байна." },
        { status: 401 },
      );
    }
    if (!(await validateAdmin(result.access_token))) {
      return NextResponse.json(
        { error: "Энэ хэрэглэгч админы эрхгүй байна." },
        { status: 403 },
      );
    }

    const next = NextResponse.json({ success: true });
    next.cookies.set("residence_admin", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.min(Number(result.expires_in) || 3600, 3600),
    });
    return next;
  } catch (error) {
    console.error("admin login:", error);
    return NextResponse.json(
      { error: "Нэвтрэх үед алдаа гарлаа. Тохиргоогоо шалгана уу." },
      { status: 500 },
    );
  }
}
