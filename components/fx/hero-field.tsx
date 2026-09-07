"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ambient particle wave (PRD FR-H2, Visual-System §7.2.4).
 * Particles are white at rest; the traveling wave "lights up" the crest
 * in the current accent color (--accent-h from the Accent Playground).
 */

/* Tunable feel */
const COLS = 80;
const ROWS = 80;
const SPACING = 0.24;
const AMP = 0.25; /* wave height */
const SPEED = 0.25; /* travel speed (rad/s) */
const CREST = 0.25; /* 0..1: wave value where the glow starts */
const GLOW_SHARPNESS = 2.5; /* higher = tighter, brighter crest */

/** OKLCH -> sRGB via a 1x1 canvas (browsers resolve oklch for us). */
let probeCanvas: HTMLCanvasElement | null = null;
function readAccent(target: THREE.Color) {
  try {
    const h =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-h")
        .trim() || "140";
    if (!probeCanvas) {
      probeCanvas = document.createElement("canvas");
      probeCanvas.width = 1;
      probeCanvas.height = 1;
    }
    const ctx = probeCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("no 2d context");
    ctx.fillStyle = `oklch(0.84 0.12 ${h})`;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    target.setRGB(d[0] / 255, d[1] / 255, d[2] / 255);
  } catch {
    target.set("#9FDF9F"); /* brand mint fallback */
  }
}

function Wave() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const accent = useRef(new THREE.Color("#9FDF9F"));
  const frame = useRef(0);

  /* Base positions + per-particle luminance (radial falloff mask) */
  const { base, luminance, positions, colors } = useMemo(() => {
    const count = COLS * ROWS;
    const base = new Float32Array(count * 3);
    const luminance = new Float32Array(count);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const maxDist = Math.hypot(COLS / 2, ROWS / 2);
    let i = 0;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const px = (x - COLS / 2) * SPACING;
        const py = (y - ROWS / 2) * SPACING;
        base[i * 3] = px;
        base[i * 3 + 1] = py;
        base[i * 3 + 2] = 0;
        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = 0;

        const dist = Math.hypot(x - COLS / 2, y - ROWS / 2) / maxDist;
        luminance[i] = Math.max(0.15, 1 - dist) * (0.55 + Math.random() * 0.45);

        colors[i * 3] = luminance[i];
        colors[i * 3 + 1] = luminance[i];
        colors[i * 3 + 2] = luminance[i];
        i++;
      }
    }
    return { base, luminance, positions, colors };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const points = pointsRef.current;
    const group = groupRef.current;
    if (!points || !group) return;

    /* Re-sample accent ~3x/sec */
    if (frame.current++ % 20 === 0) readAccent(accent.current);
    const a = accent.current;

    const geo = points.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const col = geo.attributes.color.array as Float32Array;

    for (let i = 0; i < COLS * ROWS; i++) {
      const px = base[i * 3];
      const py = base[i * 3 + 1];

      /* Traveling wave, clearly readable: main carrier + secondary swell */
      const w =
        Math.sin(px * 1.35 - t * SPEED) * 0.68 +
        Math.sin((px + py) * 0.6 + t * SPEED * 0.55) * 0.32; /* ~ -1..1 */

      pos[i * 3 + 2] = w * AMP;

      /* Crest activation: only the wave top ignites in accent */
      let act = (w - CREST) / (1 - CREST);
      act = Math.max(0, Math.min(1, act));
      act = Math.pow(act, GLOW_SHARPNESS);

      const baseBrightness = luminance[i] * 0.15;
      const peak = 0.85;
      col[i * 3] = baseBrightness + (a.r * peak - baseBrightness) * act;
      col[i * 3 + 1] =
        baseBrightness + (a.g * peak - baseBrightness) * act;
      col[i * 3 + 2] =
        baseBrightness + (a.b * peak - baseBrightness) * act;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;

    /* Gentle pointer tilt, damped */
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      -0.42 + pointer.current.y * 0.06,
      2.5,
      delta,
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      pointer.current.x * 0.08,
      2.5,
      delta,
    );
    group.rotation.z = t * 0.015;
  });

  return (
    <group ref={groupRef} position={[1.7, 0.9, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          color="#ffffff"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  /* Stop rendering when the hero is off-screen (perf budget) */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <Wave />
      </Canvas>
    </div>
  );
}
