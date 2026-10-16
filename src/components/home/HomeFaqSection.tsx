"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import indiaData from "@/content/india.json";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HomeFaqSection() {
  const { dict } = useLanguage();
  const copy = dict.faq || indiaData.enquiryExperience.faq;
  const faqs = dict.faq?.items?.length ? dict.faq.items : indiaData.faqs;

  return (
    <section id="questions" aria-labelledby="home-faq-title" className="border-b border-brand-soft-neutral bg-brand-warm-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">{copy.eyebrow}</p>
          <h2 id="home-faq-title" className="text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-ink/75">{copy.description}</p>
          <Link href="/india/contact" className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-bold text-brand-indigo underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo">{copy.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="divide-y divide-brand-soft-neutral border-y border-brand-soft-neutral lg:col-span-8">
          {faqs.map(faq => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-bold text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo [&::-webkit-details-marker]:hidden">
                {faq.question}<Plus className="h-5 w-5 shrink-0 text-brand-indigo group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-6 pr-7 text-base leading-relaxed text-brand-ink/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
