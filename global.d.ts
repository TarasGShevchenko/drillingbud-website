import type { Locale } from '@/i18n/routing'
import type messages from '@/messages/uk.json'

// Type-checks translation keys against the Ukrainian messages
declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: typeof messages
  }
}
