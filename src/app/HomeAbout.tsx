import { homeStyles } from "./home-styles";
import Image from "next/image";
import Link from "next/link";
import { aboutSections } from "./about-content";

function Content({ paragraphs }: { paragraphs: string[] }) {
  const blocks = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i];
    if (text.startsWith("•")) {
      const items = [];
      while (i < paragraphs.length && paragraphs[i].startsWith("•")) {
        items.push(paragraphs[i].replace(/^•\s*/, ""));
        i++;
      }
      i--;
      blocks.push(<ul key={i}>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>);
    } else {
      blocks.push(<p key={i}>{text}</p>);
    }
  }
  return <div className={[homeStyles["home-company-copy"]].join(" ")}>{blocks}</div>;
}

const milestones = [
  ["2019", "Hunnu Villa", "Компани байгуулагдаж, барилгын салбарын бодит туршлага хуримтлуулсан."],
  ["2021", "Green Art", "Туслан гүйцэтгэгчээр ажиллаж, томоохон төслийн туршлагаа өргөжүүлсэн."],
  ["2022", "Sunset", "Барилга угсралт, зохион байгуулалт, чанарын гүйцэтгэлийн туршлагаа бэхжүүлсэн."],
  ["2023", "Luxury Residence", "Анхны бие даасан бүтээн байгуулалтын төслөө хэрэгжүүлж эхэлсэн."],
  ["2026", "Бүрэн дууссан", "Зайсан дахь Luxury Residence төслийн бүтээн байгуулалтыг бүрэн дуусгасан."],
];

export default function HomeAbout() {
  const projectStart = aboutSections.findIndex((section) => section.title === "HUNNU VILLA · 2019");
  const company = aboutSections.slice(1, projectStart);
  const projects = aboutSections.slice(projectStart);
  const valueStart = company.findIndex((section) => section.title === "ЧАНАР");
  const values = company.slice(valueStart, valueStart + 6);
  const otherSections = company.filter((section) => !values.includes(section) && section.title !== "БИДНИЙ УРИА");

  return (
    <section id="about" className={["home-about"].join(" ")}>
      <div className={[homeStyles["home-about-inner"]].join(" ")}>
        <div className={[homeStyles["home-about-heading"]].join(" ")} data-scroll-reveal>
          <div><p className={[homeStyles["home-eyebrow"]].join(" ")}>КОМПАНИЙН ТУХАЙ · 2019 ОНООС</p><h2>Гүнд Саплай<br /><em>ХХК</em></h2></div>
          <Content paragraphs={aboutSections[0].paragraphs} />
        </div>
        <div className={[homeStyles["home-about-statement"], homeStyles["home-company-motto"]].join(" ")} data-scroll-reveal>
          <span>БИДНИЙ УРИА</span><p>Өнөөдөр бүтээж.<br /><em>Маргааш төлөвлөж.</em><br />Ирээдүйг өнгөлнө.</p>
        </div>
        <div className={[homeStyles["home-company-grid"]].join(" ")}>
          {otherSections.map((section) => <article key={section.title} data-scroll-reveal><h3>{section.title}</h3><Content paragraphs={section.paragraphs} /></article>)}
        </div>
        <div className={["home-about-values"].join(" ")} data-scroll-reveal>
          <div className={[homeStyles["home-section-heading"]].join(" ")}><div><p className={[homeStyles["home-eyebrow"]].join(" ")}>БИДНИЙ ҮНЭТ ЗҮЙЛС</p><h2>Бидний ажиллах зарчим</h2></div></div>
          <div className={[homeStyles["home-values-grid"]].join(" ")}>{values.map((section, index) => <article key={section.title}><span>0{index + 1} /</span><h3>{section.title}</h3><Content paragraphs={section.paragraphs} /></article>)}</div>
        </div>
        <div className={[homeStyles["home-company-experience"]].join(" ")} data-scroll-reveal>
          <p className={[homeStyles["home-eyebrow"]].join(" ")}>ТӨСӨЛ, АЖЛЫН ТУРШЛАГА</p><h2>Бидний хөгжлийн замнал</h2>
          <div className={[homeStyles["home-history"]].join(" ")}>{milestones.map(([year, title, detail]) => <article key={year}><span>{year}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
          <p className={[homeStyles["home-company-path"]].join(" ")}>Туслан гүйцэтгэгч → Бие даасан үл хөдлөх хөрөнгийн хөгжүүлэгч</p>
        </div>
        <div className={[homeStyles["home-about-residence"]].join(" ")} data-scroll-reveal>
          <div className={[homeStyles["home-about-photo"]].join(" ")}><Image src="/luxury.JPG" alt="Зайсан дахь Luxury Residence хотхон" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div className={[homeStyles["home-about-residence-body"]].join(" ")}><p className={[homeStyles["home-eyebrow"]].join(" ")}>2023–2026 · ЗАЙСАН</p><h3>Luxury Residence</h3><p>Анхны бие даасан бүтээн байгуулалт. Чанартай барилгаас — чанартай амьдрал руу.</p><div className={[homeStyles["home-about-stats"]].join(" ")}><div><strong>3.8<small> га</small></strong><span>Төслийн талбай</span></div><div><strong>5</strong><span>Орон сууцны блок</span></div><div><strong>22</strong><span>Амины орон сууц</span></div></div><Link href="/master-plan" className={[homeStyles["home-card-link"]].join(" ")}>Хотхонтой танилцах <span>↗</span></Link></div>
        </div>
        <div className={[homeStyles["home-company-details"]].join(" ")}>
          {projects.map((section, index) => <details key={`${section.title}-${index}`} open={index === 3}><summary>{section.title}<span aria-hidden="true">+</span></summary><Content paragraphs={section.paragraphs} /></details>)}
        </div>
      </div>
    </section>
  );
}
