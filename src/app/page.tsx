import { getProjects } from "@/lib/catalog";
import HomeIntro from "./HomeIntro";
import HomeProjects from "./HomeProjects";
import HomeFooter from "./HomeFooter";

export default async function Home() {
  const { data: projects, error } = await getProjects();

  return (
    <div className="relative z-10">
      <HomeIntro />
      <main>
        <HomeProjects projects={projects} error={error} />
      </main>
      <HomeFooter />
    </div>
  );
}
