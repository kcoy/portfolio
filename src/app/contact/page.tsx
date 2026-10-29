import type { Metadata } from "next";
import { site } from "@/content/site";
import { CopyEmail } from "@/components/copy-email";
import { SplitLines } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  const rows = [
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    { k: "LinkedIn", v: site.linkedinLabel, href: site.linkedin, ext: true },
    { k: "Résumé", v: "Download PDF", href: site.resumePdf, download: true },
  ];
  return (
    <section className="wrap pb-[clamp(4rem,8vw,7rem)] pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))]">
      <p className="eyebrow text-ink-2">Contact</p>
      <h1 className="display mt-6 text-[clamp(3.25rem,11vw,11rem)]">
        <SplitLines
          animateOnMount
          lines={["Let’s make the", <span key="c" className="serif-i text-accent">complicated</span>, "simple."]}
        />
      </h1>

      <ul className="mt-[clamp(3rem,7vw,6rem)] border-t border-ink">
        {rows.map((r) => (
          <li key={r.k} className="border-b border-ink/15">
            <a
              href={r.href}
              {...(r.ext ? { target: "_blank", rel: "noreferrer" } : {})}
              {...(r.download ? { download: true } : {})}
              className="group grid grid-cols-12 items-baseline gap-4 py-6 sm:py-8"
            >
              <span className="eyebrow col-span-12 text-ink-2 sm:col-span-2">{r.k}</span>
              <span className="col-span-11 break-all text-[clamp(1.5rem,4.5vw,4rem)] font-medium leading-none tracking-[-0.045em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:col-span-9 sm:break-normal">
                {r.v}
              </span>
              <span aria-hidden className="col-span-1 text-right text-2xl transition-transform group-hover:-rotate-45">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <CopyEmail className="eyebrow rounded-full border border-ink/20 px-5 py-3 hover:border-ink" />
      </div>
    </section>
  );
}
