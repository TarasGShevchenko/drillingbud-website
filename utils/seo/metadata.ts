import type { Metadata } from 'next'

// A page that sets `openGraph` replaces the layout's whole object, so every
// route spreads these shared fields into its own `openGraph`.
export const sharedOpenGraph = {
  images: [
    {
      url: '/img/title.webp',
      width: 960,
      height: 640,
      alt: 'Буронабивні палі Drilling Bud',
    },
  ],
  locale: 'uk_UA',
  type: 'website',
} satisfies Metadata['openGraph']
