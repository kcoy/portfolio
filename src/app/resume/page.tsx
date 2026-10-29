import type { Metadata } from "next";
import Link from "next/link";
import { approach, capabilities, education, experience, site, summary, tools } from "@/content/site";
import { recent } from "@/content/projects";
import { Magnetic } from "@/components/magnetic";
import { SplitLines } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.role}.`,
};

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow mb-6 border-b border-ink pb-3 text-ink">{children}</h2>;
}

export default function ResumePage() {
  return (
    <div className="wrap pb-[clamp(5rem,10vw,9rem)] pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))]">
      <header className="grid gap-8 border-b border-ink/15 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow text-ink-2">Résumé</p>
          <h1 className="display mt-6 text-[clamp(3.5rem,11vw,10rem)]">
            <SplitLines animateOnMount lines={["Kevin Coy"]} />
          </h1>
          <p className="mt-4 text-[clamp(1.15rem,1.8vw,1.5rem)] tracking-[-0.02em]">
            {site.role} <span className="text-ink-3">· {site.focus}</span>
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 self-end lg:col-span-4 lg:items-end">
          <Magnetic>
            <a
              href={site.resumePdf}
              download
              className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-[0.95rem] font-medium text-paper transition-colors hover:bg-accent hover:text-ink"
            >
              Download PDF <span aria-hidden>↓</span>
            </a>
          </Magnetic>
          <a href={site.resumePdf} target="_blank" rel="noreferrer" className="link-u text-sm text-ink-2">
            Open in a new tab ↗
          </a>
        </div>
      </header>

      <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <aside className="space-y-10 lg:col-span-3">
          <section>
            <H>Contact</H>
            <ul className="space-y-1.5 text-[0.95rem]">
              <li><a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a className="link-u" href={site.linkedin} target="_blank" rel="noreferrer">{site.linkedinLabel}</a></li>
            </ul>
          </section>
          <section>
            <H>Core skills</H>
            <ul className="space-y-1.5 text-[0.95rem]">
              {capabilities.slice(0, 5).map((c) => <li key={c.title}>{c.title}</li>)}
              <li>End-to-End Product Design</li>
            </ul>
          </section>
          <section>
            <H>Tools & technology</H>
            <dl className="space-y-3 text-[0.95rem]">
              {tools.map((t) => (
                <div key={t.group}>
                  <dt className="text-ink-3 text-sm">{t.group}</dt>
                  <dd>{t.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <H>Approach</H>
            <ul className="space-y-1.5 text-[0.95rem]">{approach.map((a) => <li key={a}>{a}</li>)}</ul>
          </section>
          <section>
            <H>Education</H>
            <p className="text-[0.95rem] font-medium">{education.degree}</p>
            <p className="text-sm text-ink-2">{education.school}</p>
          </section>
        </aside>

        <div className="space-y-14 lg:col-span-8 lg:col-start-5">
          <section>
            <H>Summary</H>
            <div className="space-y-4 text-[1.1rem] leading-relaxed">
              {summary.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          <section>
            <H>Selected projects</H>
            <div className="space-y-8">
              {recent.map((r) => (
                <div key={r.title}>
                  <h3 className="text-[1.15rem] font-medium tracking-[-0.02em]">
                    {r.project ? (
                      <Link href={`/work/${r.project}`} className="link-u">
                        {r.title} <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      r.title
                    )}
                  </h3>
                  <p className="font-semibold text-accent">{r.context}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2 marker:text-accent">
                    {r.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <H>Experience</H>
            <div className="space-y-8">
              {experience.map((r) => (
                <div key={r.company + r.start} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="font-mono text-xs leading-6 text-ink-2">
                    {r.start} – {r.end}
                  </p>
                  <div>
                    <h3 className="text-[1.15rem] font-medium tracking-[-0.02em]">{r.title}</h3>
                    <p className="font-semibold text-accent">
                      {r.company}
                      {r.location && <span className="font-normal text-ink-3"> · {r.location}</span>}
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2 marker:text-accent">
                      {r.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
