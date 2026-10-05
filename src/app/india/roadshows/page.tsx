import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ExecutiveRoadshowDesk from '@/components/roadshows/ExecutiveRoadshowDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import roadshowsData from '@/content/roadshows.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Multi-City Corporate Roadshows & Investor Delegation Transit Desk | Victor Mobility India',
  description:
    'Precision transit orchestration for institutional investor roadshows, private equity due diligence tours, and C-Suite executive delegations across Hyderabad, Bengaluru, and Pune.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/roadshows',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/roadshows',
      'en-AE': 'https://victor-mobility.vercel.app/uae/roadshows',
    },
  },
};

export default function IndiaRoadshowsPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const roadshowsIndia = roadshowsData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility Multi-City Corporate Roadshows & Investor Delegation Transit Desk',
    serviceType: 'Executive Roadshow & C-Suite Delegation Chauffeur Transportation',
    description: roadshowsIndia.description,
    provider: {
      '@type': 'Organization',
      name: content.companyName,
      url: 'https://victor-mobility.vercel.app/india',
      telephone: content.contact.phoneHref,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
    },
    termsOfService: 'https://victor-mobility.vercel.app/india/roadshows',
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
            <Link href="/india" className="hover:text-amber-400 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/india/services/chauffeur-luxury" className="hover:text-amber-400 transition">
              Chauffeur &amp; Luxury
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Executive Roadshow Desk</span>
          </div>
        </div>

        {/* Interactive Roadshow Desk */}
        <ExecutiveRoadshowDesk
          region="india"
          title={roadshowsIndia.title}
          eyebrow={roadshowsIndia.eyebrow}
          description={roadshowsIndia.description}
          spocModel={roadshowsIndia.spocModel}
          roadshowTiers={roadshowsIndia.roadshowTiers}
          sampleItineraries={roadshowsIndia.sampleItineraries}
          onboardAmenities={roadshowsIndia.onboardAmenities}
          securityAndNda={roadshowsIndia.securityAndNda}
          faqs={roadshowsIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dedicated Roadshow SPOC Control"
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
