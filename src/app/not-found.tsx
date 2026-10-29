import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80dvh] flex-col justify-center pt-[var(--nav-h)]">
      <p className="eyebrow text-ink-2">Error 404</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,12vw,12rem)]">
        Off the <span className="serif-i text-accent">map.</span>
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg text-ink-2">
        This page doesn&apos;t exist — or it moved during a redesign. It happens to the best of us.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-ink px-6 py-4 text-paper hover:bg-accent">Back home</Link>
        <Link href="/work" className="rounded-full border border-ink/20 px-6 py-4 hover:border-ink">See the work</Link>
      </div>
    </section>
  );
}
