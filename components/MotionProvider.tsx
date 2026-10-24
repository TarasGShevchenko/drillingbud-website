'use client'

import { MotionConfig } from 'framer-motion'

// Turns off transform animations for visitors with "reduce motion" enabled in the OS
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
