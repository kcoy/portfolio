import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNeighbors, getProject, projects } from "@/content/projects";
import { Blocks } from "@/components/case/blocks";
import { Shot } from "@/components/shot";
import { Reveal, SplitLines } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.tagline} ${p.role}, ${p.year}.`,
    openGraph: { title: `${p.title} — Kevin Coy`, description: p.tagline },
  };
}

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();
  const { prev, next } = getNeighbors(p.slug);
  const n = projects.indexOf(p) + 1;

  const meta = [
    ["Client", p.client],
    ["Year", p.year],
    ["Role", p.role],
    ["Platform", p.platform],
  ];

  return (
    <article>
      <header className="wrap pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))]">
        <nav aria-label="Breadcrumb" className="eyebrow flex gap-3 text-ink-2">
          <Link href="/work" className="link-u">Work</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">
            {String(n).padStart(2, "0")} {p.title}
          </span>
        </nav>
        <h1 className="display mt-8 text-[clamp(3.5rem,13vw,13rem)]">
          <SplitLines animateOnMount lines={[p.title]} />
        </h1>
        <div className="page-in" style={{ animationDelay: "0.25s" }}>
          <p className="mt-6 max-w-[30ch] text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.15] tracking-[-0.025em]">
            {p.tagline}
          </p>
        </div>
        <div className="page-in" style={{ animationDelay: "0.35s" }}>
          <dl className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/15 pt-6 lg:grid-cols-5">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow text-ink-3">{k}</dt>
                <dd className="mt-2 text-[0.95rem] leading-snug">{v}</dd>
              </div>
            ))}
            <div className="col-span-2 lg:col-span-1">
              <dt className="eyebrow text-ink-3">Disciplines</dt>
              <dd className="mt-2 text-[0.95rem] leading-snug">{p.disciplines.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div
        className="relative pb-[clamp(3rem,7vw,6rem)] pt-[clamp(3rem,7vw,6rem)]"
        style={{ background: p.theme.ground }}
      >
        <div className="clip-up wrap max-w-[82rem]" style={{ animationDelay: "0.3s" }}>
          <div className="rounded-[10px]" style={{ boxShadow: p.theme.glow }}>
            <Shot
              media={p.cover}
              preload
              showCaption={false}
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
        </div>
      </div>

      <section className="wrap grid gap-10 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:gap-8">
        <p className="eyebrow pt-3 text-ink-2 lg:col-span-3">Overview</p>
        <Reveal className="lg:col-span-6 lg:col-start-4">
          <p className="text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.25] tracking-[-0.025em]">{p.intro}</p>
        </Reveal>
        {p.outcome && (
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-ink-2">{p.outcome.label}</p>
              <p className="display mt-3 text-[clamp(3.5rem,6vw,5.5rem)] text-accent">{p.outcome.value}</p>
              <p className="mt-2 text-sm text-ink-2">{p.outcome.note}</p>
            </div>
          </Reveal>
        )}
      </section>

      <Blocks blocks={p.blocks} />

      <nav aria-label="More projects" className="mt-[clamp(6rem,12vw,10rem)]">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="Next"
          className="group relative block overflow-hidden"
          style={{ background: next.theme.ground, color: next.theme.ink }}
        >
          <div className="wrap relative z-10 grid gap-8 py-[clamp(4rem,10vw,8rem)] lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow opacity-70">Next project</p>
              <p className="display mt-6 text-[clamp(2.75rem,7vw,7.5rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                {next.title}&nbsp;<span aria-hidden className="serif-i">→</span>
              </p>
              <p className="mt-4 max-w-[36ch] opacity-80">{next.tagline}</p>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <div className="translate-y-10 overflow-hidden rounded-md shadow-2xl transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
                <Image src={next.cover.src} alt="" sizes="40vw" placeholder="blur" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </Link>
        <div className="wrap flex justify-between py-6 text-sm">
          <Link href={`/work/${prev.slug}`} className="link-u">← {prev.title}</Link>
          <Link href="/work" className="link-u">All work</Link>
        </div>
      </nav>
    </article>
  );
}
