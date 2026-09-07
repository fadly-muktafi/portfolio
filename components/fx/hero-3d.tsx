"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/* 3D chunk loads lazily, only when the gate passes */
const HeroField = dynamic(() => import("./hero-field"), {
  ssr: false,
  loading: () => null,
});

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Mount gate for the 3D hero (PRD FR-H2):
 * skips on reduced motion, touch/coarse pointers, small viewports,
 * and missing WebGL. Loads after first paint (idle) so it never
 * competes with LCP. Fallback is the static accent gradient in hero.tsx.
 */
export function Hero3D() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (!fine || !wide || !webglAvailable()) return;

    const w = window as unknown as {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(id);
  }, [reduce]);

  if (!ready) return null;

  return (
    <div aria-hidden className="absolute inset-0">
      <HeroField />
    </div>
  );
}
