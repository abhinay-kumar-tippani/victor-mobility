import { chromium } from "playwright";
import http from "http";
import next from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, "..");

async function main() {
  console.log("Starting Next.js app for UAE route verification...");
  const app = next({ dev: false, dir: projectDir });
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = http.createServer((req, res) => handle(req, res));
  await new Promise((resolve) => server.listen(3002, resolve));
  console.log("Server listening at http://localhost:3002");

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();

  try {
    // 1. Desktop verification (1440x900)
    console.log("Testing Desktop view at 1440x900...");
    const desktopPage = await context.newPage();
    await desktopPage.setViewportSize({ width: 1440, height: 900 });
    await desktopPage.goto("http://localhost:3002/uae", { waitUntil: "networkidle" });

    // Assert sections on UAE homepage
    const title = await desktopPage.title();
    console.log("UAE page title:", title);

    // Header Language Switcher
    const langSwitcher = desktopPage.locator("#desktop-language-switcher");
    console.log("Desktop language switcher visible:", await langSwitcher.isVisible());

    // Nav items
    const navItems = await desktopPage.locator("nav[aria-label='Main Navigation'] a").allTextContents();
    console.log("Main Nav Items:", navItems);

    // Stat Counter Section
    const statSection = desktopPage.locator("section[aria-label='Key Performance Statistics']");
    console.log("Stat Counter Section visible:", await statSection.isVisible());

    // Trusted Companies Section
    const trustedSection = desktopPage.locator("section#clients");
    console.log("Trusted Companies Section visible:", await trustedSection.isVisible());

    // Fleet Section
    const fleetSection = desktopPage.locator("section#fleet");
    console.log("Fleet Section visible:", await fleetSection.isVisible());
    const fleetTabs = await fleetSection.locator("[role='tab']").allTextContents();
    console.log("Fleet Tabs:", fleetTabs);

    // Services Section
    const servicesSection = desktopPage.locator("section#services");
    console.log("Services Section visible:", await servicesSection.isVisible());

    // Safety Section
    const safetySection = desktopPage.locator("section#safety");
    console.log("Safety Section visible:", await safetySection.isVisible());

    // Network / Presence Section
    const networkSection = desktopPage.locator("section#network");
    console.log("UAE Presence Section visible:", await networkSection.isVisible());

    // Journey Section
    const journeySection = desktopPage.locator("section#journey");
    console.log("Victor Journey Section visible:", await journeySection.isVisible());

    // Leadership / People Section
    const peopleSection = desktopPage.locator("section#about");
    console.log("People Section visible:", await peopleSection.isVisible());

    // FAQ Section
    const faqSection = desktopPage.locator("section#questions");
    console.log("FAQ Section visible:", await faqSection.isVisible());

    // Contact Invitation Section
    const contactSection = desktopPage.locator("section#contact");
    console.log("Contact Invitation Section visible:", await contactSection.isVisible());

    // Partner Enquiry Section
    const partnerSection = desktopPage.locator("section#partners");
    console.log("Partner Enquiry Section visible:", await partnerSection.isVisible());

    // Guided Enquiry Assistant Trigger
    const assistantBtn = desktopPage.locator("button:has-text('Plan your journey')");
    console.log("Guided Enquiry Assistant FAB visible:", await assistantBtn.isVisible());

    // Footer links verification
    const footerEstimator = desktopPage.locator("footer a[href='/uae/estimator']");
    const footerRfp = desktopPage.locator("footer a[href='/uae/rfp']");
    console.log("Footer /uae/estimator link visible:", await footerEstimator.isVisible());
    console.log("Footer /uae/rfp link visible:", await footerRfp.isVisible());

    // 1b. Verify UAE Service Detail Route (/uae/services/chauffeur-luxury)
    console.log("Testing UAE Service Detail view (/uae/services/chauffeur-luxury)...");
    const serviceDetailPage = await context.newPage();
    await serviceDetailPage.setViewportSize({ width: 1440, height: 900 });
    await serviceDetailPage.goto("http://localhost:3002/uae/services/chauffeur-luxury", { waitUntil: "networkidle" });
    const detailTitle = await serviceDetailPage.title();
    console.log("Service detail title:", detailTitle);
    const workflowVisible = await serviceDetailPage.locator("text=Operational Workflow").isVisible();
    const faqVisible = await serviceDetailPage.locator("text=Frequently Asked Questions").isVisible();
    console.log("Service detail workflow visible:", workflowVisible);
    console.log("Service detail FAQ visible:", faqVisible);
    await serviceDetailPage.close();

    // Capture Full Page Desktop Screenshot
    await desktopPage.screenshot({
      path: path.join(projectDir, "docs/screenshots/uae-desktop.png"),
      fullPage: true,
    });
    console.log("Saved docs/screenshots/uae-desktop.png");

    // 2. Mobile verification (390x844)
    console.log("Testing Mobile view at 390x844...");
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    await mobilePage.goto("http://localhost:3002/uae", { waitUntil: "networkidle" });

    // Open mobile drawer
    const menuButton = mobilePage.locator("button[aria-controls='mobile-navigation-drawer']");
    await menuButton.click();
    await mobilePage.waitForTimeout(500);

    const drawerVisible = await mobilePage.locator("#mobile-navigation-drawer").isVisible();
    console.log("Mobile drawer visible:", drawerVisible);

    const drawerLinks = await mobilePage.locator("#mobile-navigation-drawer nav a").allTextContents();
    console.log("Drawer Links:", drawerLinks);

    // Close drawer
    await mobilePage.locator("#mobile-navigation-drawer button[aria-label='Close menu']").click();
    await mobilePage.waitForTimeout(300);

    // Capture Full Page Mobile Screenshot
    await mobilePage.screenshot({
      path: path.join(projectDir, "docs/screenshots/uae-mobile.png"),
      fullPage: true,
    });
    console.log("Saved docs/screenshots/uae-mobile.png");

    console.log("Verification completed successfully!");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
