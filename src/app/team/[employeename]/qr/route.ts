import { NextResponse } from "next/server";
import { getEmployeeBySlug } from "@/lib/team/team-data";
import { generateQrPngBuffer, generateQrSvg } from "@/lib/team/qr";

interface RouteParams {
  params: {
    employeename: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  const { employeename } = params;
  const lookup = getEmployeeBySlug(employeename);

  if (!lookup.employee || lookup.employee.status !== "published") {
    return new NextResponse("QR Code not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  // If alias, redirect 307 to canonical QR route
  if (lookup.isAlias && lookup.canonicalSlug) {
    const url = new URL(request.url);
    url.pathname = `/team/${lookup.canonicalSlug}/qr`;
    return NextResponse.redirect(url, 307);
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format")?.toLowerCase() || "png";
  const download = searchParams.get("download") === "true";

  const safeSlug = lookup.employee.slug.replace(/[^a-z0-9-]/gi, "");

  if (format === "svg") {
    const svg = await generateQrSvg(lookup.employee.slug);
    const headers: Record<string, string> = {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    };
    if (download) {
      headers["Content-Disposition"] = `attachment; filename="${safeSlug}-qr.svg"`;
    }
    return new NextResponse(svg, { status: 200, headers });
  }

  // PNG output
  const pngBuffer = await generateQrPngBuffer(lookup.employee.slug, 1024);
  const headers: Record<string, string> = {
    "Content-Type": "image/png",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };
  if (download) {
    headers["Content-Disposition"] = `attachment; filename="${safeSlug}-qr.png"`;
  }
  return new NextResponse(new Uint8Array(pngBuffer), { status: 200, headers });
}
