import { chromium } from "playwright";
import path from "path";

const screenshotsDir = path.resolve("docs/screenshots");

async function checkPages() {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 800 } });

  const routes = [
    { name: "services", path: "/india/services" },
    { name: "fleet", path: "/india/fleet" },
    { name: "about", path: "/india/about" },
    { name: "contact", path: "/india/contact" },
  ];

  for (const r of routes) {
    await page.goto(`http://localhost:3000${r.path}`, { waitUntil: "networkidle" });
    await page.locator("header").first().screenshot({ path: path.join(screenshotsDir, `navbar-active-${r.name}.png`) });
  }

  await browser.close();
  console.log("All route active header shots saved!");
}

checkPages();
