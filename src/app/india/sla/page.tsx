import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EnterpriseSlaDesk from '@/components/sla/EnterpriseSlaDesk';
import indiaData from '@/content/india.json';
import mediaData from '@/content/media.json';
import slaData from '@/content/sla.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import { ShieldCheck, Clock, FileCheck2, Headphones } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Service Level Agreement (SLA) & Quality Assurance | Victor Mobility India',
  description:
    'Review Victor Mobility enterprise transit SLAs, 99.4% on-time guarantee, 20-minute hot-swap replacement, statutory GST/labor compliance, and 4-tier escalation across Hyderabad, Bengaluru, and Pune.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/india/sla',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/sla',
      'en-AE': 'https://victor-mobility.vercel.app/uae/sla',
    },
  },
};

export default function IndiaSlaPage() {
  const content = indiaData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const slaIndia = slaData.india;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility Enterprise Service Level Agreement (SLA) Framework',
    serviceType: 'Corporate Transportation & Fleet Logistics SLA',
    description: slaIndia.description,
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
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Bengaluru' },
      { '@type': 'City', name: 'Pune' },
    ],
    termsOfService: 'https://victor-mobility.vercel.app/india/sla',
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
            <Link href="/india/rfp" className="hover:text-amber-400 transition">
              Enterprise RFP
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">SLA &amp; Compliance Desk</span>
          </div>
        </div>

        {/* Interactive Enterprise SLA Desk */}
        <EnterpriseSlaDesk
          region="india"
          title={slaIndia.title}
          eyebrow={slaIndia.eyebrow}
          description={slaIndia.description}
          corePillars={slaIndia.corePillars}
          escalationHierarchy={slaIndia.escalationHierarchy}
          statutoryCompliance={slaIndia.statutoryCompliance}
          serviceTiers={slaIndia.serviceTiers}
          faqs={slaIndia.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Central Operations Control"
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
