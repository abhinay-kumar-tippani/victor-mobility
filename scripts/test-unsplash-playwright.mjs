import { chromium } from "playwright";

async function testUnsplash() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage();
  console.log("Navigating to Unsplash...");
  
  await page.goto("https://unsplash.com/s/photos/luxury-cars-lineup", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(4000);

  const images = await page.$$eval("figure img", (imgs) =>
    imgs.map((img) => ({
      alt: img.alt || "",
      src: img.src || "",
    })).filter((img) => img.src && img.src.includes("images.unsplash.com"))
  );

  console.log(`Found ${images.length} images on Unsplash:`);
  images.slice(0, 15).forEach((img, i) => {
    console.log(`[${i}] "${img.alt}" -> ${img.src.split('?')[0]}`);
  });

  await browser.close();
}

testUnsplash().catch(console.error);
