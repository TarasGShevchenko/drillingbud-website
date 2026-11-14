import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import {
  EquipmentsHero,
  EquipmentsInfo,
  EquipmentsTech,
  EquipmentsWorks,
  MainCalculation,
  MainContact,
} from '@/components'
import type { Locale } from '@/i18n/routing'
import { getAlternates, getSharedOpenGraph } from '@/utils'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const alternates = getAlternates(locale, '/equipments')

  return {
    title: t('equipments.title'),
    description: t('equipments.description'),
    alternates,
    openGraph: {
      ...getSharedOpenGraph(locale, t('ogImageAlt')),
      url: alternates.canonical,
      title: t('equipments.ogTitle'),
      description: t('equipments.ogDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('equipments.ogTitle'),
      description: t('equipments.ogDescription'),
    },
  }
}

export const dynamic = 'force-static'

export default async function Equipments({ params }: Props) {
  setRequestLocale((await params).locale as Locale)

  return (
    <>
      <EquipmentsHero />
      <EquipmentsInfo />
      <EquipmentsTech />
      <EquipmentsWorks />
      <MainCalculation />
      <MainContact />
    </>
  )
}
