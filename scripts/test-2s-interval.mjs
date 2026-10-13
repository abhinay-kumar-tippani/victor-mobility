import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto("http://localhost:3000/india", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  const getActiveTitle = async () => {
    return page.locator('section[aria-label="Victor Mobility Services Showcase"] h1').innerText();
  };

  const title0 = await getActiveTitle();
  console.log("Initial slide (0s):", title0);

  // Wait 2.2 seconds
  await page.waitForTimeout(2200);
  const title1 = await getActiveTitle();
  console.log("After 2.2s:", title1);

  // Wait another 2.2 seconds
  await page.waitForTimeout(2200);
  const title2 = await getActiveTitle();
  console.log("After 4.4s:", title2);

  await browser.close();

  if (title0 !== title1 && title1 !== title2) {
    console.log("SUCCESS: Slides are advancing every 2 seconds!");
  } else {
    console.error("FAIL: Slides did not advance as expected.");
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
