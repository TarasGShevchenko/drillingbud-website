import type { Metadata } from 'next'

import { ContactsHero, ContactsInfo, ContactsMap } from '@/components'
import { sharedOpenGraph } from '@/utils'

export const metadata: Metadata = {
  title: 'Контакти | Замовити буронабивні палі | Drilling Bud',
  description:
    'Контакти Drilling Bud: телефон, email та заявка на дзвінок щодо влаштування буронабивних паль.',
  alternates: { canonical: '/contacts' },
  openGraph: {
    ...sharedOpenGraph,
    url: '/contacts',
    title: 'Drilling Bud | Контакти',
    description: 'Телефон, email та заявка на дзвінок щодо влаштування буронабивних паль',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drilling Bud | Контакти',
    description: 'Телефон, email та заявка на дзвінок щодо влаштування буронабивних паль',
  },
}

export const dynamic = 'force-static'

export default function Contacts() {
  return (
    <>
      <ContactsHero />
      <ContactsInfo />
      <ContactsMap />
    </>
  )
}
