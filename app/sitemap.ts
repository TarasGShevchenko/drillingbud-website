import { MetadataRoute } from 'next'

import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const PAGES = [
  { href: '/', priority: 1 },
  { href: '/equipments', priority: 0.9 },
  { href: '/contacts', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  // '/' → https://…/ for Ukrainian, https://…/ru for Russian; same URLs as before for Ukrainian
  const url = (locale: (typeof routing.locales)[number], href: string) => {
    const path = getPathname({ locale, href })
    return `${baseUrl}${path === '/' ? '' : path}`
  }

  // One entry per page and language, each listing every language version (hreflang)
  return PAGES.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: url(locale, href),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, url(l, href)])),
      },
    }))
  )
}
