import Image from "next/image";
import Link from "next/link";
import HomeAbout from "./HomeAbout";
import { headerClass } from "./ui";

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
                  ГҮНД САПЛАЙ ХХК
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
        <HomeAbout />
      </main>
    </>
  );
}
