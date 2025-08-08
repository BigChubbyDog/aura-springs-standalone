import Script from 'next/script';

export default function RaineyStreetGeoTarget() {
  // Rainey Street coordinates: 30.2590° N, 97.7383° W
  // 3-mile radius covers all of downtown Austin
  
  const geoStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://aurasprings.com/areas/rainey-street#service",
    "name": "Rainey Street Premium Cleaning Service",
    "description": "Luxury cleaning service for Rainey Street high-rises including The Quincy, 70 Rainey, 44 East Ave. Same-day service within 3 miles of downtown Austin.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Aura Spring Cleaning",
      "@id": "https://aurasprings.com/#organization"
    },
    "areaServed": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 30.2590,
          "longitude": -97.7383,
          "name": "Rainey Street District"
        },
        "geoRadius": "3 mi",
        "description": "3-mile service radius from Rainey Street covering Downtown Austin, East Austin, South Congress, and surrounding areas"
      },
      {
        "@type": "PostalCodeRange",
        "postalCodeBeginning": "78701",
        "postalCodeEnd": "78705",
        "addressCountry": "US",
        "addressRegion": "TX"
      }
    ],
    "serviceArea": {
      "@type": "AdministrativeArea",
      "geo": {
        "@type": "GeoShape",
        "box": "30.2300,-97.7700 30.2880,-97.7066",
        "description": "Downtown Austin service area including Rainey Street District"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Rainey Street Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Quincy Resident Special",
          "description": "Exclusive rates for The Quincy residents",
          "eligibleRegion": {
            "@type": "Place",
            "address": "516 E 6th St, Austin, TX 78701"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "120",
            "priceCurrency": "USD",
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "unitText": "1BR/1BA up to 1200 sq ft"
            }
          }
        },
        {
          "@type": "Offer",
          "name": "Rainey Tower Service",
          "description": "Premium cleaning for all Rainey Street towers",
          "eligibleRegion": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 30.2590,
              "longitude": -97.7383
            },
            "geoRadius": "0.5 mi"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "150",
            "priceCurrency": "USD"
          }
        }
      ]
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://aurasprings.com/booking?location=rainey-street",
      "servicePhone": "+1-512-781-0527",
      "availableLanguage": ["en"],
      "serviceLocation": {
        "@type": "Place",
        "name": "Rainey Street District",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "postalCode": "78701"
        }
      }
    },
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://aurasprings.com/booking?location=rainey-street&building={building_name}",
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform"
        ]
      },
      "deliveryMethod": {
        "@type": "DeliveryMethod",
        "name": "OnSite"
      },
      "object": {
        "@type": "Service",
        "name": "Rainey Street Cleaning Service"
      }
    }
  };

  const localBusinessListing = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aura Spring Cleaning - Rainey Street",
    "image": "https://aurasprings.com/images/rainey-street-office.jpg",
    "url": "https://aurasprings.com/areas/rainey-street",
    "telephone": "+15127810527",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Serving all Rainey Street towers",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78701",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.2590,
      "longitude": -97.7383
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
    "sameAs": [
      "https://www.google.com/maps/place/Rainey+Street+Austin",
      "https://www.yelp.com/biz/aura-spring-cleaning-austin-rainey",
      "https://nextdoor.com/pages/aura-spring-cleaning-rainey-street"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "High-Rise Condo Cleaning",
          "description": "Specialized cleaning for Rainey Street towers"
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aurasprings.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Service Areas",
        "item": "https://aurasprings.com/areas"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Rainey Street",
        "item": "https://aurasprings.com/areas/rainey-street"
      }
    ]
  };

  // Google Ads location targeting script
  const googleAdsLocationScript = `
    gtag('event', 'page_view', {
      'send_to': 'AW-CONVERSION_ID',
      'user_properties': {
        'location_targeting': 'rainey_street_3mi',
        'service_area': 'downtown_austin',
        'radius_miles': 3,
        'center_lat': 30.2590,
        'center_lng': -97.7383
      }
    });

    // Enhanced Conversions for location-based bookings
    gtag('set', 'user_data', {
      'address': {
        'city': 'Austin',
        'region': 'TX',
        'postal_code': '78701',
        'country': 'US'
      }
    });
  `;

  return (
    <>
      <Script
        id="rainey-geo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(geoStructuredData) }}
        strategy="afterInteractive"
      />
      <Script
        id="rainey-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessListing) }}
        strategy="afterInteractive"
      />
      <Script
        id="rainey-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-geo"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: googleAdsLocationScript }}
      />
    </>
  );
}