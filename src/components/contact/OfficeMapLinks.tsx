import { MapPin, Navigation } from "lucide-react";
import type { OfficeItem } from "@/types/content";

export default function OfficeMapLinks({ office }: { office: OfficeItem }) {
  if (!office.published) return null;
  const queryTarget = office.mapQuery || office.address;
  const encodedQuery = encodeURIComponent(queryTarget);
  const searchUrl = office.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;
  const style =
    "inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-brand-indigo hover:bg-brand-indigo/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${office.city} office in Google Maps (opens in new tab)`}
        className={style}
      >
        <MapPin className="h-4 w-4 shrink-0 text-brand-indigo" aria-hidden="true" />
        <span>Google Maps</span>
      </a>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${office.city} office in Google Maps (opens in new tab)`}
        className={style}
      >
        <Navigation className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
        <span>Get directions</span>
      </a>
    </div>
  );
}
