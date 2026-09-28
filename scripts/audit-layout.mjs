import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const name = process.argv[2] || 'current';
const baseURL = process.env.AUDIT_URL || 'http://localhost:3001';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const page = await browser.newPage();
await page.emulateMedia({ reducedMotion: 'reduce' });
const pages = ['/', '/courses', '/courses/digital-asset', '/register', '/creator'];
const results = {};
await mkdir('artifacts', { recursive: true });
for (const width of [390, 768, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of pages) {
    await page.goto(baseURL + route);
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
    });
    await page.waitForTimeout(200);
    results[`${width}:${route}`] = await page.evaluate(() => {
      const properties = [
        'display',
        'position',
        'width',
        'height',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'marginTop',
        'marginRight',
        'marginBottom',
        'marginLeft',
        'fontFamily',
        'fontSize',
        'fontWeight',
        'lineHeight',
        'letterSpacing',
        'color',
        'backgroundColor',
        'borderRadius',
        'borderTopWidth',
        'gap',
        'gridTemplateColumns',
        'flexDirection',
        'alignItems',
        'justifyContent',
        'transform',
        'overflow',
      ];
      return [...document.querySelectorAll('body *')]
        .filter((el) => !['SCRIPT', 'STYLE', 'PATH', 'LINK', 'META'].includes(el.tagName))
        .map((el) => {
          const css = getComputedStyle(el);
          return {
            tag: el.tagName,
            name: el.getAttribute('class')?.split(' ')[0],
            text: el.textContent?.trim().slice(0, 35),
            styles: Object.fromEntries(properties.map((p) => [p, css[p]])),
          };
        });
    });
    if (route === '/' && width !== 768)
      await page.screenshot({ path: `artifacts/${name}-${width}.png`, fullPage: true });
  }
}
await writeFile(`artifacts/${name}.json`, JSON.stringify(results));
console.log(`Captured ${Object.keys(results).length} layouts to artifacts/${name}.json`);
await browser.close();
