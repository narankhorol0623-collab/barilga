import Link from "next/link";
import ThemeToggle from "../../theme-toggle";
import BrandLogo from "../../brand-logo";
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
  primaryButtonClass,
} from "../../ui";

const availability = [1, 2, 2, 4, 0, 4, 4, 1, 3, 4, 0, 3, 2, 4, 4];

export default function BlockPage() {
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
            LUXURY RESIDENTIAL
          </span>
          <h1>N1 Блок</h1>
          <p>Давхар болон боломжит байрны сонголтоо хийнэ үү.</p>
        </div>
        <section className="mx-auto max-w-[1000px] rounded-[10px] border border-[#263452] p-7 max-[760px]:p-2">
          {availability.map((count, index) => {
            const floor = index + 1;
            return (
              <div
                className={`grid grid-cols-[130px_1fr_130px] items-center gap-5 border-b border-white/6 p-[18px] max-[760px]:grid-cols-[90px_1fr_65px] max-[760px]:gap-2 max-[760px]:px-2 max-[760px]:py-4 max-[760px]:text-xs ${floor === 10 ? "rounded-lg border border-[#60dda2] bg-[#60dda2]/8 text-[#60dda2]" : ""}`}
                key={floor}
              >
                <strong>{floor}-Р ДАВХАР</strong>
                <div className="flex h-[46px] items-center gap-[7px] border border-[#3b485b] p-2">
                  {[0, 1, 2, 3].map((i) => (
                    <i
                      className={`h-[22px] flex-1 ${i < count ? "bg-[#57ba94]" : "bg-[#263246]"}`}
                      key={i}
                    />
                  ))}
                </div>
                {floor === 10 ? (
                  <Link
                    className="text-right font-extrabold"
                    href="/projects/n1/floor-10"
                  >
                    СОНГОСОН
                  </Link>
                ) : (
                  <Link
                    className="text-right font-extrabold"
                    href={count ? "/projects/n1/floor-10" : "#"}
                  >
                    {count ? "ҮЗЭХ" : "ДҮҮРСЭН"}
                  </Link>
                )}
              </div>
            );
          })}
        </section>
        <div
          className={`${glassClass} mx-auto my-6 flex max-w-[1000px] items-center justify-between rounded-[10px] border-[#60dda2]/50 p-7 max-[760px]:p-[18px]`}
        >
          <div>
            <span>Сонгогдсон давхар</span>
            <h2>Хамгийн өргөн цонхны харагдацтай</h2>
          </div>
          <strong className="text-[44px] text-[#60dda2] max-[760px]:text-[28px]">
            10
          </strong>
          <div>
            <span className={kickerClass}>ҮНЭ ЭХЛЭХ</span>
            <h2>₮5.2M / М.КВ</h2>
          </div>
        </div>
        <div className={infoGridClass}>
          <article
            className={`${glassClass} rounded-[10px] p-8 max-[760px]:p-[22px] [&_h2]:my-5 [&_h2]:text-[28px] [&_p]:leading-[1.8]`}
          >
            <span className={kickerClass}>LUXURY RESIDENTIAL</span>
            <h2>N1 Блок</h2>
            <p>
              Нийт апартамент: 120
              <br />
              Авто зогсоол: 80
              <br />
              Ашиглалтад орох: 2025
            </p>
            <Link className={primaryButtonClass} href="/projects/n1/floor-10">
              БРОШУР ТАТАХ
            </Link>
          </article>
          <article
            className={`${glassClass} rounded-[10px] p-8 max-[760px]:p-[22px] [&_h2]:mb-5 [&_h2]:text-[28px] [&_p]:leading-[1.8]`}
          >
            <h2>Төлөв</h2>
            <p>🟢 Боломжтой (Сонгох)</p>
            <p>⚫ Зарагдсан</p>
            <p>🟡 Захиалгатай</p>
          </article>
        </div>
      </main>
      <nav className={bottomNavClass}>
        <Link href="/">
          ⌂<span>НҮҮР</span>
        </Link>
        <Link className="!text-[#60dda2]" href="/master-plan">
          ▥<span>ТӨСЛҮҮД</span>
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
