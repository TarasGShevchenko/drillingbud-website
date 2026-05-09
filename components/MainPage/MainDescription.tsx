'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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
    console.error("Description: imageSrc is required")
    return null
  }
  return (
    <section className="bg-zinc-950 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`grid grid-cols-1 items-center gap-12 md:gap-16 lg:gap-20 ${reverse ? 'md:grid-cols-2' : 'md:grid-cols-2'}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`order-2 flex flex-col justify-center ${reverse ? 'md:order-2' : 'md:order-1'}`}
          >
            <h2 className="text-4xl font-bold tracking-tight text-white break-words md:text-5xl">{title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">{description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
