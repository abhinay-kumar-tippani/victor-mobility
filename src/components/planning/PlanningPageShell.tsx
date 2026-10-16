import Link from "next/link";
import { ArrowRight, Calculator, FileText, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import indiaData from "@/content/india.json";
import mediaData from "@/content/media.json";

export default function PlanningPageShell({ active, children }: { active: "estimator" | "rfp"; children: React.ReactNode }) {
  const tools = indiaData.planningTools;
  const page = tools[active];
  return <div className="flex min-h-screen flex-col bg-brand-warm-white">
    <Header contact={indiaData.contact} />
    <main id="main-content" className="flex-1">
      <section className="relative overflow-hidden bg-brand-ink text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-indigo/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">{tools.eyebrow} / {page.eyebrow}</p>
          <div className="mt-5 flex items-start justify-between gap-10">
            <div className="max-w-3xl"><h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{page.title}</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{page.description}</p></div>
            <div aria-hidden="true" className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white/5 lg:flex">{active === "estimator" ? <Calculator className="h-10 w-10 text-white/80" /> : <FileText className="h-10 w-10 text-white/80" />}</div>
          </div>
          <nav aria-label="Planning tools" className="mt-9 flex flex-wrap gap-3 border-t border-white/15 pt-6">
            {(["estimator", "rfp"] as const).map(key => <Link key={key} href={`/india/${key}`} aria-current={active === key ? "page" : undefined} className={`inline-flex min-h-[48px] items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold ${active === key ? "border-white bg-white text-brand-indigo" : "border-white/25 text-white hover:bg-white/10"}`}>{key === "estimator" ? <Calculator className="h-4 w-4" aria-hidden="true" /> : <FileText className="h-4 w-4" aria-hidden="true" />}{tools.nav[key]}</Link>)}
          </nav>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">{children}</section>
      <section className="border-t border-brand-soft-neutral bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8"><div><h2 className="text-xl font-bold text-brand-ink">{tools.help.title}</h2><p className="mt-2 text-sm text-brand-ink/70">{tools.help.description}</p></div><div className="flex flex-wrap gap-x-6 gap-y-2"><Link href="/india/contact" className="inline-flex min-h-[44px] items-center gap-2 font-bold text-brand-indigo">{tools.help.contact}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><a href={indiaData.contact.phoneHref} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand-indigo"><Phone className="h-4 w-4" aria-hidden="true" />{tools.help.call}</a></div></div>
      </section>
    </main>
    <Footer contact={indiaData.contact} offices={indiaData.offices} mediaCaption={mediaData.caption} isoEnabled={indiaData.sourceClaims.iso?.enabled} />
  </div>;
}
