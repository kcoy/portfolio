"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fade-and-rise on first entry into the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "figure";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/** Image curtain: a clip-path wipe upward as the frame enters view. */
export function ClipReveal({
  children,
  className,
  delay = 0,
  bleed = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** px the clip extends past the box, so shadows and glows aren't cut off */
  bleed?: number;
}) {
  const reduce = useReducedMotion();
  const b = `-${bleed}px`;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: `inset(18% ${b} ${b} ${b})`, opacity: 0.001 }}
      whileInView={{ clipPath: `inset(${b} ${b} ${b} ${b})`, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line-by-line headline entrance. Each line rises from behind a mask.
 * Lines are passed as children array items so screen readers read one sentence.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  animateOnMount = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  if (animateOnMount) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`-mb-[0.12em] block overflow-hidden pb-[0.12em] ${lineClassName ?? ""}`}>
            <span className="line-rise block" style={{ animationDelay: `${delay + i * 0.09}s` }}>
              {line}
            </span>
          </span>
        ))}
      </span>
    );
  }
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`-mb-[0.12em] block overflow-hidden pb-[0.12em] ${lineClassName ?? ""}`}>
          <motion.span
            className="block will-change-transform"
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
