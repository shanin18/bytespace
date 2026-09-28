import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('http://localhost:3000/');
await mkdir('artifacts', { recursive: true });
await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 700) {
  await page.evaluate((y) => scrollTo(0, y), y);
  await page.waitForTimeout(140);
}
await page.evaluate(() => scrollTo(0, 0));
await page.waitForFunction(() =>
  [...document.images]
    .filter((i) => i.getBoundingClientRect().width > 0)
    .every((i) => i.complete && i.naturalWidth > 0),
);
await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
console.log(
  'Overflow',
  await page.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.right > innerWidth + 1 && getComputedStyle(el).position !== 'absolute';
      })
      .map((el) => ({
        tag: el.tagName,
        class: el.className,
        right: el.getBoundingClientRect().right,
      }))
      .slice(0, 30),
  ),
);
console.log(
  'Images',
  await page.evaluate(() =>
    [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.alt),
  ),
);
await browser.close();
