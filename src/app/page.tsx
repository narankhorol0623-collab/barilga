import { homeStyles } from "./home-styles";
import HomeIntro from "./HomeIntro";
import HomeProjects from "./HomeProjects";
import HomeFooter from "./HomeFooter";
import ScrollReveal from "./ScrollReveal";
import HomeAbout from "./HomeAbout";

export default function Home() {
  return (
    <div data-theme="light" className={[homeStyles["home-site"], "relative", "z-10"].join(" ")}>
      <ScrollReveal />
      <HomeIntro />
      <main>
        <HomeProjects />
        <HomeAbout />
      </main>
      <HomeFooter />
    </div>
  );
}
