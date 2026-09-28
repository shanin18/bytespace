import { readFile, mkdir, writeFile } from 'node:fs/promises';
const files = ['src/lib/courses.ts', 'src/app/page.tsx', 'src/components/course-detail.tsx'];
const ids = new Set(
  (await Promise.all(files.map((f) => readFile(f, 'utf8'))))
    .join('\n')
    .match(/photo-[0-9]+-[a-z0-9]+/g),
);
await mkdir('public/images', { recursive: true });
for (const id of ids) {
  const response = await fetch(
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`,
  );
  if (!response.ok) {
    console.error(id, response.status);
    process.exitCode = 1;
    continue;
  }
  await writeFile(`public/images/${id}.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log('Saved', id);
}
await mkdir('public/video', { recursive: true });
const response = await fetch(
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
);
if (!response.ok) throw new Error(`Video: ${response.status}`);
await writeFile('public/video/course-preview.mp4', Buffer.from(await response.arrayBuffer()));
console.log('Saved sample video.');
