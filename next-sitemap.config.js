/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://auraspringcleaning.com',
  generateRobotsTxt: false, // We already have a custom robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
    '/_error',
    '/server-sitemap.xml',
  ],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/booking'),
    await config.transform(config, '/services'),
    await config.transform(config, '/team'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://auraspringcleaning.com/sitemap.xml',
      'https://auraspringcleaning.com/sitemap-0.xml',
    ],
  },
}