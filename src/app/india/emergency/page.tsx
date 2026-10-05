import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EmergencyQuickDial from "@/components/emergency/EmergencyQuickDial";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";
import type { IndiaContent, MediaContent } from "@/types/content";
import { PhoneCall, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "24/7 Operations Desk & Emergency Quick-Dial | Victor Mobility India",
  description:
    "Instant telephone quick-dial and priority emergency fleet hot-swap helpline for Hyderabad, Bengaluru, and Pune operations. 24/7 central control room support.",
  alternates: {
    canonical: "https://victor-mobility.vercel.app/india/emergency",
    languages: {
      "en-IN": "https://victor-mobility.vercel.app/india/emergency",
      "en-AE": "https://victor-mobility.vercel.app/uae/emergency",
    },
  },
};

export default function IndiaEmergencyPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Victor Mobility India 24/7 Operations Emergency Desk",
    description:
      "Emergency telephone hotline, breakdown hot-swap vehicle dispatch, and live operations assistance for corporate clients in India.",
    publisher: {
      "@type": "Organization",
      name: content.companyName,
      telephone: "+91 91007 77768",
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-xs font-bold tracking-widest uppercase text-rose-300">
                <PhoneCall className="w-3.5 h-3.5" />
                24/7 Central Operations Control
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Operations &amp; Emergency Quick-Dial
              </h1>
              <p className="text-base sm:text-lg text-brand-slate-light leading-relaxed">
                Connect immediately with our central fleet controllers for flight schedule changes, immediate vehicle hot-swaps, or emergency passenger support, backed by: <strong className="text-white">&ldquo;On Time Every Time.&rdquo;</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-brand-slate-light">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Immediate Duty Controller Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>15-Minute Depot Hot-Swap Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Women Safety Night Escort Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Dial Component */}
        <section className="py-12 sm:py-16 bg-brand-soft-neutral/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EmergencyQuickDial region="india" />
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
