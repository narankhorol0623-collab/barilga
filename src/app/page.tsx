import Image from "next/image";
import { getProjects } from "@/lib/catalog";
import DataNotice from "./data-notice";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import BrandLogo from "./brand-logo";
import {
  glassClass,
  headerClass,
  kickerClass,
  menuClass,
  navToolsClass,
  primaryButtonClass,
  secondaryButtonClass,
  bottomNavClass,
} from "./ui";

const milestones = [
  {
    year: "2019",
    title: "Hunnu Villa",
    detail: "Барилгын салбар дахь ажлын туршлагын эхлэл",
  },
  {
    year: "2021",
    title: "Green Art",
    detail: "Туслан гүйцэтгэгчээр ажилласан",
  },
  {
    year: "2022",
    title: "Sunset",
    detail: "Томоохон бүтээн байгуулалтын туршлага",
  },
  {
    year: "2023",
    title: "Гүнд Саплай ХХК",
    detail: "Бие даасан хөгжүүлэгч компани болсон",
  },
];

const values = [
  {
    no: "01",
    title: "Чанар",
    text: "Материалын сонголтоос эхлээд гүйцэтгэл, хүлээлгэн өгөх хүртэлх үе шат бүрд өндөр шаардлага тавина.",
  },
  {
    no: "02",
    title: "Хариуцлага",
    text: "Хүлээсэн үүрэг, өгсөн амлалт, ажлын хугацаа, гүйцэтгэлдээ эзэн байх нь бидний үндсэн зарчим.",
  },
  {
    no: "03",
    title: "Итгэлцэл",
    text: "Захиалагч, харилцагч, хамтрагч болон ажилтнуудтайгаа урт хугацааны итгэлцсэн харилцааг эрхэмлэнэ.",
  },
  {
    no: "04",
    title: "Мэргэжлийн ур чадвар",
    text: "Бодит бүтээн байгуулалтаас хуримтлуулсан туршлага, мэргэжлийн багийн мэдлэг чадварыг төсөл бүрдээ шингээнэ.",
  },
  {
    no: "05",
    title: "Хөгжил, шинэчлэл",
    text: "Шинэ технологи, материал, инженерийн шийдэл, орчин үеийн архитектурын чиг хандлагыг тасралтгүй нэвтрүүлнэ.",
  },
  {
    no: "06",
    title: "Хэрэглэгчийн үнэ цэн",
    text: "Бидний эцсийн хэмжүүр бол тэнд амьдрах хүмүүсийн тав тух, сэтгэл ханамж, урт хугацааны үнэ цэн юм.",
  },
];

export default async function Home() {
  const { data: projects, error } = await getProjects();
  return (
    <>
      <header className={headerClass}>
        <BrandLogo />
        <nav className="flex gap-11 text-xs font-bold tracking-[.08em] max-[760px]:hidden [&_a]:border-b-2 [&_a]:border-transparent [&_a]:py-2.5 [&_a]:text-[#c4ccdc] [&_a]:hover:border-[var(--brand-accent)] [&_a]:hover:text-[color:var(--brand-accent)] in-data-[theme=light]:[&_a]:text-[#526078]">
          <Link
            className="!border-[var(--brand-accent)] !text-[color:var(--brand-accent)]"
            href="/"
          >
            Нүүр
          </Link>
          <a href="#projects">Төслүүд</a>
          <a href="#about">Бидний тухай</a>
          <a href="#contact">Холбоо барих</a>
        </nav>
        <div className={navToolsClass}>
          <ThemeToggle />
          <button className={menuClass} aria-label="Цэс">
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="relative isolate flex h-svh min-h-[680px] items-center overflow-hidden bg-[radial-gradient(circle_at_76%_34%,rgba(20,93,148,.22),transparent_31%),radial-gradient(circle_at_25%_72%,rgba(32,68,135,.1),transparent_28%),linear-gradient(125deg,#0a1128_0%,#0a1128_58%,#0d1732_100%)] px-[clamp(20px,7vw,120px)] pb-[60px] pt-[100px] max-[760px]:min-h-[760px] max-[760px]:px-4 max-[760px]:pb-20 in-data-[theme=light]:bg-[radial-gradient(circle_at_76%_34%,rgba(20,93,148,.13),transparent_31%),radial-gradient(circle_at_25%_72%,rgba(33,106,171,.1),transparent_28%),linear-gradient(125deg,#f7f9fc_0%,#eef3f9_58%,#e6edf6_100%)] after:absolute after:right-[-20%] after:top-[10%] after:h-[60vw] after:w-[60vw] after:rotate-[35deg] after:border after:border-[#a0b2da]/8 after:content-['']">
          <div className="absolute right-[10%] top-[20%] size-[380px] rounded-full bg-[#075678] opacity-15 blur-[180px]" />
          <div className="relative z-[2] max-w-[850px] py-3">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[var(--brand-accent)]/20 bg-[#101d3b]/70 px-4 py-2.5 text-xs font-extrabold tracking-[.18em] text-[color:var(--brand-accent)] shadow-[0_12px_38px_rgba(0,0,0,.16)] backdrop-blur-lg in-data-[theme=light]:bg-white/70 in-data-[theme=light]:text-[#216aab]">
              <i className="size-2 rounded-full bg-[var(--brand-accent)]" />{" "}
              ШИНЭ ТӨСӨЛ НЭЭЛТТЭЙ
            </div>
            <h1 className="mb-6 text-[clamp(40px,5vw,72px)] leading-[1.08] tracking-[-.045em] text-white max-[760px]:text-4xl in-data-[theme=light]:text-[#0a1128]">
              ГҮНД САПЛАЙ —<br />
              <span>Ирээдүйн бүтээн байгуулалт</span>
            </h1>
            <p className="mb-[38px] max-w-[660px] text-lg leading-[1.7] text-[#c5cddd] max-[760px]:text-[15px] in-data-[theme=light]:text-[#526078]">
              Бид танд чанар, тав тух, аюулгүй байдлыг амлаж байна. Монголын
              архитектурын шинэ өнгө төрхийг тодорхойлогч таны итгэлт түнш.
            </p>
            <div className="flex items-stretch gap-4 max-[760px]:flex-col">
              <Link className={primaryButtonClass} href="/master-plan">
                БАЙРАА СОНГОХ ↗
              </Link>
              <a
                className={`${secondaryButtonClass} border-white/50 bg-white/[.025] text-white backdrop-blur-lg in-data-[theme=light]:border-[#0a1128]/25 in-data-[theme=light]:bg-white/60 in-data-[theme=light]:text-[#0a1128]`}
                href="#about"
              >
                БИДНИЙ ТУХАЙ
              </a>
            </div>
          </div>
          <Image
            width={1597}
            height={985}
            className="absolute bottom-6 left-[clamp(20px,7vw,120px)] h-12 w-20 object-contain opacity-90 max-[760px]:bottom-[30px]"
            src="/gund-supply-logo.webp"
            alt=""
          />
          <a
            className="absolute bottom-6 left-1/2 z-[2] -translate-x-1/2 text-center text-[9px] tracking-[.25em] text-[#778294]"
            href="#about"
          >
            SCROLL{" "}
            <b className="block text-[26px] text-[color:var(--brand-accent)]">
              ⌄
            </b>
          </a>
        </section>

        <section
          id="about"
          className="overflow-hidden px-[clamp(20px,7vw,120px)] py-[100px] max-[760px]:px-4 max-[760px]:py-[72px]"
        >
          <div className="mx-auto max-w-[1240px]">
            <div className="grid grid-cols-[.8fr_1.2fr] gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-8">
              <div>
                <span className={kickerClass}>БИДНИЙ ТУХАЙ</span>
                <h2 className="mt-3 text-[clamp(34px,4vw,56px)] leading-[1.08] tracking-[-.04em]">
                  Туршлагаас
                  <br />
                  <span className="text-[color:var(--brand-accent)]">
                    үнэ цэн бүтээнэ.
                  </span>
                </h2>
              </div>
              <div className="space-y-5 text-[17px] leading-[1.85] text-[#b7c0d2] max-[760px]:text-[15px] in-data-[theme=light]:text-[#526078]">
                <p>
                  Манай хамт олон барилгын салбар дахь ажлын туршлагаа 2019 онд
                  “Hunnu Villa” хотхоны бүтээн байгуулалтаас эхлүүлж, “Green
                  Art”, “Sunset” хотхоны төслүүдэд туслан гүйцэтгэгчээр ажиллан
                  мэргэжлийн туршлага хуримтлуулсан.
                </p>
                <p>
                  Хуримтлуулсан туршлага, мэргэжлийн багийн ур чадвартаа
                  тулгуурлан 2023 онд “Гүнд Саплай” ХХК-ийг байгуулж, өөрийн бие
                  даасан үл хөдлөх хөрөнгийн төслийг хэрэгжүүлж эхэлсэн.
                </p>
              </div>
            </div>

            <div className="relative mt-16 grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 max-[820px]:grid-cols-2 max-[480px]:grid-cols-1 in-data-[theme=light]:border-[#ccd5e2] in-data-[theme=light]:bg-[#ccd5e2]">
              {milestones.map((item) => (
                <article
                  className="bg-[#0d1730] p-7 in-data-[theme=light]:bg-white"
                  key={item.year}
                >
                  <strong className="text-[32px] tracking-[-.04em] text-[color:var(--brand-accent)]">
                    {item.year}
                  </strong>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8f9bb2] in-data-[theme=light]:text-[#526078]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>

            <div
              className={`${glassClass} relative mt-6 overflow-hidden rounded-2xl p-10 max-[760px]:p-6`}
            >
              <div className="absolute -right-20 -top-24 size-72 rounded-full bg-[var(--brand-accent)]/10 blur-[90px]" />
              <div className="relative grid grid-cols-[auto_1fr] gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-5">
                <div className="text-[56px] font-black leading-none text-[color:var(--brand-accent)]">
                  3.8<span className="ml-1 text-lg">га</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    Luxury Residence — Зайсан
                  </h3>
                  <p className="mt-3 max-w-[850px] leading-[1.8] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">
                    Хан-Уул дүүргийн 11-р хороонд 5 блок орон сууц, 22 амины
                    орон сууц бүхий төслийг үе шаттай хэрэгжүүлж, төлөвлөгдсөн 5
                    блокийн бүтээн байгуулалтыг бүрэн дуусган захиалагчдадаа
                    хүлээлгэн өгөөд байна.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs font-extrabold tracking-[.08em]">
                    <span className="rounded-full border border-[var(--brand-accent)]/30 px-4 py-2 text-[color:var(--brand-accent)]">
                      5 БЛОК
                    </span>
                    <span className="rounded-full border border-[var(--brand-accent)]/30 px-4 py-2 text-[color:var(--brand-accent)]">
                      22 АМИНЫ ОРОН СУУЦ
                    </span>
                    <span className="rounded-full border border-[var(--brand-accent)]/30 px-4 py-2 text-[color:var(--brand-accent)]">
                      БҮРЭН ДУУССАН
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mx-auto my-16 max-w-[960px] text-center text-xl leading-[1.75] text-[#d7deec] max-[760px]:my-12 max-[760px]:text-base in-data-[theme=light]:text-[#344258]">
              Энэ хугацаанд бид төслийн төлөвлөлт, бүтээн байгуулалт, инженерийн
              шийдэл, чанарын хяналт, борлуулалт болон хэрэглэгчид хүлээлгэн
              өгөх хүртэлх{" "}
              <strong className="text-white in-data-[theme=light]:text-[#0a1128]">
                бүхий л үе шатыг цогцоор хэрэгжүүлэх
              </strong>{" "}
              чадавхаа бэхжүүлсээр ирлээ.
            </p>

            <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
              <article
                className={`${glassClass} rounded-2xl border-t-4 border-t-[var(--brand-accent)] p-8 max-[760px]:p-6`}
              >
                <span className={kickerClass}>БИДНИЙ АЛСЫН ХАРАА</span>
                <p className="mt-5 text-lg leading-[1.8] text-[#d7deec] in-data-[theme=light]:text-[#344258]">
                  Монголын үл хөдлөх хөрөнгө, барилгын салбарт чанар,
                  хариуцлага, үнэ цэнээрээ танигдсан тогтвортой хөгжүүлэгч
                  компани болж, хотын өнгө төрх, иргэдийн амьдралын чанарт бодит
                  хувь нэмэр оруулсан бүтээн байгуулалтуудыг бий болгоно.
                </p>
              </article>
              <article
                className={`${glassClass} rounded-2xl border-t-4 border-t-[#b9c7e4] p-8 max-[760px]:p-6`}
              >
                <span className={`${kickerClass} !text-[#b9c7e4]`}>
                  БИДНИЙ ЭРХЭМ ЗОРИЛГО
                </span>
                <p className="mt-5 text-lg leading-[1.8] text-[#d7deec] in-data-[theme=light]:text-[#344258]">
                  Мэргэжлийн ур чадвар, инженерийн оновчтой шийдэл, чанартай
                  гүйцэтгэл, хариуцлагатай менежментэд тулгуурлан тав тухтай,
                  аюулгүй, урт хугацааны үнэ цэнтэй орон зайг бүтээнэ.
                </p>
                <p className="mt-4 text-sm leading-6 text-[#8f9bb2] in-data-[theme=light]:text-[#526078]">
                  Бүтээн байгуулалт бүрээ зөвхөн өнөөдрийн хэрэгцээнд бус,
                  ирээдүйн үнэ цэнийг хадгалах хөрөнгө хэмээн хардаг.
                </p>
              </article>
            </div>

            <div className="mt-20 max-[760px]:mt-14">
              <span className={kickerClass}>БИДНИЙ ҮНЭТ ЗҮЙЛС</span>
              <h2 className="mb-10 mt-3 text-[clamp(30px,3.5vw,46px)] tracking-[-.03em]">
                Бидний ажиллах зарчим
              </h2>
              <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
                {values.map((value) => (
                  <article
                    className={`${glassClass} group rounded-xl p-6 transition-colors hover:border-[var(--brand-accent)]/50`}
                    key={value.no}
                  >
                    <span className="text-xs font-extrabold tracking-[.16em] text-[color:var(--brand-accent)]">
                      {value.no}
                    </span>
                    <h3 className="mb-3 mt-6 text-xl font-bold group-hover:text-[color:var(--brand-accent)]">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-[1.75] text-[#9ca8bd] in-data-[theme=light]:text-[#526078]">
                      {value.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-16 rounded-2xl bg-[#216aab] px-10 py-12 text-center text-[#ffffff] max-[760px]:px-5 max-[760px]:py-9">
              <p className="text-[clamp(24px,3vw,40px)] font-black leading-[1.25] tracking-[-.035em]">
                Бид зөвхөн барилга барьдаггүй.
                <br />
                Бид хүмүүсийн амьдрах орчин, ирээдүйн үнэ цэнийг бүтээдэг.
              </p>
              <div className="mx-auto my-6 h-px w-20 bg-[#ffffff]/30" />
              <strong className="text-sm tracking-[.2em]">
                ГҮНД САПЛАЙ ХХК
              </strong>
              <p className="mt-2 text-sm font-semibold">
                Туршлагаас бүтээн байгуулалт, бүтээн байгуулалтаас үнэ цэн.
              </p>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="bg-[#060c1d] px-[clamp(20px,7vw,120px)] py-[100px] max-[760px]:px-4 max-[760px]:py-[72px] in-data-[theme=light]:bg-[#e8eef6]"
        >
          <span className={kickerClass}>ОНЦЛОХ ТӨСЛҮҮД</span>
          <h2 className="mb-10 mt-2.5 text-[clamp(30px,3.5vw,48px)] tracking-[-.03em]">
            Шилдэг Бүтээн Байгуулалтууд
          </h2>
          <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
            <DataNotice error={error} empty={projects.length === 0} />
            {projects.map((project) => (
              <article
                className="group relative h-[670px] overflow-hidden rounded-[14px] max-[760px]:h-[480px] after:absolute after:inset-x-0 after:bottom-0 after:top-[35%] after:bg-gradient-to-b after:from-transparent after:to-[#060c1d] after:content-['']"
                key={project.name}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <span className="absolute right-5 top-5 z-[3] rounded-full border border-[var(--brand-accent)]/50 bg-[#071a30]/70 px-3.5 py-[7px] text-[11px] font-extrabold text-[color:var(--brand-accent)]">
                  {project.status}
                </span>
                <div className="absolute inset-x-8 bottom-8 z-[3] max-[760px]:inset-x-[18px] max-[760px]:bottom-5">
                  <h3 className="mb-2.5 text-[32px] max-[760px]:text-[26px]">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-[#b7c0d2]">⌖ {project.meta}</p>
                  <Link
                    className={`${secondaryButtonClass} w-full`}
                    href="/master-plan"
                  >
                    ДЭЛГЭРЭНГҮЙ ҮЗЭХ
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-[clamp(20px,7vw,120px)] py-[100px] text-center max-[760px]:px-4 max-[760px]:py-[72px]">
          <div
            className={`${glassClass} mx-auto max-w-[1020px] rounded-[20px] px-[50px] py-[70px] max-[760px]:px-5 max-[760px]:py-[46px]`}
          >
            <div className="text-[58px] text-[color:var(--brand-accent)]">
              ♧
            </div>
            <h2 className="mb-10 text-[clamp(30px,3.5vw,48px)] tracking-[-.03em]">
              Төслийн нэгдсэн төлөвлөгөө
            </h2>
            <p className="mx-auto mb-8 max-w-[680px] leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">
              Манай бүх төслүүдийн байршил, дэд бүтэц болон ирээдүйн өргөтгөлийн
              төлөвлөгөөг интерактив газрын зургаас харна уу.
            </p>
            <Link className={primaryButtonClass} href="/master-plan">
              МАСТЕР ТӨЛӨВЛӨГӨӨ ҮЗЭХ
            </Link>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="grid grid-cols-[1.2fr_1fr_1fr] items-center gap-10 border-t border-white/7 bg-[#060c1d] px-[clamp(20px,7vw,120px)] py-[52px] max-[760px]:grid-cols-1 max-[760px]:pb-[110px] max-[760px]:text-center in-data-[theme=light]:bg-[#e8eef6]"
      >
        <div className="space-y-4">
          <BrandLogo />
          <p className="leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">
            Өндөр зэрэглэлийн үл хөдлөх хөрөнгийн зах зээлд тэргүүлэгч.
          </p>
        </div>
        <div className="flex flex-wrap gap-[18px] text-xs text-[#b7c0d2] max-[760px]:justify-center">
          <a href="#about">Бидний тухай</a>
          <a href="#projects">Төслүүд</a>
          <a href="#contact">Холбоо барих</a>
          <a href="#">Нууцлалын бодлого</a>
        </div>
        <small className="text-right leading-[1.7] text-[#b7c0d2] max-[760px]:text-center">
          © 2024 Гүнд Саплай ХХК.
          <br />
          Бүх эрх хуулиар хамгаалагдсан.
        </small>
      </footer>
      <nav className={bottomNavClass}>
        <Link className="!text-[color:var(--brand-accent)]" href="/">
          ⌂<span>НҮҮР</span>
        </Link>
        <Link href="/master-plan">
          ▥<span>ТӨСЛҮҮД</span>
        </Link>
        <a href="#">
          ▱<span>ХАДГАЛСАН</span>
        </a>
        <a href="#contact">
          ?<span>ХОЛБОО</span>
        </a>
      </nav>
    </>
  );
}
