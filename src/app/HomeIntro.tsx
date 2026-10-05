import Image from "next/image";
import Link from "next/link";
import BrandLogo from "./brand-logo";
import {
  glassClass,
  headerClass,
  kickerClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "./ui";

const milestones = [
  {
    year: "2019",
    title: "Hunnu Villa",
    image: "/hunnuvilla.jpg",
    detail: "Барилгын салбар дахь ажлын туршлагын эхлэл",
  },
  {
    year: "2021",
    title: "Green Art",
    image: "/greenart.png",
    detail: "Туслан гүйцэтгэгчээр ажилласан",
  },
  {
    year: "2022",
    title: "Sunset",
    image: "/sunset.jpeg",
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

export default function HomeIntro() {
  return (
    <>
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

      <main>
        <section className="relative isolate flex h-svh min-h-[680px] items-end overflow-hidden px-[clamp(20px,5vw,72px)] pb-[clamp(28px,5vw,64px)] pt-[100px] max-[760px]:min-h-[720px] max-[760px]:px-4 max-[760px]:pb-24">
          {/* Дэвсгэр зураг */}
          <Image
            src="/luxury.JPG"
            alt=""
            fill
            priority
            className="-z-30 object-cover object-center"
          />
          {/* Дээд талд бага зэрэг бүдгэрүүлэх */}
          <div className="absolute inset-0 -z-20 bg-black/20" />
          {/* Доош чиглэсэн хар градиент (текст тод харагдуулна) */}
          <div className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-gradient-to-t from-black via-black/60 to-transparent" />

          <div className="flex w-full items-end justify-between gap-10 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-8">
            {/* Зүүн доод: шошго + гарчиг */}
            <div className="max-w-[1000px]">
              <div className="mb-5 inline-flex items-center gap-3 text-sm text-white/90">
                <span className="grid size-6 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                  <i className="size-2.5 rounded-full bg-[var(--brand-accent)]" />
                </span>
                Шинэ төсөл нээлттэй
              </div>
              <h1 className="text-[clamp(40px,7vw,108px)] font-bold uppercase leading-[.95] tracking-[-.04em] text-white max-[760px]:text-[40px]">
                <span className="text-[color:var(--brand-accent)]">
                  ГҮНД САПЛАЙ
                </span>
                <br />
                <span>Ирээдүйн бүтээн байгуулалт</span>
              </h1>
            </div>

            {/* Баруун доод: товч */}
            <Link
              href="/master-plan"
              className="group inline-flex shrink-0 items-center gap-5 rounded-lg bg-white py-2 pl-5 pr-2 text-sm font-semibold text-[#0a1128] shadow-[0_12px_38px_rgba(0,0,0,.3)] transition-transform hover:-translate-y-0.5"
            >
              Байраа сонгох
              <span className="grid size-10 place-items-center rounded-md bg-[var(--brand-accent)] text-lg text-white transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </section>

        <section
          id="about"
          data-scroll-reveal
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
                  data-scroll-reveal
                  className={`${item.image ? "group" : ""} relative overflow-hidden bg-[#0d1730] p-7 in-data-[theme=light]:bg-white`}
                  key={item.year}
                >
                  {item.image && (
                    <>
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 820px) 50vw, 25vw"
                        className="pointer-events-none scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[#0a1128]/70 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    </>
                  )}
                  <div className="relative z-10">
                    <strong className="text-[32px] tracking-[-.04em] text-[color:var(--brand-accent)] transition-colors duration-500 group-hover:!text-white">
                      {item.year}
                    </strong>
                    <h3 className="mt-5 text-lg font-bold transition-colors duration-500 group-hover:!text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#8f9bb2] transition-colors duration-500 group-hover:!text-white/90 in-data-[theme=light]:text-[#526078]">
                      {item.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="absolute -right-20 -top-24 size-72 rounded-full bg-[var(--brand-accent)]/10 blur-[90px]" />

            <div
              className={`${glassClass} group relative mt-6 overflow-hidden rounded-2xl p-10 max-[760px]:p-6`}
            >
              {/* Hover хийхэд бүх карт дээр гарч ирэх зураг */}
              <Image
                src="/luxury.jpeg"
                alt=""
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="pointer-events-none object-cover opacity-0 scale-105 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#0a1128]/70 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="absolute -right-20 -top-24 size-72 rounded-full bg-[var(--brand-accent)]/10 blur-[90px]" />

              {/* Агуулга зургийн дээр байрлана */}
              <div className="relative z-10 grid grid-cols-[auto_1fr] gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-5">
                <div className="text-[56px] font-black leading-none text-[color:var(--brand-accent)] transition-colors duration-500 group-hover:!text-white">
                  3.8<span className="ml-1 text-lg">га</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold transition-colors duration-500 group-hover:!text-white">
                    Luxury Residence — Зайсан
                  </h3>
                  <p className="mt-3 max-w-[850px] leading-[1.8] text-[#b7c0d2] transition-colors duration-500 group-hover:!text-white/90 in-data-[theme=light]:text-[#526078]">
                    Хан-Уул дүүргийн 11-р хороонд 5 блок орон сууц, 22 амины
                    орон сууц бүхий төслийг үе шаттай хэрэгжүүлж, төлөвлөгдсөн 5
                    блокийн бүтээн байгуулалтыг бүрэн дуусган захиалагчдадаа
                    хүлээлгэн өгөөд байна.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs font-extrabold tracking-[.08em]">
                    <span className="rounded-full border border-[var(--brand-accent)]/30 px-4 py-2 text-[color:var(--brand-accent)] transition-colors duration-500 group-hover:border-white/50 group-hover:!text-white">
                      5 БЛОК
                    </span>
                    <span className="rounded-full border border-[var(--brand-accent)]/30 px-4 py-2 text-[color:var(--brand-accent)] transition-colors duration-500 group-hover:border-white/50 group-hover:!text-white">
                      22 АМИНЫ ОРОН СУУЦ
                    </span>
                    <span className="rounded-full border border-[var(--brand-accent)]/30 px-4 py-2 text-[color:var(--brand-accent)] transition-colors duration-500 group-hover:border-white/50 group-hover:!text-green-400">
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
      </main>
    </>
  );
}
