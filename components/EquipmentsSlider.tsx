'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function EquipmentsSlider({ images }: { images: string[] }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-8 bg-gradient-to-r from-white via-white to-transparent md:w-12 dark:from-black dark:via-black" />
      <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-8 bg-gradient-to-l from-white via-white to-transparent md:w-12 dark:from-black dark:via-black" />
      <Swiper
        modules={[Autoplay]}
        loop
        centeredSlides
        grabCursor
        speed={1200}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1.15,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2.1,
            centeredSlides: true,
          },
          1280: {
            slidesPerView: 4,
            centeredSlides: false,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-gh-subtle shadow-2xl md:h-[520px] dark:bg-zinc-900">
              <Image
                src={image}
                alt={`Equipment ${index}`}
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
