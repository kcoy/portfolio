import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { AboutTeaser, Capabilities, Facts, RecentPractice } from "@/components/home/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Facts />
      <div className="h-[clamp(4rem,8vw,7rem)]" />
      <SelectedWork />
      <RecentPractice />
      <Capabilities />
      <AboutTeaser />
    </>
  );
}
