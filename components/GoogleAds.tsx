'use client'

import { useEffect } from 'react'
import Script from 'next/script'

import { GOOGLE_ADS_ID, trackConversion } from '@/utils'

// Loads the Google Ads tag and reports clicks on any tel: link on the site
export default function GoogleAds() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('a[href^="tel:"]')) trackConversion('phoneClick')
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // No tag in `next dev`; trackConversion logs to the console instead
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  )
}
