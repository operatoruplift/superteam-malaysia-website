import Hero from "@/components/Hero";
import PartnerLogos from "@/components/PartnerLogos";
import Mission from "@/components/Mission";
import Stats from "@/components/Stats";
import Events from "@/components/Events";
import Members from "@/components/Members";
import GlobalNetwork from "@/components/GlobalNetwork";
import WallOfLove from "@/components/WallOfLove";
import FAQ from "@/components/FAQ";
import Projects from "@/components/Projects";
import JoinCTA from "@/components/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerLogos />
      <Mission />
      <Stats />
      <Events />
      <Members />
      <GlobalNetwork />
      <WallOfLove />
      <FAQ />
      <Projects />
      <JoinCTA />
    </>
  );
}
