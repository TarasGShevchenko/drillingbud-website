'use client'

import { AnimatePresence, motion } from 'framer-motion'

export default function FieldError({ message }: { message: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="overflow-hidden pt-1.5 text-left text-sm text-red-500"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
