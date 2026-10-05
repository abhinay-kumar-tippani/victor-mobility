import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChauffeurAcademy from "@/components/academy/ChauffeurAcademy";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { GraduationCap, ShieldCheck, CheckCircle2, ArrowRight, Award } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chauffeur Protocol Academy | Victor Mobility India",
  description:
    "Explore the rigorous 5-pillar curriculum, 24-point vehicle inspection audit, and 100% police background verification that backs 'On Time Every Time.'",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/academy",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/academy",
      "en-AE": "https://victor-mobility.vercel.app/uae/academy",
    },
  },
};

export default function IndiaAcademyPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Victor Mobility Chauffeur Protocol Academy",
    description:
      "Chauffeur training, defensive driving telematics, 24-point cabin preparation, and executive non-disclosure protocol.",
    provider: {
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
      <Header contact={content.contact} />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Page Hero */}
        <section className="bg-brand-ink text-white py-16 sm:py-24 border-b border-brand-indigo/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6E57A0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-bold tracking-widest uppercase text-brand-soft-neutral">
                <GraduationCap className="w-3.5 h-3.5 text-brand-violet" />
                The Victor Standard Substantiated
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Chauffeur Protocol Academy
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Punctuality and discretion are not accidental; they are engineered. Explore the 5-pillar curriculum, 24-point vehicle audit, and verified safety credentials that uphold our commitment: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Police Background Verification (BGV)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>24-Point Pre-Dispatch Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Executive Non-Disclosure Discretion</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chauffeur Academy Component */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ChauffeurAcademy region="india" />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-brand-soft-neutral/30 border-t border-brand-soft-neutral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-indigo">
              Experience the Victor Chauffeur Protocol Firsthand
            </h3>
            <p className="text-sm text-brand-slate max-w-2xl mx-auto leading-relaxed">
              Calculate point-to-point corridor fares or request an enterprise corporate mobility quotation backed by certified chauffeurs.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/india/estimator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Calculate Corridor Fares</span>
              </Link>
              <Link
                href="/india/rfp"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Submit Enterprise RFP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        contact={content.contact}
        offices={content.offices}
        mediaCaption={media.caption}
        isoEnabled={content.sourceClaims.iso?.enabled}
      />
    </div>
  );
}
