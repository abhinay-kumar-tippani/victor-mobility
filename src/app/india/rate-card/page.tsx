import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EnterpriseRateCardDesk from '@/components/ratecard/EnterpriseRateCardDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import rateCardData from '@/content/rate-card.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Master Rate Card, Tariff Schedule & Retainers | Victor Mobility India',
  description:
    'Transparent corporate ground mobility tariffs, hourly rental slabs, monthly dedicated vehicle retainers, and volume discounts across Hyderabad, Bengaluru, and Pune.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/rate-card',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/rate-card',
      'en-AE': 'https://victor-mobility.vercel.app/uae/rate-card',
    },
  },
};

export default function IndiaRateCardPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const rateCardIndia = rateCardData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility Enterprise Master Rate Card & Contract Retainer Schedule',
    serviceType: 'Corporate Ground Transportation Rate Card & Retainer Services',
    description: rateCardIndia.description,
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
    termsOfService: 'https://victor-mobility.vercel.app/india/rate-card',
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
            <Link href="/india/billing" className="hover:text-amber-400 transition">
              Billing &amp; Invoicing
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Corporate Rate Card</span>
          </div>
        </div>

        {/* Interactive Rate Card Desk */}
        <EnterpriseRateCardDesk
          region="india"
          title={rateCardIndia.title}
          eyebrow={rateCardIndia.eyebrow}
          description={rateCardIndia.description}
          currency={rateCardIndia.currency}
          currencySymbol={rateCardIndia.currencySymbol}
          categories={rateCardIndia.categories}
          volumeTiers={rateCardIndia.volumeTiers}
          inclusions={rateCardIndia.inclusions}
          exclusions={rateCardIndia.exclusions}
          faqs={rateCardIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Corporate Commercial Desk"
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
