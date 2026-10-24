---
name: seo-growth-audit
description: Read-only SEO and lead-conversion audit of the DrillingBud site. Produces a prioritized report with evidence; changes nothing. Use when asked to audit SEO, search visibility, or why the site isn't generating inquiries.
argument-hint: "[optional focus: technical | content | conversion | pages | <route>]"
disable-model-invocation: true
disallowed-tools: Edit Write NotebookEdit
---

# SEO & growth audit (read-only)

Audit this repository for search visibility and qualified inquiries, then report.
Focus requested by the user: "$ARGUMENTS" (empty = full audit of all five sections).

Tracked files at invocation:
!`git ls-files`

## Rules
- Read-only. Don't edit, create, move or delete files; don't install packages; don't run
  `build`, `dev`, `next-sitemap` or anything else that writes to disk. Shell use is limited
  to reading (`cat`, `sed -n`, `grep`, `git ls-files`, `git log`).
- Inspect the code before claiming anything. Re-verify facts listed in CLAUDE.md instead of
  repeating them.
- Don't write replacement copy, new pages or code. Describe what's needed, not the text itself.
- Don't fetch the web or the live site. Anything that depends on rankings, search volume,
  competitors, Search Console, analytics or the deployed HTML is an assumption to verify.
- Never recommend mass-produced or near-duplicate pages (city × service swaps, keyword-stuffed
  variants, doorway pages). Each proposed page must serve a distinct intent with content only
  this business can provide.

## Evidence levels — tag every finding
- **Confirmed**: seen in the repo; cite `path:line`.
- **Inferred**: follows from the code but needs a check in the rendered page or browser.
- **Needs external data**: depends on keyword research, Search Console, analytics, competitors
  or the business owner.

## What to check

1. **Technical SEO**
   - Per-route `metadata`/`generateMetadata`: unique title, description, canonical, OG per page,
     and what each route inherits from `app/layout.tsx`.
   - One `<h1>` per page, logical heading order, `lang`, image `alt`, descriptive link text.
   - `app/sitemap.ts`, `app/robots.ts`, `next-sitemap.config.js`: conflicts, missing routes,
     `lastModified`, base URL handling.
   - JSON-LD: validity of values, consistency with visible page content and with each other
     (`@id`, types, hours, phone, area), schema types that require visible on-page content.
   - Internal linking: nav, footer, in-content links between related pages; orphan routes.
   - Rendering: `force-static`, client-only content, fonts/images affecting LCP or CLS.
2. **Content quality**
   - Service descriptions: specificity, the technical facts given, what a buyer still can't learn
     (process, timelines, soil conditions, price drivers, minimum job, service area).
   - Consistency of facts across components, metadata and JSON-LD.
   - Trust signals present or missing: completed projects, photos with context, equipment
     specs, experience, guarantees, reviews, company details.
3. **Conversion**
   - Is the offer clear above the fold? Primary and secondary CTAs per page; click-to-call.
   - Contact flow end to end: `ContactForm` → `/api/contact` → Telegram. Fields, validation,
     success/error states, failure modes that lose a lead, promises made ("15 хвилин").
   - Friction and missing qualifiers (project type, location, volume) that would help the owner
     prioritize leads, balanced against form length.
4. **Page opportunities** (max 5)
   - For each: the search intent it serves, the unique value from this business's real
     knowledge or work, how it differs from and links to existing pages, and what content the
     owner must supply. Mark demand as "Needs external data" unless evidence exists.

## Report format

Reply in chat (don't save a file unless asked):

1. **Summary**: 3–5 lines: biggest risks and biggest opportunities.
2. **Findings**: one table per section:
   `| # | Finding | Evidence level | Evidence (path:line) | Impact |`
3. **Page opportunities**: intent · unique value · relation to existing pages · inputs needed.
4. **Prioritized recommendations**: a single list ordered by impact ÷ effort, each with:
   priority (P1/P2/P3), affected files/routes, expected benefit, effort (S/M/L), next step.
5. **Couldn't verify**: what needs the live site, Search Console, analytics, keyword
   research or the owner, and how to get it.

Keep it to what the evidence supports. Fewer, well-supported findings beat a long list.
