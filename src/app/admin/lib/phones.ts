// Hereglegchiin input-oor ilgeesen utasnii dugaaruud (database bhgu tul memory dotor).
// Server restart hiihed tsewerlegdene.

export type PhoneSubmission = {
  id: string;
  phone: string; // normalize hiisen: 8 orontoi
  name: string | null;
  apartmentId: string | null;
  block: string | null;
  floor: number | null;
  layout: string | null;
  status?: "new" | "contacted";
  createdAt: string; // ISO
};

const g = globalThis as unknown as { __phones?: PhoneSubmission[] };
if (!g.__phones) g.__phones = [];

export const phones: PhoneSubmission[] = g.__phones;

// "+976 9911-0000", "99110000", "976 99110000" -> "99110000"
export function normalizePhone(input: unknown): string | null {
  if (typeof input !== "string") return null;
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("976") && digits.length === 11)
    digits = digits.slice(3);
  return /^[89]\d{7}$/.test(digits) ? digits : null;
}

export function nextPhoneId(): string {
  const max = phones.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
  return String(max + 1);
}
