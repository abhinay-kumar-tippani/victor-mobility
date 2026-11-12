"use client";

import Image from "next/image";
import BrandText from "@/components/brand/BrandText";
import {
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Car,
  UserCheck,
  PhoneOff,
  AlertTriangle,
  FileText,
  Camera,
  Users,
  Sparkles,
  ClipboardCheck,
  Fuel,
  Compass,
  HeartHandshake,
} from "lucide-react";
import type { DriverTrainingContent } from "@/types/content";

interface DriverTrainingGuideProps {
  content: DriverTrainingContent;
}

export default function DriverTrainingGuide({ content }: DriverTrainingGuideProps) {
  const { title, page1, page2, page3, page4, page5, supportingClassroom } = content;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Page Title & Tagline */}
      <div className="max-w-3xl space-y-3">
        <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block section-eyebrow">
          Operational Standards
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight">
          <BrandText>{title}</BrandText>
        </h1>
        <p className="text-base sm:text-lg text-brand-indigo font-semibold font-serif italic">
          &ldquo;{content.tagline}&rdquo;
        </p>
      </div>

      {/* ========================================================
          PAGE 1: DAILY DRIVERS BRIEFING — IMPORTANT INSTRUCTIONS
          ======================================================== */}
      <section
        id="daily-drivers-briefing"
        aria-labelledby="page1-heading"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        {/* Header Block */}
        <div className="space-y-3 border-b border-brand-soft-neutral/80 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold uppercase tracking-wider">
              <ClipboardCheck className="w-3.5 h-3.5 text-brand-indigo" />
              <span>{page1.subheading}</span>
            </div>
            <span className="text-xs font-mono font-semibold text-brand-slate">
              VICTOR | 1
            </span>
          </div>

          <h2
            id="page1-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{page1.heading}</BrandText>
          </h2>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-soft-neutral/90 space-y-2">
            <p className="text-sm sm:text-base font-bold text-brand-ink">
              <BrandText>{page1.dearTeam}</BrandText>
            </p>
            <p className="text-sm sm:text-base text-brand-ink/90 leading-relaxed font-medium">
              <BrandText>{page1.instruction}</BrandText>
            </p>
          </div>
        </div>

        {/* 12 Briefing Points */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-brand-ink">
            <BrandText>{page1.pointsTitle}</BrandText>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {page1.points.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-brand-soft-neutral/90 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <span className="w-6 h-6 rounded-lg bg-brand-indigo/10 text-brand-indigo text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-brand-ink/90 font-medium leading-snug">
                  <BrandText>{point}</BrandText>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Reporting Callout Box */}
        <div className="rounded-2xl bg-brand-indigo/5 border border-brand-indigo/20 p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-brand-indigo shrink-0" />
            <h4 className="font-extrabold text-brand-indigo text-sm sm:text-base">
              <BrandText>{page1.mandatoryReporting.title}</BrandText>
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-brand-ink/85 leading-relaxed font-medium">
            <BrandText>{page1.mandatoryReporting.instruction}</BrandText>
          </p>
        </div>

        {/* Banner */}
        <div className="rounded-2xl bg-brand-indigo text-white p-4 sm:p-5 text-center shadow-xs">
          <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider">
            {page1.banner}
          </p>
        </div>
      </section>

      {/* ========================================================
          PAGE 2: DAILY BRIEFING – SHIFT START STANDARD
          ======================================================== */}
      <section
        id="shift-start-standard"
        aria-labelledby="page2-heading"
        className="rounded-3xl bg-white border border-brand-soft-neutral/90 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        <div className="space-y-3 border-b border-brand-soft-neutral/80 pb-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo">
              <Clock className="w-3.5 h-3.5" />
              <span>Shift Start Protocol</span>
            </span>
            <span className="text-xs font-mono font-semibold text-brand-slate">
              VICTOR | 2
            </span>
          </div>

          <h2
            id="page2-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{page2.heading}</BrandText>
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium">
            <BrandText>{page2.subheading}</BrandText>
          </p>
        </div>

        {/* Highlight Callout */}
        <div className="rounded-2xl bg-brand-warm-white border border-brand-soft-neutral p-5 sm:p-6 text-center">
          <p className="text-base sm:text-lg font-bold text-brand-ink leading-relaxed">
            &ldquo;<BrandText>{page2.callout}</BrandText>&rdquo;
          </p>
        </div>

        {/* Shift Start Standard Bullets */}
        <div className="rounded-2xl bg-brand-warm-white/60 border border-brand-soft-neutral/80 p-6 sm:p-8 space-y-4">
          <ul className="space-y-3.5 text-sm sm:text-base text-brand-ink/90 font-medium">
            {page2.standards.map((std, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed"><BrandText>{std}</BrandText></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========================================================
          PAGE 3: DRIVER SAFETY & PROFESSIONAL CONDUCT
          ======================================================== */}
      <section
        id="driver-safety-conduct"
        aria-labelledby="page3-heading"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        <div className="space-y-3 border-b border-brand-soft-neutral/80 pb-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safety &amp; Decorum</span>
            </span>
            <span className="text-xs font-mono font-semibold text-brand-slate">
              VICTOR | 3
            </span>
          </div>

          <h2
            id="page3-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{page3.heading}</BrandText>
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium">
            <BrandText>{page3.subheading}</BrandText>
          </p>
        </div>

        {/* 2 Equal Columns: SAFE DRIVING and SERVICE & REPORTING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Column 1: SAFE DRIVING */}
          <div className="rounded-2xl bg-white border border-brand-soft-neutral p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-brand-soft-neutral/70">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-extrabold text-brand-ink tracking-wide">
                <BrandText>{page3.safeDriving.title}</BrandText>
              </h3>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-brand-ink/90 font-medium">
              {page3.safeDriving.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-snug"><BrandText>{rule}</BrandText></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: SERVICE & REPORTING */}
          <div className="rounded-2xl bg-white border border-brand-soft-neutral p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-brand-soft-neutral/70">
              <HeartHandshake className="w-5 h-5 text-brand-indigo shrink-0" />
              <h3 className="text-base sm:text-lg font-extrabold text-brand-ink tracking-wide">
                <BrandText>{page3.serviceReporting.title}</BrandText>
              </h3>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-brand-ink/90 font-medium">
              {page3.serviceReporting.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                  <span className="leading-snug"><BrandText>{rule}</BrandText></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 4: DAILY DRIVERS BRIEFING – ON-SITE ACTIVITY (PHOTOGRAPHS)
          ======================================================== */}
      <section
        id="on-site-activity"
        aria-labelledby="page4-heading"
        className="rounded-3xl bg-white border border-brand-soft-neutral/90 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        <div className="space-y-3 border-b border-brand-soft-neutral/80 pb-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo">
              <Camera className="w-3.5 h-3.5" />
              <span>Operational Visuals</span>
            </span>
            <span className="text-xs font-mono font-semibold text-brand-slate">
              VICTOR | 4
            </span>
          </div>

          <h2
            id="page4-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{page4.heading}</BrandText>
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium">
            <BrandText>{page4.caption}</BrandText>
          </p>
        </div>

        {/* The 4 Distinct Briefing Photographs in a 2x2 Grid Matching Slide 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {page4.photos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-2xl bg-brand-warm-white p-3 sm:p-4 border border-brand-soft-neutral/90 shadow-2xs space-y-2.5 hover:shadow-xs transition-shadow"
            >
              <div
                className="relative w-full overflow-hidden rounded-xl bg-white shadow-2xs"
                style={{
                  aspectRatio: `${photo.width} / ${photo.height}`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
              </div>
              <p className="text-xs text-brand-slate leading-relaxed px-1">
                <BrandText>{photo.caption}</BrandText>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PAGE 5: MANDATORY REPORTING & COMPLIANCE
          ======================================================== */}
      <section
        id="mandatory-reporting-compliance"
        aria-labelledby="page5-heading"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        <div className="space-y-3 border-b border-brand-soft-neutral/80 pb-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliance Standard</span>
            </span>
            <span className="text-xs font-mono font-semibold text-brand-slate">
              VICTOR | 5
            </span>
          </div>

          <h2
            id="page5-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{page5.heading}</BrandText>
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-medium">
            <BrandText>{page5.subheading}</BrandText>
          </p>
        </div>

        {/* Supervisor Checklist Card */}
        <div className="rounded-2xl bg-white border border-brand-soft-neutral p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-brand-soft-neutral/70">
            <FileText className="w-5 h-5 text-brand-indigo shrink-0" />
            <h3 className="text-base sm:text-lg font-extrabold text-brand-ink uppercase tracking-wide">
              <BrandText>{page5.checklistTitle}</BrandText>
            </h3>
          </div>

          <ul className="space-y-3.5 text-sm sm:text-base text-brand-ink/90 font-medium">
            {page5.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed"><BrandText>{item}</BrandText></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Banner */}
        <div className="rounded-2xl bg-brand-ink text-white p-5 sm:p-6 text-center shadow-md">
          <p className="text-sm sm:text-base md:text-lg font-black uppercase tracking-wider">
            {page5.banner}
          </p>
        </div>

        {/* Closing Reminder Tagline */}
        <div className="pt-2 text-center">
          <p className="text-base sm:text-lg font-bold text-brand-indigo tracking-tight font-serif italic">
            &ldquo;{page5.closingReminder}&rdquo;
          </p>
        </div>
      </section>

      {/* ========================================================
          SUPPORTING CLASSROOM TRAINING (AFTER COMPLETE BRIEFING)
          ======================================================== */}
      <section
        id="supporting-classroom-training"
        aria-labelledby="classroom-heading"
        className="rounded-3xl bg-white border border-brand-soft-neutral/90 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        <div className="space-y-2 border-b border-brand-soft-neutral/80 pb-4">
          <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block">
            Supporting Development
          </span>
          <h2
            id="classroom-heading"
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-ink tracking-tight"
          >
            <BrandText>{supportingClassroom.title}</BrandText>
          </h2>
          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed font-normal">
            <BrandText>{supportingClassroom.intro}</BrandText>
          </p>
        </div>

        {/* Classroom Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {supportingClassroom.photos.map((photo, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-brand-warm-white p-3 sm:p-4 border border-brand-soft-neutral/90 shadow-2xs space-y-2"
            >
              <div
                className="relative w-full overflow-hidden rounded-xl bg-white"
                style={{
                  aspectRatio: `${photo.width} / ${photo.height}`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-contain sm:object-cover sm:object-center"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
              </div>
              <p className="text-xs text-brand-slate italic px-1">
                <BrandText>{photo.caption}</BrandText>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
