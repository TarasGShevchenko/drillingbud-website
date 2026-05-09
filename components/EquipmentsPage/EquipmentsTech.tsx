'use client'

import { motion } from 'framer-motion'
import { EquipmentsSlider } from '@/components'

export default function EquipmentsWorks() {
  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 text-center text-4xl font-bold"
        >
          Наша техніка в роботі
        </motion.h2>
      </div>

      <EquipmentsSlider />
    </section>
  )
}
