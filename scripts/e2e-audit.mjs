import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../out");

function startServer(port = 4174) {
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

async function runE2EAudit() {
  console.log("=== Starting Browser-Based E2E Deep UI Audit ===");
  const { server, port } = await startServer();
  console.log(`Test server running dynamically on port ${port}`);
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  
  const defects = [];
  const screenshotsDir = path.join(__dirname, "../screenshots/audit");
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleLogs = [];
  page.on("console", (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
    if (msg.type() === "error") {
      defects.push({ category: "Console Error", detail: msg.text() });
    }
  });

  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // --- TEST 1: HERO SECTION & VIDEO ---
  console.log("\n[Audit 1] Testing Hero Section...");
  const heroVideo = await page.$("#hero video");
  if (!heroVideo) {
    defects.push({ category: "Hero", detail: "Hero video element not found" });
  } else {
    const isPaused = await page.evaluate(() => document.querySelector("#hero video")?.paused);
    console.log(`Hero video initial state: paused = ${isPaused}`);
    
    // Check if video background has artifacts
    const videoBlend = await page.evaluate(() => {
      const v = document.querySelector("#hero video");
      return v ? window.getComputedStyle(v).mixBlendMode : null;
    });
    console.log(`Video mix-blend-mode: ${videoBlend}`);
  }

  // Check Sound toggle button
  const soundBtn = await page.$("button[aria-label*='audio']");
  if (soundBtn) {
    const initialLabel = await soundBtn.getAttribute("aria-label");
    console.log(`Initial sound button aria-label: ${initialLabel}`);
    await soundBtn.click();
    await page.waitForTimeout(300);
    const clickedLabel = await soundBtn.getAttribute("aria-label");
    console.log(`After click sound button aria-label: ${clickedLabel}`);
    if (initialLabel === clickedLabel) {
      defects.push({ category: "Hero", detail: "Sound toggle button aria-label did not update on click" });
    }
  } else {
    defects.push({ category: "Hero", detail: "Sound toggle button not found" });
  }

  await page.screenshot({ path: path.join(screenshotsDir, "1-hero.png") });

  // --- TEST 2: ABOUT SECTION & ID CARD ---
  console.log("\n[Audit 2] Testing About Section & ID Card...");
  await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
  await page.waitForTimeout(600);

  const idCard = await page.$("div[aria-label*='ID Card']");
  if (!idCard) {
    defects.push({ category: "About", detail: "ID Card interactive element not found" });
  } else {
    // Check initial transform
    const initialTransform = await page.evaluate(() => {
      const cardInner = document.querySelector("div[aria-label*='ID Card'] > div");
      return cardInner ? window.getComputedStyle(cardInner).transform : null;
    });
    console.log(`ID Card initial transform: ${initialTransform}`);

    // Click to flip
    await idCard.click({ force: true });
    await page.waitForTimeout(800);
    const flippedTransform = await page.evaluate(() => {
      const cardInner = document.querySelector("div[aria-label*='ID Card'] > div");
      return cardInner ? window.getComputedStyle(cardInner).transform : null;
    });
    console.log(`ID Card flipped transform: ${flippedTransform}`);
    if (initialTransform === flippedTransform) {
      defects.push({ category: "About", detail: "ID card did not rotate on click" });
    }
    await page.screenshot({ path: path.join(screenshotsDir, "2-about-flipped.png") });

    // Flip back
    await idCard.click({ force: true });
    await page.waitForTimeout(800);
  }

  // --- TEST 3: SKILLS PERIODIC TABLE & INSPECTOR ---
  console.log("\n[Audit 3] Testing Skills Periodic Table...");
  await page.evaluate(() => document.getElementById("skills")?.scrollIntoView());
  await page.waitForTimeout(600);

  const skillTiles = await page.$$("#skills button[aria-label*='atomic number']");
  console.log(`Found ${skillTiles.length} skill tiles (expected 56)`);
  if (skillTiles.length !== 56) {
    defects.push({ category: "Skills", detail: `Expected 56 skills, found ${skillTiles.length}` });
  }

  // Hover over Python tile (tile #6)
  if (skillTiles.length >= 6) {
    await skillTiles[5].hover();
    await page.waitForTimeout(400);
    const inspectorName = await page.evaluate(() => {
      return document.querySelector("#skills aside h3")?.textContent?.trim();
    });
    console.log(`Inspector title after hovering Python: ${inspectorName}`);
    if (inspectorName !== "Python") {
      defects.push({ category: "Skills", detail: `Hovering Python tile did not update inspector to Python (got ${inspectorName})` });
    }
  }

  // Test filter chips
  const filterChips = await page.$$("#skills button[role='tab']");
  console.log(`Found ${filterChips.length} filter chips`);
  if (filterChips.length > 1) {
    // Click 'Frontend' filter chip
    await filterChips[3].click(); // 'Frontend'
    await page.waitForTimeout(400);
    const dimmedTiles = await page.evaluate(() => {
      const tiles = document.querySelectorAll("#skills button[aria-label*='atomic number']");
      let dimmed = 0;
      tiles.forEach((t) => {
        if (t.classList.contains("opacity-25")) dimmed++;
      });
      return dimmed;
    });
    console.log(`Dimmed tiles after Frontend filter: ${dimmedTiles} / 50`);
    if (dimmedTiles === 0) {
      defects.push({ category: "Skills", detail: "Skills filter chips did not dim non-matching tiles" });
    }
    // Reset to 'All'
    await filterChips[0].click();
    await page.waitForTimeout(300);
  }

  await page.screenshot({ path: path.join(screenshotsDir, "3-skills.png") });

  // --- TEST 4: WORK ACCORDION GALLERY ---
  console.log("\n[Audit 4] Testing Work Section Accordion...");
  await page.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await page.waitForTimeout(600);

  const workPanels = await page.$$("#work .hidden.lg\\:flex > div");
  console.log(`Found ${workPanels.length} desktop work panels`);

  if (workPanels.length >= 2) {
    // Panel 1 should be open initially, Panel 2 folded
    const p1Expanded = await workPanels[0].getAttribute("aria-expanded");
    const p2Expanded = await workPanels[1].getAttribute("aria-expanded");
    console.log(`Initial: Panel 1 expanded = ${p1Expanded}, Panel 2 expanded = ${p2Expanded}`);

    // Click Panel 2 (SolScan CLI)
    await workPanels[1].click();
    await page.waitForTimeout(600);
    const p2AfterClick = await workPanels[1].getAttribute("aria-expanded");
    console.log(`After click: Panel 2 expanded = ${p2AfterClick}`);
    if (p2AfterClick !== "true") {
      defects.push({ category: "Work", detail: "Clicking folded work panel did not expand it" });
    }
  }

  await page.screenshot({ path: path.join(screenshotsDir, "4-work-panel2.png") });

  // --- TEST 5: CERTIFICATIONS INK-FLOOD ---
  console.log("\n[Audit 5] Testing Certifications Section...");
  await page.evaluate(() => document.getElementById("certifications")?.scrollIntoView());
  await page.waitForTimeout(600);

  const certRows = await page.$$("#certifications .divide-y > *");
  console.log(`Found ${certRows.length} certification rows`);

  if (certRows.length > 0) {
    await certRows[0].hover();
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: path.join(screenshotsDir, "5-certifications-hover.png") });

  // --- TEST 6: EXPERIENCE TIMELINE ---
  console.log("\n[Audit 6] Testing Experience Timeline...");
  await page.evaluate(() => document.getElementById("experience")?.scrollIntoView());
  await page.waitForTimeout(600);

  const experienceCards = await page.$$("#experience .space-y-12 > div");
  console.log(`Found ${experienceCards.length} timeline milestones`);

  await page.screenshot({ path: path.join(screenshotsDir, "6-experience.png") });

  // --- TEST 7: ACHIEVEMENTS PINNED HORIZONTAL GALLERY ---
  console.log("\n[Audit 7] Testing Achievements Section...");
  // Scroll down incrementally through achievements
  const achievementsEl = await page.$("#achievements");
  if (achievementsEl) {
    const boundingBox = await achievementsEl.boundingBox();
    console.log(`Achievements section height: ${boundingBox?.height}px`);

    // Scroll to middle of achievements section
    await page.evaluate(() => {
      const el = document.getElementById("achievements");
      if (el) {
        window.scrollTo({ top: el.offsetTop + window.innerHeight * 1.5, behavior: "instant" });
      }
    });
    await page.waitForTimeout(600);

    // Check achievement card numbers
    const cardNumbers = await page.evaluate(() => {
      const nums = document.querySelectorAll("#achievements .font-mono.text-4xl, #achievements .font-mono.text-6xl");
      return Array.from(nums).map(n => n.textContent?.trim());
    });
    console.log("Achievement card numbers at mid-scroll:", cardNumbers);

    // Check if any card has "0nd" or "0st" or "0+"
    const brokenValues = cardNumbers.filter(n => n === "0nd" || n === "0st" || n === "0+");
    if (brokenValues.length > 0) {
      defects.push({
        category: "Achievements",
        detail: `Found un-animated zero placeholders with suffixes: ${brokenValues.join(", ")}`
      });
    }

    await page.screenshot({ path: path.join(screenshotsDir, "7-achievements-scrolled.png") });
  }

  // --- TEST 8: CONTACT SECTION & EMAIL COPY ---
  console.log("\n[Audit 8] Testing Contact Section...");
  await page.evaluate(() => document.getElementById("contact")?.scrollIntoView());
  await page.waitForTimeout(600);

  const copyBtn = await page.$("#contact button[aria-label*='Copy email']");
  if (copyBtn) {
    await copyBtn.click();
    await page.waitForTimeout(300);
    const copyText = await copyBtn.textContent();
    console.log(`Copy button text after click: ${copyText?.trim()}`);
    if (!copyText?.includes("Copied")) {
      defects.push({ category: "Contact", detail: "Copy button did not show 'Copied ✓' on click" });
    }
  } else {
    defects.push({ category: "Contact", detail: "Email copy button not found" });
  }

  await page.screenshot({ path: path.join(screenshotsDir, "8-contact.png") });

  // --- TEST 9: MOBILE VIEWPORT & TOUCH INTERACTIONS ---
  console.log("\n[Audit 9] Testing Mobile Viewport (390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // Check mobile navigation menu
  const menuBtn = await page.$("button[aria-label='Open mobile navigation menu']");
  if (menuBtn) {
    await menuBtn.click();
    await page.waitForTimeout(500);

    const isMenuOpen = await page.evaluate(() => {
      const menu = document.querySelector("div[aria-label='Open mobile navigation menu']") ||
                   document.querySelector("div[aria-hidden='false']");
      return !!menu;
    });
    console.log(`Mobile menu opened: ${isMenuOpen}`);

    await page.screenshot({ path: path.join(screenshotsDir, "9-mobile-menu.png") });

    // Press Escape to close menu
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  } else {
    defects.push({ category: "Mobile Nav", detail: "Mobile menu button not found" });
  }

  // Check mobile work accordion expansion
  await page.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await page.waitForTimeout(500);
  const mobileAccordionBtns = await page.$$("#work .lg\\:hidden button[aria-expanded]");
  console.log(`Found ${mobileAccordionBtns.length} mobile accordion buttons`);
  if (mobileAccordionBtns.length >= 2) {
    // Click second project on mobile
    await mobileAccordionBtns[1].click();
    await page.waitForTimeout(400);
    const isP2Open = await mobileAccordionBtns[1].getAttribute("aria-expanded");
    console.log(`Mobile Project 2 expanded after click: ${isP2Open}`);
    if (isP2Open !== "true") {
      defects.push({ category: "Mobile Work", detail: "Mobile project accordion did not expand on tap" });
    }
  }

  await page.screenshot({ path: path.join(screenshotsDir, "10-mobile-work.png") });

  // Check Horizontal Overflow at multiple mobile & tablet breakpoints
  const breakpoints = [360, 390, 480, 768, 1024, 1280, 1440, 1920];
  console.log("\n[Audit 10] Checking Zero Horizontal Overflow across 8 breakpoints...");
  for (const bp of breakpoints) {
    await page.setViewportSize({ width: bp, height: 900 });
    await page.waitForTimeout(200);
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerW = await page.evaluate(() => window.innerWidth);
    if (scrollW > innerW) {
      defects.push({
        category: "Responsive Overflow",
        detail: `Horizontal overflow at ${bp}px: scrollWidth ${scrollW}px > innerWidth ${innerW}px (diff: ${scrollW - innerW}px)`
      });
    } else {
      console.log(`  ✓ ${bp}px: scrollWidth ${scrollW}px === innerWidth ${innerW}px`);
    }
  }

  await browser.close();
  server.close();

  console.log("\n================ AUDIT SUMMARY ================");
  console.log(`Total defects found: ${defects.length}`);
  defects.forEach((d, i) => {
    console.log(`  [Defect ${i + 1}] (${d.category}): ${d.detail}`);
  });
  console.log("================================================");

  return defects;
}

runE2EAudit().catch(console.error);
