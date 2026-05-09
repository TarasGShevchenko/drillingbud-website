const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Улаштування буронабивних паль',
  description:
      'Професійне буріння та влаштування буронабивних паль для фундаментів приватних і промислових об’єктів',
  provider: {
    '@type': 'ConstructionCompany',
    name: 'Drilling Bud',
    url: BASE_URL,
  },
  areaServed: {
    '@type': 'Place',
    name: 'Kyiv, Ukraine',
  },
  serviceType: [
    'буронабивні палі',
    'фундаментні роботи',
    'бурові роботи',
    'CFA палі',
  ],
}
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Що таке буронабивні палі?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
            'Буронабивні палі — це тип фундаменту, який створюється шляхом буріння свердловин і заповнення їх бетоном з армуванням.',
      },
    },
    {
      '@type': 'Question',
      name: 'Яка глибина буріння паль?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
            'Глибина буріння може досягати до 25 метрів залежно від ґрунтів та проєкту.',
      },
    },
    {
      '@type': 'Question',
      name: 'Де ви працюєте?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
            'Ми виконуємо роботи по всій країні.',
      },
    },
  ],
}
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ConstructionCompany',
  name: 'Drilling Bud',
  url: BASE_URL,
  logo: `${BASE_URL}/img/title.jpg`,
  description: 'Професійне влаштування буронабивних паль у Києві та області',
  areaServed: 'Kyiv, Ukraine',
  sameAs: [],
}
export const localBusinessSchema = {
  '@type': 'LocalBusiness',
  name: 'Drilling Bud',
  telephone: '+380636808066',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kyiv',
    addressCountry: 'UA',
  },
}
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Drilling Bud',
  url: BASE_URL,
}
