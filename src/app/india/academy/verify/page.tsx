import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChauffeurBadgeVerification from "@/components/academy/ChauffeurBadgeVerification";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { ShieldCheck, CheckCircle2, Award, HeartPulse } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chauffeur Credential & Safety Badge Verification | Victor Mobility India",
  description:
    "Audit Victor Mobility chauffeur credentials, police background clearances, medical exams, and sobriety logs across Hyderabad, Bengaluru, and Pune.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/academy/verify",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/academy/verify",
      "en-AE": "https://victor-mobility.vercel.app/uae/academy/verify",
    },
  },
};

export default function IndiaAcademyVerifyPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Victor Mobility Chauffeur Credential & Safety Badge Verification Desk",
    applicationCategory: "SecurityApplication",
    description:
      "Enterprise audit tool for verifying commercial chauffeur police clearance, alcohol sobriety logs, medical fitness, and women passenger safety ratings in India.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victor-mobility.vercel.app/india",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="print:hidden">
        <Header contact={content.contact} />
      </div>

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero */}
        <section className="print:hidden bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Live Driver Security &amp; Compliance Registry
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Chauffeur Badge Verification
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Empowering corporate HR, travel managers, and enterprise procurement officers to authenticate driver safety credentials, police clearances, and sobriety compliance, upholding: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Police CCTNS Verified Roster</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-emerald-400" />
                  <span>Annual Medical &amp; Vision Clearances</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Tolerance Sobriety Breathalyzers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Component Section */}
        <section className="py-12 sm:py-16 bg-brand-warm-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ChauffeurBadgeVerification region="india" />
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <Footer
          contact={content.contact}
          offices={content.offices}
          mediaCaption={media.caption}
          isoEnabled={content.sourceClaims?.iso?.enabled}
        />
      </div>
    </div>
  );
}
