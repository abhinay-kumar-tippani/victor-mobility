import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CorporateCreditDesk from '@/components/credit/CorporateCreditDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import creditData from '@/content/credit.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Corporate Account & Commercial Credit Facility Desk | Victor Mobility UAE',
  description:
    'Establish a formalized corporate credit facility with Victor Mobility LLC. Enjoy pre-approved monthly credit limits in AED, 30-day net settlement terms, and compliant electronic VAT invoices across Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/credit-application',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/credit-application',
      'en-AE': 'https://victor-mobility.vercel.app/uae/credit-application',
    },
  },
};

export default function UaeCreditApplicationPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const creditUae = creditData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Corporate Account & Commercial Credit Facility Desk',
    serviceType: 'Corporate Limousine Credit Facility & Commercial Account Onboarding',
    description: creditUae.description,
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
    termsOfService: 'https://victor-mobility.vercel.app/uae/credit-application',
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
            <span className="text-slate-200 font-medium">Corporate Credit Facility</span>
          </div>
        </div>

        {/* Interactive Credit Desk */}
        <CorporateCreditDesk
          region="uae"
          title={creditUae.title}
          eyebrow={creditUae.eyebrow}
          description={creditUae.description}
          creditTiers={creditUae.creditTiers}
          onboardingWorkflow={creditUae.onboardingWorkflow}
          faqs={creditUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 UAE Corporate Credit &amp; Onboarding Desk"
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
