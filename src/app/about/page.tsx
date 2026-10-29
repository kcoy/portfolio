import type { Metadata } from "next";
import Link from "next/link";
import { approach, education, site, summary, tools } from "@/content/site";
import { Capabilities, ExperienceList } from "@/components/home/sections";
import { Placeholder } from "@/components/placeholder";
import { Reveal, SplitLines } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap pb-[clamp(4rem,8vw,7rem)] pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))]">
        <p className="eyebrow text-ink-2">About</p>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,9rem)]">
          <SplitLines
            animateOnMount
            lines={[
              "Design that",
              <>
                survives <span className="serif-i text-accent">contact</span>
              </>,
              "with code.",
            ]}
          />
        </h1>

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Placeholder
              label="Portrait"
              note="Add a portrait or working photo (4:5, ≥1200px wide) at src/assets/about/portrait.jpg."
              ratio="4/5"
            />
          </div>
          <Reveal className="space-y-6 text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.45] tracking-[-0.012em] lg:col-span-7 lg:col-start-6">
            {summary.map((p, i) => (
              <p key={i} className={i > 0 ? "text-ink-2" : ""}>
                {p}
              </p>
            ))}
            <p className="text-ink-2">
              My path runs from building client websites line by line, to leading design for 150+
              sites at a media company, to e-commerce search at PriceGrabber, a sports SaaS platform
              at SportsEngine, and enterprise support portals on Oracle Service Cloud at Helix. That
              mix is the point: I design with a working knowledge of how things get built.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wrap grid gap-10 border-t border-ink/15 py-[clamp(3rem,6vw,5rem)] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="eyebrow text-ink-3">Tools</p>
          <dl className="mt-4 space-y-3">
            {tools.map((t) => (
              <div key={t.group}>
                <dt className="text-sm text-ink-2">{t.group}</dt>
                <dd>{t.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="eyebrow text-ink-3">Approach</p>
          <ul className="mt-4 space-y-1.5">
            {approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-ink-3">Education</p>
          <p className="mt-4">{education.degree}</p>
          <p className="text-ink-2">{education.school}</p>
        </div>
        <div>
          <p className="eyebrow text-ink-3">Elsewhere</p>
          <ul className="mt-4 space-y-1.5">
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-u">LinkedIn ↗</a>
            </li>
            <li>
              <Link href="/resume" className="link-u">Résumé</Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-u">{site.email}</a>
            </li>
          </ul>
        </div>
      </section>

      <Capabilities />

      <section className="wrap py-[clamp(5rem,10vw,9rem)]" aria-labelledby="exp-title">
        <div className="mb-10 flex items-baseline justify-between gap-6">
          <h2 id="exp-title" className="display text-[clamp(2.5rem,6vw,6rem)]">Experience</h2>
          <a href={site.resumePdf} download className="eyebrow link-u shrink-0">Download PDF ↓</a>
        </div>
        <ExperienceList />
      </section>
    </>
  );
}
