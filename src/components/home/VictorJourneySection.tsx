"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowRight, ShieldCheck, Leaf, Globe } from "lucide-react";
import journeyData from "@/content/journey.json";
import { useLanguage } from "@/i18n/LanguageContext";
import JourneyTimelinePanel from "./JourneyTimelinePanel";

export default function VictorJourneySection() {
  const { eyebrow, title, subtitle, milestones } = journeyData;
  const pathname = usePathname();
  const isUae = pathname?.startsWith("/uae");
  const aboutHref = isUae ? "/uae/about" : "/india/about";
  const { dict, locale } = useLanguage();

  const effectiveEyebrow = dict.journey?.eyebrow || eyebrow;
  const effectiveTitle = dict.journey?.title || title;
  const effectiveSubtitle = dict.journey?.subtitle || subtitle;

  return (
    <section
      id="journey"
      tabIndex={-1}
      className="scroll-mt-24 py-14 sm:py-20 bg-[#0B0914] text-white border-b border-brand-soft-neutral focus:outline-none relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 h-[500px] w-full max-w-[500px] rounded-full bg-brand-violet/12 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-full max-w-[400px] rounded-full bg-brand-indigo/10 blur-[120px] pointer-events-none" />

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
              <span className="inline-flex items-center gap-1.5 py-2 text-xs font-semibold text-zinc-400">
                <ArrowDown className="h-3.5 w-3.5 text-brand-violet" aria-hidden="true" />
                {locale === "ar" ? "مرّر لاستكشاف المحطات" : "Scroll to explore the milestones"}
              </span>
            </div>
          </div>

          {/* Right Column: scrollable milestone timeline */}
          <div className="min-w-0 lg:col-span-7">
            <JourneyTimelinePanel milestones={milestones} />
          </div>

        </div>

      </div>

    </section>
  );
}
