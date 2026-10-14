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
export default function BrandLogo({ className = "h-12 sm:h-[56px] aspect-[810/430]" }: BrandLogoProps) {
  return (
    <div className={`relative flex items-center justify-start overflow-hidden shrink-0 ${className}`}>
      <svg
        viewBox="130 160 810 430"
        preserveAspectRatio="xMinYMid meet"
        className="w-full h-full object-contain overflow-hidden"
        role="img"
        aria-label="Victor Mobility - On Time Every Time."
      >
        <defs>
          <clipPath id="victor-logo-viewport-clip">
            <rect x="130" y="160" width="810" height="430" />
          </clipPath>
        </defs>
        <image
          href="/brand/victor-original.png"
          width="1074"
          height="751"
          clipPath="url(#victor-logo-viewport-clip)"
        />
      </svg>
    </div>
  );
}
