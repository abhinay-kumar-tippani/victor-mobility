import type { Metadata } from "next";
import Image from "next/image";
import BrandLogo from "@/components/brand/BrandLogo";
import { Globe, Linkedin, Facebook, Instagram, Mail, ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect with Victor Mobility | Official Links",
  description:
    "Official destinations for Victor Mobility. Visit our corporate website or connect with our team on WhatsApp, Email, Instagram, LinkedIn, and Facebook.",
  alternates: { canonical: "/sociallinks" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Connect with Victor Mobility | Official Links",
    description:
      "Official destinations for Victor Mobility. Visit our corporate website or connect with our team on WhatsApp, Email, Instagram, LinkedIn, and Facebook.",
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

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string; "aria-hidden"?: boolean | "true" | "false" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
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
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/919100777768",
    Icon: WhatsAppIcon,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:info@victorluxurylimousine.com",
    Icon: Mail,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/victormobility.in",
    Icon: Instagram,
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
];

export default function SocialLinksPage() {
  const currentYear = new Date().getFullYear();
  const websiteDestination = DESTINATIONS[0];
  const contactDestinations = DESTINATIONS.slice(1);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col justify-center bg-brand-warm-white px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-[960px] flex-col">
        {/* Compact masthead with elegantly balanced Victor logo aligned with the left edge */}
        <header className="mb-5 flex justify-start sm:mb-6 lg:mb-8">
          <BrandLogo className="h-auto w-[185px] xs:w-[210px] sm:w-[245px] md:w-[270px] lg:w-[290px] aspect-[810/430] mix-blend-multiply" />
        </header>

        {/* 60/40 Composition Split on Desktop, Single Column on Mobile */}
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Column (~60%): Featured Website Card as a Link */}
            <a
              href={websiteDestination.href}
              className="group relative flex min-h-[220px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-brand-soft-neutral bg-brand-ink shadow-xs transition-all duration-200 hover:border-brand-indigo/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-brand-warm-white sm:min-h-[260px] lg:col-span-7 lg:min-h-[310px]"
              aria-label="Visit Victor’s website"
            >
              {/* Automotive fleet photography */}
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

            {/* Right Column (~40%): Contact & Social Panel */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-brand-ink sm:text-2xl">
                  Connect with Victor
                </h1>
              </div>

              {/* Shared white surface card with fine dividers */}
              <nav
                aria-label="Victor Mobility Social and Contact Profiles"
                className="mt-3.5 flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-brand-soft-neutral bg-white shadow-xs divide-y divide-brand-soft-neutral sm:mt-4"
              >
                {contactDestinations.map(({ id, label, href, Icon }) => (
                  <a
                    key={id}
                    href={href}
                    className="group flex min-h-[48px] flex-1 items-center justify-between px-4 py-2.5 text-[14px] font-semibold text-brand-ink transition-colors duration-150 hover:bg-brand-indigo/[0.04] active:bg-brand-warm-white focus:outline-none focus-visible:bg-brand-indigo/[0.06] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-indigo sm:min-h-[52px] sm:px-5 sm:py-3 sm:text-[15px]"
                  >
                    <span className="flex items-center gap-3 min-w-0 pr-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-brand-indigo transition-transform duration-150 group-hover:scale-105">
                        <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
                      </span>
                      <span className="truncate font-semibold text-brand-ink transition-colors group-hover:text-brand-indigo">
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
