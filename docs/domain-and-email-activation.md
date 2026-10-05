# Domain & Business Email Activation Guide
**Target Domain**: `victormobility.com`  
**Contact Representative**: Mujeeb Ur Rehman Mohammed, Business Development Partner  
**Target Email**: `mujeeburrehman@victormobility.com`

---

## 1. Domain Registration & Ownership Verification

1. **Purchase Domain**:
   - Register `victormobility.com` via an accredited registrar (e.g. Namecheap, Cloudflare Registrar, Google Domains/Squarespace, or GoDaddy).
   - Ensure WHOIS privacy protection is enabled.

2. **DNS Records for Production Hosting (Vercel Example)**:
   - When deploying the Next.js production build to Vercel:
     | Type | Name | Content / Target | Proxy Status |
     | :--- | :--- | :--- | :--- |
     | `A` | `@` | `76.76.21.21` | DNS Only |
     | `CNAME` | `www` | `cname.vercel-dns.com` | DNS Only |
   - For custom server hosting (e.g., AWS EC2, DigitalOcean, or Azure):
     - Point `A` record `@` to your server's public elastic IP address.

---

## 2. Activating Domain in Website Configuration

Once the domain is connected and SSL/TLS certificate is provisioned:

1. **Environment Variable Configuration**:
   - In your hosting dashboard or `.env.production` file:
     ```env
     NEXT_PUBLIC_SITE_URL=https://victormobility.com
     ```
   - This automatically updates:
     - Canonical metadata across all pages
     - OpenGraph image absolute URLs
     - `/sitemap.xml` URLs
     - `/robots.txt` directives

2. **Update `src/content/india.json`**:
   - Change `domainPurchased` flag to `true`:
     ```json
     "contact": {
       "domainPurchased": true,
       "printedDomain": "victormobility.com"
     }
     ```

---

## 3. Business Email Provisioning (`mujeeburrehman@victormobility.com`)

1. **Email Service Provider**:
   - Set up **Google Workspace** or **Microsoft 365** for `victormobility.com`.
   - Create user account: `mujeeburrehman@victormobility.com`.

2. **Add Required DNS Records**:
   - **MX Records** (for Google Workspace):
     - Priority 1: `ASPMX.L.GOOGLE.COM`
     - Priority 5: `ALT1.ASPMX.L.GOOGLE.COM`
     - Priority 5: `ALT2.ASPMX.L.GOOGLE.COM`
     - Priority 10: `ALT3.ASPMX.L.GOOGLE.COM`
     - Priority 10: `ALT4.ASPMX.L.GOOGLE.COM`
   - **SPF Record** (`TXT`):
     - `v=spf1 include:_spf.google.com ~all`
   - **DKIM & DMARC**:
     - Generate DKIM key in admin console and add `TXT` record.
     - Add DMARC `TXT` record: `v=DMARC1; p=quarantine; rua=mailto:admin@victormobility.com`.

3. **Activate Email on Website**:
   - In `src/content/india.json`:
     ```json
     "contact": {
       "emailEnabled": true,
       "printedEmail": "mujeeburrehman@victormobility.com"
     }
     ```
   - This activates verified email links across the Contact page and Footer without user confusion.

---

## 4. Search Engine Indexing & Launch Steps

1. **Google Search Console**:
   - Add property: `https://victormobility.com`.
   - Submit sitemap: `https://victormobility.com/sitemap.xml`.
   - Request indexing for homepage (`/india`), `/india/services`, and key service detail pages.

2. **Verification Checklist**:
   - [ ] SSL certificate active (`https://` with zero mixed-content warnings).
   - [ ] Root `/` redirects with HTTP 307/308 to `/india`.
   - [ ] Phone links trigger dialer for `+91 91007 77768`.
   - [ ] WhatsApp links trigger chat for `+91 93965 46950`.
   - [ ] All 18 static pages render cleanly with zero console errors.
