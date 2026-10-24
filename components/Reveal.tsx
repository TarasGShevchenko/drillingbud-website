'use client'

import { ComponentType } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type RevealTag = 'div' | 'section' | 'h1' | 'h2' | 'h3' | 'p'

type RevealProps<T extends RevealTag> = HTMLMotionProps<T> & {
  as?: T
  // Extra delay in seconds, e.g. 0.1 / 0.2 for items in a group
  delay?: number
  // Animate on page load (first screen) instead of when scrolled into view
  onMount?: boolean
}

// Default fade-up animation. Any motion prop passed in (initial, transition, …) overrides it;
// `transition` is merged with the defaults.
export default function Reveal<T extends RevealTag = 'div'>({
  as,
  delay = 0,
  onMount = false,
  transition,
  ...props
}: RevealProps<T>) {
  const Component = motion[as ?? 'div'] as unknown as ComponentType<HTMLMotionProps<T>>
  const trigger = onMount
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 } }

  return (
    <Component
      initial={{ opacity: 0, y: 30 }}
      {...trigger}
      transition={{ duration: 0.6, ease: 'easeOut', delay, ...transition }}
      {...(props as HTMLMotionProps<T>)}
    />
  )
}
