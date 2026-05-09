'use client'

import { motion } from 'framer-motion'

export default function EquipmentsHero() {
  return (
    <section className="bg-zinc-950 pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 text-5xl font-bold text-white md:text-6xl"
        >
          Наше обладнання
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto max-w-3xl text-xl text-zinc-400"
        >
          Сучасна техніка та обладнання для влаштування буронабивних паль будь-якої складності
        </motion.p>
      </div>
    </section>
  )
}
