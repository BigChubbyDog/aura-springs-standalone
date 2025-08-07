import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/',
          '/employee-portal/',
          '/admin-portal/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/images/',
          '/*.jpg$',
          '/*.jpeg$',
          '/*.png$',
          '/*.svg$',
          '/*.webp$',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      // Block bad bots
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      'https://aurasprings.com/sitemap.xml',
      'https://aurasprings.com/sitemap-blog.xml',
      'https://aurasprings.com/sitemap-services.xml',
      'https://aurasprings.com/sitemap-locations.xml',
    ],
    host: 'https://aurasprings.com',
  };
}