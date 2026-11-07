import { spawn } from "child_process";
import { chromium } from "playwright";
import http from "http";

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308) {
          resolve();
        } else {
          setTimeout(check, 500);
        }
      }).on("error", () => {
        if (Date.now() - start > timeout) {
          reject(new Error("Timeout waiting for server"));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

async function main() {
  console.log("Starting Next.js production server on port 3000...");
  const server = spawn("npx.cmd", ["next", "start", "-p", "3000"], {
    stdio: "inherit",
    shell: true,
  });

  try {
    await waitForServer("http://localhost:3000/");
    console.log("Server is ready! Launching browser...");

    const browser = await chromium.launch({ channel: "msedge" });

    // Desktop 1440px
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesktop.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await pageDesktop.screenshot({ path: "docs/screenshots/root-waving-flags-1440.png", fullPage: true });
    console.log("Saved docs/screenshots/root-waving-flags-1440.png");
    await pageDesktop.close();

    // Mobile 390px
    const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageMobile.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await pageMobile.screenshot({ path: "docs/screenshots/root-waving-flags-390.png", fullPage: true });
    console.log("Saved docs/screenshots/root-waving-flags-390.png");
    await pageMobile.close();

    await browser.close();
  } finally {
    console.log("Stopping server...");
    spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"], { shell: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
