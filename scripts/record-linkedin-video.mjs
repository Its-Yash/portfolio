import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function record() {
  console.log('🎬 Starting cinematic screen recording for LinkedIn...');
  
  const videoDir = path.resolve('./videos');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  let browser;
  try {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
      args: ['--enable-webgl', '--no-sandbox']
    });
  } catch (e) {
    browser = await chromium.launch({
      headless: true,
      args: ['--enable-webgl', '--no-sandbox']
    });
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2, // Retina 2x recording!
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  
  // Navigate to local production server
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Inject sleek mouse cursor for recording
  await page.evaluate(() => {
    const cursor = document.createElement('div');
    cursor.id = 'cinematic-cursor';
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(13, 13, 13, 0.25);
      border: 2px solid #0d0d0d;
      pointer-events: none;
      z-index: 9999999;
      transform: translate(-50%, -50%);
      transition: transform 0.12s ease-out, background 0.15s, border-color 0.15s;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    window.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursor.style.background = 'rgba(13, 13, 13, 0.7)';
    });
    window.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'rgba(13, 13, 13, 0.25)';
    });
  });

  // Helper smooth mouse mover
  async function glideMouse(targetX, targetY, steps = 30) {
    await page.mouse.move(targetX, targetY, { steps });
    await page.waitForTimeout(60);
  }

  // Helper smooth scroller
  async function smoothScrollTo(targetY, durationMs = 1500) {
    await page.evaluate(({ targetY, durationMs }) => {
      return new Promise((resolve) => {
        const startY = window.scrollY;
        const diff = targetY - startY;
        const startTime = performance.now();

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / durationMs, 1);
          // easeInOutCubic
          const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          window.scrollTo(0, startY + diff * ease);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(step);
      });
    }, { targetY, durationMs });
    await page.waitForTimeout(400);
  }

  console.log('🎥 Scene 1: Hero & Sound Visualizer...');
  await page.mouse.move(640, 360);
  await page.waitForTimeout(2000);
  
  // Glide cursor to sound button and click
  const soundBtn = page.locator('button[aria-label*="sound" i], button[aria-label*="audio" i], button:has-text("Sound")').first();
  if (await soundBtn.count() > 0) {
    const box = await soundBtn.boundingBox();
    if (box) {
      await glideMouse(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(300);
      await soundBtn.click();
      await page.waitForTimeout(1500);
    }
  }

  console.log('🎥 Scene 2: About Me Section...');
  const aboutSec = page.locator('#about');
  if (await aboutSec.count() > 0) {
    const aboutTop = await page.evaluate(() => document.getElementById('about')?.offsetTop || 900);
    await smoothScrollTo(aboutTop - 40, 1600);
    
    // Hover on pendulum badge
    const badge = page.locator('#about [style*="rotate"], #about .cursor-grab, #about article').first();
    if (await badge.count() > 0) {
      const box = await badge.boundingBox();
      if (box) {
        await glideMouse(box.x + box.width / 2, box.y + box.height / 3);
        await page.waitForTimeout(1200);
        await glideMouse(box.x + box.width * 0.7, box.y + box.height * 0.6);
        await page.waitForTimeout(1000);
      }
    }
  }

  console.log('🎥 Scene 3: Periodic Table of Skills...');
  const skillsSec = page.locator('#skills');
  if (await skillsSec.count() > 0) {
    const skillsTop = await page.evaluate(() => document.getElementById('skills')?.offsetTop || 1800);
    await smoothScrollTo(skillsTop - 30, 1600);
    await page.waitForTimeout(800);

    // Hover over skill elements to trigger live inspector
    const skillTiles = page.locator('#skills button[data-skill-id], #skills [role="button"], #skills table button');
    const count = await skillTiles.count();
    for (let i = 0; i < Math.min(count, 4); i++) {
      const tile = skillTiles.nth(i);
      const box = await tile.boundingBox();
      if (box) {
        await glideMouse(box.x + box.width / 2, box.y + box.height / 2, 15);
        await page.waitForTimeout(500);
      }
    }
    await page.waitForTimeout(1000);
  }

  console.log('🎥 Scene 4: Things I\'ve Built Accordion Gallery...');
  const workSec = page.locator('#work');
  if (await workSec.count() > 0) {
    const workTop = await page.evaluate(() => document.getElementById('work')?.offsetTop || 2700);
    await smoothScrollTo(workTop - 20, 1600);
    await page.waitForTimeout(800);

    // Hover across work accordion panels
    const panels = page.locator('#work [role="button"], #work [data-index]');
    const panelCount = await panels.count();
    for (let i = 0; i < Math.min(panelCount, 3); i++) {
      const panel = panels.nth(i);
      const box = await panel.boundingBox();
      if (box) {
        await glideMouse(box.x + 80, box.y + 120, 20);
        await panel.click();
        await page.waitForTimeout(1200);
      }
    }
  }

  console.log('🎥 Scene 5: Interactive 3D Agentic Factory Modal...');
  const achInfo = await page.evaluate(() => {
    const el = document.getElementById("achievements");
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: el.offsetHeight,
      totalScrollable: el.offsetHeight - window.innerHeight,
    };
  });

  if (achInfo) {
    // Scroll to 20% for Card 02 (Agentic Factory)
    const targetYCard2 = achInfo.top + achInfo.totalScrollable * 0.20;
    await smoothScrollTo(targetYCard2, 1600);
    await page.waitForTimeout(800);

    // Click Launch 3D Machine
    const machineBtn = page.locator('button:has-text("Launch 3D Machine")').first();
    if (await machineBtn.count() > 0) {
      const box = await machineBtn.boundingBox();
      if (box) {
        await glideMouse(box.x + box.width / 2, box.y + box.height / 2, 20);
      }
      await machineBtn.click({ force: true });
      await page.waitForTimeout(2200);

      // Orbit 3D canvas
      await glideMouse(640, 360, 15);
      await page.mouse.down();
      await page.mouse.move(760, 320, { steps: 25 });
      await page.mouse.up();
      await page.waitForTimeout(1200);

      // Close 3D machine modal
      const closeBtn = page.locator('button[aria-label="Close Factory Dialog"], [role="dialog"] button:has-text("✕")').first();
      if (await closeBtn.isVisible()) {
        const cBox = await closeBtn.boundingBox();
        if (cBox) {
          await glideMouse(cBox.x + cBox.width / 2, cBox.y + cBox.height / 2, 15);
        }
        await closeBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(1200);
    }

    console.log('🎥 Scene 6: Interactive 3D GitHub Contribution Skyline...');
    // Scroll to 75% for Card 05 (GitHub Skyline)
    const targetYCard5 = achInfo.top + achInfo.totalScrollable * 0.75;
    await smoothScrollTo(targetYCard5, 1600);
    await page.waitForTimeout(800);

    const skylineBtn = page.locator('button:has-text("Launch 3D Skyline")').first();
    if (await skylineBtn.count() > 0) {
      const box = await skylineBtn.boundingBox();
      if (box) {
        await glideMouse(box.x + box.width / 2, box.y + box.height / 2, 20);
      }
      await skylineBtn.click({ force: true });
      await page.waitForTimeout(2500);

      // Hover across skyline 3D canvas
      await glideMouse(600, 350, 15);
      await page.waitForTimeout(600);
      await glideMouse(680, 320, 15);
      await page.waitForTimeout(1200);

      // Close modal
      const closeSkyline = page.locator('button[aria-label="Close Skyline Dialog"], [role="dialog"] button:has-text("✕")').first();
      if (await closeSkyline.isVisible()) {
        const cBox = await closeSkyline.boundingBox();
        if (cBox) {
          await glideMouse(cBox.x + cBox.width / 2, cBox.y + cBox.height / 2, 15);
        }
        await closeSkyline.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(1200);
    }
  }

  console.log('🎥 Scene 7: Contact Section & Outro...');
  const contactTop = await page.evaluate(() => document.getElementById('contact')?.offsetTop || 7000);
  await smoothScrollTo(contactTop, 1800);
  await page.waitForTimeout(800);

  // Click Copy Email button
  const copyBtn = page.locator('#contact button:has-text("Copy"), #contact button[aria-label*="copy" i]').first();
  if (await copyBtn.count() > 0) {
    const box = await copyBtn.boundingBox();
    if (box) {
      await glideMouse(box.x + box.width / 2, box.y + box.height / 2, 20);
      await copyBtn.click();
      await page.waitForTimeout(1500);
    }
  }

  // Glide to footer link
  await glideMouse(640, 680, 25);
  await page.waitForTimeout(2000);

  console.log('💾 Finalizing video capture...');
  await page.close();
  await context.close();
  await browser.close();

  // Find recorded webm file
  const videoFiles = fs.readdirSync(videoDir).filter(f => f.endsWith('.webm'));
  if (videoFiles.length > 0) {
    const latestWebm = path.join(videoDir, videoFiles[videoFiles.length - 1]);
    const outputMp4 = path.join(videoDir, 'yash-portfolio-showcase.mp4');
    
    console.log(`🔄 Converting ${latestWebm} to optimized 1080p MP4 for LinkedIn...`);
    // Convert to 1080p high quality MP4
    const ffmpegCmd = `ffmpeg -y -i "${latestWebm}" -vf "scale=1920:1080:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart "${outputMp4}"`;
    execSync(ffmpegCmd);

    console.log(`✅ Production video ready at: ${outputMp4}`);
    const stats = fs.statSync(outputMp4);
    console.log(`📦 File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  }
}

record().catch(err => {
  console.error('❌ Error recording showcase video:', err);
  process.exit(1);
});
