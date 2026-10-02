import { NextResponse } from "next/server";
import {
  phones,
  normalizePhone,
  nextPhoneId,
  type PhoneSubmission,
} from "@/app/admin/lib/phones";

// POST /api/submit-phonenumber   body: { phone, name?, apartmentId? }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const phone = normalizePhone(body?.phone);

    if (!phone) {
      return NextResponse.json(
        { error: "Utasnii dugaar buruu baina (8 orontoi baih yostoi)" },
        { status: 400 },
      );
    }

    const submission: PhoneSubmission = {
      id: nextPhoneId(),
      phone,
      name: body?.name ? String(body.name).slice(0, 100) : null,
      apartmentId: body?.apartmentId ? String(body.apartmentId) : null,
      createdAt: new Date().toISOString(),
    };

    phones.push(submission);

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 },
    );
  } catch (err) {
    console.error("submit-phonenumber:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
