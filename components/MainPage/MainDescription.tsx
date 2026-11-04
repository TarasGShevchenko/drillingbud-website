'use client'

import Image from 'next/image'

import { Reveal } from '@/components'

type MainDescriptionProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  reverse?: boolean
}

export default function MainDescription({
  title,
  description,
  imageSrc,
  imageAlt = '',
  reverse = false,
}: MainDescriptionProps) {
  if (!imageSrc) {
    console.error('Description: imageSrc is required')
    return null
  }
  return (
    <section className="bg-white py-16 md:py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`grid grid-cols-1 items-center gap-12 md:gap-16 lg:gap-20 ${reverse ? 'md:grid-cols-2' : 'md:grid-cols-2'}`}
        >
          <Reveal
            className={`order-2 flex flex-col justify-center ${reverse ? 'md:order-2' : 'md:order-1'}`}
          >
            <h2 className="text-4xl font-bold tracking-tight break-words text-gh-fg md:text-5xl dark:text-white">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gh-muted dark:text-zinc-400">
              {description}
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className={`relative order-1 h-[420px] overflow-hidden rounded-3xl shadow-2xl md:h-[520px] lg:h-[580px] ${reverse ? 'md:order-1' : 'md:order-2'}`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              quality={80}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
