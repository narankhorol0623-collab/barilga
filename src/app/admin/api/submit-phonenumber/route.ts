import { NextResponse } from "next/server";
import {
  phones,
  normalizePhone,
  nextPhoneId,
  type PhoneSubmission,
} from "@/app/admin/lib/phones";
import { supabaseRequest } from "@/lib/supabase";

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

    if (body?.consent !== true) {
      return NextResponse.json(
        { error: "Тантай утсаар холбогдох зөвшөөрлөө өгнө үү." },
        { status: 400 },
      );
    }

    const hasResidenceSelection = body?.block != null || body?.floor != null || body?.layout != null;
    const block = hasResidenceSelection ? String(body.block ?? "") : null;
    const floor = hasResidenceSelection ? Number(body.floor) : null;
    const layout = hasResidenceSelection ? String(body.layout ?? "") : null;
    const apartmentId = body?.unit ? String(body.unit) : body?.apartmentId ? String(body.apartmentId) : null;

    if (hasResidenceSelection &&
      (block !== "n7" || !Number.isInteger(floor) || floor! < 3 || floor! > 15 ||
        !["A", "B", "C"].includes(layout ?? "") || (apartmentId && apartmentId.length > 30))) {
      return NextResponse.json({ error: "Байрны сонголтоо дахин шалгана уу." }, { status: 400 });
    }

    // Residence selection is validated and rate-limited by the database RPC before it is listed as a lead.
    if (hasResidenceSelection) {
      const response = await supabaseRequest("/rest/v1/rpc/submit_residence_inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_block: block, p_floor: floor, p_layout: layout, p_phone: phone, p_unit: apartmentId }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const message = error.message === "too_many_requests"
          ? "Өнөөдрийн хүсэлтийн хязгаарт хүрсэн байна. Маргааш дахин оролдоно уу."
          : error.message === "invalid_selection"
            ? "Энэ байрны сонголт өөрчлөгдсөн байна. Хуудсаа шинэчилнэ үү."
            : "Хүсэлтийг хадгалж чадсангүй. Дахин оролдоно уу.";
        return NextResponse.json({ error: message }, { status: 400 });
      }
    }

    const submission: PhoneSubmission = {
      id: nextPhoneId(),
      phone,
      name: body?.name ? String(body.name).slice(0, 100) : null,
      apartmentId,
      block,
      floor,
      layout,
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
