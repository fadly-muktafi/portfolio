"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { List, X, DownloadSimple } from "@phosphor-icons/react";
import { nav, a11y } from "@/lib/content";
import { Magnetic } from "@/components/fx/magnetic";

const SECTION_IDS = nav.links.map((l) => l.href.slice(1));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  /* Scrollspy */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Body scroll lock for the overlay menu */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Esc closes the menu */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
      />

      <nav
        aria-label="Primary"
        className={`mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 transition-all duration-300 md:px-10 ${
          scrolled ? "glass border-b border-line" : ""
        }`}
      >
        <a
          href="#main"
          className="font-mono text-sm font-medium tracking-[0.12em] text-text"
        >
          FM<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href.slice(1) ? "true" : undefined}
                className={`font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? "text-accent"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {active === link.href.slice(1) && (
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Magnetic>
            <a
              href="/cv.pdf"
              download
              className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-accent-ink transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
            >
              <DownloadSimple size={16} weight="bold" aria-hidden />
              {nav.cvLabel}
            </a>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? a11y.menuClose : a11y.menu}
          className="flex h-11 w-11 items-center justify-center text-text md:hidden"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-bg px-5 pt-24 pb-10 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {nav.links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.06 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-display font-medium text-text"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="/cv.pdf"
                download
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-mono text-xs font-medium uppercase tracking-[0.12em] text-accent-ink"
              >
                <DownloadSimple size={18} weight="bold" aria-hidden />
                {nav.cvLabel}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
