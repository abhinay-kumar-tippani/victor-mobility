import Link from "next/link";
import { ArrowUpRight, Calculator, FileText } from "lucide-react";
import indiaData from "@/content/india.json";

export default function PlanningToolsSection() {
  const copy = indiaData.planningTools.home;
  return <section id="planning" aria-labelledby="planning-title" className="border-y border-brand-soft-neutral bg-brand-warm-white py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-9 max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-brand-blue">{copy.eyebrow}</p><h2 id="planning-title" className="mt-3 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">{copy.title}</h2><p className="mt-4 text-base leading-relaxed text-brand-ink/70">{copy.description}</p></div>
      <div className="grid gap-5 md:grid-cols-2">
        {(["estimator", "rfp"] as const).map(key => { const item = copy[key]; const dark = key === "rfp"; return <Link key={key} href={`/india/${key}`} className={`group flex flex-col rounded-2xl border p-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo sm:p-8 ${dark ? "border-brand-ink bg-brand-ink text-white hover:bg-brand-indigo" : "border-brand-soft-neutral bg-white text-brand-ink hover:border-brand-indigo/50"}`}>
          <div className="mb-8 flex items-center justify-between"><span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${dark ? "bg-white/10" : "bg-brand-indigo/10 text-brand-indigo"}`}>{key === "estimator" ? <Calculator className="h-6 w-6" aria-hidden="true" /> : <FileText className="h-6 w-6" aria-hidden="true" />}</span><span className={`text-sm font-semibold ${dark ? "text-white/45" : "text-brand-ink/40"}`}>{item.number}</span></div>
          <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3><p className={`mt-3 max-w-md text-base leading-relaxed ${dark ? "text-white/75" : "text-brand-ink/70"}`}>{item.description}</p><p className={`mb-7 mt-5 text-xs font-semibold ${dark ? "text-white/55" : "text-brand-ink/65"}`}>{item.detail}</p><div className={`mt-auto flex min-h-[44px] items-center justify-between border-t pt-5 text-sm font-bold ${dark ? "border-white/15" : "border-brand-soft-neutral text-brand-indigo"}`}>{item.cta}<ArrowUpRight className="h-5 w-5" aria-hidden="true" /></div>
        </Link>; })}
      </div>
    </div>
  </section>;
}
