# Visual System — Portfolio Website: Ahmad Fadly Muktafi

| | |
|---|---|
| **Version** | 1.0 |
| **Date** | 2026-09-06 |
| **Owner** | Ahmad Fadly Muktafi |
| **Status** | Approved direction |
| **Based on** | `PRD.md` v1.0 |
| **Next deliverable** | `UX-Blueprint.md` |

> This document is the single source of truth for every visual decision: color, type, space, texture, motion, and component styling. Implementation must reference these tokens — no ad-hoc values in components.

---

## 1. Design Principles

1. **Experimental shell, professional core** — the visual layer is bold and memorable; the information layer is always scannable and calm.
2. **Awwwards-grade craft** — every pixel, easing curve, and hover state is intentional. No default-looking elements.
3. **Dark, technical lymphatic** — a near-black canvas with a green undertone; grid lines and mono labels celebrate the developer identity.
4. **Restraint in chaos** — one big idea per viewport. Bold ≠ busy.
5. **The visitor owns the accent** — the brand color (`#9FDF9F` mint) is the default identity, but the Accent Playground lets visitors remix it live. The system is built hue-agnostic.

**Mood keywords:** dark · mint · blueprint · oversized type · grain · precise · alive.

---

## 2. Quality Bar (Awwwards Criteria as Internal Checklist)

Selected direction targets Awwwards-level execution. Before launch, each criterion must pass self-review:

| Criterion | What it means here | Pass condition |
|---|---|---|
| **Design** | Visual consistency, type discipline, spacing rhythm | No element deviates from this document |
| **Usability** | Speed, clarity, reduced-motion parity, mobile quality | PRD §7 budgets all met; 60s skim test passes |
| **Creativity** | Original interactions & art direction | 3+ signature moments (3D hero, scroll-journey, Accent Playground) |
| **Content** | Copy quality, storytelling | Outcome-oriented case studies; zero lorem ipsum; zero typos |

---

## 3. Color System

### 3.1 Core palette (dark-first, single theme)

Single dark theme by explicit owner approval; this is a recorded exception to any dual-mode default. Light theme is backlog (PRD §14).

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0A0B0A` | Page background — near-black with green undertone |
| `--bg-elevated` | `#101210` | Raised surfaces, nav bar, cards base |
| `--surface-glass` | `rgba(242,245,242,0.04)` | Glassmorphism fill |
| `--line` | `rgba(242,245,242,0.08)` | Hairline borders, grid lines, dividers |
| `--text` | `#F2F5F2` | Primary text |
| `--text-secondary` | `#A9AFA8` | Body-supporting text (~9:1 on `--bg`) |
| `--text-muted` | `#7C837B` | Captions, meta (~5.2:1 — small text minimum) |
| `--accent` | `#9FDF9F` | **Default brand accent (mint)** — CTAs, links, highlights, numerals |
| `--accent-ink` | `#0A0B0A` | Text/icons placed on accent |
| `--error` | `#FF6B6B` | Form errors only |
| `--warning` | `#FFD166` | Rare callouts |
| `--info` | `#7AB8FF` | Rare info states |

### 3.2 Accent Playground (dynamic accent)

The accent is a **system, not a hex**. All accent usages derive from three CSS variables:

```css
:root {
  --accent-h: 140;   /* hue — the only thing the playground changes */
  --accent: oklch(0.84 0.12 var(--accent-h));        /* ≈ #9FDF9F at h=140 */
  --accent-dim: oklch(0.84 0.12 var(--accent-h) / 0.14);  /* tints, glows */
  --accent-ink: #0A0B0A;                              /* constant */
}
```

- **Playground control:** hue slider (0–360) + presets: Mint `140` (default/brand), Lime `110`, Cobalt `250`, Tangerine `55`, Magenta `330`.
- Lightness (0.84) & chroma (0.12) stay locked → any hue keeps identical contrast behavior.
- Persisted to `localStorage`; restored on load before first paint (inline script, no flash).
- Surfaces that must NOT recolor: photos, error states, `--line`, grain.

### 3.3 Contrast matrix (WCAG targets)

| Pair | Ratio (approx) | Verdict |
|---|---|---|
| `--text` on `--bg` | ~18:1 | AAA |
| `--text-secondary` on `--bg` | ~9:1 | AAA |
| `--text-muted` on `--bg` | ~5.2:1 | AA (small text ok) |
| `--accent` on `--bg` | ~13.8:1 | AAA |
| `--accent-ink` on `--accent` | ~13.8:1 | AAA |
| focus ring = `--accent` | visible on all surfaces | ✓ |

Rule: **accent is never used for long paragraphs** — only headings, labels, numerals, links, icons, CTAs.

---

## 4. Typography

### 4.1 Families (2 variable fonts, per PRD budget)

| Role | Font | Weights used | Fallback |
|---|---|---|---|
| Display & body | **Space Grotesk** (variable) | 300, 400, 500, 700 | system-ui, sans-serif |
| Mono (labels, meta, code) | **JetBrains Mono** (variable) | 400, 500 | ui-monospace | 

Loaded self-hosted or via `next/font`, subset latin, `display: swap`.

### 4.2 Fluid type scale (`clamp()`)

| Token | Size | Weight / tracking | Usage |
|---|---|---|---|
| `--text-display-xl` | `clamp(3rem, 10vw, 9rem)` | 500 / −0.03 | Hero name |
| `--text-display` | `clamp(2.5rem, 7vw, 5.5rem)` | 500 / −0.02 | Section titles |
| `--text-h3` | `clamp(1.25rem, 2.5vw, 2rem)` | 500 / −0.01 | Card titles, subsections |
| `--text-body` | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | 400 / 0 / lh 1.6 | Body copy |
| `--text-lead` | `clamp(1.125rem, 2vw, 1.5rem)` | 300 / 0 / lh 1.5 | Section intros |
| `--text-label` | `0.75rem` | mono 500 / +0.12em uppercase | Section labels, eyebrows |
| `--text-mono-sm` | `0.8125rem` | mono 400 / 0 | Chips, meta, timestamps |
| `--text-numeral` | `clamp(4rem, 12vw, 11rem)` | 300 / −0.02 | Oversized section numerals `#01` |

### 4.3 Usage rules

- One `--text-display-xl` per page (hero). Section titles use `--text-display`.
- Eyebrow labels styled as mono brackets (`[ … ]`), used at most twice site-wide: hero (`[ ● SOFTWARE ENGINEER · OPEN TO WORK ]`) and experience (`[ EXPERIENCE ]`). Other sections rely on ghost numeral + headline alone.
- Numerals `#01`–`#05`: accent-colored, `position: sticky` or floated ghost layer behind content.
- Max line length: 65ch for body; headlines can break across 2–3 lines intentionally.
- Italic is not used. Emphasis = weight or accent color.

---

## 5. Layout, Grid & Spacing

### 5.1 Grid

| Breakpoint | Columns | Gutter | Margin |
|---|---|---|---|
| Mobile 375–767 | 4 | 16px | 20px |
| Tablet 768–1279 | 8 | 20px | 40px |
| Desktop 1280+ | 12 | 24px | fluid, max container 1440px |
| Ultra 1920+ | 12 | 24px | container fixed 1440px, centered |

- Deliberate asymmetry allowed: content spanning cols 2–8 with ghost numerals in cols 9–12 (blueprint mark).
- Grid lines may be *visually exposed*: hairline column guides at `--line` color, opacity 0.5 — reinforces the blueprint identity.

### 5.2 Spacing scale (4px base)

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192`

- Section vertical padding: `clamp(6rem, 12vw, 12rem)`.
- Component internal rhythm: multiples of 4px only.

### 5.3 Section rhythm

Each section = oversized ghost numeral (a display element, not an eyebrow) → display title → content. Consistent left-edge alignment with intentionally offset accents. Eyebrow usage: see §4.3 cap.

---

## 6. Surfaces & Texture (signature tri-layer)

The visual depth comes from **exactly three stacked layers** — consistent everywhere:

1. **Void layer (bottom)** — the background stays clean near-black. No grid wallpaper: decoration without a job is banned. The dark field makes the grain, mint accent, and hero particles carry the atmosphere.
2. **Glass layer (middle)** — cards and nav use glassmorphism: `background: var(--surface-glass); backdrop-filter: blur(12px); border: 1px solid var(--line)`. On hover, border tint shifts toward `--accent` (→ `--accent-dim` border).
3. **Grain layer (top)** — film-grain overlay: inline-SVG `feTurbulence` noise with SVG-level contrast boost, `opacity: 0.08`, **normal blending** (overlay dies on near-black), `pointer-events: none`, `inset: -50%` + `steps(6)` flick at ~0.8s for a cinematic feel. One global instance, off under reduced motion.

Additional surface rules
- Cards have **no drop shadows** (dark theme). Depth = border + glass + grain only.
- Accent glow used sparingly: max 1 radial `accent-dim` glow as a section background moment (hero) or hover halo on primary CTA.
- Rounded corners: `4px` chips/inputs, `8px` cards, `999px` pills/badges. Sharp-not-square: this is precision, not brutality.

---

## 7. Motion System

### 7.1 Tokens

| Token | Value | Usage |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary reveal easing — the brand curve |
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | UI hovers |
| `--ease-in-out-soft` | `cubic-bezier(0.65, 0, 0.35, 1)` | Layout shifts |
| `--dur-micro` | `150–250ms` | Hover, focus, button states |
| `--dur-ui` | `300–500ms` | Panels, toasts, nav |
| `--dur-reveal` | `600–900ms` | Scroll-in reveals, hero staging |
| `--dur-page` | `≤1200ms` | Full intro sequence budget |
| Stagger | `40–80ms` per item | Lists, menu links, word reveals |

Spring (cursor): stiffness 400–500, damping 30–40 (snappy, no wobble).

### 7.2 Choreography rules

1. **One moment at a time** — never two competing focal animations on screen.
2. **Scroll-driven ≠ scroll-jacked** — Lenis smooth scroll; sections reveal once (`whileInView`, `once: true`), no re-triggering on scroll-up. Pinned segments only in Experience journey.
3. **Reveals:** content rises `translateY(24→0)` + `opacity 0→1` with `--ease-out-expo`. Headlines may split into words/letters (stagger 40ms). No rotation/zoom gimmicks on core content.
4. **Hero 3D:** ambient particle/shader field, slow perpetual drift (`0.2` speed factor), responds subtly to pointer (parallax ≤10px); lazy-loaded post-LCP.
5. **Magnetic hover (no custom cursor):** primary CTAs and nav links pull ≤4px toward the pointer via Motion values (spring stiffness 400, damping 30); hover fills enter from the pointer's side. The native cursor is never replaced: accessibility and performance guardrail.
6. **Marquee divider** (footer/section separators): mono text ticker, 20–30s loop, `will-change: transform`.
7. **Accent Playground feedback:** hue changes transition globally over `--dur-ui` via CSS var transition — the whole site "re-lighting" is the payoff moment.

### 7.3 Reduced motion & fallbacks

`prefers-reduced-motion: reduce` → disable Lenis, magnetic hover, 3D (swap to static gradient), marquee (static), reveal animations (content renders visible immediately). All information and interactions remain fully available.

---

## 8. Iconography & Imagery

- **Icons:** `@phosphor-icons/react`, weight `regular` (≈1.5px stroke), sizes 16/20/24. One icon family project-wide.
- **Photo treatment:** professional photo rendered **high-contrast grayscale + grain**, sits in glass frame with corner ticks; hover reveals full color (0.4s ease) — "identity unlock" micro-moment.
- **OG image (1200×630):** dark bg, mint name in display type, mono role label, grid + grain — generated statically, committed to `/public`.
- **Favicon:** monogram `FM` — accent square, ink letterforms; SVG + fallbacks.
- No stock imagery. No decorative illustration packs. Texture comes from §6 system.

---

## 9. Component Visual Specs

| Component | Spec |
|---|---|
| **Button / primary** | `--accent` fill, `--accent-ink` text, 999px radius, mono label 500, hover: slight scale `1.02` + accent glow halo `--accent-dim`; active scale `0.98` |
| **Button / ghost** | transparent fill, `1px` `--line` border, `--text`; hover → border `--accent`, text accent |
| **Nav** | glass bar (§6), height 64px; after scroll: blur 16px + bottom hairline; active link = accent dot prefix + accent text; mono labels uppercase |
| **Link (inline)** | `--text`, underline `--line` offset 4px; hover: text + underline → accent, 200ms |
| **Chip (skills/stack)** | glass, 4px radius, mono 0.8125rem, `--text-secondary`; hover: accent border + lift 2px |
| **Card (case study)** | glass, 8px radius, `--line` border; hover: border-accent-dim, `translateY(-4px)`, corner ticks appear |
| **Input / textarea** | `--bg-elevated`, 1px `--line`, 4px radius; focus: border → accent + 2px accent ring 20% alpha; error: `--error` border + mono error msg |
| **Toast** | glass dark, accent-left-border 2px, mono message, slides up 12px, auto-dismiss 3s |
| **Availability (hero eyebrow)** | mono bracket label + accent dot pulsing 2s; merged into the eyebrow, not a separate pill |
| **Numeral ghost** | `--text-numeral`, accent at 25% alpha or `--line`-outlined, positioned behind content |
| **Divider** | 1px `--line` full-bleed, or mono marquee strip |
| **Magnetic CTA** | §7.2.5; pull ≤4px via Motion values, disabled on touch/reduced-motion |
| **Form submit** | primary button; loading = spinner → accent dot bouncing; success → toast + button morphs "SENT ✓" 2s |

---

## 10. Accessibility Guardrails

- Focus ring: `2px solid var(--accent)`, `offset 2px` — never removed, visible on all interactive elements.
- All interactive targets ≥44×44px touch area (incl. chips and mobile nav).
- Accent text only on `--bg`/elevated surfaces (§3.3 matrix).
- Grain overlay never above 0.06 opacity (keeps text crisp).
- Animations verified against §7.3.

---

## 11. Token Reference (implementation-ready)

```css
:root {
  /* color */
  --bg: #0A0B0A; --bg-elevated: #101210;
  --surface-glass: rgba(242,245,242,0.04);
  --line: rgba(242,245,242,0.08);
  --text: #F2F5F2; --text-secondary: #A9AFA8; --text-muted: #7C837B;
  --accent-h: 140;
  --accent: oklch(0.84 0.12 var(--accent-h));
  --accent-dim: oklch(0.84 0.12 var(--accent-h) / 0.14);
  --accent-ink: #0A0B0A;
  --error: #FF6B6B; --warning: #FFD166; --info: #7AB8FF;
  /* motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
  /* radii */ --r-chip: 4px; --r-card: 8px; --r-pill: 999px;
}
```

Tailwind v4: map tokens via `@theme` (e.g. `--color-bg`, `--color-accent`, `--font-display`, `--font-mono`) so utilities stay semantic (`bg-bg`, `text-accent`, `font-mono`).

---

## 12. Do / Don't (anti-slop contract)

**Do**
- Embrace empty space; let one element dominate each viewport.
- Use the mono font for anything meta — it's the voice of the blueprint.
- Keep hover/press feedback on every interactive element.
- Ship the three texture layers exactly as specced.

**Don't**
- No gradients on text, no rainbow shadows, no emoji in UI.
- No stock 3D blob packs / generic "Aurora" backgrounds — the hero 3D is custom and quiet.
- No shadows as depth on dark theme; no borders brighter than content.
- No animation that delays access to content beyond `--dur-page`.
- No third font, no extra accent hues outside the playground system.
- No em-dashes (`—`/`–`) in any UI string; max one `·` per line, prefer `/` or line breaks.
- No scroll cues, version stamps, or decorative status dots (live availability dot excepted).
- Exactly one marquee (footer). Section eyebrows capped at 2 site-wide.
