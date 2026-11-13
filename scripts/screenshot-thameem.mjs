/**
 * Captures desktop and mobile screenshots of Thameem's digital business card.
 * Starts its own next start server on port 3088.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const PORT = 3088;
const BASE_URL = `http://localhost:${PORT}`;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch { /* wait */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server failed to respond at ${url} within ${timeoutMs}ms`);
}

async function main() {
  console.log(`Starting next start on port ${PORT}...`);
  const nextProcess = spawn("cmd.exe", ["/c", "npx", "next", "start", "-p", String(PORT)], {
    stdio: "inherit",
  });

  const cleanup = () => {
    try { process.kill(-nextProcess.pid); } catch { nextProcess.kill(); }
  };
  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  await waitForServer(`${BASE_URL}/india`);
  console.log(`Server up at ${BASE_URL}`);

  let browser;
  try {
    browser = await chromium.launch({ channel: "msedge", headless: true });
  } catch {
    browser = await chromium.launch({ headless: true });
  }

  const context = await browser.newContext();
  const screenshotsDir = path.join(process.cwd(), "docs", "screenshots");
  await fs.mkdir(screenshotsDir, { recursive: true });

  // Desktop 1440 x 900
  const desktopPage = await context.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  const resD = await desktopPage.goto(`${BASE_URL}/team/thameem-ahmed`, { waitUntil: "networkidle" });
  console.log(`/team/thameem-ahmed HTTP ${resD.status()}`);
  const desktopPath = path.join(screenshotsDir, "thameem-desktop-1440.png");
  await desktopPage.screenshot({ path: desktopPath, fullPage: true });
  console.log(`Saved: ${desktopPath}`);
  await desktopPage.close();

  // Mobile 390 x 844
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto(`${BASE_URL}/team/thameem-ahmed`, { waitUntil: "networkidle" });
  const mobilePath = path.join(screenshotsDir, "thameem-mobile-390.png");
  await mobilePage.screenshot({ path: mobilePath, fullPage: true });
  console.log(`Saved: ${mobilePath}`);
  await mobilePage.close();

  await browser.close();
  cleanup();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
