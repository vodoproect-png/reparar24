import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#2563EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* House roof */}
          <path
            d="M14 4L24 11V12H22V10.5L14 5L6 10.5V12H4V11L14 4Z"
            fill="white"
          />
          {/* House body */}
          <rect x="6" y="11" width="16" height="13" rx="1" fill="white" />
          {/* Door */}
          <rect x="11" y="17" width="6" height="7" rx="0.5" fill="#2563EB" />
          {/* Window left */}
          <rect x="7.5" y="13" width="4" height="4" rx="0.3" fill="#93C5FD" />
          {/* Window right */}
          <rect x="16.5" y="13" width="4" height="4" rx="0.3" fill="#93C5FD" />
          {/* Wrench accent */}
          <path
            d="M22 20L24 22L24 24L22 24L20 22L22 20Z"
            fill="#F97316"
            stroke="#F97316"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
