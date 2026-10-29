"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A label that follows the pointer over elements marked `data-cursor="…"`.
 * Desktop fine-pointer only; the native cursor is never hidden, so it can't
 * get in anyone's way.
 */
export function Cursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(el?.dataset.cursor ?? null);
    };
    const leave = () => setLabel(null);
    // Content moves under a still pointer while scrolling; re-test what's beneath it.
    const rescan = () => {
      const el = document
        .elementFromPoint(x.get(), y.get())
        ?.closest<HTMLElement>("[data-cursor]");
      setLabel(el?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", rescan, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", rescan);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {label && (
          <motion.div
            key="c"
            className="eyebrow flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-center text-paper"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
