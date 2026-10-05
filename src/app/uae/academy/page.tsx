import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChauffeurAcademy from "@/components/academy/ChauffeurAcademy";
import uaeData from "@/content/uae.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { GraduationCap, ShieldCheck, CheckCircle2, ArrowRight, Award } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UAE Limousine Chauffeur Academy | Victor Mobility UAE",
  description:
    "Explore the 5-pillar limousine curriculum, 24-point cabin preparation audit, and RTA compliant luxury chauffeur standards at Victor Luxury Limousine Dubai.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/uae/academy",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/academy",
      "en-AE": "https://victor-mobility.vercel.app/uae/academy",
    },
  },
};

export default function UaeAcademyPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Victor Mobility UAE Limousine Chauffeur Protocol Academy",
    description:
      "Executive limousine chauffeur training, RTA compliance, VIP airport protocol, and luxury vehicle cabin audits in Dubai and the UAE.",
    provider: {
      "@type": "Organization",
      name: content.companyName,
      url: "https://victor-mobility.vercel.app/uae",
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
                Dubai &amp; UAE Limousine Excellence
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                UAE Chauffeur Protocol Academy
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Operating from 65th Street, Al Garhoud, near Dubai International Airport, our chauffeurs undergo rigorous training in VIP airport protocol, discrete etiquette, and high-speed expressway safety to deliver: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RTA Certified Executive Chauffeurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>24-Point Cabin Audit &amp; 22°C Climate Preset</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>VIP Non-Disclosure &amp; Discretion</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chauffeur Academy Component */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ChauffeurAcademy region="uae" />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-brand-soft-neutral/30 border-t border-brand-soft-neutral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-indigo">
              Reserve First Class Limousine Mobility in Dubai &amp; Abu Dhabi
            </h3>
            <p className="text-sm text-brand-slate max-w-2xl mx-auto leading-relaxed">
              Calculate indicative corridor fares or initiate an enterprise RFP with our Dubai Head Office desk at +971 52 455 2441.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/uae/academy/verify"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verify RTA Driver Badge</span>
              </Link>
              <Link
                href="/uae/estimator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-light text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Calculate UAE Limousine Fares</span>
              </Link>
              <Link
                href="/uae/rfp"
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
        isoEnabled={content.sourceClaims?.iso?.enabled}
      />
    </div>
  );
}
