import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { pageOpen } from './src/data/pages.js';

export default defineConfig({
  site: 'https://nobunaga-files.com',
  integrations: [
    // 封をしたページは sitemap に載せない。
    // 判定は src/data/pages.js の登録簿と、検証ファイル側の verified に一本化してある。
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return pageOpen(path);
      },
    }),
  ],
});
