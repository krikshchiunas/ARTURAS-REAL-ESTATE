# Hubtown.co.in — Full Site Research (reference for the maison-noir redesign)

Researched 2026-07-05. Goal: rebuild maison-noir (Phuket real estate) with the same visual language,
interaction model and functionality as hubtown.co.in — with our own brand, content, assets.

Original: built by **Unseen Studio** (unseen.co), Awwwards Site of the Day 2026-06-10 (score 7.66),
Developer Award. Categories: Experimental / Real Estate / 3D / Storytelling / Interaction Design.

---

## 1. Tech stack (original)

| Layer | Original (Hubtown) | Our equivalent (maison-noir) |
|---|---|---|
| Framework | Nuxt 3 (Vue, SSG prerender, `_payload.json`) | Next.js 14 (already in repo) |
| Hosting | Netlify (`hubtown-live.netlify.app`) | Vercel (already set up, push-to-main deploys) |
| CMS | Sanity (projectId `7m7t0x6z`, dataset `production`, public API) | Local TS/JSON data (existing) — CMS optional later |
| Styling | Tailwind CSS (custom scale) | Tailwind (already in repo) |
| Smooth scroll | Lenis | Lenis (already in repo) |
| Animation | GSAP + ScrollTrigger + SplitText + ScrollSmoother + Flip + Observer | GSAP (already in repo; all plugins free since Webflow acquisition) |
| 3D | Three.js (vanilla) + Theatre.js (@theatre/core + studio) for scroll/camera choreography | React Three Fiber + drei; Theatre.js optional (GSAP timelines may suffice) |
| 3D assets | GLB (draco + meshopt), KTX2/basis textures | Same pipeline (gltf-transform, toktx) |
| Audio | WebAudio: ambient loop + UI sounds, Sound On/Off toggle | Same (CC0/generated sounds) |
| Forms | POST `/api/contact` (Nuxt server route) | Next.js route handler `/api/contact` (existing rate-limit/honeypot hardening applies) |
| Chat | WhatsApp deep link (wa.me) | Same |
| Analytics | GA4 (gtag) | keep whatever repo has |

## 2. Design system

### Colors (single-hue dark system)
- Background: `#020a19` (near-black navy) — the whole site sits on this
- Text/foreground: `#d5e0ff` ("off-white" periwinkle) + alpha steps: `1a` (10%), `0d` (5%), `4d` (30%), `26` (15%)
- Accent deep blue: `#052261` (glows, gradients)
- Everything else is the same hue at different alphas — borders are `#d5e0ff1a`, panels `#0c1524e6`
- WebGL scene glow: electric blue cube + dark terrain + water (see `/images/share_asset.jpg` OG ref)

### Typography
- Display: **Px Grotesk** (Optimo, commercial) in Light/Regular/Bold → we use **Space Grotesk** (or Hanken Grotesk) free
- Data/HUD/labels: **Commit Mono** (free, commitmono.com) regular + bold — used for numbers, labels, "Informations Data" blocks, HUD readouts
- Tailwind scale is pixel-named: `.text-9` … `.text-320` (0.5625rem → 20rem). Headlines: 54px mobile → 140–180px desktop, up to 320px
- Headlines: uppercase, bold, `leading-0.8/0.9`, tight tracking; body: light weight, `leading-1.6`
- Breakpoints: 480 / 768 / 1024 / 1366 / 2560 / 3840 (4K supported)

### Signature UI patterns
- **Preloader**: `0% Loading content → 100% Loaded → Ready to Explore` percentage counter
- **HUD "targeting brackets"** hover: buttons have 8 corner/edge dots (`w-4 h-4 bg-currentColor`) that animate on hover
- Numbered lists everywhere: `001 / 002 / 003`, links `01–06` (mono font)
- **Odometer stats**: digit columns 0-9 that roll (45M / 20M / 10M sq ft)
- "Informations Data" spec-sheet blocks: mono labels (`Created 1989`, `Chairman …`)
- Full-screen menu overlay listing regions with project counts (`09 PROJECTS — Central Suburbs`…)
- Footer: giant "Work with us" CTA + numbered links + `Sound Off` + `Prev./Next` page nav + "Chat with us"
- Custom cursor & mouse-reveal effects (Awwwards notes)

## 3. Sitemap & templates (original)

Pages: `/` `/about` `/careers` `/contact` `/news` `/approvals` `/investor-relations`
`/privacy-policy` `/registration` `/regulation-policy` `/terms-and-conditions` + `/map` + `/map/{slug}` × ~50 projects

### Home — WebGL scroll narrative
6 chapters over 4+ GLB scenes (`scene_1…scene_4.glb`, `scene_2-line.glb`), Theatre.js choreographed, ambient audio:
Future → Innovation → Collaboration → Excellence → Purpose → Legacy.
Each chapter: mono chapter label, huge split headline ("We build / the future / of real estate"), short paragraph, CTA.
Hero = glowing blue cube floating over water between dark terrain (textures: `hero-cube-{ao,details,edges,grid,hex}.ktx2`, `water-normal`, `terrain_normal`, matcaps, noise, voronoi).

### About
Hero ("Shape the future" → "The most reliable real estate developers in India") → intro paragraphs →
company spec-sheet (Created/Originally Named/Chairman) → odometer stats ×3 → Our Values split-cards
001–004 (Purpose/Growth/Teamwork/Unity) → footer CTA.

### Projects = `/map` (interactive app)
3D map of Mumbai (`map.glb`, `map-districts.glb`, `map-cube.glb`, terrain normals, water shader).
HUD: zoom (`1.0x`), scale bar (`1km`), compass (`N 000°`, N/S/W/E), `Click to explore`.
Filters + `project list` panel + `[00]` counters. Project cards: PROJECT / LOCATION / STATUS / TYPE / YEAR / Discover More.
`/map/{slug}` = project detail overlay on top of the map (deep-linkable, prerendered).

### Project detail (data model from Sanity `project` type)
`title, slug, city, type (residential/commercial/…), status (finished/ongoing/upcoming), year,
location, locationsAddress, locationsLatitude/Longitude, locationsGoogleMyBusinessUrl, locationsImage,
coordinates ("18.58 N. 72.48 E" display string), heroImage, mediaTopImage,
splitHeading + splitContent (rich text), creditsTeam[{name,role}], creditsPartnerLogos[]`

### Careers
Narrative page: "Build Together" hero → "We shape Futures/Communities/Experiences 001–003" →
Vision → spec-sheet (Founded 1989 / Multidisciplinary / 550+ Employees) → Impact → values cards → CTA.

### Contact
"Get in touch" hero → contact info (phone/email, mono labels) → "Drop Us A line" form:
first/last name, email, phone with full country-code select, message → POST `/api/contact`.

### News
"Newsroom, 6 of 54 articles" — paginated press list: source, date (DD.MM.YY), title. Single Sanity doc with `articles[]`.

### Misc
- Sanity doc types: `about, approvals, careers, contact, investorRelations, news, privacyPolicy, project, registration, regulationPolicy, siteSettingsSchema, termsAndConditions`
- Sounds: `/audio/{ambient-loop,click,hover,secondary-hover,modal-open,home-transition}.wav`
- robots.txt: AI-crawler allowlist (GPTBot, ClaudeBot…) — we already have this on maison-noir
- `Login` menu item → external portal; `Sound Off` toggle in footer; WhatsApp chat chip

## 4. Licensing notes for our rebuild
- **Px Grotesk**: commercial (Optimo) → replaced with Space Grotesk/Hanken Grotesk (OFL)
- **Commit Mono**: free (OFL) → use as-is
- **GSAP + all plugins** (SplitText, ScrollSmoother…): free since 2025
- **Theatre.js**: Apache-2.0
- Hubtown's GLB models, KTX2 textures, photos, copy, logo: **copyrighted — do not rip**. We build our own
  procedural scenes (cube, water, Phuket terrain from public DEM data) and write our own copy.

## 5. Decisions taken (2026-07-05)
1. Build in this repo on branch `redesign-hubtown-style` (main untouched until merge)
2. Phased: full site with WebGL home first → 3D Phuket map as its own late phase
3. Fonts: free analogs (Space Grotesk + Commit Mono)
4. Locales: EN + RU first, uk/de/th after design sign-off

## 6. Build phases
- **Phase 0 — Foundation**: design tokens (colors/type scale/breakpoints), fonts, Tailwind config,
  Lenis + GSAP setup, EN+RU i18n skeleton, sound manager, preloader, page-transition shell
- **Phase 1 — Chrome**: menu overlay (Phuket regions + project counts), footer (CTA, numbered links,
  Sound toggle, Prev./Next), HUD-bracket buttons, custom cursor, WhatsApp chip
- **Phase 2 — Static pages**: About (hero/spec-sheet/odometers/values), Contact (+ `/api/contact`),
  Privacy/Terms; Careers & News optional (client to confirm)
- **Phase 3 — WebGL home**: R3F canvas, cube-over-water hero (custom shaders), 6-chapter scroll
  narrative adapted to Phuket copy, audio integration
- **Phase 4 — Content & locales**: EN+RU copy, project data mapped to Hubtown-style model, SEO/OG/sitemap,
  keep existing GEO/LLMO work (llms.txt etc.)
- **Phase 5 — 3D Phuket map**: DEM terrain mesh, water, district split, project markers, HUD
  (zoom/compass/scale), filters, list panel, project-detail overlay, `/map/{slug}` deep links
- **Phase 6 — Polish**: KTX2/draco compression, mobile WebGL fallbacks, reduced-motion, a11y, Lighthouse, QA

## 7. Needed from client
- About/odometer facts (founding year, № villas/projects, m² built, team size)
- Contact details (phone, email, WhatsApp number for wa.me)
- Confirm whether Careers and News pages are needed
- Everything else (3D, sounds, copy drafts, photos) can be produced in-house
