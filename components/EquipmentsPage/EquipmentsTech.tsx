'use client'

import { EquipmentsSlider, Reveal } from '@/components'

export default function EquipmentsWorks() {
  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal as="h2" className="mb-12 text-center text-4xl font-bold">
          Наша техніка в роботі
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <EquipmentsSlider
          images={[
            '/img/11.webp',
            '/img/12.webp',
            '/img/13.webp',
            '/img/14.webp',
            '/img/15.webp',
            '/img/16.webp',
            '/img/17.webp',
            '/img/18.webp',
            '/img/19.webp',
            '/img/20.webp',
            '/img/21.webp',
          ]}
        />
      </Reveal>
    </section>
  )
}
