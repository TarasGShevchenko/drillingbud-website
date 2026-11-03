'use client'

import 'swiper/css'

import { EquipmentsSlider, Reveal } from '@/components'

export default function MainEquipments() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 dark:bg-black">
      <Reveal>
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
      </Reveal>
    </section>
  )
}
