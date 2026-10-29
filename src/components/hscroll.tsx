"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Native horizontal scroller with snap points and prev/next controls.
 * No scroll-jacking: vertical scrolling is never captured.
 */
export function HScroll({
  children,
  label,
  tone = "light",
}: {
  children: ReactNode;
  label: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft >= max - 4);
      setProgress(max > 0 ? el.scrollLeft / max : 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const btn = `flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-25 ${
    tone === "dark"
      ? "border-paper/25 hover:bg-paper hover:text-ink"
      : "border-ink/20 hover:bg-ink hover:text-paper"
  }`;

  return (
    <div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-[clamp(1rem,2vw,2rem)] overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 focus-visible:outline-offset-[-2px]"
      >
        {children}
      </div>
      <div className="wrap mt-6 flex items-center gap-6">
        <div className={`relative h-px flex-1 ${tone === "dark" ? "bg-paper/15" : "bg-ink/15"}`}>
          <div
            className="absolute inset-y-0 left-0 bg-current transition-[width] duration-300"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => step(-1)} disabled={atStart} aria-label="Previous">
            ←
          </button>
          <button type="button" className={btn} onClick={() => step(1)} disabled={atEnd} aria-label="Next">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
