import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EnterpriseSlaDesk from '@/components/sla/EnterpriseSlaDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import slaData from '@/content/sla.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Corporate SLA & RTA Regulatory Quality Framework | Victor Mobility UAE',
  description:
    'Review Victor Mobility UAE luxury limousine SLAs, Dubai RTA compliance, 99.6% on-time protocol guarantee, 15-minute hot-swap replacement, and FTA VAT invoicing across Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/sla',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/sla',
      'en-AE': 'https://victor-mobility.vercel.app/uae/sla',
    },
  },
};

export default function UaeSlaPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const slaUae = slaData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Corporate SLA & RTA Regulatory Framework',
    serviceType: 'Luxury Chauffeur & VIP Transit SLA',
    description: slaUae.description,
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
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Sharjah' },
    ],
    termsOfService: 'https://victor-mobility.vercel.app/uae/sla',
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
            <span className="text-slate-200 font-medium">UAE SLA &amp; RTA Standards</span>
          </div>
        </div>

        {/* Interactive Enterprise SLA Desk */}
        <EnterpriseSlaDesk
          region="uae"
          title={slaUae.title}
          eyebrow={slaUae.eyebrow}
          description={slaUae.description}
          corePillars={slaUae.corePillars}
          escalationHierarchy={slaUae.escalationHierarchy}
          statutoryCompliance={slaUae.statutoryCompliance}
          serviceTiers={slaUae.serviceTiers}
          faqs={slaUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dubai Dispatch Control"
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
