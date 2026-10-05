import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FleetTcoCalculatorDesk from '@/components/tco/FleetTcoCalculatorDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import tcoData from '@/content/tco.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Corporate Fleet TCO & Executive Retainer Transition Desk | Victor Mobility UAE',
  description:
    'Institutional Total Cost of Ownership (TCO) financial model comparing commercial fleet leasing, corporate taxi accounts, and Victor Mobility UAE dedicated luxury limousine retainers across Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/tco-calculator',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/tco-calculator',
      'en-AE': 'https://victor-mobility.vercel.app/uae/tco-calculator',
    },
  },
};

export default function UaeTcoPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const tcoUae = tcoData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Victor Mobility UAE Corporate Fleet TCO & Executive Retainer Transition Calculator',
    applicationCategory: 'BusinessApplication',
    description: tcoUae.description,
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
            <Link href="/uae/rate-card" className="hover:text-amber-400 transition">
              Rate Card &amp; Retainers
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Fleet TCO Calculator</span>
          </div>
        </div>

        {/* Interactive TCO Desk */}
        <FleetTcoCalculatorDesk
          region="uae"
          title={tcoUae.title}
          eyebrow={tcoUae.eyebrow}
          description={tcoUae.description}
          currency={tcoUae.currency}
          currencyCode={tcoUae.currencyCode}
          fuelPricePerLitre={tcoUae.fuelPricePerLitre}
          vehicleCategories={tcoUae.vehicleCategories}
          comparisonModels={tcoUae.comparisonModels}
          riskTransferMatrix={tcoUae.riskTransferMatrix}
          faqs={tcoUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 UAE Fleet Financial Advisory"
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
