"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Media } from "@/content/projects";
import { BrowserFrame } from "./browser-frame";

/**
 * Before/after slider. Drag, click, or use the keyboard (it's a real
 * range input underneath, so screen readers and arrow keys just work).
 */
export function Compare({
  before,
  after,
  labels,
}: {
  before: Media;
  after: Media;
  labels: [string, string];
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <BrowserFrame address={after.browser ?? before.browser}>
      <div
        ref={box}
        className="relative touch-pan-y select-none"
        data-cursor="Drag"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image
          src={after.src}
          alt={after.alt}
          sizes="(min-width: 1024px) 80vw, 100vw"
          placeholder="blur"
          className="block h-auto w-full"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="block h-auto w-full"
            draggable={false}
          />
        </div>

        <span className="eyebrow pointer-events-none absolute left-3 top-3 bg-ink px-2 py-1 text-paper">
          {labels[0]}
        </span>
        <span className="eyebrow pointer-events-none absolute right-3 top-3 bg-accent px-2 py-1 text-paper">
          {labels[1]}
        </span>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-accent"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-paper shadow-lg">
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M5 1 1 5l4 4M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare ${labels[0]} and ${labels[1]}`}
          aria-valuetext={`${Math.round(pos)}% ${labels[0]}`}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden ring-2 ring-inset ring-accent peer-focus-visible:block"
        />
      </div>
    </BrowserFrame>
  );
}
