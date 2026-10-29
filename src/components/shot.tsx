"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Media } from "@/content/projects";
import { BrowserFrame } from "./browser-frame";

/**
 * A screenshot that opens at native resolution in a modal <dialog>.
 * The dialog gives us focus trapping and Escape-to-close for free.
 */
export function Shot({
  media,
  sizes = "(min-width: 1024px) 66vw, 100vw",
  tone = "light",
  preload = false,
  showCaption = true,
  className = "",
  captionClassName = "",
}: {
  media: Media;
  sizes?: string;
  tone?: "light" | "dark";
  preload?: boolean;
  showCaption?: boolean;
  className?: string;
  captionClassName?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        data-cursor="Zoom"
        className="group block w-full cursor-zoom-in text-left"
        aria-label={`Enlarge: ${media.alt}`}
      >
        <BrowserFrame
          address={media.browser}
          tone={tone}
          className={
            media.device === "phone"
              ? "overflow-hidden rounded-[18px] bg-white shadow-[0_1px_0_rgba(0,0,0,.04),0_30px_60px_-30px_rgba(0,0,0,.35)] ring-1 ring-black/[.07]"
              : ""
          }
        >
          <div className="overflow-hidden">
            <Image
              src={media.src}
              alt={media.alt}
              sizes={sizes}
              placeholder="blur"
              preload={preload}
              className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.015]"
            />
          </div>
        </BrowserFrame>
      </button>
      {showCaption && media.caption && (
        <figcaption
          className={`mt-4 max-w-[52ch] text-[0.9rem] leading-relaxed text-ink-2 ${captionClassName}`}
        >
          {media.caption}
        </figcaption>
      )}

      <dialog
        ref={ref}
        aria-label={media.alt}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-night/90 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[100dvh] w-[100vw] flex-col items-center justify-center gap-4 p-4 sm:p-10">
          <Image
            src={media.src}
            alt={media.alt}
            sizes="100vw"
            className="h-auto max-h-[85dvh] w-auto max-w-full rounded-md object-contain shadow-2xl"
          />
          <div className="flex w-full max-w-[960px] items-start justify-between gap-6 text-paper/70">
            <p className="text-sm">{media.caption ?? media.alt}</p>
            <form method="dialog">
              <button className="eyebrow shrink-0 border border-paper/30 px-3 py-2 text-paper hover:bg-paper hover:text-ink" autoFocus>
                Close ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </figure>
  );
}
