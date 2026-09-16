import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Images: AVIF first (≈30% smaller), WebP fallback */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    /* Trim unused exports from big libs (Motion, Phosphor, drei) */
    optimizePackageImports: ["motion", "@phosphor-icons/react", "@react-three/drei"],
    /* Inline critical CSS → removes the render-blocking CSS request */
    inlineCss: true,
  },
};

export default nextConfig;
