import { homeStyles } from "./home-styles";
import Image from "next/image";
import Link from "next/link";

const upcoming = [
  { name: "Vision Luxury Residence", detail: "Амьдралын шинэ хэмнэл. Шинэ хотхоны төсөл.", image: "/residence-master-plan-landscaped.png" },
  { name: "Шинэ төсөл", detail: "Төслийн нэр болон дэлгэрэнгүй мэдээллийг удахгүй зарлана.", image: "/luxury.JPG" },
];

export default function HomeProjects() {
  return (
    <section id="projects" className={[homeStyles["home-projects"]].join(" ")} data-scroll-reveal>
      <div className={[homeStyles["home-section-heading"]].join(" ")}>
        <div><p className={[homeStyles["home-eyebrow"]].join(" ")}>БИДНИЙ ТӨСЛҮҮД</p><h2>Амьдрах орчны<br /><em>шинэ боломжууд.</em></h2></div>
        <p>Өнөөдөр таныг хүлээж буй гэрээс<br />маргаашийн шинэ бүтээн байгуулалт хүртэл.</p>
      </div>
      <div className={[homeStyles["home-project-grid"]].join(" ")}>
        <article className={[homeStyles["home-project-card"]].join(" ")}>
          <Link href="/master-plan" className={[homeStyles["home-project-image"]].join(" ")} aria-label="Luxury Residence байраа сонгох">
            <Image src="/residence-master-plan-landscaped.png" alt="Luxury Residence хотхоны ерөнхий төлөвлөгөө" fill sizes="(max-width: 760px) 100vw, 33vw" />
            <span className={[homeStyles["home-status"]].join(" ")}><i /> Борлуулалт нээлттэй</span>
            <span className={[homeStyles["home-image-arrow"]].join(" ")}>↗</span>
          </Link>
          <div className={[homeStyles["home-project-body"]].join(" ")}><p className={[homeStyles["home-project-category"]].join(" ")}>ОРОН СУУЦНЫ ХОТХОН · ЗАЙСАН</p><h3>Luxury Residence</h3><p>Таны шинэ гэр. Тав тух, байгаль, орчин үеийн төлөвлөлт нэг дор.</p><Link href="/master-plan" className={[homeStyles["home-card-link"]].join(" ")}>Байраа сонгох <span>→</span></Link></div>
        </article>
        {upcoming.map(project => <article className={[homeStyles["home-project-card"], "home-upcoming"].join(" ")} key={project.name}>
          <div className={[homeStyles["home-project-image"]].join(" ")}>
            <Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" className={[homeStyles["home-blurred-image"]].join(" ")} />
            <div className={[homeStyles["home-coming-overlay"]].join(" ")}><span className={[homeStyles["home-coming-symbol"]].join(" ")}>◇</span><strong>COMING SOON</strong><span>Удахгүй танилцуулна</span></div>
            <span className={[homeStyles["home-status"], homeStyles["home-status-soon"]].join(" ")}>Төлөвлөж буй төсөл</span>
          </div>
          <div className={[homeStyles["home-project-body"]].join(" ")}><p className={[homeStyles["home-project-category"]].join(" ")}>ДАРААГИЙН БҮТЭЭН БАЙГУУЛАЛТ</p><h3>{project.name}</h3><p>{project.detail}</p><span className={[homeStyles["home-card-link"], homeStyles["home-soon-label"]].join(" ")}>Удахгүй <span>◷</span></span></div>
        </article>)}
      </div>
      <div className={[homeStyles["home-plan-banner"]].join(" ")}><div><p className={[homeStyles["home-eyebrow"]].join(" ")}>LUXURY RESIDENCE</p><h3>Танд тохирох байраа олоорой.</h3><p>Хотхоны зураг дээрээс блок, давхар, сууцаа сонгоно уу.</p></div><Link className={[homeStyles["home-button"]].join(" ")} href="/master-plan">Ерөнхий төлөвлөгөө үзэх ↗</Link></div>
    </section>
  );
}
