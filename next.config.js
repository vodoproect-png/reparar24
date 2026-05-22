/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for SEO and performance
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Power optimizations
  poweredByHeader: false,

  // Trailing slashes for SEO
  trailingSlash: false,

  // MULTILINGUAL INDEXATION FREEZE
  // Block /en/* and /ru/* from indexing via X-Robots-Tag headers
  // These pages contain broken Spanish content
  async headers() {
    return [
      {
        source: '/en/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/ru/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
