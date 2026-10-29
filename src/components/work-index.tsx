"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";

/** Editorial index: big rows; hovering one dims the rest. */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative" onPointerLeave={() => setActive(null)}>
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
              <span className="display col-span-10 text-[clamp(2.5rem,6.6vw,6.25rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:col-span-7">
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
    </div>
  );
}
