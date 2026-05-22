import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2563EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
        }}
      >
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* House roof */}
          <path
            d="M200 80L330 160V170H310V152L200 85L90 152V170H70V160L200 80Z"
            fill="white"
          />
          {/* House body */}
          <rect x="90" y="160" width="220" height="180" rx="10" fill="white" />
          {/* Door */}
          <rect x="160" y="240" width="80" height="100" rx="5" fill="#2563EB" />
         {/* Door handle */}
          <circle cx="220" cy="290" r="5" fill="#93C5FD"/>
          {/* Window left */}
          <rect x="110" y="190" width="55" height="55" rx="4" fill="#93C5FD" />
          <line x1="110" y1="217.5" x2="165" y2="217.5" stroke="#2563EB" strokeWidth="5"/>
          <line x1="137.5" y1="190" x2="137.5" y2="245" stroke="#2563EB" strokeWidth="5"/>
          {/* Window right */}
          <rect x="235" y="190" width="55" height="55" rx="4" fill="#93C5FD" />
          <line x1="235" y1="217.5" x2="290" y2="217.5" stroke="#2563EB" strokeWidth="5"/>
          <line x1="262.5" y1="190" x2="262.5" y2="245" stroke="#2563EB" strokeWidth="5"/>
          {/* Wrench tool */}
          <g transform="translate(290, 290) rotate(-45)">
            <rect x="-15" y="-45" width="30" height="35" rx="5" fill="#F97316"/>
            <circle cx="0" cy="-27.5" r="10" fill="#2563EB"/>
            <rect x="-10" y="-10" width="20" height="65" rx="4" fill="#F97316"/>
            <line x1="-10" y1="8" x2="10" y2="8" stroke="white" strokeWidth="2.5" opacity="0.6"/>
            <line x1="-10" y1="20" x2="10" y2="20" stroke="white" strokeWidth="2.5" opacity="0.6"/>
            <line x1="-10" y1="32" x2="10" y2="32" stroke="white" strokeWidth="2.5" opacity="0.6"/>
            <line x1="-10" y1="44" x2="10" y2="44" stroke="white" strokeWidth="2.5" opacity="0.6"/>
          </g>
        </svg>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  )
}
