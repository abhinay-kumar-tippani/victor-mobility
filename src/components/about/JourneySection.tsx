import { Route } from "lucide-react";
import JourneyArtwork from "./JourneyArtwork";
import brand from "@/content/brand.json";
import journey from "@/content/journey.json";

export default function JourneySection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative overflow-hidden border-y border-brand-soft-neutral bg-[linear-gradient(125deg,#F7F8FE_0%,#FFFFFF_54%,#F6F5F2_100%)] py-10 text-brand-ink sm:py-12"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-brand-violet">{journey.eyebrow}</p>
            <h2 id="journey-heading" className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl lg:text-[2.65rem]">
              {journey.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-ink/75 sm:text-base">{journey.subtitle}</p>

            <div className="mt-6 flex items-center gap-3 text-brand-indigo" dir="ltr">
              <span className="text-2xl font-extrabold tabular-nums">2009</span>
              <span className="flex flex-1 items-center gap-2" aria-hidden="true">
                <span className="h-px flex-1 bg-brand-indigo/25" />
                <Route className="size-5" strokeWidth={1.5} />
                <span className="h-px flex-1 bg-brand-indigo/25" />
              </span>
              <span className="text-2xl font-extrabold tabular-nums">2025</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-brand-violet">{brand.tagline}</p>

            <div className="mt-6 space-y-2.5" aria-label="Journey chapters">
              {journey.chapters.map((chapter) => (
                <div key={chapter.milestoneId} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-brand-indigo/10 bg-white/85 px-4 py-3 shadow-[0_5px_18px_rgba(21,22,47,0.035)]">
                  <h3 className="text-sm font-bold text-brand-ink">{chapter.title}</h3>
                  <span dir="ltr" className="rounded-full bg-brand-violet/10 px-2 py-0.5 text-[11px] font-bold text-brand-violet">{chapter.years}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <JourneyArtwork />
          </div>
        </div>
      </div>
    </section>
  );
}
