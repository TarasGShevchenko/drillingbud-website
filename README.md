# Drilling Bud — website

Marketing website for **Drilling Bud**, a bored pile / CFA foundation contractor in Kyiv.
The site is in Ukrainian; leads from the contact forms are sent to the owner's Telegram.

- Production: https://www.drillingbud.com.ua (branch `master`)
- Staging: https://staging.drillingbud.com.ua (branch `staging`, not indexed by search engines)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static pages) + React 19 with the React Compiler
- TypeScript, Tailwind CSS v4
- framer-motion (animations), Swiper (sliders), lucide-react (icons), libphonenumber-js
- Hosted on [Vercel](https://vercel.com); light and dark theme

## Getting started

Requirements: Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

To try the contact forms locally without sending anything to Telegram:

```bash
CONTACT_DRY_RUN=1 npm run dev
```

The API then logs the message it would send and returns success. This mode never applies to
production builds, including Vercel deployments.

## Environment variables

See [`.env.example`](.env.example). Never commit `.env.local`.

| Variable               | Purpose                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_BASE_URL` | Site URL without a trailing slash, used for metadata, canonical URLs and the sitemap. Required at build time |
| `NEXT_PUBLIC_PHONE`    | Phone number shown on the site                                                                               |
| `NEXT_PUBLIC_EMAIL`    | Email shown on the site                                                                                      |
| `TELEGRAM_BOT_TOKEN`   | Bot that sends leads (server only)                                                                           |
| `TELEGRAM_CHAT_ID`     | Chat that receives leads (server only)                                                                       |

On Vercel, **Production** uses the real values. **Preview** (staging and feature branches) uses
the staging URL and a separate staging bot and chat, so test leads never reach the owner.

## Scripts

| Command                        | What it does                                                         |
| ------------------------------ | -------------------------------------------------------------------- |
| `npm run dev`                  | Development server                                                   |
| `npm run lint`                 | ESLint                                                               |
| `npx tsc --noEmit`             | Type check                                                           |
| `npx prettier --write <files>` | Format changed files                                                 |
| `npm run build`                | Production build, then `next-sitemap` (needs `NEXT_PUBLIC_BASE_URL`) |
| `npm start`                    | Serve the production build                                           |

## Project structure

```
app/                 routes (/, /equipments, /contacts), layout, sitemap, robots
app/api/contact/     POST { name, phone, ... } → Telegram (the only server code)
components/          page sections (MainPage/, EquipmentsPage/, ContacsPage/) and shared components
utils/               SEO structured data, phone helpers, theme script
public/img/          images (.webp)
```

## Workflow

```
feature/* ──PR──► staging ──PR──► master
               (staging site)   (production)
```

1. Branch off `staging`: `feature/<short-name>`.
2. Open a pull request into `staging` and merge it. Vercel updates the staging site.
3. Once the changes are approved on staging, open a pull request from `staging` into `master`.
   Merging it deploys to production.

`master` and `staging` are protected: changes go in through pull requests only, and there is no
force pushing or deleting. Use **Create a merge commit**; squash and rebase merges would make the
branches diverge.

Preview deployments send `X-Robots-Tag: noindex, nofollow` (see `next.config.ts`), so staging
never shows up in search results. Production is not affected.
