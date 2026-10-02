"use client";

import { useActionState } from "react";
import { submitInquiry } from "./actions";

export default function InquiryForm({
  block,
  floor,
  layout,
  unit,
}: {
  block: string;
  floor: number;
  layout: string;
  unit?: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, {
    success: false,
    message: "",
  });
  if (state.success)
    return (
      <p
        role="status"
        className="rounded-xl bg-emerald-50 p-5 text-sm text-emerald-800"
      >
        {state.message}
      </p>
    );
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="block" value={block} />
      <input type="hidden" name="floor" value={floor} />
      <input type="hidden" name="layout" value={layout} />
      <input type="hidden" name="unit" value={unit ?? ""} />
      <label htmlFor="inquiry-phone" className="block text-sm font-semibold">
        Утасны дугаараа үлдээх
      </label>
      <input
        id="inquiry-phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        maxLength={16}
        required
        placeholder="99112233"
        className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900"
      />
      <label className="flex items-start gap-2 text-xs leading-5 text-slate-600">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 shrink-0 accent-sky-700"
        />
        Энэ байрны талаар борлуулалтын ажилтан надтай утсаар холбогдохыг
        зөвшөөрч байна.
      </label>
      {state.message && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}
      <button
        disabled={pending}
        className="min-h-12 w-full cursor-pointer rounded-lg bg-[#216aab] px-4 text-sm font-semibold text-white disabled:opacity-50"
      >
        {pending ? "Хадгалж байна…" : "Холбогдох хүсэлт илгээх"}
      </button>
    </form>
  );
}
