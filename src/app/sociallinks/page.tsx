import type { Metadata } from "next";
import BrandLogo from "@/components/brand/BrandLogo";
import { Globe, Linkedin, Facebook, Instagram, ArrowRight } from "lucide-react";

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

  return (
    <div className="flex min-h-[100dvh] w-full flex-col justify-between bg-brand-warm-white px-4 py-8 sm:py-12 md:py-16">
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[460px] flex-1 flex-col items-center justify-center text-center focus:outline-none"
      >
        {/* Header Block: Original Victor Logo + Tagline */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <BrandLogo className="h-auto w-[190px] aspect-[810/430] mix-blend-multiply sm:w-[220px]" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-brand-ink sm:mt-5 sm:text-2xl">
            Connect with Victor Mobility
          </h1>
        </div>

        {/* Vertical Stack: Exactly 4 destinations in requested order */}
        <nav
          aria-label="Victor Mobility Destinations"
          className="mt-6 flex w-full flex-col gap-3 sm:mt-8"
        >
          {DESTINATIONS.map(({ id, label, href, isPrimary, Icon }) => (
            <a
              key={id}
              href={href}
              className={`group flex min-h-[56px] w-full items-center justify-between rounded-2xl px-5 py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-150 active:scale-[0.985] active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-brand-warm-white sm:text-base ${
                isPrimary
                  ? "border border-brand-indigo bg-brand-indigo text-white shadow-xs hover:border-brand-blue hover:bg-brand-blue hover:shadow-md active:bg-[#202149]"
                  : "border border-brand-soft-neutral bg-white text-brand-ink shadow-xs hover:border-brand-indigo/40 hover:bg-white hover:shadow-md hover:shadow-brand-ink/5 active:bg-brand-warm-white"
              }`}
            >
              {/* Left Platform Icon (indigo on secondary, white on primary) */}
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center ${
                  isPrimary ? "text-white" : "text-brand-indigo"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              {/* Centered / Left-Aligned Label */}
              <span className="flex-1 px-3.5 text-left font-semibold">
                {label}
              </span>

              {/* Right Small Arrow Indicator */}
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5 ${
                  isPrimary ? "text-white/85 group-hover:text-white" : "text-brand-indigo/60 group-hover:text-brand-indigo"
                }`}
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.2} />
              </span>
            </a>
          ))}
        </nav>
      </main>

      {/* Subtle brand copyright */}
      <footer className="mx-auto mt-8 w-full max-w-[460px] text-center text-xs font-medium text-brand-ink/55">
        <p>&copy; {currentYear} Victor Mobility Pvt. Ltd. &middot; On Time Every Time.</p>
      </footer>
    </div>
  );
}
