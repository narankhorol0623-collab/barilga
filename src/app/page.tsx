import { getProjects } from "@/lib/catalog";
import HomeIntro from "./HomeIntro";
import HomeProjects from "./HomeProjects";
import HomeFooter from "./HomeFooter";
import ScrollReveal from "./ScrollReveal";

export default async function Home() {
  const { data: projects, error } = await getProjects();

  return (
    <div data-theme="light" className="relative z-10">
      <ScrollReveal />
      <HomeIntro />
      <main>
        <HomeProjects projects={projects} error={error} />
      </main>
      <HomeFooter />
    </div>
  );
}
