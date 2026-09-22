import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link
      className="inline-flex items-center gap-2.5 text-[18px] font-extrabold tracking-[-.02em] min-[761px]:text-[22px]"
      href="/"
      aria-label="Гүнд Саплай нүүр хуудас"
    >
      <img
        className="size-9 object-contain min-[761px]:size-[42px]"
        src="/good-supply-logo.png"
        alt=""
      />
      <span>ГҮНД САПЛАЙ</span>
    </Link>
  );
}
