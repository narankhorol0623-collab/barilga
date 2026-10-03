"use client";

import { useState } from "react";

export default function ContactForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^[89]\d{7}$/.test(cleanPhone)) {
      setStatus("error");
      setErrorMessage("8 оронтой зөв дугаар оруулна уу (жишээ: 99112233)");
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMessage("Тантай утсаар холбогдох зөвшөөрлөө өгнө үү.");
      return;
    }

    try {
      const res = await fetch("/admin/api/submit-phonenumber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, consent }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Алдаа гарлаа.");
      }

      setStatus("success");
      setPhone("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Илгээхэд алдаа гарлаа.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-[#0a1128] py-12 text-white in-data-[theme=light]:border-[#d6deea] in-data-[theme=light]:bg-[#eef3f9] in-data-[theme=light]:text-[#0a1128]"
    >
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[color:var(--brand-accent)]">
          Бидэнтэй холбогдох
        </h2>
        <p className="mb-6 text-sm text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">
          Та утасны дугаараа үлдээгээрэй. Бид тантай тун удахгүй холбогдох
          болно.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          <div className="relative min-w-0 flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">
              +976
            </span>
            <input
              id="contact-phone"
              name="phone"
              aria-label="Монгол утасны дугаар, 8 орон"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                const local =
                  digits.startsWith("976") && digits.length > 8
                    ? digits.slice(3)
                    : digits;
                setPhone(local.slice(0, 8));
              }}
              placeholder="99112233"
              maxLength={16}
              required
              disabled={status === "loading"}
              className="w-full rounded-lg border border-white/15 bg-[#101d3b] py-2.5 pl-14 pr-4 text-sm text-white placeholder:text-[#8793aa] focus:border-[var(--brand-accent)] focus:outline-none disabled:opacity-60 in-data-[theme=light]:border-[#c7d2e1] in-data-[theme=light]:bg-white in-data-[theme=light]:text-[#0a1128]"
            />
          </div>

          <label
            htmlFor="contact-consent"
            className="flex items-start gap-2 text-left text-xs leading-5 text-[#b7c0d2] sm:order-3 sm:basis-full in-data-[theme=light]:text-[#526078]"
          >
            <input
              id="contact-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={status === "loading"}
              className="mt-1 size-4 shrink-0 accent-[#216aab]"
            />
            <span>Миний үлдээсэн дугаараар холбогдохыг зөвшөөрч байна.</span>
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-[var(--brand-accent)] px-6 py-2.5 text-sm font-bold text-[#071326] transition-opacity hover:opacity-90 disabled:opacity-50 sm:order-2"
          >
            {status === "loading" ? "Илгээж байна..." : "Хүсэлт илгээх"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-2 text-sm font-medium text-red-400">
            {errorMessage}
          </p>
        )}

        {status === "success" && (
          <p className="mt-2 text-sm font-medium text-emerald-400">
            Амжилттай хүлээн авлаа! Бид тантай тун удахгүй холбогдоно.
          </p>
        )}
      </div>
    </section>
  );
}
