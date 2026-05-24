'use client'

import 'swiper/css'

import { EquipmentsSlider } from '@/components'

export default function MainEquipments() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <EquipmentsSlider
        images={[
          '/img/01.webp',
          '/img/02.webp',
          '/img/04.webp',
          '/img/05.webp',
          '/img/06.webp',
          '/img/11.webp',
        ]}
      />
    </section>
  )
}
