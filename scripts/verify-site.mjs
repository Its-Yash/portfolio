import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../out");

// Simple static server for out/ directory
function startServer(port = 4173) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(OUT_DIR, req.url === "/" ? "index.html" : req.url);
      if (!path.extname(filePath)) {
        filePath = path.join(filePath, "index.html");
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentTypes = {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".webp": "image/webp",
          ".svg": "image/svg+xml",
          ".ico": "image/x-icon",
          ".mp4": "video/mp4",
          ".webm": "video/webm",
          ".pdf": "application/pdf",
          ".woff2": "font/woff2",
        };

        res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
        res.end(content);
      });
    });

    server.listen(0, () => {
      const actualPort = server.address().port;
      resolve({ server, port: actualPort });
    });
  });
}

async function verify() {
  const { server, port } = await startServer();
  console.log(`Starting local test server on dynamic port ${port}...`);

  console.log("Launching Chromium/Chrome...");
  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.log("Playwright chromium not ready, using system Google Chrome...");
    browser = await chromium.launch({ channel: "chrome" });
  }
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  const url = `http://localhost:${port}/`;
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle" });

  // 1. Desktop Check: 1440x900
  console.log("\n--- Testing Desktop Viewport (1440x900) ---");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const desktopInnerWidth = await page.evaluate(() => window.innerWidth);
  const desktopOverflow = desktopScrollWidth > desktopInnerWidth;

  console.log(`Desktop: scrollWidth=${desktopScrollWidth}, innerWidth=${desktopInnerWidth}`);
  console.log(`Desktop Horizontal Overflow: ${desktopOverflow ? "FAIL ❌" : "PASS ✅ (Zero Overflow)"}`);

  const screenshotsDir = path.join(__dirname, "../screenshots");
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  await page.screenshot({ path: path.join(screenshotsDir, "desktop-1440x900.png"), fullPage: true });
  console.log("✓ Saved desktop-1440x900.png");

  // 2. Mobile Check: 390x844
  console.log("\n--- Testing Mobile Viewport (390x844) ---");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);

  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const mobileInnerWidth = await page.evaluate(() => window.innerWidth);
  const mobileOverflow = mobileScrollWidth > mobileInnerWidth;

  console.log(`Mobile: scrollWidth=${mobileScrollWidth}, innerWidth=${mobileInnerWidth}`);
  console.log(`Mobile Horizontal Overflow: ${mobileOverflow ? "FAIL ❌" : "PASS ✅ (Zero Overflow)"}`);

  await page.screenshot({ path: path.join(screenshotsDir, "mobile-390x844.png"), fullPage: true });
  console.log("✓ Saved mobile-390x844.png");

  // 3. Section ID Verification
  console.log("\n--- Verifying Semantic Section IDs ---");
  const requiredSections = [
    "hero", "about", "skills", "work", "certifications", "experience", "achievements", "contact"
  ];

  for (const s of requiredSections) {
    const el = await page.$(`#${s}`);
    console.log(`Section #${s}: ${el ? "FOUND ✅" : "MISSING ❌"}`);
  }

  // 4. Console Errors Check
  console.log("\n--- Console Error Audit ---");
  if (consoleErrors.length === 0) {
    console.log("Zero runtime console errors! PASS ✅");
  } else {
    console.log(`Found ${consoleErrors.length} console errors:`, consoleErrors);
  }

  await browser.close();
  server.close();

  if (desktopOverflow || mobileOverflow || consoleErrors.length > 0) {
    process.exit(1);
  } else {
    console.log("\nAll quality checks passed with flying colors! 🎉");
  }
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
