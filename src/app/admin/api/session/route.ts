import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin";

export async function GET() {
  try {
    return NextResponse.json({ authenticated: Boolean(await getAdminToken()) });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 503 });
  }
}
