import type { Block } from "@/content/projects";
import { Shot } from "../shot";
import { Film } from "../film";
import { Compare } from "../compare";
import { HScroll } from "../hscroll";
import { Placeholder } from "../placeholder";
import { ClipReveal, Reveal } from "../reveal";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-[clamp(5rem,10vw,9rem)]">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case "text":
      return (
        <section className="wrap grid gap-6 lg:grid-cols-12 lg:gap-8">
          {b.kicker && <p className="eyebrow pt-2 text-ink-2 lg:col-span-3">{b.kicker}</p>}
          <Reveal className="lg:col-span-7 lg:col-start-4">
            <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              {b.heading}
            </h2>
            <div className="mt-6 max-w-[60ch] space-y-4 text-[1.1rem] leading-relaxed text-ink-2">
              {b.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </section>
      );

    case "image":
      return (
        <ClipReveal className={b.size === "full" ? "wrap" : "wrap max-w-[82rem]"}>
          <Shot media={b.media} sizes="(min-width: 1280px) 1200px, 100vw" />
        </ClipReveal>
      );

    case "pair":
      return (
        <section className="wrap">
          <div className="grid gap-[clamp(1rem,3vw,2.5rem)] md:grid-cols-2">
            <Reveal>
              <Shot media={b.items[0]} sizes="(min-width: 768px) 48vw, 100vw" />
            </Reveal>
            <Reveal delay={0.12} className="md:mt-[clamp(3rem,8vw,7rem)]">
              <Shot media={b.items[1]} sizes="(min-width: 768px) 48vw, 100vw" />
            </Reveal>
          </div>
          {b.caption && (
            <p className="mt-6 max-w-[56ch] text-[0.9rem] leading-relaxed text-ink-2">{b.caption}</p>
          )}
        </section>
      );

    case "gallery":
      return (
        <section>
          <div className="wrap mb-8 flex items-baseline justify-between gap-6">
            <h2 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-[-0.035em]">{b.heading}</h2>
            <p className="eyebrow text-ink-2">{b.items.length} frames · scroll →</p>
          </div>
          <HScroll label={b.heading}>
            {b.items.map((m, i) => (
              <div key={i} className="w-[86vw] shrink-0 snap-start sm:w-[64vw] lg:w-[52vw]">
                <Shot media={m} sizes="(min-width: 1024px) 52vw, 86vw" />
              </div>
            ))}
          </HScroll>
        </section>
      );

    case "compare":
      return (
        <section className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow text-ink-2">Compare</p>
            <h2 className="mt-4 text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              {b.heading}
            </h2>
            {b.body && <p className="mt-4 leading-relaxed text-ink-2">{b.body}</p>}
          </Reveal>
          <Reveal className="lg:col-span-9">
            <Compare before={b.before} after={b.after} labels={b.labels} />
          </Reveal>
        </section>
      );

    case "screens":
      return (
        <section className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            {b.kicker && <p className="eyebrow text-ink-2">{b.kicker}</p>}
            <h2 className="mt-4 text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              {b.heading}
            </h2>
            {b.body && <p className="mt-4 leading-relaxed text-ink-2">{b.body}</p>}
          </Reveal>
          <div className="lg:col-span-9">
            <div
              className={`grid items-start gap-[clamp(1rem,2.5vw,2rem)] ${
                b.items.length > 2 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 lg:max-w-[42rem]"
              }`}
            >
              {b.items.map((m, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.1}
                  className={`${i % 2 === 1 ? "mt-[clamp(1.5rem,5vw,4rem)]" : ""} ${
                    i === 2 ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:mt-0 md:w-auto" : ""
                  }`}
                >
                  <Shot
                    media={m}
                    sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
                    captionClassName="text-[0.8rem]"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      );

    case "tiles":
      return (
        <section className="wrap">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {b.kicker && <p className="eyebrow pt-2 text-ink-2 lg:col-span-3">{b.kicker}</p>}
            <Reveal className="lg:col-span-7 lg:col-start-4">
              <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                {b.heading}
              </h2>
              {b.body && <p className="mt-6 max-w-[60ch] text-[1.1rem] leading-relaxed text-ink-2">{b.body}</p>}
            </Reveal>
          </div>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)] md:grid-cols-3">
            {b.items.map((m, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <Shot
                  media={m}
                  sizes="(min-width: 768px) 32vw, 48vw"
                  className="overflow-hidden rounded-[8px]"
                />
              </Reveal>
            ))}
          </div>
        </section>
      );

    case "video":
      return (
        <section className="bg-night py-[clamp(4rem,9vw,8rem)] text-paper">
          <div className="wrap grid gap-6 lg:grid-cols-12 lg:gap-8">
            {b.kicker && <p className="eyebrow pt-2 text-paper/55 lg:col-span-3">{b.kicker}</p>}
            <Reveal className="lg:col-span-7 lg:col-start-4">
              <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                {b.heading}
              </h2>
              {b.body && <p className="mt-6 max-w-[60ch] text-[1.1rem] leading-relaxed text-paper/70">{b.body}</p>}
            </Reveal>
          </div>
          <ClipReveal className="wrap mt-[clamp(2.5rem,5vw,4rem)] max-w-[82rem]">
            <figure>
              <div className="overflow-hidden rounded-[10px] ring-1 ring-white/10">
                <Film film={b.film} />
              </div>
              {b.film.caption && (
                <figcaption className="mt-4 max-w-[52ch] text-[0.9rem] leading-relaxed text-paper/60">
                  {b.film.caption}
                </figcaption>
              )}
            </figure>
          </ClipReveal>
        </section>
      );

    case "placeholder":
      return (
        <div className="wrap max-w-[82rem]">
          <Placeholder label={b.label} note={b.note} />
        </div>
      );
  }
}
