import React from "react";

interface FlagProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Circular luxury emblem for the Flag of India.
 * Specially calibrated for high-end executive typography.
 */
export function IndiaFlag({ className = "", ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      width="36"
      height="36"
      className={`rounded-full shadow-lg ring-2 ring-white/60 shrink-0 overflow-hidden ${className}`}
      aria-label="Flag of India"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="circle-in-flag">
          <circle cx="18" cy="18" r="18" />
        </clipPath>
      </defs>
      <g clipPath="url(#circle-in-flag)">
        {/* Top saffron stripe */}
        <rect x="0" y="0" width="36" height="12" fill="#FF9933" />
        {/* Middle white stripe */}
        <rect x="0" y="12" width="36" height="12" fill="#FFFFFF" />
        {/* Bottom green stripe */}
        <rect x="0" y="24" width="36" height="12" fill="#128807" />
        {/* Ashoka Chakra */}
        <g transform="translate(18, 18)">
          <circle r="4.8" fill="none" stroke="#000080" strokeWidth="0.8" />
          <circle r="1" fill="#000080" />
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2="0"
              y2="-4.6"
              stroke="#000080"
              strokeWidth="0.4"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </g>
      {/* Subtle glass reflection highlight */}
      <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

/**
 * Circular luxury emblem for the Flag of the United Arab Emirates.
 * Specially calibrated for high-end executive typography.
 */
export function UaeFlag({ className = "", ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      width="36"
      height="36"
      className={`rounded-full shadow-lg ring-2 ring-white/60 shrink-0 overflow-hidden ${className}`}
      aria-label="Flag of United Arab Emirates"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="circle-uae-flag">
          <circle cx="18" cy="18" r="18" />
        </clipPath>
      </defs>
      <g clipPath="url(#circle-uae-flag)">
        {/* Top green stripe */}
        <rect x="10.8" y="0" width="25.2" height="12" fill="#00732F" />
        {/* Middle white stripe */}
        <rect x="10.8" y="12" width="25.2" height="12" fill="#FFFFFF" />
        {/* Bottom black stripe */}
        <rect x="10.8" y="24" width="25.2" height="12" fill="#000000" />
        {/* Left vertical red stripe */}
        <rect x="0" y="0" width="10.8" height="36" fill="#EE2A35" />
      </g>
      {/* Subtle glass reflection highlight */}
      <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}
