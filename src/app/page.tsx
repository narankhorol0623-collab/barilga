import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import BrandLogo from "./brand-logo";

const projects = [
  {
    name: "Мандала Тауэр",
    meta: "ХУД, 15-р хороо · 25 давхар",
    status: "Бэлэн",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhRO932mXDS3WpQb6MSRMGo6DB4u3ILRdd6UTZuJGDFV24hTgX2zsCOroYg556nYGMWXH7wfaV_x1mq7oFSwCvJfimzH3Od6uOlEmG-37xTWkSkU7RnxaeZN8ShU6d_-y_lfU0_3HlIKhxiw4xsyapD9Dd0iuF3a7V1CgqmarnRRJSqomnZFvpNwhN-3p8-nOA3ebj5sZjgszdwp86YGLxhyMtmxaJxo4HYFpEFIT2ubL07YjQLevN",
  },
  {
    name: "Нео Сити",
    meta: "СХД, 20-р хороо · 18 давхар",
    status: "Борлуулалт",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdpwODxQM6i0uS9HH1pqXhqOsZ4XXlD2XI-tH4fnV759vmGL-Aa4fshVCcNP4Q_W8d6zdlEKwgRZYpffCHWEl-ycmYfat9zMtCgLH4MUfF_VWNjHb5Bp-PDA2bJKMiBW72BgtIPggDyDTgF43z7eJETVaIe9GChshg5dEtdKvZMvqrlnR9YTLJHD8yoHoGbMDeFmOs0NcsmjK8uK5n4k6-S-CIsBHi12h_DyM5lyGSly8EK3LQXxmV",
  },
];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <BrandLogo />
        <nav className="desktop-nav">
          <Link className="active" href="/">Нүүр</Link>
          <a href="#projects">Төслүүд</a>
          <a href="#about">Бидний тухай</a>
          <a href="#contact">Холбоо барих</a>
        </nav>
        <div className="nav-tools"><ThemeToggle /><button className="menu" aria-label="Цэс">☰</button></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-content">
            <div className="eyebrow"><i /> ШИНЭ ТӨСӨЛ НЭЭЛТТЭЙ</div>
            <h1>ГҮНД САПЛАЙ —<br /><span>Ирээдүйн бүтээн байгуулалт</span></h1>
            <p>Бид танд чанар, тав тух, аюулгүй байдлыг амлаж байна. Монголын архитектурын шинэ өнгө төрхийг тодорхойлогч таны итгэлт түнш.</p>
            <div className="actions">
              <a className="btn primary" href="#projects">ТӨСЛҮҮДТЭЙ ТАНИЛЦАХ</a>
              <a className="btn secondary-btn" href="#about">БИДНИЙ ТУХАЙ</a>
            </div>
          </div>
          <img className="hero-corner-logo" src="/good-supply-logo.png" alt="" />
          <a className="scroll" href="#about">SCROLL <b>⌄</b></a>
        </section>

        <section id="about" className="section vision">
          <div>
            <h2>Алсын хараа ба Үнэт зүйл</h2>
            <article className="glass feature green">
              <h3>Эрхэм зорилго</h3>
              <p>Бид дэлхийн жишигт нийцсэн архитектурын шийдлийг Монгол хөрсөнд буулгаж, амьдралын чанарыг дээшлүүлэх тогтвортой бүтээн байгуулалтыг цогцлооно.</p>
            </article>
            <article className="glass feature">
              <h3>Чанарын баталгаа</h3>
              <p>Барилгын материал бүр, шийдэл болгон дээр бид аюулгүй байдал, урт хугацааны үнэ цэнийг нэгдүгээрт тавьдаг.</p>
            </article>
          </div>
          <div className="vision-image">
            <img alt="Орчин үеийн архитектур" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQmih6qQW9cqOrbKLMoHBVzRnGLOlvD9gsA81feU_ktDfG5Q0-OrfhJKQXyQn3qfg8-fB2RpaN6dUQzPL7WasdcqGznskdQDwpjcmbWUOWwTyhU3Lg_XoE6egI5be-wOLK4UpykB0WjxjC4bpSCQey4kGpYJhSCMbyylOnPh_dmmaJaJtp5Dea23_x5Vry9JY94mhTSvtLimAU3BerlolQ_sl_Gsz5FW4-of8H47AjcwiZi5Fxz5fV" />
            <blockquote className="glass">&ldquo;Архитектур бол хөлдсөн хөгжим юм.&rdquo;</blockquote>
          </div>
        </section>

        <section id="projects" className="section projects">
          <span className="kicker">ОНЦЛОХ ТӨСЛҮҮД</span>
          <h2>Шилдэг Бүтээн Байгуулалтууд</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-photo" style={{ backgroundImage: `url(${project.image})` }} />
                <span className="status">{project.status}</span>
                <div className="project-copy">
                  <h3>{project.name}</h3>
                  <p>⌖ {project.meta}</p>
                  <Link className="btn secondary-btn" href="/master-plan">ДЭЛГЭРЭНГҮЙ ҮЗЭХ</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section master-cta">
          <div className="glass">
            <div className="map-icon">♧</div>
            <h2>Төслийн нэгдсэн төлөвлөгөө</h2>
            <p>Манай бүх төслүүдийн байршил, дэд бүтэц болон ирээдүйн өргөтгөлийн төлөвлөгөөг интерактив газрын зургаас харна уу.</p>
            <Link className="btn primary" href="/master-plan">МАСТЕР ТӨЛӨВЛӨГӨӨ ҮЗЭХ</Link>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div><BrandLogo /><p>Өндөр зэрэглэлийн үл хөдлөх хөрөнгийн зах зээлд тэргүүлэгч.</p></div>
        <div className="footer-links"><a href="#about">Бидний тухай</a><a href="#projects">Төслүүд</a><a href="#contact">Холбоо барих</a><a href="#">Нууцлалын бодлого</a></div>
        <small>© 2024 Гүнд Саплай ХХК.<br />Бүх эрх хуулиар хамгаалагдсан.</small>
      </footer>
      <nav className="bottom-nav"><Link className="active" href="/">⌂<span>НҮҮР</span></Link><Link href="/master-plan">▥<span>ТӨСЛҮҮД</span></Link><a href="#">▱<span>ХАДГАЛСАН</span></a><a href="#contact">?<span>ХОЛБОО</span></a></nav>
    </>
  );
}
