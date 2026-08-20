# Arturas Real Estate — Build Guide

Сайт целиком построен в одной визуальной системе (hubtown-style). Прежняя
«стеклянная» версия (Navbar, `components/sections/*`, `components/ui/*`,
палитра ink/bone/platinum) удалена — в коде не осталось ни двух дизайнов, ни
маршрутов `/redesign`. Данные (объекты, гиды, локали) не менялись.

## Routes

| URL | File | What |
|---|---|---|
| `/{lang}` | `app/[lang]/page.tsx` | Редирект на `/{lang}/about` — отдельной главной нет |
| `/{lang}/about` | `.../about/page.tsx` | **Входная страница.** Hero, манифест, паспорт, одометры, карточки процесса |
| `/{lang}/projects` | `.../projects/page.tsx` | Реестр объектов; кадр проявляется под строкой на hover |
| `/{lang}/projects/{slug}` | `.../projects/[slug]/page.tsx` | Карточка: кадр-герой, цифры, галерея, планировки, паспорт |
| `/{lang}/guides` | `.../guides/page.tsx` | Плитки статей-гидов |
| `/{lang}/guides/{slug}` | `.../guides/[slug]/page.tsx` | Статья: содержание, нумерованные разделы, FAQ на `<details>` |
| `/{lang}/contact` | `.../contact/page.tsx` | Каналы + форма → `/api/telegram-lead` |
| `/{lang}/map` | `.../map/page.tsx` | Интерактивная 3D-карта Пхукета |
| `/{lang}/map/{slug}` | `.../map/[slug]/page.tsx` | Карта с открытым оверлеем проекта (deep-link) |

`{lang}` ∈ `en, ru, uk, de, th`. Оболочка (шапка, меню, футер, курсор, чип чата,
прелоадер, HUD-рамка) живёт в `app/[lang]/layout.tsx` и общая для всех страниц.

Сайт начинается с «Обо мне»: голый `/` и `/{lang}` уводят туда, в меню отдельной
«Главной» нет. WebGL-нарратив («куб над водой») **не удалён** — файлы
`components/webgl/HomeExperience|HomeNarrative|HomeScene.tsx` лежат нетронутыми и
не попадают в бандл, пока их никто не импортирует. Вернуть страницу = отрендерить
`<HomeExperience lang={lang} />` в `app/[lang]/page.tsx` вместо `redirect()`.

Навигация: **Projects** открывает 3D-карту, полный список объектов — панель
«Список проектов» внутри неё; страница `/projects` остаётся как индекс для
поиска и переходов из карточек. `/map/{slug}` закрыт от индексации, canonical
ведёт на карточку объекта: для поиска это один и тот же объект, показанный
двумя способами.

**Фоновые сцены и `data-scene-end`.** Прогресс сцены по умолчанию считается на
всю страницу, из-за чего анимация растягивалась и на футер. Блок, помеченный
`data-scene-end`, задаёт, где сцена обязана досказаться (см.
`components/webgl/sceneScroll.ts`): на About это секция карточек процесса, на
Contact — секция с формой.

## Фоны страниц (макеты Артураса)

Три фоновые сцены пришли отдельными макетами и портированы 1:1 с three r128 на
0.169. Оригиналы лежат вне репозитория, на Рабочем столе:

| Макет | Файл-источник | Куда встало |
|---|---|---|
| «фон 1» | `фон 1/about-path.html` | `webgl/AboutPathScene.tsx` → About |
| «фон 2» | `фон 2/contact-cube.html` | `webgl/ContactCubeScene.tsx` → Contact |
| «фон 3» | `фон 3/` (папка в репозитории) | `map/MapScene.tsx` → Map |

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

## Component map (`components/`)

- `dict.ts` — строки оболочки и страниц, 5 локалей. Районы→счётчики, порядок страниц.
- `Header.tsx` + `MenuOverlay.tsx` — вордмарк + полноэкранное меню (соцсети, языки).
- `Footer.tsx` — CTA «Работаем вместе», нумерованные соцссылки, Sound, Prev./Next.
- `SoundManager.tsx` — WebAudio ambient + UI-звуки, `SoundToggle`. Файлы в `public/audio/*.wav`.
- `Preloader.tsx` — счётчик `0% → 100% → Ready`, раз за сессию. Шлёт `arturas:ready`. `?nopreload` пропускает.
- `BracketButton.tsx`, `Cursor.tsx`, `ChatChip.tsx`, `HudFrame.tsx`, `BottomBar.tsx`, `PageTransition.tsx` — примитивы HUD.
- `Reveal.tsx` — `Reveal` (fade-up) + `HeadlineReveal` (SplitText, маски строк).
- `Odometer.tsx` — барабанные цифры для статистики.
- `LeadForm.tsx` — форма контакта → Telegram-бот.
- `webgl/` — `HomeScene` + `HomeNarrative` + `HomeExperience` (главная), `AboutPathScene`, `ContactCubeScene`, `SceneBackdrop` (клиентская обёртка).
- `map/` — `phuketGeo.ts` (районы и пины), `MapScene` (остров/океан/маркеры), `MapExperience` (HUD, фильтры, список, оверлей).

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

- Цвета: `night #020a19`, `night-raised #0c1524`, `offwhite #d5e0ff`, `royal #052261`.
  Других палитр в проекте нет — всё строится на этих четырёх и альфах offwhite.
- Пиксельная шкала `text-9 … text-320`; межстрочные `leading-0.8/0.9/1.1/1.2/1.6`;
  `tracking-4` для mono-подписей HUD, `tracking-2` для плотного текста.
- Шрифты: `Onest` (свободный аналог Px Grotesk) + `JetBrains Mono`. Один гротеск
  на всё: иерархию строят кегль и вес, а не смена гарнитуры.
- Единая кривая `ease-smooth`. Прямые углы — радиусов в системе нет.

## Верстальные приёмы

- Секции разделяются `border-t border-offwhite/10`, отбивки `px-6 md:px-16`, `py-24 md:py-32`.
- Таблицы данных — сетка `gap-px bg-offwhite/10` с ячейками `bg-night`: линии рисует
  просвет фона, а не рамки.
- Списки — строки с mono-нумерацией `01, 02…` и нижней границей.
- Кадры-герои: изображение `fill` + два градиента (снизу под текст, сверху под шапку).

## Локальная разработка

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # прогон всех 190 статических страниц
```

`?nopreload` в URL пропускает прелоадер — удобно для скриншотов и тестов.

## Деплой

`git push` в `main` — Vercel собирает и публикует автоматически. Переменные
окружения (`NEXT_PUBLIC_SITE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID`) задаются в Project → Settings →
Environment Variables, в репозитории их нет.

## Optional upgrades (not blocking)

- Купить **Px Grotesk** (Optimo) и заменить импорт `Onest` для 1:1 совпадения.
- Заменить процедурный остров на реальный рельеф Пхукета (SRTM → heightmap).
- Сжать будущие текстуры в **KTX2** (`toktx`), меши — draco. Сейчас сцены
  шейдерные, сжимать нечего.
- Перегнать `public/audio/*.wav` (~0.5 МБ) в короткий зацикленный **.opus/.m4a**.

## Known non-issues

- В превью-харнессе R3F-канвас может замереть на 300×150 после программного
  ресайза; событие `resize` чинит. Реальные браузеры считают размер при загрузке,
  а `HomeExperience`/`MapExperience` шлют resize при монтировании на всякий случай.
- Reduced-motion: главная падает в обычные секции, карта замораживает воду и
  пульсацию и рисует по требованию.
