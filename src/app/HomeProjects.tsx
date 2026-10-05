import Link from "next/link";
import DataNotice from "./data-notice";
import { glassClass, kickerClass, primaryButtonClass, secondaryButtonClass } from "./ui";
import type { Project } from "@/lib/catalog";

type Props = { projects: Project[]; error: boolean };

export default function HomeProjects({ projects, error }: Props) {
  return (
    <>
          <section
            id="projects"
            className="bg-[#060c1d] px-[clamp(20px,7vw,120px)] py-[100px] max-[760px]:px-4 max-[760px]:py-[72px] in-data-[theme=light]:bg-[#e8eef6]"
          >
            <span className={kickerClass}>ОНЦЛОХ ТӨСЛҮҮД</span>
            <h2 className="mb-10 mt-2.5 text-[clamp(30px,3.5vw,48px)] tracking-[-.03em]">
              Шилдэг Бүтээн Байгуулалтууд
            </h2>
            <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
              <DataNotice error={error} empty={projects.length === 0} />
              {projects.map((project) => (
                <article
                  className="group relative h-[670px] overflow-hidden rounded-[14px] max-[760px]:h-[480px] after:absolute after:inset-x-0 after:bottom-0 after:top-[35%] after:bg-gradient-to-b after:from-transparent after:to-[#060c1d] after:content-['']"
                  key={project.name}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <span className="absolute right-5 top-5 z-[3] rounded-full border border-[var(--brand-accent)]/50 bg-[#071a30]/70 px-3.5 py-[7px] text-[11px] font-extrabold text-[color:var(--brand-accent)]">
                    {project.status}
                  </span>
                  <div className="absolute inset-x-8 bottom-8 z-[3] max-[760px]:inset-x-[18px] max-[760px]:bottom-5">
                    <h3 className="mb-2.5 text-[32px] max-[760px]:text-[26px]">
                      {project.name}
                    </h3>
                    <p className="mb-6 text-[#b7c0d2]">⌖ {project.meta}</p>
                    <Link
                      className={`${secondaryButtonClass} w-full`}
                      href="/master-plan"
                    >
                      ДЭЛГЭРЭНГҮЙ ҮЗЭХ
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="px-[clamp(20px,7vw,120px)] py-[100px] text-center max-[760px]:px-4 max-[760px]:py-[72px]">
            <div
              className={`${glassClass} mx-auto max-w-[1020px] rounded-[20px] px-[50px] py-[70px] max-[760px]:px-5 max-[760px]:py-[46px]`}
            >
              <div className="text-[58px] text-[color:var(--brand-accent)]">
                ♧
              </div>
              <h2 className="mb-10 text-[clamp(30px,3.5vw,48px)] tracking-[-.03em]">
                Төслийн нэгдсэн төлөвлөгөө
              </h2>
              <p className="mx-auto mb-8 max-w-[680px] leading-[1.7] text-[#b7c0d2] in-data-[theme=light]:text-[#526078]">
                Манай бүх төслүүдийн байршил, дэд бүтэц болон ирээдүйн
                өргөтгөлийн төлөвлөгөөг интерактив газрын зургаас харна уу.
              </p>
              <Link className={primaryButtonClass} href="/master-plan">
                МАСТЕР ТӨЛӨВЛӨГӨӨ ҮЗЭХ
              </Link>
            </div>
          </section>
    </>
  );
}
