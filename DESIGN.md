# GameChanger AI — Design System

## Positioning
Boutique AI consultancy for companies running on legacy systems, spreadsheets,
and tribal knowledge. Visual identity reads "senior operators who know the
machinery" — not "AI startup with chatbots." Restraint is the flex.

Reference mood: FT Weekend, Monocle, Basel design annuals, McKinsey partner
decks. Not: SaaS launch pages, Product Hunt, typical AI consultancy gradient-and-glow.

## Technical context
- Framework: Next.js (App Router) — this repo's Next is newer than most LLM
  training data; check node_modules/next/dist/docs/ before using APIs.
- Styling: Tailwind CSS v4 (with `@import "tailwindcss"` + `@theme inline`
  syntax). Do NOT use Tailwind v3 patterns (no `tailwind.config.js`, no
  `@tailwind base/components/utilities`).
- Fonts loaded via `next/font/google` in src/app/layout.tsx:
  - Geist (sans) — exposed as `--font-geist-sans`
  - Geist Mono — exposed as `--font-geist-mono`
  - DM Serif Display — exposed as `--font-serif-display`
- Copy lives in src/content/site.ts — never inline copy into components.

## Color tokens (CSS variables in src/app/globals.css)
- `--background`: #f3f0e8    — bone canvas (primary)
- `--background-elev`: #ece8dc — elevated surfaces (cards, bands)
- `--foreground`: #0f0f0f    — ink (primary text)
- `--foreground-mute`: #5a5a55 — secondary text, captions, meta
- `--rule`: #d6d1c2          — hairlines, borders, dividers
- `--signal`: #1749ff        — cobalt accent (THE single accent color)
- `--signal-ink`: #ffffff    — text on signal backgrounds
- `--warn`: #e53935          — reserved for destructive/error states ONLY
- `--highlight`: #ffde59     — reserved for one specific Mondrian block use
                               in hero; NEVER used elsewhere

### Color rules
- Cobalt (#1749ff) is the only accent. Use for: selection color, primary
  button hover, signal links, single Mondrian block, one hairline emphasis.
- Red (#e53935) and yellow (#ffde59) may appear in ONE Mondrian composition
  in the hero as a deliberate editorial move. They do not appear anywhere
  else on the page.
- Never use gradients. Never glassmorphism. Never glow. Never purple.
  Never rounded pill buttons (max 4px corner radius).

## Typography
- Display (headlines, hero): DM Serif Display, weight 400 only (it's a
  display face, not a body face). Line-height 1.04 on hero, 1.1 on section
  headers. Tracking default.
- Body: Geist, weight 400 for body, 500 for emphasis. Line-height 1.55.
- Navigation, kickers, section labels, numerical stats: Geist Mono,
  uppercase, tracking +0.2em to +0.32em. Size 12px for nav/meta, 14px for
  body-level uses.

### Hierarchy (desktop / mobile)
- Hero H1: 88px / 48px — DM Serif Display, leading 1.04
- Section H2: 56px / 36px — DM Serif Display
- Card H3: 24px / 22px — Geist weight 500
- Body: 18px / 16px — Geist weight 400, leading 1.55
- Kicker/label: 12px — Geist Mono, uppercase, tracking +0.32em
- Stat number: 48px / 32px — DM Serif Display (not mono — numbers sing
  in serif)

## Layout
- Max content width: max-w-7xl (matches existing repo)
- Horizontal padding: 24px mobile, 40px desktop (px-6 md:px-10)
- Vertical section rhythm: 160px desktop, 96px mobile
- 12-column grid on desktop, single-column stack on mobile
- All body copy left-aligned. No centered body copy (reads amateur
  past ~400px width).
- Corner radius: 2-4px on buttons/cards. No pills. No rounded photos.

## Components

### Buttons
- Primary: black fill (#0f0f0f), off-bone text (#f5eded — already in repo),
  rounded-full is OK here as it's the existing convention, keep it
- Secondary: transparent fill, 1px border at black/20, black text, border
  goes to black/50 on hover
- NOTE: the repo uses rounded-full on buttons — keep this as the single
  exception to the "no pill" rule, because it's already everywhere and
  changing it is a refactor, not a design choice.

### Cards
- Border: 1px solid var(--rule)
- Background: var(--background-elev)
- Padding: 40px desktop, 24px mobile
- No shadow. Shadows are a 2019 aesthetic.

### Hairlines
- 1px rules in var(--rule) do the work that gradients and cards do in
  slop-tier sites. Use them to separate stats bars, step sequences, and
  section boundaries.

## Motion
Only two motion primitives:
1. Text and cards fade-rise on scroll entry (y: 12px → 0, opacity 0 → 1,
   400ms ease-out, stagger 60ms).
2. Links and buttons: ink underline grows left-to-right on hover, 200ms.

No parallax. No spring bounces. No magnetic cursors. No particle effects.
No "shimmer" loading states.

## The Mondrian move
The hero includes a Mondrian-style color-block composition on the right
side. This is the site's single most distinctive visual signature. Keep it.
Rules for it:
- Lives ONLY in the hero. Never repeats elsewhere on the page.
- Uses the three editorial colors (#1749ff, #ffde59, #e53935) plus black
  and white, exactly as it does today.
- 2px gap between blocks, min-height 480px, hidden below lg: breakpoint.

## Imagery
- Photography only. No illustrations, no 3D renders, no abstract blobs.
- Team portraits: 1:1 square crop, warm duotone treatment applied at render
  time via CSS filter, so three differently-lit source photos harmonize.
- Blueprint-line diagrams if needed (1px strokes, ink color, no fills).

## Voice (copy that the design has to carry)
- Short sentences. No adverbs. No "transform," "unleash," "supercharge."
- Numbers over adjectives: "2–4 weeks" not "fast."
- One idea per section header. If a header has "and" joining two clauses,
  it's probably two sections.
- Copy already lives in src/content/site.ts — refine copy there, not in
  component files.