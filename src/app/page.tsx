import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import BrandLogo from "./brand-logo";
import { glassClass, headerClass, kickerClass, menuClass, navToolsClass, primaryButtonClass, secondaryButtonClass, bottomNavClass } from "./ui";

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
      <header className={headerClass}>
        <BrandLogo />
        <nav className="flex gap-11 text-xs font-bold tracking-[.08em] max-[760px]:hidden [&_a]:border-b-2 [&_a]:border-transparent [&_a]:py-2.5 [&_a]:text-[#c4ccdc] [&_a]:hover:border-[#60dda2] [&_a]:hover:text-[#60dda2] in-data-[theme=light]:[&_a]:text-[#526078]">
          <Link className="!border-[#60dda2] !text-[#60dda2]" href="/">Нүүр</Link>
          <a href="#projects">Төслүүд</a><a href="#about">Бидний тухай</a><a href="#contact">Холбоо барих</a>
        </nav>
        <div className={navToolsClass}><ThemeToggle /><button className={menuClass} aria-label="Цэс">☰</button></div>
      </header>

      <main>
        <section className="relative isolate flex h-svh min-h-[680px] items-center overflow-hidden bg-[radial-gradient(circle_at_76%_34%,rgba(20,93,148,.22),transparent_31%),radial-gradient(circle_at_25%_72%,rgba(32,68,135,.1),transparent_28%),linear-gradient(125deg,#0a1128_0%,#0a1128_58%,#0d1732_100%)] px-[clamp(20px,7vw,120px)] pb-[60px] pt-[100px] max-[760px]:min-h-[760px] max-[760px]:px-4 max-[760px]:pb-20 in-data-[theme=light]:bg-[radial-gradient(circle_at_76%_34%,rgba(20,93,148,.13),transparent_31%),radial-gradient(circle_at_25%_72%,rgba(96,221,162,.1),transparent_28%),linear-gradient(125deg,#f7f9fc_0%,#eef3f9_58%,#e6edf6_100%)] after:absolute after:right-[-20%] after:top-[10%] after:h-[60vw] after:w-[60vw] after:rotate-[35deg] after:border after:border-[#a0b2da]/8 after:content-['']">
          <div className="absolute right-[10%] top-[20%] size-[380px] rounded-full bg-[#075678] opacity-15 blur-[180px]" />
          <div className="relative z-[2] max-w-[850px] py-3">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#60dda2]/20 bg-[#101d3b]/70 px-4 py-2.5 text-xs font-extrabold tracking-[.18em] text-[#60dda2] shadow-[0_12px_38px_rgba(0,0,0,.16)] backdrop-blur-lg in-data-[theme=light]:bg-white/70 in-data-[theme=light]:text-[#087a55]"><i className="size-2 rounded-full bg-[#60dda2]" /> ШИНЭ ТӨСӨЛ НЭЭЛТТЭЙ</div>
            <h1 className="mb-6 text-[clamp(40px,5vw,72px)] leading-[1.08] tracking-[-.045em] text-white max-[760px]:text-4xl in-data-[theme=light]:text-[#0a1128]">ГҮНД САПЛАЙ —<br /><span>Ирээдүйн бүтээн байгуулалт</span></h1>
            <p className="mb-[38px] max-w-[660px] text-lg leading-[1.7] text-[#c5cddd] max-[760px]:text-[15px] in-data-[theme=light]:text-[#526078]">Бид танд чанар, тав тух, аюулгүй байдлыг амлаж байна. Монголын архитектурын шинэ өнгө төрхийг тодорхойлогч таны итгэлт түнш.</p>
            <div className="flex items-stretch gap-4 max-[760px]:flex-col">
              <a className={primaryButtonClass} href="#projects">ТӨСЛҮҮДТЭЙ ТАНИЛЦАХ</a>
              <a className={`${secondaryButtonClass} border-white/50 bg-white/[.025] text-white backdrop-blur-lg in-data-[theme=light]:border-[#0a1128]/25 in-data-[theme=light]:bg-white/60 in-data-[theme=light]:text-[#0a1128]`} href="#about">БИДНИЙ ТУХАЙ</a>
            </div>
          </div>
          <img className="absolute bottom-6 left-[clamp(20px,7vw,120px)] size-8 object-contain opacity-90 max-[760px]:bottom-[30px] max-[760px]:size-[26px]" src="/good-supply-logo.png" alt="" />
          <a className="absolute bottom-6 left-1/2 z-[2] -translate-x-1/2 text-center text-[9px] tracking-[.25em] text-[#778294]" href="#about">SCROLL <b className="block text-[26px] text-[#60dda2]">⌄</b></a>
        </section>

        <section id="about" className="grid grid-cols-2 items-center gap-20 px-[clamp(20px,7vw,120px)] py-[100px] max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:px-4 max-[760px]:py-[72px] [&_h2]:mb-10 [&_h2]:text-[clamp(30px,3.5vw,48px)] [&_h2]:tracking-[-.03em]">
          <div>
            <h2>Алсын хараа ба Үнэт зүйл</h2>
            <article className={`${glassClass} my-4 rounded-lg border-l-4 border-l-[#60dda2] p-6`}>
              <h3 className="mb-2 text-[21px] text-[#60dda2]">Эрхэм зорилго</h3>
              <p className="leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">Бид дэлхийн жишигт нийцсэн архитектурын шийдлийг Монгол хөрсөнд буулгаж, амьдралын чанарыг дээшлүүлэх тогтвортой бүтээн байгуулалтыг цогцлооно.</p>
            </article>
            <article className={`${glassClass} my-4 rounded-lg border-l-4 border-l-[#b9c7e4] p-6`}>
              <h3 className="mb-2 text-[21px] text-[#b9c7e4]">Чанарын баталгаа</h3>
              <p className="leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">Барилгын материал бүр, шийдэл болгон дээр бид аюулгүй байдал, урт хугацааны үнэ цэнийг нэгдүгээрт тавьдаг.</p>
            </article>
          </div>
          <div className="relative h-[520px] overflow-hidden rounded-[14px] max-[760px]:h-[390px] after:absolute after:inset-x-0 after:bottom-0 after:top-[35%] after:bg-gradient-to-b after:from-transparent after:to-[#060c1d] after:content-['']">
            <img className="size-full object-cover grayscale" alt="Орчин үеийн архитектур" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQmih6qQW9cqOrbKLMoHBVzRnGLOlvD9gsA81feU_ktDfG5Q0-OrfhJKQXyQn3qfg8-fB2RpaN6dUQzPL7WasdcqGznskdQDwpjcmbWUOWwTyhU3Lg_XoE6egI5be-wOLK4UpykB0WjxjC4bpSCQey4kGpYJhSCMbyylOnPh_dmmaJaJtp5Dea23_x5Vry9JY94mhTSvtLimAU3BerlolQ_sl_Gsz5FW4-of8H47AjcwiZi5Fxz5fV" />
            <blockquote className={`${glassClass} absolute inset-x-6 bottom-6 z-[2] m-0 rounded-lg p-6 text-xl`}>&ldquo;Архитектур бол хөлдсөн хөгжим юм.&rdquo;</blockquote>
          </div>
        </section>

        <section id="projects" className="bg-[#060c1d] px-[clamp(20px,7vw,120px)] py-[100px] max-[760px]:px-4 max-[760px]:py-[72px] in-data-[theme=light]:bg-[#e8eef6]">
          <span className={kickerClass}>ОНЦЛОХ ТӨСЛҮҮД</span>
          <h2 className="mb-10 mt-2.5 text-[clamp(30px,3.5vw,48px)] tracking-[-.03em]">Шилдэг Бүтээн Байгуулалтууд</h2>
          <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
            {projects.map((project) => (
              <article className="group relative h-[670px] overflow-hidden rounded-[14px] max-[760px]:h-[480px] after:absolute after:inset-x-0 after:bottom-0 after:top-[35%] after:bg-gradient-to-b after:from-transparent after:to-[#060c1d] after:content-['']" key={project.name}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-105" style={{ backgroundImage: `url(${project.image})` }} />
                <span className="absolute right-5 top-5 z-[3] rounded-full border border-[#60dda2]/50 bg-[#051414]/70 px-3.5 py-[7px] text-[11px] font-extrabold text-[#60dda2]">{project.status}</span>
                <div className="absolute inset-x-8 bottom-8 z-[3] max-[760px]:inset-x-[18px] max-[760px]:bottom-5">
                  <h3 className="mb-2.5 text-[32px] max-[760px]:text-[26px]">{project.name}</h3>
                  <p className="mb-6 text-[#b7c0d2]">⌖ {project.meta}</p>
                  <Link className={`${secondaryButtonClass} w-full`} href="/master-plan">ДЭЛГЭРЭНГҮЙ ҮЗЭХ</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-[clamp(20px,7vw,120px)] py-[100px] text-center max-[760px]:px-4 max-[760px]:py-[72px]">
          <div className={`${glassClass} mx-auto max-w-[1020px] rounded-[20px] px-[50px] py-[70px] max-[760px]:px-5 max-[760px]:py-[46px]`}>
            <div className="text-[58px] text-[#60dda2]">♧</div>
            <h2 className="mb-10 text-[clamp(30px,3.5vw,48px)] tracking-[-.03em]">Төслийн нэгдсэн төлөвлөгөө</h2>
            <p className="mx-auto mb-8 max-w-[680px] leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">Манай бүх төслүүдийн байршил, дэд бүтэц болон ирээдүйн өргөтгөлийн төлөвлөгөөг интерактив газрын зургаас харна уу.</p>
            <Link className={primaryButtonClass} href="/master-plan">МАСТЕР ТӨЛӨВЛӨГӨӨ ҮЗЭХ</Link>
          </div>
        </section>
      </main>

      <footer id="contact" className="grid grid-cols-[1.2fr_1fr_1fr] items-center gap-10 border-t border-white/7 bg-[#060c1d] px-[clamp(20px,7vw,120px)] py-[52px] max-[760px]:grid-cols-1 max-[760px]:pb-[110px] max-[760px]:text-center in-data-[theme=light]:bg-[#e8eef6]">
        <div className="[&_img]:!size-[52px]"><BrandLogo /><p className="leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">Өндөр зэрэглэлийн үл хөдлөх хөрөнгийн зах зээлд тэргүүлэгч.</p></div>
        <div className="flex flex-wrap gap-[18px] text-xs text-[#b7c0d2] max-[760px]:justify-center"><a href="#about">Бидний тухай</a><a href="#projects">Төслүүд</a><a href="#contact">Холбоо барих</a><a href="#">Нууцлалын бодлого</a></div>
        <small className="text-right leading-[1.7] text-[#b7c0d2] max-[760px]:text-center">© 2024 Гүнд Саплай ХХК.<br />Бүх эрх хуулиар хамгаалагдсан.</small>
      </footer>
      <nav className={bottomNavClass}><Link className="!text-[#60dda2]" href="/">⌂<span>НҮҮР</span></Link><Link href="/master-plan">▥<span>ТӨСЛҮҮД</span></Link><a href="#">▱<span>ХАДГАЛСАН</span></a><a href="#contact">?<span>ХОЛБОО</span></a></nav>
    </>
  );
}
