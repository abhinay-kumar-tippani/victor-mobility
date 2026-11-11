"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandText from "@/components/brand/BrandText";
import {
  Maximize2,
  X,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  ZoomIn,
  ZoomOut,
  Zap,
} from "lucide-react";
import type {
  AchievementsContent,
  AchievementItem,
} from "@/types/content";

interface AchievementsGalleryProps {
  achievements: AchievementsContent;
}

export default function AchievementsGallery({ achievements }: AchievementsGalleryProps) {
  const { hero, featuredAchievements, closingSection } = achievements;

  // Active modal state
  const [activeItem, setActiveItem] = useState<AchievementItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Focus management refs
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    const closedId = activeItem?.id;
    setActiveItem(null);
    setIsZoomed(false);

    // Restore focus to the trigger that opened the modal
    if (closedId && triggerRefs.current[closedId]) {
      setTimeout(() => {
        triggerRefs.current[closedId]?.focus();
      }, 50);
    }
  }, [activeItem]);

  const openModal = (item: AchievementItem) => {
    setActiveItem(item);
    setIsZoomed(false);
  };

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (activeItem) {
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          closeModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeItem, closeModal]);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Redesigned Hero Section */}
      <section
        aria-labelledby="achievements-hero-title"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-brand-warm-white via-white to-brand-warm-white/50 border border-brand-soft-neutral/80 p-6 sm:p-10 lg:p-14 shadow-xs"
      >
        {/* Subtle decorative gold & indigo ambient accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-indigo/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl"
        />

        <div className="relative max-w-3xl space-y-4">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Main Title */}
          <h1
            id="achievements-hero-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight leading-tight"
          >
            <BrandText>{hero.title}</BrandText>
          </h1>

          {/* Intro Narrative */}
          <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed pt-1">
            <BrandText>{hero.intro}</BrandText>
          </p>
        </div>
      </section>

      {/* 2. Featured Achievements Editorial Gallery */}
      <div className="space-y-20 sm:space-y-28">
        {featuredAchievements.map((achievement, index) => {
          const isImageRight = achievement.layout === "imageRight";
          const isEV = achievement.id.includes("clavis");

          return (
            <article
              key={achievement.id}
              id={achievement.id}
              aria-labelledby={`${achievement.id}-heading`}
              className="scroll-mt-24"
            >
              <div
                className={`flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center ${
                  isImageRight ? "" : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                }`}
              >
                {/* Text Content Column (7 cols on desktop) */}
                <div className="w-full lg:col-span-7 space-y-6">
                  {/* Category Pill with tasteful Gold/Indigo Accent */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-warm-white text-brand-indigo border border-brand-soft-neutral shadow-2xs">
                      {isEV ? (
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                      ) : (
                        <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>{achievement.category}</span>
                    </span>

                    {achievement.dealerTag && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/70">
                        {achievement.dealerTag}
                      </span>
                    )}
                  </div>

                  {/* Heading */}
                  <h2
                    id={`${achievement.id}-heading`}
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight leading-snug"
                  >
                    <BrandText>{achievement.heading}</BrandText>
                  </h2>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-sm sm:text-base text-brand-ink/80 leading-relaxed">
                    {achievement.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>
                        <BrandText>{para}</BrandText>
                      </p>
                    ))}
                  </div>

                  {/* Highlight Statement Callout */}
                  <div className="relative overflow-hidden rounded-xl bg-amber-50/70 border-l-4 border-amber-500 p-4 sm:p-5 shadow-2xs">
                    <p className="text-sm sm:text-base font-semibold text-amber-950 italic">
                      &ldquo;{achievement.highlightStatement}&rdquo;
                    </p>
                  </div>

                  {/* Dealer Appreciation / Closing Line */}
                  {achievement.appreciationLine && (
                    <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/80 text-xs sm:text-sm text-brand-ink/85 leading-relaxed">
                      <p className="font-medium text-brand-ink">
                        <BrandText>{achievement.appreciationLine}</BrandText>
                      </p>
                    </div>
                  )}

                  {achievement.closingLine && (
                    <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/80 text-xs sm:text-sm text-brand-ink/85 leading-relaxed">
                      <p className="font-semibold text-brand-indigo">
                        <BrandText>{achievement.closingLine}</BrandText>
                      </p>
                    </div>
                  )}

                  {/* Optional CTA Link (e.g. View Our Fleet) */}
                  {achievement.ctaLabel && achievement.ctaHref && (
                    <div className="pt-2">
                      <Link
                        href={achievement.ctaHref}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-offset-2"
                      >
                        <span>{achievement.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Framed Image Column (5 cols on desktop) */}
                <div className="w-full lg:col-span-5">
                  <div className="group rounded-3xl bg-white p-3 sm:p-4 border border-brand-soft-neutral/90 shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Clickable Image Mat */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => openModal(achievement)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openModal(achievement);
                        }
                      }}
                      className="relative w-full overflow-hidden rounded-2xl bg-[#FCFBF7] border border-brand-neutral-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-offset-2"
                      style={{
                        aspectRatio: `${achievement.width} / ${achievement.height}`,
                      }}
                      aria-label={`Enlarge ${achievement.heading} poster`}
                    >
                      <Image
                        src={achievement.imageSrc}
                        alt={achievement.imageAlt}
                        fill
                        className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                        priority={index === 0}
                      />

                      {/* Hover Overlay Cue */}
                      <div className="absolute inset-0 bg-brand-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-brand-indigo text-xs font-bold shadow-md backdrop-blur-xs">
                          <Maximize2 className="w-3.5 h-3.5" />
                          Click to enlarge
                        </span>
                      </div>
                    </div>

                    {/* Action Button Below Image */}
                    <div className="pt-3">
                      <button
                        ref={(el) => {
                          triggerRefs.current[achievement.id] = el;
                        }}
                        type="button"
                        onClick={() => openModal(achievement)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-warm-white hover:bg-brand-indigo hover:text-white text-brand-indigo text-xs sm:text-sm font-bold border border-brand-soft-neutral/90 transition-all focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-offset-2 shadow-2xs"
                        aria-haspopup="dialog"
                        aria-expanded={activeItem?.id === achievement.id}
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span>View Full Poster</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 3. Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-modal-title"
          aria-describedby="lightbox-modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-brand-ink/85 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-neutral-200 flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-brand-soft-neutral bg-brand-warm-white">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20">
                  {activeItem.category.split("•")[0]?.trim()}
                </span>
                <h3
                  id="lightbox-modal-title"
                  className="text-xs sm:text-sm font-bold text-brand-ink truncate"
                >
                  <BrandText>{activeItem.heading}</BrandText>
                </h3>
              </div>

              {/* Action Buttons: Zoom & Close */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-brand-indigo hover:bg-brand-indigo/10 border border-brand-soft-neutral transition-colors"
                  aria-label={isZoomed ? "Reset zoom" : "Zoom in"}
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-4 h-4" />
                      <span>Fit</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-4 h-4" />
                      <span>Zoom</span>
                    </>
                  )}
                </button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="p-1.5 rounded-lg text-brand-ink/70 hover:text-brand-ink hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                  aria-label="Close poster preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hidden description for accessibility */}
            <p id="lightbox-modal-desc" className="sr-only">
              Full resolution view of {activeItem.heading}. Use zoom controls or arrow keys to inspect the uncropped event poster.
            </p>

            {/* Modal Body with Large Uncropped Poster */}
            <div className="relative p-2 sm:p-6 overflow-auto flex items-center justify-center bg-[#FCFBF7] max-h-[78vh]">
              <div
                className={`relative transition-all duration-300 shadow-md border border-brand-neutral-200 rounded-lg overflow-hidden bg-white ${
                  isZoomed ? "w-[1200px] max-w-none" : "w-full max-w-2xl max-h-[72vh]"
                }`}
                style={{
                  aspectRatio: `${activeItem.width} / ${activeItem.height}`,
                }}
              >
                <Image
                  src={activeItem.imageSrc}
                  alt={activeItem.imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 95vw, 1200px"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-brand-soft-neutral bg-brand-warm-white flex items-center justify-between text-xs text-brand-slate">
              <span className="hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 bg-white border border-brand-neutral-200 rounded text-[10px] font-mono">Esc</kbd> or click outside to dismiss
              </span>
              <span className="sm:hidden text-[11px]">
                Tap anywhere outside to close
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="text-brand-indigo font-bold hover:underline"
              >
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Elegant Closing Section */}
      <section
        aria-labelledby="achievements-closing-title"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-8 sm:p-12 text-center shadow-xs"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-3">
            <h2
              id="achievements-closing-title"
              className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight"
            >
              <BrandText>{closingSection.heading}</BrandText>
            </h2>

            <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
              <BrandText>{closingSection.description}</BrandText>
            </p>
          </div>

          {/* Official Tagline Treatment */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 sm:w-12 bg-amber-500/40" />
              <p className="text-lg sm:text-xl font-black text-brand-indigo tracking-tight font-serif italic">
                &ldquo;{closingSection.tagline}&rdquo;
              </p>
              <div className="h-px w-8 sm:w-12 bg-amber-500/40" />
            </div>
          </div>

          {/* Subtle CTA Link */}
          <div className="pt-4">
            <Link
              href={closingSection.ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs sm:text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-offset-2"
            >
              <span>{closingSection.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
