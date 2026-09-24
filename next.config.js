/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for SEO and performance
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
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
  async redirects() {
    const serviceValenciaRedirects = [
      'fontanero',
      'electricista',
      'desatascos',
      'aire-acondicionado',
      'calefaccion',
      'limpieza-tuberias',
    ].flatMap((serviceSlug) => [
      {
        source: `/${serviceSlug}/valencia`,
        destination: `/${serviceSlug}`,
        permanent: true,
      },
      {
        source: `/es/${serviceSlug}/valencia`,
        destination: `/${serviceSlug}`,
        permanent: true,
      },
    ])

    return [
      {
        source: '/blog/saneamiento/cuando-hacer-una-inspeccion-con-camara-en-tuberias',
        destination: '/blog/saneamiento/atascos-repetidos-en-tuberias-despues-de-desatascar',
        permanent: true,
      },
      {
        source: '/es/blog/saneamiento/cuando-hacer-una-inspeccion-con-camara-en-tuberias',
        destination: '/blog/saneamiento/atascos-repetidos-en-tuberias-despues-de-desatascar',
        permanent: true,
      },
      ...serviceValenciaRedirects,
    ]
  },

  async rewrites() {
    const serviceSlugs = [
      'fontanero',
      'electricista',
      'desatascos',
      'aire-acondicionado',
      'calefaccion',
      'limpieza-tuberias',
    ]

    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/es',
        },
        {
          source: '/blog/:path*',
          destination: '/es/blog/:path*',
        },
        {
          source: '/servicios/:path*',
          destination: '/es/servicios/:path*',
        },
        {
          source: '/contacto',
          destination: '/es/contacto',
        },
        {
          source: '/cookies',
          destination: '/es/cookies',
        },
        {
          source: '/privacidad',
          destination: '/es/privacidad',
        },
        {
          source: '/terminos',
          destination: '/es/terminos',
        },
      ],
      afterFiles: [
        ...serviceSlugs.map((serviceSlug) => ({
          source: `/${serviceSlug}/:path*`,
          destination: `/es/${serviceSlug}/:path*`,
        })),
      ],
    }
  },

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
