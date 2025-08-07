import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aurasprings.com';
  const currentDate = new Date().toISOString();

  // Main pages with high priority
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Service-specific pages for SEO
  const servicePages = [
    'high-rise-cleaning',
    'luxury-condo-cleaning',
    'airbnb-cleaning',
    'deep-cleaning',
    'move-in-out-cleaning',
    'recurring-cleaning',
    'commercial-cleaning',
    'penthouse-cleaning',
  ].map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Location-specific pages for local SEO
  const locationPages = [
    'downtown-austin',
    'the-domain',
    'south-congress',
    'east-austin',
    'rainey-street',
    'west-lake-hills',
    'zilker',
    'mueller',
    'barton-hills',
    'travis-heights',
    'bouldin-creek',
    'hyde-park',
    'tarrytown',
    'clarksville',
    'rosedale',
  ].map(location => ({
    url: `${baseUrl}/areas/${location}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Austin ZIP code pages for hyper-local SEO
  const zipCodePages = [
    '78701', // Downtown
    '78702', // East Austin
    '78703', // Tarrytown/West Austin
    '78704', // South Austin/SoCo
    '78705', // University/Hyde Park
    '78722', // East Austin
    '78723', // Mueller
    '78731', // Northwest Hills
    '78733', // Bee Cave/West Lake
    '78738', // Bee Cave
    '78746', // West Lake Hills
    '78751', // Hyde Park
    '78756', // Allandale
    '78757', // Anderson Lane
    '78758', // The Domain
    '78759', // Great Hills
  ].map(zip => ({
    url: `${baseUrl}/service-area/${zip}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Additional pages
  const additionalPages = [
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/real-estate-partners`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/property-management`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/covid-19-safety`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Blog posts for content marketing SEO
  const blogPosts = [
    'how-to-prepare-for-professional-cleaning',
    'benefits-of-regular-home-cleaning',
    'eco-friendly-cleaning-tips',
    'spring-cleaning-checklist-austin',
    'best-cleaning-service-downtown-austin',
    'airbnb-cleaning-tips-hosts',
    'high-rise-condo-cleaning-guide',
    'pet-friendly-cleaning-products',
    'moving-out-cleaning-checklist',
    'austin-cleaning-cost-guide',
  ].map(post => ({
    url: `${baseUrl}/blog/${post}`,
    lastModified: currentDate,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }));

  return [
    ...mainPages,
    ...servicePages,
    ...locationPages,
    ...zipCodePages,
    ...additionalPages,
    ...blogPosts,
  ];
}