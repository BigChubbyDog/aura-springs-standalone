import Script from 'next/script';

export default function LocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "@id": "https://aurasprings.com/#organization",
    "name": "Aura Spring Cleaning",
    "alternateName": "Aura Springs Professional Cleaning",
    "url": "https://aurasprings.com",
    "logo": "https://aurasprings.com/images/AuraClean.svg",
    "image": [
      "https://aurasprings.com/images/hero-cleaning.jpg",
      "https://aurasprings.com/images/team-photo.jpg",
      "https://aurasprings.com/images/austin-skyline.jpg"
    ],
    "description": "Austin's premier luxury cleaning service specializing in high-rise condos, downtown apartments, and Airbnb properties. Professional, insured, and eco-friendly cleaning solutions.",
    "telephone": "+1-512-781-0527",
    "email": "hello@aurasprings.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1234 Congress Ave",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78701",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.2672,
      "longitude": -97.7431
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "$$$",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Venmo", "Zelle", "Apple Pay"],
    "currenciesAccepted": "USD",
    "areaServed": [
      {
        "@type": "City",
        "name": "Austin",
        "@id": "https://www.wikidata.org/wiki/Q16559"
      },
      {
        "@type": "City",
        "name": "Round Rock"
      },
      {
        "@type": "City",
        "name": "Cedar Park"
      },
      {
        "@type": "City",
        "name": "Georgetown"
      },
      {
        "@type": "City",
        "name": "Lakeway"
      },
      {
        "@type": "City",
        "name": "Bee Cave"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 30.2672,
        "longitude": -97.7431
      },
      "geoRadius": "30 mi"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard House Cleaning",
            "description": "Regular maintenance cleaning for homes and apartments",
            "provider": {
              "@id": "https://aurasprings.com/#organization"
            }
          },
          "price": "150",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Deep Cleaning",
            "description": "Thorough top-to-bottom cleaning service",
            "provider": {
              "@id": "https://aurasprings.com/#organization"
            }
          },
          "price": "225",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Move In/Out Cleaning",
            "description": "Complete cleaning for moving transitions",
            "provider": {
              "@id": "https://aurasprings.com/#organization"
            }
          },
          "price": "270",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "527",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Mitchell"
        },
        "datePublished": "2024-01-15",
        "reviewBody": "Aura Spring Cleaning transformed my high-rise condo! Their attention to detail is unmatched. Professional team, eco-friendly products, and amazing results every time.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "datePublished": "2024-01-20",
        "reviewBody": "Best cleaning service in Austin! They handle my Airbnb turnovers perfectly. Guests always comment on how spotless everything is.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Dustin Allan",
      "jobTitle": "CEO & Founder"
    },
    "foundingDate": "2018",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 15
    },
    "slogan": "Transform Your Space Into a Sanctuary of Cleanliness",
    "award": [
      "Best Cleaning Service Austin 2023",
      "Top Rated on Yelp 2022-2024",
      "Nextdoor Neighborhood Favorite 2023"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Austin Chamber of Commerce"
      },
      {
        "@type": "Organization",
        "name": "International Sanitary Supply Association"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/aurasprings",
      "https://www.instagram.com/auraspringcleaning",
      "https://www.linkedin.com/company/aura-spring-cleaning",
      "https://www.yelp.com/biz/aura-spring-cleaning-austin",
      "https://nextdoor.com/pages/aura-spring-cleaning-austin-tx",
      "https://www.google.com/maps/place/Aura+Spring+Cleaning"
    ],
    "potentialAction": [
      {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://aurasprings.com/booking",
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        },
        "result": {
          "@type": "Reservation",
          "name": "Book Cleaning Service"
        }
      },
      {
        "@type": "SearchAction",
        "target": "https://aurasprings.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    ]
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
}