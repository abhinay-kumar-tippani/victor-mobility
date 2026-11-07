"use client";

import { useState } from "react";
import Link from "next/link";
import BrandText from "@/components/brand/BrandText";
import {
  ChevronDown,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Clock,
  Compass,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import type { DriverTrainingContent } from "@/types/content";

interface DriverTrainingGuideProps {
  content: DriverTrainingContent;
}

export default function DriverTrainingGuide({ content }: DriverTrainingGuideProps) {
  const [isResponseOpen, setIsResponseOpen] = useState(false);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header & Introductory Line */}
      <div className="max-w-3xl space-y-3">
        <span className="uppercase text-brand-indigo font-bold text-xs tracking-wider block section-eyebrow">
          Professional Chauffeur Standards
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight">
          <BrandText>{content.title}</BrandText>
        </h1>
        <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed font-normal">
          <BrandText>{content.intro}</BrandText>
        </p>
      </div>

      {/* Curriculum Moments: Numbered Vertical Sequence */}
      <section aria-labelledby="training-curriculum-heading" className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-soft-neutral/80 pb-4">
          <div className="flex items-center gap-2.5">
            <h2
              id="training-curriculum-heading"
              className="text-xl sm:text-2xl font-bold text-brand-ink"
            >
              Curriculum by Moments of the Day
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <BrandText>{content.curriculumSectionLabel}</BrandText>
            </span>
          </div>
          <span className="text-xs text-brand-slate font-medium">
            3-stage operational cycle
          </span>
        </div>

        {/* Vertical Sequence Cards */}
        <div className="space-y-6">
          {content.curriculumMoments.map((m, idx) => {
            const icons = [Clock, Compass, CheckCircle2];
            const IconComponent = icons[idx] || CheckCircle2;

            return (
              <div
                key={m.moment}
                className="relative rounded-2xl bg-white border border-brand-soft-neutral p-6 sm:p-8 shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Step Number Indicator */}
                  <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:justify-start">
                    <span className="w-12 h-12 rounded-xl bg-brand-warm-white border border-brand-indigo/15 text-brand-indigo font-extrabold text-lg flex items-center justify-center shrink-0 shadow-2xs">
                      0{m.moment}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-indigo/80 sm:text-[11px] sm:mt-1">
                      Moment
                    </span>
                  </div>

                  {/* Moment Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-brand-indigo" />
                      <h3 className="text-lg sm:text-xl font-bold text-brand-ink">
                        <BrandText>{m.title}</BrandText>
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-brand-ink/80 leading-relaxed">
                      <BrandText>{m.description}</BrandText>
                    </p>

                    {/* Practical Example Box */}
                    <div className="mt-3 p-4 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70 text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-brand-indigo text-xs uppercase tracking-wide shrink-0 mt-0.5">
                          Practical example:
                        </span>
                        <span><BrandText>{m.practicalExample}</BrandText></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Memorable Feature: "What would you do?" Scenario */}
      <section
        aria-labelledby="scenario-heading"
        className="rounded-3xl bg-brand-warm-white border border-brand-soft-neutral p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20">
              <HelpCircle className="w-3.5 h-3.5 text-brand-indigo" />
              <BrandText>{content.scenario.badge}</BrandText>
            </span>
          </div>
          <h2
            id="scenario-heading"
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-ink"
          >
            <BrandText>{content.scenario.title}</BrandText>
          </h2>
        </div>

        {/* The Dilemma Prompt */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-soft-neutral shadow-2xs space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-slate">
              Scenario Situation
            </span>
            <p className="text-base sm:text-lg font-semibold text-brand-ink leading-relaxed">
              &ldquo;<BrandText>{content.scenario.question}</BrandText>&rdquo;
            </p>
          </div>

          {/* Accessible Interactive Disclosure Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsResponseOpen(!isResponseOpen)}
              aria-expanded={isResponseOpen}
              aria-controls="scenario-response-panel"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs sm:text-sm font-bold shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-offset-2"
            >
              <span>{isResponseOpen ? "Hide suggested response" : content.scenario.disclosureLabel}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isResponseOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Suggested Response Panel */}
          {isResponseOpen && (
            <div
              id="scenario-response-panel"
              className="mt-4 p-4 sm:p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2 animate-fade-in"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Suggested Operational Protocol</span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                <BrandText>{content.scenario.suggestedResponse}</BrandText>
              </p>
              <p className="text-xs text-emerald-800/80 pt-1 leading-normal">
                <BrandText>{content.scenario.educationalNote}</BrandText>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Academy CTA: Explore the Chauffeur Academy */}
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
            <BrandText>{content.academyCta.heading}</BrandText>
          </h2>

          <p className="text-sm sm:text-base text-brand-slate-light leading-relaxed">
            <BrandText>{content.academyCta.description}</BrandText>
          </p>

          <div className="pt-3">
            <Link
              href={content.academyCta.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs sm:text-sm font-bold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-ink"
            >
              <span>{content.academyCta.buttonLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
