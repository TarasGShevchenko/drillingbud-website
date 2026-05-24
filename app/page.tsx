import { MainHero, MainDescription, MainEquipments, MainContact } from '@/components'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <main>
      <MainHero />
      <MainDescription
        title="Надійні буронабивні палі для будь-яких ґрунтів"
        description="Використовуємо сучасну технологію CFA та буронабивні палі з обсадними трубами. Це дозволяє працювати навіть у складних ґрунтах: піщаних, глинистих, з високим рівнем ґрунтових вод та на схилах."
        imageSrc={'/img/01.webp'}
      />
      <MainDescription
        title="Від приватного будинку до багатоповерхівки"
        description="Виконуємо улаштування буронабивних паль для фундаментів приватних будинків, котеджів, промислових будівель, складів, ангарів та багатоповерхових споруд. Діаметр паль від 300 до 800 мм, глибина до 25 метрів."
        imageSrc={'/img/11.webp'}
        reverse
      />
      <MainEquipments />
      <MainContact />
    </main>
  )
}
