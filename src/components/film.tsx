"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { Film as FilmData } from "@/content/projects";

/**
 * Video from public/. `loop` is a silent ambient clip: it plays only while on
 * screen and stays on its poster for reduced motion. Otherwise it's a normal
 * player with controls that loads nothing until asked.
 */
export function Film({
  film,
  loop = false,
  className = "",
}: {
  film: FilmData;
  loop?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!loop || !v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [loop, reduce]);

  return (
    <video
      ref={ref}
      src={film.src}
      poster={film.poster}
      aria-label={film.alt}
      playsInline
      className={`block h-auto w-full bg-black ${className}`}
      style={{ aspectRatio: film.aspect }}
      {...(loop
        ? { muted: true, loop: true, preload: "none", "aria-hidden": true, tabIndex: -1 }
        : { controls: true, preload: "none" })}
    />
  );
}
