export default function DataNotice({ error, empty }: { error: boolean; empty: boolean }) {
  if (!error && !empty) return null;
  return <p role="status" className="col-span-full rounded-lg border border-slate-400/25 p-6 text-sm text-slate-400 in-data-[theme=light]:text-slate-600">{error ? "Мэдээллийг одоогоор ачаалж чадсангүй. Түр хүлээгээд дахин оролдоно уу." : "Мэдээлэл удахгүй нэмэгдэнэ."}</p>;
}
