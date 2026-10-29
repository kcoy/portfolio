"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import type { Project } from "@/content/projects";

/** Editorial index: big rows, a cover that trails the pointer on hover. */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 24 });
  const sy = useSpring(y, { stiffness: 180, damping: 24 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ol className="border-t border-ink">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-ink/15">
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(null)}
              className={`group grid grid-cols-12 items-baseline gap-x-4 gap-y-4 py-6 transition-opacity duration-500 sm:py-8 ${
                active !== null && active !== i ? "lg:opacity-30" : ""
              }`}
            >
              <span className="eyebrow col-span-2 text-ink-2 sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="display col-span-10 text-[clamp(2.5rem,7.5vw,7rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:col-span-7">
                {p.title}
              </span>
              <span className="col-span-10 col-start-3 text-sm text-ink-2 sm:col-span-3 sm:col-start-auto">
                {p.disciplines.join(" · ")}
              </span>
              <span className="eyebrow col-span-10 col-start-3 text-ink-2 sm:col-span-1 sm:col-start-auto sm:text-right">
                {p.year}
              </span>
              <span className="col-span-12 overflow-hidden rounded-md lg:hidden">
                <Image src={p.cover.src} alt="" sizes="100vw" placeholder="blur" className="h-auto w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={projects[active].slug}
              className="absolute w-[min(30vw,420px)] -translate-x-1/2 -translate-y-[60%] overflow-hidden rounded-md shadow-2xl"
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={projects[active].cover.src} alt="" sizes="420px" className="h-auto w-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
