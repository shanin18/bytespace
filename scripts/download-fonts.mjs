import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('src/app/fonts', { recursive: true });
for (const family of ['clash-display', 'satoshi']) {
  const source = `https://api.fontshare.com/v2/css?f[]=${family}@variable&display=swap`;
  const response = await fetch(source);
  if (!response.ok) throw new Error(`${family}: ${response.status}`);
  const css = await response.text();
  const face = css.match(/@font-face\s*\{[^}]*font-weight:\s*\d+\s+\d+;[^}]*\}/)?.[0];
  const url = face?.match(/url\(['"]([^'"]+\.woff2)['"]\)/)?.[1];
  if (!url) throw new Error(`Variable WOFF2 not found for ${family}`);
  const font = await fetch(url.startsWith('//') ? `https:${url}` : url);
  if (!font.ok) throw new Error(`${family} font: ${font.status}`);
  const bytes = Buffer.from(await font.arrayBuffer());
  if (bytes.subarray(0, 4).toString() !== 'wOF2') throw new Error('Invalid WOFF2 file');
  await writeFile(`src/app/fonts/${family}-variable.woff2`, bytes);
  await writeFile(`src/app/fonts/${family}-source.css`, `/* Source: ${source} */\n${css}`);
  console.log(`${family}: ${bytes.length} bytes; ${face.match(/font-weight:[^;]+/)?.[0]}`);
}
