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
 * seamlessly integrated employee portrait on the right,
 * purple accent line, company name, location, and diagonal stripes.
 */
export default function EmployeeHero({ employee }: EmployeeHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#101731] px-5 py-6 xs:px-6 xs:py-7 sm:px-8 sm:py-9">
      <div className="relative z-10 flex min-h-[190px] xs:min-h-[210px] sm:min-h-[230px] items-center">
        {/* Left Column: Name, Designation, Accent Line, Company & Location */}
        <div className="w-[58%] xs:w-[60%] sm:w-[62%] pr-2 space-y-1.5">
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

        {/* Right Side: Seamlessly Blended Employee Portrait */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[45%] xs:w-[44%] sm:w-[40%] overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src={employee.photoUrl}
            alt={employee.fullName}
            fill
            priority
            sizes="(max-width: 640px) 50vw, 400px"
            className="object-cover object-top"
          />
          {/* Subtle directional gradient masks for seamless integration */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#101731] via-[#101731]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101731] via-transparent to-transparent opacity-85" />
        </div>
      </div>

      {/* Decorative diagonal purple stripes in the bottom-right corner */}
      <DecorativeStripes className="absolute bottom-0 right-0 w-20 h-16 xs:w-24 xs:h-20 sm:w-28 sm:h-24 z-20 pointer-events-none" />
    </section>
  );
}
