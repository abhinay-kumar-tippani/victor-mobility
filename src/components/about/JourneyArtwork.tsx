import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import journey from "@/content/journey.json";
import artwork from "@/content/journey-artwork.json";

export default function JourneyArtwork() {
  return (
    <figure className="mx-auto w-full max-w-[34rem]" lang="en" dir="ltr">
      <a
        href={journey.imageSrc}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the full-size Journey of Victor image in a new tab"
        className="block overflow-hidden rounded-3xl border border-brand-indigo/15 bg-white shadow-[0_22px_65px_rgba(21,22,47,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-indigo"
      >
        <Image
          src={journey.imageSrc}
          alt="The Journey of Victor infographic: thirteen milestones from the idea in 2009 to advancing sustainable mobility in 2025. A text version is available below."
          width={1254}
          height={1254}
          sizes="(max-width: 640px) 100vw, 544px"
          unoptimized
          className="block h-auto w-full"
        />
      </a>

      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-1 px-1 text-xs text-brand-ink/65">
        <span className="font-semibold tabular-nums text-brand-indigo">2009 — 2025</span>
        <a
          href={journey.imageSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 font-semibold text-brand-indigo underline-offset-4 hover:text-brand-violet hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
        >
          Open full-size image <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <span className="w-full text-xs sm:hidden">Open the full-size image to zoom in, or read the milestones below.</span>
      </figcaption>

      <details className="group mt-2 rounded-2xl border border-brand-indigo/10 bg-white/80 text-brand-ink">
        <summary className="flex min-h-11 cursor-pointer items-center px-5 py-3 text-sm font-semibold text-brand-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-indigo">
          Read the milestones as text
          <ChevronDown className="ms-auto h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
        </summary>
        <ol className="grid gap-4 border-t border-brand-soft-neutral px-5 py-5 sm:grid-cols-2">
          {artwork.milestones.map((milestone, index) => (
            <li key={`${milestone.date}-${index}`} className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-violet">{milestone.date}</p>
              <h3 className="mt-1 text-sm font-bold text-brand-ink">{milestone.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-brand-ink/70">{milestone.description}</p>
            </li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
