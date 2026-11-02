"use client";

import BrandText from "@/components/brand/BrandText";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import journey from "@/content/journey.json";
import styles from "./JourneyArtwork.module.css";

function JourneyImage({ expanded = false }: { expanded?: boolean }) {
  return (
    <span
      className={
        `${styles.imageViewport} ${expanded ? "max-w-4xl shrink-0" : ""}`
      }
    >
      <Image
        src={journey.imageSrc}
        alt="The Journey of Victor infographic: milestones from 2009 ideation to 2026 fleet expansion and 2027 vision."
        width={1024}
        height={768}
        sizes={expanded ? "(max-width: 1024px) 94vw, 960px" : "(max-width: 1023px) 94vw, 700px"}
        unoptimized
        priority={expanded}
        className={styles.image}
      />
    </span>
  );
}

export default function JourneyArtwork({ dark = false }: { dark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  return (
    <>
      <figure className="mx-auto w-full max-w-[44rem]" lang="en" dir="ltr">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Open the full-size Journey of Victor image in a viewer on this page"
          className={`relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-brand-ink p-2 text-left transition-colors hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? "focus-visible:outline-white" : "focus-visible:outline-brand-indigo"}`}
        >
          <JourneyImage />
        </button>

        <figcaption className={`mt-2 flex flex-wrap items-center justify-between gap-1 text-xs ${dark ? "text-zinc-300" : "text-brand-ink/65"}`}>
          <span className={`font-semibold tabular-nums ${dark ? "text-zinc-300" : "text-brand-indigo"}`}>2009 — 2027</span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${dark ? "text-white hover:text-[#C5B5E5] focus-visible:outline-white" : "text-brand-indigo hover:text-brand-violet focus-visible:outline-brand-indigo"}`}
          >
            Open full-size image <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </figcaption>
      </figure>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="The Journey of Victor full-size image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[94vh] max-w-5xl w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-brand-ink p-2 shadow-2xl sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between border-b border-white/10 pb-2 px-2 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 sm:text-sm"><BrandText>
                The Journey of Victor (2009 — 2027)
              </BrandText></span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close full-size image viewer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex max-h-[80vh] w-full items-center justify-center overflow-auto p-2">
              <JourneyImage expanded />
            </div>

            <div className="flex w-full items-center justify-between border-t border-white/10 pt-2 px-2 text-xs text-zinc-400">
              <span>On Time Every Time.</span>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
