import { about } from "@/lib/content";
import { Reveal } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-40"
    >
      <SectionHeading numeral={about.numeral} title={about.title} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {/* Photo: hi-res asset pending (PRD §9). Monogram placeholder. */}
        <Reveal className="md:col-span-5 lg:col-span-4">
          <figure className="glass relative aspect-[4/5] overflow-hidden rounded-card">
            {/* Swap this placeholder for next/image when /public/photo.jpg lands:
                <Image src={about.photo.src} alt={about.photo.alt} fill
                  className="object-cover grayscale transition duration-500 hover:grayscale-0" /> */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-display text-[18vw] font-medium text-accent/20 select-none md:text-[9rem]"
            >
              FM
            </span>
            <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.12em] text-text-muted uppercase">
              + +
            </span>
            <span className="absolute right-3 bottom-3 font-mono text-[10px] tracking-[0.12em] text-text-muted uppercase">
              + +
            </span>
            <figcaption className="sr-only">{about.photo.alt}</figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <div className="max-w-[65ch] space-y-5 text-base leading-relaxed text-text-secondary">
            {about.bio.map((para, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {about.facts.map((fact, i) => (
                <li
                  key={fact}
                  className="flex items-baseline font-mono text-xs tracking-[0.12em] text-text-secondary uppercase"
                >
                  {i > 0 && (
                    <span aria-hidden className="mr-6 text-text-muted">
                      /
                    </span>
                  )}
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Working principles */}
      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {about.principles.map((p, i) => (
          <Reveal key={p.n} delay={0.08 * i}>
            <article className="glass group rounded-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <p className="font-mono text-sm text-accent/60">{p.n}</p>
              <h3 className="mt-4 text-h3 font-medium text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {p.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
