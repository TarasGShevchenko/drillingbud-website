import type { Locale } from '@/i18n/routing'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Translated strings; the rest of the schema is the same for every language
const TEXTS = {
  uk: {
    serviceName: 'Улаштування буронабивних паль',
    serviceDescription:
      'Професійне буріння та влаштування буронабивних паль для фундаментів приватних і промислових об’єктів',
    serviceType: ['буронабивні палі', 'фундаментні роботи', 'бурові роботи', 'CFA палі'],
    faq: [
      {
        question: 'Що таке буронабивні палі?',
        answer:
          'Буронабивні палі — це тип фундаменту, який створюється шляхом буріння свердловин і заповнення їх бетоном з армуванням.',
      },
      {
        question: 'Яка глибина буріння паль?',
        answer: 'Глибина буріння може досягати до 25 метрів залежно від ґрунтів та проєкту.',
      },
      { question: 'Де ви працюєте?', answer: 'Ми виконуємо роботи по всій країні.' },
    ],
    organizationDescription: 'Професійне влаштування буронабивних паль у Києві та області',
    localBusinessDescription:
      'Професійне влаштування буронабивних паль у Києві та Київській області',
    webpageName: 'Drilling Bud | Буронабивні палі Київ',
  },
  ru: {
    serviceName: 'Устройство буронабивных свай',
    serviceDescription:
      'Профессиональное бурение и устройство буронабивных свай для фундаментов частных и промышленных объектов',
    serviceType: ['буронабивные сваи', 'фундаментные работы', 'буровые работы', 'CFA сваи'],
    faq: [
      {
        question: 'Что такое буронабивные сваи?',
        answer:
          'Буронабивные сваи — это тип фундамента, который создаётся путём бурения скважин и заполнения их бетоном с армированием.',
      },
      {
        question: 'Какая глубина бурения свай?',
        answer: 'Глубина бурения может достигать 25 метров в зависимости от грунтов и проекта.',
      },
      { question: 'Где вы работаете?', answer: 'Мы выполняем работы по всей стране.' },
    ],
    organizationDescription: 'Профессиональное устройство буронабивных свай в Киеве и области',
    localBusinessDescription:
      'Профессиональное устройство буронабивных свай в Киеве и Киевской области',
    webpageName: 'Drilling Bud | Буронабивные сваи Киев',
  },
} satisfies Record<Locale, unknown>

// Schemas rendered as JSON-LD in the layout. The company entities (organization, local business,
// website) keep one @id across languages; the language-specific ones get a /ru prefix.
export const getStructuredData = (locale: Locale) => {
  const t = TEXTS[locale]
  const pageUrl = locale === 'uk' ? BASE_URL : `${BASE_URL}/${locale}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}/#service`,
    name: t.serviceName,
    description: t.serviceDescription,
    provider: { '@type': 'ConstructionCompany', name: 'Drilling Bud', url: BASE_URL },
    areaServed: { '@type': 'Place', name: 'Kyiv, Ukraine' },
    serviceType: t.serviceType,
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}/#faq`,
    mainEntity: t.faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ConstructionCompany',
    '@id': `${BASE_URL}/#organization`,
    name: 'Drilling Bud',
    url: BASE_URL,
    logo: `${BASE_URL}/img/title.webp`,
    description: t.organizationDescription,
    areaServed: 'Kyiv, Ukraine',
    sameAs: [`${BASE_URL}/#localbusiness`],
  }
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ConstructionCompany',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Drilling Bud',
    url: BASE_URL,
    image: `${BASE_URL}/img/title.webp`,
    logo: `${BASE_URL}/img/title.webp`,
    description: t.localBusinessDescription,
    telephone: '+380636808066',
    address: { '@type': 'PostalAddress', addressLocality: 'Kyiv', addressCountry: 'UA' },
    geo: { '@type': 'GeoCoordinates', latitude: 50.4501, longitude: 30.5234 },
    areaServed: { '@type': 'Place', name: 'Kyiv, Ukraine' },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '7:59',
      },
    ],
    sameAs: [],
  }
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Drilling Bud',
    publisher: { '@id': `${BASE_URL}/#organization` },
  }
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: t.webpageName,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#localbusiness` },
  }

  // Same order as before the Russian version was added
  return [
    serviceSchema,
    faqSchema,
    organizationSchema,
    localBusinessSchema,
    webpageSchema,
    websiteSchema,
  ]
}
