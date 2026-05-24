const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/#service`,
  name: 'Улаштування буронабивних паль',
  description:
    'Професійне буріння та влаштування буронабивних паль для фундаментів приватних і промислових об’єктів',
  provider: { '@type': 'ConstructionCompany', name: 'Drilling Bud', url: BASE_URL },
  areaServed: { '@type': 'Place', name: 'Kyiv, Ukraine' },
  serviceType: ['буронабивні палі', 'фундаментні роботи', 'бурові роботи', 'CFA палі'],
}
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Що таке буронабивні палі?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Буронабивні палі — це тип фундаменту, який створюється шляхом буріння свердловин і заповнення їх бетоном з армуванням.',
      },
    },
    {
      '@type': 'Question',
      name: 'Яка глибина буріння паль?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Глибина буріння може досягати до 25 метрів залежно від ґрунтів та проєкту.',
      },
    },
    {
      '@type': 'Question',
      name: 'Де ви працюєте?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ми виконуємо роботи по всій країні.',
      },
    },
  ],
}
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ConstructionCompany',
  '@id': `${BASE_URL}/#organization`,
  name: 'Drilling Bud',
  url: BASE_URL,
  logo: `${BASE_URL}/img/title.webp`,
  description: 'Професійне влаштування буронабивних паль у Києві та області',
  areaServed: 'Kyiv, Ukraine',
  sameAs: [`${BASE_URL}/#localbusiness`],
}
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ConstructionCompany',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'Drilling Bud',
  url: BASE_URL,
  image: `${BASE_URL}/img/title.webp`,
  logo: `${BASE_URL}/img/title.webp`,
  description: 'Професійне влаштування буронабивних паль у Києві та Київській області',
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
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Drilling Bud',
  publisher: { '@id': `${BASE_URL}/#organization` },
}
export const webpageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: 'Drilling Bud | Буронабивні палі Київ',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  about: { '@id': `${BASE_URL}/#localbusiness` },
}
