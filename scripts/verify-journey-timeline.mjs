import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = "d:/victor website/docs/screenshots";
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

const EXPECTED_MILESTONES = [
  {
    date: "Q4 2009",
    title: "The Beginning",
    desc: "The ideation of Victor.",
  },
  {
    date: "Q1 2010",
    title: "Official Registration",
    desc: "Victor was registered as a private limited company under the Indian Companies Act, 1956.",
  },
  {
    date: "Q1 2012",
    title: "First Major Client",
    desc: "Victor secured a major corporate client after two years in the industry.",
  },
  {
    date: "Q3 2015",
    title: "Fleet Expansion",
    desc: "The fleet grew to more than 800 vehicles.",
  },
  {
    date: "Q4 2018",
    title: "Continued Growth",
    desc: "The fleet expanded to more than 1,500 vehicles.",
  },
  {
    date: "Q2–Q4 2020",
    title: "Navigating COVID-19",
    desc: "Victor focused on educating drivers and partners about WHO-recommended safety norms.",
  },
  {
    date: "Q1–Q4 2022",
    title: "Business Recovery",
    desc: "Victor successfully navigated the pandemic and resumed operations at full capacity.",
  },
  {
    date: "Q2 2023",
    title: "Pan-India Expansion",
    desc: "Victor decided to expand operations into metropolitan cities across India.",
  },
  {
    date: "Q4 2023",
    title: "International Expansion",
    desc: "Victor expanded into international markets, beginning with the United Arab Emirates.",
  },
  {
    date: "Q1 2024",
    title: "Sustainability Commitment",
    desc: "Victor committed to working toward a fleet comprising 15–30% electric vehicles.",
  },
  {
    date: "Q1 2024",
    title: "Pan-India Operations",
    desc: "Victor commenced full-fledged operations across India.",
  },
  {
    date: "Q2 2024",
    title: "UAE Operations",
    desc: "Victor commenced full-fledged operations in the United Arab Emirates.",
  },
];

async function startServer() {
  console.log(`Starting next server on port ${PORT}...`);
  const server = spawn("npx.cmd", ["next", "start", "-p", String(PORT)], {
    stdio: "pipe",
    shell: true,
  });

  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch(`${BASE_URL}/india/about`);
      if (res.ok) {
        console.log("Server is ready!");
        return server;
      }
    } catch (e) {
      // keep waiting
    }
  }
  throw new Error("Server failed to start within 20s");
}

async function run() {
  let server;
  let browser;
  try {
    server = await startServer();
    console.log("Launching Edge/Chromium browser...");
    browser = await chromium.launch({ channel: "msedge", headless: true });

    // 1. Desktop Verification (1440x900)
    console.log("\n==========================================");
    console.log("1. DESKTOP VERIFICATION (1440x900)");
    console.log("==========================================");
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE_URL}/india/about`, { waitUntil: "networkidle" });

    // Check 1: Old safety section replacement
    const pageText = await page.innerText("body");
    const hasSafetyFirst = pageText.includes("Safety First");
    const hasUncompromisingSafety = pageText.includes("Our Uncompromising Commitment to Safety");
    console.log(`Check 1 - Old "Safety First" section absent: ${!hasSafetyFirst}`);
    console.log(`Check 1 - Old "Our Uncompromising Commitment to Safety" absent: ${!hasUncompromisingSafety}`);
    if (hasSafetyFirst || hasUncompromisingSafety) {
      throw new Error('FAIL: Old "Safety First" section is still present on the about page!');
    }

    // Check 2: New section title
    const journeySection = page.locator("#journey");
    await journeySection.waitFor({ state: "visible" });
    const journeyTitle = await journeySection.locator("h2").innerText();
    console.log(`Check 2 - Journey section heading: "${journeyTitle}"`);
    if (!journeyTitle.includes("The Journey of Victor")) {
      throw new Error(`FAIL: Expected heading "The Journey of Victor", got "${journeyTitle}"`);
    }

    // Check 3: Velora Timeline component present
    const timelineSlot = journeySection.locator('[data-slot="timeline"]');
    const timelineCount = await timelineSlot.count();
    console.log(`Check 3 - Velora Timeline component [data-slot="timeline"] present: ${timelineCount === 1}`);
    if (timelineCount !== 1) {
      throw new Error(`FAIL: Expected 1 Velora Timeline component, found ${timelineCount}`);
    }

    // Check 4: All 12 milestones present in chronological order
    console.log("\nCheck 4 - Verifying all 12 milestones in chronological order:");
    const items = timelineSlot.locator("ol > li");
    const count = await items.count();
    console.log(`Found ${count} timeline items (expected 12)`);
    if (count !== 12) {
      throw new Error(`FAIL: Expected 12 timeline items, got ${count}`);
    }

    for (let i = 0; i < 12; i++) {
      const item = items.nth(i);
      const text = await item.innerText();
      const expected = EXPECTED_MILESTONES[i];

      const hasDate = text.includes(expected.date);
      const hasTitle = text.includes(expected.title);
      const hasDesc = text.includes(expected.desc);

      console.log(`  Milestone ${i + 1}: [${expected.date}] "${expected.title}"`);
      if (!hasDate || !hasTitle || !hasDesc) {
        throw new Error(`FAIL on milestone ${i + 1}: expected ${JSON.stringify(expected)}, got text: ${text}`);
      }
    }

    // Clean section screenshot without sticky header interference
    await page.evaluate(() => {
      const header = document.querySelector("header");
      if (header) header.style.position = "absolute";
      const floatingRails = document.querySelectorAll(".fixed");
      floatingRails.forEach((el) => {
        el.style.display = "none";
      });
    });

    const desktopTimelinePath = path.join(SCREENSHOTS_DIR, "about-journey-timeline-section-1440.png");
    await journeySection.screenshot({ path: desktopTimelinePath });
    console.log(`Saved pristine timeline section screenshot: ${desktopTimelinePath}`);

    const desktopFullPath = path.join(SCREENSHOTS_DIR, "about-journey-desktop-1440.png");
    await page.screenshot({ path: desktopFullPath, fullPage: true });
    console.log(`Saved full page screenshot: ${desktopFullPath}`);

    // 2. Mobile Verification (390x844)
    console.log("\n==========================================");
    console.log("2. MOBILE VERIFICATION (390x844)");
    console.log("==========================================");
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${BASE_URL}/india/about`, { waitUntil: "networkidle" });

    // Check horizontal overflow
    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    console.log(`Mobile scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    if (scrollWidth > clientWidth) {
      throw new Error(`FAIL: Horizontal overflow detected on mobile: ${scrollWidth} > ${clientWidth}`);
    } else {
      console.log("PASS: 0 horizontal overflow on 390px mobile viewport.");
    }

    await mobilePage.evaluate(() => {
      const header = document.querySelector("header");
      if (header) header.style.position = "absolute";
      const floatingRails = document.querySelectorAll(".fixed");
      floatingRails.forEach((el) => {
        el.style.display = "none";
      });
    });

    const mobileJourney = mobilePage.locator("#journey");
    const mobileTimelinePath = path.join(SCREENSHOTS_DIR, "about-journey-timeline-section-390.png");
    await mobileJourney.screenshot({ path: mobileTimelinePath });
    console.log(`Saved mobile timeline screenshot: ${mobileTimelinePath}`);

    const mobileFullPath = path.join(SCREENSHOTS_DIR, "about-journey-mobile-390.png");
    await mobilePage.screenshot({ path: mobileFullPath, fullPage: true });
    console.log(`Saved full page mobile screenshot: ${mobileFullPath}`);

    console.log("\n==========================================");
    console.log("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!");
    console.log("==========================================");

  } catch (err) {
    console.error("Verification failed with error:", err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    if (server) {
      console.log("Stopping test server...");
      server.kill("SIGTERM");
    }
  }
}

run();
