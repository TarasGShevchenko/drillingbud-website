'use client'

import { Fragment } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { getPathname, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LABELS = { uk: 'UA', ru: 'RU' } as const

// UA | RU: links to the same page in the other language; the current one is highlighted
export default function LanguageSwitcher({ className = 'text-sm' }: { className?: string }) {
  const locale = useLocale()
  // Path without the locale prefix, e.g. '/equipments' on both /equipments and /ru/equipments
  const pathname = usePathname()
  const t = useTranslations('Nav')

  return (
    <div
      role="group"
      aria-label={t('language')}
      className={`flex items-center gap-2 font-semibold ${className}`}
    >
      {routing.locales.map((l, index) => (
        <Fragment key={l}>
          {index > 0 && (
            <span aria-hidden className="text-gh-fg/30 dark:text-white/30">
              |
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" className="text-amber-400">
              {LABELS[l]}
            </span>
          ) : (
            // Full page load, not a client-side transition: the root layout depends on the locale
            // (<html lang>, theme script, JSON-LD), and React can't re-run its <script> tags.
            // getPathname gives the final URL; next-intl's Link would point UA at /uk/…, a redirect.
            <a
              href={getPathname({ locale: l, href: pathname })}
              hrefLang={l}
              lang={l}
              className="text-gh-fg/80 transition-colors duration-300 hover:text-gh-fg dark:text-white/80 dark:hover:text-white"
            >
              {LABELS[l]}
            </a>
          )}
        </Fragment>
      ))}
    </div>
  )
}
