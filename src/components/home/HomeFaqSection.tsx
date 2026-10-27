"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import indiaData from "@/content/india.json";
import { useLanguage } from "@/i18n/LanguageContext";

interface HomeFaqSectionProps {
  faqs?: Array<{ question: string; answer: string }>;
  copy?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: string;
  };
  contactHref?: string;
}

export default function HomeFaqSection({ faqs: propFaqs, copy: propCopy, contactHref }: HomeFaqSectionProps = {}) {
  const { dict, locale } = useLanguage();
  const isArabic = locale === "ar";
  const copy = (isArabic && dict.faq) ? dict.faq : (propCopy || dict.faq || indiaData.enquiryExperience.faq);
  const faqs = (isArabic && dict.faq?.items?.length) ? dict.faq.items : (propFaqs || dict.faq?.items || indiaData.faqs);
  const targetHref = contactHref || "/india/contact";

  return (
    <section id="questions" aria-labelledby="home-faq-title" className="border-b border-brand-soft-neutral bg-brand-warm-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-4 min-w-0">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">{copy.eyebrow}</p>
          <h2 id="home-faq-title" className="text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl break-words">{copy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-ink/75 break-words">{copy.description}</p>
          <Link href={targetHref} className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-bold text-brand-indigo underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo">
            <span>{copy.cta}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
        <div className="divide-y divide-brand-soft-neutral border-y border-brand-soft-neutral lg:col-span-8 min-w-0">
          {faqs.map(faq => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-bold text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-indigo [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 break-words pr-2">{faq.question}</span>
                <Plus className="h-5 w-5 shrink-0 text-brand-indigo group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-6 ltr:pr-7 rtl:pl-7 text-base leading-relaxed text-brand-ink/75 break-words">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
