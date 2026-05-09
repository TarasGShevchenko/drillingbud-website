'use client'

import { motion } from 'framer-motion'

export default function ContactsInfo() {
  return (
    <section className="bg-zinc-950 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl px-6"
      >
        <h3 className="mb-6 text-center text-2xl font-semibold">Ми знаходимось у центрі Києва</h3>

        <div className="aspect-video w-full overflow-hidden rounded-3xl border border-zinc-800 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.0!2d30.5234!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce4f5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2z0JrRltC90YfQtdC90L3QvtC5INC_0L7Qt9C10YDQutC-0LPQviDQutC-0LPQviDQuNC90YLQtdC90YI!5e0!3m2!1suk!2sua!4v1740000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-4 text-center text-sm text-zinc-500">
          Точне місце виїзду бригади узгоджується індивідуально
        </p>
      </motion.div>
    </section>
  )
}
