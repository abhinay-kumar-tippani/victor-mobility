import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EnterpriseRateCardDesk from '@/components/ratecard/EnterpriseRateCardDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import rateCardData from '@/content/rate-card.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Executive Limousine & Commercial Rate Card | Victor Mobility UAE',
  description:
    'Transparent executive limousine tariffs, hourly airport transfers, and monthly dedicated retainers across Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/rate-card',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/rate-card',
      'en-AE': 'https://victor-mobility.vercel.app/uae/rate-card',
    },
  },
};

export default function UaeRateCardPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const rateCardUae = rateCardData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Executive Limousine & Commercial Rate Card',
    serviceType: 'Executive Limousine Tariff & Retainer Services',
    description: rateCardUae.description,
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
    termsOfService: 'https://victor-mobility.vercel.app/uae/rate-card',
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
            <Link href="/uae/billing" className="hover:text-amber-400 transition">
              Billing &amp; Invoicing
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">UAE Limousine Rate Card</span>
          </div>
        </div>

        {/* Interactive Rate Card Desk */}
        <EnterpriseRateCardDesk
          region="uae"
          title={rateCardUae.title}
          eyebrow={rateCardUae.eyebrow}
          description={rateCardUae.description}
          currency={rateCardUae.currency}
          currencySymbol={rateCardUae.currencySymbol}
          categories={rateCardUae.categories}
          volumeTiers={rateCardUae.volumeTiers}
          inclusions={rateCardUae.inclusions}
          exclusions={rateCardUae.exclusions}
          faqs={rateCardUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dubai Commercial Limousine Desk"
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
