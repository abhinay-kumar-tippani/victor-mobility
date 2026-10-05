import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorDueDiligenceDesk from '@/components/duediligence/VendorDueDiligenceDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import dueDiligenceData from '@/content/due-diligence.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Vendor Due Diligence & Institutional Procurement Vault | Victor Mobility India',
  description:
    'Institutional vendor due diligence records, multi-state GSTIN registrations, EPF/ESIC statutory labour certifications, and commercial motor liability insurance manifests for corporate procurement.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/due-diligence',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/due-diligence',
      'en-AE': 'https://victor-mobility.vercel.app/uae/due-diligence',
    },
  },
};

export default function IndiaDueDiligencePage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const dueDiligenceIndia = dueDiligenceData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility Enterprise Vendor Due Diligence & Institutional Procurement Vault',
    serviceType: 'Corporate Vendor Due Diligence, Statutory Labour Compliance & Institutional Procurement',
    description: dueDiligenceIndia.description,
    provider: {
      '@type': 'Organization',
      name: content.companyName,
      url: 'https://victor-mobility.vercel.app/india',
      telephone: content.contact.phoneHref,
      address: {
        '@type': 'PostalAddress',
        streetAddress: dueDiligenceIndia.entity.headOffice,
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500032',
        addressCountry: 'IN',
      },
    },
    termsOfService: 'https://victor-mobility.vercel.app/india/due-diligence',
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
            <Link href="/india/sla" className="hover:text-amber-400 transition">
              Enterprise SLA
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Vendor Due Diligence</span>
          </div>
        </div>

        {/* Interactive Due Diligence Desk */}
        <VendorDueDiligenceDesk
          region="india"
          title={dueDiligenceIndia.title}
          eyebrow={dueDiligenceIndia.eyebrow}
          description={dueDiligenceIndia.description}
          entity={dueDiligenceIndia.entity}
          statutoryPillars={dueDiligenceIndia.statutoryPillars}
          codeOfConduct={dueDiligenceIndia.codeOfConduct}
          faqs={dueDiligenceIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Corporate Legal & Compliance Desk"
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
