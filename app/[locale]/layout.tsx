import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'
import GoogleAds from '@/components/GoogleAds'
import { type Locale, routing } from '@/i18n/routing'
import { getSharedOpenGraph, getStructuredData, themeScript } from '@/utils'

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

type LocaleParams = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'Drilling Bud' }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),

    openGraph: {
      ...getSharedOpenGraph(locale, t('ogImageAlt')),
      title: t('ogTitle'),
      description: t('ogDescription'),
    },

    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('twitterDescription'),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const dynamic = 'force-static'
// Only the locales above exist; anything else under [locale] is a 404
export const dynamicParams = false

export default async function RootLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Lets next-intl render this locale statically
  setRequestLocale(locale)

  return (
    // suppressHydrationWarning: themeScript adds the `dark` class before React hydrates
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        {getStructuredData(locale).map((schema) => (
          <script
            key={schema['@id']}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
        <NextIntlClientProvider>
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
        <GoogleAds />
      </body>
    </html>
  )
}
