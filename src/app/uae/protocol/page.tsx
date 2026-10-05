import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AirportProtocolDesk from '@/components/protocol/AirportProtocolDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import protocolData from '@/content/protocol.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Airport VIP Concierge & FBO Protocol Desk | Victor Mobility UAE',
  description:
    'Distinguished airport VIP protocol across Dubai (DXB T1/T2/T3, Al Majlis VIP, DWC Jetex FBO) and Abu Dhabi (AUH Terminal A). Live radar flight tracking, luxury greeting, and diplomatic limousine staging.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/protocol',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/protocol',
      'en-AE': 'https://victor-mobility.vercel.app/uae/protocol',
    },
  },
};

export default function UaeAirportProtocolPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const protocolUae = protocolData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Airport VIP Concierge & FBO Protocol Desk',
    serviceType: 'Luxury Airport Chauffeur & FBO Aviation Protocol',
    description: protocolUae.description,
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
    areaServed: [
      { '@type': 'Airport', name: 'Dubai International Airport', iataCode: 'DXB' },
      { '@type': 'Airport', name: 'Al Maktoum International Airport', iataCode: 'DWC' },
      { '@type': 'Airport', name: 'Zayed International Airport', iataCode: 'AUH' },
    ],
    termsOfService: 'https://victor-mobility.vercel.app/uae/protocol',
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
            <Link href="/uae/services/airport-transfers" className="hover:text-amber-400 transition">
              Airport Transfers
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">UAE VIP &amp; FBO Protocol Desk</span>
          </div>
        </div>

        {/* Interactive Airport Protocol Desk */}
        <AirportProtocolDesk
          region="uae"
          title={protocolUae.title}
          eyebrow={protocolUae.eyebrow}
          description={protocolUae.description}
          protocolStandards={protocolUae.protocolStandards}
          airports={protocolUae.airports}
          fleetCapacities={protocolUae.fleetCapacities}
          faqs={protocolUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dubai Airport Dispatch Desk"
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
