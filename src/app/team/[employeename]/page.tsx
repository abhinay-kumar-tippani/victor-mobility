import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import EmployeeDigitalBusinessCard from "@/components/team/EmployeeDigitalBusinessCard";
import { getEmployeeBySlug } from "@/lib/team/team-data";
import { generateQrDataUrl } from "@/lib/team/qr";

interface PageProps {
  params: {
    employeename: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lookup = getEmployeeBySlug(params.employeename);
  if (!lookup.employee || lookup.employee.status !== "published") {
    return {
      title: "Employee Profile | Victor Mobility",
      robots: { index: false, follow: false },
    };
  }

  const { fullName, designation } = lookup.employee;
  return {
    title: `${fullName} — ${designation} | Victor Mobility`,
    description: `Official digital business card and direct contact profile for ${fullName}, ${designation} at Victor Mobility Pvt. Ltd. On Time Every Time.`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://victormobility.in/team/${lookup.employee.slug}`,
    },
  };
}

export default async function EmployeeProfilePage({ params }: PageProps) {
  const lookup = getEmployeeBySlug(params.employeename);

  // If matched via historical alias, issue 307 temporary redirect to canonical URL
  if (lookup.isAlias && lookup.canonicalSlug) {
    redirect(`/team/${lookup.canonicalSlug}`);
  }

  // If employee does not exist or is not published, render generic 404
  if (!lookup.employee || lookup.employee.status !== "published") {
    notFound();
  }

  const employee = lookup.employee;
  const qrDataUrl = await generateQrDataUrl(employee.slug, 320);

  return (
    <EmployeeDigitalBusinessCard
      employee={employee}
      qrDataUrl={qrDataUrl}
    />
  );
}
