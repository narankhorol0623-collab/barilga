import type { Metadata } from "next";
import Link from "next/link";
import { getResidenceInventory } from "@/lib/catalog";
import {
  residenceTower,
  residenceTowerFloors,
  type ResidenceLayout,
} from "@/lib/residence";
import DataNotice from "../data-notice";
import BrandLogo from "../brand-logo";
import { headerClass, navToolsClass } from "../ui";
import { residenceLayouts } from "@/lib/residence-layouts";
import ResidenceSelector from "./residence-selector";
import ScrollReveal from "../ScrollReveal";

export const metadata: Metadata = {
  title: "Luxury Residence — Байр сонгох | Гүнд Саплай",
};

export default async function MasterPlan({
  searchParams,
}: {
  searchParams: Promise<{ block?: string; floor?: string }>;
}) {
  const [inventory, params] = await Promise.all([
    getResidenceInventory(),
    searchParams,
  ]);
  const layouts: ResidenceLayout[] = inventory.error
    ? residenceLayouts
    : inventory.layouts.map((layout) => {
        const supplied = residenceLayouts.find(
          (item) => item.code === layout.code,
        );
        return {
          ...layout,
          plan_image: layout.plan_image || supplied?.plan_image || null,
        };
      });

  return (
    <div data-theme="light">
      <ScrollReveal />
      <header
        className={`${headerClass} !fixed !inset-x-0 !top-0 !z-50 !justify-center !border-b !border-black/5 !bg-white/75 !shadow-[0_8px_32px_rgba(10,17,40,.08)] !backdrop-blur-xl !backdrop-saturate-150`}
      >
        <nav className="flex gap-11 text-[15px] font-extrabold tracking-[.08em] max-[760px]:hidden [&_a]:border-b-2 [&_a]:border-transparent [&_a]:py-2.5 [&_a]:text-[#0a1128] [&_a]:transition-colors [&_a]:hover:border-[var(--brand-accent)] [&_a]:hover:text-[#216aab]">
          <Link className="!border-[#216aab] !text-[#216aab]" href="/">
            Нүүр
          </Link>
          <a href="#projects">Төслүүд</a>
          <a href="#about">Бидний тухай</a>
          <Link href="#contact">Холбоо барих</Link>
        </nav>
      </header>
      <main data-scroll-reveal className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-24 min-[761px]:px-10 min-[761px]:pt-28">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[.24em] text-[color:var(--brand-accent)]">
              GUND SUPPLY · LUXURY RESIDENCE
            </p>
            <h1 className="text-3xl font-semibold tracking-tight min-[761px]:text-4xl">
              Luxury Residence
              <span className="text-[color:var(--brand-accent)]">
                {" "}
                — Таны шинэ гэр.
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-400 in-data-[theme=light]:text-slate-600">
              Хотхоны зургаас блокоо сонгоод, өөрт тохирох байраа олоорой.
            </p>
          </div>
          <Link
            href="/#about"
            className="text-sm text-slate-400 hover:text-[color:var(--brand-accent)]"
          >
            Хотхоны тухай ↗
          </Link>
        </div>
        <DataNotice error={inventory.error} empty={!inventory.blocks.length} />
        <ResidenceSelector
          blocks={inventory.error ? [residenceTower] : inventory.blocks}
          floors={inventory.error ? residenceTowerFloors : inventory.floors}
          inventoryUnavailable={inventory.error}
          units={inventory.units}
          layouts={layouts}
          initialBlock={params.block}
          initialFloor={params.floor}
        />
      </main>
    </div>
  );
}
