import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect with Victor | Official Channels",
  description:
    "Official destinations for Victor Mobility Pvt. Ltd. Connect with us on LinkedIn, Facebook, Instagram, and WhatsApp.",
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
  iconBg: string;
  renderIcon: () => React.ReactNode;
}

function LinkedInIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A66C2] text-white shadow-sm sm:h-14 sm:w-14">
      <svg className="h-6 w-6 fill-current sm:h-7 sm:w-7" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    </div>
  );
}

function FacebookIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1877F2] text-white shadow-sm sm:h-14 sm:w-14">
      <svg className="h-6 w-6 fill-current sm:h-7 sm:w-7" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </div>
  );
}

function InstagramIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FFB703] via-[#FD1D1D] to-[#833AB4] text-white shadow-sm sm:h-14 sm:w-14">
      <svg className="h-6 w-6 fill-current sm:h-7 sm:w-7" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-sm sm:h-14 sm:w-14">
      <svg className="h-6 w-6 fill-current sm:h-7 sm:w-7" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </div>
  );
}

const SOCIAL_DESTINATIONS: SocialDestination[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Corporate updates, insights and opportunities",
    href: "https://www.linkedin.com/company/victormobility",
    iconBg: "bg-[#0A66C2]",
    renderIcon: LinkedInIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "News, events and company updates",
    href: "https://www.facebook.com/victormobility.in",
    iconBg: "bg-[#1877F2]",
    renderIcon: FacebookIcon,
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Our journeys, people and highlights",
    href: "https://www.instagram.com/victormobility.in",
    iconBg: "bg-gradient-to-tr from-[#FFB703] via-[#FD1D1D] to-[#833AB4]",
    renderIcon: InstagramIcon,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Quick connect with our team",
    href: "https://wa.me/919100777768",
    iconBg: "bg-[#25D366]",
    renderIcon: WhatsAppIcon,
  },
];

export default function SocialLinksPage() {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-x-hidden bg-[#FAF9FE] text-[#15162F] selection:bg-purple-100 selection:text-purple-900">
      {/* Subtle top-right ambient lavender glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Centered Container */}
      <main className="relative z-10 mx-auto flex w-full max-w-[1140px] flex-1 flex-col px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-8">
        {/* ========================================================================= */}
        {/* DESKTOP HEADER (Top Left aligned logo & company name)                     */}
        {/* ========================================================================= */}
        <header className="hidden lg:block">
          <Link
            href="https://victormobility.in"
            className="group inline-flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg p-1 -m-1"
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
            className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg p-1"
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
        {/* HERO SECTION: Typography on Left & Vehicle Artwork on Right               */}
        {/* ========================================================================= */}
        <section className="mt-4 sm:mt-6 lg:mt-6">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Heading & Copy */}
            <div className="text-center lg:col-span-6 lg:text-left">
              <span className="inline-block text-[11px] font-extrabold tracking-[0.22em] text-[#543571] uppercase sm:text-xs">
                OFFICIAL CHANNELS
              </span>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#15162F] sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                Connect with <span className="text-[#7C3AED]">Victor</span>
              </h1>

              <p className="mt-1 text-sm font-medium italic text-[#15162F] sm:text-base lg:mt-1.5 lg:text-[17px]">
                On Time Every Time.
              </p>

              <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-relaxed lg:mx-0 lg:mt-3.5 lg:max-w-md">
                Stay connected with us for the latest updates, service announcements, fleet additions, and company news.
              </p>
            </div>

            {/* Right Column: Hero Vehicle Artwork (Desktop) */}
            <div className="relative hidden lg:col-span-6 lg:block">
              <div className="relative w-full aspect-[395/295] overflow-hidden">
                <Image
                  src="/images/hero-art-desktop-seamless.png"
                  alt="Victor Mobility premium fleet vehicle outside corporate headquarters"
                  fill
                  priority
                  sizes="(min-width: 1024px) 580px, 100vw"
                  className="object-contain object-right"
                />
              </div>
            </div>

            {/* Mobile Hero Vehicle Artwork */}
            <div className="mt-4 w-full lg:hidden">
              <div className="relative mx-auto aspect-[404/200] w-full max-w-[360px] overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src="/images/hero-art-mobile-2x.png"
                  alt="Victor Mobility premium fleet vehicle outside corporate headquarters"
                  fill
                  priority
                  sizes="(max-width: 768px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SOCIAL MEDIA CARDS: 4-Column on Desktop, Stacked on Mobile               */}
        {/* ========================================================================= */}
        <section
          aria-label="Official Social Media Channels"
          className="mt-8 mb-10 sm:mt-10 sm:mb-12 lg:mt-9 lg:mb-10"
        >
          {/* Desktop 4-Card Horizontal Row */}
          <div className="hidden grid-cols-4 gap-4 lg:grid lg:gap-5 xl:gap-6">
            {SOCIAL_DESTINATIONS.map(({ id, name, description, href, renderIcon }) => {
              const IconComponent = renderIcon;
              return (
                <a
                  key={id}
                  href={href}
                  className="group relative flex flex-col items-center justify-between rounded-3xl border border-purple-50/80 bg-white p-6 text-center shadow-[0_12px_36px_rgba(124,58,237,0.06),0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_20px_42px_rgba(124,58,237,0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                >
                  {/* Top: Official Platform Icon */}
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <IconComponent />
                  </div>

                  {/* Middle: Name and Description */}
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
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Mobile Vertically Stacked Cards */}
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
                    {/* Platform Icon on the left */}
                    <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
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
        <div className="relative mx-auto flex w-full max-w-[1140px] flex-col items-center justify-between px-4 pb-7 pt-2 sm:px-6 sm:pb-8 lg:flex-row lg:px-8 lg:pb-8">
          {/* Desktop Left / Mobile Centered: Location Icon, Company Name, Tagline */}
          <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2 lg:flex-row lg:items-center lg:text-left">
            <Link
              href="https://victormobility.in"
              className="flex items-center gap-2 hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-400 rounded-sm"
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
