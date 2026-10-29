import Link from "next/link";
import { recent } from "@/content/projects";
import { capabilities, experience } from "@/content/site";
import { Reveal, SplitLines } from "../reveal";
import { Placeholder } from "../placeholder";

/* Facts strip — every number is from the résumé */
const facts = [
  { value: "15+", label: "Years designing SaaS and web products" },
  { value: "500K+", label: "Users on the SportsEngine platform" },
  { value: "~25%", label: "Faster task completion — enterprise support workflows" },
  { value: "150+", label: "Client websites led at Velocity Services" },
];

export function Facts() {
  return (
    <section aria-label="At a glance" className="wrap">
      <ul className="grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal
            as="li"
            key={f.value}
            delay={i * 0.06}
            className={`border-b border-ink/15 py-8 pr-6 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${
              i % 2 === 1 ? "border-l pl-6 lg:pl-6" : ""
            }`}
          >
            <p className="display text-[clamp(2.75rem,5vw,4.5rem)]">{f.value}</p>
            <p className="mt-3 max-w-[22ch] text-sm leading-snug text-ink-2">{f.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function RecentPractice() {
  return (
    <section aria-labelledby="recent-title" className="wrap py-[clamp(5rem,10vw,9rem)]">
      <div className="grid gap-8 lg:grid-cols-12">
        <p className="eyebrow text-ink-2 lg:col-span-3">Recent practice</p>
        <h2 id="recent-title" className="display text-[clamp(2.5rem,6vw,6rem)] lg:col-span-9">
          <SplitLines
            lines={[
              "Designing",
              <>
                with <span className="serif-i">AI.</span>
              </>,
            ]}
          />
        </h2>
      </div>

      <ol className="mt-[clamp(3rem,6vw,5rem)] border-t border-ink">
        {recent.filter((r) => !r.project).map((r, i) => (
          <Reveal as="li" key={r.title} className="border-b border-ink/15">
            <div className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-8">
              <p className="eyebrow text-ink-2 lg:col-span-1">0{i + 1}</p>
              <div className="lg:col-span-4">
                <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                  {r.title}
                </h3>
                <p className="mt-3 text-ink-2">
                  {r.context}
                  {r.period && <span className="text-ink-3"> · {r.period}</span>}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <li key={t} className="eyebrow rounded-full bg-paper-2 px-3 py-1.5 text-ink-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="space-y-3 text-[1.02rem] leading-snug lg:col-span-4">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <Placeholder
                className="lg:col-span-3"
                label="Project visuals"
                note={r.assetsNeeded}
                ratio="4/3"
              />
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Capabilities() {
  return (
    <section aria-labelledby="cap-title" className="bg-paper-2 py-[clamp(5rem,10vw,9rem)]">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-ink-2 lg:col-span-3">Capabilities</p>
          <h2 id="cap-title" className="display text-[clamp(2.5rem,6vw,6rem)] lg:col-span-9">
            <SplitLines
              lines={[
                "Strategy to pixels",
                <>
                  to <span className="serif-i">production.</span>
                </>,
              ]}
            />
          </h2>
        </div>
        <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 0.08} className="group border-t border-ink/20 pb-12 pt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[1.35rem] font-medium tracking-[-0.03em]">{c.title}</h3>
                <span className="eyebrow text-ink-3 transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 max-w-[38ch] leading-relaxed text-ink-2">{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ExperienceList({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="border-t border-ink">
      {experience.map((r) => {
        const years = `${r.start.slice(-4)}–${r.end === "Present" ? "Now" : r.end.slice(-4)}`;
        const row = (
          <div className="grid grid-cols-12 gap-x-4 gap-y-1 py-5 transition-colors sm:py-6">
            <p className="col-span-12 font-mono text-xs text-ink-2 sm:col-span-2 sm:pt-1.5">{years}</p>
            <div className="col-span-12 sm:col-span-6">
              <p className="text-[1.15rem] font-medium tracking-[-0.02em]">{r.title}</p>
              <p className="text-ink-2">
                {r.company}
                {r.location && <span className="text-ink-3"> · {r.location}</span>}
              </p>
            </div>
            {!compact && (
              <ul className="col-span-12 mt-2 space-y-1 text-[0.95rem] text-ink-2 sm:col-span-4 sm:mt-0">
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {compact && r.project && (
              <p className="eyebrow col-span-12 self-center text-accent sm:col-span-4 sm:text-right">
                Case study →
              </p>
            )}
          </div>
        );
        return (
          <li key={r.company + r.start} className="border-b border-ink/15">
            {r.project ? (
              <Link href={`/work/${r.project}`} className="block hover:bg-paper-2/70">
                {row}
              </Link>
            ) : (
              row
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-title" className="wrap py-[clamp(5rem,10vw,9rem)]">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow text-ink-2">About</p>
          <h2 id="about-title" className="mt-6 text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em]">
            A designer who can build, working where the{" "}
            <span className="serif-i text-accent">systems</span> get complicated.
          </h2>
          <p className="mt-6 max-w-[44ch] leading-relaxed text-ink-2">
            I started out building websites end to end, led design for 150+ client sites, then moved
            into product: e-commerce search, a sports SaaS platform with half a million users, and
            enterprise customer-support portals on Oracle Service Cloud. Lately I&apos;m folding AI
            tools into how I research, write and prototype.
          </p>
          <Link href="/about" className="group mt-8 inline-flex items-center gap-3 font-medium">
            <span className="link-u">More about me</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="eyebrow text-ink-2">Experience</p>
            <Link href="/resume" className="eyebrow link-u">Full résumé</Link>
          </div>
          <ExperienceList compact />
        </div>
      </div>
    </section>
  );
}
