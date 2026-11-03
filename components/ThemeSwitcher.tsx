'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'

import { setTheme, Theme } from '@/utils'

// The current theme is the `dark` class on <html> (set by themeScript before paint)
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const getTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

// Unknown during static rendering; the real theme is read on hydration
const getServerTheme = () => null

export default function ThemeSwitcher({ size = 20 }: { size?: number }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)

  const next = theme === 'dark' ? 'light' : 'dark'
  const label = theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className="text-gh-fg/80 transition-colors duration-300 hover:text-gh-fg dark:text-white/80 dark:hover:text-white"
    >
      {/* Icons switch via CSS so the right one shows before hydration */}
      <Moon size={size} className="dark:hidden" />
      <Sun size={size} className="hidden dark:block" />
    </button>
  )
}
