import { chromium } from "playwright";

async function inspect() {
  const browser = await chromium.launch({ channel: "chrome" });
  for (const width of [1440, 1024, 768, 390]) {
    console.log(`\n=== Viewport: ${width}px ===`);
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

    const headerBox = await page.$eval("header", (el) => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height, top: rect.top };
    });
    console.log("Header box:", headerBox);

    const logoBox = await page.$eval('header a[aria-label="Victor Mobility - Home"]', (el) => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height, left: rect.left };
    });
    console.log("Logo box:", logoBox);

    if (width >= 1024) {
      const navLinks = await page.$$eval("header nav a", (els) =>
        els.map((e) => ({ text: e.textContent.trim(), href: e.getAttribute("href"), width: e.getBoundingClientRect().width }))
      );
      console.log("Nav links:", navLinks);

      const ctas = await page.$$eval("header > div > div > div:last-child > *", (els) =>
        els.map((e) => ({ tag: e.tagName, text: e.textContent.trim(), width: e.getBoundingClientRect().width }))
      );
      console.log("Right side elements:", ctas);
    } else {
      const mobileBtns = await page.$$eval("header > div > div > div:last-child > *", (els) =>
        els.map((e) => ({ tag: e.tagName, text: e.textContent.trim(), width: e.getBoundingClientRect().width }))
      );
      console.log("Mobile right elements:", mobileBtns);
    }

    await page.close();
  }
  await browser.close();
}

inspect();
