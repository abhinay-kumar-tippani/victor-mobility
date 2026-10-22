"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Maximize2, X, ArrowRight, ShieldCheck, Leaf, Globe } from "lucide-react";
import journeyData from "@/content/journey.json";
import { useLanguage } from "@/i18n/LanguageContext";

export default function VictorJourneySection() {
  const { eyebrow, title, subtitle, milestones } = journeyData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isUae = pathname?.startsWith("/uae");
  const aboutHref = isUae ? "/uae/about" : "/india/about";
  const { dict, locale } = useLanguage();

  const effectiveEyebrow = dict.journey?.eyebrow || eyebrow;
  const effectiveTitle = dict.journey?.title || title;
  const effectiveSubtitle = dict.journey?.subtitle || subtitle;

  // Close modal on ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  return (
    <section
      id="journey"
      tabIndex={-1}
      className="scroll-mt-24 py-14 sm:py-20 bg-[#0B0914] text-white border-b border-brand-soft-neutral focus:outline-none relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-violet/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-indigo/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split Layout: Editorial on Left, Authentic Graphic on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Narrative, Key Milestones Summary & Direct Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-violet block mb-2">
                {effectiveEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {effectiveTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                {effectiveSubtitle}
              </p>
            </div>

            {/* Structured Phase Highlights */}
            <div className="space-y-3 pt-2">
              {/* Phase 1 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-violet/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-brand-violet" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {locale === "ar" ? "التأسيس وتوسيع الأسطول" : "Foundation & Fleet Scale"}
                    </span>
                    <span className="text-[10px] font-semibold text-brand-violet bg-brand-violet/15 px-2 py-0.5 rounded-full" dir="ltr">2009 – 2018</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {locale === "ar"
                      ? "تأسيس الشركة والتوسع إلى أكثر من 1,500 مركبة تنفيذية وإدارة عقود كبرى المؤسسات."
                      : "Incorporated under Indian Companies Act 1956; expanded fleet capacity to over 1,500+ executive vehicles."}
                  </p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-violet/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-brand-indigo/30 border border-brand-indigo/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {locale === "ar" ? "السلامة والانضباط التشغيلي" : "Safety & Resilience"}
                    </span>
                    <span className="text-[10px] font-semibold text-brand-blue bg-brand-blue/15 px-2 py-0.5 rounded-full" dir="ltr">2020 – 2022</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {locale === "ar"
                      ? "تدريب السائقين والالتزام ببروتوكولات الأمان العالمية واستمرارية خدمات النقل المؤسسي."
                      : "WHO driver re-education through pandemic challenges and resumption of full-capacity corporate operations."}
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-violet/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {locale === "ar" ? "التوسع الإقليمي والدولي في الإمارات" : "Pan-India & International"}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full" dir="ltr">2023 – 2024</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {locale === "ar"
                      ? "توسع الشبكة، الالتزام بالاستدامة، وإطلاق العمليات الرسمية في دبي وأبوظبي والإمارات."
                      : "Metropolitan pan-India network reach, 15%–30% EV sustainability commitment, and full UAE international operations."}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Actions & Zoom Hint */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={aboutHref}
                className="inline-flex items-center gap-2 text-xs font-bold bg-brand-violet hover:bg-brand-violet/90 text-white px-5 py-3 rounded-xl transition-all shadow-md shadow-brand-violet/20"
              >
                <span>{locale === "ar" ? "قراءة قصة الشركة بالكامل" : "Read Full Company Story"}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-2"
              >
                <Maximize2 className="w-3.5 h-3.5 text-brand-violet" />
                <span>{locale === "ar" ? "تكبير خريطة المسار" : "Enlarge roadmap"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Master Artwork Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative w-full mx-auto group">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsModalOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }
                }}
                aria-label="View enlarged company journey roadmap"
                className="cursor-zoom-in relative rounded-3xl overflow-hidden shadow-2xl shadow-black/70 border border-white/10 hover:border-brand-violet/40 transition-all duration-300 bg-[#1A1A1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              >
                <Image
                  src="/images/journey/victor-journey-map-2x.png"
                  alt="The Journey of Victor - Company Milestones from Q4 2009 Ideation to Q2 2024 UAE Operations"
                  width={1504}
                  height={1270}
                  quality={100}
                  priority
                  className="w-full h-auto object-contain mx-auto select-none block transition-transform duration-300 group-hover:scale-[1.01]"
                />

                {/* Subtle Click-to-Enlarge Pill */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 shadow-md transition-all pointer-events-none">
                  <Maximize2 className="w-3.5 h-3.5 text-brand-violet" />
                  <span>Click to enlarge</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Accessible Structured Content for Screen Readers & SEO */}
        <div className="sr-only">
          <h3>Milestones from 2009 to 2024</h3>
          <ol>
            {milestones.map((m) => (
              <li key={m.id}>
                <strong>{m.quarter}</strong>: {m.description}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* High-Resolution Full-Screen Lightbox Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="The Journey of Victor Roadmap - Full Size"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1A1A1C] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl overflow-hidden p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  The Journey of Victor (2009 – 2024)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="relative max-h-[82vh] overflow-auto flex items-center justify-center">
              <Image
                src="/images/journey/victor-journey-map-2x.png"
                alt="The Journey of Victor - Company Milestones Roadmap Full Size"
                width={1504}
                height={1270}
                quality={100}
                className="w-full h-auto max-h-[80vh] object-contain mx-auto select-none rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
