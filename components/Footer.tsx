'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const EMAIL = process.env.NEXT_PUBLIC_EMAIL
const PHONE = process.env.NEXT_PUBLIC_PHONE

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('Footer')

  return (
    <footer className="border-t border-zinc-900 bg-white pt-16 pb-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold">{t('about')}</h3>
            <p className="max-w-xs text-gh-muted dark:text-zinc-400">
              {t('aboutText1')}
              <br />
              {t('aboutText2')}
              <br />
              {t('aboutText3')}
              <br />
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-gh-fg dark:text-white">{t('hours')}</h4>
            <div className="flex flex-col gap-3 text-gh-muted dark:text-zinc-400">
              {t('hoursText1')}
              <br />
              <br />
              {t('hoursText2')}
              <br />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-gh-fg dark:text-white">
              {t('contact')}
            </h4>

            <div className="mb-8 flex flex-col gap-3 text-gh-muted dark:text-zinc-400">
              <a
                href={`mailto:${EMAIL}`}
                className="transition-colors hover:text-gh-fg dark:hover:text-white"
              >
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE}`}
                className="transition-colors hover:text-gh-fg dark:hover:text-white"
              >
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
                  className="text-gh-muted transition-colors hover:text-gh-fg dark:text-zinc-400 dark:hover:text-white"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-900 pt-8 text-center text-sm text-gh-muted dark:text-zinc-500">
          © {currentYear} Drilling Bud. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
