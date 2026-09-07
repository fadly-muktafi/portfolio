"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollLock } from "@/lib/scroll";

/**
 * Lenis smooth scrolling (PRD FR-G5).
 * Skipped entirely under prefers-reduced-motion (Visual-System §7.3).
 * `anchors: true` lets Lenis handle #hash links smoothly.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
    });
    scrollLock.lenis = lenis;

    return () => {
      lenis.destroy();
      scrollLock.lenis = null;
    };
  }, []);

  return null;
}
