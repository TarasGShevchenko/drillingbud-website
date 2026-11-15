import type { Metadata } from 'next'

import { getPathname } from '@/i18n/navigation'
import { type Locale, routing } from '@/i18n/routing'

const OG_LOCALES: Record<Locale, string> = { uk: 'uk_UA', ru: 'ru_UA' }

// A page that sets `openGraph` replaces the layout's whole object, so every
// route spreads these shared fields into its own `openGraph`.
export const getSharedOpenGraph = (locale: Locale, imageAlt: string) =>
  ({
    images: [
      {
        url: '/img/title.webp',
        width: 960,
        height: 640,
        alt: imageAlt,
      },
    ],
    locale: OG_LOCALES[locale],
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    type: 'website',
  }) satisfies Metadata['openGraph']

// Canonical URL of the page in this language plus hreflang links to every language version.
// Ukrainian is the default (x-default) and has no prefix: '/equipments' → uk '/equipments', ru '/ru/equipments'
export const getAlternates = (locale: Locale, href: string) =>
  ({
    canonical: getPathname({ locale, href }),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href })])),
      'x-default': getPathname({ locale: routing.defaultLocale, href }),
    },
  }) satisfies Metadata['alternates']
