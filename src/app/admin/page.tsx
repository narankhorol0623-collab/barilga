import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminToken } from '@/lib/admin';
import { supabaseRequest } from '@/lib/supabase';
import { logoutAdmin, markContacted } from './actions';

type Inquiry = { id: string; block_slug: string; floor: number; layout_code: string; unit_number: string | null; phone: string; status: 'new' | 'contacted'; created_at: string };
export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  let token: string | null;
  try { token = await getAdminToken(); } catch {
    return <main className="p-10"><p role="alert">Админ холболт амжилтгүй. Түр хүлээгээд дахин оролдоно уу.</p></main>;
  }
  if (!token) redirect('/admin/login');
  let inquiries: Inquiry[] = [];
  let loadError = false;
  try {
    const response = await supabaseRequest('/rest/v1/residence_inquiries?select=id,block_slug,floor,layout_code,unit_number,phone,status,created_at&order=created_at.desc&limit=100', {}, token);
    if (!response.ok) loadError = true;
    else inquiries = await response.json();
  } catch { loadError = true; }
  const params = await searchParams;
  return <main className="mx-auto w-full max-w-5xl px-5 py-12">
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><h1 className="text-2xl font-semibold">Холбогдох хүсэлтүүд</h1><div className="flex items-center gap-5 text-sm"><Link href="/admin">Шинэчлэх</Link><form action={logoutAdmin}><button className="cursor-pointer">Гарах</button></form></div></div>
    {(loadError || params.error) && <p role="alert" className="mb-5 rounded-lg border border-red-400/30 p-4 text-red-400">{loadError ? 'Хүсэлтүүдийг ачаалж чадсангүй.' : 'Төлөв хадгалагдсангүй. Дахин оролдоно уу.'}</p>}
    {!loadError && !inquiries.length && <p className="text-slate-400">Одоогоор хүсэлт ирээгүй байна.</p>}
    <div className="space-y-4">{inquiries.map(item => <article key={item.id} className="rounded-xl border border-slate-400/25 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-semibold">{item.block_slug.toUpperCase()} · {item.floor}-р давхар · {item.unit_number ? `${item.unit_number} тоот · ` : ''}{item.layout_code} сууц</h2><span className={`rounded-full px-3 py-1 text-xs ${item.status === 'new' ? 'bg-sky-400/15 text-sky-400' : 'bg-slate-400/10 text-slate-400'}`}>{item.status === 'new' ? 'Шинэ хүсэлт' : 'Холбогдсон'}</span></div>
      <p className="my-4 text-sm leading-7"><a className="font-semibold text-[color:var(--brand-accent)]" href={`tel:+976${item.phone}`}>{item.phone}</a> дугаартай хэрэглэгч энэ байрны талаар ажилтантай холбогдох хүсэлт үлдээлээ.</p>
      <div className="flex flex-wrap items-center justify-between gap-3"><time className="text-xs text-slate-400" dateTime={item.created_at}>{new Intl.DateTimeFormat('mn-MN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Ulaanbaatar' }).format(new Date(item.created_at))}</time>{item.status === 'new' && <form action={markContacted}><input type="hidden" name="id" value={item.id} /><button className="min-h-11 cursor-pointer rounded-lg border border-slate-400/30 px-4 text-xs">Холбогдсон гэж тэмдэглэх</button></form>}</div>
    </article>)}</div>
    {inquiries.length === 100 && <p className="mt-5 text-xs text-slate-400">Сүүлийн 100 хүсэлтийг харуулж байна. Өмнөх хүсэлтүүд Supabase-д хадгалагдана.</p>}
  </main>;
}
