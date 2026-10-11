import { chromium } from "playwright";

async function diagnose() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();

  const failedRequests = [];
  const fontRequests = [];

  page.on("requestfailed", (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure() });
  });

  page.on("response", (res) => {
    if (res.url().includes("woff") || res.url().includes("font") || res.url().includes("layout.css")) {
      fontRequests.push({ url: res.url(), status: res.status() });
    }
  });

  console.log("Navigating to http://localhost:3000/india...");
  await page.goto("http://localhost:3000/india", { waitUntil: "networkidle" });

  const fontInfo = await page.evaluate(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const h1El = document.querySelector("h1");
    const h2El = document.querySelector("h2");
    const pEl = document.querySelector("p");

    const fontsLoaded = [];
    if (document.fonts) {
      for (const f of document.fonts) {
        fontsLoaded.push({
          family: f.family,
          status: f.status,
          weight: f.weight,
          loaded: f.loaded ? "yes" : "no",
        });
      }
    }

    return {
      htmlClass: htmlEl.className,
      bodyClass: bodyEl.className,
      htmlFontFamily: window.getComputedStyle(htmlEl).fontFamily,
      bodyFontFamily: window.getComputedStyle(bodyEl).fontFamily,
      h1FontFamily: h1El ? window.getComputedStyle(h1El).fontFamily : null,
      h2FontFamily: h2El ? window.getComputedStyle(h2El).fontFamily : null,
      pFontFamily: pEl ? window.getComputedStyle(pEl).fontFamily : null,
      documentFonts: fontsLoaded,
    };
  });

  console.log("\n--- FONT DIAGNOSIS RESULTS ---");
  console.log("HTML className:", fontInfo.htmlClass);
  console.log("Body className:", fontInfo.bodyClass);
  console.log("Body computed fontFamily:", fontInfo.bodyFontFamily);
  console.log("H1 computed fontFamily:", fontInfo.h1FontFamily);
  console.log("P computed fontFamily:", fontInfo.pFontFamily);
  console.log("\nDocument Fonts list:", JSON.stringify(fontInfo.documentFonts, null, 2));

  console.log("\nFont / CSS Network Requests:", JSON.stringify(fontRequests, null, 2));
  console.log("Failed Requests:", JSON.stringify(failedRequests, null, 2));

  await browser.close();
}

diagnose().catch(console.error);
