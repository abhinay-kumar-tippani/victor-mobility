import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { EmployeeProfile } from "@/types/team";
import DecorativeStripes from "./DecorativeStripes";

interface EmployeeDesktopProfilePanelProps {
  employee: EmployeeProfile;
}

export default function EmployeeDesktopProfilePanel({ employee }: EmployeeDesktopProfilePanelProps) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#101731] text-white">
      {/* Top Section: Integrated Employee Portrait */}
      <div className="relative w-full aspect-[4/4.2] overflow-hidden bg-[#101731]">
        <Image
          src={employee.photoUrl}
          alt={`Portrait of ${employee.fullName}, ${employee.designation}`}
          fill
          priority
          sizes="(max-width: 1024px) 40vw, 420px"
          className="object-cover object-top"
        />
        {/* Seamless bottom fade into the dark navy background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101731] via-[#101731]/20 to-transparent" />
      </div>

      {/* Middle/Bottom Information Section */}
      <div className="relative z-10 flex-1 px-8 pb-8 pt-4 space-y-2 flex flex-col justify-end">
        <h1 className="font-serif text-2xl lg:text-[28px] xl:text-[30px] font-bold text-white tracking-tight leading-snug break-words">
          {employee.fullName}
        </h1>

        <p className="text-sm lg:text-[15px] font-medium text-slate-200 leading-normal">
          {employee.designation}
        </p>

        {/* Short purple accent line */}
        <div className="py-1.5">
          <div className="h-[3px] w-12 rounded-full bg-[#8A71E6]" aria-hidden="true" />
        </div>

        {/* Location with Pin Icon */}
        <div className="flex items-center gap-2 text-xs lg:text-sm text-slate-300 pt-0.5">
          <MapPin className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
          <span>{employee.location || "Hyderabad, India"}</span>
        </div>
      </div>

      {/* Decorative diagonal purple stripes in bottom-right corner */}
      <DecorativeStripes className="absolute bottom-0 right-0 w-28 h-24 lg:w-32 lg:h-28 z-20 pointer-events-none" />
    </div>
  );
}
