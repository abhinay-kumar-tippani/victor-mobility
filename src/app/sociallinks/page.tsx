import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect with Victor | Official Channels",
  description:
    "Official destinations for Victor Mobility Pvt. Ltd. Connect with us on our Website, LinkedIn, Facebook, Instagram, and WhatsApp.",
  alternates: { canonical: "/sociallinks" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Connect with Victor | Official Channels",
    description:
      "Stay connected with Victor Mobility Pvt. Ltd. for the latest corporate mobility updates, fleet additions, and company announcements.",
    url: "/sociallinks",
    type: "website",
  },
};

interface SocialDestination {
  id: string;
  name: string;
  description: string;
  href: string;
  renderIcon: () => React.ReactNode;
}

/**
 * 1. Official Website Icon
 * Professional globe icon in white on Victor's signature navy & purple brand gradient.
 * Perfectly centered in a 24x24 viewBox.
 */
function WebsiteOfficialIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#15162F] via-[#2E2866] to-[#7C3AED] text-white shadow-xs transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
      <svg
        className="h-6 w-6 fill-none stroke-current stroke-2 sm:h-7 sm:w-7"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    </div>
  );
}

/**
 * 2. Official LinkedIn Icon
 * Official white 'in' mark on LinkedIn brand blue (#0A66C2).
 * Perfectly centered in a 24x24 viewBox.
 */
function LinkedInOfficialIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A66C2] text-white shadow-xs transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
      <svg
        className="h-6 w-6 fill-current sm:h-7 sm:w-7"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    </div>
  );
}

/**
 * 3. Official Facebook Icon
 * Official white 'f' symbol on Facebook brand blue (#0866FF).
 * Perfectly centered in a 24x24 viewBox.
 */
function FacebookOfficialIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0866FF] text-white shadow-xs transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
      <svg
        className="h-6 w-6 fill-current sm:h-7 sm:w-7"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.71-.14-2.84 0-4.79 1.73-4.79 4.92v2.58H7v4h3V22h4v-8.5z" />
      </svg>
    </div>
  );
}

/**
 * 4. Official Instagram Icon
 * Official camera glyph in crisp white on Instagram's recognizable multi-colour gradient.
 * Perfectly centered in a 24x24 viewBox.
 */
function InstagramOfficialIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FFB703] via-[#FD1D1D] to-[#833AB4] text-white shadow-xs transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
      <svg
        className="h-6 w-6 fill-current sm:h-7 sm:w-7"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </div>
  );
}

/**
 * 5. Official WhatsApp Icon
 * Official phone and chat-bubble symbol on WhatsApp brand green (#25D366).
 * From official Simple Icons specification.
 */
function WhatsAppOfficialIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-xs transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
      <svg
        className="h-6 w-6 fill-current sm:h-7 sm:w-7"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </div>
  );
}

/**
 * All five destinations in exact requested order:
 * 1. Website
 * 2. LinkedIn
 * 3. Facebook
 * 4. Instagram
 * 5. WhatsApp
 */
const SOCIAL_DESTINATIONS: SocialDestination[] = [
  {
    id: "website",
    name: "Website",
    description: "Explore our services and fleet.",
    href: "https://victormobility.in/",
    renderIcon: WebsiteOfficialIcon,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Corporate updates, insights and opportunities",
    href: "https://www.linkedin.com/company/victormobility",
    renderIcon: LinkedInOfficialIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "News, events and company updates",
    href: "https://www.facebook.com/victormobility.in",
    renderIcon: FacebookOfficialIcon,
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Our journeys, people and highlights",
    href: "https://www.instagram.com/victormobility.in",
    renderIcon: InstagramOfficialIcon,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Quick connect with our team",
    href: "https://wa.me/919100777768",
    renderIcon: WhatsAppOfficialIcon,
  },
];

export default function SocialLinksPage() {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-x-hidden bg-[#FAF9FE] text-[#15162F] selection:bg-purple-100 selection:text-purple-900">
      {/* Top subtle ambient lavender gradient */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Centered Content Area */}
      <main className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-8">
        {/* ========================================================================= */}
        {/* DESKTOP HEADER (Top Left aligned logo & company name)                     */}
        {/* ========================================================================= */}
        <header className="hidden lg:block">
          <Link
            href="https://victormobility.in"
            className="group inline-flex flex-col items-start rounded-lg p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
            aria-label="Visit Victor Mobility website"
          >
            {/* Simple Victor wordmark logo without horse */}
            <div className="relative h-12 w-44">
              <Image
                src="/brand/victor-simple.png"
                alt="Victor"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
            {/* Company legal name */}
            <span className="mt-1 text-[13px] font-semibold tracking-tight text-slate-800 transition-colors group-hover:text-violet-700">
              Victor Mobility Pvt. Ltd.
            </span>
          </Link>
        </header>

        {/* ========================================================================= */}
        {/* MOBILE HEADER (Centered logo & company name matching mobile reference)     */}
        {/* ========================================================================= */}
        <header className="flex flex-col items-center text-center lg:hidden">
          <Link
            href="https://victormobility.in"
            className="group flex flex-col items-center rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
            aria-label="Visit Victor Mobility website"
          >
            <div className="relative h-11 w-40">
              <Image
                src="/brand/victor-simple.png"
                alt="Victor"
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="mt-0.5 text-xs font-semibold tracking-tight text-slate-800">
              Victor Mobility Pvt. Ltd.
            </span>
          </Link>
        </header>

        {/* ========================================================================= */}
        {/* HERO SECTION: Typography on Left & Complete Vehicle Image on Right         */}
        {/* ========================================================================= */}
        <section className="mt-4 sm:mt-6 lg:mt-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Eyebrow, Heading with Logo, Tagline & Copy */}
            <div className="text-center lg:col-span-6 lg:text-left">
              <span className="inline-block text-[11px] font-extrabold tracking-[0.22em] text-[#543571] uppercase sm:text-xs">
                OFFICIAL CHANNELS
              </span>

              {/* Main Heading: "Connect with [Simple Victor Logo]" on the SAME horizontal line */}
              <div className="mt-2 flex items-center justify-center lg:justify-start">
                <h1 className="inline-flex flex-nowrap items-center text-[23px] font-black tracking-tight text-[#15162F] min-[360px]:text-[26px] min-[390px]:text-[28px] sm:text-[34px] lg:text-[40px] xl:text-[42px] leading-tight whitespace-nowrap">
                  <span className="shrink-0">Connect with</span>
                  <span className="relative ml-2 inline-flex shrink-0 items-center min-[360px]:ml-2.5 lg:ml-3">
                    <Image
                      src="/brand/victor-simple.png"
                      alt="Victor"
                      width={2172}
                      height={724}
                      priority
                      className="h-[28px] w-auto min-[360px]:h-[31px] min-[390px]:h-[33px] sm:h-[40px] lg:h-[46px] xl:h-[48px] object-contain"
                    />
                  </span>
                </h1>
              </div>

              <p className="mt-1 text-sm font-medium italic text-[#15162F] sm:text-base lg:mt-1.5 lg:text-[17px]">
                On Time Every Time.
              </p>

              <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-relaxed lg:mx-0 lg:mt-3.5 lg:max-w-md">
                Stay connected with us for the latest updates, service announcements, fleet additions, and company news.
              </p>
            </div>

            {/* Right Column: Hero Vehicle Artwork (Desktop) */}
            {/* Shows complete vehicle: front, rear, body, roof and wheels on pavement */}
            <div className="relative hidden lg:col-span-6 lg:block">
              <div className="relative aspect-[1025/717] w-full overflow-hidden">
                <Image
                  src="/images/hero-vehicle-desktop-perfect.png"
                  alt="Victor Mobility premium fleet vehicle outside corporate headquarters"
                  fill
                  priority
                  sizes="(min-width: 1024px) 650px, 100vw"
                  className="object-contain object-right"
                />
              </div>
            </div>

            {/* Mobile Hero Vehicle Artwork */}
            {/* Full unclipped vehicle in landscape card with generous ground clearance */}
            <div className="mt-4 w-full lg:hidden">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[340px] overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src="/images/hero-vehicle-mobile-perfect.png"
                  alt="Victor Mobility premium fleet vehicle outside corporate headquarters"
                  fill
                  priority
                  sizes="(max-width: 768px) 340px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SOCIAL MEDIA CARDS: 5-Card Grid on Desktop, Stacked on Mobile             */}
        {/* ========================================================================= */}
        <section
          aria-label="Official Social Media Channels"
          className="mt-8 mb-10 sm:mt-10 sm:mb-12 lg:mt-8 lg:mb-10"
        >
          {/* Desktop 5-Card Horizontal Row (Website, LinkedIn, Facebook, Instagram, WhatsApp) */}
          <div className="hidden grid-cols-5 gap-3.5 lg:grid lg:gap-4 xl:gap-5">
            {SOCIAL_DESTINATIONS.map(({ id, name, description, href, renderIcon }) => {
              const IconComponent = renderIcon;
              return (
                <a
                  key={id}
                  href={href}
                  className="group relative flex flex-col items-center justify-between rounded-3xl border border-purple-50/80 bg-white p-5 xl:p-6 text-center shadow-[0_12px_36px_rgba(124,58,237,0.06),0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_20px_42px_rgba(124,58,237,0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                >
                  {/* Top: Official Platform Icon */}
                  <div className="shrink-0">
                    <IconComponent />
                  </div>

                  {/* Middle: Platform Name and Description */}
                  <div className="mt-4 flex flex-1 flex-col justify-center">
                    <h2 className="text-lg font-bold text-[#15162F] transition-colors group-hover:text-violet-700">
                      {name}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 min-h-[36px]">
                      {description}
                    </p>
                  </div>

                  {/* Bottom: Lavender circular arrow button */}
                  <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F3EFFC] text-[#7C3AED] transition-all duration-300 group-hover:bg-[#7C3AED] group-hover:text-white group-hover:shadow-xs">
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Mobile Vertically Stacked 5 Cards */}
          <div className="flex flex-col gap-2.5 lg:hidden">
            {SOCIAL_DESTINATIONS.map(({ id, name, description, href, renderIcon }) => {
              const IconComponent = renderIcon;
              return (
                <a
                  key={id}
                  href={href}
                  className="group flex min-h-[64px] items-center justify-between rounded-2xl border border-purple-50/80 bg-white px-3.5 py-3 shadow-[0_4px_16px_rgba(124,58,237,0.04)] transition-all duration-200 active:scale-[0.985] active:bg-violet-50/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                >
                  <div className="flex min-w-0 items-center gap-3.5 pr-2">
                    {/* Official Platform Icon on left */}
                    <div className="shrink-0">
                      <IconComponent />
                    </div>

                    {/* Platform Name and Description in middle */}
                    <div className="min-w-0 text-left">
                      <h2 className="text-sm font-bold text-[#15162F]">
                        {name}
                      </h2>
                      <p className="truncate text-[11px] text-slate-500">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Circular Right Arrow on right */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EFFC] text-[#7C3AED] transition-colors group-hover:bg-[#7C3AED] group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* FOOTER: Layered Flowing Purple Waves & Midnight Navy Surface              */}
      {/* ========================================================================= */}
      <footer className="relative mt-auto w-full bg-[#0B0824] text-white">
        {/* Layered Flowing Waves at the top of the footer */}
        <div className="relative -mt-8 w-full overflow-hidden leading-none sm:-mt-10 lg:-mt-14">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-10 w-full sm:h-14 lg:h-18"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Background Layer: Smooth Purple Ribbon Wave */}
            <path
              d="M0,32 C320,78 540,8 920,42 C1180,66 1360,22 1440,16 L1440,90 L0,90 Z"
              fill="url(#footer-wave-purple)"
              opacity="0.95"
            />
            {/* Foreground Layer: Midnight Navy Base Wave */}
            <path
              d="M0,50 C280,22 620,68 1060,32 C1240,16 1370,46 1440,40 L1440,90 L0,90 Z"
              fill="#0B0824"
            />
            <defs>
              <linearGradient id="footer-wave-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#4C1D95" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Footer Content Area */}
        <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between px-4 pb-7 pt-2 sm:px-6 sm:pb-8 lg:flex-row lg:px-8 lg:pb-8">
          {/* Desktop Left / Mobile Centered: Location Icon, Company Name, Tagline */}
          <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2 lg:flex-row lg:items-center lg:text-left">
            <Link
              href="https://victormobility.in"
              className="flex items-center gap-2 rounded-sm hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-400"
              aria-label="Victor Mobility Pvt. Ltd. website"
            >
              <MapPin className="h-4 w-4 text-[#8B5CF6] shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
                Victor Mobility Pvt. Ltd.
              </span>
            </Link>
            <span className="hidden text-violet-400/60 lg:inline" aria-hidden="true">
              |
            </span>
            <span className="text-xs font-medium italic text-[#A78BFA] sm:text-sm">
              On Time Every Time.
            </span>
          </div>

          {/* Desktop Right: Fleet Line-Art Illustrations (Sedan, SUV, Bus) */}
          <div className="mt-3 hidden items-center gap-4 lg:mt-0 lg:flex">
            <Image
              src="/images/footer-fleet-silhouettes-2x.png"
              alt="Victor Mobility Fleet: Sedan, SUV, Bus"
              width={220}
              height={42}
              className="h-5 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
