import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ExecutiveRoadshowDesk from '@/components/roadshows/ExecutiveRoadshowDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import roadshowsData from '@/content/roadshows.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Executive Roadshow & Sovereign Delegation Transit Coordinator | Victor Mobility UAE',
  description:
    'Precision executive mobility for sovereign wealth fund delegations, global banking roadshows, and international trade missions across Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/roadshows',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/roadshows',
      'en-AE': 'https://victor-mobility.vercel.app/uae/roadshows',
    },
  },
};

export default function UaeRoadshowsPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const roadshowsUae = roadshowsData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Executive Roadshow & Sovereign Delegation Transit Coordinator',
    serviceType: 'Executive Roadshow, Diplomatic Motorcade & Sovereign Transit Services',
    description: roadshowsUae.description,
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
    termsOfService: 'https://victor-mobility.vercel.app/uae/roadshows',
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
            <Link href="/uae/services/chauffeur-luxury" className="hover:text-amber-400 transition">
              Chauffeur &amp; Luxury
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Executive Roadshow Desk</span>
          </div>
        </div>

        {/* Interactive Roadshow Desk */}
        <ExecutiveRoadshowDesk
          region="uae"
          title={roadshowsUae.title}
          eyebrow={roadshowsUae.eyebrow}
          description={roadshowsUae.description}
          spocModel={roadshowsUae.spocModel}
          roadshowTiers={roadshowsUae.roadshowTiers}
          sampleItineraries={roadshowsUae.sampleItineraries}
          onboardAmenities={roadshowsUae.onboardAmenities}
          securityAndNda={roadshowsUae.securityAndNda}
          faqs={roadshowsUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 UAE Roadshow Director Control"
        />
      </main>

      <div className="print:hidden">
        <Footer
          contact={content.contact}
          offices={content.offices}
          mediaCaption={media.caption}
          isoEnabled={content.sourceClaims?.iso?.enabled}
        />
      </div>
    </div>
  );
}
