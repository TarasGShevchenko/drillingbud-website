import { EquipmentsHero, EquipmentsInfo, EquipmentsTech, EquipmentsWorks } from '@/components'

export const dynamic = 'force-static'

export default function Equipments() {
  return (
    <>
      <EquipmentsHero />
      <EquipmentsInfo />
      <EquipmentsTech />
      <EquipmentsWorks />
    </>
  )
}
