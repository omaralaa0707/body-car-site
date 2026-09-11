# Body Car — site 33 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Body Car, and not an official site.**

- **Live:** https://body-car-site.vercel.app
- **Repo:** [body-car-site](https://github.com/omaralaa0707/body-car-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Their real showroom, measured: the near-black polished floor #0D0C0A as ground, a raised panel stepped up from it, cream #F3EDE3 text, and their honey wood accent panel lifted to #A8703A for fills. Their literal identity is a gold neon sign — benched for the seventh time under the 02 rule (after 08, 09, 14, 27, 30, 31) — and gold survives only as a restricted accent: the mark, the sign quotation, and the CTA/caliper markers in the 3D piece, never a surface

**Type pairing**
: Libre Franklin + Source Sans 3 / Amiri Quran + IBM Plex Sans Arabic (AR)

**3D / signature technique**
: **The rails**: six of their own published two-option financing plans, each drawn as the literal 3D line through its own two real (down-payment, instalment) points, extended and dashed beyond them, stacked at even depth intervals and viewed through a real perspective camera — so the six independently-priced, unrelated cars visibly converge toward a shared vanishing point, which is the optical signature of six lines sharing one slope. A pointer-dragged camera orbit and a down-payment "caliper" (a translucent plane plus a synced marker on every rail, computed from each rail's own real two-point equation, never an invented range) let a visitor test the convergence themselves

**Motion language**
: **The balance**: alternating blocks slide in from opposite sides and settle flat with no overshoot — a ledger squaring up, not a fall, roll or turn. Distinct from every other directional arrival: two adjacent elements always approach from opposite edges rather than a shared direction

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/bodycar_am/
- Facebook: https://www.facebook.com/bodycar.ahmedmostafa/

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
