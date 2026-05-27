'use client'

import { motion } from 'framer-motion'
import { Clock, Mail, Phone } from 'lucide-react'

import { ContactForm } from '@/components'

const EMAIL = process.env.NEXT_PUBLIC_EMAIL
const PHONE = process.env.NEXT_PUBLIC_PHONE

export default function ContactsInfo() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-md lg:mx-0"
          >
            <h2 className="mb-10 text-center text-3xl font-bold lg:text-left">Наші контакти</h2>

            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="mt-1">
                  <Phone className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Телефон</p>
                  <a
                    href={`tel:${PHONE}`}
                    className="text-2xl text-white transition-colors hover:text-amber-400"
                  >
                    {PHONE}
                  </a>
                  <p className="mt-1 text-zinc-400">Дзвінки з 5:00</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="mt-1">
                  <Mail className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-xl text-white transition-colors hover:text-amber-400"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="mt-1">
                  <Clock className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Графік роботи</p>
                  <p className="text-zinc-400">
                    Працюємо <span className="text-white">цілодобово</span>
                    <br />
                    Пн — Нд: <span className="text-white">5:00 — 22:00</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
