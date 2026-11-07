import React from "react";
import Image from "next/image";

interface FlagProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Waving flag emblem for the Flag of India.
 * Styled to match the waving flag graphic specified by the client.
 */
export function IndiaFlag({ className = "", ...props }: FlagProps) {
  return (
    <div
      className={`relative shrink-0 select-none ${className}`}
      role="img"
      aria-label="Flag of India"
      {...props}
    >
      <Image
        src="/images/brand/flag-india.webp"
        alt="Flag of India"
        width={142}
        height={102}
        priority
        className="h-full w-auto object-contain drop-shadow-md"
      />
    </div>
  );
}

/**
 * Waving flag emblem for the Flag of the United Arab Emirates.
 * Styled in the identical waving flag curved aesthetic with silk ripple shading.
 */
export function UaeFlag({ className = "", ...props }: FlagProps) {
  return (
    <div
      className={`relative shrink-0 select-none ${className}`}
      role="img"
      aria-label="Flag of United Arab Emirates"
      {...props}
    >
      <Image
        src="/images/brand/flag-uae.webp"
        alt="Flag of United Arab Emirates"
        width={142}
        height={102}
        priority
        className="h-full w-auto object-contain drop-shadow-md"
      />
    </div>
  );
}
