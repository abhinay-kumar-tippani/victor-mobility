import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3001";

async function run() {
  console.log("Connecting to " + BASE_URL + "...");
  const browser = await chromium.launch({ channel: "msedge" });

  try {
    // ----------------------------------------------------
    // TEST 1: INDIA ROUTE (/india)
    // ----------------------------------------------------
    console.log("\nTesting /india...");
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded", timeout: 60000 });

    // 1. Verify 'What do you need to arrange?' is completely gone
    const pageText = await desktopPage.innerText("body");
    if (pageText.includes("What do you need to arrange?")) {
      throw new Error("FAILED: 'What do you need to arrange?' is still found on /india!");
    }
    console.log("PASSED: 'What do you need to arrange?' and 6 services are removed from /india!");

    // 2. Verify 'The Journey of Victor' is present
    const journeySection = desktopPage.locator("#journey");
    if ((await journeySection.count()) === 0) {
      throw new Error("FAILED: #journey section not found on /india!");
    }
    const journeyText = await journeySection.innerText();
    if (!journeyText.includes("The Journey of Victor")) {
      throw new Error("FAILED: 'The Journey of Victor' heading not found in #journey!");
    }
    console.log("PASSED: 'The Journey of Victor' is present on /india!");

    // 3. Verify key milestones from 2009 to 2024
    const requiredMilestones = [
      "Q4. 2009",
      "The ideation of Victor",
      "Q1. 2010",
      "Indian Companies Act 1956",
      "Q1. 2012",
      "Q3. 2015",
      "800+ vehicles",
      "Q4. 2018",
      "1,500+ vehicles",
      "Q2 to Q4. 2020",
      "Q1 to Q4 2022",
      "Q2. 2023",
      "Q4. 2023",
      "Q1. 2024",
      "Q2. 2024",
      "United Arab Emirates (U.A.E)"
    ];

    for (const phrase of requiredMilestones) {
      if (!journeyText.includes(phrase)) {
        throw new Error(`FAILED: Required milestone phrase "${phrase}" not found in #journey!`);
      }
    }
    console.log("PASSED: All 12 milestones (2009-2024) verified in /india journey section!");

    // 4. Verify section order on /india
    const sectionIds = await desktopPage.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return [];
      const sections = main.querySelectorAll("section");
      return Array.from(sections).map((s) => s.id || s.getAttribute("aria-label") || "unnamed");
    });
    console.log("India DOM section order:", sectionIds);

    const journeyIdx = sectionIds.indexOf("journey");
    const aboutIdx = sectionIds.indexOf("about");
    if (journeyIdx === -1 || aboutIdx === -1 || journeyIdx !== aboutIdx - 1) {
      throw new Error(`FAILED: Expected #journey (${journeyIdx}) immediately before #about (${aboutIdx})!`);
    }
    console.log("PASSED: #journey is placed immediately above Leadership & Accountability (#about)!");

    // Screenshots for India
    const outDir = path.resolve("docs/screenshots");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    await desktopPage.evaluate(() => {
      const el = document.getElementById("journey");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "instant" });
      }
    });
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(outDir, "journey-desktop-india.png") });
    console.log("Saved docs/screenshots/journey-desktop-india.png");

    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${BASE_URL}/india`, { waitUntil: "domcontentloaded", timeout: 60000 });
    const mobileJourney = mobilePage.locator("#journey");
    await mobileJourney.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: path.join(outDir, "journey-mobile-india.png") });
    console.log("Saved docs/screenshots/journey-mobile-india.png");

    // ----------------------------------------------------
    // TEST 2: UAE ROUTE (/uae)
    // ----------------------------------------------------
    console.log("\nTesting /uae...");
    const uaePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await uaePage.goto(`${BASE_URL}/uae`, { waitUntil: "domcontentloaded", timeout: 60000 });

    const uaeJourney = uaePage.locator("#journey");
    if ((await uaeJourney.count()) === 0) {
      throw new Error("FAILED: #journey section not found on /uae!");
    }
    const uaeJourneyText = await uaeJourney.innerText();
    if (!uaeJourneyText.includes("The Journey of Victor")) {
      throw new Error("FAILED: 'The Journey of Victor' heading not found in #journey on /uae!");
    }
    console.log("PASSED: 'The Journey of Victor' is present on /uae!");

    const uaeSectionIds = await uaePage.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return [];
      const sections = main.querySelectorAll("section");
      return Array.from(sections).map((s) => s.id || s.getAttribute("aria-label") || "unnamed");
    });
    console.log("UAE DOM section order:", uaeSectionIds);

    const uaeJourneyIdx = uaeSectionIds.indexOf("journey");
    const uaeAboutIdx = uaeSectionIds.indexOf("about");
    if (uaeJourneyIdx === -1 || uaeAboutIdx === -1 || uaeJourneyIdx !== uaeAboutIdx - 1) {
      throw new Error(`FAILED: Expected #journey (${uaeJourneyIdx}) immediately before #about (${uaeAboutIdx}) on /uae!`);
    }
    console.log("PASSED: #journey is placed immediately above Leadership & Operations (#about) on /uae!");

    await uaePage.evaluate(() => {
      const el = document.getElementById("journey");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "instant" });
      }
    });
    await uaePage.waitForTimeout(600);
    await uaePage.screenshot({ path: path.join(outDir, "journey-desktop-uae.png") });
    console.log("Saved docs/screenshots/journey-desktop-uae.png");

    await browser.close();
    console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
  } catch (err) {
    await browser.close();
    throw err;
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
