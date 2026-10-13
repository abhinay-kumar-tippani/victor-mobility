import { chromium } from "playwright";
import fs from "fs";

async function searchPexels(query) {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage();
  const url = `https://www.pexels.com/search/${encodeURIComponent(query)}/`;
  console.log(`Searching Pexels for "${query}"...`);
  
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForTimeout(4000);

  const images = await page.$$eval("img", (imgs) =>
    imgs.map((img) => ({
      alt: img.alt || "",
      src: img.src || "",
    })).filter((img) => img.src && img.src.includes("images.pexels.com/photos/"))
  );

  console.log(`Found ${images.length} images for "${query}"`);
  images.slice(0, 15).forEach((img, i) => {
    console.log(`[${i}] "${img.alt}" -> ${img.src}`);
  });

  await browser.close();
  return images;
}

async function run() {
  await searchPexels("luxury cars parked");
  await searchPexels("luxury car fleet");
  await searchPexels("black cars line");
}

run().catch(console.error);
