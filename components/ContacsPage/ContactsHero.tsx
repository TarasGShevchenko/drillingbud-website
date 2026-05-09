'use client'

import { motion } from 'framer-motion'

export default function ContactsHero() {
  return (
    <section className="bg-zinc-950 pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-white md:text-6xl"
        >
          Зв'яжіться з нами
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-4 max-w-2xl text-xl text-zinc-400"
        >
          Ми завжди на зв'язку та готові відповісти на всі ваші питання
        </motion.p>
      </div>
    </section>
  )
}
