import React from "react";

export function PegasusIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Dynamic Winged Horse / Pegasus Silhouette */}
      <path d="M14 44c2-5 6-8 10-10-1-2-1-5 0-7 2-3 5-4 8-4l3-6c2-4 7-6 11-4l3 1-2 4c2 0 4 1 5 3 2 3 1 7-2 9l-4 3c-1 3-3 5-6 6l-1 5c0 2-2 4-4 4h-3l-2-4-7 1-4 6c-1 1-3 1-4 0l-4-4c-1-1-1-3 0-4z" opacity="0.95" />
      {/* Majestic Sweeping Wing */}
      <path d="M28 27c3-7 9-13 16-16 2-1 5 0 6 2 1 2 0 5-2 6-4 3-8 7-11 11l-9-3z" />
      <path d="M33 28c4-5 10-10 17-12 2-1 4 0 5 2s0 4-2 5c-4 3-8 6-12 9l-8-4z" opacity="0.75" />
      <path d="M38 31c3-3 8-7 14-8 2-1 4 0 5 2s0 4-2 5c-4 2-8 4-11 6l-6-5z" opacity="0.55" />
      {/* Reclining hooves & tail */}
      <path d="M12 45c-2 2-4 4-6 7-1 1 0 3 2 3s3-1 4-2l4-5-4-3z" />
      <path d="M22 47l-2 9c0 2 2 3 4 2s2-2 2-4l1-7h-5z" />
    </svg>
  );
}

export function RosetteIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Scalloped award badge */}
      <path d="M32 6l3.5 4.5 5.5-1.5 2 5.5 5.5 1-0.5 5.5 4.5 3.5-3 5 3 5-4.5 3.5 0.5 5.5-5.5 1-2 5.5-5.5-1.5L32 50l-3.5 4.5-5.5-1.5-2-5.5-5.5-1 0.5-5.5L11.5 37.5l3-5-3-5 4.5-3.5-0.5-5.5 5.5-1 2-5.5 5.5 1.5L32 6z" />
      {/* Inner seal circle cutout */}
      <circle cx="32" cy="28" r="14" fill="#1C2044" />
      <circle cx="32" cy="28" r="11" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
      {/* Star in seal */}
      <path d="M32 20l2 4.5 5 0.5-3.5 3.5 1 5-4.5-2.5-4.5 2.5 1-5-3.5-3.5 5-0.5z" fill="currentColor" />
      {/* Ribbon tails */}
      <path d="M25 46l-6 14 7-3 5 5 2-14z" opacity="0.85" />
      <path d="M39 46l6 14-7-3-5 5-2-14z" opacity="0.85" />
    </svg>
  );
}

export function RocketIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Main Rocket Fuselage */}
      <path d="M32 6c-8 6-12 16-12 26 0 7 2 13 4 16h16c2-3 4-9 4-16 0-10-4-20-12-26z" />
      {/* Rocket Nose Tip */}
      <path d="M32 6c-3 3-5 7-6 12h12c-1-5-3-9-6-12z" fill="#7C66B8" opacity="0.9" />
      {/* Porthole */}
      <circle cx="32" cy="24" r="5" fill="#1C2044" stroke="currentColor" strokeWidth="2" />
      {/* Left Fin */}
      <path d="M20 34c-6 4-10 11-12 18 4-1 9-1 12 1v-19z" />
      {/* Right Fin */}
      <path d="M44 34c6 4 10 11 12 18-4-1-9-1-12 1v-19z" />
      {/* Engine Exhaust Flames */}
      <path d="M26 48c0 5 3 10 6 12 3-2 6-7 6-12h-12z" fill="#F59E0B" />
      <path d="M29 48c0 3 1.5 6 3 7 1.5-1 3-4 3-7h-6z" fill="#FDE047" />
    </svg>
  );
}

export function FleetTeamIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Central Leader */}
      <circle cx="32" cy="20" r="7" />
      <path d="M22 36c0-6 4-10 10-10s10 4 10 10v4H22v-4z" />
      {/* Left Team Member */}
      <circle cx="16" cy="24" r="5.5" opacity="0.85" />
      <path d="M8 38c0-5 3-8 8-8 2 0 4 1 5 2-2 2-3 5-3 8v2H8v-4z" opacity="0.85" />
      {/* Right Team Member */}
      <circle cx="48" cy="24" r="5.5" opacity="0.85" />
      <path d="M56 38c0-5-3-8-8-8-2 0-4 1-5 2 2 2 3 5 3 8v2h10v-4z" opacity="0.85" />
      {/* Ground baseline */}
      <rect x="6" y="44" width="52" height="3" rx="1.5" opacity="0.4" />
    </svg>
  );
}

export function GrowthChartIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      {/* Grid Axes Box */}
      <rect x="10" y="10" width="44" height="44" rx="4" strokeWidth="2.5" opacity="0.4" />
      {/* Grid horizontal guidelines */}
      <line x1="10" y1="24" x2="54" y2="24" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <line x1="10" y1="38" x2="54" y2="38" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      {/* Ascending Trend Line */}
      <path d="M16 44 L28 32 L38 38 L48 18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arrowhead */}
      <path d="M38 18 H48 V28" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Highlight Dot */}
      <circle cx="48" cy="18" r="3" fill="currentColor" />
    </svg>
  );
}

export function GraduationCapIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Mortarboard Rhombus Top */}
      <path d="M32 14 L8 26 L32 38 L56 26 Z" />
      {/* Cap Skull Underbody */}
      <path d="M18 31.5 v11 c0 6 6 10 14 10 s14-4 14-10 v-11 l-14 7 z" opacity="0.85" />
      {/* Hanging Tassel */}
      <path d="M52 28 v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="52" cy="46" r="2.5" />
    </svg>
  );
}

export function MedicalMaskIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      {/* Protective Mask Body */}
      <path
        d="M16 22 C16 20, 22 18, 32 18 C42 18, 48 20, 48 22 C48 30, 44 42, 32 44 C20 42, 16 30, 16 22 Z"
        fill="currentColor"
        fillOpacity="0.2"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Pleat creases */}
      <path d="M18 26 H46" strokeWidth="2" opacity="0.6" />
      <path d="M19 32 H45" strokeWidth="2" opacity="0.6" />
      <path d="M22 38 H42" strokeWidth="2" opacity="0.6" />
      {/* Left Ear Loop */}
      <path d="M16 24 C8 24, 6 36, 17 40" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right Ear Loop */}
      <path d="M48 24 C56 24, 58 36, 47 40" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function IndiaMapIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Precision India Geographic Silhouette */}
      <path d="M30 8c2-2 5-2 6 1 1 3 4 3 6 4 3 1 4 4 2 6l-3 4 5 1c3 1 5 4 4 7l-2 3 4 4c2 2 1 5-1 6l-6 3-2 6-4 7-2 3c-1 0-2-3-3-4l-3-10-3-4-4-2c-2-1-3-3-2-5l3-3-1-4c-1-2-1-4 1-5l5-2 1-4c1-2 0-4-2-5l-1-2c1-2 4-3 5-1z" />
      {/* National Hub Nodes */}
      <circle cx="32" cy="28" r="2.5" fill="#F59E0B" />
      <circle cx="28" cy="38" r="2" fill="#60A5FA" />
      <circle cx="36" cy="36" r="2" fill="#34D399" />
    </svg>
  );
}

export function InternationalBadgeTwoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Scalloped award badge */}
      <path d="M32 6l3.5 4.5 5.5-1.5 2 5.5 5.5 1-0.5 5.5 4.5 3.5-3 5 3 5-4.5 3.5 0.5 5.5-5.5 1-2 5.5-5.5-1.5L32 50l-3.5 4.5-5.5-1.5-2-5.5-5.5-1 0.5-5.5L11.5 37.5l3-5-3-5 4.5-3.5-0.5-5.5 5.5-1 2-5.5 5.5 1.5L32 6z" />
      {/* Inner seal circle */}
      <circle cx="32" cy="28" r="14" fill="#1C2044" />
      {/* Large Bold "2" in center representing Phase 2 Global Market */}
      <text
        x="32"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="900"
        fontFamily="sans-serif"
        fill="white"
      >
        2
      </text>
      {/* Ribbon tails */}
      <path d="M25 46l-6 14 7-3 5 5 2-14z" opacity="0.85" />
      <path d="M39 46l6 14-7-3-5 5-2-14z" opacity="0.85" />
    </svg>
  );
}

export function WindTurbineIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Main Turbine Tower */}
      <path d="M31 28 L30 54 H34 L33 28 Z" opacity="0.75" />
      <circle cx="32" cy="28" r="3" />
      {/* Three Wind Blades */}
      <path d="M32 28 C32 18, 30 8, 32 6 C34 8, 33 18, 32 28 Z" />
      <path d="M32 28 C23 33, 15 39, 13 41 C14 39, 23 31, 32 28 Z" />
      <path d="M32 28 C41 33, 49 39, 51 41 C50 39, 41 31, 32 28 Z" />
      {/* Secondary Background Turbine */}
      <path d="M16 38 L15 54 H18 L17 38 Z" opacity="0.5" />
      <circle cx="16.5" cy="38" r="2" opacity="0.6" />
      <path d="M16.5 38 C16.5 30, 15 24, 16.5 22 C18 24, 17 30, 16.5 38 Z" opacity="0.6" />
      <path d="M16.5 38 C10 42, 5 45, 4 46 C5 44, 11 39, 16.5 38 Z" opacity="0.6" />
      <path d="M16.5 38 C23 42, 28 45, 29 46 C28 44, 22 39, 16.5 38 Z" opacity="0.6" />
      {/* Base ground line */}
      <rect x="6" y="54" width="52" height="2.5" rx="1.25" opacity="0.4" />
    </svg>
  );
}

export function SmartphoneAppIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      {/* Smartphone Body */}
      <rect x="20" y="8" width="24" height="48" rx="5" strokeWidth="2.5" />
      {/* Screen area fill */}
      <rect x="22.5" y="13" width="19" height="37" fill="currentColor" fillOpacity="0.15" stroke="none" />
      {/* Speaker ear piece */}
      <line x1="28" y1="11" x2="36" y2="11" strokeWidth="2" strokeLinecap="round" />
      {/* Screen Dispatch Map UI */}
      <circle cx="32" cy="26" r="3.5" fill="currentColor" />
      <path d="M26 36 L32 30 L38 34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Home Button Indicator */}
      <circle cx="32" cy="52" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function DubaiSkylineIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Modern Curved Luxury Hotel / Burj Al Arab Facade */}
      <path d="M22 52 V14 C22 14, 38 22, 38 42 C38 48, 36 52, 36 52 Z" />
      {/* Spire Mast */}
      <line x1="22" y1="14" x2="22" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Horizontal Louvres / Balcony Lines */}
      <line x1="22" y1="22" x2="28" y2="24" stroke="#1C2044" strokeWidth="1.5" />
      <line x1="22" y1="30" x2="34" y2="33" stroke="#1C2044" strokeWidth="1.5" />
      <line x1="22" y1="38" x2="37" y2="40" stroke="#1C2044" strokeWidth="1.5" />
      {/* Adjacent Corporate Tower */}
      <rect x="40" y="24" width="14" height="28" rx="2" opacity="0.8" />
      <rect x="43" y="28" width="8" height="2" fill="#1C2044" />
      <rect x="43" y="34" width="8" height="2" fill="#1C2044" />
      <rect x="43" y="40" width="8" height="2" fill="#1C2044" />
      {/* Palm / Horizon ground line */}
      <rect x="8" y="52" width="48" height="3" rx="1.5" opacity="0.4" />
    </svg>
  );
}

export const JOURNEY_ICONS: Record<number, React.ComponentType<{ className?: string }>> = {
  1: PegasusIcon,
  2: RosetteIcon,
  3: RocketIcon,
  4: FleetTeamIcon,
  5: GrowthChartIcon,
  6: GraduationCapIcon,
  7: MedicalMaskIcon,
  8: IndiaMapIcon,
  9: InternationalBadgeTwoIcon,
  10: WindTurbineIcon,
  11: SmartphoneAppIcon,
  12: DubaiSkylineIcon,
};
