"use client";

import Link from "next/link";
import { Award, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import type { IndiaContent } from "@/types/content";
import { selectEnquiryOption } from "@/lib/enquiryEvents";

interface AboutSectionProps {
  content: IndiaContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { about, sourceClaims, faqs } = content;

  return (
    <section id="about" tabIndex={-1} className="py-20 sm:py-28 bg-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Company Overview */}
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-widest font-bold text-brand-blue mb-3">
              About Victor Mobility
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mb-6 leading-tight">
              {about.title}
            </h2>
            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed mb-6">
              {about.description}
            </p>

            <div className="p-6 bg-brand-warm-white rounded-2xl border border-brand-soft-neutral mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-ink/70 mb-3">
                Key Operational Pillars
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-brand-ink">
                  <CheckCircle className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                  <span>
                    <strong>Punctual Scheduling:</strong> Dedicated dispatch protocols backing our promise: &ldquo;On Time Every Time.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-ink">
                  <CheckCircle className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                  <span>
                    <strong>Multi-Tier Fleet:</strong> Everything from corporate daily shuttles and executive sedans to luxury limousines.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-ink">
                  <CheckCircle className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Account Management:</strong> Single point of contact for corporate contracts and travel coordinators.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <Link
                href="/india/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-brand-blue transition-colors"
              >
                <span>Read our full company story & leadership standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quality Standard Claim: Strictly honoured per sourceClaims.iso.enabled */}
            {sourceClaims.iso?.enabled && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-indigo/5 border border-brand-indigo/15">
                <Award className="w-5 h-5 text-brand-indigo shrink-0" />
                <div className="text-xs text-brand-ink/80">
                  <span className="font-bold text-brand-ink">{sourceClaims.iso.text}</span>
                  <span className="block text-brand-ink/60 mt-0.5">
                    Commitment to quality management and transport service reliability.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Clarifications & FAQs */}
          <div className="lg:col-span-6 bg-brand-warm-white rounded-2xl p-8 sm:p-10 border border-brand-soft-neutral">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-brand-blue" />
              <h3 className="text-xl font-bold text-brand-ink">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-6 divide-y divide-brand-soft-neutral/70">
              {faqs.map((faq, idx) => (
                <div key={faq.question} className={idx > 0 ? "pt-6" : ""}>
                  <h4 className="text-sm font-bold text-brand-ink mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-brand-soft-neutral flex items-center justify-between">
              <span className="text-xs text-brand-ink/60">
                Primary hubs: {about.coverage}
              </span>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  selectEnquiryOption({ note: "Enquiring about general transport requirement." });
                }}
                className="text-xs font-bold text-brand-indigo hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-indigo rounded px-1"
              >
                {about.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
