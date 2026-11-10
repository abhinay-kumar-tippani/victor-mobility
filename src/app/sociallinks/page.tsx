import type { Metadata } from "next";
import Image from "next/image";
import BrandLogo from "@/components/brand/BrandLogo";
import { Globe, Linkedin, Facebook, Instagram, ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect with Victor Mobility | Official Links",
  description:
    "Official destinations for Victor Mobility. Visit our corporate website or connect with our team on LinkedIn, Facebook, and Instagram.",
  alternates: { canonical: "/sociallinks" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Connect with Victor Mobility | Official Links",
    description:
      "Official destinations for Victor Mobility. Visit our corporate website or connect with our team on LinkedIn, Facebook, and Instagram.",
    url: "/sociallinks",
    type: "website",
  },
};

interface SocialDestination {
  id: string;
  label: string;
  href: string;
  isPrimary?: boolean;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

const DESTINATIONS: SocialDestination[] = [
  {
    id: "website",
    label: "Visit Victor’s website",
    href: "https://victormobility.in",
    isPrimary: true,
    Icon: Globe,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/victormobility",
    Icon: Linkedin,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/victormobility.in",
    Icon: Facebook,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/victormobility.in",
    Icon: Instagram,
  },
];

export default function SocialLinksPage() {
  const currentYear = new Date().getFullYear();
  const websiteDestination = DESTINATIONS[0];
  const socialDestinations = DESTINATIONS.slice(1);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col justify-center bg-brand-warm-white px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-[960px] flex-col">
        {/* Masthead with maximized Victor logo aligned with the left edge */}
        <header className="mb-6 flex justify-start sm:mb-8 lg:mb-10">
          <BrandLogo className="h-auto w-full max-w-[280px] aspect-[810/430] mix-blend-multiply xs:max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px]" />
        </header>

        {/* 60/40 Composition Split on Desktop, Single Column on Mobile */}
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Column (~60%): Featured Website Card as a Link */}
            <a
              href={websiteDestination.href}
              className="group relative flex min-h-[220px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-brand-soft-neutral bg-brand-ink shadow-xs transition-all duration-200 hover:border-brand-indigo/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-brand-warm-white sm:min-h-[260px] lg:col-span-7 lg:min-h-[290px]"
              aria-label="Visit Victor’s website"
            >
              {/* Automotive fleet illustration */}
              <Image
                src="/images/india/luxury-fleet-lineup.jpg"
                alt="Victor Mobility executive and corporate vehicle fleet"
                fill
                priority
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />

              {/* Dark ink overlay scrim placed strictly behind the bottom action text */}
              <div className="relative z-10 flex items-center justify-between bg-gradient-to-t from-brand-ink/90 via-brand-ink/55 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
                <span className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white sm:text-lg">
                  <Globe className="h-5 w-5 shrink-0 text-white/90" aria-hidden="true" />
                  <span>Visit Victor’s website</span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-white/90 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5"
                    aria-hidden="true"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </a>

            {/* Right Column (~40%): Social Panel */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-brand-ink sm:text-2xl">
                  Connect with Victor
                </h1>
              </div>

              {/* Shared white surface card with fine dividers */}
              <nav
                aria-label="Victor Mobility Social Profiles"
                className="mt-3.5 flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-brand-soft-neutral bg-white shadow-xs divide-y divide-brand-soft-neutral sm:mt-4"
              >
                {socialDestinations.map(({ id, label, href, Icon }) => (
                  <a
                    key={id}
                    href={href}
                    className="group flex min-h-[52px] flex-1 items-center justify-between px-5 py-3.5 text-[15px] font-semibold text-brand-ink transition-colors duration-150 hover:bg-brand-indigo/[0.04] active:bg-brand-warm-white focus:outline-none focus-visible:bg-brand-indigo/[0.06] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-indigo sm:min-h-[56px] sm:text-base"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-brand-indigo transition-transform duration-150 group-hover:scale-105">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-semibold text-brand-ink transition-colors group-hover:text-brand-indigo">
                        {label}
                      </span>
                    </span>

                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-brand-indigo/60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-brand-indigo">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.2} />
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </main>

        {/* Brand Copyright aligned close to the composition */}
        <footer className="mt-6 flex justify-start text-xs font-medium text-brand-ink/55 sm:mt-8">
          <p>&copy; {currentYear} Victor Mobility Pvt. Ltd. &middot; On Time Every Time.</p>
        </footer>
      </div>
    </div>
  );
}
