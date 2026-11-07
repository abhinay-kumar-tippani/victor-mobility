"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BrandText from "@/components/brand/BrandText";
import { Maximize2, X, Award, CheckCircle2, FileCheck } from "lucide-react";
import type { SampleCertificate, SampleMilestone } from "@/types/content";

interface AchievementsGalleryProps {
  title: string;
  subtitle: string;
  sampleCertificate: SampleCertificate;
  sampleMilestones: SampleMilestone[];
}

export default function AchievementsGallery({
  title,
  subtitle,
  sampleCertificate,
  sampleMilestones,
}: AchievementsGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Manage focus and keyboard escape listener for the modal
  useEffect(() => {
    if (isOpen) {
      // Focus close button when modal opens
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      // Lock body scroll while modal is active
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      // Return focus to trigger button when modal closes
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Page Title & Introductory Heading */}
      <div className="max-w-3xl">
        <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block mb-2 section-eyebrow">
          Editorial Gallery
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight mb-3">
          <BrandText>{title}</BrandText>
        </h1>
        <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
          <BrandText>{subtitle}</BrandText>
        </p>
      </div>

      {/* Featured Recognition Section: Desktop gives certificate ~2/3 width, mobile displays certificate first */}
      <section
        aria-labelledby="featured-recognition-title"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-5 sm:p-8 lg:p-10 shadow-sm"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Certificate Artwork: 2/3 width on desktop (8 of 12 columns), full width on mobile */}
          <div className="w-full lg:col-span-8 order-1">
            <div className="bg-white p-3 sm:p-5 rounded-2xl border border-brand-neutral-200 shadow-sm transition-all hover:shadow-md">
              <div className="relative aspect-[1200/850] w-full overflow-hidden rounded-xl bg-[#FCFBF7]">
                <Image
                  src={sampleCertificate.imageSrc}
                  alt={sampleCertificate.imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Beside Certificate: Meta Details, Labels, Caption & View Action (4 of 12 columns on desktop) */}
          <div className="w-full lg:col-span-4 order-2 flex flex-col justify-center space-y-5">
            <div className="space-y-3">
              {/* Featured Recognition Eyebrow */}
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo">
                <Award className="w-4 h-4 text-brand-indigo" />
                <BrandText>{sampleCertificate.eyebrow}</BrandText>
              </span>

              {/* Title with Sample Certificate Label Beside It */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    id="featured-recognition-title"
                    className="text-xl sm:text-2xl font-bold text-brand-ink leading-snug"
                  >
                    <BrandText>{sampleCertificate.title}</BrandText>
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                    <BrandText>{sampleCertificate.sampleLabel}</BrandText>
                  </span>
                </div>
              </div>

              {/* Short Caption */}
              <p className="text-sm text-brand-ink/75 leading-relaxed">
                <BrandText>{sampleCertificate.caption}</BrandText>
              </p>
            </div>

            {/* View Certificate Action */}
            <div className="pt-2">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs sm:text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-offset-2"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
              >
                <Maximize2 className="w-4 h-4" />
                <span>{sampleCertificate.actionLabel}</span>
              </button>
            </div>

            {/* Editorial Guidance Note */}
            <div className="pt-3 border-t border-brand-soft-neutral/60 text-xs text-brand-slate leading-relaxed">
              <p>
                This framed document serves as an editable sample recognition benchmark. Original proportions, lettering, signatures and seal remain uncropped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Modal / Lightbox for Enlarged Readable Version */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-ink/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-neutral-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-soft-neutral bg-brand-warm-white">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-brand-indigo" />
                <h3
                  id="certificate-modal-title"
                  className="text-sm sm:text-base font-bold text-brand-ink"
                >
                  <BrandText>{sampleCertificate.modalTitle}</BrandText>
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <BrandText>{sampleCertificate.sampleLabel}</BrandText>
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-brand-ink/70 hover:text-brand-ink hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                aria-label="Close certificate preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Large Uncropped Certificate */}
            <div className="p-4 sm:p-8 overflow-y-auto flex items-center justify-center bg-[#FCFBF7]">
              <div className="relative w-full aspect-[1200/850] max-h-[75vh] shadow-md border border-brand-neutral-200 rounded-lg overflow-hidden bg-white">
                <Image
                  src={sampleCertificate.imageSrc}
                  alt={sampleCertificate.imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 95vw, 1100px"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="px-5 py-3 border-t border-brand-soft-neutral bg-brand-warm-white flex items-center justify-between text-xs text-brand-slate">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-brand-neutral-200 rounded text-[10px] font-mono">Esc</kbd> or click outside to close</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-brand-indigo font-bold hover:underline"
              >
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Below the Feature: Two Compact Sample Entries */}
      <section aria-labelledby="sample-milestones-title" className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2
            id="sample-milestones-title"
            className="text-lg sm:text-xl font-bold text-brand-ink"
          >
            Operational Benchmarks &amp; Initiatives
          </h2>
          <span className="text-xs text-brand-slate font-medium">
            2 editable sample entries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleMilestones.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-brand-soft-neutral shadow-2xs hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20">
                    <BrandText>{item.label}</BrandText>
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-ink">
                  <BrandText>{item.title}</BrandText>
                </h3>
                <p className="text-sm text-brand-ink/75 leading-relaxed">
                  <BrandText>{item.description}</BrandText>
                </p>
              </div>

              <div className="pt-3 border-t border-brand-soft-neutral/60 text-xs text-brand-slate flex items-center justify-between">
                <span>Victor Operational Protocol</span>
                <span className="font-semibold text-brand-indigo">Pan-India Baseline</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
