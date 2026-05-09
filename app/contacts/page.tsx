import { ContactsHero, ContactsInfo, ContactsMap } from '@/components'

export const dynamic = 'force-static'

export default function Contacts() {
  return (
    <>
      <ContactsHero />
      <ContactsInfo />
      <ContactsMap />
    </>
  )
}
