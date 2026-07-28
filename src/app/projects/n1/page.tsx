import Link from "next/link";
import ThemeToggle from "../../theme-toggle";
import BrandLogo from "../../brand-logo";

const availability = [1,2,2,4,0,4,4,1,3,4,0,3,2,4,4];

export default function BlockPage() {
  return (
    <>
      <header className="topbar"><BrandLogo /><div className="nav-tools"><ThemeToggle/><button className="menu">☰</button></div></header>
      <main className="portal-page">
        <div className="page-head"><span className="kicker">LUXURY RESIDENTIAL</span><h1>N1 Блок</h1><p>Давхар болон боломжит байрны сонголтоо хийнэ үү.</p></div>
        <section className="floor-list">
          {availability.map((count,index)=>{
            const floor=index+1;
            return <div className={`floor-row ${floor===10?"selected":""}`} key={floor}>
              <strong>{floor}-Р ДАВХАР</strong>
              <div className="units">{[0,1,2,3].map(i=><i className={i<count?"open":""} key={i}/>)}</div>
              {floor===10?<Link href="/projects/n1/floor-10">СОНГОСОН</Link>:<Link href={count?"/projects/n1/floor-10":"#"}>{count?"ҮЗЭХ":"ДҮҮРСЭН"}</Link>}
            </div>;
          })}
        </section>
        <div className="selection-card glass"><div><span>Сонгогдсон давхар</span><h2>Хамгийн өргөн цонхны харагдацтай</h2></div><strong>10</strong><div><span className="kicker">ҮНЭ ЭХЛЭХ</span><h2>₮5.2M / М.КВ</h2></div></div>
        <div className="info-grid"><article className="glass info-card"><span className="kicker">LUXURY RESIDENTIAL</span><h2>N1 Блок</h2><p>Нийт апартамент: 120<br/>Авто зогсоол: 80<br/>Ашиглалтад орох: 2025</p><Link className="btn primary" href="/projects/n1/floor-10">БРОШУР ТАТАХ</Link></article><article className="glass info-card"><h2>Төлөв</h2><p>🟢 Боломжтой (Сонгох)</p><p>⚫ Зарагдсан</p><p>🟡 Захиалгатай</p></article></div>
      </main>
      <nav className="bottom-nav"><Link href="/">⌂<span>НҮҮР</span></Link><Link className="active" href="/master-plan">▥<span>ТӨСЛҮҮД</span></Link><a href="#">▱<span>ХАДГАЛСАН</span></a><a href="#">?<span>ХОЛБОО</span></a></nav>
    </>
  );
}
