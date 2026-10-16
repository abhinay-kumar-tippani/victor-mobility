import { ArrowUpRight, Bus } from "lucide-react";
import indiaData from "@/content/india.json";

export default function PartnerEnquirySection() {
  const copy = indiaData.enquiryExperience.partner;
  return (
    <section id="partners" aria-labelledby="partner-title" className="border-t border-brand-soft-neutral bg-brand-warm-white py-12 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex max-w-2xl items-start gap-4">
          <Bus className="mt-1 h-7 w-7 shrink-0 text-brand-indigo" aria-hidden="true" />
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">{copy.eyebrow}</p>
            <h2 id="partner-title" className="text-2xl font-extrabold text-brand-ink">{copy.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-ink/75">{copy.description}</p>
          </div>
        </div>
        <div className="max-w-sm md:shrink-0">
          <a href={`${indiaData.contact.whatsappBaseUrl}?text=${encodeURIComponent(copy.message)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-indigo px-5 py-3 text-sm font-bold text-white hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo">
            {copy.cta}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-3 text-xs leading-relaxed text-brand-ink/65">{copy.helper}</p>
        </div>
      </div>
    </section>
  );
}
