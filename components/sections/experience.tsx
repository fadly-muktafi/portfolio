"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { experience, type ExperienceItem } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Sticky-stack deck (UX-Blueprint §4.4): CSS sticky stacking,
 * each card dims and scales down subtly as the next one arrives.
 * No GSAP. Motion only, reduced-motion safe.
 */

function Card({
  item,
  index,
  open,
  onToggle,
}: {
  item: ExperienceItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <div
      ref={ref}
      className="md:sticky"
      style={{ top: `calc(6rem + ${index * 0.75}rem)` }}
    >
      <motion.article
        style={reduce ? undefined : { scale, opacity }}
        className="glass w-full overflow-hidden rounded-card"
        aria-label={`${item.role} at ${item.company}`}
      >
        {/* Collapsed skim layer */}
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
              {item.year} · {item.period}
            </p>
            <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
              {item.location}
            </p>
          </div>

          <h3 className="mt-4 font-display text-h3 font-medium text-text">
            {item.role}
          </h3>
          <p className="mt-1 text-base text-text-secondary">{item.company}</p>
          <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-text-secondary">
            {item.context}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack used">
            {item.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-chip border border-line px-3 py-1 font-mono text-[13px] text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>

      {/* Expand-in-place detail, attached to its card */}
      <Accordion item={item} open={open} onToggle={onToggle} />
    </div>
  );
}

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-40"
    >
      <SectionHeading
        numeral={experience.numeral}
        title={experience.title}
        eyebrow={experience.eyebrow}
      />

      {/* Sticky deck */}
      <div className="relative mx-auto flex max-w-4xl flex-col gap-6">
        {experience.items.map((item, i) => (
          <Card
            key={item.id}
            item={item}
            index={i}
            open={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>

      {/* Leadership */}
      <div className="mx-auto mt-16 max-w-4xl">
        <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
          Leadership
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {experience.leadership.map((lead) => (
            <article key={lead.org} className="glass rounded-card p-6">
              <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
                {lead.period}
              </p>
              <h3 className="mt-2 text-base font-medium text-text">
                {lead.role}
              </h3>
              <p className="text-sm text-text-secondary">{lead.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {lead.line}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Accordion({
  item,
  open,
  onToggle,
}: {
  item: ExperienceItem;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="glass mt-[-1px] rounded-b-card border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`case-${item.id}`}
        className="flex w-full items-center gap-2 px-6 py-4 text-left font-mono text-xs tracking-[0.12em] text-accent uppercase transition-colors hover:text-text md:px-10"
      >
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-block"
        >
          +
        </motion.span>
        {open ? "- Close" : "+ View case"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`case-${item.id}`}
            role="region"
            aria-label={`Details for ${item.company}`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 px-6 pb-8 md:grid-cols-2 md:px-10 md:pb-10">
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] text-text-muted uppercase">
                  What I did
                </p>
                <ul className="mt-3 list-none space-y-3">
                  {item.contributions.map((c, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-text-secondary"
                    >
                      <span aria-hidden className="text-accent">
                        /
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] text-text-muted uppercase">
                  Impact
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text">
                  {item.impact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
