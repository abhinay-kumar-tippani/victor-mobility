"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export interface StatItemData {
  id: string;
  targetValue: number;
  suffix?: string;
  formatCommas?: boolean;
  colorHex: string;
  colorClass: string;
  durationMs?: number;
  labelLines: string[];
}

const DEFAULT_STATS: StatItemData[] = [
  {
    id: "established",
    targetValue: 2010,
    suffix: "",
    formatCommas: false,
    colorHex: "#31326F", // Victor Brand Indigo
    colorClass: "text-brand-indigo",
    durationMs: 2000,
    labelLines: ["Established in", "Hyderabad"],
  },
  {
    id: "experience",
    targetValue: 15,
    suffix: "+",
    formatCommas: false,
    colorHex: "#6E57A0", // Victor Brand Violet
    colorClass: "text-brand-violet",
    durationMs: 1600,
    labelLines: ["Years of industry", "leadership"],
  },
  {
    id: "fleet",
    targetValue: 1500,
    suffix: "+",
    formatCommas: true,
    colorHex: "#2D5090", // Victor Brand Blue
    colorClass: "text-brand-blue",
    durationMs: 2000,
    labelLines: ["Vehicles managed"],
  },
  {
    id: "clients",
    targetValue: 30,
    suffix: "+",
    formatCommas: false,
    colorHex: "#31326F", // Victor Brand Indigo
    colorClass: "text-brand-indigo",
    durationMs: 1800,
    labelLines: ["Multinational", "clients"],
  },
  {
    id: "offices",
    targetValue: 10,
    suffix: "",
    formatCommas: false,
    colorHex: "#6E57A0", // Victor Brand Violet
    colorClass: "text-brand-violet",
    durationMs: 1200,
    labelLines: ["India offices"],
  },
  {
    id: "services",
    targetValue: 6,
    suffix: "",
    formatCommas: false,
    colorHex: "#2D5090", // Victor Brand Blue
    colorClass: "text-brand-blue",
    durationMs: 1400,
    labelLines: ["Transport services"],
  },
];

interface SingleCounterProps {
  stat: StatItemData;
  isInView: boolean;
  prefersReducedMotion: boolean;
  index: number;
}

function SingleCounter({ stat, isInView, prefersReducedMotion, index }: SingleCounterProps) {
  const { targetValue, suffix = "", formatCommas, colorClass, durationMs = 1800, labelLines } = stat;
  const [currentValue, setCurrentValue] = useState<number>(prefersReducedMotion ? targetValue : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentValue(targetValue);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth cubic deceleration curve for natural luxury feel
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);

      const calculated = Math.round(easedProgress * targetValue);
      setCurrentValue(calculated);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrentValue(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, prefersReducedMotion, targetValue, durationMs]);

  // Format number display
  const formattedDisplay = formatCommas
    ? currentValue.toLocaleString("en-US")
    : currentValue.toString();

  const finalFormattedTarget = formatCommas
    ? targetValue.toLocaleString("en-US")
    : targetValue.toString();

  // Responsive border classes matching grid breakpoints:
  // Mobile: 2 cols x 3 rows
  // Tablet (md): 3 cols x 2 rows
  // Desktop (lg): 6 cols x 1 row
  const borderClasses: string[] = [];

  // Mobile (2 cols):
  if (index % 2 === 0) {
    borderClasses.push("border-r border-brand-soft-neutral");
  }
  if (index < 4) {
    borderClasses.push("border-b border-brand-soft-neutral");
  }

  // Tablet (3 cols):
  if (index % 3 !== 2) {
    borderClasses.push("md:border-r md:border-brand-soft-neutral");
  } else {
    borderClasses.push("md:border-r-0");
  }
  if (index < 3) {
    borderClasses.push("md:border-b md:border-brand-soft-neutral");
  } else {
    borderClasses.push("md:border-b-0");
  }

  // Desktop (6 cols):
  if (index < 5) {
    borderClasses.push("lg:border-r lg:border-b-0 lg:border-brand-soft-neutral");
  } else {
    borderClasses.push("lg:border-r-0 lg:border-b-0");
  }

  const accessibleFullText = `${finalFormattedTarget}${suffix} ${labelLines.join(" ")}`;

  return (
    <div
      role="group"
      aria-label={accessibleFullText}
      className={`p-5 pb-7 sm:p-6 lg:py-7 lg:px-6 flex flex-col justify-start items-start text-left transition-colors duration-150 hover:bg-brand-warm-white/50 ${borderClasses.join(
        " "
      )}`}
    >
      {/* Screen reader only announcement for accessibility & crawlers */}
      <span className="sr-only">{accessibleFullText}</span>

      {/* Visual Number with Brand Color and Counting Animation */}
      <div
        aria-hidden="true"
        className={`text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-none ${colorClass}`}
      >
        <span>{formattedDisplay}</span>
        {suffix && <span className="ml-0.5">{suffix}</span>}
      </div>

      {/* Descriptive Label in brand ink/75 matching image line-for-line */}
      <div
        aria-hidden="true"
        className="mt-2 sm:mt-2.5 text-xs sm:text-[13px] lg:text-sm text-brand-ink/75 font-medium leading-snug"
      >
        {labelLines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

import { useLanguage } from "@/i18n/LanguageContext";

interface StatCounterSectionProps {
  stats?: StatItemData[];
}

export default function StatCounterSection({ stats }: StatCounterSectionProps) {
  const { dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20px 0px" });
  const prefersReducedMotion = useReducedMotion() ?? false;

  const effectiveStats = (stats || DEFAULT_STATS).map((stat) => {
    const localizedLines = dict.stats?.[stat.id as keyof typeof dict.stats];
    return {
      ...stat,
      labelLines: localizedLines && localizedLines.length > 0 ? localizedLines : stat.labelLines,
    };
  });

  return (
    <section
      ref={containerRef}
      aria-label="Key Performance Statistics"
      className="bg-brand-warm-white py-10 sm:py-14 border-b border-brand-soft-neutral"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Theme Crisp White Container with subtle border and elevation */}
        <div className="bg-white border border-brand-soft-neutral rounded-2xl md:rounded-3xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {effectiveStats.map((stat, index) => (
              <SingleCounter
                key={stat.id}
                stat={stat}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
