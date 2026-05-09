'use client'

import { motion } from 'framer-motion'

export default function EquipmentsHero() {
  return (
    <section className="bg-zinc-900 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold">Сучасна техніка для надійних фундаментів</h2>
            <div className="space-y-5 text-lg text-zinc-400">
              <p>
                Ми використовуємо професійне бурове обладнання провідних виробників. Це дозволяє
                виконувати роботи швидко, якісно та з мінімальним впливом на навколишнє середовище.
              </p>
              <p>
                У нашому автопарку є бурові установки з можливістю буріння паль діаметром від 300 мм
                до 800 мм та глибиною до 25 метрів.
              </p>
            </div>
          </motion.div>

          <div className="rounded-3xl bg-zinc-800 p-8 text-sm tracking-widest text-zinc-400 uppercase">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div>
                <p className="mb-1 font-semibold text-amber-400">Діаметр паль</p>
                <p className="text-2xl font-bold text-white">300 — 800 мм</p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-amber-400">Максимальна глибина</p>
                <p className="text-2xl font-bold text-white">25 метрів</p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-amber-400">Тип буріння</p>
                <p className="text-2xl font-bold text-white">CFA + Обсадні труби</p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-amber-400">Продуктивність</p>
                <p className="text-2xl font-bold text-white">До 12 паль за зміну</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
