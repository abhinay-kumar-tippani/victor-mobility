"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Printer,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FileText,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react";
import brochureData from "@/content/brochure.json";
import BrandLogo from "@/components/brand/BrandLogo";

interface ExecutivePresentationDeckProps {
  region: "india" | "uae";
}

export default function ExecutivePresentationDeck({
  region,
}: ExecutivePresentationDeckProps) {
  const data = region === "india" ? brochureData.india : brochureData.uae;
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"deck" | "document">("deck");

  const totalSlides = data.slides.length;
  const currentSlide = data.slides[currentSlideIndex];

  // Keyboard navigation for slide deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "deck") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, totalSlides]);

  const handlePrint = () => {
    window.print();
  };

  const waNumber = region === "india" ? "919396546950" : "971524552441";
  const waBrochureMessage = `*VICTOR MOBILITY · REQUEST OFFICIAL PDF COMPANY PROFILE*
Entity: ${data.companyName}
Tagline: On Time Every Time.

Hello Victor Team,
Please share your authorized 2024-2026 Executive Company Profile & Corporate Mobility Presentation Deck with our procurement desk.`;

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waBrochureMessage
  )}`;

  return (
    <div className="space-y-8">
      {/* Control Toolbar (Hidden in Print) */}
      <div className="print:hidden bg-white rounded-2xl border border-brand-soft-neutral p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setViewMode("deck")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              viewMode === "deck"
                ? "bg-brand-indigo text-white shadow-xs"
                : "bg-brand-soft-neutral/50 text-brand-indigo hover:bg-brand-soft-neutral"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Interactive Slide Deck</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("document")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              viewMode === "document"
                ? "bg-brand-indigo text-white shadow-xs"
                : "bg-brand-soft-neutral/50 text-brand-indigo hover:bg-brand-soft-neutral"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Full Document View</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Deck</span>
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Official PDF</span>
          </a>
        </div>
      </div>

      {/* VIEW MODE 1: Interactive Slide-by-Slide Deck */}
      {viewMode === "deck" && (
        <div className="space-y-6">
          {/* Main Slide Card */}
          <div className="bg-white rounded-3xl border-2 border-brand-indigo/10 shadow-xl overflow-hidden min-h-[560px] flex flex-col justify-between">
            {/* Slide Header */}
            <div className="bg-brand-indigo text-white p-6 sm:p-8 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="bg-white px-3 py-1.5 rounded-lg shadow-xs">
                  <BrandLogo className="w-28 sm:w-36 h-7 sm:h-9" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-blue-light block">
                    {data.companyName}
                  </span>
                  <span className="text-xs sm:text-sm text-brand-slate-light font-semibold">
                    Tagline: &ldquo;{data.tagline}&rdquo;
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-white">
                  Slide {currentSlideIndex + 1} of {totalSlides}
                </span>
              </div>
            </div>

            {/* Slide Body Content */}
            <div className="p-6 sm:p-10 lg:p-12 flex-1 flex flex-col justify-center">
              <div className="max-w-4xl mx-auto w-full space-y-6">
                <div>
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block mb-1">
                    {currentSlide.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-brand-indigo tracking-tight">
                    {currentSlide.title}
                  </h3>
                </div>

                {/* Narrative Text */}
                {currentSlide.content && (
                  <p className="text-base sm:text-lg text-brand-slate leading-relaxed">
                    {currentSlide.content}
                  </p>
                )}

                {/* Slide Metrics (Slide 1) */}
                {currentSlide.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    {currentSlide.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-brand-soft-neutral/30 rounded-2xl p-4 sm:p-5 border border-brand-soft-neutral/60 text-center"
                      >
                        <div className="text-2xl sm:text-3xl font-extrabold text-brand-indigo">
                          {m.value}
                        </div>
                        <div className="text-xs text-brand-slate font-medium mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Founder Quote (Slide 2) */}
                {currentSlide.quote && (
                  <div className="bg-brand-blue/5 rounded-2xl p-6 border-l-4 border-brand-blue space-y-2 my-4">
                    <p className="text-base sm:text-lg font-bold text-brand-indigo italic">
                      &ldquo;{currentSlide.quote}&rdquo;
                    </p>
                    <p className="text-xs text-brand-slate font-semibold uppercase tracking-wider">
                      — {currentSlide.founder}
                    </p>
                  </div>
                )}

                {/* Services Grid (Slide 3) */}
                {currentSlide.services && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {currentSlide.services.map((svc, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white rounded-xl p-4 border border-brand-soft-neutral shadow-xs space-y-1.5"
                      >
                        <h4 className="font-bold text-sm text-brand-indigo flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{svc.name}</span>
                        </h4>
                        <p className="text-xs text-brand-slate leading-relaxed">
                          {svc.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fleet Tiers (Slide 4) */}
                {currentSlide.tiers && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {currentSlide.tiers.map((tier, tIdx) => (
                      <div
                        key={tIdx}
                        className="bg-white rounded-xl p-4 border border-brand-soft-neutral shadow-xs space-y-1"
                      >
                        <span className="text-xs font-bold text-brand-blue block">
                          {tier.category}
                        </span>
                        <h5 className="font-extrabold text-sm text-brand-indigo">
                          {tier.models}
                        </h5>
                        <p className="text-xs text-brand-slate leading-relaxed">
                          {tier.spec}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Standards (Slide 5) */}
                {currentSlide.standards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {currentSlide.standards.map((std, stdIdx) => (
                      <div
                        key={stdIdx}
                        className="bg-brand-soft-neutral/30 rounded-xl p-4 border border-brand-soft-neutral/60 space-y-1"
                      >
                        <h5 className="font-bold text-sm text-brand-indigo flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{std.title}</span>
                        </h5>
                        <p className="text-xs text-brand-slate leading-relaxed">
                          {std.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Locations (Slide 6) */}
                {currentSlide.locations && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {currentSlide.locations.map((loc, lIdx) => (
                      <div
                        key={lIdx}
                        className="bg-white rounded-xl p-4 border border-brand-soft-neutral shadow-xs space-y-1"
                      >
                        <h5 className="font-bold text-sm text-brand-indigo flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{loc.city}</span>
                        </h5>
                        <p className="text-xs text-brand-slate font-mono line-clamp-1">
                          {loc.address}
                        </p>
                        <p className="text-xs text-brand-indigo font-medium">
                          Key Zones: {loc.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Commercials (Slide 7) */}
                {currentSlide.commercials && (
                  <div className="space-y-3 pt-2">
                    {currentSlide.commercials.map((comm, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-soft-neutral/30 border border-brand-soft-neutral/60 text-xs sm:text-sm text-brand-indigo font-semibold"
                      >
                        <Award className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>{comm}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact (Slide 8) */}
                {currentSlide.contact && (
                  <div className="bg-brand-soft-neutral/30 rounded-2xl p-6 sm:p-8 border border-brand-soft-neutral/60 text-center space-y-4">
                    <p className="text-sm sm:text-base text-brand-indigo font-semibold">
                      Ready to streamline employee transport rosters or reserve executive fleet allocations?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
                      <a
                        href={`tel:${currentSlide.contact.phone.replace(/\s+/g, "")}`}
                        className="px-5 py-3 rounded-xl bg-brand-indigo text-white hover:bg-brand-indigo-light transition-all"
                      >
                        Call: {currentSlide.contact.phone}
                      </a>
                      <Link
                        href={currentSlide.contact.rfpUrl}
                        className="px-5 py-3 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-dark transition-all"
                      >
                        Launch 4-Step RFP Desk
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Slide Navigation Footer */}
            <div className="bg-brand-soft-neutral/30 px-6 py-4 border-t border-brand-soft-neutral flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-brand-soft-neutral bg-white text-brand-indigo disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-soft-neutral/50"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Slide</span>
              </button>

              {/* Slide Number Indicators */}
              <div className="hidden sm:flex items-center gap-1.5">
                {data.slides.map((s, idx) => (
                  <button
                    key={s.slideNo}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      currentSlideIndex === idx
                        ? "bg-brand-indigo text-white shadow-xs"
                        : "bg-white text-brand-slate hover:bg-brand-soft-neutral"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1))
                }
                disabled={currentSlideIndex === totalSlides - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-brand-soft-neutral bg-brand-indigo text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-indigo-light"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2 & PRINT VIEW: Full Sequential Presentation Deck */}
      {(viewMode === "document" || true) && (
        <div className={viewMode === "document" ? "space-y-12" : "hidden print:block print:space-y-8"}>
          {data.slides.map((slide, sIndex) => (
            <div
              key={slide.slideNo}
              className="slide-card-print bg-white rounded-3xl border-2 border-brand-indigo/10 shadow-md p-6 sm:p-10 print:border-none print:shadow-none print:p-0 print:break-after-page mb-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-soft-neutral mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white px-2.5 py-1 rounded shadow-xs">
                    <BrandLogo className="w-24 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate block">
                      {data.companyName}
                    </span>
                    <span className="text-xs text-brand-indigo font-bold">
                      &ldquo;{data.tagline}&rdquo;
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-brand-soft-neutral text-brand-indigo">
                  Slide {sIndex + 1} of {totalSlides}
                </span>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                  {slide.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-indigo">
                  {slide.title}
                </h3>

                {slide.content && (
                  <p className="text-sm text-brand-slate leading-relaxed">
                    {slide.content}
                  </p>
                )}

                {slide.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {slide.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-soft-neutral/30 rounded-xl p-3 text-center border border-brand-soft-neutral/60"
                      >
                        <div className="text-xl font-extrabold text-brand-indigo">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-brand-slate font-medium mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {slide.quote && (
                  <div className="bg-brand-blue/5 rounded-xl p-4 border-l-4 border-brand-blue space-y-1">
                    <p className="text-sm font-bold text-brand-indigo italic">
                      &ldquo;{slide.quote}&rdquo;
                    </p>
                    <p className="text-[11px] text-brand-slate font-semibold">
                      — {slide.founder}
                    </p>
                  </div>
                )}

                {slide.services && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {slide.services.map((svc, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-brand-soft-neutral bg-brand-soft-neutral/20"
                      >
                        <h5 className="font-bold text-xs text-brand-indigo flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{svc.name}</span>
                        </h5>
                        <p className="text-xs text-brand-slate mt-0.5">{svc.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {slide.tiers && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {slide.tiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-brand-soft-neutral bg-white"
                      >
                        <span className="text-[10px] font-bold text-brand-blue block">
                          {tier.category}
                        </span>
                        <h6 className="font-bold text-xs text-brand-indigo">
                          {tier.models}
                        </h6>
                        <p className="text-xs text-brand-slate mt-0.5">{tier.spec}</p>
                      </div>
                    ))}
                  </div>
                )}

                {slide.standards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {slide.standards.map((std, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-brand-soft-neutral bg-brand-soft-neutral/20"
                      >
                        <h6 className="font-bold text-xs text-brand-indigo flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{std.title}</span>
                        </h6>
                        <p className="text-xs text-brand-slate mt-0.5">{std.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {slide.locations && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {slide.locations.map((loc, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-brand-soft-neutral bg-white"
                      >
                        <h6 className="font-bold text-xs text-brand-indigo flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{loc.city}</span>
                        </h6>
                        <p className="text-[11px] text-brand-slate font-mono line-clamp-1">
                          {loc.address}
                        </p>
                        <p className="text-xs text-brand-indigo font-medium mt-0.5">
                          Focus: {loc.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {slide.commercials && (
                  <ul className="space-y-2 pt-2">
                    {slide.commercials.map((comm, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-brand-indigo font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{comm}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {slide.contact && (
                  <div className="p-4 rounded-xl bg-brand-soft-neutral/30 border border-brand-soft-neutral text-xs text-brand-slate flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-brand-indigo block">
                        Direct Corporate Enquiries
                      </span>
                      <span>Telephone: {slide.contact.phone} · WhatsApp: {slide.contact.whatsapp}</span>
                    </div>
                    <Link
                      href={slide.contact.rfpUrl}
                      className="px-4 py-2 rounded-lg bg-brand-indigo text-white text-xs font-bold"
                    >
                      Open RFP Desk
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
