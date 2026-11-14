import { defineRouting } from 'next-intl/routing'

// Ukrainian is the default and keeps the unprefixed URLs (/, /equipments, /contacts);
// Russian lives under /ru. The language law requires Ukrainian to open by default, so the
// browser language and cookies are never used to pick or redirect to a locale.
export const routing = defineRouting({
  locales: ['uk', 'ru'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  // hreflang lives in the page metadata and the sitemap
  alternateLinks: false,
})

export type Locale = (typeof routing.locales)[number]
