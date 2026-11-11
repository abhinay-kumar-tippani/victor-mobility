import { NextResponse } from "next/server";
import { getEmployeeBySlug } from "@/lib/team/team-data";
import { generateVCard } from "@/lib/team/vcard";

interface RouteParams {
  params: {
    employeename: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  const { employeename } = params;
  const lookup = getEmployeeBySlug(employeename);

  if (!lookup.employee || lookup.employee.status !== "published") {
    return new NextResponse("Contact not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  // If alias, redirect 307 to canonical vCard endpoint
  if (lookup.isAlias && lookup.canonicalSlug) {
    const url = new URL(request.url);
    url.pathname = `/team/${lookup.canonicalSlug}/contact.vcf`;
    return NextResponse.redirect(url, 307);
  }

  const employee = lookup.employee;
  const vcardContent = generateVCard(employee);

  // Safe filename based on canonical slug
  const safeFilename = `${employee.slug.replace(/[^a-z0-9-]/gi, "")}.vcf`;

  return new NextResponse(vcardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
