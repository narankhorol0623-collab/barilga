import type { Metadata } from "next";
import Link from "next/link";
import { getResidenceInventory } from "@/lib/catalog";
import { createPreviewInventory } from "@/lib/residence";
import BrandLogo from "../brand-logo";
import ThemeToggle from "../theme-toggle";
import { headerClass, navToolsClass } from "../ui";
import ResidenceSelector from "./residence-selector";

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
  const preview = inventory.error;
  const data = preview ? createPreviewInventory() : inventory;
  return (
    <>
      <header className={headerClass}>
        <BrandLogo />
        <nav className="hidden items-center gap-8 text-sm min-[761px]:flex">
          <Link href="/">Нүүр</Link>
          <Link
            href="/master-plan"
            className="text-[color:var(--brand-accent)]"
            aria-current="page"
          >
            Байр сонгох
          </Link>
          <Link href="/#contact">Холбоо барих</Link>
        </nav>
        <div className={navToolsClass}>
          <ThemeToggle />
          <Link href="/" className="ml-2 text-sm min-[761px]:hidden">
            Нүүр ↗
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-24 min-[761px]:px-10 min-[761px]:pt-28">
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
        <ResidenceSelector
          blocks={inventory.blocks}
          floors={data.floors}
          units={data.units}
          preview={preview}
          initialBlock={params.block}
          initialFloor={params.floor}
        />
      </main>
    </>
  );
}
