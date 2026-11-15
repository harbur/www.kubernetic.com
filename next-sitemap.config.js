/** @type {import('next-sitemap').IConfig} */

module.exports =  {
  generateIndexSitemap: false,
  siteUrl: process.env.SITE_URL || 'https://www.kubernetic.com/',
  generateRobotsTxt: true,
  // postbuild runs after the export, so write straight into it.
  outDir: 'out',
  // Transactional pages and the hidden prospect preview: noindex'd, so keep
  // them out of the sitemap too. Never list them in robots.txt either.
  exclude: ['/payment/*', '/preview/*'],
}
