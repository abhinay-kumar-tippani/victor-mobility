"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X, ZoomIn } from "lucide-react";
import journey from "@/content/journey.json";

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
      <figure className="mx-auto w-full max-w-[34rem]" lang="en" dir="ltr">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Open the full-size Journey of Victor image in a viewer on this page"
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-brand-indigo/15 bg-white text-left shadow-[0_22px_65px_rgba(21,22,47,0.09)] transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo"
        >
          <Image
            src={journey.imageSrc}
            alt="The Journey of Victor infographic: thirteen milestones from the idea in 2009 to advancing sustainable mobility in 2025."
            width={1254}
            height={1254}
            sizes="(max-width: 640px) 100vw, 544px"
            unoptimized
            className="block h-auto w-full transition duration-300 group-hover:scale-[1.01]"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm transition group-hover:bg-slate-950/90">
            <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Click to view</span>
          </span>
        </button>

        <figcaption className={`mt-2 flex flex-wrap items-center justify-between gap-1 px-1 text-xs ${dark ? "text-zinc-300" : "text-brand-ink/65"}`}>
          <span className={`font-semibold tabular-nums ${dark ? "text-white" : "text-brand-indigo"}`}>2009 — 2025</span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${dark ? "text-white hover:text-[#C5B5E5] focus-visible:outline-white" : "text-brand-indigo hover:text-brand-violet focus-visible:outline-brand-indigo"}`}
          >
            Open full-size image <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-full text-xs sm:hidden">Click the image to view in full size.</span>
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
            className="relative flex max-h-[92vh] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between border-b border-white/10 pb-2 px-2 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 sm:text-sm">
                The Journey of Victor (2009 — 2025)
              </span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close full-size image viewer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex max-h-[78vh] w-full items-center justify-center overflow-auto p-2">
              <Image
                src={journey.imageSrc}
                alt="The Journey of Victor infographic: thirteen milestones from the idea in 2009 to advancing sustainable mobility in 2025."
                width={1254}
                height={1254}
                unoptimized
                priority
                className="h-auto max-h-[74vh] w-auto max-w-full rounded-lg object-contain"
              />
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
