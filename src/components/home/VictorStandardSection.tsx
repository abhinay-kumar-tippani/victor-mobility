import Link from "next/link";
import { Clock, ShieldCheck, Sparkles, FileText, ArrowRight } from "lucide-react";

export default function VictorStandardSection() {
  const standards = [
    {
      icon: Clock,
      title: "Precision Scheduling & Flight Tracking",
      description:
        "Real-time flight monitoring at RGIA (HYD), Kempegowda (BLR), and Pune (PNQ). Chauffeurs arrive 15 minutes before landing with complimentary waiting allowances.",
    },
    {
      icon: ShieldCheck,
      title: "Chauffeur Professionalism & Vetting",
      description:
        "Experienced, background-verified professionals trained in executive etiquette, discretion, defensive driving, and optimal city bypass routes.",
    },
    {
      icon: Sparkles,
      title: "Cabin Cleanliness & Pre-Dispatch Audits",
      description:
        "Rigorous multi-point vehicle checks before every assignment covering dual-zone climate control, leather upholstery, mobile charging, and sanitization.",
    },
    {
      icon: FileText,
      title: "Transparent Commercial Governance",
      description:
        "Pre-agreed corporate terms, clear hourly and distance packages, and formal billing with zero unexpected surcharges.",
    },
  ];

  return (
    <section id="standards" className="py-14 sm:py-20 bg-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            The Victor Standard
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Why organisations and families trust our delivery.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            Market leadership is built on repeatable operational discipline. We enforce four tangible standards across every executive transfer, occasion convoy, and workplace shuttle.
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

        {/* Compact route to all 6 services */}
        <div className="mt-10 p-6 rounded-2xl bg-brand-warm-white border border-brand-soft-neutral flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-medium text-brand-ink/80">
            Looking for specific fleet allocations or workplace commute corridors?
          </p>
          <Link
            href="/india/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-brand-indigo hover:text-white text-brand-indigo px-4 py-2.5 rounded-xl border border-brand-soft-neutral transition-colors shadow-2xs"
          >
            <span>Explore all 6 service specialisations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
