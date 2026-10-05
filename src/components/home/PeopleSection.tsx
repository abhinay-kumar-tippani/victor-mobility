import Link from "next/link";
import { UserCheck, Phone, MessageSquare, ArrowRight, ShieldCheck, Headphones } from "lucide-react";
import type { ContactData } from "@/types/content";

interface PeopleSectionProps {
  contact: ContactData;
}

export default function PeopleSection({ contact }: PeopleSectionProps) {
  return (
    <section id="about" tabIndex={-1} className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Leadership & Accountability
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            The people behind Victor.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Every journey is backed by named, accountable leadership and round-the-clock operations coordinators who ensure our commitments are delivered on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Named Business Leadership */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-brand-soft-neutral shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-warm-white border border-brand-soft-neutral text-[11px] font-bold uppercase tracking-wider text-brand-indigo">
                  <UserCheck className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Commercial Leadership</span>
                </span>
                <span className="text-xs text-brand-ink/60 font-medium">Hyderabad HQ</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-ink">
                  {contact.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-brand-indigo">
                  {contact.role}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                Directing enterprise client partnerships, corporate transport governance, and multi-city fleet coordination across Hyderabad, Bengaluru, and Pune.
              </p>
            </div>

            <div className="pt-4 border-t border-brand-soft-neutral flex flex-wrap items-center gap-3">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-indigo bg-brand-warm-white hover:bg-brand-indigo hover:text-white px-4 py-2.5 rounded-xl border border-brand-soft-neutral transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call: {contact.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${contact.whatsappDigits}?text=Hello%20Mujeeb,%20I%20would%20like%20to%20discuss%20travel%20requirements%20with%20Victor%20Mobility.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-200 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Card 2: 24/7 Operations & Route Coordination */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-brand-soft-neutral shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-warm-white border border-brand-soft-neutral text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                  <Headphones className="w-3.5 h-3.5 text-brand-indigo" />
                  <span>24/7 Operations Desk</span>
                </span>
                <span className="text-xs text-brand-ink/60 font-medium">Pan-Regional</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-ink">
                  Operations & Dispatch Control
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-brand-indigo">
                  Flight Tracking, Driver Dispatch & Route Safety
                </p>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                Our central operations desk continuously monitors live airline radar, coordinates driver shift rotations, conducts vehicle quality audits, and provides immediate supervisor escalation for all active trips.
              </p>
            </div>

            <div className="pt-4 border-t border-brand-soft-neutral">
              <Link
                href="/india/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo hover:text-brand-blue transition-colors"
              >
                <span>Read our full company story & leadership standards</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
