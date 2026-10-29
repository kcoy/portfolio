import Link from "next/link";
import { site } from "@/content/site";
import { CopyEmail } from "./copy-email";
import { Magnetic } from "./magnetic";
import { SplitLines } from "./reveal";

async function currentYear() {
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer id="contact" className="relative overflow-hidden bg-night text-paper">
      <div className="wrap pb-10 pt-[clamp(5rem,12vw,10rem)]">
        <p className="eyebrow text-paper/50">Contact</p>

        <h2 className="display mt-6 text-[clamp(3.25rem,13vw,13rem)]">
          <SplitLines
            lines={[
              "Have a hard",
              <>
                problem? <span className="serif-i text-accent-soft">Good.</span>
              </>,
            ]}
          />
        </h2>

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 border-t border-paper/15 pt-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-[34ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug text-paper/70">
              I&apos;m open to senior product design roles and select projects — especially
              complex SaaS, enterprise tools and AI-driven products.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 rounded-full bg-paper px-6 py-4 text-[0.95rem] font-medium text-ink transition-colors hover:bg-accent hover:text-ink"
                >
                  {site.email}
                  <span aria-hidden>→</span>
                </a>
              </Magnetic>
              <CopyEmail className="eyebrow rounded-full border border-paper/25 px-5 py-4 transition-colors hover:border-paper" />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-[0.95rem] md:col-span-5">
            <div>
              <p className="eyebrow mb-4 text-paper/40">Site</p>
              <ul className="space-y-2">
                {[
                  ["/work", "Work"],
                  ["/about", "About"],
                  ["/resume", "Résumé"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="link-u">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-paper/40">Elsewhere</p>
              <ul className="space-y-2">
                <li>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-u">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href={site.resumePdf} download className="link-u">
                    Résumé PDF ↓
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 text-xs text-paper/40 sm:flex-row sm:items-baseline">
          <p className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2">
            <span>© {year} {site.name}.</span>
            <span className="serif-i order-first mb-[10px] text-center text-[0.95rem] text-accent sm:order-none sm:mb-0 sm:text-left">
              Thoughtfully designed. Intentionally built… with{" "}
              <svg
                role="img"
                aria-label="love"
                viewBox="0 0 24 24"
                className="inline-block h-[1.05em] w-[1.05em] -translate-y-[1px] fill-current"
              >
                <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
              </svg>
            </span>
          </p>
          <a href="#main" className="link-u self-start sm:self-auto">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
