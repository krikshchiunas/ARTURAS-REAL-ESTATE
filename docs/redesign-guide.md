# Arturas Redesign (Hubtown-style) — Build Guide & Go-Live Checklist

The redesign lives at `/{lang}/redesign/*` alongside the current site, which is
untouched. All redesign routes are `robots: noindex` until launch. Built on
branch `redesign-hubtown-style`.

## Routes

| URL | File | What |
|---|---|---|
| `/{lang}/redesign` | `app/[lang]/redesign/page.tsx` | WebGL home — cube over water, 6-chapter scroll narrative |
| `/{lang}/redesign/about` | `.../about/page.tsx` | Hero reveal, manifesto, spec-sheet, odometers, process cards |
| `/{lang}/redesign/contact` | `.../contact/page.tsx` | Channels + lead form → `/api/telegram-lead` |
| `/{lang}/redesign/map` | `.../map/page.tsx` | Interactive 3D Phuket map |
| `/{lang}/redesign/map/{slug}` | `.../map/[slug]/page.tsx` | Map with a project overlay pre-opened (deep-link) |

`{lang}` ∈ `en, ru, uk, de, th`. Layout (header, menu, footer, cursor, chat chip,
preloader) is `app/[lang]/redesign/layout.tsx`. There is no separate `projects`
route — the menu's **Projects** item points at `/map`, as in the reference.

## Фоны страниц (макеты Артураса)

Три фоновые сцены пришли отдельными макетами и портированы 1:1 с three r128 на
0.169. Оригиналы лежат вне репозитория, на Рабочем столе:

| Макет | Файл-источник | Куда встало |
|---|---|---|
| «фон 1» | `фон 1/about-path.html` | `webgl/AboutPathScene.tsx` → About |
| «фон 2» | `фон 2/contact-cube.html` | `webgl/ContactCubeScene.tsx` → Contact |
| «фон 3» | `фон 3/` (папка в репозитории) | `map/MapScene.tsx` → Projects |

Что пришлось поправить при переносе версий three (и почему это нельзя «вернуть
как в макете»):

- `outputEncoding` → `outputColorSpace`. About ставил sRGB явно — там
  `SRGBColorSpace`. Contact не ставил ничего, а с r152 умолчание сменилось на
  sRGB, поэтому там выставлен `LinearSRGBColorSpace` — иначе сцена выцветает.
- Точечные источники с r165 считаются в канделах: интенсивность в About
  умножена на `4π` (`POINT_LIGHT_SCALE`), иначе улица тонет в темноте.
- Потолок `setPixelRatio` снижен с 3 до 2: в макете сцена была одна на странице,
  здесь она фон под контентом.

Тяжёлые текстуры вынесены в `public/redesign/`: небо About пережато из
7.8 МБ PNG в 553 КБ JPEG, пять текстур Contact вынуты из base64 в макете
(скрипт разбора — разовый, в репозитории не хранится).

## Component map (`components/redesign/`)

- `dict.ts` — all redesign copy, 5 locales (chrome, page strings, home chapters, map labels). Region→project counts, page order.
- `Header.tsx` + `MenuOverlay.tsx` — wordmark + full-screen menu (regions, socials, lang switch).
- `Footer.tsx` — "Work with us" CTA, numbered socials, Sound toggle, Prev./Next.
- `SoundManager.tsx` — WebAudio ambient + UI sounds, `SoundToggle`. Files in `public/audio/*.wav`.
- `Preloader.tsx` — `0% → 100% → Ready` counter, once/session. Fires `arturas:ready` event. `?nopreload` skips it (dev/tests).
- `BracketButton.tsx`, `Cursor.tsx`, `ChatChip.tsx`, `PageTransition.tsx` — chrome primitives.
- `Reveal.tsx` — `Reveal` (fade-up) + `HeadlineReveal` (SplitText line masks).
- `Odometer.tsx` — rolling digit columns for stats.
- `LeadForm.tsx` — contact form, identical contract to old `components/sections/Contact.tsx`.
- `webgl/` — `HomeScene` (procedural shaders + camera curve), `HomeNarrative` (scroll track), `HomeExperience` (WebGL/reduced-motion switch), `AboutPathScene` + `ContactCubeScene` (фоны страниц, см. ниже), `SceneBackdrop` (клиентская обёртка над ними).
- `map/` — `phuketGeo.ts` (region classify + pin placement), `MapScene` (island/ocean/markers), `MapExperience` (HUD, filters, list, overlay).

## Версии React и R3F — не откатывать

Next 15 отдаёт клиентским компонентам **свой** React 19. Поэтому проект обязан
быть на React 19: с React 18 в `package.json` любая сцена на `@react-three/fiber`
падает с `Cannot read properties of undefined (reading 'ReactCurrentOwner')` —
`react-reconciler` ищет внутренности React 18 (`__SECRET_INTERNALS_…`), а Next
подкладывает React 19, где они называются `__CLIENT_INTERNALS_…`.

Рабочая связка: `react`/`react-dom` 19, `@react-three/fiber` 9, `@react-three/drei` 10.

`@react-three/postprocessing` **прибит к 3.0.4 без каретки** намеренно: с 3.0.5
он требует `three >= 0.182`, а проект на `three` 0.169. Поднимать его можно
только вместе с `three` и `@types/three`.

## Design tokens (`tailwind.config.ts`)

- Colors: `night #020a19`, `night-raised #0c1524`, `royal #052261`, `offwhite #d5e0ff`.
- Pixel type scale `text-9 … text-320`; line-heights `leading-0.8/0.9/1.6`; `tracking-4` for mono HUD.
- Fonts: `Onest` (display, free Px Grotesk substitute) + `JetBrains Mono`, wired in `app/[lang]/redesign` via root layout.

## Go-live steps (when approved)

1. **Promote routes**: move the six redesign pages up one level (drop the `redesign/`
   segment) so they become the primary site, OR keep `/redesign` and add rewrites.
   Simplest: replace `app/[lang]/page.tsx` (+ about/projects/contact/map) with the
   redesign versions and move `app/[lang]/redesign/layout.tsx` chrome to `app/[lang]/layout.tsx`
   (currently the root layout wraps the OLD site chrome — reconcile them).
2. **Remove `robots: { index: false }`** from every redesign page's `metadata`.
3. **Update `app/sitemap.ts` and `llms.txt`** to point at the new URLs.
4. **Point the map overlay "Discover more"** at the promoted project pages (currently `/{lang}/projects/{slug}` — the old detail pages, which stay valid).
5. **Verify `NEXT_PUBLIC_SITE_URL` + Telegram env vars** on Vercel (form uses them).
6. `npm run build` locally → then `git push` to `main` (Vercel auto-deploys — this is the deploy step, do it deliberately).

## Optional upgrades (not blocking)

- Buy **Px Grotesk** (Optimo) and swap the `Onest` import for a 1:1 typographic match.
- Replace the procedural island with **real Phuket DEM terrain** (SRTM/open elevation → heightmap).
- Compress any future textures to **KTX2** (`toktx`) and meshes with **draco** — current scenes are shader-only, nothing to compress yet.
- Convert `public/audio/*.wav` (~0.5 MB ambient) to a short looped **.opus/.m4a** to cut payload.
- Add a **project detail template** inside the redesign (currently overlay → old detail page).

## Known non-issues

- In the preview harness the R3F canvas can freeze at 300×150 after a programmatic
  viewport resize; a `window` `resize` event fixes it. Real browsers size on load,
  and `HomeExperience`/`MapExperience` dispatch a resize on mount as a safety net.
- Reduced-motion: home falls back to plain sections; map freezes water/pulse and
  renders on-demand.
