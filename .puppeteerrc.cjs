const { join } = require('path')

// Cache Chrome inside node_modules so Vercel/CI (which caches node_modules but not
// ~/.cache) reuses it across builds. Without this, prerender's headless Chrome is
// missing on the build image and scripts/prerender.ts falls back to sr-only stubs.
module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
}
