# DrillingBud

Marketing site for Drilling Bud, a bored-pile / CFA foundation contractor in Kyiv.
All user-facing copy is Ukrainian. Leads go to the owner's Telegram; there is no database.

## Stack
- Next.js 16 (App Router) + React 19, React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- TypeScript (strict), Tailwind CSS v4 via `@tailwindcss/postcss`. There is no `tailwind.config.*`;
  `app/globals.css` does `@import 'tailwindcss'` and holds the few global styles (Swiper overrides).
- framer-motion (animations), Swiper (carousel), lucide-react (icons), libphonenumber-js (phone validation)
- Deployed on Vercel; `@vercel/speed-insights` in the root layout
- Next.js 16 has breaking changes from older versions. Before using an unfamiliar Next API,
  check the bundled docs in `node_modules/next/dist/docs/` instead of relying on memory.

## Architecture
- `app/` — routes: `/` (`page.tsx`), `/equipments`, `/contacts`. Layout and every page export
  `dynamic = 'force-static'`; keep them static.
- `app/api/contact/route.ts` — the only server code. POST `{ name, phone }` → Telegram Bot API.
- `app/layout.tsx` — site metadata (`Metadata` API) and JSON-LD `<script>` tags.
- `app/sitemap.ts`, `app/robots.ts` — route-based sitemap/robots. `next-sitemap` also runs on
  `postbuild` (`next-sitemap.config.js`) and writes `sitemap*.xml` / `robots.txt` into `public/`.
- `components/<Page>Page/` — sections per page (`MainPage`, `EquipmentsPage`, `ContacsPage` —
  note the existing misspelling, don't rename it unprompted). Shared components sit in `components/`.
- `components/index.ts` — barrel file. Every component is default-exported from its file and
  re-exported here; pages import from `@/components`.
- `utils/seo/structured-data.ts` — schema.org objects rendered in the layout.
- `constants/index.ts` — nav links.
- `public/img/*.webp` — all images, numbered (`01.webp`, `11.webp`, …).

## Conventions
- Prettier: no semicolons, single quotes, trailing commas `es5`, 2 spaces, width 100,
  Tailwind class sorting. Don't hand-format; run Prettier on the files you changed.
- Import via the `@/` alias (maps to repo root).
- All components are client components (`'use client'`). Animate with `<Reveal>`
  (`components/Reveal.tsx`), not hand-written `motion.*` props. Default: fade up 30px,
  0.6s `easeOut`, plays once when 30% of the element is in view.
  - `as="h1" | "h2" | "p" | …` picks the tag (default `div`); `delay` staggers items in a
    group (0, 0.1, 0.2); `onMount` animates on page load: first screen (heroes) only,
    staggered 0 → 0.15 → 0.3.
  - Any motion prop overrides the default (`initial`, `whileInView`, …); `transition` is merged.
  - Animate the visible container (card, block), not just its inner content. The footer is
    not animated. Use plain `motion.*` only for other kinds of animation (menus, hover,
    state changes).
  - `MotionProvider` in the layout applies `reducedMotion="user"`.
- Visual style: dark theme (`bg-black`, `bg-zinc-950/900/800`), `text-zinc-400` body text,
  `amber-400` accent, `rounded-2xl`/`rounded-3xl`, mostly `max-w-6xl` containers.
- Images: `next/image`, `.webp` files in `public/img`. Give `fill` images a `sizes` prop.
- Copy and validation messages are in Ukrainian, as is the Telegram lead message.

## Constraints
- Environment variables (see `.env.example`): `NEXT_PUBLIC_BASE_URL` (required at build —
  `layout.tsx` does `new URL(...)`), `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_PHONE`,
  `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- Never read, print or commit `.env.local`. Never move `TELEGRAM_*` into a `NEXT_PUBLIC_` var
  or client code.
- SEO matters for this business: don't change `metadata`, JSON-LD, page URLs, heading
  hierarchy, or `force-static` unless the task is about that.
- Business facts are duplicated. Pile specs (300–800 mm, up to 25 m, CFA + casing, up to 12
  piles/shift) appear in `app/layout.tsx`, `app/page.tsx`, `EquipmentsInfo.tsx` and
  `structured-data.ts`. Service area appears in `Footer.tsx` and `structured-data.ts`. The phone
  comes from `NEXT_PUBLIC_PHONE`, except `localBusinessSchema.telephone`, which is hardcoded.
  When changing a fact, grep for every copy, and tell the user if they disagree.
- Known issues, leave alone unless asked:
  - `name` is not HTML-escaped in the Telegram message (`parse_mode: 'HTML'`).
  - `localBusinessSchema` has `closes: '7:59'`.
  - Service area wording varies (FAQ: "по всій країні"; schema: Kyiv; Footer: Kyiv + region, travel possible).
  - Some function names don't match file names (`EquipmentsTech.tsx` exports `EquipmentsWorks`,
    `EquipmentsInfo.tsx` exports `EquipmentsHero`).
  - Some alt text is English (`MainHero`, `EquipmentsSlider`).
  - The repo isn't fully Prettier-formatted; `prettier --check .` fails on 5 untouched files.

## Commands
- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint (next core-web-vitals + typescript + prettier config); currently clean
- `npx prettier --write <files>` — format changed files (there is no format script)
- `npx tsc --noEmit` — type check; currently clean
- `npm run build` — production build, then `next-sitemap` (postbuild). Needs `NEXT_PUBLIC_BASE_URL`.
- Tests: none exist. Verify changes with lint + type check (+ build when relevant), and check
  UI changes in the browser.

## Making changes
- Keep diffs minimal and scoped to the task. No drive-by refactors, renames, or reformatting
  of untouched files.
- Don't add dependencies without asking. Prefer what's already installed.
- Match the surrounding code (patterns above) instead of introducing new ones.
- New component → its own file with a default export, then add it to `components/index.ts`.
- After editing: run Prettier on the changed files, then `npm run lint` and `npx tsc --noEmit`.
  Run `npm run build` for changes to routes, metadata, config or the API route.
- Ask before: deleting files or images, changing `next.config.ts`, env var names, the
  `/api/contact` request/response shape, or anything under SEO constraints.
- Don't commit or push unless asked.
