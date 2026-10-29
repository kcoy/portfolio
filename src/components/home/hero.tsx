"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { SplitLines } from "../reveal";
import { Magnetic } from "../magnetic";

const plates = projects.map((p) => ({ project: p, media: p.cover }));

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = hover || userPaused;

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % plates.length), 3600);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const cur = plates[i];

  return (
    <section className="wrap relative pb-[clamp(3rem,8vw,7rem)] pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))]">
      <div
        className="eyebrow fade-in flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4 text-ink-2"
        style={{ animationDelay: "0.2s" }}
      >
        <span>{site.role}</span>
        <span className="hidden sm:inline">{site.focus}</span>
        <span>2004 — Now</span>
      </div>

      <h1 className="display mt-[clamp(1.5rem,4vw,3rem)] text-[clamp(2.25rem,10.4vw,12rem)]">
        <span className="sr-only">Kevin Coy, product designer. </span>
        <SplitLines
          animateOnMount
          delay={0.15}
          lines={[
            "Complex systems,",
            <>
              made <span className="serif-i pr-[0.05em] text-accent">clear.</span>
            </>,
          ]}
        />
      </h1>

      <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div
          className="page-in flex flex-col justify-between gap-10 lg:col-span-5"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="max-w-[36ch] text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.35] tracking-[-0.015em]">
            I&apos;m Kevin Coy — a product designer with 15+ years turning complicated SaaS,
            enterprise and e-commerce systems into interfaces people understand.{" "}
            <span className="text-ink-2">
              I own the work end to end, from discovery and flows to high-fidelity UI and the
              front-end code that ships it.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="#work"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-[0.95rem] font-medium text-paper transition-colors hover:bg-accent"
              >
                Explore selected work <span aria-hidden>↓</span>
              </Link>
            </Magnetic>
            <Link
              href="/resume"
              className="inline-flex items-center rounded-full border border-ink/20 px-6 py-4 text-[0.95rem] transition-colors hover:border-ink"
            >
              View résumé
            </Link>
            <Link href="/contact" className="link-u px-2 py-4 text-[0.95rem]">
              Contact
            </Link>
          </div>
        </div>

        <div
          className="clip-up lg:col-span-7"
          style={{ animationDelay: "0.45s" }}
          // Only a mouse pauses on hover: on phones a touch counts as "enter" and the matching
          // "leave" doesn't reliably follow, which left the slideshow stuck paused.
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <Link
            href={`/work/${cur.project.slug}`}
            data-cursor="View"
            className="group relative block aspect-[16/10] overflow-hidden rounded-[6px] bg-paper-2"
            aria-label={`${cur.project.title} — view case study`}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={cur.project.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image
                  src={cur.media.src}
                  alt={cur.media.alt}
                  fill
                  preload={i === 0}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-top transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  placeholder="blur"
                />
              </motion.div>
            </AnimatePresence>
          </Link>

          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <p className="text-ink-2" aria-live="polite">
              <span className="eyebrow mr-3 text-ink">Fig. 0{i + 1}</span>
              {cur.project.title}, {cur.project.year}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" role="group" aria-label="Choose project">
                {plates.map((p, n) => (
                  <button
                    key={p.project.slug}
                    type="button"
                    onClick={() => setI(n)}
                    aria-label={`Show ${p.project.title}`}
                    aria-pressed={n === i}
                    className="group/dot flex h-6 items-center"
                  >
                    <span
                      className={`block h-[3px] rounded-full transition-all duration-500 ${
                        n === i ? "w-8 bg-ink" : "w-3 bg-ink/20 group-hover/dot:bg-ink/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {!reduce && (
                <button
                  type="button"
                  className="eyebrow w-12 text-right text-ink-2 hover:text-ink"
                  onClick={() => setUserPaused((v) => !v)}
                  aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                >
                  {userPaused ? "Play" : "Pause"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
