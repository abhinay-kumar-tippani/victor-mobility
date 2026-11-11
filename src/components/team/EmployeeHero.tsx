import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { EmployeeProfile } from "@/types/team";
import DecorativeStripes from "./DecorativeStripes";

interface EmployeeHeroProps {
  employee: EmployeeProfile;
}

/**
 * Mobile hero section matching Image 3:
 * Full-width dark-navy hero with name and designation on the left,
 * seamlessly blended employee portrait spanning the full height from top to bottom
 * on the right with a feathered left fade, purple accent line, company name,
 * location, and bottom-right diagonal stripes.
 */
export default function EmployeeHero({ employee }: EmployeeHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#13182C",
        backgroundImage:
          "radial-gradient(ellipse 75% 90% at 75% 40%, #22263C 0%, #171C32 52%, #12172B 100%)",
      }}
    >
      {/* Right Side: Seamlessly Blended Employee Portrait spanning top-0 to bottom-0 */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[55%] xs:w-[52%] sm:w-[48%] overflow-hidden pointer-events-none select-none z-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.2) 12%, rgba(0, 0, 0, 0.75) 30%, black 50%, black 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.2) 12%, rgba(0, 0, 0, 0.75) 30%, black 50%, black 100%)",
        }}
        aria-hidden="true"
      >
        <Image
          src={employee.photoUrl}
          alt={employee.fullName}
          fill
          priority
          sizes="(max-width: 640px) 55vw, 400px"
          className="object-cover object-[center_top]"
        />
      </div>

      {/* Left Column Content Container (with proper padding) */}
      <div className="relative z-10 flex min-h-[210px] xs:min-h-[230px] sm:min-h-[250px] items-center px-5 py-6 xs:px-6 xs:py-7 sm:px-8 sm:py-8">
        <div className="w-[58%] xs:w-[60%] sm:w-[62%] pr-2 space-y-1.5 z-10">
          <h1 className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight break-words">
            {employee.fullName}
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
            {employee.designation}
          </p>

          {/* Short purple accent line */}
          <div className="py-1">
            <div className="h-[3px] w-10 sm:w-12 rounded-full bg-[#8A71E6]" aria-hidden="true" />
          </div>

          <p className="text-xs sm:text-sm font-semibold text-white/95">
            Victor Mobility Pvt. Ltd.
          </p>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 pt-0.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span>{employee.location || "Hyderabad, India"}</span>
          </div>
        </div>
      </div>

      {/* Decorative diagonal purple stripes in the bottom-right corner */}
      <DecorativeStripes className="absolute bottom-0 right-0 w-20 h-16 xs:w-24 xs:h-20 sm:w-28 sm:h-24 z-20 pointer-events-none" />
    </section>
  );
}
