import React from "react";
import type { EmployeeProfile } from "@/types/team";

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad-4" cx="0.2" cy="1" r="1">
          <stop offset="0%" stopColor="#FFD521" />
          <stop offset="50%" stopColor="#F50000" />
          <stop offset="100%" stopColor="#B900B4" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad-4)" />
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.5 12h-2.5v8h-3v-8h-2v-2.5h2v-1.8c0-2.2 1.3-3.7 3.6-3.7h2.4v2.5h-1.5c-1 0-1.5.5-1.5 1.4v1.6h3l-.5 2.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M6.5 9h2.5v8H6.5V9zM7.7 5.5c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4zM10.8 9h2.4v1.1h.03c.3-.6 1.2-1.3 2.4-1.3 2.6 0 3.1 1.7 3.1 3.9v5.3h-2.5v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.8h-2.5V9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

interface EmployeeSocialLinksProps {
  employee: EmployeeProfile;
}

export default function EmployeeSocialLinks({ employee }: EmployeeSocialLinksProps) {
  // If no social links configured, hide the section gracefully
  if (!employee.instagram && !employee.facebook && !employee.linkedin) {
    return null;
  }

  return (
    <div className="w-full space-y-3">
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2050] tracking-tight">
        Social profiles
      </h2>

      {/* Exactly 3 outlined buttons in exact order: 1. Instagram, 2. Facebook, 3. LinkedIn */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
        {/* 1. Instagram */}
        {employee.instagram ? (
          <a
            href={employee.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200 bg-white px-2 sm:px-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F]"
            aria-label={`${employee.fullName} on Instagram`}
          >
            <InstagramIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="truncate">Instagram</span>
          </a>
        ) : (
          <div className="hidden" />
        )}

        {/* 2. Facebook */}
        {employee.facebook ? (
          <a
            href={employee.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200 bg-white px-2 sm:px-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F]"
            aria-label={`${employee.fullName} on Facebook`}
          >
            <FacebookIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="truncate">Facebook</span>
          </a>
        ) : (
          <div className="hidden" />
        )}

        {/* 3. LinkedIn */}
        {employee.linkedin ? (
          <a
            href={employee.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200 bg-white px-2 sm:px-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F]"
            aria-label={`${employee.fullName} on LinkedIn`}
          >
            <LinkedInIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="truncate">LinkedIn</span>
          </a>
        ) : (
          <div className="hidden" />
        )}
      </div>
    </div>
  );
}
