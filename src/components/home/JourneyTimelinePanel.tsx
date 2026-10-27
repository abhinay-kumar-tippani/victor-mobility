"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Award, Building2, Car, CheckCircle2, GraduationCap, Globe, Leaf,
  MapPin, Rocket, ShieldCheck, Sparkles, TrendingUp,
} from "lucide-react";
import journeyData from "@/content/journey.json";

type Milestone = (typeof journeyData.milestones)[number];

const icons = {
  Sparkles, Award, Rocket, Car, TrendingUp, GraduationCap,
  ShieldCheck, MapPin, Globe, Leaf, CheckCircle2, Building2,
};

export default function JourneyTimelinePanel({ milestones }: { milestones: Milestone[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const firstYear = milestones[0]?.date.match(/\d{4}/)?.[0] || "2009";
  const lastYear = milestones[milestones.length - 1]?.date.match(/\d{4}/)?.[0] || firstYear;

  const updateFromScroll = useCallback(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    const maxScroll = viewport.scrollHeight - viewport.clientHeight;
    const nextProgress = maxScroll > 0 ? viewport.scrollTop / maxScroll : 1;
    const marker = viewport.getBoundingClientRect().top + Math.min(88, viewport.clientHeight * 0.22);
    let nextIndex = 0;
    viewport.querySelectorAll<HTMLElement>("[data-timeline-milestone]").forEach((item, index) => {
      if (item.getBoundingClientRect().top <= marker) nextIndex = index;
    });
    if (maxScroll > 0 && viewport.scrollTop >= maxScroll - 2) nextIndex = milestones.length - 1;

    setProgress(nextProgress);
    setActiveIndex(nextIndex);
  }, [milestones.length]);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;
    updateFromScroll();
    const observer = new ResizeObserver(updateFromScroll);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [updateFromScroll]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(145deg,#1D1B31_0%,#10101D_58%,#1B172B_100%)] shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7 sm:py-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-violet">A legacy in motion</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">Milestone timeline</h3>
        </div>
        <p className="shrink-0 font-semibold tabular-nums text-white/85" aria-label={`Milestone ${activeIndex + 1} of ${milestones.length}`}>
          <span className="text-xl text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="mx-1.5 text-white/35">/</span>
          <span className="text-sm">{String(milestones.length).padStart(2, "0")}</span>
        </p>
      </div>

      <div className="h-0.5 bg-white/10" aria-hidden="true">
        <div className="h-full bg-brand-violet" style={{ width: `${progress * 100}%` }} />
      </div>

      <div
        ref={scrollRef}
        onScroll={updateFromScroll}
        role="region"
        aria-label="Victor company milestones. Scroll to explore the timeline."
        tabIndex={0}
        className="max-h-[490px] overflow-y-auto px-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-violet sm:max-h-[540px] sm:px-6"
      >
        <div className="relative" lang="en" dir="ltr">
          <div className="pointer-events-none absolute bottom-7 left-[19px] top-7 w-px bg-white/15" aria-hidden="true">
            <div className="w-full bg-brand-violet" style={{ height: `${progress * 100}%` }} />
          </div>
          <ol className="space-y-3">{milestones.map((milestone, index) => {
            const Icon = icons[milestone.icon as keyof typeof icons] || Sparkles;
            const active = index === activeIndex;
            return (
              <li key={milestone.id} data-timeline-milestone aria-current={active ? "step" : undefined} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-3 sm:gap-4">
                <span className={`relative z-10 mt-4 grid h-10 w-10 place-items-center rounded-full border shadow-[0_0_0_5px_#161423] transition-colors motion-reduce:transition-none ${active ? "border-brand-violet bg-brand-violet text-white" : "border-white/20 bg-[#27243A] text-white/65"}`} aria-hidden="true">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
                <article className={`min-w-0 rounded-2xl border px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-300 motion-reduce:transition-none sm:px-5 sm:py-4 ${active ? "border-brand-violet/60 bg-white/[0.09] shadow-[0_8px_28px_rgba(0,0,0,0.16)]" : "border-white/10 bg-white/[0.035]"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className={`text-[11px] font-bold uppercase tracking-[0.12em] ${active ? "text-[#BCA9EA]" : "text-white/55"}`}>{milestone.date}</span>
                    <span className="text-[10px] font-semibold tabular-nums text-white/35">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="mt-1.5 text-sm font-bold leading-snug text-white sm:text-base">{milestone.title}</h4>
                  <p className={`mt-1.5 text-xs leading-relaxed sm:text-sm ${active ? "text-white/80" : "text-white/60"}`}>{milestone.description}</p>
                </article>
              </li>
            );
          })}</ol>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-[11px] font-medium text-white/50 sm:px-7">
        <span>Scroll within the timeline to follow Victor&apos;s journey</span>
        <span dir="ltr" className="shrink-0 tabular-nums">{firstYear} — {lastYear}</span>
      </div>
    </div>
  );
}
