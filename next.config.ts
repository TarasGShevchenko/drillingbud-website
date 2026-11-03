import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    qualities: [75, 80, 85, 90, 95],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Keep preview deployments (staging.drillingbud.com.ua, feature branches) out of search engines.
  // Vercel sets VERCEL_ENV: 'production' for master, 'preview' for other branches; unset locally.
  async headers() {
    if (process.env.VERCEL_ENV !== 'preview') return []

    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default nextConfig
