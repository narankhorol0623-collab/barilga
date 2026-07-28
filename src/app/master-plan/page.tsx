import Link from "next/link";
import ThemeToggle from "../theme-toggle";
import BrandLogo from "../brand-logo";

const blocks = ["N1 Блок", "N2 Блок", "N3 Блок", "N4 Блок", "N7 Блок", "Бусад төлөвлөлт"];

export default function MasterPlan() {
  return (
    <>
      <header className="topbar"><BrandLogo /><div className="nav-tools"><ThemeToggle/><button className="menu">☰</button></div></header>
      <main className="portal-page">
        <div className="page-head">
          <span className="kicker">GUND SUPPLY RESIDENCE</span>
          <h1>Төслийн мастер төлөвлөгөө</h1>
          <p>Хотхоны ерөнхий төлөвлөлтөөс сонирхож буй блокоо сонгоно уу.</p>
        </div>
        <Link href="/projects/n1" className="plan-image" aria-label="N1 блок сонгох" style={{backgroundImage:"url(https://lh3.googleusercontent.com/aida-public/AB6AXuBq-aIxWHJCM5vHIafc0saDbqfD9ZeUNAH903cunpt7Vlbrw1t4S6irsQQzrETco7Uc_o2XANW4hw3TV0CRp0T14W7LXPWzUo_ASvdD5gyNt19towCT8ovY7VLOxvxCSqLWRPnNkDn7zWE-NPiNO0Z9Fgjdb-C826vTYFOpv8O-E1YzCobVA0F2lBlv9hDagiJGLzeIwq6LG_Nl399rNLPefZKGjysnEHiSG9WUgKWQG_D84lIFZtHU)"}} />
        <div className="info-grid">
          <article className="glass info-card"><h2>Төслийн масштаб</h2><p>Гүүд Саплай Резиденс нь нийт 4.2 га талбайг хамарсан, орчин үеийн архитектурын шийдэл бүхий цогцолбор юм. Хүн төвтэй төлөвлөлтийн дагуу нийт талбайн 60%-ийг ногоон байгууламж эзэлнэ.</p><div className="kicker">5.2К М.КВ НОГООН БҮС &nbsp;&nbsp; 12 ОРОН СУУЦНЫ БЛОК</div></article>
          <article className="glass info-card"><h2>Барилгын мэдээлэл</h2><div className="blocks">{blocks.map((b,i)=><Link href={i===0?"/projects/n1":"#"} className={`block ${i===0?"active":""}`} key={b}>{b}</Link>)}</div></article>
        </div>
      </main>
      <nav className="bottom-nav"><Link href="/">⌂<span>НҮҮР</span></Link><Link className="active" href="/master-plan">▥<span>ТӨЛӨВЛӨГӨӨ</span></Link><a href="#">▱<span>ХАДГАЛСАН</span></a><a href="#">?<span>ХОЛБОО</span></a></nav>
    </>
  );
}
