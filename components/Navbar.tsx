'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'

import { navLinks } from '@/constants'

const PHONE = process.env.NEXT_PUBLIC_PHONE

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 z-50 w-screen overflow-x-hidden border-b border-white/10 bg-black/40 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20">
          {/* LOGO */}
          <Link
            href="/"
            className="flex-shrink-0 text-[21px] font-semibold tracking-wide text-white sm:text-2xl"
          >
            Drilling Bud
          </Link>

          {/* DESKTOP MENU */}
          <div className="mr-20 hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP PHONE */}
          {PHONE && (
            <a
              href={`tel:${PHONE}`}
              className="hidden flex-shrink-0 items-center gap-2 font-semibold text-white transition-colors duration-300 hover:text-amber-400 lg:inline-flex"
            >
              <Phone size={18} className="text-amber-400" />
              {PHONE}
            </a>
          )}

          {/* MOBILE BUTTONS */}
          <div className="flex flex-shrink-0 items-center gap-5 lg:hidden">
            {PHONE && (
              <a
                href={`tel:${PHONE}`}
                aria-label={`Зателефонувати ${PHONE}`}
                className="text-amber-400 transition-colors hover:text-white"
              >
                <Phone size={24} />
              </a>
            )}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Відкрити меню"
              className="text-white"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Закрити меню"
              className="absolute top-6 right-6 text-white"
            >
              <X size={36} />
            </button>

            {/* LINKS */}
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-semibold text-white transition-colors hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {PHONE && (
                <motion.a
                  href={`tel:${PHONE}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navLinks.length * 0.1,
                  }}
                  className="inline-flex items-center gap-3 text-2xl font-semibold text-amber-400 transition-colors hover:text-white"
                >
                  <Phone size={24} />
                  {PHONE}
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
