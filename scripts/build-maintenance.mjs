// 休止中ビルド：dist に工事中画面だけを出力する。
// 記事のHTMLは一切出力しないので、URLを直接叩かれても中身は出ない。
import { rm, mkdir, cp, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'maintenance');
const dist = path.join(root, 'dist');
const pub = path.join(root, 'public');

// 工事中画面が参照するものだけを public から持ち込む
const ASSETS = [
  'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png',
  'images/washi-bg.webp',
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const f of await readdir(src)) {
  await copyFile(path.join(src, f), path.join(dist, f));
}
// 404 も同じ画面にする（_redirects が効かない経路の保険）
await copyFile(path.join(src, 'index.html'), path.join(dist, '404.html'));

for (const rel of ASSETS) {
  const from = path.join(pub, rel);
  if (!existsSync(from)) {
    console.warn(`  ! 見つからないので飛ばした: public/${rel}`);
    continue;
  }
  const to = path.join(dist, rel);
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to);
}

console.log('');
console.log('  ██  休止中ビルドです  ██');
console.log('  dist には工事中画面しか入っていません。記事は公開されません。');
console.log('  サイトを本番に戻すときは package.json の "build" を');
console.log('  "astro build" に戻してください。');
console.log('');
