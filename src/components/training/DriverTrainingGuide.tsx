"use client";

import Image from "next/image";
import Link from "next/link";
import BrandText from "@/components/brand/BrandText";
import {
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Compass,
  AlertTriangle,
  ArrowRight,
  GraduationCap,
  Sparkles,
  PhoneOff,
  Flame,
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
  const { title, eyebrow, intro, heroPhoto, question1, question2, insideBriefing, question3, academyCta } = content;

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

          {/* Right Column: Group Briefing Photo (Image 1) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm">
              <div
                className="relative w-full overflow-hidden rounded-xl bg-brand-warm-white"
                style={{ aspectRatio: `${heroPhoto.width} / ${heroPhoto.height}` }}
              >
                <Image
                  src={heroPhoto.src}
                  alt={heroPhoto.alt}
                  fill
                  className="object-contain sm:object-cover sm:object-center"
                  sizes="(max-width: 1024px) 100vw, 550px"
                  priority
                />
              </div>
              <p className="pt-2.5 px-1 text-xs text-brand-slate text-center sm:text-left">
                Victor Mobility daily driver briefing session conducted by supervisors before shift deployment.
              </p>
            </div>
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
              <div>
                <h3 className="text-base sm:text-lg font-bold text-brand-ink">
                  <BrandText>{question1.driverChecklist.title}</BrandText>
                </h3>
                <span className="text-xs text-brand-slate font-medium">Personnel & Presentation</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-brand-ink/85">
              {question1.driverChecklist.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug"><BrandText>{item}</BrandText></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Health Checklist */}
          <div className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-brand-soft-neutral/70">
              <div className="w-10 h-10 rounded-xl bg-brand-warm-white border border-brand-indigo/15 flex items-center justify-center text-brand-indigo">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-brand-ink">
                  <BrandText>{question1.vehicleChecklist.title}</BrandText>
                </h3>
                <span className="text-xs text-brand-slate font-medium">Mechanical & Hygiene</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-brand-ink/85">
              {question1.vehicleChecklist.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
            <span>Roadway Execution</span>
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

        {/* Professional Expectations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {question2.standards.map((std, idx) => {
            const icons = [Clock, Compass, ShieldCheck];
            const Icon = icons[idx] || ShieldCheck;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-6 shadow-2xs space-y-3 flex flex-col justify-between hover:shadow-xs transition-shadow"
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

        {/* Explicit Safety Rules — Zero Tolerance Callout */}
        <div className="rounded-2xl bg-amber-50/70 border-l-4 border-amber-600 p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-wide">
              <BrandText>{question2.safetyRules.title}</BrandText>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {question2.safetyRules.rules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 font-medium"
              >
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span><BrandText>{rule}</BrandText></span>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Incident Reporting Box */}
        <div className="rounded-2xl bg-brand-warm-white border border-brand-soft-neutral/80 p-5 sm:p-6 text-xs sm:text-sm text-brand-ink/80 leading-relaxed flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-brand-ink text-sm sm:text-base">
              <BrandText>{question2.incidentReporting.title}</BrandText>
            </h4>
            <p className="text-brand-ink/75">
              <BrandText>{question2.incidentReporting.description}</BrandText>
            </p>
          </div>
        </div>
      </section>

      {/* 4. Inside a Driver Briefing Section with Image 2 */}
      <section
        id={insideBriefing.id}
        aria-labelledby="inside-briefing-heading"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-6 sm:p-8 lg:p-10 shadow-xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Photo Column (Image 2) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl bg-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm">
              <div
                className="relative w-full overflow-hidden rounded-xl bg-brand-warm-white"
                style={{
                  aspectRatio: `${insideBriefing.photo.width} / ${insideBriefing.photo.height}`,
                }}
              >
                <Image
                  src={insideBriefing.photo.src}
                  alt={insideBriefing.photo.alt}
                  fill
                  className="object-contain sm:object-cover sm:object-center"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
              </div>
              <p className="pt-2.5 px-1 text-xs text-brand-slate text-center sm:text-left italic">
                <BrandText>{insideBriefing.photo.caption}</BrandText>
              </p>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block">
              Operational Focus
            </span>
            <h2
              id="inside-briefing-heading"
              className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight"
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

      {/* 6. Academy CTA: Explore the Chauffeur Academy */}
      <section
        aria-labelledby="academy-cta-heading"
        className="rounded-3xl bg-brand-ink text-white p-8 sm:p-10 lg:p-12 shadow-md relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 uppercase text-brand-soft-neutral text-xs font-bold tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-brand-violet" />
            <span>Formal Verification &amp; Protocol</span>
          </div>

          <h2
            id="academy-cta-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            <BrandText>{academyCta.heading}</BrandText>
          </h2>

          <p className="text-sm sm:text-base text-brand-slate-light leading-relaxed">
            <BrandText>{academyCta.description}</BrandText>
          </p>

          <div className="pt-3">
            <Link
              href={academyCta.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs sm:text-sm font-bold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-ink"
            >
              <span>{academyCta.buttonLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
