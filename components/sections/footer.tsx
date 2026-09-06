import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { footer } from "@/lib/content";

export function Footer() {
  const row = [...footer.marquee, ...footer.marquee, ...footer.marquee];

  return (
    <footer className="relative border-t border-line">
      {/* The only marquee on the page (Visual-System §12) */}
      <div
        aria-hidden
        className="overflow-hidden border-b border-line py-4 select-none"
      >
        <div className="animate-marquee flex w-max gap-8">
          {[...row, ...row].map((text, i) => (
            <span
              key={i}
              className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase"
            >
              {text} <span className="ml-8 text-accent">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-10">
        <p className="font-mono text-xs text-text-secondary">
          © 2026 {footer.colophon}
        </p>
        <p className="font-mono text-xs text-text-muted">
          Next.js / Tailwind / Motion
        </p>
        <a
          href="#main"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-text uppercase transition-colors hover:text-accent"
        >
          <ArrowUp size={16} aria-hidden />
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
