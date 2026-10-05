import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TechParkCorridorDesk from '@/components/corridors/TechParkCorridorDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import corridorsData from '@/content/tech-corridors.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Tech Park & Commercial Corridor Transit Navigator | Victor Mobility India',
  description:
    'Dedicated corporate commute corridors, tech park security gate access, and high-occupancy shuttle routes across Hyderabad (Hitec City, Financial District), Bengaluru (Whitefield, ORR), and Pune (Hinjawadi, Kharadi).',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/corridors',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/corridors',
      'en-AE': 'https://victor-mobility.vercel.app/uae/corridors',
    },
  },
};

export default function IndiaCorridorsPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const corridorsIndia = corridorsData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility Tech Park & Commercial Corridor Transit Navigator',
    serviceType: 'Corporate Employee Commute & Tech Park Bus Shuttle Services',
    description: corridorsIndia.description,
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
      { '@type': 'Place', name: 'Hitec City, Hyderabad' },
      { '@type': 'Place', name: 'Financial District, Hyderabad' },
      { '@type': 'Place', name: 'Whitefield, Bengaluru' },
      { '@type': 'Place', name: 'Outer Ring Road, Bengaluru' },
      { '@type': 'Place', name: 'Hinjawadi Infotech Park, Pune' },
      { '@type': 'Place', name: 'EON Free Zone Kharadi, Pune' },
    ],
    termsOfService: 'https://victor-mobility.vercel.app/india/corridors',
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
            <Link href="/india/services/employee-transportation" className="hover:text-amber-400 transition">
              Employee Transportation
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Tech Park Corridors</span>
          </div>
        </div>

        {/* Interactive Corridors Desk */}
        <TechParkCorridorDesk
          region="india"
          title={corridorsIndia.title}
          eyebrow={corridorsIndia.eyebrow}
          description={corridorsIndia.description}
          cities={corridorsIndia.cities}
          shiftModels={corridorsIndia.shiftModels}
          faqs={corridorsIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Corridor Transit Control"
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
