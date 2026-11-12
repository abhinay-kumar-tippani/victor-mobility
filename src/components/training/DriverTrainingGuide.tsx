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
  const { title, eyebrow, intro, dailyBriefing, classroomTraining, academyCta } = content;
  const { beforeDeparture, onTheRoad, supervisorFollowUp } = dailyBriefing;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block section-eyebrow">
          {eyebrow}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight">
          <BrandText>{title}</BrandText>
        </h1>
        <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed font-normal">
          <BrandText>{intro}</BrandText>
        </p>
      </div>

      {/* ========================================================
          DAILY DRIVER BRIEFING SECTION
          ======================================================== */}
      <section
        id="daily-driver-briefing"
        aria-labelledby="daily-briefing-heading"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral/80 p-6 sm:p-10 lg:p-12 shadow-xs space-y-12 sm:space-y-16"
      >
        {/* Briefing Intro Header & Lead Photo (Image 40 from PDF Page 4) */}
        {/* On mobile: Introduction text first, followed by lead photo, then briefing points */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Mobile Order 1 / Desktop Column: Intro Text */}
          <div className="order-1 lg:order-1 lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{dailyBriefing.eyebrow}</span>
            </div>

            <h2
              id="daily-briefing-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight"
            >
              <BrandText>{dailyBriefing.title}</BrandText>
            </h2>

            <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
              <BrandText>{dailyBriefing.intro}</BrandText>
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{dailyBriefing.mandatoryNotice}</span>
              </span>
            </div>
          </div>

          {/* Mobile Order 2 / Desktop Column: Lead Group Photo (Image 40) */}
          <div className="order-2 lg:order-2 lg:col-span-6 w-full">
            <div className="rounded-2xl bg-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm">
              <div
                className="relative w-full overflow-hidden rounded-xl bg-brand-warm-white"
                style={{
                  aspectRatio: `${dailyBriefing.leadPhoto.width} / ${dailyBriefing.leadPhoto.height}`,
                }}
              >
                <Image
                  src={dailyBriefing.leadPhoto.src}
                  alt={dailyBriefing.leadPhoto.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 550px"
                  priority
                />
              </div>
              <p className="pt-2 px-1 text-xs text-brand-slate text-center sm:text-left italic">
                <BrandText>{dailyBriefing.leadPhoto.caption}</BrandText>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-brand-soft-neutral/70" />

        {/* ========================================================
            1. BEFORE DEPARTURE (With Image 41 from PDF Page 4)
            ======================================================== */}
        <div id="before-departure" className="space-y-8 scroll-mt-24">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
              <span className="w-6 h-6 rounded-md bg-brand-indigo text-white flex items-center justify-center text-xs font-extrabold">
                1
              </span>
              <span>Pre-Shift Verification</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-ink tracking-tight">
              <BrandText>{beforeDeparture.title}</BrandText>
            </h3>
            <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
              <BrandText>{beforeDeparture.intro}</BrandText>
            </p>
          </div>

          {/* Photo & Checklists Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Photo Column (Image 41) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm">
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-brand-warm-white"
                  style={{
                    aspectRatio: `${beforeDeparture.photo.width} / ${beforeDeparture.photo.height}`,
                  }}
                >
                  <Image
                    src={beforeDeparture.photo.src}
                    alt={beforeDeparture.photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />
                </div>
                <p className="pt-2 px-1 text-xs text-brand-slate text-center sm:text-left italic">
                  <BrandText>{beforeDeparture.photo.caption}</BrandText>
                </p>
              </div>
            </div>

            {/* Checklists Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Driver Readiness Checklist */}
              <div className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-brand-soft-neutral/70">
                  <UserCheck className="w-5 h-5 text-brand-indigo shrink-0" />
                  <h4 className="font-bold text-brand-ink text-sm sm:text-base">
                    <BrandText>{beforeDeparture.driverReadiness.title}</BrandText>
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-brand-ink/85">
                  {beforeDeparture.driverReadiness.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug"><BrandText>{item}</BrandText></span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vehicle Health Checklist */}
              <div className="rounded-2xl bg-white border border-brand-soft-neutral/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-brand-soft-neutral/70">
                  <Car className="w-5 h-5 text-brand-indigo shrink-0" />
                  <h4 className="font-bold text-brand-ink text-sm sm:text-base">
                    <BrandText>{beforeDeparture.vehicleChecks.title}</BrandText>
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-brand-ink/85">
                  {beforeDeparture.vehicleChecks.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug"><BrandText>{item}</BrandText></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-brand-soft-neutral/70" />

        {/* ========================================================
            2. ON THE ROAD (With Image 43 from PDF Page 4)
            ======================================================== */}
        <div id="on-the-road" className="space-y-8 scroll-mt-24">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
              <span className="w-6 h-6 rounded-md bg-brand-indigo text-white flex items-center justify-center text-xs font-extrabold">
                2
              </span>
              <span>Roadway Discipline</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-ink tracking-tight">
              <BrandText>{onTheRoad.title}</BrandText>
            </h3>
            <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
              <BrandText>{onTheRoad.intro}</BrandText>
            </p>
          </div>

          {/* Photo & Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Photo Column (Image 43) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm">
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-brand-warm-white"
                  style={{
                    aspectRatio: `${onTheRoad.photo.width} / ${onTheRoad.photo.height}`,
                  }}
                >
                  <Image
                    src={onTheRoad.photo.src}
                    alt={onTheRoad.photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />
                </div>
                <p className="pt-2 px-1 text-xs text-brand-slate text-center sm:text-left italic">
                  <BrandText>{onTheRoad.photo.caption}</BrandText>
                </p>
              </div>
            </div>

            {/* Standards & Incident Protocol */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {onTheRoad.conductStandards.map((std, idx) => {
                  const icons = [Clock, Compass, ShieldCheck];
                  const Icon = icons[idx] || ShieldCheck;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-brand-soft-neutral/90 shadow-2xs space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <Icon className="w-5 h-5 text-brand-indigo" />
                        <h4 className="font-bold text-brand-ink text-xs sm:text-sm">
                          <BrandText>{std.title}</BrandText>
                        </h4>
                        <p className="text-[11px] sm:text-xs text-brand-ink/75 leading-relaxed">
                          <BrandText>{std.description}</BrandText>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Immediate Incident Reporting Protocol Box */}
              <div className="p-4 rounded-xl bg-white border border-brand-soft-neutral/80 text-xs sm:text-sm text-brand-ink/80 leading-relaxed flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-ink text-xs sm:text-sm">
                    <BrandText>{onTheRoad.incidentReporting.title}</BrandText>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-brand-ink/75">
                    <BrandText>{onTheRoad.incidentReporting.description}</BrandText>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Explicit Safety Rules — Zero Tolerance Callout */}
          <div className="rounded-2xl bg-amber-50/70 border-l-4 border-amber-600 p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-amber-900">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
              <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wide">
                <BrandText>{onTheRoad.explicitSafetyRules.title}</BrandText>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {onTheRoad.explicitSafetyRules.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/90 border border-amber-200/80 text-xs sm:text-sm text-amber-950 font-medium"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><BrandText>{rule}</BrandText></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-brand-soft-neutral/70" />

        {/* ========================================================
            3. SUPERVISOR FOLLOW-UP (With Image 42 from PDF Page 4)
            ======================================================== */}
        <div id="supervisor-follow-up" className="space-y-8 scroll-mt-24">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
              <span className="w-6 h-6 rounded-md bg-brand-indigo text-white flex items-center justify-center text-xs font-extrabold">
                3
              </span>
              <span>Supervisory Oversight</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-ink tracking-tight">
              <BrandText>{supervisorFollowUp.title}</BrandText>
            </h3>
            <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
              <BrandText>{supervisorFollowUp.intro}</BrandText>
            </p>
          </div>

          {/* Photo & Responsibilities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Photo Column (Image 42) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm">
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-brand-warm-white"
                  style={{
                    aspectRatio: `${supervisorFollowUp.photo.width} / ${supervisorFollowUp.photo.height}`,
                  }}
                >
                  <Image
                    src={supervisorFollowUp.photo.src}
                    alt={supervisorFollowUp.photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />
                </div>
                <p className="pt-2 px-1 text-xs text-brand-slate text-center sm:text-left italic">
                  <BrandText>{supervisorFollowUp.photo.caption}</BrandText>
                </p>
              </div>
            </div>

            {/* 3 Responsibilities Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {supervisorFollowUp.responsibilities.map((resp, idx) => {
                  const icons = [FileText, Camera, Users];
                  const Icon = icons[idx] || FileText;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-brand-soft-neutral/90 shadow-2xs space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <Icon className="w-5 h-5 text-brand-indigo" />
                        <h4 className="font-bold text-brand-ink text-xs sm:text-sm">
                          <BrandText>{resp.title}</BrandText>
                        </h4>
                        <p className="text-[11px] sm:text-xs text-brand-ink/75 leading-relaxed">
                          <BrandText>{resp.description}</BrandText>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Staff Protocol Callout (No public upload or WhatsApp button) */}
              <div className="p-4 rounded-xl bg-white border border-brand-soft-neutral/80 text-xs text-brand-slate leading-relaxed flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-indigo shrink-0" />
                <p>
                  <strong className="text-brand-ink font-semibold">Staff Protocol: </strong>
                  <BrandText>{supervisorFollowUp.staffProtocolNotice}</BrandText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CLASSROOM CHAUFFEUR TRAINING SECTION
          (Preserving the existing classroom training photo)
          ======================================================== */}
      <section
        id="classroom-training"
        aria-labelledby="classroom-training-heading"
        className="rounded-3xl bg-white border border-brand-soft-neutral/90 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Photo Column: Existing Classroom Photo (Image 2) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl bg-brand-warm-white p-2.5 sm:p-3 border border-brand-soft-neutral/90 shadow-sm">
              <div
                className="relative w-full overflow-hidden rounded-xl bg-white"
                style={{
                  aspectRatio: `${classroomTraining.photo.width} / ${classroomTraining.photo.height}`,
                }}
              >
                <Image
                  src={classroomTraining.photo.src}
                  alt={classroomTraining.photo.alt}
                  fill
                  className="object-contain sm:object-cover sm:object-center"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
              </div>
              <p className="pt-2 px-1 text-xs text-brand-slate text-center sm:text-left italic">
                <BrandText>{classroomTraining.photo.caption}</BrandText>
              </p>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block">
              {classroomTraining.eyebrow}
            </span>
            <h2
              id="classroom-training-heading"
              className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight"
            >
              <BrandText>{classroomTraining.title}</BrandText>
            </h2>
            <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed font-normal">
              <BrandText>{classroomTraining.intro}</BrandText>
            </p>

            {/* Key Curriculum Points */}
            <div className="space-y-3 pt-2">
              {classroomTraining.keyPoints.map((pt, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70 space-y-1">
                  <h4 className="font-bold text-brand-ink text-xs sm:text-sm">
                    <BrandText>{pt.title}</BrandText>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-brand-ink/75 leading-relaxed">
                    <BrandText>{pt.description}</BrandText>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ACADEMY CTA: Explore the Chauffeur Academy
          ======================================================== */}
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
