import { chromium } from "playwright";

async function checkFailedRequests() {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const testUrls = [
    "/india",
    "/india/services",
    "/india/fleet",
    "/india/about",
    "/india/contact",
    "/uae",
    "/uae/services",
    "/uae/fleet",
    "/uae/about",
    "/uae/contact",
  ];

  for (const u of testUrls) {
    const failed = [];
    const handleResponse = (res) => {
      if (res.status() >= 400) {
        failed.push({ url: res.url(), status: res.status() });
      }
    };
    page.on("response", handleResponse);
    await page.goto(`http://localhost:3000${u}`, { waitUntil: "networkidle" });
    if (failed.length > 0) {
      console.log(`Failed requests on ${u}:`, failed);
    }
    page.off("response", handleResponse);
  }

  await browser.close();
}

checkFailedRequests();
