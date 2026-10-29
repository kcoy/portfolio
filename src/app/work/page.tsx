import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { WorkIndex } from "@/components/work-index";
import { RecentPractice } from "@/components/home/sections";
import { SplitLines, Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product, e-commerce and multi-brand design work by Kevin Coy.",
};

export default function WorkPage() {
  return (
    <>
      <section className="wrap pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))]">
        <div className="grid gap-8 lg:grid-cols-12">
          <h1 className="display text-[clamp(3.5rem,13vw,13rem)] lg:col-span-9">
            <SplitLines animateOnMount lines={["Work"]} />
          </h1>
          <Reveal delay={0.2} className="self-end lg:col-span-3">
            <p className="text-ink-2">
              Case studies built from the screens that shipped. Recent enterprise and AI work is
              listed below.
            </p>
          </Reveal>
        </div>
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <WorkIndex projects={projects} />
        </div>
      </section>
      <RecentPractice />
    </>
  );
}
