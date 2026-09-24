import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link className="inline-flex shrink-0 items-center" href="/" aria-label="Гүнд Саплай нүүр хуудас">
      <Image className="h-[54px] w-auto min-[761px]:h-[64px]" src="/gund-supply-logo.webp" alt="GUND SUPPLY LLC" width={1597} height={985} priority />
    </Link>
  );
}
