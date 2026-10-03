import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin";
import { supabaseRequest } from "@/lib/supabase";
import type { PhoneSubmission } from "../../lib/phones";

type ContactRow = { id: string; phone: string; status: "new" | "contacted"; created_at: string };
type ResidenceRow = {
  id: string;
  phone: string;
  block_slug: string;
  floor: number;
  layout_code: string;
  unit_number: string | null;
  status: "new" | "contacted";
  created_at: string;
};

export async function GET(request: Request) {
  try {
    const token = await getAdminToken();
    if (!token) return NextResponse.json({ error: "Нэвтрэх шаардлагатай." }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const query = searchParams.get("q")?.trim().toLowerCase();
    const filter = id ? `&id=eq.${encodeURIComponent(id)}` : "";
    const [contactResponse, residenceResponse] = await Promise.all([
      supabaseRequest(`/rest/v1/contact_inquiries?select=id,phone,status,created_at${filter}&order=created_at.desc&limit=100`, {}, token),
      supabaseRequest(`/rest/v1/residence_inquiries?select=id,phone,block_slug,floor,layout_code,unit_number,status,created_at${filter}&order=created_at.desc&limit=100`, {}, token),
    ]);
    if (!contactResponse.ok || !residenceResponse.ok) {
      console.error("get-phonenumber database error:", await errorBody(contactResponse), await errorBody(residenceResponse));
      return NextResponse.json({ error: "Хүсэлтүүдийг өгөгдлийн сангаас уншиж чадсангүй." }, { status: 502 });
    }

    const contacts = await contactResponse.json() as ContactRow[];
    const residences = await residenceResponse.json() as ResidenceRow[];
    let phoneNumbers: PhoneSubmission[] = [
      ...contacts.map((row): PhoneSubmission => ({
        id: row.id,
        phone: row.phone,
        name: null,
        apartmentId: null,
        block: null,
        floor: null,
        layout: null,
        status: row.status,
        createdAt: row.created_at,
      })),
      ...residences.map((row): PhoneSubmission => ({
        id: row.id,
        phone: row.phone,
        name: null,
        apartmentId: row.unit_number,
        block: row.block_slug,
        floor: row.floor,
        layout: row.layout_code,
        status: row.status,
        createdAt: row.created_at,
      })),
    ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    if (query) phoneNumbers = phoneNumbers.filter((item) => item.phone.includes(query));
    if (id) {
      const phoneNumber = phoneNumbers[0];
      return phoneNumber
        ? NextResponse.json({ phoneNumber })
        : NextResponse.json({ error: "Хүсэлт олдсонгүй." }, { status: 404 });
    }
    phoneNumbers = phoneNumbers.slice(0, 100);
    return NextResponse.json({ phoneNumbers, total: phoneNumbers.length });
  } catch (error) {
    console.error("get-phonenumber:", error);
    return NextResponse.json({ error: "Сервертэй холбогдож чадсангүй." }, { status: 500 });
  }
}

async function errorBody(response: Response) {
  return response.ok ? null : response.text().catch(() => "unknown error");
}
