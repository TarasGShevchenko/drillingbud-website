import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import {
  MainHero,
  MainDescription,
  MainEquipments,
  MainCalculation,
  MainContact,
} from '@/components'
import type { Locale } from '@/i18n/routing'
import { getAlternates } from '@/utils'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale

  return {
    alternates: getAlternates(locale, '/'),
  }
}

export const dynamic = 'force-static'

export default async function Home({ params }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('Home')

  return (
    <main>
      <MainHero />
      <MainDescription
        title={t('soilsTitle')}
        description={t('soilsText')}
        imageSrc={'/img/01.webp'}
      />
      <MainDescription
        title={t('objectsTitle')}
        description={t('objectsText')}
        imageSrc={'/img/11.webp'}
        reverse
      />
      <MainEquipments />
      <MainCalculation />
      <MainContact />
    </main>
  )
}
