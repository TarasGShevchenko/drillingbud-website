'use client'

import { motion } from 'framer-motion'

export default function EquipmentsWorks() {
  return (
    <section className="bg-zinc-900 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-4 text-4xl font-bold"
          >
            Чому обирають наше обладнання
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-zinc-800 p-8"
          >
            <div className="mb-4 text-4xl">🚜</div>
            <h3 className="mb-3 text-xl font-semibold">Потужна техніка</h3>
            <p className="text-zinc-400">
              Сучасні бурові установки з високою прохідністю та точністю.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-zinc-800 p-8"
          >
            <div className="mb-4 text-4xl">🛡️</div>
            <h3 className="mb-3 text-xl font-semibold">Контроль якості</h3>
            <p className="text-zinc-400">
              Постійний технічний нагляд та документування кожного етапу.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-zinc-800 p-8"
          >
            <div className="mb-4 text-4xl">⚡</div>
            <h3 className="mb-3 text-xl font-semibold">Швидкість</h3>
            <p className="text-zinc-400">Мобільні бригади готові до роботи в день звернення.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
