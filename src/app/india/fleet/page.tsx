import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IndiaFleetSection from "@/components/fleet/IndiaFleetSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";

export const metadata: Metadata = {
  title: "Fleet & Vehicle Categories | Victor Mobility India",
  description: indiaData.fleetPresentation.pageDescription,
};

export default function FleetPage() {
  return <div className="flex min-h-screen flex-col bg-white">
    <Header contact={indiaData.contact} />
    <main id="main-content" className="flex-1">
      <IndiaFleetSection categories={indiaData.fleetCategories} copy={indiaData.fleetPresentation} standalone />
      <section className="bg-brand-ink text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8"><div><p className="text-xs font-bold uppercase tracking-widest text-white/65">{indiaData.planningTools.rfp.eyebrow}</p><h2 className="mt-3 text-2xl font-semibold">{indiaData.planningTools.home.rfp.title}</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">{indiaData.planningTools.home.rfp.description}</p></div><Link href="/india/rfp" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-indigo">{indiaData.planningTools.home.rfp.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></section>
    </main>
    <Footer contact={indiaData.contact} offices={indiaData.offices} mediaCaption={mediaData.caption} isoEnabled={indiaData.sourceClaims.iso?.enabled} />
  </div>;
}
