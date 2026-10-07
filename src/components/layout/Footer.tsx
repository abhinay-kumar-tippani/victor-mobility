"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare } from "lucide-react";
import type { ContactData, OfficeItem } from "@/types/content";
import BrandLogo from "@/components/brand/BrandLogo";

interface FooterProps { contact: ContactData; offices: OfficeItem[]; mediaCaption: string; isoEnabled?: boolean; }

export default function Footer({ contact, offices, mediaCaption, isoEnabled = false }: FooterProps) {
  const isUae = usePathname().startsWith("/uae");
  const prefix = isUae ? "/uae" : "/india";
  const groups = [
    { title: "Explore", links: [[`${prefix}/services`, "Services"], [`${prefix}/fleet`, "Fleet"], [`${prefix}/about`, "About Victor"], [`${prefix}#network`, "Our locations"], ["/markets", "Our markets"]] },
    { title: "For businesses", links: [[`${prefix}/business`, "All business resources"], [`${prefix}/rfp`, "Request a proposal"], [`${prefix}/estimator`, "Plan a route"], [`${prefix}/portal`, "Portal demonstration"], [`${prefix}/contact`, "Contact our team"]] },
  ];
  return <footer className="bg-brand-ink text-white border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 lg:gap-8 mb-10">
        <div className="col-span-2 lg:col-span-3 space-y-4">
          <div className="inline-block rounded-xl bg-white p-3"><BrandLogo className="w-44 h-12" /></div>
          <p className="text-sm leading-relaxed text-brand-soft-neutral/80 max-w-sm">{isUae ? "Executive and corporate travel in Dubai and Abu Dhabi." : "Travel for people, teams and occasions in Hyderabad, Bengaluru and Pune."}</p>
          {isoEnabled && <p className="text-xs text-brand-soft-neutral/80">ISO 9001:2015 Quality Commitment</p>}
        </div>
        {groups.map((group) => <nav key={group.title} aria-label={`Footer ${group.title}`} className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white mb-2">{group.title}</h2>
          <ul>{group.links.map(([href,label]) => <li key={href}><Link href={href} className="flex items-center min-h-[44px] py-2 text-sm text-brand-soft-neutral/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded">{label}</Link></li>)}</ul>
        </nav>)}
        <div className="col-span-2 lg:col-span-5 lg:pl-6">
          <h2 className="text-sm font-semibold mb-3">Contact Victor</h2>
          <p className="font-semibold text-sm">{contact.name}</p><p className="text-sm text-brand-soft-neutral/75 mt-1">{contact.role}</p>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:gap-5 mt-3">
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 min-h-[44px] text-sm text-brand-soft-neutral/90 hover:text-white"><Phone className="w-4 h-4 shrink-0" />{contact.phoneDisplay}</a>
            <a href={`${contact.whatsappBaseUrl}?text=${encodeURIComponent("Hello Victor Mobility, I would like to discuss a transport requirement.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[44px] text-sm text-brand-soft-neutral/90 hover:text-white"><MessageSquare className="w-4 h-4 shrink-0" />WhatsApp</a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-brand-soft-neutral/75">{offices.filter(o=>o.published).map(o=>`${o.city} · ${o.label}`).join(" / ")}</p>
        </div>
      </div>
      <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row flex-wrap justify-between gap-x-6 gap-y-3 text-xs text-brand-soft-neutral/75">
        <p>© {new Date().getFullYear()} Victor Mobility. On Time Every Time.</p>
        <Link href={`${prefix}/privacy`} className="underline underline-offset-4">Privacy notice</Link>
        <p className="italic">{mediaCaption}</p>
      </div>
    </div>
  </footer>;
}
