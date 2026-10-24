'use client'

import { Reveal } from '@/components'

export default function EquipmentsHero() {
  return (
    <section className="bg-zinc-950 pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal as="h1" onMount className="mb-6 text-5xl font-bold text-white md:text-6xl">
          Наше обладнання
        </Reveal>
        <Reveal as="p" onMount delay={0.15} className="mx-auto max-w-3xl text-xl text-zinc-400">
          Сучасна техніка та обладнання для влаштування буронабивних паль будь-якої складності
        </Reveal>
      </div>
    </section>
  )
}
