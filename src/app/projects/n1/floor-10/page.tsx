import Link from "next/link";
import ThemeToggle from "../../../theme-toggle";
import BrandLogo from "../../../brand-logo";

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
      <header className="topbar"><BrandLogo /><div className="nav-tools"><ThemeToggle/><button className="menu">☰</button></div></header>
      <main className="portal-page">
        <div className="page-head"><h1>10-р Давхрын Төлөвлөлт</h1><p>Төслийн архитектурын нарийвчилсан зураг болон одоогийн борлуулалтын төлөв.</p></div>
        <section className="apartment-layout">
          <div className="kicker" style={{padding:20}}>🟡 ЗАХИАЛСАН &nbsp; 🟢 БОЛОМЖТОЙ &nbsp; ⚪ ЗАРАГДСАН</div>
          <div className="unit-map"><a className="reserved">1001</a><a className="available">1002</a><a>1003</a><a>1004</a><a>1005</a></div>
        </section>
        <section className="glass unit-list"><h2>▦ Байрнуудын жагсаалт</h2>{units.map(([no,name,status,type])=><div className={`unit-item ${type}`} key={no}><span>{no}</span><span>{name}<small>{status}</small></span><b>{type==="available"?"ⓘ":type==="reserved"?"›":"♙"}</b></div>)}<Link className="btn primary" href="/projects/n1">БҮХ ДАВХРЫГ ХАРАХ</Link></section>
      </main>
      <nav className="bottom-nav"><Link href="/">⌂<span>НҮҮР</span></Link><Link className="active" href="/master-plan">▥<span>ТӨСЛҮҮД</span></Link><a href="#">▱<span>ХАДГАЛСАН</span></a><a href="#">?<span>ХОЛБОО</span></a></nav>
    </>
  );
}
