import { createNavigation } from 'next-intl/navigation'

import { routing } from '@/i18n/routing'

// Locale-aware versions of next/link and the navigation hooks
export const { Link, usePathname, useRouter, getPathname } = createNavigation(routing)
