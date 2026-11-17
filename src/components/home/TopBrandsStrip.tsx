"use client";

import BrandText from "@/components/brand/BrandText";
import Image from "next/image";
import indiaData from "@/content/india.json";
import { useRef, useState } from "react";
import { clsx } from "clsx";

interface TopBrandsStripProps {
  title?: string;
  caption?: string;
}

const getBrandLogoClass = (brandName: string): string => {
  switch (brandName.toLowerCase()) {
    case "kia":
      return "h-7 sm:h-8";
    case "tata motors":
      return "h-6 sm:h-7";
    case "hyundai":
      return "h-9 sm:h-10";
    case "bmw":
      return "h-11 sm:h-12";
    case "force motors":
      return "h-10 sm:h-11";
    case "toyota":
    default:
      return "h-10 sm:h-11";
  }
};

export default function TopBrandsStrip({
  title = indiaData.topBrandsCarried.title,
  caption,
}: TopBrandsStripProps = {}) {
  const { brands } = indiaData.topBrandsCarried;
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // Detect gesture intent
    if (isHorizontalSwipe.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontalSwipe.current) {
      const clampedDelta = Math.max(-120, Math.min(120, deltaX));
      setDragOffset(clampedDelta);
    }
  };

  const handleTouchEnd = () => {
    setDragOffset(0);
    setTimeout(() => {
      setIsPaused(false);
    }, 400);
  };

  const renderBrandCard = (
    brand: (typeof brands)[0],
    isDuplicate: boolean,
    trackIdx: number
  ) => (
    <li
      key={`${trackIdx}-${brand.name}`}
      className="flex h-32 sm:h-36 w-44 sm:w-56 lg:w-60 shrink-0 flex-col items-center justify-between rounded-2xl bg-white px-3.5 py-4 sm:px-4 sm:py-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="flex h-14 sm:h-16 w-full items-center justify-center">
        <Image
          src={brand.logo}
          alt={isDuplicate ? "" : `${brand.name} logo`}
          width={160}
          height={64}
          unoptimized
          priority
          loading="eager"
          className={clsx("w-auto object-contain", getBrandLogoClass(brand.name))}
        />
      </div>
      <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-brand-ink">
        {brand.name}
      </span>
    </li>
  );

  return (
    <section
      id="top-brands-carried"
      aria-labelledby="top-brands-title"
      className="group relative overflow-hidden rounded-3xl bg-[#07182C] px-3 py-8 sm:px-6 sm:py-10 shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      {/* Subtle edge fade gradient masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 sm:w-14 bg-gradient-to-r from-[#07182C] via-[#07182C]/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 sm:w-14 bg-gradient-to-l from-[#07182C] via-[#07182C]/75 to-transparent"
      />

      <h2
        id="top-brands-title"
        className="mb-7 text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
      >
        <BrandText>{title}</BrandText>
      </h2>

      {/* Horizontally scrolling carousel track with rigid height to prevent vertical jitter */}
      <div
        className="relative flex h-36 sm:h-40 w-full items-center overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div
          className={clsx(
            "flex w-max shrink-0 items-center animate-top-brands-marquee group-hover:[animation-play-state:paused]",
            isPaused && "[animation-play-state:paused]",
            dragOffset !== 0 ? "transition-none" : "transition-transform duration-300 ease-out"
          )}
          style={
            dragOffset !== 0
              ? { transform: `translate3d(${dragOffset}px, 0, 0)` }
              : undefined
          }
        >
          {/* Track 1: Primary accessible list */}
          <ul
            aria-label="Top brands carried"
            className="flex shrink-0 items-center gap-3.5 sm:gap-5 pr-3.5 sm:pr-5"
          >
            {brands.map((brand) => renderBrandCard(brand, false, 0))}
          </ul>

          {/* Track 2: Duplicate for seamless infinite loop */}
          <ul
            aria-hidden="true"
            className="flex shrink-0 items-center gap-3.5 sm:gap-5 pr-3.5 sm:pr-5"
          >
            {brands.map((brand) => renderBrandCard(brand, true, 1))}
          </ul>
        </div>
      </div>

      {caption && (
        <p className="mt-6 text-center text-xs leading-relaxed text-white/75">
          <BrandText>{caption}</BrandText>
        </p>
      )}
    </section>
  );
}
