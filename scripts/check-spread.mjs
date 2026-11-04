import { chromium } from "playwright";
import path from "path";

const screenshotsDir = path.resolve("docs/screenshots");

async function check() {
  const browser = await chromium.launch({ channel: "chrome" });

  for (const width of [1440, 1280, 1024]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });
    await page.locator("header").first().screenshot({ path: path.join(screenshotsDir, `navbar-spread-${width}.png`) });
    await page.screenshot({ path: path.join(screenshotsDir, `navbar-spread-page-${width}.png`), clip: { x: 0, y: 0, width, height: 250 } });

    // Inspect geometry of nav and links
    const info = await page.evaluate(() => {
      const nav = document.querySelector("header nav");
      const navRect = nav.getBoundingClientRect();
      const links = Array.from(nav.querySelectorAll("a")).map((a) => {
        const r = a.getBoundingClientRect();
        return { text: a.innerText, left: r.left, width: r.width, right: r.right };
      });
      return { navWidth: navRect.width, links };
    });
    console.log(`Width ${width}px:`, JSON.stringify(info, null, 2));

    await page.close();
  }

  await browser.close();
}

check();
