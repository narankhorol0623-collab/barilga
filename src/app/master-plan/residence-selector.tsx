"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  filterResidenceUnits,
  residenceBlocks,
  type ResidenceFloor,
  type ResidenceUnit,
} from "@/lib/residence";

type Props = {
  blocks: { slug: string; name: string }[];
  floors: ResidenceFloor[];
  units: ResidenceUnit[];
  preview: boolean;
  initialBlock?: string;
  initialFloor?: string;
};
const labels = {
  available: "Боломжтой",
  reserved: "Захиалгатай",
  sold: "Зарагдсан",
};
const statusClasses = {
  available: "bg-sky-400/10 text-sky-300 in-data-[theme=light]:text-sky-700",
  reserved:
    "bg-amber-400/10 text-amber-300 in-data-[theme=light]:text-amber-700",
  sold: "bg-slate-400/10 text-slate-400 in-data-[theme=light]:text-slate-600",
};

export default function ResidenceSelector({
  blocks,
  floors,
  units,
  preview,
  initialBlock,
  initialFloor,
}: Props) {
  const validInitialBlock = residenceBlocks.some((b) => b.slug === initialBlock)
    ? initialBlock!
    : null;
  const [blockSlug, setBlockSlug] = useState<string | null>(validInitialBlock);
  const [floor, setFloor] = useState<number | null>(
    validInitialBlock &&
      floors.some(
        (f) =>
          f.block_slug === validInitialBlock &&
          f.floor === Number(initialFloor),
      )
      ? Number(initialFloor)
      : null,
  );
  const [unitNumber, setUnitNumber] = useState<string | null>(null);
  const [rooms, setRooms] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const mappedBlocks = residenceBlocks.map((block) => ({
    ...block,
    name: blocks.find((b) => b.slug === block.slug)?.name ?? block.name,
  }));
  const block = mappedBlocks.find((b) => b.slug === blockSlug);
  const blockFloors = floors
    .filter((f) => f.block_slug === blockSlug)
    .sort((a, b) => b.floor - a.floor);
  const visibleUnits = filterResidenceUnits(
    units,
    blockSlug ?? "",
    floor,
    rooms,
    availableOnly,
  );
  const selectedUnit = visibleUnits.find((unit) => unit.number === unitNumber);
  const activeMapBlock = mappedBlocks.find(
    (b) => b.slug === (hovered ?? blockSlug),
  );
  const blockAvailability = blockFloors.reduce(
    (sum, f) => sum + f.available,
    0,
  );

  function selectBlock(slug: string) {
    setBlockSlug(slug);
    setFloor(null);
    setUnitNumber(null);
    setRooms(0);
    setAvailableOnly(false);
  }
  function selectFloor(value: number) {
    setFloor(value);
    setUnitNumber(null);
  }

  return (
    <>
      {preview && (
        <div
          role="status"
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs leading-relaxed text-amber-200 in-data-[theme=light]:text-amber-800"
        >
          <span className="font-bold">◉ Танилцах горим</span>
          <span>
            Давхар, талбай, борлуулалтын төлөв нь сонголтыг турших жишээ
            мэдээлэл болно.
          </span>
        </div>
      )}
      <div className="grid items-start gap-5 min-[1100px]:grid-cols-[minmax(0,1fr)_380px] min-[1400px]:grid-cols-[minmax(0,1fr)_420px]">
        <section
          aria-label="Хотхоны интерактив зураг"
          className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111d33] in-data-[theme=light]:border-slate-200 in-data-[theme=light]:bg-white"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="size-1.5 rounded-full bg-sky-400" />
              Хотхоны ерөнхий төлөвлөгөө
            </div>
            <span className="text-[10px] tracking-widest text-slate-400">
              01 / БЛОК СОНГОХ
            </span>
          </div>
          <div className="relative isolate aspect-square overflow-hidden bg-slate-800">
            <Image
              src="/residence-master-plan.jpeg"
              alt="Luxury Residence хотхоны агаарын зураг. Таван орон сууцны блок болон амины орон сууцнууд."
              fill
              sizes="(min-width: 1100px) 65vw, 100vw"
              className="object-contain"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/40 to-transparent" />
            <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/30 bg-slate-950/55 px-3 py-2 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md">
              ЗУРГАН ДЭЭР ДАРЖ СОНГОНО УУ
            </div>
            <svg
              viewBox="0 0 720 720"
              className="absolute inset-0 h-full w-full"
              aria-label="Орон сууцны блокууд"
            >
              {mappedBlocks.map((item) => {
                const active = item.slug === blockSlug;
                const lit = active || hovered === item.slug;
                return (
                  <g
                    key={item.slug}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.name} сонгох`}
                    aria-pressed={active}
                    className="residence-map-block cursor-pointer outline-none"
                    onClick={() => selectBlock(item.slug)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectBlock(item.slug);
                      }
                    }}
                    onMouseEnter={() => setHovered(item.slug)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(item.slug)}
                    onBlur={() => setHovered(null)}
                  >
                    <polygon
                      points={item.points}
                      fill={lit ? "#2796e6" : "#216aab"}
                      fillOpacity={lit ? 0.42 : 0.08}
                      stroke={lit ? "#bce5ff" : "#ffffff"}
                      strokeOpacity={lit ? 1 : 0.65}
                      strokeWidth={lit ? 2.5 : 1}
                      className="transition-colors duration-200"
                    />
                    <g
                      transform={`translate(${item.label[0]}, ${item.label[1]})`}
                    >
                      <rect
                        x="-24"
                        y="-21"
                        width="48"
                        height="42"
                        rx="12"
                        fill={active ? "#216aab" : "#0a1729"}
                        fillOpacity=".95"
                        stroke={lit ? "#bce5ff" : "#ffffff"}
                        strokeOpacity={lit ? 1 : 0.65}
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize="15"
                        fontWeight="700"
                      >
                        {item.slug.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-5 pb-5 pt-14 text-white">
              <p className="text-lg font-semibold">
                {activeMapBlock?.name ?? "Хүссэн байршлаа сонгоорой"}
              </p>
              <p className="mt-1 text-xs text-white/75">
                {activeMapBlock
                  ? "Блокийн давхар болон байрны сонголтыг доорх хэсгээс харна уу."
                  : "Блок дээр дарж давхрын мэдээллийг нээнэ."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <span className="text-xs text-slate-400 in-data-[theme=light]:text-slate-600">
              Блокийн шууд сонголт
            </span>
            <div className="flex gap-2">
              {[...mappedBlocks].reverse().map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => selectBlock(item.slug)}
                  aria-pressed={blockSlug === item.slug}
                  className={`min-h-10 min-w-11 cursor-pointer rounded-lg border px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 ${blockSlug === item.slug ? "border-[#216aab] bg-[#216aab] text-white" : "border-slate-500/25 hover:border-sky-400"}`}
                >
                  {item.slug.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {block && (
            <a
              href="#residence-options"
              className="mx-5 mb-4 flex min-h-11 items-center justify-center rounded-lg bg-[#216aab] px-4 text-sm font-semibold text-white min-[1100px]:hidden"
            >
              {block.name} · Давхар сонгох ↓
            </a>
          )}
        </section>

        <section
          id="residence-options"
          aria-label="Байр сонголт"
          className="scroll-mt-24 min-w-0 rounded-2xl border border-white/10 bg-[#111d33] min-[1100px]:sticky min-[1100px]:top-24 in-data-[theme=light]:border-slate-200 in-data-[theme=light]:bg-white"
        >
          <ol className="grid grid-cols-3 gap-2 border-b border-slate-400/15 px-5 py-5 text-[11px] font-semibold">
            {["Блок", "Давхар", "Байр"].map((step, i) => (
              <li
                key={step}
                className={`flex items-center gap-2 ${i === (floor !== null ? 2 : block ? 1 : 0) ? "text-[color:var(--brand-accent)]" : "text-slate-400"}`}
              >
                <span className="grid size-6 place-items-center rounded-full border border-current text-[10px]">
                  {i < (floor !== null ? 2 : block ? 1 : 0) ? "✓" : `0${i + 1}`}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="p-5 min-[1400px]:p-6">
            {!block ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div
                  className="mb-6 grid size-20 place-items-center rounded-2xl border border-sky-400/20 bg-sky-400/5 text-4xl text-[color:var(--brand-accent)]"
                  aria-hidden="true"
                >
                  ⌖
                </div>
                <h2 className="text-2xl font-semibold">
                  Аль блокт амьдрах вэ?
                </h2>
                <p className="mt-3 max-w-64 text-sm leading-7 text-slate-400 in-data-[theme=light]:text-slate-600">
                  Зурган дээрх блок дээр дараарай. Сонгосон блокийн давхар,
                  байрны мэдээлэл энд харагдана.
                </p>
                <span className="mt-7 text-xs text-[color:var(--brand-accent)]">
                  ← Зургаас эсвэл блокийн дугаараас сонгох
                </span>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] tracking-[.15em] text-slate-400">
                      СОНГОСОН БЛОК
                    </p>
                    <h2 className="mt-1 text-3xl font-semibold">
                      {block.name}
                    </h2>
                    <p className="mt-2 text-xs text-slate-400 in-data-[theme=light]:text-slate-600">
                      {blockFloors.length
                        ? `${blockFloors.length} давхар · ${blockAvailability} боломжтой байр`
                        : "Давхрын мэдээлэл хараахан нэмэгдээгүй"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBlockSlug(null);
                      setFloor(null);
                      setUnitNumber(null);
                    }}
                    className="grid size-9 cursor-pointer place-items-center rounded-full border border-slate-400/25 text-slate-400 hover:text-[color:var(--brand-accent)]"
                    aria-label="Блокийн сонголтыг цэвэрлэх"
                  >
                    ×
                  </button>
                </div>
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Давхраа сонгох</h3>
                    <span className="text-xs text-[color:var(--brand-accent)]">
                      {floor ? `${floor}-р давхар` : "Сонгоогүй"}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {blockFloors.map((item) => (
                      <button
                        type="button"
                        key={item.floor}
                        onClick={() => selectFloor(item.floor)}
                        aria-pressed={floor === item.floor}
                        aria-label={`${item.floor}-р давхар, ${item.available} боломжтой байр`}
                        className={`relative min-h-11 cursor-pointer rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 ${floor === item.floor ? "border-[#216aab] bg-[#216aab] text-white" : "border-slate-400/20 hover:border-sky-400"}`}
                      >
                        {item.floor}
                        <span
                          className={`absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full ${item.available ? "bg-sky-300" : "bg-slate-500"}`}
                        />
                      </button>
                    ))}
                  </div>
                  {!blockFloors.length && (
                    <p
                      role="status"
                      className="rounded-lg bg-slate-400/5 p-4 text-sm leading-6 text-slate-400"
                    >
                      Энэ блокийн мэдээлэл удахгүй нэмэгдэнэ. Өөр блок сонгон
                      үзнэ үү.
                    </p>
                  )}
                </div>
                {floor !== null && (
                  <>
                    <div className="border-t border-slate-400/15 pt-5">
                      <label
                        htmlFor="room-filter"
                        className="mb-2 block text-xs text-slate-400"
                      >
                        Өрөөний тоо
                      </label>
                      <select
                        id="room-filter"
                        value={rooms}
                        onChange={(event) => {
                          setRooms(Number(event.target.value));
                          setUnitNumber(null);
                        }}
                        className="min-h-11 w-full rounded-lg border border-slate-400/25 bg-[#0a1128] px-3 text-sm in-data-[theme=light]:bg-slate-50"
                      >
                        <option value={0}>Бүх өрөө</option>
                        <option value={1}>1 өрөө</option>
                        <option value={2}>2 өрөө</option>
                        <option value={3}>3 өрөө</option>
                        <option value={4}>4 өрөө</option>
                      </select>
                      <label className="my-4 flex cursor-pointer items-center gap-2 text-xs text-slate-400 in-data-[theme=light]:text-slate-600">
                        <input
                          type="checkbox"
                          checked={availableOnly}
                          onChange={(event) => {
                            setAvailableOnly(event.target.checked);
                            setUnitNumber(null);
                          }}
                          className="size-4 accent-[#216aab]"
                        />
                        Зөвхөн боломжтой байрууд
                      </label>
                    </div>
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <h3 className="font-semibold">
                        {floor}-р давхрын байрууд
                      </h3>
                      <span aria-live="polite" className="text-slate-400">
                        {visibleUnits.length} байр
                      </span>
                    </div>
                    <div className="grid max-h-[330px] gap-2 overflow-y-auto pr-1">
                      {visibleUnits.map((unit) => (
                        <button
                          type="button"
                          key={unit.number}
                          onClick={() => setUnitNumber(unit.number)}
                          aria-pressed={selectedUnit?.number === unit.number}
                          className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 ${selectedUnit?.number === unit.number ? "border-sky-400 bg-sky-400/10" : "border-slate-400/15 hover:border-sky-400/60"}`}
                        >
                          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-slate-400/10 text-xs font-semibold">
                            {unit.number}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">
                              {unit.rooms} өрөө{" "}
                              <span className="font-normal text-slate-400">
                                · {Number(unit.area).toLocaleString("en-US")} м²
                              </span>
                            </span>
                            <span
                              className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] ${statusClasses[unit.status]}`}
                            >
                              {labels[unit.status]}
                            </span>
                          </span>
                          <span className="text-slate-400">↗</span>
                        </button>
                      ))}
                      {!visibleUnits.length && (
                        <p
                          role="status"
                          className="rounded-lg border border-dashed border-slate-400/20 p-5 text-sm leading-6 text-slate-400"
                        >
                          {units.some(
                            (u) =>
                              u.block_slug === blockSlug && u.floor === floor,
                          )
                            ? "Энэ шүүлтэд тохирох байр алга. Шүүлтээ өөрчилж үзнэ үү."
                            : "Энэ давхрын байрны мэдээлэл удахгүй нэмэгдэнэ."}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {selectedUnit && (
                  <div
                    className="mt-5 rounded-xl border border-sky-400/30 bg-sky-400/5 p-4"
                    aria-live="polite"
                  >
                    <div className="flex justify-between gap-2">
                      <p className="text-[10px] font-semibold tracking-wider text-[color:var(--brand-accent)]">
                        ТАНЫ СОНГОЛТ
                      </p>
                      <button
                        type="button"
                        aria-label="Байрны сонголтыг цэвэрлэх"
                        onClick={() => setUnitNumber(null)}
                        className="cursor-pointer px-1 text-slate-400"
                      >
                        ×
                      </button>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">
                      {selectedUnit.number} тоот
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-slate-400 in-data-[theme=light]:text-slate-600">
                      {block.name} · {floor}-р давхар
                      <br />
                      {selectedUnit.rooms} өрөө ·{" "}
                      {Number(selectedUnit.area).toLocaleString("en-US")} м² ·{" "}
                      {labels[selectedUnit.status]}
                    </p>
                    {preview ? (
                      <p className="mt-3 text-xs leading-6 text-amber-300 in-data-[theme=light]:text-amber-800">
                        Энэ нь жишээ сонголт. Бодит талбай, төлөвийг
                        борлуулалтын албанаас лавлана уу.
                      </p>
                    ) : (
                      selectedUnit.status !== "available" && (
                        <p className="mt-3 text-xs text-slate-400">
                          Энэ байр одоогоор захиалга авах боломжгүй.
                        </p>
                      )
                    )}
                    <Link
                      href="/#contact"
                      className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-[#216aab] px-4 text-xs font-semibold text-white hover:bg-[#287bbd]"
                    >
                      БОРЛУУЛАЛТТАЙ ХОЛБОГДОХ ↗
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-slate-400/15 px-5 py-4 text-[10px] text-slate-400">
            <span
              className={`size-1.5 rounded-full ${preview ? "bg-amber-400" : "bg-sky-400"}`}
            />
            {preview
              ? "Жишээ мэдээлэл · Захиалга үүсгэхгүй"
              : "Нийтлэгдсэн борлуулалтын мэдээлэл"}
          </div>
        </section>
      </div>
      <p className="mt-4 text-xs leading-6 text-slate-400">
        Блокийн тэмдэглэгээ нь байршлыг сонгоход зориулсан. Нарийвчилсан
        төлөвлөлт, мэдээллийг борлуулалтын албанаас лавлана уу.
      </p>
    </>
  );
}
