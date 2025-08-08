export async function GET() {
  const baseUrl = 'https://auraspringcleaning.com';
  
  const robotsTxt = `# Aura Spring Cleaning Robots.txt
# https://auraspringcleaning.com/

# Allow all crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Crawl-delay: 0

# Googlebot specific
User-agent: Googlebot
Allow: /
Disallow: /api/
Crawl-delay: 0

# Bingbot specific
User-agent: Bingbot
Allow: /
Disallow: /api/
Crawl-delay: 0

# Social Media Bots
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: Pinterest
Allow: /

# SEO Tool Bots
User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: MJ12bot
Allow: /

User-agent: DotBot
Allow: /

# Bad bots to block
User-agent: SemrushBot-SA
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Host directive (for Yandex)
Host: ${baseUrl}`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}