import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FleetSafetyAuditDesk from '@/components/safety/FleetSafetyAuditDesk';
import uaeData from '@/content/uae.json';
import mediaData from '@/content/media.json';
import safetyData from '@/content/safety.json';
import type { IndiaContent, MediaContent } from '@/types/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UAE Executive Fleet Safety, RTA Telematics & Security Audit Desk | Victor Mobility UAE',
  description:
    'Institutional executive fleet safety governance, Dubai Roads & Transport Authority (RTA) telemetry integration, 50-point vehicle inspections, and sovereign diplomatic transit security across Dubai and Abu Dhabi.',
  alternates: {
    canonical: 'https://victor-mobility.vercel.app/uae/safety',
    languages: {
      'en-IN': 'https://victor-mobility.vercel.app/india/safety',
      'en-AE': 'https://victor-mobility.vercel.app/uae/safety',
    },
  },
};

export default function UaeSafetyPage() {
  const content = uaeData as unknown as IndiaContent;
  const media = mediaData as unknown as MediaContent;
  const safetyUae = safetyData.uae;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Victor Mobility UAE Executive Fleet Safety, RTA Telematics & Security Audit Desk',
    serviceType: 'Executive Limousine Safety & RTA Telematics Audit Services',
    description: safetyUae.description,
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
    termsOfService: 'https://victor-mobility.vercel.app/uae/safety',
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
              SLA &amp; Governance
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">UAE Fleet Safety</span>
          </div>
        </div>

        {/* Interactive Safety Desk */}
        <FleetSafetyAuditDesk
          region="uae"
          title={safetyUae.title}
          eyebrow={safetyUae.eyebrow}
          description={safetyUae.description}
          auditCategories={safetyUae.auditCategories}
          telematicsHardware={safetyUae.telematicsHardware}
          womenSafetyProtocol={safetyUae.womenSafetyProtocol}
          faqs={safetyUae.faqs}
          phone={content.contact.phoneDisplay}
          whatsapp={content.contact.whatsappDisplay}
          supportHours="24/7 Dubai Executive Limousine Safety Desk"
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
