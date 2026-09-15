"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  JAVA_MAP_WIDTH,
  JAVA_MAP_HEIGHT,
  JAVA_POINTS,
  JAKARTA_MARKER,
} from "@/lib/java-map";

/**
 * Java particle map (About section). Borderless; particles fade in with a
 * scattered stagger on first view. Pointer proximity ignites particles in
 * the accent color (direct DOM writes, no React re-renders). The label chip
 * only appears while hovering the Jakarta marker.
 * Reduced motion: everything static and instantly visible; hover still
 * recolors particles without transitions.
 */

/* Deterministic per-dot stagger delay (0–0.9s), SSR/hydration stable */
function staggerDelay(i: number) {
  const h = ((i * 2654435761) >>> 0) % 1000;
  return (h / 1000) * 1;
}

/* Knobs */
const HOVER_RADIUS = 16; /* viewBox units */
const HOVER_OPACITY = 0.75;
const MARKER_HIT_RADIUS = 16; /* comfortable hover target around the dot */

/* Chip position derived from marker coords (%) */
const CHIP_LEFT = `${(JAKARTA_MARKER.x / JAVA_MAP_WIDTH) * 100}%`;
const CHIP_TOP = `${(JAKARTA_MARKER.y / JAVA_MAP_HEIGHT) * 100}%`;

export function JavaMap() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [showChip, setShowChip] = useState(false);

  /* Effective visibility: reduced-motion users see everything instantly
     without touching React state (lint: no setState in effect body). */
  const visible = inView || reduce;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  /* Proximity glow: mutate styles directly, bypass React render cycle */
  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * JAVA_MAP_WIDTH;
    const py = ((e.clientY - rect.top) / rect.height) * JAVA_MAP_HEIGHT;
    const r2 = HOVER_RADIUS * HOVER_RADIUS;

    for (let i = 0; i < JAVA_POINTS.length; i++) {
      const dot = dotsRef.current[i];
      if (!dot) continue;
      const dx = JAVA_POINTS[i].x - px;
      const dy = JAVA_POINTS[i].y - py;
      const hot = dx * dx + dy * dy < r2;
      const current = dot.dataset.hot === "1";
      if (hot === current) continue;
      dot.dataset.hot = hot ? "1" : "0";
      if (hot) {
        dot.style.fill = "var(--color-accent)";
        dot.style.opacity = String(HOVER_OPACITY);
      } else {
        dot.style.fill = "";
        dot.style.opacity = "";
      }
    }
  }

  function resetDots() {
    for (const dot of dotsRef.current) {
      if (!dot || dot.dataset.hot !== "1") continue;
      dot.dataset.hot = "0";
      dot.style.fill = "";
      dot.style.opacity = "";
    }
  }

  return (
    <div ref={ref}>
      <div
        className="relative"
        role="img"
        aria-label="Stylized map of Java with a marker on South Jakarta"
      >
        {/* Map body: edge-fade mask instead of a card frame */}
        <div
          style={{
            maskImage:
              "radial-gradient(ellipse 75% 75% at 20% 20%, black 10%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 75% at 20% 20%, black 10%, transparent 100%)",
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${JAVA_MAP_WIDTH} ${JAVA_MAP_HEIGHT}`}
            className="h-auto w-full"
            aria-hidden
            onPointerMove={onPointerMove}
            onPointerLeave={resetDots}
          >
            <defs>
              {/* Accent glow around the marker (from reference pattern) */}
              <filter id="marker-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feMorphology operator="dilate" radius="1" in="SourceAlpha" />
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {JAVA_POINTS.map((p, i) => (
              <circle
                key={i}
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
                cx={p.x}
                cy={p.y}
                r={2.5}
                className="fill-text-secondary"
                opacity={visible ? 0.5 : 0}
                style={{
                  transition: reduce
                    ? "fill 0ms"
                    : `opacity 600ms ease ${staggerDelay(i)}s, fill 200ms ease 0s, opacity 200ms ease 0s`,
                }}
              />
            ))}

            {/* Ping ring: sibling, pointer-events disabled — hovering the
                expanding ring must NOT trigger the chip (bug fix) */}
            {!reduce && (
              <circle
                cx={JAKARTA_MARKER.x}
                cy={JAKARTA_MARKER.y}
                r={4}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                style={{ pointerEvents: "none" }}
              >
                <animate
                  attributeName="r"
                  from="8"
                  to="40"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.75"
                  to="0"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Marker group: only the hit area + core dot are hoverable */}
            <g
              className="cursor-pointer"
              onPointerEnter={() => setShowChip(true)}
              onPointerLeave={() => setShowChip(false)}
            >
              {/* Invisible hit area for a comfortable hover target */}
              <circle
                cx={JAKARTA_MARKER.x}
                cy={JAKARTA_MARKER.y}
                r={MARKER_HIT_RADIUS}
                fill="transparent"
              />
              {/* Core dot with glow */}
              <circle
                cx={JAKARTA_MARKER.x}
                cy={JAKARTA_MARKER.y}
                r={5}
                fill="var(--color-accent)"
                filter="url(#marker-glow)"
                opacity={visible ? 1 : 0}
              />
            </g>
          </svg>
        </div>

        {/* Floating label chip: visible only while hovering the marker */}
        <div
          aria-hidden
          className="pointer-events-none absolute select-none"
          style={{ left: CHIP_LEFT, top: CHIP_TOP }}
        >
          <AnimatePresence>
            {showChip && (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="glass backdrop-blur-xs ml-3 -translate-y-1/2 inline-flex items-center gap-2 rounded-chip px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-text uppercase whitespace-nowrap"
              >
                South Jakarta, Jakarta
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mono footer row */}
      <div className="mt-2 flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-[0.12em] text-text-muted uppercase">
          Java, Indonesia
        </p>
        <p className="font-mono text-[10px] tabular-nums text-text-muted">
          105.75°E · -5.25°S
        </p>
      </div>
    </div>
  );
}
