// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Static output: every page ships as crawlable HTML with no client framework.
 * `site` is intentionally left unset while the project is a private demo, so
 * nothing generates canonical URLs for a domain the practice has not approved.
 */
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  compressHTML: true,
});
