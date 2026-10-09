import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, "../screenshots");
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function verify() {
  console.log("=== VERIFYING USER UPDATES 1-4 ===");
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // ---------------------------------------------------------
  // 1. WORK SECTION: Check rich system preview & no internal scrollbars
  // ---------------------------------------------------------
  console.log("\n--- Checking Work Section (Things I've built) ---");
  await page.evaluate(() => {
    document.getElementById("work")?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(600);

  // Iterate all 9 projects on desktop
  const projectSpines = await page.$$("[role='button'][aria-label^='Project:']");
  console.log(`Found ${projectSpines.length} project items in gallery`);

  for (let i = 0; i < projectSpines.length; i++) {
    await projectSpines[i].click();
    await page.waitForTimeout(200);

    const check = await page.evaluate(() => {
      const openCard = document.querySelector("[aria-expanded='true']");
      if (!openCard) return { error: "No open card" };
      
      const leftCol = openCard.querySelector(".col-span-7");
      const rightCol = openCard.querySelector(".col-span-5");
      const grid = openCard.querySelector(".grid");

      return {
        gridScroll: grid ? grid.scrollHeight > grid.clientHeight : false,
        leftScroll: leftCol ? leftCol.scrollHeight > leftCol.clientHeight : false,
        rightScroll: rightCol ? rightCol.scrollHeight > rightCol.clientHeight : false,
        leftHeight: leftCol?.clientHeight,
        rightHeight: rightCol?.clientHeight,
      };
    });

    console.log(`Project ${i + 1} scroll check:`, check);
    if (check.gridScroll || check.leftScroll || check.rightScroll) {
      console.warn(`WARNING: Project ${i + 1} has internal scrollbar!`);
    }
  }

  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "work-preview-desktop.png") });
  console.log("Captured work section screenshot");

  // ---------------------------------------------------------
  // 2. ACHIEVEMENTS SECTION: Check card cutoff & translation math
  // ---------------------------------------------------------
  console.log("\n--- Checking Achievements Gallery Horizontal Translation ---");
  const achInfo = await page.evaluate(() => {
    const el = document.getElementById("achievements");
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: el.offsetHeight,
      totalScrollable: el.offsetHeight - window.innerHeight,
    };
  });
  console.log("Achievements offset info:", achInfo);

  // Step through scroll progress
  const steps = [0.0, 0.25, 0.5, 0.75, 0.9, 1.0];
  for (const prog of steps) {
    const targetY = achInfo.top + achInfo.totalScrollable * prog;
    await page.evaluate((y) => window.scrollTo(0, y), targetY);
    await page.waitForTimeout(300);

    const cardsVisibility = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll("#achievements .shrink-0"));
      const vpWidth = window.innerWidth;
      const progressEl = document.querySelector("#achievements span:last-child");
      return {
        progressText: progressEl?.textContent || "",
        cards: cards.map((c, idx) => {
          const r = c.getBoundingClientRect();
          return {
            idx,
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            inView: r.right > 0 && r.left < vpWidth,
            fullyInView: r.left >= 0 && r.right <= vpWidth,
          };
        }),
      };
    });

    console.log(`Progress ${(prog * 100).toFixed(0)}% [${cardsVisibility.progressText}]:`);
    const card2 = cardsVisibility.cards[1]; // Agentic card
    const card5 = cardsVisibility.cards[4]; // GitHub card
    const lastCard = cardsVisibility.cards[cardsVisibility.cards.length - 1]; // Future Milestones
    console.log(`  Card 02 (Agentic): left=${card2.left}, right=${card2.right}, inView=${card2.inView}, fullyInView=${card2.fullyInView}`);
    console.log(`  Card 05 (GitHub): left=${card5.left}, right=${card5.right}, inView=${card5.inView}, fullyInView=${card5.fullyInView}`);
    console.log(`  Last Card (Future): left=${lastCard.left}, right=${lastCard.right}, inView=${lastCard.inView}, fullyInView=${lastCard.fullyInView}`);

    if (prog === 0.75 || prog === 1.0) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `achievements-${Math.round(prog * 100)}pct.png`) });
    }
  }

  // ---------------------------------------------------------
  // 3. 3D BUTTONS & MODAL CHECK: Test Agentic & GitHub Skyline Launch
  // ---------------------------------------------------------
  console.log("\n--- Checking 3D Skyline Heatmap Modal Launch ---");
  // Scroll to where Card 05 is fully visible
  const card5TargetY = achInfo.top + achInfo.totalScrollable * 0.65;
  await page.evaluate((y) => window.scrollTo(0, y), card5TargetY);
  await page.waitForTimeout(400);

  const skylineBtn = await page.$("button:has-text('Launch 3D Skyline')");
  if (skylineBtn) {
    console.log("Found 'Launch 3D Skyline' button! Clicking it...");
    await skylineBtn.click();
    await page.waitForTimeout(1200);
    const modalVisible = await page.isVisible("[role='dialog']");
    console.log("3D Skyline modal open:", modalVisible);

    const canvasExists = await page.evaluate(() => {
      const cvs = document.querySelector("[role='dialog'] canvas");
      return !!cvs && cvs.width > 0;
    });
    console.log("3D Skyline WebGL canvas rendered:", canvasExists);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "skyline-modal-open.png") });
    // Close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  } else {
    console.warn("Could not find 'Launch 3D Skyline' button!");
  }

  console.log("\n--- Checking 3D Agentic Machine Modal Launch ---");
  // Scroll to where Card 02 is fully visible
  const card2TargetY = achInfo.top + achInfo.totalScrollable * 0.15;
  await page.evaluate((y) => window.scrollTo(0, y), card2TargetY);
  await page.waitForTimeout(400);

  const agenticBtn = await page.$("button:has-text('Launch 3D Machine')");
  if (agenticBtn) {
    console.log("Found 'Launch 3D Machine' button! Clicking it...");
    await agenticBtn.click();
    await page.waitForTimeout(1500);
    const modalVisible = await page.isVisible("[role='dialog']");
    console.log("3D Agentic Machine modal open:", modalVisible);

    const canvasExists = await page.evaluate(() => {
      const cvs = document.querySelector("[role='dialog'] canvas");
      return !!cvs && cvs.width > 0 && cvs.height > 0;
    });
    console.log("3D Three.js canvas initialized inside modal:", canvasExists);

    const machineState = await page.evaluate(() => {
      return (window).__machineDebug ? (window).__machineDebug.getState() : null;
    });
    console.log("3D Agentic Machine internal engine debug state:", machineState ? {
      mode: machineState.mode,
      camera: machineState.camera,
      playing: machineState.playing,
      drawCalls: machineState.drawCalls,
      triangles: machineState.triangles,
    } : "Not available");

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "agentic-modal-open.png") });
    // Close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  } else {
    console.warn("Could not find 'Launch 3D Machine' button!");
  }

  // ---------------------------------------------------------
  // 4. STANDALONE 3D ROUTES
  // ---------------------------------------------------------
  console.log("\n--- Checking Standalone /demo/agentic-factory ---");
  await page.goto("http://localhost:3000/demo/agentic-factory", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const standaloneCanvas = await page.evaluate(() => {
    const cvs = document.querySelector("#scene canvas");
    return !!cvs && cvs.width > 0;
  });
  console.log("Standalone 3D Agentic Factory canvas exists:", standaloneCanvas);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "agentic-factory-standalone.png") });

  await browser.close();
  console.log("\n=== ALL VERIFICATION CHECKS COMPLETE ===");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
