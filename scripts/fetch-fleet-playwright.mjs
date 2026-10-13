import { chromium } from "playwright";
import fs from "fs";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage();

  console.log("Navigating to Pexels search for 'fleet of cars'...");
  await page.goto("https://www.pexels.com/search/fleet%20of%20cars/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  const pexelsImages = await page.$$eval("img", (imgs) =>
    imgs.map((img) => ({
      alt: img.alt,
      src: img.src,
    })).filter((img) => img.src && img.src.includes("images.pexels.com"))
  );

  console.log(`Found ${pexelsImages.length} images on Pexels:`);
  pexelsImages.slice(0, 10).forEach((img, i) => {
    console.log(`[${i}] ${img.alt} -> ${img.src}`);
  });

  await browser.close();
}

main().catch(console.error);
