import { NextResponse } from "next/server";
import { getUserToken, validateAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const token = await getUserToken();
    return NextResponse.json({
      authenticated: Boolean(token),
      authorized: token ? await validateAdmin(token) : false,
    });
  } catch {
    return NextResponse.json({ authenticated: false, authorized: false }, { status: 503 });
  }
}
