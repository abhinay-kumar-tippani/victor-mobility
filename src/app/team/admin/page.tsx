import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  QrCode,
  Download,
  Users,
  Eye,
  FileText,
  CheckCircle2,
  AlertCircle,
  Home,
  Info,
} from "lucide-react";

import BrandLogo from "@/components/brand/BrandLogo";
import { getAllEmployees } from "@/lib/team/team-data";
import { generateQrDataUrl } from "@/lib/team/qr";

export const metadata: Metadata = {
  title: "Employee Directory & QR Codes | Victor Mobility",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  const employees = getAllEmployees();

  // Pre-generate QR data URLs for each employee
  const employeesWithQr = await Promise.all(
    employees.map(async (emp) => ({
      ...emp,
      qrDataUrl: await generateQrDataUrl(emp.slug, 200),
    }))
  );

  return (
    <div className="min-h-screen bg-brand-warm-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-brand-soft-neutral">
          <div className="space-y-1">
            <Link href="/india">
              <BrandLogo className="h-auto w-[180px] aspect-[810/430] mix-blend-multiply" />
            </Link>
            <h1 className="text-2xl font-extrabold text-brand-ink tracking-tight pt-2">
              Employee QR Profiles Directory
            </h1>
            <p className="text-xs text-brand-ink/70">
              Manage profiles and generate printed QR codes directly from your laptop.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/india"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-soft-neutral bg-white px-3 py-2 text-xs font-bold text-brand-ink shadow-2xs hover:bg-brand-warm-white"
            >
              <Home className="h-3.5 w-3.5 text-brand-indigo" />
              <span>Back to Site</span>
            </Link>
          </div>
        </header>

        {/* Quick Instructions Banner */}
        <div className="rounded-2xl border border-brand-indigo/20 bg-brand-indigo/5 p-5 space-y-2 text-xs text-brand-ink/80">
          <div className="flex items-center gap-2 font-bold text-brand-indigo">
            <FileText className="h-4 w-4" />
            <span>How to add or edit employee profiles:</span>
          </div>
          <p>
            Open <code className="bg-white px-1.5 py-0.5 rounded border border-brand-indigo/20 font-mono text-[11px] text-brand-indigo">src/content/team.json</code> in your editor. You can add a new team member, change their role, update contact details, or toggle <code className="font-mono text-[11px]">showOnHomepage</code> and <code className="font-mono text-[11px]">showOnAbout</code>. Changes will update immediately.
          </p>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employeesWithQr.map((emp) => {
            const canonicalUrl = `https://victormobility.in/team/${emp.slug}`;
            const isPublished = emp.status === "published";

            return (
              <div
                key={emp.id}
                className="rounded-2xl border border-brand-soft-neutral bg-white p-5 shadow-xs flex flex-col justify-between space-y-5"
              >
                {/* Employee Info Header */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-brand-soft-neutral bg-brand-ink">
                      <Image
                        src={emp.photoUrl}
                        alt={emp.fullName}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isPublished
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {isPublished ? (
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-amber-600" />
                          )}
                          <span>{emp.status}</span>
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-brand-ink truncate mt-1">
                        {emp.fullName}
                      </h2>
                      <p className="text-xs text-brand-blue truncate font-medium">
                        {emp.designation}
                      </p>
                    </div>
                  </div>

                  {/* QR Code Preview & Direct Links */}
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-brand-warm-white border border-brand-soft-neutral/70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={emp.qrDataUrl}
                      alt={`QR Code for ${emp.fullName}`}
                      width={80}
                      height={80}
                      className="rounded border border-brand-soft-neutral/80 bg-white p-1"
                    />
                    <div className="flex-1 space-y-1.5 text-xs">
                      <p className="font-mono text-[11px] text-brand-ink/70 break-all leading-tight">
                        /team/{emp.slug}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <a
                          href={`/team/${emp.slug}/qr?format=png&download=true`}
                          className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-bold text-brand-ink border border-brand-soft-neutral shadow-2xs hover:bg-brand-soft-neutral/40"
                        >
                          <Download className="h-3 w-3" />
                          <span>PNG</span>
                        </a>
                        <a
                          href={`/team/${emp.slug}/qr?format=svg&download=true`}
                          className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-bold text-brand-ink border border-brand-soft-neutral shadow-2xs hover:bg-brand-soft-neutral/40"
                        >
                          <Download className="h-3 w-3" />
                          <span>SVG</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Visibility Badges */}
                  <div className="flex items-center justify-between text-[11px] text-brand-ink/70 pt-1">
                    <span className="flex items-center gap-1">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          emp.showOnHomepage ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      />
                      Homepage: {emp.showOnHomepage ? `Yes (#${emp.homepageOrder})` : "No"}
                    </span>
                    <span className="flex items-center gap-1">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          emp.showOnAbout ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      />
                      About: {emp.showOnAbout ? `Yes (#${emp.aboutOrder})` : "No"}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-brand-soft-neutral flex items-center justify-between">
                  <a
                    href={`/team/${emp.slug}/contact.vcf`}
                    className="text-xs font-semibold text-brand-ink/75 hover:text-brand-indigo inline-flex items-center gap-1"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>vCard .vcf</span>
                  </a>

                  <Link
                    href={`/team/${emp.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-indigo px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-brand-blue"
                  >
                    <span>Open Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
