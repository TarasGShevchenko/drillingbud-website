import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from '@/utils'

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'Drilling Bud | Улаштування буронабивних паль у Києві',
  description:
    'Професійне влаштування буронабивних паль будь-якої складності. Фундаменти для будинків, котеджів та промислових об’єктів. Діаметр 300-800 мм, глибина до 25м.',
  keywords: [
    'буронабивні палі',
    'фундамент на палях',
    'бурові роботи Київ',
    'влаштування паль',
    'CFA палі',
    'фундамент під будинок',
  ],
  authors: [{ name: 'Drilling Bud' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),

  alternates: { canonical: '/' },

  openGraph: {
    title: 'Drilling Bud | Улаштування буронабивних паль',
    description: 'Професійне влаштування буронабивних паль у Києві та області',
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Буронабивні палі Drilling Bud',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Drilling Bud | Улаштування буронабивних паль',
    description: 'Професійне влаштування буронабивних паль у Києві',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const dynamic = 'force-static'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
