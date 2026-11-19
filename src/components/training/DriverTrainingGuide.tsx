"use client";

import BrandText from "@/components/brand/BrandText";
import DriverTrainingSlideshow from "@/components/training/DriverTrainingSlideshow";
import {
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Compass,
  AlertTriangle,
  Sparkles,
  UserCheck,
  Car,
  FileText,
  Camera,
  Users,
} from "lucide-react";
import type { DriverTrainingContent } from "@/types/content";

interface DriverTrainingGuideProps {
  content: DriverTrainingContent;
}

export default function DriverTrainingGuide({ content }: DriverTrainingGuideProps) {
  const { title, eyebrow, intro, question1, question2, insideBriefing, question3 } = content;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero & Introduction Section with Group Briefing Photo (Image 1) */}
      <section
        aria-labelledby="driver-training-hero-title"
        className="rounded-3xl bg-gradient-to-b from-brand-warm-white via-white to-brand-warm-white/40 border border-brand-soft-neutral/80 p-6 sm:p-10 lg:p-12 shadow-xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Heading and Introduction */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{eyebrow}</span>
            </div>

            <h1
              id="driver-training-hero-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight leading-tight"
            >
              <BrandText>{title}</BrandText>
            </h1>

            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed font-normal pt-1">
              <BrandText>{intro}</BrandText>
            </p>

            <div className="pt-2 text-xs sm:text-sm text-brand-slate leading-relaxed border-t border-brand-soft-neutral/70">
              <p>
                Structured briefing sessions ensure operational alignment, strict safety adherence, and consistent executive hospitality across every corporate journey.
              </p>
            </div>
          </div>

          {/* Right Column: Top Slideshow (All 9 uploaded photographs) */}
          <div className="lg:col-span-6">
            <DriverTrainingSlideshow
              photos={content.slideshowPhotos}
              priority
              label="Victor Mobility daily driver briefing gallery"
            />
          </div>
        </div>
      </section>

      {/* 2. Question 1: What gets checked before departure? */}
      <section
        id={question1.id}
        aria-labelledby="question-1-heading"
        className="space-y-8 scroll-mt-24"
      >
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
            <span className="w-6 h-6 rounded-md bg-brand-indigo text-white flex items-center justify-center text-xs font-extrabold">
              1
            </span>
            <span>Pre-Shift Standard</span>
          </div>
          <h2
            id="question-1-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{question1.question}</BrandText>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
            <BrandText>{question1.intro}</BrandText>
          </p>
        </div>

        {/* Short Scannable Checklists (Driver & Vehicle) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Driver Readiness Checklist */}
          <div className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-brand-soft-neutral/70">
              <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-indigo/15 flex items-center justify-center text-brand-indigo">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-ink">
                <BrandText>{question1.driverChecklist.title}</BrandText>
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm text-brand-ink/90 font-medium">
              {question1.driverChecklist.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span className="leading-snug"><BrandText>{item}</BrandText></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Health & Cabin Checklist */}
          <div className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-brand-soft-neutral/70">
              <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-indigo/15 flex items-center justify-center text-brand-indigo">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-ink">
                <BrandText>{question1.vehicleChecklist.title}</BrandText>
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm text-brand-ink/90 font-medium">
              {question1.vehicleChecklist.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span className="leading-snug"><BrandText>{item}</BrandText></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Question 2: What is expected on the road? */}
      <section
        id={question2.id}
        aria-labelledby="question-2-heading"
        className="space-y-8 scroll-mt-24"
      >
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
            <span className="w-6 h-6 rounded-md bg-brand-indigo text-white flex items-center justify-center text-xs font-extrabold">
              2
            </span>
            <span>On-Road Protocol</span>
          </div>
          <h2
            id="question-2-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{question2.question}</BrandText>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
            <BrandText>{question2.intro}</BrandText>
          </p>
        </div>

        {/* Operational Standards Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {question2.standards.map((std, idx) => {
            const icons = [Clock, Compass, ShieldCheck];
            const Icon = icons[idx] || ShieldCheck;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-6 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-ink">
                    <BrandText>{std.title}</BrandText>
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                    <BrandText>{std.description}</BrandText>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Directives & Incident Reporting Sub-grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Explicit Safety Rules — Zero Tolerance (Column 1-7) */}
          <div className="lg:col-span-7 rounded-2xl bg-amber-500/5 border border-amber-500/20 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm sm:text-base">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <span><BrandText>{question2.safetyRules.title}</BrandText></span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-brand-ink/90 font-medium">
              {question2.safetyRules.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed"><BrandText>{rule}</BrandText></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Immediate Reporting Protocol (Column 8-12) */}
          <div className="lg:col-span-5 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral/90 p-6 sm:p-7 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-indigo font-bold text-sm sm:text-base">
                <Clock className="w-5 h-5 text-brand-indigo shrink-0" />
                <span><BrandText>{question2.incidentReporting.title}</BrandText></span>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/80 leading-relaxed font-normal">
                <BrandText>{question2.incidentReporting.description}</BrandText>
              </p>
            </div>
            <div className="pt-2 border-t border-brand-soft-neutral/70 text-[11px] text-brand-slate uppercase tracking-wider font-semibold">
              Mandatory 24/7 Operations Desk Link
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inside a Driver Briefing Section with Image 2 */}
      <section
        id={insideBriefing.id}
        aria-labelledby="inside-briefing-heading"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-6 sm:p-10 lg:p-12 shadow-xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Bottom Slideshow: Exactly the same collection of 9 photographs */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <DriverTrainingSlideshow
              photos={content.slideshowPhotos}
              label="Inside a driver briefing photograph gallery"
            />
          </div>

          {/* Contextual Narrative */}
          <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
            <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block">
              Operational Culture
            </span>
            <h2
              id="inside-briefing-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
            >
              <BrandText>{insideBriefing.title}</BrandText>
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed font-normal">
              <BrandText>{insideBriefing.description}</BrandText>
            </p>
            <div className="p-4 rounded-xl bg-white border border-brand-soft-neutral/70 text-xs text-brand-slate leading-relaxed">
              Supervisors facilitate two-way dialogue to address real-world route conditions, vehicle readiness feedback, and client preferences before departure.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Question 3: What does the supervisor record? */}
      <section
        id={question3.id}
        aria-labelledby="question-3-heading"
        className="space-y-8 scroll-mt-24"
      >
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
            <span className="w-6 h-6 rounded-md bg-brand-indigo text-white flex items-center justify-center text-xs font-extrabold">
              3
            </span>
            <span>Supervisory Oversight</span>
          </div>
          <h2
            id="question-3-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{question3.question}</BrandText>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
            <BrandText>{question3.intro}</BrandText>
          </p>
        </div>

        {/* 3 Supervisory Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {question3.responsibilities.map((resp, idx) => {
            const icons = [FileText, Camera, Users];
            const Icon = icons[idx] || FileText;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-6 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-ink">
                    <BrandText>{resp.title}</BrandText>
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                    <BrandText>{resp.description}</BrandText>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Staff Responsibility Callout (No public upload or WhatsApp button) */}
        <div className="rounded-2xl bg-brand-warm-white border border-brand-soft-neutral/80 p-4 sm:p-5 text-xs text-brand-slate leading-relaxed flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-brand-indigo shrink-0" />
          <p>
            <strong className="text-brand-ink font-semibold">Staff Protocol: </strong>
            <BrandText>{question3.staffNotice}</BrandText>
          </p>
        </div>
      </section>
    </div>
  );
}
