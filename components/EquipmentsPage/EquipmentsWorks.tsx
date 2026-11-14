'use client'

import { useTranslations } from 'next-intl'

import { Reveal } from '@/components'

export default function EquipmentsWorks() {
  const t = useTranslations('Equipments')

  return (
    <section className="bg-gh-subtle py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Reveal as="h2" className="mb-4 text-4xl font-bold">
            {t('whyTitle')}
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Reveal className="rounded-3xl bg-white p-8 dark:bg-zinc-800">
            <div className="mb-4 text-4xl">🚜</div>
            <h3 className="mb-3 text-xl font-semibold">{t('powerTitle')}</h3>
            <p className="text-gh-muted dark:text-zinc-400">{t('powerText')}</p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl bg-white p-8 dark:bg-zinc-800">
            <div className="mb-4 text-4xl">🛡️</div>
            <h3 className="mb-3 text-xl font-semibold">{t('qualityTitle')}</h3>
            <p className="text-gh-muted dark:text-zinc-400">{t('qualityText')}</p>
          </Reveal>

          <Reveal delay={0.2} className="rounded-3xl bg-white p-8 dark:bg-zinc-800">
            <div className="mb-4 text-4xl">⚡</div>
            <h3 className="mb-3 text-xl font-semibold">{t('speedTitle')}</h3>
            <p className="text-gh-muted dark:text-zinc-400">{t('speedText')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
