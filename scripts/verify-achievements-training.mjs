import { chromium } from "playwright";
import http from "http";
import next from "next";

async function runVerification() {
  console.log("=== Starting Achievements & Driver Training Verification ===");

  const app = next({ dev: false, dir: process.cwd() });
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = http.createServer((req, res) => handle(req, res));
  await new Promise((resolve) => server.listen(3002, resolve));
  console.log("Next.js production server listening on http://localhost:3002");

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let failed = false;
  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failed = true;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  try {
    // 1. Achievements page verification on Desktop (1440px)
    console.log("\n--- Testing /india/achievements on Desktop (1440px) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    const achResponse = await page.goto("http://localhost:3002/india/achievements", { waitUntil: "networkidle" });
    assert(achResponse.status() === 200, "Direct navigation to /india/achievements returns HTTP 200");

    const achHeading = await page.textContent("h1");
    assert(achHeading.includes("Achievements & Recognition"), "Heading is 'Achievements & Recognition'");

    const sampleCertBadge = await page.locator("text='Sample certificate'").first();
    assert(await sampleCertBadge.isVisible(), "'Sample certificate' label is visible beside title");

    const certTitle = await page.locator("text='Certificate of Strategic Business Partnership'").first();
    assert(await certTitle.isVisible(), "Certificate title is 'Certificate of Strategic Business Partnership'");

    const featuredLabel = await page.locator("text='Featured recognition'").first();
    assert(await featuredLabel.isVisible(), "'Featured recognition' eyebrow label is visible");

    // Modal interaction test
    const viewButton = page.locator("button:has-text('View certificate')");
    assert(await viewButton.isVisible(), "'View certificate' button is visible");

    await viewButton.click();
    await page.waitForTimeout(300);

    const modalDialog = page.locator("div[role='dialog']");
    assert(await modalDialog.isVisible(), "Certificate modal opens upon clicking 'View certificate'");

    // Escape dismissal test
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    assert(!(await modalDialog.isVisible()), "Escape key dismisses the certificate modal");

    // Verify focus returned to trigger
    const isTriggerFocused = await page.evaluate(() => {
      const active = document.activeElement;
      return active && active.textContent && active.textContent.includes("View certificate");
    });
    assert(isTriggerFocused, "Focus returns to 'View certificate' trigger button after modal close");

    // Verify sample milestones
    const workshop = page.locator("text='Fleet readiness workshop'").first();
    const mentoring = page.locator("text='Driver mentoring initiative'").first();
    assert(await workshop.isVisible(), "'Fleet readiness workshop' milestone is present");
    assert(await mentoring.isVisible(), "'Driver mentoring initiative' milestone is present");

    const sampleMilestoneBadges = await page.locator("text='Sample milestone'").count();
    assert(sampleMilestoneBadges >= 2, "Both compact entries have visible 'Sample milestone' labels");

    // 2. Achievements page mobile tests (390px and 320px)
    for (const width of [390, 320]) {
      console.log(`\n--- Testing /india/achievements on Mobile (${width}px) ---`);
      await page.setViewportSize({ width, height: 800 });
      await page.goto("http://localhost:3002/india/achievements", { waitUntil: "networkidle" });

      const hasHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      assert(!hasHOverflow, `No horizontal overflow at ${width}px`);

      // Verify certificate artwork appears before caption/action on mobile
      const certBox = await page.locator("img[alt*='Sample Certificate']").first().boundingBox();
      const actionBox = await page.locator("button:has-text('View certificate')").first().boundingBox();
      assert(certBox && actionBox && certBox.y < actionBox.y, `Certificate artwork appears above action button at ${width}px`);
    }

    // 3. Driver Training page verification on Desktop (1440px)
    console.log("\n--- Testing /india/driver-training on Desktop (1440px) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    const dtResponse = await page.goto("http://localhost:3002/india/driver-training", { waitUntil: "networkidle" });
    assert(dtResponse.status() === 200, "Direct navigation to /india/driver-training returns HTTP 200");

    const dtHeading = await page.textContent("h1");
    assert(dtHeading.includes("Driver Training"), "Heading is 'Driver Training'");

    const introText = await page.textContent("main");
    assert(
      introText.includes("Explore how preparation, road awareness and passenger care fit into a professional driver’s day"),
      "Introductory line matches specified brief"
    );

    const outlineLabel = await page.locator("text='Sample training outline'").first();
    assert(await outlineLabel.isVisible(), "Curriculum section is clearly labelled 'Sample training outline'");

    // Verify 3 moments
    const beforePickup = page.locator("h3:has-text('Before pickup')").first();
    const onTheRoad = page.locator("h3:has-text('On the road')").first();
    const atDropOff = page.locator("h3:has-text('At drop-off')").first();
    assert(await beforePickup.isVisible(), "Moment 1: 'Before pickup' is present");
    assert(await onTheRoad.isVisible(), "Moment 2: 'On the road' is present");
    assert(await atDropOff.isVisible(), "Moment 3: 'At drop-off' is present");

    // Scenario disclosure interaction
    console.log("\n--- Testing 'What would you do?' Scenario Disclosure ---");
    const scenarioQuestion = page.locator("text=You reach the pickup point and the passenger is at a different entrance").first();
    assert(await scenarioQuestion.isVisible(), "Scenario question matches specified text");

    const disclosureBtn = page.locator("button:has-text('See suggested response')");
    assert(await disclosureBtn.isVisible(), "'See suggested response' disclosure button is visible");

    await disclosureBtn.click();
    await page.waitForTimeout(300);

    const suggestedResponse = page.locator("text='Stop in a permitted location, confirm the entrance with the passenger or dispatch, and agree on a safe meeting point.'").first();
    assert(await suggestedResponse.isVisible(), "Suggested response is revealed after clicking disclosure");

    // Verify Academy CTA link
    const academyLink = page.locator("a[href='/india/academy']:has-text('Explore the Chauffeur Academy')").first();
    assert(await academyLink.isVisible(), "'Explore the Chauffeur Academy' link to /india/academy is present");

    // 4. Driver Training mobile tests (390px and 320px)
    for (const width of [390, 320]) {
      console.log(`\n--- Testing /india/driver-training on Mobile (${width}px) ---`);
      await page.setViewportSize({ width, height: 800 });
      await page.goto("http://localhost:3002/india/driver-training", { waitUntil: "networkidle" });

      const hasHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      assert(!hasHOverflow, `No horizontal overflow at ${width}px on Driver Training`);
    }

    // 5. Cross-page discovery links verification
    console.log("\n--- Testing Cross-Page Links & Discovery ---");
    // About page -> Achievements
    await page.goto("http://localhost:3002/india/about", { waitUntil: "networkidle" });
    const aboutToAchLink = page.locator("main a[href='/india/achievements']").first();
    assert(await aboutToAchLink.isVisible(), "Link to /india/achievements is present on /india/about page");

    // Academy page -> Driver Training
    await page.goto("http://localhost:3002/india/academy", { waitUntil: "networkidle" });
    const academyToDtLink = page.locator("main a[href='/india/driver-training']").first();
    assert(await academyToDtLink.isVisible(), "Link to /india/driver-training is present on /india/academy page");

    // Footer links on India
    const footerAchLink = page.locator("footer a[href='/india/achievements']").first();
    const footerDtLink = page.locator("footer a[href='/india/driver-training']").first();
    assert(await footerAchLink.isVisible(), "Footer contains link to /india/achievements on India page");
    assert(await footerDtLink.isVisible(), "Footer contains link to /india/driver-training on India page");

    // Footer links on UAE must NOT have India achievements or driver-training
    await page.goto("http://localhost:3002/uae", { waitUntil: "networkidle" });
    const uaeFooterAchLink = await page.locator("footer a[href*='achievements']").count();
    const uaeFooterDtLink = await page.locator("footer a[href*='driver-training']").count();
    assert(uaeFooterAchLink === 0, "UAE footer does NOT contain achievements link");
    assert(uaeFooterDtLink === 0, "UAE footer does NOT contain driver-training link");

    // Sitemap check
    const sitemapRes = await page.goto("http://localhost:3002/sitemap.xml");
    const sitemapText = await sitemapRes.text();
    assert(sitemapText.includes("/india/achievements"), "Sitemap includes /india/achievements");
    assert(sitemapText.includes("/india/driver-training"), "Sitemap includes /india/driver-training");

  } finally {
    await browser.close();
    server.close();
  }

  if (failed) {
    console.error("\n❌ Verification finished with ERRORS.");
    process.exit(1);
  } else {
    console.log("\n🎉 ALL VERIFICATION CHECKS PASSED PERFECTLY!");
  }
}

runVerification().catch((err) => {
  console.error("Verification script crashed:", err);
  process.exit(1);
});
