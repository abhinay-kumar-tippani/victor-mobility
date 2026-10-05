import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AirportProtocolDesk from '@/components/protocol/AirportProtocolDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import protocolData from '@/content/protocol.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'VIP Airport Concierge & Flight Protocol Desk | Victor Mobility India',
  description:
    'Executive airport protocol across Hyderabad (RGIA), Bengaluru (KIA T1/T2), and Pune (PNQ). Live flight telemetry tracking, digital tablet greeting, and executive chauffeur staging.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/protocol',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/protocol',
      'en-AE': 'https://victor-mobility.vercel.app/uae/protocol',
    },
  },
};

export default function IndiaAirportProtocolPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const protocolIndia = protocolData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility VIP Airport Concierge & Flight Protocol Liaison Desk',
    serviceType: 'Executive Airport Transportation & Flight Greeting Protocol',
    description: protocolIndia.description,
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
    areaServed: [
      { '@type': 'Airport', name: 'Rajiv Gandhi International Airport', iataCode: 'HYD' },
      { '@type': 'Airport', name: 'Kempegowda International Airport', iataCode: 'BLR' },
      { '@type': 'Airport', name: 'Pune International Airport', iataCode: 'PNQ' },
    ],
    termsOfService: 'https://victor-mobility.vercel.app/india/protocol',
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
            <Link href="/india/services/airport-transfers" className="hover:text-amber-400 transition">
              Airport Transfers
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">VIP Flight Protocol Desk</span>
          </div>
        </div>

        {/* Interactive Airport Protocol Desk */}
        <AirportProtocolDesk
          region="india"
          title={protocolIndia.title}
          eyebrow={protocolIndia.eyebrow}
          description={protocolIndia.description}
          protocolStandards={protocolIndia.protocolStandards}
          airports={protocolIndia.airports}
          fleetCapacities={protocolIndia.fleetCapacities}
          faqs={protocolIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Airport Operations Desk"
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
