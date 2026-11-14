'use client'

import { Clock, Mail, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ContactForm, Reveal } from '@/components'

const EMAIL = process.env.NEXT_PUBLIC_EMAIL
const PHONE = process.env.NEXT_PUBLIC_PHONE

export default function ContactsInfo() {
  const t = useTranslations('Contacts')
  const highlight = (chunks: React.ReactNode) => (
    <span className="text-gh-fg dark:text-white">{chunks}</span>
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col lg:pl-8">
          <div className="mx-auto max-w-md lg:mx-0">
            <Reveal as="h2" className="mb-10 text-center text-3xl font-bold lg:text-left">
              {t('infoTitle')}
            </Reveal>

            <div className="space-y-10">
              <Reveal delay={0.1} className="flex gap-5">
                <div className="mt-1">
                  <Phone className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{t('phone')}</p>
                  <a
                    href={`tel:${PHONE}`}
                    className="text-2xl text-gh-fg transition-colors hover:text-amber-400 dark:text-white"
                  >
                    {PHONE}
                  </a>
                  <p className="mt-1 text-gh-muted dark:text-zinc-400">{t('callsFrom')}</p>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="flex gap-5">
                <div className="mt-1">
                  <Mail className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{t('email')}</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-xl text-gh-fg transition-colors hover:text-amber-400 dark:text-white"
                  >
                    {EMAIL}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.3} className="flex gap-5">
                <div className="mt-1">
                  <Clock className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{t('hours')}</p>
                  <p className="text-gh-muted dark:text-zinc-400">
                    {t.rich('hoursAllDay', { b: highlight })}
                    <br />
                    {t.rich('hoursDays', { b: highlight })}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
