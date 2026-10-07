import { homeStyles } from "./home-styles";
import Image from "next/image";
import Link from "next/link";

export default function HomeIntro() {
  return (
    <>
      <header className={[homeStyles["home-header"]].join(" ")}>
        <Link href="/" className={[homeStyles["home-brand"]].join(" ")} aria-label="Гүнд Саплай нүүр хуудас">
          <Image src="/gund-supply-logo.webp" alt="" width={78} height={48} priority />
          <span>ГҮНД САПЛАЙ<small>ENGINEERING & CONSTRUCTION</small></span>
        </Link>
        <nav aria-label="Үндсэн цэс">
          <Link href="/" aria-current="page">Нүүр</Link>
          <a href="#projects">Төслүүд</a>
          <a href="#about">Бидний тухай</a>
          <a className={["home-nav-contact"].join(" ")} href="#contact">Холбоо барих ↗</a>
        </nav>
      </header>
      <section className={[homeStyles["home-hero"]].join(" ")}>
        <Image src="/luxury.JPG" alt="Luxury Residence хотхоны барилгууд" fill priority sizes="100vw" className={[homeStyles["home-hero-image"]].join(" ")} />
        <div className={[homeStyles["home-hero-shade"]].join(" ")} />
        <div className={[homeStyles["home-hero-content"]].join(" ")}>
          <p className={[homeStyles["home-eyebrow"]].join(" ")}>ГҮНД САПЛАЙ ХХК · 2023 ОНООС</p>
          <h1>Өнөөдрийн бүтээн байгуулалт.<br /><em>Маргаашийн үнэ цэн.</em></h1>
          <p className={[homeStyles["home-hero-description"]].join(" ")}>Инженерийн оновчтой шийдэл, чанартай гүйцэтгэлээр<br className="hidden sm:block" /> таны амьдрах орчныг бүтээнэ.</p>
          <div className={[homeStyles["home-actions"]].join(" ")}>
            <Link className={[homeStyles["home-button"]].join(" ")} href="/master-plan">Luxury Residence · Байраа сонгох <span>↗</span></Link>
            <a className={[homeStyles["home-text-link"]].join(" ")} href="#projects">Төслүүдтэй танилцах <span>↓</span></a>
          </div>
        </div>
        <div className={[homeStyles["home-hero-caption"]].join(" ")}><span className={[homeStyles["home-live-dot"]].join(" ")} /> БОРЛУУЛАЛТ ҮРГЭЛЖИЛЖ БАЙНА <strong>Luxury Residence</strong><span>Зайсан · Хан-Уул дүүрэг</span></div>
      </section>
      <section className={[homeStyles["home-pillars"]].join(" ")} aria-label="Бидний чиглэл">
        {[
          ["01", "Орон сууцны хөгжил", "Тав тухтай амьдралд зориулсан орчин үеийн хотхон."],
          ["02", "Инженерийн шийдэл", "Төлөвлөлтөөс гүйцэтгэл хүртэлх цогц бүтээн байгуулалт."],
          ["03", "Тогтвортой үнэ цэн", "Чанар, хариуцлагад тулгуурласан урт хугацааны хөгжил."],
        ].map(([number, title, detail]) => <article key={number}><span>{number} /</span><h2>{title}</h2><p>{detail}</p></article>)}
      </section>
    </>
  );
}
