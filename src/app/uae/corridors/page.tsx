import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TechParkCorridorDesk from '@/components/corridors/TechParkCorridorDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import corridorsData from '@/content/tech-corridors.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Commercial Corridor & Free Zone Transit Navigator | Victor Mobility UAE',
  description:
    'Dedicated executive transit corridors, free zone staging access, and campus shuttle convoys across Dubai (DIFC, Internet City, JAFZA) and Abu Dhabi (ADGM).',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/corridors',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/corridors',
      'en-AE': 'https://victor-mobility.vercel.app/uae/corridors',
    },
  },
};

export default function UaeCorridorsPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const corridorsUae = corridorsData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Commercial Corridor & Free Zone Transit Navigator',
    serviceType: 'Executive Corridor & Free Zone Corporate Shuttle Services',
    description: corridorsUae.description,
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
      { '@type': 'Place', name: 'DIFC, Dubai' },
      { '@type': 'Place', name: 'Dubai Internet City, Dubai' },
      { '@type': 'Place', name: 'Expo City Dubai & JAFZA, Dubai' },
      { '@type': 'Place', name: 'Abu Dhabi Global Market (ADGM), Abu Dhabi' },
    ],
    termsOfService: 'https://victor-mobility.vercel.app/uae/corridors',
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
            <span className="text-slate-200 font-medium">UAE Commercial Corridors</span>
          </div>
        </div>

        {/* Interactive Corridors Desk */}
        <TechParkCorridorDesk
          region="uae"
          title={corridorsUae.title}
          eyebrow={corridorsUae.eyebrow}
          description={corridorsUae.description}
          cities={corridorsUae.cities}
          shiftModels={corridorsUae.shiftModels}
          faqs={corridorsUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dubai Corridor Transit Control"
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
