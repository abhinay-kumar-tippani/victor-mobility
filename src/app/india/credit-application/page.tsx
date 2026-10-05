import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CorporateCreditDesk from '@/components/credit/CorporateCreditDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import creditData from '@/content/credit.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Corporate Account Onboarding & Credit Facility Application Desk | Victor Mobility India',
  description:
    'Establish an approved corporate credit account with Victor Mobility. Enjoy pre-approved monthly credit limits, 30-day net billing cycles, and automated Input Tax Credit (ITC) reconciliation.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/credit-application',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/credit-application',
      'en-AE': 'https://victor-mobility.vercel.app/uae/credit-application',
    },
  },
};

export default function IndiaCreditApplicationPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const creditIndia = creditData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility Corporate Account Onboarding & Credit Facility Application Desk',
    serviceType: 'Corporate Transportation Credit Account & 30-Day Billing Facility',
    description: creditIndia.description,
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
    termsOfService: 'https://victor-mobility.vercel.app/india/credit-application',
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
            <span className="text-slate-200 font-medium">Corporate Credit Facility</span>
          </div>
        </div>

        {/* Interactive Credit Desk */}
        <CorporateCreditDesk
          region="india"
          title={creditIndia.title}
          eyebrow={creditIndia.eyebrow}
          description={creditIndia.description}
          creditTiers={creditIndia.creditTiers}
          onboardingWorkflow={creditIndia.onboardingWorkflow}
          faqs={creditIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Corporate Treasury &amp; Onboarding Desk"
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
