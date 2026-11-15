// next.config.js
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => ({
  // Static HTML export into out/, served by Cloudflare (see wrangler.jsonc).
  // Redirects live in public/_redirects: redirects() does not apply to an export.
  output: 'export',
  images: { unoptimized: true },
  // allow loading the dev server from this machine's LAN address (phone, other devices)
  allowedDevOrigins: Object.values(require('os').networkInterfaces())
    .flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .map((i) => i.address),
  // The dev server never reads public/_redirects, so it gets the rewrites
  // Cloudflare does from there: any /preview/<slug> serves the preview page.
  ...(phase === PHASE_DEVELOPMENT_SERVER && {
    rewrites: async () => [{ source: '/preview/:slug', destination: '/preview/demo' }],
  }),
})
