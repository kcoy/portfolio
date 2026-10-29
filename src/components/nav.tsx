"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import logo from "@/assets/kc-logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.76, 0, 0.24, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > 240 && y > prev && !open);
  });

  // Close the menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Link to the page we're already on: Next won't re-navigate, so scroll to the top
  // ourselves (and drop any #hash). Smooth vs. instant follows the CSS scroll-behavior,
  // which is already off under reduced motion.
  const toTopIfCurrent = (e: React.MouseEvent, href: string) => {
    if (href !== pathname) return;
    e.preventDefault();
    setOpen(false);
    if (window.location.hash) history.replaceState(null, "", href);
    window.scrollTo({ top: 0 });
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-500 ${
            solid && !open
              ? "border-b border-ink/10 bg-paper/80 backdrop-blur-md"
              : "border-b border-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className="wrap flex h-[var(--nav-h)] items-center justify-between"
          >
            <Link
              href="/"
              onClick={(e) => toTopIfCurrent(e, "/")}
              className={`group relative z-[70] flex items-center gap-2.5 transition-colors duration-500 ${open ? "text-paper" : ""}`}
              aria-label={`${site.name} — home`}
            >
              <Image src={logo} alt="" width={26} height={26} preload className="h-[26px] w-[26px] shrink-0" />
              <span className="flex items-baseline gap-3">
                <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">Kevin Coy</span>
                <span className="eyebrow hidden opacity-55 sm:inline">Product Designer</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {links.slice(1).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={(e) => toTopIfCurrent(e, l.href)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="group relative block px-3 py-2 text-[0.9rem] tracking-[-0.01em]"
                  >
                    <span className="relative">
                      {l.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-current transition-[width] duration-500 ease-[var(--ease-out-expo)] ${
                          isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <button
              ref={toggleRef}
              type="button"
              className={`relative z-[70] -mr-2 flex h-11 items-center gap-3 px-2 md:hidden ${open ? "text-paper" : ""}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="eyebrow">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
                />
                <span
                  className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
                />
              </span>
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-night text-paper md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="wrap mt-[calc(var(--nav-h)+2rem)] flex flex-1 flex-col gap-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-paper/10">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease }}
                  >
                    <Link
                      href={l.href}
                      onClick={(e) => {
                        toTopIfCurrent(e, l.href);
                        setOpen(false);
                      }}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className="flex items-baseline justify-between py-3 text-[clamp(2.5rem,12vw,4rem)] font-medium leading-none tracking-[-0.05em]"
                    >
                      {l.label}
                      <span className="eyebrow text-paper/40">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="wrap flex justify-between gap-4 pb-8 pt-6 text-sm text-paper/60">
              <a href={`mailto:${site.email}`} className="link-u">
                {site.email}
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-u">
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
