'use client'

import { Reveal } from '@/components'

export default function EquipmentsWorks() {
  return (
    <section className="bg-gh-subtle py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Reveal as="h2" className="mb-4 text-4xl font-bold">
            Чому обирають наше обладнання
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Reveal className="rounded-3xl bg-white p-8 dark:bg-zinc-800">
            <div className="mb-4 text-4xl">🚜</div>
            <h3 className="mb-3 text-xl font-semibold">Потужна техніка</h3>
            <p className="text-gh-muted dark:text-zinc-400">
              Сучасні бурові установки з високою прохідністю та точністю.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl bg-white p-8 dark:bg-zinc-800">
            <div className="mb-4 text-4xl">🛡️</div>
            <h3 className="mb-3 text-xl font-semibold">Контроль якості</h3>
            <p className="text-gh-muted dark:text-zinc-400">
              Постійний технічний нагляд та документування кожного етапу.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="rounded-3xl bg-white p-8 dark:bg-zinc-800">
            <div className="mb-4 text-4xl">⚡</div>
            <h3 className="mb-3 text-xl font-semibold">Швидкість</h3>
            <p className="text-gh-muted dark:text-zinc-400">
              Мобільні бригади готові до роботи в день звернення.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
