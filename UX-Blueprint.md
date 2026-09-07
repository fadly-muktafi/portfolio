# UX Blueprint — Portfolio Website: Ahmad Fadly Muktafi

| | |
|---|---|
| **Version** | 1.0 |
| **Date** | 2026-09-06 |
| **Owner** | Ahmad Fadly Muktafi |
| **Status** | Approved direction |
| **Based on** | `PRD.md` v1.0 · `Visual-System.md` v1.0 |
| **Next step** | M4 — Scaffold & build |

> This document defines how the site *behaves*: flows, section anatomy, interaction states, scroll choreography, microcopy, and edge cases. Layout/text styling follows `Visual-System.md`.

---

## 1. UX Principles

1. **≤60-second skim layer** — a recruiter landing anywhere can extract: name → role → experience → skills → contact without scrolling twice.
2. **Progressive disclosure** — collapsed summaries first; depth (expandable case studies) one click away, never forced.
3. **One primary action per viewport** — every screen state has exactly one obvious next step.
4. **Motion with meaning** — animation orients (where am I, what changed), never decorates for its own sake and never blocks content.
5. **Instant feedback** — every press, copy, submit, and playground tweak responds within 100ms.
6. **Reduced-motion parity** — identical content & capability, calmer delivery.

---

## 2. Information Architecture & Navigation

Single page, five anchored sections (PRD §5):

```
NAV (fixed, glass after scroll)
LOGO: FM monogram ........ LINKS: About · Experience · Skills · Contact ... [Download CV]
Progress: 1px accent hairline under nav, width = scroll %
```

- Active section: scrollspy → nav link gets accent dot + accent text.
- Anchor scroll: Lenis smooth scroll, `--dur-ui`; URL hash updates silently.
- Mobile (<768px): hamburger → full-screen overlay menu, links stagger in (60ms each), large display-type links, CV CTA pinned at bottom of overlay.
- Skip-to-content link: first focusable element, revealed on Tab.

---

## 3. Persona Flows

### 3.1 Recruiter flow (primary) — target ≤60s
```
Land (Hero) → sees name, role, "Open to opportunities", CTAs            [5s]
  ├─ Path A (skim):  click "View experience" → stacked cards
  │                  → reads collapsed cards (role, company, period, stack)
  │                  → clicks "Download CV" in nav                        [≤60s] ✅
  ├─ Path B (deep):  expand a case study card in-place → reads impact
  │                  → scrolls Skills → Contact → sends form              [~3min]
  └─ Path C (print): Cmd+P / Download CV directly from nav                [~15s]
```

### 3.2 Freelance client flow
Hero → Experience case studies (outcome framing) → About (photo, principles) → Contact form. Trust built via concrete contributions + working principles cards.

### 3.3 Developer/community flow
Explores deliberately: tests custom cursor, plays with Accent Playground (hue slider → whole site re-lights), inspects hero 3D, reads footer colophon ("how it's built"). These visitors generate shares.

---

## 4. Section Blueprints

Conventions: [n] = content block order; "reveal" = scroll-in animation (`--ease-out-expo`, once).

### 4.1 Global chrome
- **Nav** — §2. States: top (transparent) → scrolled (glass + hairline). Always present.
- **Magnetic hover** — desktop only: CTAs and nav links pull ≤4px toward the pointer (Motion values, spring 400/30). No custom cursor element: native cursor stays for accessibility and performance.
- **Progress hairline** — 1px, accent, under nav.
- **Grain layer** — global, inert; animated film-grain flick (steps), off under reduced motion. No grid wallpaper, no section dividers: pure void + grain.

### 4.2 Hero — #01 (first viewport, 100svh)

```
┌────────────────────────────────────────────────┐
│ [ ● SOFTWARE ENGINEER · OPEN TO WORK ]        ← single eyebrow: role + live availability dot
│                                          ◍ 3D ambient field (behind, lazy)
│
│  FADLY                                        ← display-xl, line 1
│  MUKTAFI                                      ← display-xl, line 2 (accent period "."
│                                                at end)
│  Fullstack developer building reliable web
│  products, from database to interface.        ← lead, ≤20 words, max 3 lines
│
│  [ View experience ]   [ Download CV ]        ← primary solid + ghost
│                                               
│  (no scroll cue, no meta strip. Hero ends clean.)
└────────────────────────────────────────────────┘
```

- **Load sequence (≤1.2s total):** eyebrow → name lines (stagger 80ms) → lead → CTAs. Then 3D fades in (≤300ms) once loaded; if 3D fails/slow → static gradient, no loader UI.
- **Interactions:** name subtly parallaxes on pointer (≤10px); "View experience" → anchor to #03; "Download CV" → direct PDF download (new tab fallback).
- **States:** reduced-motion → all visible instantly, 3D off. Mobile → 3D off, type scale via clamp.

### 4.3 About — #02

```
#02  (ghost numeral only, no eyebrow)
"I like hard problems and honest questions."      ← display title
┌─ photo (glass frame, corner ticks, B&W) ─┐  ┌─ bio: 3–4 sentences (from CV profile, web voice)
│  hover → full color                       │  │ quick facts strip: JAKARTA / SMKN64 RPL '26 / 2 INTERNSHIPS
└───────────────────────────────────────────┘  └─ principles ×3 (cards): 
                                                   01 Dig into the problem
                                                   02 Ask when it's unclear
                                                   03 Learn fast, ship anyway
```

- Photo hover = grayscale→color (400ms). Principle cards: glass, hover border → accent.
- Reveal: title → photo+text → facts → cards (stagger 60ms).

### 4.4 Experience — #03 (centerpiece: **pinned stacked cards**)

```
[ EXPERIENCE ]  #03
"What I've shipped & learned"                     ← display title
(CHAPTER: 2026) ─────────────────────
 CARD 1 (sticky)  PT SWADHARMA DUTA DATA — Fullstack Developer Intern
                  Jan–Jun 2026 · Jakarta
                  Context 1–2 lines (HR management system, enterprise stack)
                  ▸ ZUL · Java/ZK · JavaScript · SQL Server · Hibernate   (chips)
                  [ + VIEW CASE ]  ← expands accordion in-place
(CHAPTER: 2025) card 2 stacks OVER card 1 on scroll ──
 CARD 2           DJALALUDIN PANE FOUNDATION — Fullstack Developer Intern
                  ...same anatomy...
(LEADERSHIP) ────
 compact 2-col: OSIS — Head of ICT Division · Basketball — Head of
 Extracurricular (year + 1-line each; glass, no expansion)
```

**Scroll mechanics (desktop):**
1. Section pins; Card 1 rests. Continued scroll slides Card 2 up over Card 1 (stacked-deck effect), chapter label crossfades 2026→2025.
2. After stack completes, section unpins; leadership block scrolls normally.
3. Progress: mono counter `01/02` beside chapter label.

**Expand in-place (accordion):**
- Collapsed = skim layer (role, company, period, chips, one-line context).
- Click `[ + VIEW CASE ]` → card expands: `What I did` (≤3 outcome bullets), `Impact` (1 line, NDA-safe), mono labels. Button morphs to `[ − CLOSE ]`.
- Only one card expanded at a time; expanding during pin is allowed (card grows, layout adjusts).
- Stack implementation: CSS `sticky` + Motion `useScroll`/`useTransform` scrub (no GSAP; single animation library).

- **Mobile:** no pinning — cards stack vertically with normal reveal; expansion identical.

### 4.5 Skills — #04 (playground)

```
#04  (ghost numeral only, no eyebrow)
"Tools I reach for"                              ← display title
┌ ACCENT PLAYGROUND ────────────────────────┐
│  MAKE THIS SITE YOURS — drag the hue:      │  mono eyebrow
│  [────────●────────]  MINT 140°            │  slider + live hue readout
│  presets: ● ● ● ● ●   [ Reset ]            │  mint/lime/cobalt/tangerine/magenta
└────────────────────────────────────────────┘
GROUPS (grid, chips):  LANGUAGES / FRONTEND / BACKEND / DATABASE & STORAGE / TOOLS
SOFT SKILLS (single mono strip): Communication · Problem-solving · Teamwork · ...
```

- **Playground behavior:** drag slider → `--accent-h` updates live; entire site re-colors over `--dur-ui` (the payoff). Presets snap. Persist localStorage; `Reset` → 140 (brand default).
- Chips react to accent (border/tint on hover).
- Group reveal: stagger 40ms per chip row. Reduced-motion: hue change is instant (no transition), everything works.

### 4.6 Contact — #05

```
#05  (ghost numeral only, no eyebrow)
"Let's build something."                          ← display title
┌─ LEFT: form ─────────────┐  ┌─ RIGHT: direct ──────────────┐
│ NAME     [____________]  │  │ EMAIL  fadlymuktafi@gmail.com │
│ EMAIL    [____________]  │  │        [ COPY ] → "Copied."   │
│ SUBJECT  [____________]  │  │ GITHUB  github.com/…  ↗       │
│ MESSAGE  [____________]  │  │ LINKEDIN linkedin.com/in/… ↗  │
│          [____________]  │  │ [ Download CV ]               │
│ [ Send message ]         │  │ mono note: replies within 24h │
└──────────────────────────┘  └───────────────────────────────┘
```

- Validation inline on blur; submit disabled → loading (accent dot pulse) → success: button morphs `SENT ✓` + toast "Message sent — I'll get back within 24h" and form resets. Error: toast "Couldn't send. Email me directly →" (mailto).
- Honeypot hidden field; server re-validates (zod).
- Copy button: clipboard + toast "Email copied to clipboard". 
- External links open new tab with `↗` affordance.

### 4.7 Footer

```
─────────────────────────────────────────────────────────────
mono marquee (infinite, the only marquee on the page):  SOFTWARE ENGINEER / FULLSTACK / JAKARTA / 2026
© 2026 AHMAD FADLY MUKTAFI · DESIGNED & BUILT WITH NEXT.JS · [ BACK TO TOP ↑ ]
```

- Marquee 25s loop (static when reduced-motion). Back-to-top: smooth scroll to 0.

---

## 5. Scroll Choreography Map

| Scroll position | Event | Duration/easing |
|---|---|---|
| 0 (load) | Hero staged intro (§4.2) | ≤1.2s |
| >5% | Nav gains glass + hairline; progress bar activates | 300ms |
| Section enters (once) | numeral/title → content reveals | 600–900ms, expo |
| Experience pin | card stack swap 2026→2025; counter updates | scrubbed |
| Playground in view | slider nudge hint (1 gentle pulse, once) | 500ms |
| Footer | marquee continuous | 25s loop |

No scroll-jacking; Lenis only smooths. All reveals fire once.

---

## 6. Interaction States Inventory

| Element | Default | Hover | Focus | Active | Disabled/Loading |
|---|---|---|---|---|---|
| Primary CTA | accent fill | scale 1.02 + glow | 2px accent ring | scale 0.98 | 50% opacity; spinner dot |
| Ghost button | line border | accent border/text | ring | scale 0.98 | 40% opacity |
| Nav link | text-secondary | text | ring | accent + dot (active section) | — |
| Expand trigger `[+ VIEW CASE]` | mono, line | accent | ring | — | — |
| Chip | glass | accent border, lift 2px | ring | — | — |
| Input | line border | — | accent border+ring | — | error: red border + mono msg |
| Hue slider | accent thumb | grows 1.2× | ring | grab cursor | — |
| Copy button | mono `COPY` | accent | ring | — | → `COPIED.` 2s |
| Card | glass | border-accent-dim, −4px | — | — | — |

---

## 7. Mobile Adaptations (<768px)

- 3D hero, custom cursor, section pinning: **off**. Content + playground fully functional.
- Hero type scales via clamp; CTAs full-width stacked.
- Experience cards: vertical stack, normal reveal (no pin).
- Playground slider: full-width, large thumb (≥44px).
- Form: single column; direct-links block below form.
- Overlay menu: §2. Touch targets ≥44px everywhere.

---

## 8. Microcopy Deck (professional & crisp)

| Slot | Copy |
|---|---|
| Hero CTAs | `View experience` / `Download CV` |
| Hero eyebrow | `● SOFTWARE ENGINEER · OPEN TO WORK` |
| Nav CV | `CV ↓` |
| Case trigger | `+ VIEW CASE` / `- CLOSE` |
| Playground eyebrow | `MAKE THIS SITE YOURS` · hint: `Drag to change the accent — it sticks.` |
| Reset | `Reset` |
| Copy feedback | `Email copied to clipboard` |
| Form submit | `Send message` → loading `SENDING` → success `SENT` |
| Toast success | `Message sent. I'll reply within 24 hours.` |
| Toast error | `Couldn't send. Try again or email me directly.` |
| Validation | `Required field` · `That email doesn't look right` |
| Back to top | `BACK TO TOP ↑` |
| Footer colophon | `Designed & built by Ahmad Fadly Muktafi — © 2026` |

---

## 9. Edge Cases & Error States

| Case | Handling |
|---|---|
| 3D fails / no WebGL | Static gradient hero; zero UI difference otherwise |
| JS disabled | Full content readable (SSR), anchors native, form posts to API route |
| Form offline/500 | error toast (§8); message kept in textarea (no data loss) |
| Clipboard denied | toast shows the email text for manual copy |
| Culture-fit: no photo asset yet | glass monogram placeholder `FM` in About frame |
| Very slow network | fonts swap in; 3D never blocks; all text visible pre-hydration |
| localStorage blocked | playground works for session; reset on reload (silent) |
| Hash deep-link (`#03`) | scrolls instantly to section; pin state calculated correctly |

---

## 10. Accessibility UX

- **Tab order:** skip-link → nav → hero CTAs → per-section DOM order → form → footer.
- Accordion: `<button>` + `aria-expanded`; pinned region uses `region` role with label `Experience timeline`.
- Slider: native `<input type="range">`, `aria-label="Accent hue"`, arrow-key operable.
- Toasts: `role="status"`, polite announcements; errors `role="alert"`.
- Focus visible always (2px accent ring); no keyboard traps in overlay menu (Esc closes, focus returns).
- Reduced motion: per Visual-System §7.3 — parity of content and function.

---

## 11. Analytics Event Map (ties to PRD goals)

| Event | Trigger | Goal |
|---|---|---|
| `cv_download` | CV CTA click (nav/hero/contact) | G2 |
| `contact_submit_success` | form success | G1 |
| `email_copied` | copy button | G1 |
| `case_expand` | accordion open (props: company) | engagement |
| `accent_change` | hue slider commit / preset | playground usage |
| `section_view` | ≥50% in view ≥2s (props: id) | skim analysis |

Privacy-friendly (Vercel Analytics custom events); no PII collected.

---

## 12. Pre-launch UX Checklist

- [ ] **Skim test:** 5 people, 60s on site → can name role, 2 employers, top skills, how to contact (G3)
- [ ] Keyboard-only full pass (nav, accordion, slider, form)
- [ ] Reduced-motion pass × (macOS + Windows + iOS)
- [ ] Lighthouse mobile ≥90 (perf) with 3D on
- [ ] Form: validation, success, error, honeypot, rate-limit verified
- [ ] Copy deck proofread (zero typos — Awwwards content criterion)
- [ ] All §9 edge cases manually triggered once
- [ ] Owner gate: NDA review of case-study copy (PRD §9)
- [ ] Em-dash audit: zero `—`/`–` in rendered UI strings
- [ ] Eyebrow count ≤2 site-wide; no scroll cues; no version stamps; dots only for live availability
- [ ] Every CTA fits one line at desktop; text/background contrast ≥4.5:1; same intent = same label
- [ ] Exactly one marquee (footer); magnetic hover off on touch/reduced-motion
