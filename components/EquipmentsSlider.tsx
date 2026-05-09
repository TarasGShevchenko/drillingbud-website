'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const images = [
  '/img/01.jpeg',
  '/img/02.jpeg',
  '/img/04.jpeg',
  '/img/05.jpeg',
  '/img/06.jpeg',
  '/img/02.jpeg',
  '/img/07.jpeg',
  '/img/04.jpeg',
  '/img/09.jpeg',
]

export default function EquipmentsSlider() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-8 bg-gradient-to-r from-black via-black to-transparent md:w-12" />
      <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-8 bg-gradient-to-l from-black via-black to-transparent md:w-12" />
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
          },
          768: {
            slidesPerView: 2.1,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-zinc-900 shadow-2xl md:h-[520px]">
              <Image
                src={image}
                alt={`Equipment ${index}`}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
