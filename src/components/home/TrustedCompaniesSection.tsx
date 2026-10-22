"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

/* -------------------------------------------------------------------------- */
/*  12 Authentic Enterprise Client Logos (Tailored for Deep Navy Tiles)        */
/*  Colored trademark symbols + crisp white typography matching Reference     */
/* -------------------------------------------------------------------------- */

function AmazonLogo() {
  return (
    <div className="flex flex-col items-center justify-center -space-y-1">
      <span className="text-white font-black text-xl sm:text-2xl tracking-tight lowercase select-none">
        amazon
      </span>
      {/* Amazon iconic curved smile arrow */}
      <svg viewBox="0 0 76 14" className="w-[66px] sm:w-[74px] h-3" fill="none">
        <path
          d="M3 4C20 12 54 12 70 3"
          stroke="#FF9900"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M65.5 3L72.5 2L70 8.5"
          stroke="#FF9900"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SynechronLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight">
        Synechr<span className="text-[#FFD100]">o</span>n
      </span>
      <span className="w-2 h-2 rounded-full bg-[#FFD100] shadow-[0_0_8px_#FFD100]" />
    </div>
  );
}

function TeleperformanceLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* TP Icon */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#A855F7" />
        <path d="M7 8h10M12 8v8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-white font-bold text-sm sm:text-base tracking-tight">
        Teleperformance
      </span>
    </div>
  );
}

function OtisLogo() {
  return (
    <div className="flex items-center justify-center">
      <span className="text-white font-black text-2xl sm:text-[1.75rem] tracking-widest font-mono">
        OTIS
      </span>
    </div>
  );
}

function JPMorganLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Chase Octagon Emblem */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="#117ACA">
        <path d="M3 8.5L8.5 3h7L21 8.5v7L15.5 21h-7L3 15.5z" />
        <path d="M9 12l2.5-2.5h1L15 12l-2.5 2.5h-1z" fill="#07192C" />
      </svg>
      <span className="text-white font-semibold text-xs sm:text-sm tracking-tight whitespace-nowrap">
        JPMorganChase
      </span>
    </div>
  );
}

function TataDocomoLogo() {
  return (
    <div className="flex items-center gap-1.5 font-bold">
      <span className="text-white text-xs sm:text-sm tracking-wider uppercase">TATA</span>
      <span className="text-[#FF4500] text-sm sm:text-base font-extrabold tracking-tight lowercase">
        docomo
      </span>
    </div>
  );
}

function OracleLogo() {
  return (
    <div className="flex items-center justify-center">
      <span className="text-[#EA1C24] font-black text-xl sm:text-2xl tracking-[0.2em] font-sans">
        ORACLE
      </span>
    </div>
  );
}

function WiproLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Wipro Rainbow Spiral Emblem */}
      <svg viewBox="0 0 32 32" className="w-6 h-6 flex-shrink-0" fill="none">
        <circle cx="16" cy="6" r="2.2" fill="#E11D48" />
        <circle cx="23" cy="9" r="2" fill="#F59E0B" />
        <circle cx="26" cy="16" r="2.2" fill="#10B981" />
        <circle cx="23" cy="23" r="2" fill="#3B82F6" />
        <circle cx="16" cy="26" r="2.2" fill="#6366F1" />
        <circle cx="9" cy="23" r="2" fill="#8B5CF6" />
        <circle cx="6" cy="16" r="2.2" fill="#EC4899" />
        <circle cx="9" cy="9" r="2" fill="#F43F5E" />
        <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
      </svg>
      <span className="text-white font-extrabold text-base sm:text-lg tracking-tight lowercase">
        wipro
      </span>
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="flex items-center font-bold text-lg sm:text-xl tracking-tight">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </div>
  );
}

function GodrejPropertiesLogo() {
  return (
    <div className="flex flex-col items-center justify-center leading-none">
      <span className="text-white italic font-serif text-lg sm:text-xl font-bold tracking-wide">
        <span className="text-[#EA1D2C]">G</span>odrej
      </span>
      <span className="text-white/70 font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.25em] mt-0.5">
        Properties
      </span>
    </div>
  );
}

function HdfcLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* HDFC Square Emblem */}
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#004C8F] border border-white/20 flex items-center justify-center p-0.5 rounded-xs flex-shrink-0">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ED232A]" />
      </div>
      <span className="text-white font-bold text-xs sm:text-sm tracking-tight uppercase whitespace-nowrap">
        HDFC BANK
      </span>
    </div>
  );
}

function SynchronyLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Synchrony 4 Vertical Amber Bars */}
      <div className="flex items-end gap-0.5 h-5">
        <span className="w-1 h-2 bg-[#FFB81C] rounded-xs" />
        <span className="w-1 h-3.5 bg-[#FFB81C] rounded-xs" />
        <span className="w-1 h-5 bg-[#FFB81C] rounded-xs" />
        <span className="w-1 h-3 bg-[#FFB81C] rounded-xs" />
      </div>
      <span className="text-white font-semibold text-xs sm:text-sm tracking-tight lowercase">
        synchrony
      </span>
    </div>
  );
}

interface CompanyItem {
  id: string;
  name: string;
  renderLogo: () => JSX.Element;
}

const CLIENT_COMPANIES: CompanyItem[] = [
  { id: "amazon", name: "Amazon", renderLogo: AmazonLogo },
  { id: "synechron", name: "Synechron", renderLogo: SynechronLogo },
  { id: "teleperformance", name: "Teleperformance", renderLogo: TeleperformanceLogo },
  { id: "otis", name: "OTIS", renderLogo: OtisLogo },
  { id: "jpmorgan", name: "JPMorgan Chase", renderLogo: JPMorganLogo },
  { id: "tatadocomo", name: "TATA Docomo", renderLogo: TataDocomoLogo },
  { id: "oracle", name: "Oracle", renderLogo: OracleLogo },
  { id: "wipro", name: "Wipro", renderLogo: WiproLogo },
  { id: "google", name: "Google", renderLogo: GoogleLogo },
  { id: "godrej", name: "Godrej Properties", renderLogo: GodrejPropertiesLogo },
  { id: "hdfc", name: "HDFC Bank", renderLogo: HdfcLogo },
  { id: "synchrony", name: "Synchrony Financial", renderLogo: SynchronyLogo },
];

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
  const Logo = company.renderLogo;
  return (
    <div
      role="img"
      aria-label={`${company.name} logo`}
      className="w-[180px] sm:w-[210px] h-[80px] sm:h-[90px] rounded-2xl bg-[#0E2744]/90 hover:bg-[#123154] border border-white/10 hover:border-white/25 shadow-sm transition-all duration-200 group flex items-center justify-center p-4 sm:p-5 flex-shrink-0 select-none cursor-default"
    >
      <div className="group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
        <Logo />
      </div>
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
              <LogoTile key={`r1-${company.id}-${index}`} company={company} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3.5 sm:gap-4 slider-rtl w-max will-change-transform py-1">
            {ROW_2.map((company, index) => (
              <LogoTile key={`r2-${company.id}-${index}`} company={company} />
            ))}
          </div>
        </div>

        {/* Row 3: Left to Right */}
        <div className="flex overflow-hidden">
          <div className="flex gap-3.5 sm:gap-4 slider-ltr-slow w-max will-change-transform py-1">
            {ROW_3.map((company, index) => (
              <LogoTile key={`r3-${company.id}-${index}`} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
