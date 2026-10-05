"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Clock,
  Compass,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Award,
  Lock,
  ArrowRight,
  UserCheck,
  Car,
} from "lucide-react";
import academyData from "@/content/academy.json";

interface ChauffeurAcademyProps {
  region: "india" | "uae";
}

export default function ChauffeurAcademy({ region }: ChauffeurAcademyProps) {
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeChecklistCategory, setActiveChecklistCategory] = useState<number>(0);

  const activeModule = academyData.curriculumModules[activeModuleIndex];
  const activeChecklist = academyData.auditChecklist[activeChecklistCategory];

  return (
    <div className="space-y-16 lg:space-y-20">
      {/* Academy Overview & Trust Metrics */}
      <div className="bg-brand-indigo rounded-3xl p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-xs font-semibold text-brand-blue-light mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>The Victor Chauffeur Protocol Academy · Standards of Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            How Victor Engineers Trust Behind the Wheel
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-slate-light leading-relaxed">
            {academyData.overview}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-brand-blue-light">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Background & Police Verified
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              Bound by Executive Non-Disclosure
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              15-Minute Early Curbside Positioning
            </span>
          </div>
        </div>

        {/* 4 Trust Metrics */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {academyData.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-brand-slate-light font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Module Tabs */}
      <div>
        <div className="max-w-2xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-blue block mb-2">
            Professional Standards
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo">
            The 5-Pillar Chauffeur Curriculum
          </h3>
          <p className="text-sm sm:text-base text-brand-slate mt-2">
            Every candidate must complete rigorous theoretical and behind-the-wheel testing before assignment to client rosters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Module Nav Pills (4 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {academyData.curriculumModules.map((module, idx) => {
              const isActive = activeModuleIndex === idx;
              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all border flex items-start gap-4 ${
                    isActive
                      ? "bg-brand-indigo text-white border-brand-indigo shadow-md"
                      : "bg-white text-brand-indigo border-brand-soft-neutral hover:border-brand-slate-light"
                  }`}
                >
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-md ${
                      isActive ? "bg-brand-blue text-white" : "bg-brand-soft-neutral text-brand-slate"
                    }`}
                  >
                    {module.number}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm leading-snug">{module.title}</h4>
                    <p
                      className={`text-xs mt-1 line-clamp-1 ${
                        isActive ? "text-brand-slate-light" : "text-brand-slate"
                      }`}
                    >
                      {module.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Module Details (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-brand-soft-neutral p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-soft-neutral">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                  Curriculum Module {activeModule.number}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-soft-neutral text-brand-indigo">
                  Mandatory Recertification
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-brand-indigo mt-4">
                {activeModule.title}
              </h4>
              <p className="text-sm font-semibold text-brand-blue mt-1 italic">
                &ldquo;{activeModule.tagline}&rdquo;
              </p>
              <p className="text-sm text-brand-slate mt-3 leading-relaxed">
                {activeModule.description}
              </p>

              <div className="mt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo block mb-3">
                  Key Operational Competencies Evaluated:
                </span>
                <div className="space-y-2.5">
                  {activeModule.keyPractices.map((practice, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-brand-indigo font-medium">
                        {practice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-soft-neutral flex items-center justify-between">
              <span className="text-xs text-brand-slate">
                Grounded in the Victor Standard: <strong className="text-brand-indigo">On Time Every Time.</strong>
              </span>
              <Link
                href={`/${region}/rfp`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors"
              >
                <span>Audit RFP Protocols</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 24-Point Pre-Dispatch Audit Checklist */}
      <div className="bg-brand-soft-neutral/40 rounded-3xl p-6 sm:p-10 border border-brand-soft-neutral">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brand-blue block mb-2">
              Vehicle Quality Assurance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo">
              The 24-Point Pre-Dispatch Audit Checklist
            </h3>
            <p className="text-sm text-brand-slate mt-1 max-w-2xl">
              Every Victor vehicle must pass this physical inspection before leaving the dispatch depot for executive or employee transfer assignments.
            </p>
          </div>

          {/* Checklist Categories */}
          <div className="flex flex-wrap gap-2">
            {academyData.auditChecklist.map((cat, catIdx) => (
              <button
                key={catIdx}
                type="button"
                onClick={() => setActiveChecklistCategory(catIdx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeChecklistCategory === catIdx
                    ? "bg-brand-indigo text-white shadow-sm"
                    : "bg-white text-brand-indigo border border-brand-soft-neutral hover:border-brand-slate-light"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeChecklist.items.map((item, itemIdx) => (
            <div
              key={itemIdx}
              className="bg-white rounded-xl p-4 border border-brand-soft-neutral shadow-xs flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-brand-indigo leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chauffeur Verification Badge Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-brand-soft-neutral p-6 sm:p-10 shadow-sm">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-blue block">
            Digital Credential Verification
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-indigo">
            Transparent Chauffeur Verification for Corporate Clients
          </h3>
          <p className="text-sm text-brand-slate leading-relaxed">
            Enterprise facilities teams and corporate travel admins can inspect the verified digital credentials of their assigned chauffeurs at any time. Every driver card confirms verified police clearance, active commercial license, defensive driving rank, and fleet coordination unit.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${region}/estimator`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white font-bold text-xs transition-colors"
            >
              <Car className="w-4 h-4" />
              <span>Calculate Corridor Fares</span>
            </Link>
            <Link
              href={`/${region}/rfp`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-soft-neutral hover:bg-brand-soft-neutral/80 text-brand-indigo font-bold text-xs transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-brand-blue" />
              <span>Review Compliance in RFP</span>
            </Link>
          </div>
        </div>

        {/* Digital Chauffeur Badge Visual */}
        <div className="lg:col-span-5 bg-gradient-to-br from-brand-indigo to-[#060B1A] text-white rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Verified Chauffeur ID
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-brand-slate-light">
              {region === "india" ? "VCH-IND-0428" : "VCH-UAE-0812"}
            </span>
          </div>

          <div className="my-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-blue/20 border-2 border-brand-blue flex items-center justify-center text-white shrink-0">
              <UserCheck className="w-7 h-7 text-brand-blue-light" />
            </div>
            <div>
              <h5 className="font-bold text-base text-white">
                {region === "india" ? "Vikram S. / Senior Executive Chauffeur" : "Rashid M. / First Class Chauffeur"}
              </h5>
              <p className="text-xs text-brand-slate-light">
                {region === "india" ? "Hyderabad & Bengaluru Corridor Desk" : "Dubai Al Garhoud Head Office Desk"}
              </p>
              <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-300">
                ✓ 100% Police Verified &amp; BGV Cleared
              </span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3.5 space-y-2 text-xs border border-white/5">
            <div className="flex justify-between">
              <span className="text-brand-slate-light">Defensive Driving Grade:</span>
              <span className="font-bold text-white">Master Protocol (Level 3)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-slate-light">Cabin Inspection Record:</span>
              <span className="font-bold text-emerald-400">24/24 Points Cleared</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-slate-light">Punctuality Score:</span>
              <span className="font-bold text-white">99.4% On-Time Index</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-slate-light">Passenger Discretion NDA:</span>
              <span className="font-bold text-emerald-400">Signed &amp; Active</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-center text-brand-slate-light/70">
            Backed by Victor Mobility · Tagline: &ldquo;On Time Every Time.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}
