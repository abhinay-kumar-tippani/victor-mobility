import type { EmployeeProfile } from "@/types/team";

/**
 * Escapes characters reserved in vCard text values (RFC 6350 section 3.4):
 * Backslash, comma, semicolon, newline.
 */
function escapeVCardText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Folds a vCard property line so no line exceeds 75 octets (RFC 6350 section 3.2).
 * Folds are CRLF followed by a single space.
 * Multi-byte UTF-8 sequences are preserved without splitting.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(line);
  if (bytes.length <= 75) {
    return line;
  }

  const parts: string[] = [];
  let currentBytes = 0;
  let currentStr = "";

  for (const char of line) {
    const charBytes = encoder.encode(char).length;
    // For subsequent lines, folding space counts as 1 byte, so max is 75
    const limit = parts.length === 0 ? 75 : 74;

    if (currentBytes + charBytes > limit) {
      parts.push(currentStr);
      currentStr = char;
      currentBytes = charBytes;
    } else {
      currentStr += char;
      currentBytes += charBytes;
    }
  }

  if (currentStr) {
    parts.push(currentStr);
  }

  return parts.join("\r\n ");
}

/**
 * Generates an RFC 6350 vCard 4.0 string for an employee.
 */
export function generateVCard(employee: EmployeeProfile): string {
  const lines: string[] = [];

  lines.push("BEGIN:VCARD");
  lines.push("VERSION:4.0");
  lines.push(`UID:urn:uuid:${employee.id}`);
  lines.push(foldLine(`FN:${escapeVCardText(employee.fullName)}`));

  if (employee.familyName || employee.givenName) {
    const family = escapeVCardText(employee.familyName || "");
    const given = escapeVCardText(employee.givenName || "");
    lines.push(foldLine(`N:${family};${given};;;`));
  }

  lines.push(foldLine(`ORG:Victor Mobility Pvt. Ltd.`));
  lines.push(foldLine(`TITLE:${escapeVCardText(employee.designation)}`));

  // Primary voice / phone: separate phone number if available, otherwise WhatsApp number
  const voiceRaw = employee.phone || employee.whatsapp;
  const voiceE164 = voiceRaw.replace(/[^\d+]/g, "");
  if (voiceE164) {
    lines.push(`TEL;TYPE=work,voice;VALUE=uri:tel:${voiceE164}`);
  }

  if (employee.email) {
    lines.push(foldLine(`EMAIL;TYPE=work:${employee.email.trim()}`));
  }

  const canonicalUrl = `https://victormobility.in/team/${employee.slug}`;
  lines.push(foldLine(`URL:${canonicalUrl}`));

  // Revision timestamp: basic ISO-8601 UTC
  const now = new Date();
  const rev = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  lines.push(`REV:${rev}`);

  lines.push("END:VCARD");

  // All vCard lines must end with CRLF (\r\n) per RFC 6350
  return lines.join("\r\n") + "\r\n";
}
