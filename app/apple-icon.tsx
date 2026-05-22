import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#2563EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '22.5%', // Apple icon radius standard
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* House roof */}
          <path
            d="M70 20L120 55V60H110V52.5L70 25L30 52.5V60H20V55L70 20Z"
            fill="white"
          />
          {/* House body */}
          <rect x="30" y="55" width="80" height="65" rx="4" fill="white" />
          {/* Door */}
          <rect x="55" y="85" width="30" height="35" rx="2" fill="#2563EB" />
          {/* Window left */}
          <rect x="37.5" y="65" width="20" height="20" rx="1.5" fill="#93C5FD" />
          <line x1="37.5" y1="75" x2="57.5" y2="75" stroke="#2563EB" strokeWidth="2"/>
          <line x1="47.5" y1="65" x2="47.5" y2="85" stroke="#2563EB" strokeWidth="2"/>
          {/* Window right */}
          <rect x="82.5" y="65" width="20" height="20" rx="1.5" fill="#93C5FD" />
          <line x1="82.5" y1="75" x2="102.5" y2="75" stroke="#2563EB" strokeWidth="2"/>
          <line x1="92.5" y1="65" x2="92.5" y2="85" stroke="#2563EB" strokeWidth="2"/>
          {/* Wrench tool accent */}
          <g transform="translate(105, 105) rotate(-45)">
            {/* Wrench head */}
            <rect x="-6" y="-18" width="12" height="14" rx="2" fill="#F97316"/>
            <circle cx="0" cy="-11" r="4" fill="#2563EB"/>
            {/* Wrench handle */}
            <rect x="-4" y="-4" width="8" height="24" rx="1.5" fill="#F97316"/>
            {/* Grip lines */}
            <line x1="-4" y1="3" x2="4" y2="3" stroke="white" strokeWidth="1" opacity="0.6"/>
            <line x1="-4" y1="8" x2="4" y2="8" stroke="white" strokeWidth="1" opacity="0.6"/>
            <line x1="-4" y1="13" x2="4" y2="13" stroke="white" strokeWidth="1" opacity="0.6"/>
          </g>
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
