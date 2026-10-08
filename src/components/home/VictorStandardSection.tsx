"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, ShieldCheck, Sparkles, FileText, ArrowRight } from "lucide-react";

export default function VictorStandardSection() {
  const pathname = usePathname();
  const isUae = pathname.startsWith("/uae");
  const prefix = isUae ? "/uae" : "/india";

  const standards = isUae
    ? [
        {
          icon: Clock,
          title: "Precision Flight Radar & Curbside Staging",
          description:
            "Real-time flight tracking at DXB, DWC, and AUH. Chauffeurs stage 20 minutes prior to landing with complimentary waiting allowances and VIP terminal nameboard greetings.",
        },
        {
          icon: ShieldCheck,
          title: "RTA Certified Executive Chauffeurs",
          description:
            "100% Dubai RTA licensed, professionally trained chauffeurs fluent in English, vetted for VIP executive etiquette, protocol discretion, and route navigation.",
        },
        {
          icon: Sparkles,
          title: "Pristine Cabin Luxury & Pre-Dispatch Audits",
          description:
            "Rigorous multi-point vehicle checks before every assignment covering dual-zone climate control, leather upholstery, mobile charging, and sanitization.",
        },
        {
          icon: FileText,
          title: "Transparent Commercial Governance & Billing",
          description:
            "Pre-agreed corporate retainer terms, transparent hourly packages, automated Salik toll reconciliation, and formal FTA VAT invoicing.",
        },
      ]
    : [
        {
          icon: Clock,
          title: "Precision Shift Scheduling & Buffer Management",
          description:
            "Real-time corridor monitoring and flight tracking at RGIA, Kempegowda, and Pune. Shift vehicles stage 15 minutes prior to roster timing with monitored departure windows.",
        },
        {
          icon: ShieldCheck,
          title: "100% Background-Verified Chauffeurs (BGV & PCC)",
          description:
            "Mandatory commercial driver license verification, comprehensive Police Clearance Certificates (PCC), defensive driving training, and route familiarity.",
        },
        {
          icon: Sparkles,
          title: "AIS-140 GPS Telematics & Female Safety Escorts",
          description:
            "Government-certified AIS-140 GPS units with dual SOS panic buttons, speed governors (80 km/h), pre-trip cabin hygiene audits, and verified night-shift female security protocols.",
        },
        {
          icon: FileText,
          title: "Transparent Commercial Governance & SLA Billing",
          description:
            "Pre-agreed corporate Master Services Agreements (MSAs), automated electronic trip sheets (e-logsheets), GST e-invoicing (SAC 9966), and zero unexpected surcharges.",
        },
      ];

  return (
    <section id="standards" className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Safety & Operational Rigour
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Enterprise compliance and safety standards you can audit.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Market leadership is built on repeatable operational discipline. We enforce four tangible compliance standards across every employee shuttle, corporate coach, and executive movement.
          </p>
        </div>

        {/* 2x2 Authoritative Standard Framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {standards.map((std, idx) => {
            const Icon = std.icon;
            return (
              <div
                key={std.title}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-brand-soft-neutral border-l-4 border-l-brand-indigo shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-warm-white border border-brand-soft-neutral flex items-center justify-center text-brand-indigo shadow-2xs">
                      <Icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <span className="text-xs font-bold text-brand-violet uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-warm-white border border-brand-soft-neutral">
                      Standard 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-ink mb-2">
                    {std.title}
                  </h3>
                  <p className="text-sm text-brand-ink/75 leading-relaxed">
                    {std.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact route to all services */}
        <div className="mt-10 p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-medium text-brand-ink/80">
            Looking for specific fleet allocations or workplace commute corridors?
          </p>
          <Link
            href={`${prefix}/services`}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-brand-indigo hover:text-white text-brand-indigo px-4 py-2.5 rounded-xl border border-brand-soft-neutral transition-colors shadow-2xs"
          >
            <span>Explore all service specialisations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
