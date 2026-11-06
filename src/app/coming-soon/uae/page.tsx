import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import brand from "@/content/brand.json";

export const metadata: Metadata = {
  title: { absolute: "UAE website coming soon | Victor Mobility" },
  description: "Our UAE website is coming soon. Soon you’ll be able to explore our UAE fleet and services here.",
  alternates: { canonical: "/coming-soon/uae" },
  openGraph: {
    title: "UAE website coming soon | Victor Mobility",
    description: "Our UAE website is coming soon. Soon you’ll be able to explore our UAE fleet and services here.",
    url: "/coming-soon/uae",
  },
  twitter: {
    title: "UAE website coming soon | Victor Mobility",
    description: "Our UAE website is coming soon. Soon you’ll be able to explore our UAE fleet and services here.",
  },
};

export default function UaeComingSoonPage() {
  return (
    <div lang="en" className="flex min-h-screen flex-col bg-brand-warm-white">
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-8 focus:outline-none sm:px-6 sm:py-12 lg:px-8 lg:py-16"
      >
        {/* Centered two-panel feature card (approx 1120px max-width) */}
        <div className="w-full max-w-[1120px] overflow-hidden rounded-2xl border border-brand-soft-neutral bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {/* Mobile banner / Desktop right photograph (45%) */}
            <div className="order-1 lg:order-2 relative h-[160px] sm:h-[180px] lg:h-auto lg:w-[45%] shrink-0 overflow-hidden bg-brand-ink">
              <Image
                src="/images/uae/uae-hero.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 504px, 100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Content panel (55%) */}
            <div className="order-2 lg:order-1 flex w-full flex-col justify-center p-6 sm:p-8 lg:w-[55%] lg:p-12">
              {/* Brand Logo */}
              <div className="flex justify-start">
                <BrandLogo className="w-[210px] sm:w-[250px] lg:w-[300px] aspect-[810/430] h-auto mix-blend-multiply" />
              </div>

              {/* Eyebrow */}
              <p className="mt-6 text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.14em] text-brand-blue leading-normal">
                UNITED ARAB EMIRATES
              </p>

              {/* Main Headline */}
              <h1 className="mt-2.5 text-[28px] sm:text-[34px] lg:text-[38px] font-semibold leading-[1.2] sm:leading-[1.18] lg:leading-[1.15] tracking-tight text-brand-ink">
                Our UAE website is coming soon.
              </h1>

              {/* Supporting Line */}
              <p className="mt-3.5 max-w-xl text-base leading-relaxed text-brand-ink/75 sm:text-lg sm:leading-relaxed">
                Soon you’ll be able to explore our UAE fleet and services here.
              </p>

              {/* Navigation Actions */}
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href="/"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-brand-indigo px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-indigo/90 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
                >
                  Back to country selection
                </Link>
                <Link
                  href="/india"
                  className="inline-flex items-center gap-1.5 text-base font-semibold text-brand-indigo transition-colors hover:text-brand-indigo/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
                >
                  Visit our India website <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-brand-soft-neutral">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-brand-ink/65 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Victor Mobility</p>
          <p className="font-semibold text-brand-indigo">{brand.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
