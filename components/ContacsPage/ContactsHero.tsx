'use client'

import { Reveal } from '@/components'

export default function ContactsHero() {
  return (
    <section className="bg-white pt-28 pb-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal
          as="h1"
          onMount
          className="text-5xl font-bold text-gh-fg md:text-6xl dark:text-white"
        >
          Зв&apos;яжіться з нами
        </Reveal>
        <Reveal
          as="p"
          onMount
          delay={0.15}
          className="mx-auto mt-4 max-w-2xl text-xl text-gh-muted dark:text-zinc-400"
        >
          Ми завжди на зв&apos;язку та готові відповісти на всі ваші питання
        </Reveal>
      </div>
    </section>
  )
}
