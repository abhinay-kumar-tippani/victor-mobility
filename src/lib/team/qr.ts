import QRCode from "qrcode";

export const CANONICAL_BASE_URL = "https://victormobility.in/team";

export function getCanonicalProfileUrl(slug: string): string {
  return `${CANONICAL_BASE_URL}/${slug}`;
}

/**
 * Generates an SVG string representation of the QR code for a given employee slug.
 * Uses 4-module quiet zone, black modules on white background.
 */
export async function generateQrSvg(slug: string): Promise<string> {
  const url = getCanonicalProfileUrl(slug);
  return QRCode.toString(url, {
    type: "svg",
    margin: 4,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });
}

/**
 * Generates a base64 Data URL (PNG) of the QR code for rendering in UI previews.
 */
export async function generateQrDataUrl(slug: string, width = 480): Promise<string> {
  const url = getCanonicalProfileUrl(slug);
  return QRCode.toDataURL(url, {
    width,
    margin: 4,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });
}

/**
 * Generates a raw PNG Buffer of the QR code for direct downloads.
 */
export async function generateQrPngBuffer(slug: string, width = 1024): Promise<Buffer> {
  const url = getCanonicalProfileUrl(slug);
  return QRCode.toBuffer(url, {
    width,
    margin: 4,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });
}
