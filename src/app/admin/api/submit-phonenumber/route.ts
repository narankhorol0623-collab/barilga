import { NextResponse } from "next/server";
import { normalizePhone } from "@/app/admin/lib/phones";
import { supabaseRequest } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const phone = normalizePhone(body?.phone);

    if (!phone) {
      return NextResponse.json(
        { error: "8 оронтой зөв дугаар оруулна уу." },
        { status: 400 },
      );
    }

    if (body?.consent !== true) {
      return NextResponse.json(
        { error: "Тантай утсаар холбогдох зөвшөөрлөө өгнө үү." },
        { status: 400 },
      );
    }

    const hasResidenceSelection =
      body?.block != null || body?.floor != null || body?.layout != null;
    const block = hasResidenceSelection ? String(body.block ?? "") : null;
    const floor = hasResidenceSelection ? Number(body.floor) : null;
    const layout = hasResidenceSelection ? String(body.layout ?? "") : null;
    const apartmentId = body?.unit
      ? String(body.unit)
      : body?.apartmentId
        ? String(body.apartmentId)
        : null;

    if (
      hasResidenceSelection &&
      (block !== "n7" ||
        !Number.isInteger(floor) ||
        floor! < 3 ||
        floor! > 15 ||
        !["A", "B", "C"].includes(layout ?? "") ||
        (apartmentId && apartmentId.length > 30))
    ) {
      return NextResponse.json(
        { error: "Байрны сонголтоо дахин шалгана уу." },
        { status: 400 },
      );
    }

    if (hasResidenceSelection) {
      const response = await supabaseRequest(
        "/rest/v1/rpc/submit_residence_inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            p_block: block,
            p_floor: floor,
            p_layout: layout,
            p_phone: phone,
            p_unit: apartmentId,
          }),
        },
      );
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        return NextResponse.json(
          { error: publicSubmissionError(error.message) },
          { status: 400 },
        );
      }
      const id = await response.json().catch(() => null);
      return NextResponse.json({ success: true, id }, { status: 201 });
    }

    const response = await supabaseRequest(
      "/rest/v1/rpc/submit_contact_inquiry",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_phone: phone }),
      },
    );
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: publicSubmissionError(error.message) },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("submit-phonenumber:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
