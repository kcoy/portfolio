import type { ReactNode } from "react";

/** Minimal browser chrome. Neutral so the work inside stays the subject. */
export function BrowserFrame({
  address,
  children,
  tone = "light",
  className = "",
}: {
  address?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!address) return <div className={className}>{children}</div>;
  const dark = tone === "dark";
  return (
    <div
      className={`overflow-hidden rounded-[10px] shadow-[0_1px_0_rgba(0,0,0,.04),0_30px_60px_-30px_rgba(0,0,0,.35)] ring-1 ${
        dark ? "bg-night-2 ring-white/10" : "bg-white ring-black/[.07]"
      } ${className}`}
    >
      <div
        className={`flex h-7 items-center gap-3 px-3 sm:h-8 ${dark ? "bg-night-2" : "bg-[#f4f3f0]"}`}
        aria-hidden
      >
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${dark ? "bg-white/15" : "bg-black/[.12]"}`}
            />
          ))}
        </span>
        <span
          className={`mx-auto max-w-[60%] truncate rounded px-3 py-0.5 font-mono text-[10px] tracking-wide ${
            dark ? "bg-white/5 text-white/45" : "bg-black/[.04] text-black/45"
          }`}
        >
          {address}
        </span>
        <span className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}
