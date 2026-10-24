'use client'
import Image from 'next/image'
import { Phone } from 'lucide-react'

import { Reveal } from '@/components'
import { goToContacts } from '@/utils'

const PHONE = process.env.NEXT_PUBLIC_PHONE

export default function MainHero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center pt-20 pb-16">
      <Image
        src="/img/title.webp"
        alt="Hero background"
        fill
        className="object-cover"
        priority
        quality={80}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <Reveal
          as="h1"
          onMount
          className="text-5xl leading-tight font-bold text-white md:text-7xl lg:text-[4.5rem]"
        >
          Улаштування буронабивних паль
        </Reveal>

        <Reveal as="p" onMount delay={0.15} className="mt-6 text-xl text-zinc-200 md:text-2xl">
          Будь-якої складності
        </Reveal>

        <Reveal
          onMount
          delay={0.3}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={goToContacts}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-lg font-semibold text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-400/30 active:scale-95"
          >
            Замовити дзвінок
            <span className="text-xl transition-transform group-hover:rotate-12">📞</span>
          </button>

          {PHONE && (
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/40 px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-amber-400 hover:text-amber-400 active:scale-95"
            >
              <Phone size={20} />
              {PHONE}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  )
}
