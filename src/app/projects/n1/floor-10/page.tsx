import Link from "next/link";
import ThemeToggle from "../../../theme-toggle";
import BrandLogo from "../../../brand-logo";
import { bottomNavClass, glassClass, headerClass, kickerClass, menuClass, navToolsClass, pageHeadClass, portalClass, primaryButtonClass } from "../../../ui";

const units = [
  ["1001","3 Өрөө | 98.2 мкв","ЗАХИАЛСАН","reserved"],
  ["1002","3 Өрөө | 120.93 мкв","БОЛОМЖТОЙ","available"],
  ["1003","2 Өрөө | 76.5 мкв","ЗАРАГДСАН",""],
  ["1004","4 Өрөө | 145.2 мкв","ҮЛДЭЭГҮЙ",""],
  ["1005","3 Өрөө | 110.8 мкв","ҮЛДЭЭГҮЙ",""],
];

export default function FloorPage() {
  return (
    <>
      <header className={headerClass}><BrandLogo /><div className={navToolsClass}><ThemeToggle/><button className={menuClass}>☰</button></div></header>
      <main className={portalClass}>
        <div className={pageHeadClass}><h1>10-р Давхрын Төлөвлөлт</h1><p>Төслийн архитектурын нарийвчилсан зураг болон одоогийн борлуулалтын төлөв.</p></div>
        <section className="relative mx-auto my-[30px] h-[520px] max-w-[920px] rounded-[10px] border border-[#263452] max-[760px]:h-[390px]">
          <div className={`${kickerClass} p-5`}>🟡 ЗАХИАЛСАН &nbsp; 🟢 БОЛОМЖТОЙ &nbsp; ⚪ ЗАРАГДСАН</div>
          <div className="absolute inset-x-[15%] inset-y-[25%] grid grid-cols-3 grid-rows-2 max-[760px]:inset-x-[10%] max-[760px]:inset-y-[30%] [&_a]:grid [&_a]:place-items-center [&_a]:border [&_a]:border-[#607088]"><a className="!border-[#edc157] text-[#edc157]">1001</a><a className="!border-[#60dda2] bg-[#60dda2]/20 text-[#60dda2]">1002</a><a>1003</a><a>1004</a><a>1005</a></div>
        </section>
        <section className={`${glassClass} mx-auto max-w-[920px] rounded-[10px] p-6 max-[760px]:p-3.5`}><h2>▦ Байрнуудын жагсаалт</h2>{units.map(([no,name,status,type])=><div className={`my-2.5 grid grid-cols-[64px_1fr_auto] items-center border border-transparent bg-[#14203c] p-3.5 max-[760px]:grid-cols-[52px_1fr_auto] max-[760px]:p-2.5 max-[760px]:text-xs in-data-[theme=light]:bg-[#edf2f8] ${type==="available"?"!border-[#60dda2] text-[#60dda2]":""}`} key={no}><span className={`grid h-11 w-[52px] place-items-center ${type==="available"?"bg-[#1c6453]":"bg-[#243247]"}`}>{no}</span><span>{name}<small className="mt-[5px] block font-extrabold">{status}</small></span><b>{type==="available"?"ⓘ":type==="reserved"?"›":"♙"}</b></div>)}<Link className={primaryButtonClass} href="/projects/n1">БҮХ ДАВХРЫГ ХАРАХ</Link></section>
      </main>
      <nav className={bottomNavClass}><Link href="/">⌂<span>НҮҮР</span></Link><Link className="!text-[#60dda2]" href="/master-plan">▥<span>ТӨСЛҮҮД</span></Link><a href="#">▱<span>ХАДГАЛСАН</span></a><a href="#">?<span>ХОЛБОО</span></a></nav>
    </>
  );
}
