import Image from "next/image";
import Link from "next/link";
import { projects, type Media, type Project } from "@/content/projects";
import { BrowserFrame } from "../browser-frame";
import { ClipReveal, Reveal, SplitLines } from "../reveal";
import { HScroll } from "../hscroll";
import { Parallax } from "../parallax";
import { Film } from "../film";

function Frame({
  project,
  media,
  sizes,
  tone = "light",
  className = "",
}: {
  project: Project;
  media: Media;
  sizes: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      tabIndex={-1}
      aria-hidden
      className={`group block ${className}`}
    >
      <BrowserFrame address={media.browser} tone={tone}>
        <div className="overflow-hidden">
          <Image
            src={media.src}
            alt=""
            sizes={sizes}
            placeholder="blur"
            className="h-auto w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
          />
        </div>
      </BrowserFrame>
    </Link>
  );
}

function Meta({
  project,
  n,
  light = false,
  narrow = false,
}: {
  project: Project;
  n: number;
  light?: boolean;
  /** Title sits in a narrow column beside imagery */
  narrow?: boolean;
}) {
  return (
    <div className={`${light ? "text-current" : ""}`}>
      <p className="eyebrow flex gap-4 opacity-70">
        <span>{String(n).padStart(2, "0")}</span>
        <span>{project.year}</span>
      </p>
      <h3
        className={`display mt-4 ${
          narrow ? "text-[clamp(2.75rem,5.2vw,5.25rem)]" : "text-[clamp(2.75rem,7vw,7rem)]"
        }`}
      >
        <Link href={`/work/${project.slug}`} className="hover:opacity-80">
          {project.title}
        </Link>
      </h3>
      <p className="mt-5 max-w-[34ch] text-[1.05rem] leading-snug opacity-80">{project.tagline}</p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Disciplines">
        {project.disciplines.map((d) => (
          <li key={d} className="eyebrow rounded-full border border-current/25 px-3 py-1.5 opacity-80">
            {d}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm opacity-70">
        <span className="eyebrow mr-2">Role</span>
        {project.role}
      </p>
      <Link
        href={`/work/${project.slug}`}
        className="group mt-8 inline-flex items-center gap-3 text-[0.95rem] font-medium"
      >
        <span className="link-u">View case study</span>
        <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}

/* 01 — Full-bleed brand ground, oversized browser, offset brand plate */
function BrandBleed({ project, n }: { project: Project; n: number }) {
  return (
    <article
      className="relative overflow-hidden py-[clamp(4rem,9vw,8rem)]"
      style={{ background: project.theme.ground, color: project.theme.ink }}
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4 lg:pt-8">
          <Meta project={project} n={n} light narrow />
        </Reveal>
        <div className="relative lg:col-span-8">
          <ClipReveal bleed={project.theme.glow ? 60 : 0}>
            <div className="rounded-[10px]" style={{ boxShadow: project.theme.glow }}>
              <Frame project={project} media={project.cover} sizes="(min-width:1024px) 62vw, 100vw" />
            </div>
          </ClipReveal>
          <Parallax offset={60} className="relative z-10 -mt-[14%] ml-auto w-[58%] sm:mr-[6.5%] sm:w-[46%]">
            <Frame
              project={project}
              media={project.showcase[1]}
              sizes="(min-width:1024px) 30vw, 60vw"
              className="shadow-[0_40px_80px_-30px_rgba(0,0,0,.5)]"
            />
          </Parallax>
        </div>
      </div>
      {project.slogan && (
        <Parallax offset={-30} className="wrap mt-[clamp(1rem,4vw,3rem)]">
          <p
            aria-hidden
            className="serif-i text-[clamp(3rem,11vw,11rem)] sm:whitespace-nowrap leading-none opacity-90"
          >
            {project.slogan}
          </p>
        </Parallax>
      )}
    </article>
  );
}

/* 02 — Horizontal sequence of frames */
function Sequence({ project, n }: { project: Project; n: number }) {
  const frames = [project.cover, ...project.showcase];
  return (
    <article className="bg-paper py-[clamp(4rem,9vw,8rem)] text-ink">
      <div className="wrap grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Meta project={project} n={n} />
        </Reveal>
        {project.outcome && (
          <Reveal delay={0.1} className="self-end lg:col-span-4 lg:col-start-9">
            <div className="border-t border-ink/20 pt-5">
              <p className="eyebrow text-ink-2">{project.outcome.label}</p>
              <p className="display mt-3 text-[clamp(4rem,9vw,8rem)] text-accent">{project.outcome.value}</p>
              <p className="mt-3 max-w-[30ch] text-ink-2">{project.outcome.note}</p>
            </div>
          </Reveal>
        )}
      </div>
      <div className="mt-[clamp(2.5rem,5vw,4rem)]">
        <HScroll label={`${project.title} screens`}>
          {frames.map((m, i) => (
            <div key={i} className="w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-[46vw]">
              <Frame project={project} media={m} sizes="(min-width:1024px) 46vw, 84vw" />
              <p className="mt-3 text-sm text-ink-2">{m.alt}</p>
            </div>
          ))}
        </HScroll>
      </div>
    </article>
  );
}

/* 03 — Asymmetric split: sticky copy, stacked offset plates */
function Split({ project, n }: { project: Project; n: number }) {
  return (
    <article
      className="py-[clamp(4rem,9vw,8rem)]"
      style={{ background: project.theme.ground, color: project.theme.ink }}
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <Reveal>
              <Meta project={project} n={n} narrow />
            </Reveal>
          </div>
        </div>
        <div className="space-y-[clamp(2rem,5vw,4rem)] lg:col-span-8">
          <ClipReveal>
            <Frame project={project} media={project.cover} sizes="(min-width:1024px) 62vw, 100vw" />
          </ClipReveal>
          <div className="grid items-end gap-[clamp(1rem,3vw,2.5rem)] sm:grid-cols-12">
            <Reveal className="sm:col-span-7">
              <Frame project={project} media={project.showcase[1]} sizes="(min-width:1024px) 36vw, 100vw" />
            </Reveal>
            <Reveal delay={0.12} className="sm:col-span-5 sm:-mb-16">
              <Frame project={project} media={project.showcase[0]} sizes="(min-width:1024px) 26vw, 100vw" />
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}

/* 04 — Dark stage: one template, many brands, fanned */
function Fan({ project, n }: { project: Project; n: number }) {
  const [a, b, c] = project.showcase;
  return (
    <article
      className="overflow-hidden py-[clamp(4rem,9vw,8rem)]"
      style={{ background: project.theme.ground, color: project.theme.ink }}
    >
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Meta project={project} n={n} light />
        </Reveal>
        {project.outcome && (
          <Reveal delay={0.1} className="self-end lg:col-span-4 lg:col-start-9">
            <div className="border-t border-current/20 pt-5">
              <p className="eyebrow opacity-60">{project.outcome.label}</p>
              <p className="display mt-3 text-[clamp(4rem,9vw,8rem)]" style={{ color: project.theme.accent }}>
                {project.outcome.value}
              </p>
              <p className="mt-3 max-w-[30ch] opacity-70">{project.outcome.note}</p>
            </div>
          </Reveal>
        )}
      </div>
      <div className="wrap mt-[clamp(3rem,7vw,6rem)] grid gap-6 sm:grid-cols-3 sm:gap-4">
        {[a, b, c].map((m, i) => (
          <Reveal key={i} delay={i * 0.1} y={60}>
            <div
              className={`transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-3 ${
                i === 1 ? "sm:translate-y-12" : ""
              }`}
            >
              <Frame project={project} media={m} tone="dark" sizes="(min-width:640px) 32vw, 100vw" />
              <p className="eyebrow mt-3 opacity-50">{m.browser}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </article>
  );
}

/* 05 — Phone lineup: one pattern across many brands, staggered */
function Lineup({ project, n }: { project: Project; n: number }) {
  return (
    <article
      className="overflow-hidden py-[clamp(4rem,9vw,8rem)]"
      style={{ background: project.theme.ground, color: project.theme.ink }}
    >
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Meta project={project} n={n} />
        </Reveal>
        {project.outcome && (
          <Reveal delay={0.1} className="self-end lg:col-span-4 lg:col-start-9">
            <div className="border-t border-current/20 pt-5">
              <p className="eyebrow opacity-60">{project.outcome.label}</p>
              <p className="display mt-3 text-[clamp(4rem,9vw,8rem)]" style={{ color: project.theme.accent }}>
                {project.outcome.value}
              </p>
              <p className="mt-3 max-w-[30ch] opacity-70">{project.outcome.note}</p>
            </div>
          </Reveal>
        )}
      </div>
      <div className="wrap mt-[clamp(3rem,7vw,6rem)] grid grid-cols-2 items-start gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {project.showcase.slice(0, 5).map((m, i) => (
          <Reveal
            key={i}
            delay={i * 0.08}
            y={60}
            className={`${i % 2 === 1 ? "mt-10 lg:mt-20" : ""} ${i === 3 ? "sm:hidden lg:block" : ""} ${
              i === 4 ? "hidden lg:block" : ""
            }`}
          >
            <Link
              href={`/work/${project.slug}`}
              data-cursor="View"
              tabIndex={-1}
              aria-hidden
              className="group block aspect-[5/7] overflow-hidden rounded-[16px] bg-white shadow-[0_30px_60px_-30px_rgba(20,30,50,.45)] ring-1 ring-black/[.06] transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-3"
            >
              <Image
                src={m.src}
                alt=""
                sizes="(min-width:1024px) 18vw, (min-width:640px) 30vw, 45vw"
                placeholder="blur"
                className="h-full w-full object-cover object-top"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </article>
  );
}

/* 06 — Product stage: dark ground, product shot, launch tiles, slogan */
function Stage({ project, n }: { project: Project; n: number }) {
  return (
    <article
      className="overflow-hidden py-[clamp(4rem,9vw,8rem)]"
      style={{ background: project.theme.ground, color: project.theme.ink }}
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4 lg:pt-8">
          <Meta project={project} n={n} light narrow />
        </Reveal>
        <div className="lg:col-span-8">
          <ClipReveal>
            <Link
              href={`/work/${project.slug}`}
              data-cursor="View"
              tabIndex={-1}
              aria-hidden
              className="group block overflow-hidden rounded-[12px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] ring-1 ring-white/10"
            >
              <Image
                src={(project.showcase[0] ?? project.cover).src}
                alt=""
                sizes="(min-width:1024px) 62vw, 100vw"
                placeholder="blur"
                className="h-auto w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
              />
            </Link>
          </ClipReveal>
          <div className="mt-[clamp(1rem,3vw,2rem)] grid grid-cols-3 gap-[clamp(0.5rem,2vw,1.5rem)]">
            {project.showcase.slice(1, 4).map((m, i) => (
              <Reveal key={i} delay={i * 0.08} y={40} className={i === 1 ? "sm:mt-10" : ""}>
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="View"
                  tabIndex={-1}
                  aria-hidden
                  className="block overflow-hidden rounded-[8px] transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-2"
                >
                  <Image src={m.src} alt="" sizes="(min-width:1024px) 20vw, 32vw" placeholder="blur" className="h-auto w-full" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      {project.slogan && (
        <Parallax offset={-30} className="wrap mt-[clamp(2rem,5vw,4rem)]">
          <p
            aria-hidden
            className="serif-i text-[clamp(3rem,10vw,10rem)] leading-none sm:whitespace-nowrap"
            style={{ color: project.theme.accent }}
          >
            {project.slogan}
          </p>
        </Parallax>
      )}
    </article>
  );
}

/* 07 — Reel: product film loop on a dark stage, web screens beneath */
function Reel({ project, n }: { project: Project; n: number }) {
  const [a, b] = project.showcase;
  return (
    <article
      className="overflow-hidden py-[clamp(4rem,9vw,8rem)]"
      style={{ background: project.theme.ground, color: project.theme.ink }}
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4 lg:pt-8">
          <Reveal>
            <Meta project={project} n={n} light narrow />
          </Reveal>
          {project.outcome && (
            <Reveal delay={0.1} className="mt-12 hidden border-t border-current/20 pt-5 lg:block">
              <p className="eyebrow opacity-60">{project.outcome.label}</p>
              <p className="display mt-3 text-[clamp(3.5rem,6vw,6rem)]" style={{ color: project.theme.accent }}>
                {project.outcome.value}
              </p>
              <p className="mt-3 max-w-[26ch] opacity-70">{project.outcome.note}</p>
            </Reveal>
          )}
        </div>
        <div className="lg:col-span-8">
          {project.reel && (
            <ClipReveal>
              <Link
                href={`/work/${project.slug}`}
                data-cursor="View"
                tabIndex={-1}
                aria-hidden
                className="block overflow-hidden rounded-[12px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] ring-1 ring-white/10"
              >
                <Film film={project.reel} loop />
              </Link>
            </ClipReveal>
          )}
          <div className="mt-[clamp(1rem,3vw,2rem)] grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
            {[a, b].map((m, i) => (
              <Reveal key={i} delay={i * 0.1} y={40} className={i === 1 ? "mt-[clamp(1.5rem,5vw,4rem)]" : ""}>
                <Frame project={project} media={m} sizes="(min-width:1024px) 30vw, 48vw" className="overflow-hidden rounded-[8px]" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Each project gets the layout that suits its material; unknown slugs rotate. */
const layoutBySlug: Record<string, typeof BrandBleed> = {
  clientjam: Stage,
  helix: Lineup,
  sportngin: Reel,
  offerbuys: BrandBleed,
  pricegrabber: Sequence,
  citysearch: Split,
  velocity: Fan,
};
const fallback = [Sequence, Split, Fan];

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-0">
      <div className="bg-night text-paper">
        <div className="wrap grid gap-8 pb-[clamp(3rem,6vw,5rem)] pt-[clamp(5rem,10vw,9rem)] lg:grid-cols-12">
          <h2 id="work-title" className="display text-[clamp(3rem,9vw,9rem)] lg:col-span-8">
            <SplitLines lines={["Selected", <span key="w" className="serif-i">work</span>]} />
          </h2>
          <Reveal className="self-end lg:col-span-4">
            <p className="max-w-[38ch] text-paper/65">
              My own AI product, enterprise support, sports SaaS, e-commerce and multi-brand work —
              shown through real screens, prototypes and film. AI workflow practice follows below.
            </p>
            <p className="eyebrow mt-6 text-paper/40">
              {projects.length} projects · {projects.at(-1)!.year.slice(0, 4)}–{/present/i.test(projects[0].year) ? "Now" : projects[0].year.slice(-4)}
            </p>
          </Reveal>
        </div>
      </div>
      {projects.map((p, i) => {
        const Layout = layoutBySlug[p.slug] ?? fallback[i % fallback.length];
        return <Layout key={p.slug} project={p} n={i + 1} />;
      })}
    </section>
  );
}
