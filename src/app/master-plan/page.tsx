import Link from "next/link";
import ThemeToggle from "../theme-toggle";
import BrandLogo from "../brand-logo";
import {
  bottomNavClass,
  glassClass,
  headerClass,
  infoGridClass,
  kickerClass,
  menuClass,
  navToolsClass,
  pageHeadClass,
  portalClass,
} from "../ui";

const blocks = [
  "N1 Блок",
  "N2 Блок",
  "N3 Блок",
  "N4 Блок",
  "N7 Блок",
  "Бусад төлөвлөлт",
];

export default function MasterPlan() {
  return (
    <>
      <header className={headerClass}>
        <BrandLogo />
        <div className={navToolsClass}>
          <ThemeToggle />
          <button className={menuClass}>☰</button>
        </div>
      </header>
      <main className={portalClass}>
        <div className={pageHeadClass}>
          <span className={`${kickerClass} mb-3 block`}>
            GUND SUPPLY RESIDENCE
          </span>
          <h1>Төслийн мастер төлөвлөгөө</h1>
          <p>Хотхоны ерөнхий төлөвлөлтөөс сонирхож буй блокоо сонгоно уу.</p>
        </div>
        <Link
          href="/projects/n1"
          className="relative mx-auto block h-[520px] max-w-[1180px] rounded-xl border border-[#263452] bg-cover bg-center after:absolute after:left-[8%] after:top-[42%] after:rounded-md after:border after:border-[#60dda2] after:bg-[#071424]/90 after:px-6 after:py-[18px] after:font-extrabold after:text-[#60dda2] after:content-['N1_БЛОК_·_СОНГОХ'] max-[760px]:h-[260px] in-data-[theme=light]:border-[#ccd5e2]"
          aria-label="N1 блок сонгох"
          style={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBq-aIxWHJCM5vHIafc0saDbqfD9ZeUNAH903cunpt7Vlbrw1t4S6irsQQzrETco7Uc_o2XANW4hw3TV0CRp0T14W7LXPWzUo_ASvdD5gyNt19towCT8ovY7VLOxvxCSqLWRPnNkDn7zWE-NPiNO0Z9Fgjdb-C826vTYFOpv8O-E1YzCobVA0F2lBlv9hDagiJGLzeIwq6LG_Nl399rNLPefZKGjysnEHiSG9WUgKWQG_D84lIFZtHU)",
          }}
        />
        <div className={infoGridClass}>
          <article
            className={`${glassClass} rounded-[10px] p-8 max-[760px]:p-[22px] [&_h2]:mb-5 [&_h2]:text-[28px] [&_p]:leading-[1.8] [&_p]:text-[#b7c0d2]`}
          >
            <h2>Төслийн масштаб</h2>
            <p>
              Гүнд Саплай Резиденс нь нийт 4.2 га талбайг хамарсан, орчин үеийн
              архитектурын шийдэл бүхий цогцолбор юм. Хүн төвтэй төлөвлөлтийн
              дагуу нийт талбайн 60%-ийг ногоон байгууламж эзэлнэ.
            </p>
            <div className={kickerClass}>
              5.2К М.КВ НОГООН БҮС &nbsp;&nbsp; 12 ОРОН СУУЦНЫ БЛОК
            </div>
          </article>
          <article
            className={`${glassClass} rounded-[10px] p-8 max-[760px]:p-[22px] [&_h2]:mb-5 [&_h2]:text-[28px]`}
          >
            <h2>Барилгын мэдээлэл</h2>
            <div className="grid grid-cols-2 gap-3">
              {blocks.map((b, i) => (
                <Link
                  href={i === 0 ? "/projects/n1" : "#"}
                  className={`rounded-[5px] border p-[18px] ${i === 0 ? "border-[#60dda2] text-[#60dda2]" : "border-[#263452]"}`}
                  key={b}
                >
                  {b}
                </Link>
              ))}
            </div>
          </article>
        </div>
      </main>
      <nav className={bottomNavClass}>
        <Link href="/">
          ⌂<span>НҮҮР</span>
        </Link>
        <Link className="!text-[#60dda2]" href="/master-plan">
          ▥<span>ТӨЛӨВЛӨГӨӨ</span>
        </Link>
        <a href="#">
          ▱<span>ХАДГАЛСАН</span>
        </a>
        <a href="#">
          ?<span>ХОЛБОО</span>
        </a>
      </nav>
    </>
  );
}
