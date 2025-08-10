// Comprehensive Structured Data for SEO

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://auraspringcleaning.com/#organization',
  name: 'Aura Spring Cleaning',
  alternateName: 'Aura Spring Cleaning Austin',
  url: 'https://auraspringcleaning.com',
  logo: 'https://auraspringcleaning.com/images/logo.png',
  image: [
    'https://auraspringcleaning.com/images/storefront.jpg',
    'https://auraspringcleaning.com/images/team.jpg',
    'https://auraspringcleaning.com/images/cleaning-service.jpg'
  ],
  description: 'Professional house cleaning services in Austin, TX. Eco-friendly products, licensed & insured, same-day service available.',
  telephone: '+1-512-781-0527',
  email: 'hello@auraspringcleaning.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Austin',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    postalCode: '78701',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.2672,
    longitude: -97.7431
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00'
    }
  ],
  priceRange: '$$',
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'PayPal', 'Venmo', 'Zelle'],
  currenciesAccepted: 'USD',
  areaServed: [
    {
      '@type': 'City',
      name: 'Austin',
      '@id': 'https://www.wikidata.org/wiki/Q16559'
    },
    {
      '@type': 'City',
      name: 'Round Rock'
    },
    {
      '@type': 'City',
      name: 'Cedar Park'
    },
    {
      '@type': 'City',
      name: 'Pflugerville'
    },
    {
      '@type': 'City',
      name: 'Lakeway'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '523',
    bestRating: '5',
    worstRating: '1'
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sarah Mitchell'
      },
      datePublished: '2025-01-05',
      reviewBody: 'Aura Spring Cleaning transformed my high-rise condo! Their attention to detail is unmatched.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      }
    }
  ],
  sameAs: [
    'https://www.facebook.com/AuraSpringCleaning',
    'https://www.instagram.com/auraspringcleaning',
    'https://www.yelp.com/biz/aura-spring-cleaning-austin',
    'https://www.linkedin.com/company/aura-spring-cleaning'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        '@id': 'https://auraspringcleaning.com/services/house-cleaning',
        name: 'House Cleaning',
        description: 'Regular maintenance cleaning for your home',
        price: '150.00',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        '@id': 'https://auraspringcleaning.com/services/deep-cleaning',
        name: 'Deep Cleaning',
        description: 'Thorough top-to-bottom home transformation',
        price: '225.00',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        '@id': 'https://auraspringcleaning.com/services/move-cleaning',
        name: 'Move In/Out Cleaning',
        description: 'Complete cleaning for moving transitions',
        price: '270.00',
        priceCurrency: 'USD'
      }
    ]
  }
};

// Service-specific schemas
export const serviceSchemas = {
  houseCleaning: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://auraspringcleaning.com/services/house-cleaning',
    name: 'House Cleaning Service',
    description: 'Professional house cleaning service in Austin, TX. Regular maintenance cleaning for homes, condos, and apartments.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://auraspringcleaning.com/#organization'
    },
    areaServed: {
      '@type': 'City',
      name: 'Austin',
      '@id': 'https://www.wikidata.org/wiki/Q16559'
    },
    offers: {
      '@type': 'Offer',
      price: '150.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01'
    },
    serviceType: 'House Cleaning',
    category: 'Residential Cleaning',
    audience: {
      '@type': 'Audience',
      audienceType: 'Homeowners and Renters'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://auraspringcleaning.com/booking',
      servicePhone: '+1-512-781-0527',
      availableLanguage: ['en', 'es']
    }
  },
  
  deepCleaning: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://auraspringcleaning.com/services/deep-cleaning',
    name: 'Deep Cleaning Service',
    description: 'Comprehensive deep cleaning service in Austin. Includes baseboards, inside appliances, light fixtures, and more.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://auraspringcleaning.com/#organization'
    },
    offers: {
      '@type': 'Offer',
      price: '225.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock'
    },
    serviceType: 'Deep Cleaning',
    category: 'Residential Cleaning'
  },
  
  moveInOutCleaning: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://auraspringcleaning.com/services/move-cleaning',
    name: 'Move In/Out Cleaning Service',
    description: 'Complete cleaning service for moving transitions in Austin. Empty home cleaning with cabinet interiors and garage.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://auraspringcleaning.com/#organization'
    },
    offers: {
      '@type': 'Offer',
      price: '270.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock'
    },
    serviceType: 'Move In/Out Cleaning',
    category: 'Residential Cleaning'
  },
  
  airbnbCleaning: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://auraspringcleaning.com/services/airbnb-cleaning',
    name: 'Airbnb Cleaning Service',
    description: 'Professional vacation rental cleaning in Austin. Quick turnaround, linen service, and restocking available.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://auraspringcleaning.com/#organization'
    },
    offers: {
      '@type': 'Offer',
      price: '180.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock'
    },
    serviceType: 'Vacation Rental Cleaning',
    category: 'Commercial Cleaning'
  },
  
  commercialCleaning: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://auraspringcleaning.com/services/commercial-cleaning',
    name: 'Commercial Cleaning Service',
    description: 'Professional commercial cleaning for Austin businesses. Offices, retail spaces, and medical facilities.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://auraspringcleaning.com/#organization'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceRange: '$$',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    serviceType: 'Commercial Cleaning',
    category: 'Commercial Cleaning'
  },
  
  postConstruction: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://auraspringcleaning.com/services/post-construction',
    name: 'Post Construction Cleaning',
    description: 'Post construction and renovation cleaning in Austin. Dust removal, debris cleanup, and final polish.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://auraspringcleaning.com/#organization'
    },
    offers: {
      '@type': 'Offer',
      price: '350.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock'
    },
    serviceType: 'Post Construction Cleaning',
    category: 'Specialty Cleaning'
  }
};

// FAQ Schema
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does house cleaning cost in Austin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'House cleaning in Austin typically costs between $150-$300 depending on home size and service type. Standard cleaning starts at $150, deep cleaning from $225, and move-out cleaning from $270.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide cleaning supplies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide all cleaning supplies and equipment. We use eco-friendly, non-toxic products that are safe for children and pets. If you have specific products you prefer, we can use those as well.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are you insured and bonded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Aura Spring Cleaning is fully licensed, bonded, and insured. We carry general liability insurance and all our cleaners are covered by workers compensation.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I book a cleaning service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book online in 60 seconds at auraspringcleaning.com/booking, call us at (512) 781-0527, or email hello@auraspringcleaning.com. Same-day service is often available.'
      }
    },
    {
      '@type': 'Question',
      name: 'What areas in Austin do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve all of Austin including Downtown, The Domain, South Congress, East Austin, West Lake Hills, and surrounding areas like Round Rock, Cedar Park, Pflugerville, and Lakeway.'
      }
    }
  ]
};

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(path: string) {
  const pathSegments = path.split('/').filter(Boolean);
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://auraspringcleaning.com'
    }
  ];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: name,
      item: `https://auraspringcleaning.com${currentPath}`
    });
  });
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

// How-To Schema for cleaning guides
export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Prepare for a Professional House Cleaning',
  description: 'Step-by-step guide to prepare your home for professional cleaning service',
  image: 'https://auraspringcleaning.com/images/how-to-prepare.jpg',
  totalTime: 'PT30M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0'
  },
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'Storage boxes or baskets'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      text: 'Pick up personal items and clutter from surfaces',
      name: 'Declutter surfaces'
    },
    {
      '@type': 'HowToStep',
      text: 'Secure valuables and fragile items',
      name: 'Secure valuables'
    },
    {
      '@type': 'HowToStep',
      text: 'Provide clear access to all rooms',
      name: 'Clear pathways'
    },
    {
      '@type': 'HowToStep',
      text: 'Communicate any special instructions or areas of focus',
      name: 'Leave instructions'
    }
  ]
};

// Event Schema for promotions
export function generateEventSchema(promotion: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: promotion.name,
    startDate: promotion.startDate,
    endDate: promotion.endDate,
    description: promotion.description,
    location: {
      '@type': 'Place',
      name: 'Austin, TX',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Austin',
        addressRegion: 'TX'
      }
    },
    offers: {
      '@type': 'Offer',
      url: 'https://auraspringcleaning.com/booking',
      price: promotion.discountPrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: promotion.startDate
    },
    organizer: {
      '@type': 'Organization',
      name: 'Aura Spring Cleaning',
      url: 'https://auraspringcleaning.com'
    }
  };
}

// Product Schema for cleaning packages
export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Monthly Cleaning Subscription',
  description: 'Regular house cleaning service subscription with savings',
  brand: {
    '@type': 'Brand',
    name: 'Aura Spring Cleaning'
  },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '120.00',
    highPrice: '250.00',
    priceCurrency: 'USD',
    offerCount: '3',
    offers: [
      {
        '@type': 'Offer',
        name: 'Weekly Cleaning',
        price: '120.00',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        name: 'Bi-Weekly Cleaning',
        price: '135.00',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        name: 'Monthly Cleaning',
        price: '150.00',
        priceCurrency: 'USD'
      }
    ]
  }
};