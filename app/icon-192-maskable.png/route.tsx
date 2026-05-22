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
          padding: '20px',
        }}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* House roof */}
          <path
            d="M75 25L125 60V65H115V57.5L75 30L35 57.5V65H25V60L75 25Z"
            fill="white"
          />
          {/* House body */}
          <rect x="35" y="60" width="80" height="65" rx="4" fill="white" />
          {/* Door */}
          <rect x="60" y="90" width="30" height="35" rx="2" fill="#2563EB" />
          {/* Window left */}
          <rect x="42.5" y="70" width="20" height="20" rx="1.5" fill="#93C5FD" />
          <line x1="42.5" y1="80" x2="62.5" y2="80" stroke="#2563EB" strokeWidth="2"/>
          <line x1="52.5" y1="70" x2="52.5" y2="90" stroke="#2563EB" strokeWidth="2"/>
          {/* Window right */}
          <rect x="87.5" y="70" width="20" height="20" rx="1.5" fill="#93C5FD" />
          <line x1="87.5" y1="80" x2="107.5" y2="80" stroke="#2563EB" strokeWidth="2"/>
          <line x1="97.5" y1="70" x2="97.5" y2="90" stroke="#2563EB" strokeWidth="2"/>
          {/* Wrench tool */}
          <g transform="translate(110, 110) rotate(-45)">
            <rect x="-6" y="-18" width="12" height="14" rx="2" fill="#F97316"/>
            <circle cx="0" cy="-11" r="4" fill="#2563EB"/>
            <rect x="-4" y="-4" width="8" height="24" rx="1.5" fill="#F97316"/>
            <line x1="-4" y1="3" x2="4" y2="3" stroke="white" strokeWidth="1" opacity="0.6"/>
            <line x1="-4" y1="8" x2="4" y2="8" stroke="white" strokeWidth="1" opacity="0.6"/>
            <line x1="-4" y1="13" x2="4" y2="13" stroke="white" strokeWidth="1" opacity="0.6"/>
          </g>
        </svg>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  )
}
