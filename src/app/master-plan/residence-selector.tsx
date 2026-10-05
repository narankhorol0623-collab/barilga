'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { residenceMap, type ResidenceBlock, type ResidenceFloor, type ResidenceLayout, type ResidenceUnit } from '@/lib/residence';
import { residenceDesigns } from '@/lib/residence-layouts';
import InquiryForm from './inquiry-form';
import ResidenceModel, { residenceModels } from './residence-model';

type Props = {
  blocks: ResidenceBlock[];
  floors: ResidenceFloor[];
  units: ResidenceUnit[];
  layouts: ResidenceLayout[];
  initialBlock?: string;
  initialFloor?: string;
  inventoryUnavailable?: boolean;
};
const statusLabels = { available: 'Боломжтой', reserved: 'Захиалгатай', sold: 'Зарагдсан' };

export default function ResidenceSelector({ blocks, floors, units, layouts, initialBlock, initialFloor, inventoryUnavailable = false }: Props) {
  const tower = blocks.find(b => b.slug === 'n7');
  const [blockSlug, setBlockSlug] = useState<string | null>(tower && initialBlock === tower.slug ? tower.slug : null);
  const [floor, setFloor] = useState<number | null>(tower && initialBlock === tower.slug && floors.some(f => f.block_slug === tower.slug && f.usage === 'residential' && f.floor === Number(initialFloor)) ? Number(initialFloor) : null);
  const [selection, setSelection] = useState<{ layout: ResidenceLayout; unit?: ResidenceUnit } | null>(null);
  const [imageError, setImageError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const block = tower?.slug === blockSlug ? tower : null;
  const blockFloors = floors.filter(f => f.block_slug === blockSlug);
  const blockLayouts = layouts.filter(l => l.block_slug === blockSlug);
  const floorUnits = units.filter(u => u.block_slug === blockSlug && u.floor === floor);

  function selectBlock() {
    if (!tower) return;
    setBlockSlug(tower.slug);
    setFloor(null);
    setSelection(null);
  }
  function openPlan(layout: ResidenceLayout, unit?: ResidenceUnit) {
    setSelection({ layout, unit });
    setImageError(false);
    dialog.current?.showModal();
  }

  return (
    <>
      <div className="grid items-start gap-5 min-[1100px]:grid-cols-[minmax(0,1fr)_380px] min-[1400px]:grid-cols-[minmax(0,1fr)_420px]">
        <section aria-label="Хотхоны зураг" className="overflow-hidden rounded-2xl border border-slate-400/20 bg-[#111d33] in-data-[theme=light]:bg-white">
          <h2 className="px-5 py-4 text-sm font-semibold">Хотхоны ерөнхий төлөвлөгөө</h2>
          <div className="relative aspect-square bg-slate-800">
            <Image src="/residence-master-plan.jpeg" alt="Luxury Residence хотхон. Арын 15 давхар N7 блокийг сонгоно уу." fill priority sizes="(min-width: 1100px) 65vw, 100vw" className="object-contain" />
            {tower && (
              <svg viewBox="0 0 720 720" className="absolute inset-0 h-full w-full" aria-label="15 давхар барилга сонгох">
                <g role="button" tabIndex={0} aria-label={`${tower.name} сонгох`} aria-pressed={!!block} onClick={selectBlock} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectBlock(); } }} className="residence-map-block cursor-pointer outline-none">
                  <polygon points={residenceMap.n7.points} fill="#2796e6" fillOpacity={block ? .42 : .12} stroke="#bce5ff" strokeWidth="2" />
                  <g transform={`translate(${residenceMap.n7.label[0]}, ${residenceMap.n7.label[1]})`}>
                    <rect x="-24" y="-21" width="48" height="42" rx="12" fill="#216aab" stroke="white" />
                    <text textAnchor="middle" dominantBaseline="central" fill="white" fontSize="15" fontWeight="700">N7</text>
                  </g>
                </g>
              </svg>
            )}
          </div>
          {tower && <div className="p-4"><button type="button" onClick={selectBlock} aria-pressed={!!block} className="min-h-11 cursor-pointer rounded-lg bg-[#216aab] px-5 text-sm font-semibold text-white">{tower.name} · {tower.total_floors} давхар</button></div>}
        </section>

        <section className="rounded-2xl border border-slate-400/20 bg-[#111d33] in-data-[theme=light]:bg-white" aria-label="Байр сонголт">
          <ol className="grid grid-cols-3 gap-2 border-b border-slate-400/15 p-5 text-xs font-semibold">
            {['Блок', 'Давхар', 'Байр'].map((step, i) => <li key={step} className={i === (floor !== null ? 2 : block ? 1 : 0) ? 'text-[color:var(--brand-accent)]' : 'text-slate-400'}>{i + 1}. {step}</li>)}
          </ol>
          <div className="p-5">
            {!block ? <p className="py-16 text-center text-sm text-slate-400">Зургаас 15 давхар барилгаа сонгоно уу.</p> : <>
              <h2 className="text-3xl font-semibold">{block.name}</h2>
              <p className="mt-2 text-xs text-slate-400">{block.total_floors} давхар · {block.garage_floors} гарааш · {block.total_floors - block.garage_floors} орон сууцны давхар</p>
              <div className="mb-3 mt-6 flex justify-between text-sm"><h3 className="font-semibold">Давхраа сонгох</h3><span className="text-[color:var(--brand-accent)]">{floor !== null ? `${floor}-р давхар` : ''}</span></div>
              <div className="grid grid-cols-5 gap-2">
                {blockFloors.map(item => <button key={item.floor} type="button" disabled={item.usage === 'garage'} aria-pressed={floor === item.floor} aria-label={`${item.floor}-р давхар${item.usage === 'garage' ? ', гарааш' : ''}`} onClick={() => { setFloor(item.floor); setSelection(null); }} className={`min-h-12 rounded-lg border text-sm disabled:cursor-default disabled:bg-slate-400/5 disabled:text-slate-500 ${floor === item.floor ? 'border-sky-400 bg-[#216aab] text-white' : 'cursor-pointer border-slate-400/20 hover:border-sky-400 disabled:hover:border-slate-400/20'}`}>{item.floor}{item.usage === 'garage' && <span className="block text-[9px]">Гарааш</span>}</button>)}
              </div>
              {floor !== null && <div className="mt-6 space-y-3 border-t border-slate-400/15 pt-5">
                <h3 className="text-sm font-semibold">Байраа сонгох</h3>
                {!floorUnits.length && blockLayouts.length > 0 && <p className="text-xs leading-5 text-slate-400">Сууцны төрлөө сонгож план болон дэлгэрэнгүй мэдээллийг үзнэ үү. Сул байрны тоот, борлуулалтын төлөв хараахан баталгаажаагүй.</p>}
                {!floorUnits.length && !blockLayouts.length && <p role="status" className="text-sm leading-6 text-slate-400">{inventoryUnavailable ? 'Байрны мэдээллийг одоогоор ачаалж чадсангүй. Түр хүлээгээд хуудсаа дахин ачаална уу.' : 'Энэ давхрын байрны мэдээлэл хараахан нэмэгдээгүй байна.'}</p>}
                {floorUnits.length ? floorUnits.map(unit => {
                  const layout = blockLayouts.find(l => l.code === unit.layout_code);
                  return <button key={unit.number} type="button" disabled={!layout} onClick={() => layout && openPlan(layout, unit)} className="flex min-h-20 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-sky-400/20 bg-sky-400/5 p-4 text-left hover:border-sky-400 disabled:cursor-default disabled:opacity-50"><span><span className="block text-sm font-semibold">{unit.number} тоот · {unit.area} м²</span><span className="mt-1 block text-xs text-slate-400">{unit.rooms} өрөө · {statusLabels[unit.status]}</span></span><span className="text-xs text-[color:var(--brand-accent)]">План ↗</span></button>;
                }) : blockLayouts.map(layout => <button key={layout.code} type="button" onClick={() => openPlan(layout)} className="flex min-h-20 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-sky-400/20 bg-sky-400/5 p-4 text-left hover:border-sky-400"><span className="flex items-center gap-3">{layout.plan_image && <Image src={layout.plan_image} alt={`${layout.code} план`} width={96} height={72} unoptimized className="h-18 w-24 rounded-md bg-white object-contain" />}<span><span className="block text-sm font-semibold">{layout.code} сууц · {layout.area} м²</span><span className="mt-1 block text-xs text-slate-400">{layout.rooms} өрөө</span></span></span><span className="text-xs text-[color:var(--brand-accent)]">Дэлгэрэнгүй ↗</span></button>)}
              </div>}
            </>}
          </div>
        </section>
      </div>
      <dialog ref={dialog} aria-labelledby="plan-title" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} onClose={() => setSelection(null)} className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-2xl border border-slate-300 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/80">
        {selection && block && floor !== null && <>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
            <div><h2 id="plan-title" className="text-sm font-semibold">{selection.unit ? `${selection.unit.number} тоот` : `${selection.layout.code} сууц`} · {selection.layout.area} м² · {selection.layout.rooms} өрөө</h2><p className="mt-1 text-xs text-slate-500">{block.name} · {floor}-р давхар</p></div>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="План зураг хаах" className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-slate-100 text-2xl">×</button>
          </div>
          <div className="grid gap-6 p-5 min-[900px]:grid-cols-[minmax(0,1fr)_280px]">
            <div>{selection.layout.plan_image && !imageError ? <Image key={selection.layout.code} src={selection.layout.plan_image} alt={`${selection.layout.code} сууцны план зураг`} width={1600} height={1195} unoptimized onError={() => setImageError(true)} className="h-auto w-full" /> : <p className="rounded-lg bg-slate-50 p-8 text-sm text-slate-500">План зураг хараахан нэмэгдээгүй.</p>}</div>
            <aside className="space-y-6"><section><h3 className="mb-3 font-semibold">Өрөөнүүдийн талбай</h3><dl className="divide-y divide-slate-100">{selection.layout.spaces.map(([name, area], index) => <div key={index} className="flex justify-between gap-3 py-2 text-sm"><dt>{index + 1}. {name}</dt><dd className="shrink-0 font-medium">{area} м²</dd></div>)}</dl></section>
            {inventoryUnavailable ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Байрны борлуулалтын мэдээлэл болон хүсэлт илгээх үйлчилгээ түр боломжгүй байна.</p> : selection.unit && selection.unit.status !== 'available' ? <p className="text-sm text-slate-500">{statusLabels[selection.unit.status]}</p> : <InquiryForm key={`${block.slug}-${floor}-${selection.layout.code}-${selection.unit?.number ?? ''}`} block={block.slug} floor={floor} layout={selection.layout.code} unit={selection.unit?.number} />}
            </aside>
          </div>
          <section className="mx-5 mb-5 rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-semibold">3D дизайн · Интерьер</h3>{residenceModels[selection.layout.code] ? <ResidenceModel key={selection.layout.code} src={residenceModels[selection.layout.code]} /> : residenceDesigns[selection.layout.code]?.length ? <div className="mt-4 grid gap-4 min-[700px]:grid-cols-2">{residenceDesigns[selection.layout.code].map(design => <figure key={design.src}><Image src={design.src} alt={design.caption} width={1200} height={800} unoptimized className="h-auto w-full rounded-lg" /><figcaption className="mt-2 text-sm text-slate-600">{design.caption}</figcaption></figure>)}</div> : <p className="mt-2 text-sm text-slate-500">Энэ сууцны 3D дизайн, интерьерийн зургууд удахгүй нэмэгдэнэ.</p>}</section>
        </>}
      </dialog>
    </>
  );
}
