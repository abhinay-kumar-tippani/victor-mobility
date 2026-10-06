import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Car,
  Compass,
  CheckCircle2,
  Phone,
  Plane,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Victor Mobility | On Time Every Time. | Select Region",
  description:
    "Victor Mobility delivers premium chauffeur services, corporate employee transit, and airport transfers across India and the United Arab Emirates. Choose your region.",
};

export default function GlobalGatewayPage() {
  return (
    <div className="min-h-screen bg-brand-ink text-white flex flex-col justify-between selection:bg-brand-violet selection:text-white relative overflow-hidden">
      {/* Background radial gradient & dot pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6E57A0_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-indigo/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Top Bar */}
      <header className="relative z-10 border-b border-brand-indigo/25 bg-brand-ink/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-white rounded-xl p-1 shadow-md">
              <Image
                src="/brand/victor-original.png"
                alt="Victor Mobility Original Artwork Logo"
                fill
                priority
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white block">
                VICTOR MOBILITY
              </span>
              <span className="text-[11px] sm:text-xs text-brand-soft-neutral/70 font-medium tracking-wider">
                On Time Every Time.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-soft-neutral/80 bg-brand-indigo/30 px-3 py-1.5 rounded-full border border-brand-violet/30">
            <Compass className="w-3.5 h-3.5 text-brand-violet" />
            <span className="hidden sm:inline">Global Operations Gateway</span>
            <span className="sm:hidden">Global Portal</span>
          </div>
        </div>
      </header>

      {/* Main Region Selection Section */}
      <main id="main-content" className="relative z-10 flex-1 flex flex-col justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full text-center space-y-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-indigo/40 border border-brand-violet/40 text-xs font-semibold tracking-wider uppercase text-brand-soft-neutral">
            <ShieldCheck className="w-4 h-4 text-brand-violet" />
            Authorized Cross-Border Executive Mobility
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Select Your Operating Region
          </h1>

          <p className="text-base sm:text-xl text-brand-soft-neutral/80 max-w-2xl mx-auto font-normal leading-relaxed">
            Choose your destination portal for corporate employee transit, luxury chauffeur hire, and airport meet-and-assist services.
          </p>
        </div>

        {/* Dual Region Portal Cards */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* INDIA CARD */}
          <div className="group relative bg-gradient-to-b from-brand-indigo/40 to-brand-ink/90 rounded-3xl p-8 sm:p-10 border border-brand-indigo/40 hover:border-brand-violet/70 transition-all duration-300 shadow-xl hover:shadow-brand-indigo/20 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl" role="img" aria-label="India Flag">🇮🇳</span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  Active Operations
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-soft-neutral/70">
                  Republic of India
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Victor Mobility India
                </h2>
                <p className="text-sm text-brand-soft-neutral/80 mt-2 leading-relaxed">
                  Enterprise employee commuting, luxury business saloons, and corporate event transit across India&apos;s leading tech and commerce corridors.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-brand-indigo/30 text-xs text-brand-soft-neutral/85">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-violet shrink-0" />
                  <span><strong>Hubs:</strong> Hyderabad, Bengaluru, Pune & PAN-India corridors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-violet shrink-0" />
                  <span><strong>Capabilities:</strong> Corporate cabs, executive MPVs, 12 to 50-seater coaches</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-violet shrink-0" />
                  <span><strong>Desk:</strong> +91 91007 77768 (24/7 Operations Control)</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/india"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white font-semibold transition-all duration-200 shadow-lg shadow-brand-violet/25 group-hover:translate-x-1"
              >
                <span>Enter India Portal</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* UAE CARD */}
          <div className="group relative bg-gradient-to-b from-brand-indigo/40 to-brand-ink/90 rounded-3xl p-8 sm:p-10 border border-brand-indigo/40 hover:border-brand-violet/70 transition-all duration-300 shadow-xl hover:shadow-brand-indigo/20 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl" role="img" aria-label="United Arab Emirates Flag">🇦🇪</span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/30">
                  Head Office & Corridors
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-soft-neutral/70">
                  United Arab Emirates
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Victor Mobility UAE
                </h2>
                <p className="text-sm text-brand-soft-neutral/80 mt-2 leading-relaxed">
                  First-class limousine transit, DXB/AUH airport VIP protocol, global summits, and enterprise fleet leasing across Dubai and Abu Dhabi.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-brand-indigo/30 text-xs text-brand-soft-neutral/85">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-violet shrink-0" />
                  <span><strong>Head Office:</strong> 65th St, Al Garhoud (Near DXB Airport), Dubai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-brand-violet shrink-0" />
                  <span><strong>Fleet Scale:</strong> 2,000+ Luxury Cars & 500+ Buses capability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-violet shrink-0" />
                  <span><strong>Desk:</strong> +971 52 455 2441 (Dubai Reservations)</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/uae"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-violet hover:bg-brand-violet-hover text-white font-semibold transition-all duration-200 shadow-lg shadow-brand-violet/25 group-hover:translate-x-1"
              >
                <span>Enter UAE Portal</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Founder Quote & Trust Banner */}
        <div className="max-w-4xl mx-auto w-full mt-16 pt-10 border-t border-brand-indigo/25 text-center">
          <blockquote className="text-base sm:text-lg text-brand-soft-neutral/90 italic font-serif">
            &ldquo;I am committed to providing unwavering service to my clients.&rdquo;
          </blockquote>
          <p className="text-xs font-semibold text-brand-violet mt-2 tracking-wide uppercase">
            Jahangir &mdash; Founder & Director, Victor Mobility
          </p>
        </div>
      </main>

      {/* Global Gateway Footer */}
      <footer className="relative z-10 border-t border-brand-indigo/25 bg-brand-ink/90 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-brand-soft-neutral/60 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/markets" className="text-brand-violet hover:text-white font-bold transition-colors">
            🌐 Global Regional Operations Gateway (/markets)
          </Link>
          <Link href="/india" className="hover:text-white transition-colors">
            India Operations
          </Link>
          <Link href="/uae" className="hover:text-white transition-colors">
            UAE Operations
          </Link>
          <Link href="/india/privacy" className="hover:text-white transition-colors">
            India Privacy
          </Link>
          <Link href="/uae/privacy" className="hover:text-white transition-colors">
            UAE Privacy
          </Link>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Victor Mobility. All rights reserved. Registered operations across India & UAE.
        </p>
      </footer>
    </div>
  );
}
