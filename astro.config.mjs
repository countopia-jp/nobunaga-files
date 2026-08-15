import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番の正規URL。Cloudflare Pages のカスタムドメイン設定後もこのままでOK。
export default defineConfig({
  site: 'https://nobunaga-files.com',
  integrations: [sitemap()],
});
