import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EmployeeShiftRosterDesk from '@/components/roster/EmployeeShiftRosterDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import rosterData from '@/content/roster.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Executive Shift Roster & Free Zone Corridor Logistics | Victor Mobility UAE',
  description:
    'Synchronized corporate delegation transit schedules, free zone employee shuttle rosters, and cross-emirate executive convoys in Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/roster',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/roster',
      'en-AE': 'https://victor-mobility.vercel.app/uae/roster',
    },
  },
};

export default function UaeRosterPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const rosterUae = rosterData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Executive Shift Roster & Free Zone Corridor Logistics Desk',
    serviceType: 'Executive Chauffeur Roster & Free Zone Shuttle Services',
    description: rosterUae.description,
    provider: {
      '@type': 'Organization',
      name: content.companyName,
      url: 'https://victor-mobility.vercel.app/uae',
      telephone: content.contact.phoneHref,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
    termsOfService: 'https://victor-mobility.vercel.app/uae/roster',
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="print:hidden">
        <Header contact={content.contact} />
      </div>

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Breadcrumb Bar */}
        <div className="print:hidden bg-slate-900/60 border-b border-slate-800 text-xs text-slate-400 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center gap-2">
            <Link href="/uae" className="hover:text-amber-400 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/uae/rfp" className="hover:text-amber-400 transition">
              Corporate RFP
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">UAE Shift Rosters</span>
          </div>
        </div>

        {/* Interactive Roster Desk */}
        <EmployeeShiftRosterDesk
          region="uae"
          title={rosterUae.title}
          eyebrow={rosterUae.eyebrow}
          description={rosterUae.description}
          shifts={rosterUae.shifts}
          sampleManifests={rosterUae.sampleManifests}
          optimizationRules={rosterUae.optimizationRules}
          faqs={rosterUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dubai Executive Logistics Desk"
        />
      </main>

      <div className="print:hidden">
        <Footer
          contact={content.contact}
          offices={content.offices}
          mediaCaption={media.caption}
          isoEnabled={false}
        />
      </div>
    </div>
  );
}
