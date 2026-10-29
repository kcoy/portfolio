"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="wrap flex min-h-[80dvh] flex-col justify-center pt-[var(--nav-h)]">
      <p className="eyebrow text-ink-2">Something broke</p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,10rem)]">
        That wasn&apos;t <span className="serif-i text-accent">designed.</span>
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={reset} className="rounded-full bg-ink px-6 py-4 text-paper hover:bg-accent">Try again</button>
        <Link href="/" className="rounded-full border border-ink/20 px-6 py-4 hover:border-ink">Back home</Link>
      </div>
    </section>
  );
}
