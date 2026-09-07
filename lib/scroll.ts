import type Lenis from "lenis";

/**
 * Shared handle to the Lenis instance, so the nav overlay can
 * stop/start page scrolling when it opens (UX-Blueprint: scroll lock).
 */
export const scrollLock: { lenis: Lenis | null } = { lenis: null };
