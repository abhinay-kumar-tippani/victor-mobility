import React from "react";

interface FlagProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Elegant waving flag emblem for the Flag of India.
 * Rendered with a gentle wave ripple, Ashoka Chakra, and silk lighting overlay.
 */
export function IndiaFlag({ className = "", ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 54 36"
      width="54"
      height="36"
      className={`shrink-0 overflow-visible ${className}`}
      aria-label="Flag of India"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="wave-clip-india">
          <path d="M 2 5 C 14 1.5, 26 8.5, 38 5 C 44 3.5, 49 4.5, 52 5 L 52 31 C 49 30.5, 44 29.5, 38 31 C 26 34.5, 14 27.5, 2 31 Z" />
        </clipPath>
        <linearGradient id="wave-lighting-india" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.20" />
          <stop offset="78%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.30" />
        </linearGradient>
      </defs>

      <g clipPath="url(#wave-clip-india)">
        {/* Top saffron stripe */}
        <path d="M 0 0 L 54 0 L 54 13 C 44 11.5, 26 16.5, 0 13 Z" fill="#FF9933" />
        {/* Middle white stripe */}
        <path d="M 0 11 C 26 14.5, 44 9.5, 54 11 L 54 25 C 44 23.5, 26 28.5, 0 25 Z" fill="#FFFFFF" />
        {/* Bottom green stripe */}
        <path d="M 0 23 C 26 26.5, 44 21.5, 54 23 L 54 36 L 0 36 Z" fill="#128807" />

        {/* Ashoka Chakra */}
        <g transform="translate(27, 18.2)">
          <circle r="4.2" fill="none" stroke="#000080" strokeWidth="0.75" />
          <circle r="0.9" fill="#000080" />
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2="0"
              y2="-4"
              stroke="#000080"
              strokeWidth="0.35"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Wave highlights & shadows overlay */}
        <rect x="0" y="0" width="54" height="36" fill="url(#wave-lighting-india)" style={{ mixBlendMode: "overlay" }} />
      </g>

      {/* Subtle crisp edge border following the wave */}
      <path
        d="M 2 5 C 14 1.5, 26 8.5, 38 5 C 44 3.5, 49 4.5, 52 5 L 52 31 C 49 30.5, 44 29.5, 38 31 C 26 34.5, 14 27.5, 2 31 Z"
        fill="none"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * Elegant waving flag emblem for the Flag of the United Arab Emirates.
 * Rendered with a gentle wave ripple, vertical red hoist, and silk lighting overlay.
 */
export function UaeFlag({ className = "", ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 54 36"
      width="54"
      height="36"
      className={`shrink-0 overflow-visible ${className}`}
      aria-label="Flag of United Arab Emirates"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="wave-clip-uae">
          <path d="M 2 5 C 14 1.5, 26 8.5, 38 5 C 44 3.5, 49 4.5, 52 5 L 52 31 C 49 30.5, 44 29.5, 38 31 C 26 34.5, 14 27.5, 2 31 Z" />
        </clipPath>
        <linearGradient id="wave-lighting-uae" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.20" />
          <stop offset="78%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.30" />
        </linearGradient>
      </defs>

      <g clipPath="url(#wave-clip-uae)">
        {/* Top green stripe */}
        <path d="M 14 0 L 54 0 L 54 13 C 44 11.5, 28 16.5, 14 13 Z" fill="#00732F" />
        {/* Middle white stripe */}
        <path d="M 14 11 C 28 14.5, 44 9.5, 54 11 L 54 25 C 44 23.5, 28 28.5, 14 25 Z" fill="#FFFFFF" />
        {/* Bottom black stripe */}
        <path d="M 14 23 C 28 26.5, 44 21.5, 54 23 L 54 36 L 14 36 Z" fill="#000000" />
        {/* Left vertical red hoist bar */}
        <rect x="0" y="0" width="15" height="36" fill="#EE2A35" />

        {/* Wave highlights & shadows overlay */}
        <rect x="0" y="0" width="54" height="36" fill="url(#wave-lighting-uae)" style={{ mixBlendMode: "overlay" }} />
      </g>

      {/* Subtle crisp edge border following the wave */}
      <path
        d="M 2 5 C 14 1.5, 26 8.5, 38 5 C 44 3.5, 49 4.5, 52 5 L 52 31 C 49 30.5, 44 29.5, 38 31 C 26 34.5, 14 27.5, 2 31 Z"
        fill="none"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1"
      />
    </svg>
  );
}
