"use client";

import Image from "next/image";
import { useId } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

import indiaData from "@/content/india.json";

interface CompanyItem {
  name: string;
  logo: string;
  description?: string;
}

const CLIENT_COMPANIES: CompanyItem[] = indiaData.clientCompanies;

// Stagger starting items across rows to avoid rigid duplicate columns
const ROW_1 = [...CLIENT_COMPANIES, ...CLIENT_COMPANIES];
const ROW_2 = [
  ...CLIENT_COMPANIES.slice(4),
  ...CLIENT_COMPANIES.slice(0, 4),
  ...CLIENT_COMPANIES.slice(4),
  ...CLIENT_COMPANIES.slice(0, 4),
];
const ROW_3 = [
  ...CLIENT_COMPANIES.slice(8),
  ...CLIENT_COMPANIES.slice(0, 8),
  ...CLIENT_COMPANIES.slice(8),
  ...CLIENT_COMPANIES.slice(0, 8),
];

function LogoTile({ company }: { company: CompanyItem }) {
  return (
    <div
      className="w-[180px] sm:w-[210px] h-[160px] rounded-2xl bg-white hover:bg-slate-50 border border-white/10 hover:border-white/25 shadow-sm transition-colors duration-200 flex flex-col items-center justify-center gap-2 p-4 flex-shrink-0 text-center"
    >
      <Image src={company.logo} alt={`${company.name} logo`} width={160} height={60} loading="eager" unoptimized className={`h-[60px] w-full object-contain ${company.name === "Entain India Pvt. Ltd." ? "rounded-md bg-[#0E2744] p-2" : ""}`} />
      <span className="text-slate-700 font-semibold text-xs leading-snug">
        {company.name}
      </span>
      {company.description && (
        <span className="text-slate-600 text-[10px] leading-snug">{company.description}</span>
      )}
    </div>
  );
}

export default function TrustedCompaniesSection() {
  const headingId = useId();
  const pathname = usePathname();
  const isUae = pathname?.startsWith("/uae");
  const { dict } = useLanguage();

  const effectiveDescription = isUae
    ? (dict.companies.uaeDescription || dict.companies.description)
    : dict.companies.description;

  return (
    <section
      id="clients"
      aria-labelledby={headingId}
      className="py-14 sm:py-20 bg-[#07182C] text-white border-b border-white/10 relative overflow-hidden"
    >
      {/* Component-scoped marquee keyframes */}
      <style>{`
        @keyframes marquee-rtl {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .slider-rtl {
          animation: marquee-rtl 38s linear infinite;
        }
        .slider-ltr {
          animation: marquee-ltr 34s linear infinite;
        }
        .slider-ltr-slow {
          animation: marquee-ltr 40s linear infinite;
        }
        .slider-rtl:hover,
        .slider-ltr:hover,
        .slider-ltr-slow:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .slider-rtl,
          .slider-ltr,
          .slider-ltr-slow {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14">
        <span className="text-xs uppercase tracking-widest font-bold text-indigo-400 block mb-2">
          {dict.companies.eyebrow}
        </span>
        <h2
          id={headingId}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3"
        >
          {dict.companies.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {effectiveDescription}
        </p>
      </div>

      {/* 3 Continuous Sliders with Ambient Edge Gradients matching Image 2 */}
      <div className="relative w-full overflow-hidden space-y-3.5 sm:space-y-4">
        {/* Left & Right Edge Fades for Seamless Infinite Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#07182C] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#07182C] to-transparent z-10" />

        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3.5 sm:gap-4 slider-ltr w-max will-change-transform py-1">
            {ROW_1.map((company, index) => (
              <LogoTile key={`r1-${company.name}-${index}`} company={company} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3.5 sm:gap-4 slider-rtl w-max will-change-transform py-1">
            {ROW_2.map((company, index) => (
              <LogoTile key={`r2-${company.name}-${index}`} company={company} />
            ))}
          </div>
        </div>

        {/* Row 3: Left to Right */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3.5 sm:gap-4 slider-ltr-slow w-max will-change-transform py-1">
            {ROW_3.map((company, index) => (
              <LogoTile key={`r3-${company.name}-${index}`} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
