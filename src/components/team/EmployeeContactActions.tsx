"use client";

import React from "react";
import { Download, QrCode } from "lucide-react";
import type { EmployeeProfile } from "@/types/team";

interface EmployeeContactActionsProps {
  employee: EmployeeProfile;
  onOpenQr: () => void;
}

export default function EmployeeContactActions({
  employee,
  onOpenQr,
}: EmployeeContactActionsProps) {
  const vcfUrl = `/team/${employee.slug}/contact.vcf`;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
      {/* 1. Save Contact - Filled Deep-Purple/Navy */}
      <a
        href={vcfUrl}
        download={`${employee.slug}.vcf`}
        className="inline-flex h-[50px] sm:h-[52px] items-center justify-center gap-2 rounded-xl bg-[#31326F] px-3 sm:px-5 text-sm sm:text-base font-bold text-white shadow-xs transition-colors hover:bg-[#252654] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F] focus-visible:ring-offset-2 active:scale-[0.99] select-none text-center"
      >
        <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="truncate">Save Contact</span>
      </a>

      {/* 2. Show QR Code - White Background, Purple Border */}
      <button
        type="button"
        onClick={onOpenQr}
        className="inline-flex h-[50px] sm:h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-[#31326F] bg-white px-3 sm:px-5 text-sm sm:text-base font-bold text-[#31326F] transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31326F] focus-visible:ring-offset-2 active:scale-[0.99] select-none text-center"
      >
        <QrCode className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="truncate">Show QR Code</span>
      </button>
    </div>
  );
}
