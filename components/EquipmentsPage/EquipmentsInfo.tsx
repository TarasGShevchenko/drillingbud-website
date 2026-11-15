'use client'

import { useTranslations } from 'next-intl'

import { Reveal } from '@/components'

export default function EquipmentsHero() {
  const t = useTranslations('Equipments')

  return (
    <section className="bg-gh-subtle py-16 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="mb-6 text-4xl font-bold">{t('infoTitle')}</h2>
            <div className="space-y-5 text-lg text-gh-muted dark:text-zinc-400">
              <p>{t('infoText1')}</p>
              <p>{t('infoText2')}</p>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-3xl bg-white p-8 text-sm tracking-widest text-gh-muted uppercase dark:bg-zinc-800 dark:text-zinc-400"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-1 font-semibold text-amber-400">{t('diameterLabel')}</p>
                <p className="text-2xl font-bold text-gh-fg dark:text-white">
                  {t('diameterValue')}
                </p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-amber-400">{t('depthLabel')}</p>
                <p className="text-2xl font-bold text-gh-fg dark:text-white">{t('depthValue')}</p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-amber-400">{t('drillingLabel')}</p>
                <p className="text-2xl font-bold text-gh-fg dark:text-white">
                  {t('drillingValue')}
                </p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-amber-400">{t('productivityLabel')}</p>
                <p className="text-2xl font-bold text-gh-fg dark:text-white">
                  {t('productivityValue')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
