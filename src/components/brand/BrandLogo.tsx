import React from "react";

interface BrandLogoProps {
  className?: string;
}

/**
 * BrandLogo renders the authoritative Victor Mobility logo using a non-destructive
 * SVG viewport. It crops out the extraneous white margins of the raw PNG file
 * while preserving the complete horse artwork, registration mark ®, rays,
 * and tagline "On Time Every Time." intact.
 */
export default function BrandLogo({ className = "w-48 sm:w-56 h-12 sm:h-14" }: BrandLogoProps) {
  return (
    <div className={`relative flex items-center justify-start ${className}`}>
      <svg
        viewBox="130 160 810 430"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full object-contain"
        role="img"
        aria-label="Victor Mobility - On Time Every Time."
      >
        <image
          href="/brand/victor-original.png"
          width="1074"
          height="751"
        />
      </svg>
    </div>
  );
}
