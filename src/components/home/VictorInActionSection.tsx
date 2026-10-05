import { CheckCircle2, Shield, Calendar, MapPin, Users } from "lucide-react";

export default function VictorInActionSection() {
  return (
    <section id="case-story" className="py-14 sm:py-20 bg-brand-warm-white border-b border-brand-soft-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-blue block mb-2">
            Victor in Action
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-ink tracking-tight mb-3">
            Delivering precision when schedules cannot slip.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
            A documented operational scenario demonstrating how multi-city coordination and dedicated route oversight work in practice.
          </p>
        </div>

        {/* Case Study Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-brand-soft-neutral shadow-sm space-y-8">
          {/* Header Row with Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-brand-soft-neutral">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-indigo block mb-1">
                Completed Assignment Scenario
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-ink">
                Multi-City Executive Delegation Transit
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-warm-white border border-brand-soft-neutral text-xs font-semibold text-brand-ink">
                <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                <span>Hyderabad & Bengaluru</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% On-Time Protocol</span>
              </span>
            </div>
          </div>

          {/* Three-Column Breakdown: Scope -> Coordination -> Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
                <Calendar className="w-4 h-4" />
                <span>1. The Requirement</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                A 3-day board delegation requiring seamless airport arrivals, multi-venue meetings across Gachibowli and Electronic City, and evening executive dinner transit during peak metro traffic.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo">
                <Shield className="w-4 h-4" />
                <span>2. Victor&apos;s Coordination</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                Dedicated luxury sedans allocated 24 hours in advance; chauffeurs briefed on bypass corridors; real-time flight tracking at RGIA and Kempegowda; and a single operations controller in constant touch with the travel desk.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Documented Outcome</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
                Zero schedule delays across 14 executive movements. Seamless baggage-to-cabin handoffs, undisturbed in-car mobile workspace comfort, and full post-trip invoice reconciliation.
              </p>
            </div>
          </div>

          {/* Operational Assurance Footnote */}
          <div className="pt-6 border-t border-brand-soft-neutral flex items-center gap-3 text-xs text-brand-ink/70">
            <Users className="w-4 h-4 text-brand-blue shrink-0" />
            <span>
              Every corporate travel contract and occasion booking is assigned a dedicated operations supervisor for direct liaison.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
