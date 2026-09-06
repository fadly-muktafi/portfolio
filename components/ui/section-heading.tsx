/**
 * Shared section heading: oversized ghost numeral + display title.
 * Eyebrow is optional and capped at 2 site-wide (Visual-System §4.3).
 */
export function SectionHeading({
  numeral,
  title,
  eyebrow,
}: {
  numeral: string;
  title: string;
  eyebrow?: string;
}) {
  return (
    <div className="relative mb-12 md:mb-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[0.35em] right-0 font-display text-numeral font-light leading-none text-accent/25 select-none"
      >
        {numeral}
      </span>
      {eyebrow && (
        <p className="mb-4 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase">
          [ {eyebrow} ]
        </p>
      )}
      <h2 className="max-w-[16ch] font-display text-display font-medium text-text">
        {title}
      </h2>
    </div>
  );
}
