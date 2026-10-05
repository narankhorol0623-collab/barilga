import Link from "next/link";
import ContactForm from "./ContactForm";
import BrandLogo from "./brand-logo";
import { bottomNavClass } from "./ui";

export default function HomeFooter() {
  return (
    <>
        <ContactForm />
        <footer className="flex justify-evenly items-center gap-10 border-t border-white/7 bg-[#060c1d] px-[clamp(20px,7vw,120px)] py-[52px] max-[760px]:grid-cols-1 max-[760px]:pb-[110px] max-[760px]:text-center in-data-[theme=light]:bg-[#e8eef6]">
          <div className="space-y-4">
            <BrandLogo />
            <p className="leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">
              Өндөр зэрэглэлийн үл хөдлөх хөрөнгийн зах зээлд тэргүүлэгч.
            </p>
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
          <Link href="#">
            ▱<span>ХАДГАЛСАН</span>
          </Link>
        </nav>
    </>
  );
}
