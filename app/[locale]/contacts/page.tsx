import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ContactsHero, ContactsInfo, ContactsMap } from '@/components'
import type { Locale } from '@/i18n/routing'
import { getAlternates, getSharedOpenGraph } from '@/utils'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const alternates = getAlternates(locale, '/contacts')

  return {
    title: t('contacts.title'),
    description: t('contacts.description'),
    alternates,
    openGraph: {
      ...getSharedOpenGraph(locale, t('ogImageAlt')),
      url: alternates.canonical,
      title: t('contacts.ogTitle'),
      description: t('contacts.ogDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('contacts.ogTitle'),
      description: t('contacts.ogDescription'),
    },
  }
}

export const dynamic = 'force-static'

export default async function Contacts({ params }: Props) {
  setRequestLocale((await params).locale as Locale)

  return (
    <>
      <ContactsHero />
      <ContactsInfo />
      <ContactsMap />
    </>
  )
}
