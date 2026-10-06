import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlobalMarketsGateway from '@/components/markets/GlobalMarketsGateway';
import indiaData from '@/content/india.json';
import marketsData from '@/content/markets.json';
import mediaData from '@/content/media.json';

export const metadata: Metadata = {
  title: 'Global Regional Operations Gateway & Cross-Border Fleet Network | Victor Mobility',
  description:
    'Unified executive transportation infrastructure connecting India\'s premier technology corridors (Hyderabad, Bengaluru, Pune) with UAE commercial and financial centres (Dubai, Abu Dhabi). Master bilateral service agreements, dual currency invoicing, and dedicated cross-border operations.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/markets',
  },
  openGraph: {
    title: 'Global Regional Operations Gateway & Cross-Border Fleet Network | Victor Mobility',
    description:
      'Unified executive transportation infrastructure connecting India\'s premier technology corridors with UAE commercial and financial centres. Master bilateral service agreements and cross-border billing.',
    url: 'https://victor-mobility.vercel.app/markets',
    type: 'website',
  },
};

export default function MarketsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Victor Mobility',
    alternateName: ['Victor Mobility India', 'Victor Mobility UAE'],
    url: 'https://victor-mobility.vercel.app/markets',
    logo: 'https://victor-mobility.vercel.app/brand/victor-original.png',
    description: marketsData.description,
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+919100777768',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+971524552441',
        contactType: 'customer service',
        areaServed: 'AE',
        availableLanguage: ['en', 'ar'],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-brand-warm-white">
        <Header contact={indiaData.contact} />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <GlobalMarketsGateway
            title={marketsData.title}
            eyebrow={marketsData.eyebrow}
            description={marketsData.description}
            regions={marketsData.regions}
            crossBorderSynergies={marketsData.crossBorderSynergies}
            faqs={marketsData.faqs}
            phone={indiaData.contact.phoneDisplay}
            whatsapp={indiaData.contact.whatsappDigits}
            supportHours="24/7 Central Operations Control"
          />
        </main>
        <Footer
          contact={indiaData.contact}
          offices={indiaData.offices}
          mediaCaption={mediaData.caption}
        />
      </div>
    </>
  );
}
