"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { hero } from "@/lib/content";
import { Magnetic } from "@/components/fx/magnetic";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function Line({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <span className="block overflow-hidden">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: "110%" },
            show: {
              y: 0,
              transition: {
                duration: 0.8,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1] as const,
              },
            },
          }}
          className="inline-block"
        >
          {ch === "." ? <span className="text-accent">.</span> : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  /* Subtle pointer parallax on the name (max 10px, Visual-System §7.2) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const px = useTransform(sx, [-1, 1], [-10, 10]);
  const py = useTransform(sy, [-1, 1], [-8, 8]);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      aria-label="Introduction"
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden px-5 pb-16 md:px-10 md:pb-20"
    >
      {/* Static base; 3D ambient mounts here in M6 (lazy).
          Accent glow moment allowed once (Visual-System §6). */}
      <div
        aria-hidden
        id="hero-3d-slot"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 75% 20%, var(--color-accent-dim), transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative max-w-[1440px]"
      >
        {/* Eyebrow: role + live availability status */}
        <motion.p
          variants={item}
          className="mb-6 flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase"
        >
          <span
            aria-hidden
            className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          [ {hero.eyebrowRole} · {hero.eyebrowStatus} ]
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-display-xl leading-none font-medium tracking-[-0.03em] text-text"
        >
          <motion.span style={reduce ? undefined : { x: px, y: py }} className="block">
            <Line text={hero.line1} />
            <Line text={hero.line2} />
          </motion.span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-[42ch] text-lead font-light text-text-secondary"
        >
          {hero.lead}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <a
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center rounded-full bg-accent px-7 font-mono text-xs font-medium uppercase tracking-[0.12em] text-accent-ink transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
            >
              {hero.primaryCta.label}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={hero.secondaryCta.href}
              download
              className="inline-flex h-12 items-center rounded-full border border-line px-7 font-mono text-xs font-medium uppercase tracking-[0.12em] text-text transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {hero.secondaryCta.label}
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
