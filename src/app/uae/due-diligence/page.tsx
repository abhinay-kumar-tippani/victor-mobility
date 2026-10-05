import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorDueDiligenceDesk from '@/components/duediligence/VendorDueDiligenceDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import dueDiligenceData from '@/content/due-diligence.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Corporate Due Diligence, RTA Licensing & Compliance Vault | Victor Mobility UAE',
  description:
    'Institutional corporate records, Dubai DED commercial licensing, RTA luxury limousine permits, and Federal Tax Authority (FTA) TRN verification for multinational enterprises.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/due-diligence',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/due-diligence',
      'en-AE': 'https://victor-mobility.vercel.app/uae/due-diligence',
    },
  },
};

export default function UaeDueDiligencePage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const dueDiligenceUae = dueDiligenceData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Corporate Due Diligence, RTA Licensing & Compliance Vault',
    serviceType: 'Corporate Vendor Due Diligence, RTA Limousine Licensing & Commercial Procurement',
    description: dueDiligenceUae.description,
    provider: {
      '@type': 'Organization',
      name: content.companyName,
      url: 'https://victor-mobility.vercel.app/uae',
      telephone: content.contact.phoneHref,
      address: {
        '@type': 'PostalAddress',
        streetAddress: dueDiligenceUae.entity.headOffice,
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
    termsOfService: 'https://victor-mobility.vercel.app/uae/due-diligence',
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
            <Link href="/uae/sla" className="hover:text-amber-400 transition">
              Enterprise SLA
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Vendor Due Diligence</span>
          </div>
        </div>

        {/* Interactive Due Diligence Desk */}
        <VendorDueDiligenceDesk
          region="uae"
          title={dueDiligenceUae.title}
          eyebrow={dueDiligenceUae.eyebrow}
          description={dueDiligenceUae.description}
          entity={dueDiligenceUae.entity}
          statutoryPillars={dueDiligenceUae.statutoryPillars}
          codeOfConduct={dueDiligenceUae.codeOfConduct}
          faqs={dueDiligenceUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 UAE Corporate Compliance Desk"
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
