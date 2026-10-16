import React from "react";
import { JOURNEY_ICONS } from "./JourneyIcons";

interface JourneyBadgeProps {
  theme: "purple" | "white" | "navy" | "grey" | string;
  step: number;
  className?: string;
}

export default function JourneyBadge({ theme, step, className = "" }: JourneyBadgeProps) {
  const IconComponent = JOURNEY_ICONS[step];

  // Theme-specific styles
  const isWhite = theme === "white";
  const isPurple = theme === "purple";
  const isNavy = theme === "navy";

  // Pointer color
  const pointerColor = isWhite
    ? "border-b-white"
    : isPurple
    ? "border-b-[#7C66B8]"
    : isNavy
    ? "border-b-[#3B82F6]"
    : "border-b-[#94A3B8]";

  // Outer ring styling
  const ringStyle = isWhite
    ? "bg-gradient-to-br from-white via-[#F8FAFC] to-[#CBD5E1] border-2 border-white text-[#1C2044] shadow-[0_8px_24px_rgba(255,255,255,0.35)]"
    : isPurple
    ? "bg-gradient-to-br from-[#8B5CF6] via-[#6D28D9] to-[#3B0764] border-2 border-[#A78BFA]/50 text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)]"
    : isNavy
    ? "bg-gradient-to-br from-[#3B82F6] via-[#1D4ED8] to-[#0F172A] border-2 border-[#60A5FA]/50 text-white shadow-[0_8px_24px_rgba(59,130,246,0.35)]"
    : "bg-gradient-to-br from-[#64748B] via-[#334155] to-[#0F172A] border-2 border-[#94A3B8]/40 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)]";

  // Inner core disc styling
  const coreStyle = isWhite
    ? "bg-[#F1F5F9] border border-slate-300/80 shadow-inner"
    : isPurple
    ? "bg-[#1E1138] border border-purple-400/20 shadow-inner"
    : isNavy
    ? "bg-[#0A1128] border border-blue-400/20 shadow-inner"
    : "bg-[#181E29] border border-slate-500/20 shadow-inner";

  // Icon color
  const iconColor = isWhite
    ? "text-[#1E1B4B] group-hover:text-[#4338CA]"
    : isPurple
    ? "text-white group-hover:text-[#DDD6FE]"
    : isNavy
    ? "text-white group-hover:text-[#BFDBFE]"
    : "text-white group-hover:text-[#E2E8F0]";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* 1. Sleek Top Triangular Pointer (Pin Marker at 12 o'clock) */}
      <div
        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-b-[7px] ${pointerColor} filter drop-shadow-[0_-2px_4px_rgba(0,0,0,0.4)] z-20`}
      />

      {/* 2. Outer 3D Layered Ring */}
      <div
        className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 ${ringStyle}`}
      >
        {/* 3. Concentric Inner Core Disc */}
        <div className={`w-full h-full rounded-full flex items-center justify-center ${coreStyle}`}>
          {IconComponent && (
            <IconComponent
              className={`w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110 ${iconColor}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
