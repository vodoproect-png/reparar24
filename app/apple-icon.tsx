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
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '22.5%',
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield background */}
          <path
            d="M60 10L95 25V55C95 75 80 95 60 110C40 95 25 75 25 55V25L60 10Z"
            fill="#0078D7"
          />
          {/* Shield border */}
          <path
            d="M60 10L95 25V55C95 75 80 95 60 110C40 95 25 75 25 55V25L60 10Z"
            stroke="#00205B"
            strokeWidth="3"
            fill="none"
          />
          {/* Inner shield frame */}
          <path
            d="M60 18L88 30V55C88 72 76 88 60 100C44 88 32 72 32 55V30L60 18Z"
            fill="white"
          />
          {/* House - orange roof */}
          <path
            d="M50 38L60 30L70 38V42H50V38Z"
            fill="#FF8C00"
            stroke="#00205B"
            strokeWidth="2"
          />
          {/* House - body */}
          <rect x="50" y="42" width="20" height="18" rx="1" fill="white" stroke="#00205B" strokeWidth="2"/>
          {/* Window */}
          <rect x="56" y="47" width="8" height="6" fill="#00205B"/>
          {/* Chimney */}
          <rect x="65" y="34" width="3" height="6" fill="#00205B"/>
          {/* Crossed tools - wrench */}
          <g transform="translate(45, 65) rotate(-45)">
            <rect x="-2" y="-12" width="4" height="10" rx="1" fill="#C0C0C0" stroke="#00205B" strokeWidth="0.5"/>
            <circle cx="0" cy="-7" r="2.5" fill="none" stroke="#00205B" strokeWidth="0.8"/>
            <rect x="-1.5" y="-2" width="3" height="16" rx="0.5" fill="#C0C0C0" stroke="#00205B" strokeWidth="0.5"/>
          </g>
          {/* Crossed tools - screwdriver */}
          <g transform="translate(75, 65) rotate(45)">
            <rect x="-1" y="-2" width="2" height="16" rx="0.3" fill="#C0C0C0" stroke="#00205B" strokeWidth="0.5"/>
            <rect x="-1.5" y="14" width="3" height="8" rx="0.5" fill="#FF8C00" stroke="#00205B" strokeWidth="0.5"/>
          </g>
          {/* Sparkles */}
          <path d="M40 28L41 30L40 32L39 30L40 28Z" fill="#0078D7"/>
          <path d="M78 35L79.5 38L78 41L76.5 38L78 35Z" fill="#0078D7"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
