import React from "react";

interface DecorativeStripesProps {
  className?: string;
}

export default function DecorativeStripes({ className = "w-28 h-24" }: DecorativeStripesProps) {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Parallel diagonal stripes at ~50 degrees matching Image 2 and Image 3 */}
        <line
          x1="30"
          y1="100"
          x2="95"
          y2="10"
          stroke="#6E57A0"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.45"
        />
        <line
          x1="45"
          y1="100"
          x2="110"
          y2="10"
          stroke="#8A71E6"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        <line
          x1="60"
          y1="100"
          x2="125"
          y2="10"
          stroke="#A78BFA"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        <line
          x1="75"
          y1="100"
          x2="140"
          y2="10"
          stroke="#C4B5FD"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
