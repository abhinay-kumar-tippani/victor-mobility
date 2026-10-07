import Link from "next/link";
import { MessageSquare, Phone, ArrowRight, Calendar, Users, CheckCircle, ShieldCheck } from "lucide-react";
import type { ContactData } from "@/types/content";

interface ContactInvitationSectionProps {
  contact: ContactData;
}

export default function ContactInvitationSection({ contact }: ContactInvitationSectionProps) {
  const steps = [
    {
      num: "01",
      title: "Share your plan",
      desc: "Specify dates, passenger count, pickup corridors, or occasion requirements.",
    },
    {
      num: "02",
      title: "Discuss options",
      desc: "We confirm suitable vehicle categories, route timing, and transparent commercial terms.",
    },
    {
      num: "03",
      title: "Confirm arrangements",
      desc: "Receive formal booking documentation with guaranteed vehicle allocation and no hidden costs.",
    },
    {
      num: "04",
      title: "Journey coordination",
      desc: "A dedicated route controller monitors driver dispatch, terminal arrival, and passenger care.",
    },
  ];

  return (
    <section id="contact" tabIndex={-1} className="py-16 sm:py-24 bg-white focus:outline-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-violet block">
                Direct Coordination Desk
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Ready to coordinate your travel?
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
                Connect directly with our management desk for corporate employee transport, executive airport transfers, or wedding occasion logistics across Hyderabad, Bengaluru, and Pune.
              </p>
            </div>

            {/* 4-Step Process Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              {steps.map((step) => (
                <div key={step.num} className="space-y-2">
                  <span className="text-xs font-mono font-bold text-brand-blue">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Named Contact & Actions Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet block">
                  Named Operations Contact
                </span>
                <h4 className="text-lg font-bold text-white">
                  {contact.name}
                </h4>
                <p className="text-xs text-white/70">
                  {contact.role} · Victor Mobility Pvt. Ltd.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full md:w-auto">
                <Link
                  href="/india/contact"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white hover:bg-brand-warm-white text-brand-ink py-3 px-6 rounded-xl transition-colors shadow-xs text-center"
                >
                  <span>Discuss your requirement</span>
                  <ArrowRight className="w-4 h-4 text-brand-indigo" />
                </Link>

                <a
                  href={`https://wa.me/${contact.whatsappDigits}?text=Hello%20Mujeeb,%20I%20would%20like%20to%20discuss%20travel%20requirements%20with%20Victor%20Mobility.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 py-3 px-5 rounded-xl transition-colors text-center shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ({contact.whatsappDisplay})</span>
                </a>

                <a
                  href={contact.phoneHref}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold text-white/95 hover:text-white bg-white/10 hover:bg-white/20 py-3 px-4 rounded-xl border border-white/20 transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-violet" />
                  <span>Call {contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Note on WhatsApp action */}
            <p className="text-center text-xs text-white/70">
              Visiting our dedicated enquiry desk prepares a detailed WhatsApp draft for you to review and send directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
