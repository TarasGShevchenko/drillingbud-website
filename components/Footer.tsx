'use client'
import { motion } from 'framer-motion'

const EMAIL = process.env.NEXT_PUBLIC_EMAIL
const PHONE = process.env.NEXT_PUBLIC_PHONE

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Про Нас</h3>
            <p className="max-w-xs text-zinc-400">
              Улаштування буронабивних паль любої складності!
              <br />
              Працюемо в Киеві, Київскій області!
              <br />
              Можливий виїзд в Черкаси, Чернігів та Житомир, а також по всій Україні!
              <br />
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Графік роботи</h4>
            <div className="flex flex-col gap-3 text-zinc-400">
              Працюємо цілодобово, 7 днів на тиждень.
              <br />
              <br />
              Пн - Нд: 5:00 - 22:00
              <br />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Звязок</h4>

            <div className="mb-8 flex flex-col gap-3 text-zinc-400">
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">
                {EMAIL}
              </a>
              <a href={`tel:${PHONE}`} className="transition-colors hover:text-white">
                {PHONE}
              </a>
            </div>

            <div className="flex gap-5">
              {[
                { name: 'Telegram', url: 'https://t.me/' },
                { name: 'Instagram', url: 'https://instagram.com/' },
              ].map((social, index) => (
                <motion.a
                  key={social.name + index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-900 pt-8 text-center text-sm text-zinc-500">
          © {currentYear} Drilling Bud. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
