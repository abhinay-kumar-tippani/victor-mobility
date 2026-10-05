import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CorporateBillingDesk from '@/components/billing/CorporateBillingDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import billingData from '@/content/billing.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Corporate Billing, FTA VAT & Electronic Invoicing Desk | Victor Mobility UAE',
  description:
    'UAE Federal Tax Authority (FTA) compliant 5% VAT invoices, 30-day net corporate credit, transparent Salik toll logs, and digital duty slip reconciliation in Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/billing',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/billing',
      'en-AE': 'https://victor-mobility.vercel.app/uae/billing',
    },
  },
};

export default function UaeBillingPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const billingUae = billingData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Corporate Billing & FTA VAT Electronic Invoicing Desk',
    serviceType: 'Corporate Transportation Billing & VAT Invoicing Services',
    description: billingUae.description,
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
    termsOfService: 'https://victor-mobility.vercel.app/uae/billing',
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
            <span className="text-slate-200 font-medium">UAE Billing &amp; Invoicing</span>
          </div>
        </div>

        {/* Interactive Billing Desk */}
        <CorporateBillingDesk
          region="uae"
          title={billingUae.title}
          eyebrow={billingUae.eyebrow}
          description={billingUae.description}
          taxFramework={billingUae.taxFramework}
          creditTerms={billingUae.creditTerms}
          sampleDutySlips={billingUae.sampleDutySlips}
          faqs={billingUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dubai Accounts Desk"
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
