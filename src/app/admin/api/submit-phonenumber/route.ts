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

    const response = await supabaseRequest(
      "/rest/v1/rpc/submit_contact_inquiry",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_phone: phone }),
      },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(
        "submit-phonenumber RPC failed:",
        response.status,
        response.statusText,
        text, // <-- Supabase-ийн жинхэнэ алдааны мессеж
      );
      return NextResponse.json(
        {
          error: "Хүсэлтийг хадгалж чадсангүй. Дахин оролдоно уу.",
          ...(process.env.NODE_ENV !== "production" && {
            debug: { status: response.status, detail: text },
          }),
        },
        { status: 502 },
      );
    }

    const id = await response.json().catch(() => null);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("submit-phonenumber:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
