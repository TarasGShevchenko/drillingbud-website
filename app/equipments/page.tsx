import type { Metadata } from 'next'

import {
  EquipmentsHero,
  EquipmentsInfo,
  EquipmentsTech,
  EquipmentsWorks,
  MainContact,
} from '@/components'
import { sharedOpenGraph } from '@/utils'

export const metadata: Metadata = {
  title: 'Обладнання для буронабивних паль | CFA та обсадні труби | Drilling Bud',
  description:
    'Бурові установки Drilling Bud для влаштування буронабивних паль: діаметр 300–800 мм, глибина до 25 м, технологія CFA та обсадні труби, до 12 паль за зміну.',
  alternates: { canonical: '/equipments' },
  openGraph: {
    ...sharedOpenGraph,
    url: '/equipments',
    title: 'Drilling Bud | Обладнання для буронабивних паль',
    description: 'Бурові установки для паль діаметром 300–800 мм і глибиною до 25 м',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drilling Bud | Обладнання для буронабивних паль',
    description: 'Бурові установки для паль діаметром 300–800 мм і глибиною до 25 м',
  },
}

export const dynamic = 'force-static'

export default function Equipments() {
  return (
    <>
      <EquipmentsHero />
      <EquipmentsInfo />
      <EquipmentsTech />
      <EquipmentsWorks />
      <MainContact />
    </>
  )
}
