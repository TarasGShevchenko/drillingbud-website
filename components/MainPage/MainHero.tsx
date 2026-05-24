'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { goToContacts } from '@/utils'

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
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl leading-tight font-bold text-white md:text-7xl lg:text-[4.5rem]"
        >
          Улаштування буронабивних паль
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-xl text-zinc-200 md:text-2xl"
        >
          Будь-якої складності
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <button
            onClick={goToContacts}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-lg font-semibold text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-400/30 active:scale-95"
          >
            Замовити дзвінок
            <span className="text-xl transition-transform group-hover:rotate-12">📞</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
