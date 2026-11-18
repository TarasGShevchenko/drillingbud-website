// Google Ads conversion tracking. These IDs are public: Google's tag puts them in the page anyway.
export const GOOGLE_ADS_ID = 'AW-10970064851'

// Conversion labels from Google Ads → Goals → Conversions
const CONVERSION_LABELS = {
  lead: 'gXerCN2x_bodENPP9-4o', // «Заявка з сайту»: a form was sent successfully
  phoneClick: 'ar7xCM3ThrsdENPP9-4o', // «Клік по телефону»: a tel: link was clicked
} as const

export type Conversion = keyof typeof CONVERSION_LABELS

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Google Ads counts it only for visitors who came from an ad click, so test clicks don't skew the stats
export const trackConversion = (conversion: Conversion) => {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[Google Ads] conversion:', conversion)
  }

  window.gtag?.('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS[conversion]}`,
  })
}
