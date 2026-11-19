"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import BrandText from "@/components/brand/BrandText";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DriverTrainingPhoto } from "@/types/content";

interface DriverTrainingSlideshowProps {
  photos: DriverTrainingPhoto[];
  priority?: boolean;
  label?: string;
  autoPlayInterval?: number;
  className?: string;
}

export default function DriverTrainingSlideshow({
  photos,
  priority = false,
  label = "Driver training slideshow",
  autoPlayInterval = 2000,
  className = "",
}: DriverTrainingSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = photos.length;

  // Handle reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
    }
  }, []);

  const goToNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrevious = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic transition timer
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, autoPlayInterval, goToNext, total]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  if (total === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className={`rounded-2xl bg-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Viewport Container with aspect ratio */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xl bg-brand-warm-white select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Stack with smooth crossfade */}
        {photos.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={photo.id || photo.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${total}`}
              aria-hidden={!isActive}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 550px"
                priority={priority && index === 0}
              />
            </div>
          );
        })}

        {/* Previous Navigation Arrow */}
        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-brand-ink shadow-md backdrop-blur-xs border border-brand-soft-neutral/80 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-brand-ink" />
        </button>

        {/* Next Navigation Arrow */}
        <button
          type="button"
          onClick={goToNext}
          className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-brand-ink shadow-md backdrop-blur-xs border border-brand-soft-neutral/80 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand-ink" />
        </button>
      </div>

      {/* Caption display */}
      <div className="pt-2.5 px-1 min-h-[2.5rem] flex items-center justify-between gap-3 text-xs text-brand-slate text-center sm:text-left">
        <p className="line-clamp-2 leading-relaxed">
          <BrandText>{currentPhoto?.caption || currentPhoto?.alt || ""}</BrandText>
        </p>
      </div>
    </div>
  );
}
