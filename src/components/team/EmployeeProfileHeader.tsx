"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, Check } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import type { EmployeeProfile } from "@/types/team";

interface EmployeeProfileHeaderProps {
  employee: EmployeeProfile;
}

export default function EmployeeProfileHeader({ employee }: EmployeeProfileHeaderProps) {
  const [copied, setCopied] = useState(false);

  const canonicalUrl = `https://victormobility.in/team/${employee.slug}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${employee.fullName} — ${employee.designation}`,
          text: `Digital business card for ${employee.fullName} at Victor Mobility Pvt. Ltd.`,
          url: canonicalUrl,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <header className="relative w-full border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        {/* Left: Official Victor Logo + Divider + Company Name */}
        <div className="flex items-center">
          <Link
            href="/india"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo rounded"
            aria-label="Victor Mobility corporate homepage"
          >
            <BrandLogo className="h-8 xs:h-9 sm:h-10 w-auto aspect-[810/430] mix-blend-multiply" />
          </Link>

          {/* Thin vertical divider and company name (hidden on very small viewports if cramped) */}
          <div className="hidden sm:block h-6 w-[1px] bg-slate-300 mx-3 sm:mx-4" aria-hidden="true" />
          <span className="hidden sm:inline text-xs sm:text-sm font-medium text-slate-800 tracking-tight">
            Victor Mobility Pvt. Ltd.
          </span>
        </div>

        {/* Right: Share icon & action */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handleShare}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 hover:text-brand-indigo transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo rounded-md px-2 py-1"
            aria-label={`Share ${employee.fullName}'s profile`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-brand-indigo group-hover:scale-105 transition-transform" aria-hidden="true" />
                <span>Share Profile</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
