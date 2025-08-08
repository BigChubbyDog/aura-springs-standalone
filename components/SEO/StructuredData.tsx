import React from 'react';
import Script from 'next/script';

interface StructuredDataProps {
  type?: 'LocalBusiness' | 'Service' | 'FAQPage' | 'BreadcrumbList' | 'Organization';
  data?: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type = 'LocalBusiness', data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'LocalBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://auraspringcleaning.com",
          "name": "Aura Spring Cleaning",
          "image": [
            "https://auraspringcleaning.com/images/hero-1.jpg",
            "https://auraspringcleaning.com/images/logo.png"
          ],
          "description": "Premium house cleaning and maid services in Austin, TX. Specializing in deep cleaning, regular cleaning, move-in/out cleaning, and Airbnb cleaning for downtown high-rises and luxury homes.",
          "url": "https://auraspringcleaning.com",
          "telephone": "+1-512-781-0527",
          "email": "hello@auraspringcleaning.com",
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
            }
          ],
          "priceRange": "$$",
          "areaServed": [
            {
              "@type": "City",
              "name": "Austin",
              "containedInPlace": {
                "@type": "State",
                "name": "Texas"
              }
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
              "name": "Pflugerville"
            }
          ],
          "sameAs": [
            "https://www.facebook.com/auraspringcleaning",
            "https://www.instagram.com/auraspringcleaning",
            "https://www.linkedin.com/company/auraspringcleaning",
            "https://www.yelp.com/biz/aura-spring-cleaning-austin",
            "https://nextdoor.com/pages/aura-spring-cleaning-austin-tx"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "524",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Sarah Mitchell"
              },
              "datePublished": "2024-11-15",
              "reviewBody": "Best cleaning service in Austin! They transformed my downtown condo and saved me hours every week."
            },
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Michael Chen"
              },
              "datePublished": "2024-10-22",
              "reviewBody": "Professional, thorough, and they use eco-friendly products. My kids and pets are safe!"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cleaning Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "Regular House Cleaning",
                "description": "Weekly, bi-weekly, or monthly recurring cleaning service",
                "price": "120.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Deep Cleaning",
                "description": "Comprehensive top-to-bottom home cleaning",
                "price": "250.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Move In/Out Cleaning",
                "description": "Complete cleaning for moving transitions",
                "price": "300.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            ]
          }
        };

      case 'Service':
        return data || {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "House Cleaning Service",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Aura Spring Cleaning",
            "telephone": "+1-512-781-0527"
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cleaning Services"
          }
        };

      case 'FAQPage':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much does house cleaning cost in Austin?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "House cleaning in Austin typically costs $120-$300 depending on home size and service type. Regular cleaning starts at $120 for a 1-bedroom apartment, while deep cleaning ranges from $250-$400."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide eco-friendly cleaning products?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We offer eco-friendly, non-toxic cleaning products that are safe for children and pets. All our green cleaning products are EPA-approved and biodegradable."
              }
            },
            {
              "@type": "Question",
              "name": "Are you insured and bonded?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Aura Spring Cleaning is fully insured and bonded. We carry $2 million in general liability insurance and all our cleaners are background-checked and trained."
              }
            },
            {
              "@type": "Question",
              "name": "What areas of Austin do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve all of Austin and surrounding areas including Downtown, South Congress, East Austin, West Lake Hills, Round Rock, Cedar Park, Georgetown, and Pflugerville."
              }
            },
            {
              "@type": "Question",
              "name": "How do I book a cleaning service?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can book online through our website, call us at (512) 781-0527, or text us. We offer same-day and next-day service availability for most areas."
              }
            }
          ]
        };

      case 'BreadcrumbList':
        return data || {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://auraspringcleaning.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://auraspringcleaning.com/services"
            }
          ]
        };

      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Aura Spring Cleaning",
          "alternateName": "Aura Springs",
          "url": "https://auraspringcleaning.com",
          "logo": "https://auraspringcleaning.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-512-781-0527",
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": ["English", "Spanish"]
          },
          "foundingDate": "2019",
          "founders": [
            {
              "@type": "Person",
              "name": "Dustin Allan"
            },
            {
              "@type": "Person",
              "name": "Valerie Boatman"
            }
          ]
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
};

export default StructuredData;