# PRD — Portfolio Website: Ahmad Fadly Muktafi

| | |
|---|---|
| **Version** | 1.0 |
| **Date** | 2026-09-06 |
| **Owner** | Ahmad Fadly Muktafi |
| **Status** | Approved |
| **Source content** | `CV.md` |
| **Next deliverables** | `Visual-System.md` → `UX-Blueprint.md` |

---

## 1. Overview

**Product:** Personal portfolio website for Ahmad Fadly Muktafi (display name: "Fadly Muktafi").
**Type:** Single-page immersive web experience (English).
**One-liner:** An immersive, scroll-driven portfolio presenting a fresh-graduate fullstack developer with experimental craft and professional clarity.

**Positioning:** For recruiters, freelance clients, and fellow developers, this portfolio is a 2–5 minute interactive journey that proves technical craft *through the site itself* — not just claims it.

**Design philosophy — "Experimental shell, professional core":**
- *Shell:* bold typography, immersive motion, a WebGL hero moment, playful interactions.
- *Core:* content skimmable in ≤60 seconds; name, role, experience, and contact always one glance away.

---

## 2. Goals & Success Metrics

**Primary goal:** convert recruiters/hiring managers into interview invitations.

| # | Goal | Metric | Target |
|---|------|--------|--------|
| G1 | Get interviews / freelance leads | Contact form submissions + direct emails | ≥2 qualified leads/mo within 3 mo of launch |
| G2 | Recruiter engagement | "Download CV" clicks | ≥30% of sessions |
| G3 | Skimmability | Recruiter finds role, experience, skills, contact | ≤60s (hallway test) |
| G4 | Craft proof | Lighthouse Performance | ≥90 mobile / ≥95 desktop |
| G5 | Accessibility | axe-core critical issues | 0 |
| G6 | Discoverability | Google rank for "Ahmad Fadly Muktafi" | #1 within 4 weeks |

**Secondary:** share-worthy in dev communities; foundation for future expansion (blog, etc.).

---

## 3. Target Audience & Personas

### P1 — Recruiter / Hiring Manager (primary)
- **Behavior:** 30–90s per candidate; scans role → experience → skills → contact; often on desktop.
- **Needs:** instant clarity, CV download, low-friction contact, credibility.
- **Implication:** quick-scan layer; persistent nav; "Download CV" prominent.

### P2 — Potential Freelance Client
- **Needs:** proof of capability, working style, professionalism.
- **Implication:** experience framed as case studies (context → contribution → outcome).

### P3 — Fellow Developers / Community
- **Needs:** technical depth, craft signals, "how is this built".
- **Implication:** immersive interactions shine here; colophon in footer.

### P4 — General / Personal Branding
- **Needs:** quick sense of who Fadly is.
- **Implication:** strong hero identity + about section.

---

## 4. Scope

### In scope (v1.0)
- Single-page site, 5 sections: Hero, About, Experience, Skills, Contact (+ Footer)
- Scroll-driven storytelling in Experience section
- WebGL/3D hero moment (progressive enhancement, lazy-loaded)
- Mini interactive playground in Skills ("Accent Playground")
- Custom cursor (desktop) + Lenis smooth scrolling
- Contact form (API route → email), copy-email button, direct links, CV download
- SEO: meta/OG/Twitter cards, JSON-LD `Person`, sitemap.xml, robots.txt
- English only; dark-first single theme; `prefers-reduced-motion` support
- Vercel deployment (`*.vercel.app`)

### Out of scope (v1.0)
Blog/notes, testimonials, dedicated project pages, i18n (Indonesian), light theme, CMS, custom domain, authentication.

---

## 5. Sitemap & Content Structure

Single page, anchored navigation:

```
/
├── Hero        #01 — name, role, value line, CTAs, 3D moment
├── About       #02 — photo, bio, quick facts, working principles
├── Experience  #03 — scroll-driven journey, case-study cards
│    ├── PT Swadharma Duta Data — Fullstack Developer Intern (Jan–Jun 2026)
│    ├── Djalaludin Pane Foundation — Fullstack Developer Intern (Jan–Jun 2025)
│    └── Leadership — OSIS ICT Head; Basketball Extracurricular Head
├── Skills      #04 — grouped skill system + Accent Playground
├── Contact     #05 — form, copy-email, socials, CV download
└── Footer      — colophon, back-to-top
```

Rationale: experience sits at #03 (before skills) to match recruiter reading order.

---

## 6. Functional Requirements

### Global & Navigation
- **FR-G1** Fixed top nav: monogram ("FM"), links to sections, scrollspy active-state; gains blur/compact style after scroll.
- **FR-G2** Scroll progress indicator (top hairline bar).
- **FR-G3** "Download CV" CTA persistent in nav (desktop) and in mobile menu.
- **FR-G4** Mobile: full-screen overlay menu, staggered link reveal.
- **FR-G5** Lenis smooth scroll; anchors use smooth scroll; all honor reduced-motion.
- **FR-G6** Magnetic hover micro-physics on primary CTAs and nav links (desktop, `pointer: fine`; Motion `useMotionValue`/`useTransform`, spring ~400/30, pull ≤4px). No custom cursor element (accessibility + performance guardrail).
- **FR-G7** Footer colophon: "Designed & built by Ahmad Fadly Muktafi — © 2026", tech note, back-to-top.

### Hero — #01
- **FR-H1** Headline: name + role ("Software Engineer / Fullstack Developer") + 1-line value statement.
- **FR-H2** WebGL ambient background (shader/particle field) behind headline; lazy-loaded; static gradient fallback for low-end & reduced-motion.
- **FR-H3** CTAs: "View Experience" (anchor) + "Download CV" (secondary).
- **FR-H4** Availability status merged into the hero eyebrow (single mono label with live accent dot: `[ ● SOFTWARE ENGINEER · OPEN TO WORK ]`); not a separate badge component.
- **FR-H5** Staged entry animation (staggered word reveal). No scroll cue (banned pattern); scroll affordance comes from visible content below the fold.

### About — #02
- **FR-A1** Professional photo (hi-res asset from owner) + rewritten bio from CV profile.
- **FR-A2** Quick-facts strip: Jakarta, Indonesia · SMKN 64 RPL (2023–2026) · 2 internships / 1+ yr experience.
- **FR-A3** Three working-principle cards from CV traits (problem-solver, asks-when-unclear, fast learner).

### Experience — #03 *(centerpiece)*
- **FR-E1** Scroll-driven journey: pinned section, chapters progress 2025 → 2026 as user scrolls.
- **FR-E2** Case-study card per experience: role, company, period, context (1–2 lines), contributions (≤3, outcome-oriented), stack chips, impact note.
- **FR-E3** Expandable detail (accordion/modal); collapsed state shows skim essentials.
- **FR-E4** Leadership block (compact): OSIS ICT Division Head; Basketball Extracurricular Head.

### Skills — #04
- **FR-S1** Grouped skill system: Languages / Frontend / Backend / Database & Storage / Tools.
- **FR-S2** **Accent Playground:** visitor can change the site's accent color live (hue slider + presets), persisted in localStorage; skill grid reactively restyles. *This is the signature "innovative" element.*
- **FR-S3** Compact soft-skills strip (communication, teamwork, adaptability, etc.).

### Contact — #05
- **FR-C1** Form: name, email, message (+ optional subject); client + server validation (zod); success/error toast; honeypot anti-spam.
- **FR-C2** Backend: Next.js API route → Resend (free tier); basic rate limiting. No database.
- **FR-C3** Copy-email button with toast confirmation.
- **FR-C4** Direct links: email, GitHub, LinkedIn. **Phone number is NOT displayed.**
- **FR-C5** Secondary "Download CV" repeated.

---

## 7. Non-Functional Requirements

### Performance budget
- Lighthouse: Performance ≥90 (mobile) / ≥95 (desktop); Accessibility, Best Practices, SEO ≥95.
- Core Web Vitals (mid-tier mobile, Fast 4G): LCP ≤2.5s · INP ≤200ms · CLS ≤0.05.
- Initial JS ≤300 KB gz; 3D chunk lazy-loaded (excluded from initial).
- Fonts: ≤2 variable families, subset, `display: swap`. Images: AVIF/WebP via `next/image`; photo ≤150 KB.

### Accessibility (WCAG 2.1 AA)
Keyboard-navigable everything; visible focus; `prefers-reduced-motion` disables cursor/3D/smooth-scroll/reveals; contrast ≥4.5:1; semantic landmarks; skip-to-content; labeled form fields.

### SEO
Unique title/meta; OG + Twitter cards (1200×630 OG image); JSON-LD `Person` (name, jobTitle, alumniOf, sameAs); sitemap.xml; robots.txt; single `<h1>`.

### Responsive & browser support
Breakpoints 375 / 768 / 1280 / 1920. Custom cursor + heavy 3D disabled on touch. Last 2 versions of Chrome, Edge, Firefox, Safari (incl. iOS Safari ≥16).

### Privacy
Vercel Analytics only (cookieless). Form data emailed to owner only; nothing stored.

---

## 8. Technical Requirements

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 + CSS custom properties (design tokens)
- **Motion:** Motion (`motion/react`, formerly Framer Motion) as the single animation library; Lenis (smooth scroll). No GSAP: the experience stack uses CSS `sticky` + Motion `useScroll`/`useTransform`
- **3D:** React Three Fiber + drei — one ambient scene, `next/dynamic` lazy, no heavy models
- **Forms:** API route + Resend; zod validation
- **Analytics:** Vercel Analytics + Speed Insights
- **Icons:** `@phosphor-icons/react` (single icon family) · **Fonts:** 2 variable families via `next/font` (final picks in Visual-System.md)
- **Deploy:** Vercel, auto-deploy from `main`

**Structure** (code lives in `web/` because npm forbids the capitalized parent folder; docs stay at root):
```
web/app/            layout.tsx, page.tsx, api/contact/route.ts
web/components/     sections/ (hero, about, experience, skills, contact, footer)
                    fx/ (magnetic, smooth-scroll, webgl-hero, grain)
                    ui/ (button, chip, toast, accordion, ...)
web/lib/            content.ts (typed content data, CMS-ready)
web/public/         photo, cv.pdf, og.png, favicons
```

**Content-as-data:** all experience/skills defined in typed `lib/content.ts` — single source of truth, easy to update.

---

## 9. Content Requirements

- **Language:** English (en-US). **Tone:** confident, concise, first-person, dev-fluent. Show-don't-tell; no buzzword stuffing.
- **Copy source:** `CV.md`, rewritten outcome-oriented for web.
- **NDA-safe case-study rules:** employer name + role + tech stack + general contributions ONLY. No internal data, no screenshots, no confidential project specifics, no metrics that imply internal figures.

- **Design grammar (binding for all UI copy):** zero em-dashes (`—`/`–`); max one `·` per line, prefer `/` or line breaks; eyebrow labels at most 2 site-wide (hero + experience); no version stamps, scroll cues, or decorative dots (live availability dot excepted); exactly one marquee (footer); every CTA label fits one line at desktop and reuses the same label per intent site-wide.

**Owner must supply before launch:**
1. GitHub URL & LinkedIn URL
2. Hi-res professional photo
3. Final CV PDF (for download button)
4. Receiving email address for contact form

---

## 10. Design Direction (summary)

Bold & experimental; dark-first; strong type hierarchy with oversized section numerals (#01–#05); vivid accent color that visitors can remix (Accent Playground); generous negative space; subtle grain texture.

→ Full tokens, type scale, color, motion specs: **`Visual-System.md`** (next deliverable).

---

## 11. UX Principles (summary)

≤60s skim layer · progressive disclosure · one primary action per viewport · motion with meaning (never blocks content) · instant feedback (toasts, states) · reduced-motion parity.

→ Flows, wireframe descriptions, interaction states: **`UX-Blueprint.md`**.

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3D/heavy motion hurts low-end devices | G4 fail, bounce | Lazy 3D, static fallback, perf budget enforced (Lighthouse CI) |
| Experimental layout hurts recruiter skim | G3 fail | Quick-scan layer rule; 5-person hallway test pre-launch |
| NDA breach in case studies | Professional/legal | §9 copy rules; owner review gate before launch |
| Scope creep (blog/i18n) | Delay | Strict §4 out-of-scope; backlog list |
| Form spam | Noise | Honeypot + rate limit |
| Missing assets (photo/links) | Launch slip | §9 checklist; placeholder strategy |

---

## 13. Milestones

| # | Milestone | Output |
|---|-----------|--------|
| M1 | PRD approved | this document |
| M2 | Visual system | `Visual-System.md` |
| M3 | UX blueprint | `UX-Blueprint.md` |
| M4 | Scaffold + content data | repo, section skeletons, `content.ts` |
| M5 | Core build | all sections functional + responsive |
| M6 | Immersion layer | Lenis, cursor, Framer Motion, 3D hero, playground |
| M7 | Polish | SEO, a11y, performance budget, QA |
| M8 | Launch | Vercel deploy + post-launch checklist |

---

## 14. Future Backlog

Light theme · blog/notes (MDX) · testimonials · custom domain · Indonesian i18n · deep-dive case study pages · "uses" page.
