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
      {eyebrow && (
        <p className="mb-4 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase">
          [ {eyebrow} ]
        </p>
      )}
      <h2 className="max-w-[20ch] font-display text-display font-medium text-text">
        {title}
      </h2>
    </div>
  );
}
