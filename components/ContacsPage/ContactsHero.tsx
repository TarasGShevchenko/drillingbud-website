'use client'

import { useTranslations } from 'next-intl'

import { Reveal } from '@/components'

export default function ContactsHero() {
  const t = useTranslations('Contacts')

  return (
    <section className="bg-white pt-28 pb-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal
          as="h1"
          onMount
          className="text-5xl font-bold text-gh-fg md:text-6xl dark:text-white"
        >
          {t('heroTitle')}
        </Reveal>
        <Reveal
          as="p"
          onMount
          delay={0.15}
          className="mx-auto mt-4 max-w-2xl text-xl text-gh-muted dark:text-zinc-400"
        >
          {t('heroSubtitle')}
        </Reveal>
      </div>
    </section>
  )
}
