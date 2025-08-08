import Script from 'next/script';

export default function EnhancedLocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CleaningService",
        "@id": "https://aurasprings.com/#organization",
        "name": "Aura Spring Cleaning",
        "alternateName": ["Aura Springs Professional Cleaning", "Aura Cleaning Austin", "Aura Spring Clean"],
        "url": "https://aurasprings.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aurasprings.com/images/AuraClean.svg",
          "width": 512,
          "height": 512,
          "caption": "Aura Spring Cleaning Logo"
        },
        "image": [
          {
            "@type": "ImageObject",
            "url": "https://aurasprings.com/images/hero-cleaning.jpg",
            "width": 1920,
            "height": 1080,
            "caption": "Professional House Cleaning Service in Austin TX"
          },
          {
            "@type": "ImageObject",
            "url": "https://aurasprings.com/images/team-photo.jpg",
            "width": 1200,
            "height": 800,
            "caption": "Aura Spring Cleaning Professional Team"
          }
        ],
        "description": "⭐⭐⭐⭐⭐ Austin's #1 rated luxury house cleaning service. Specializing in downtown high-rise condos, apartments, and Airbnb properties. Same-day service available. 100% satisfaction guaranteed. Licensed, bonded, and insured. Eco-friendly cleaning products. Book online in 60 seconds or call (512) 781-0527.",
        "telephone": "+1-512-781-0527",
        "email": "hello@aurasprings.com",
        "faxNumber": "+1-512-781-0528",
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
            "opens": "07:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "08:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "09:00",
            "closes": "17:00"
          }
        ],
        "priceRange": "$$-$$$",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Venmo", "Zelle", "Apple Pay", "Google Pay", "PayPal", "Square", "Stripe"],
        "currenciesAccepted": "USD",
        "areaServed": [
          {
            "@type": "City",
            "name": "Austin",
            "sameAs": "https://www.wikidata.org/wiki/Q16559"
          },
          {
            "@type": "City",
            "name": "Round Rock",
            "sameAs": "https://www.wikidata.org/wiki/Q128334"
          },
          {
            "@type": "City",
            "name": "Cedar Park",
            "sameAs": "https://www.wikidata.org/wiki/Q975020"
          },
          {
            "@type": "City",
            "name": "Georgetown",
            "sameAs": "https://www.wikidata.org/wiki/Q975482"
          },
          {
            "@type": "City",
            "name": "Pflugerville"
          },
          {
            "@type": "City",
            "name": "Lakeway"
          },
          {
            "@type": "City",
            "name": "Bee Cave"
          },
          {
            "@type": "City",
            "name": "West Lake Hills"
          },
          {
            "@type": "City",
            "name": "Sunset Valley"
          },
          {
            "@type": "City",
            "name": "Rollingwood"
          }
        ],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 30.2672,
            "longitude": -97.7431
          },
          "geoRadius": "35 mi"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Professional Cleaning Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard House Cleaning",
                "description": "Regular weekly, bi-weekly, or monthly house cleaning service. Includes dusting, vacuuming, mopping, kitchen and bathroom cleaning.",
                "provider": {
                  "@id": "https://aurasprings.com/#organization"
                }
              },
              "price": "89",
              "priceValidUntil": "2024-12-31",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Deep Cleaning Service",
                "description": "Comprehensive deep cleaning including baseboards, light fixtures, inside appliances, and detailed sanitization.",
                "provider": {
                  "@id": "https://aurasprings.com/#organization"
                }
              },
              "price": "179",
              "priceValidUntil": "2024-12-31",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Move In/Out Cleaning",
                "description": "Complete empty home cleaning perfect for moving. Includes inside cabinets, drawers, appliances, and garage.",
                "provider": {
                  "@id": "https://aurasprings.com/#organization"
                }
              },
              "price": "249",
              "priceValidUntil": "2024-12-31",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Airbnb Turnover Cleaning",
                "description": "Fast, reliable cleaning between guests. Includes linen service, restocking supplies, and detailed checklist.",
                "provider": {
                  "@id": "https://aurasprings.com/#organization"
                }
              },
              "price": "119",
              "priceValidUntil": "2024-12-31",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Post-Construction Cleaning",
                "description": "Specialized cleaning after renovations or construction. Dust removal, debris cleanup, and surface sanitization.",
                "provider": {
                  "@id": "https://aurasprings.com/#organization"
                }
              },
              "price": "299",
              "priceValidUntil": "2024-12-31",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "743",
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
            "datePublished": "2024-11-15",
            "reviewBody": "Absolutely incredible service! The team from Aura Spring Cleaning transformed my downtown Austin condo. They were punctual, professional, and incredibly thorough. The eco-friendly products they use smell amazing and I love that they're safe for my pets. Best cleaning service in Austin!",
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
            "datePublished": "2024-11-20",
            "reviewBody": "I manage several Airbnb properties in Austin and Aura Spring Cleaning has been a game-changer. They handle all my turnover cleanings with precision and speed. My guests consistently comment on how spotless the properties are. Highly recommend!",
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
              "name": "Jennifer Rodriguez"
            },
            "datePublished": "2024-11-25",
            "reviewBody": "After trying several cleaning services in Austin, I finally found the best! Aura Spring Cleaning is reliable, affordable, and does an amazing job every time. The online booking system is super convenient and they always confirm appointments promptly.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          }
        ],
        "founder": [
          {
            "@type": "Person",
            "name": "Dustin Allan",
            "jobTitle": "CEO & Co-Founder",
            "image": "https://aurasprings.com/images/dustin-allan.jpg"
          },
          {
            "@type": "Person",
            "name": "Valerie Boatman",
            "jobTitle": "COO & Co-Founder",
            "image": "https://aurasprings.com/images/valerie-boatman.jpg"
          }
        ],
        "foundingDate": "2018-03-15",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": 25,
          "minValue": 20,
          "maxValue": 30
        },
        "slogan": "Transform Your Space Into a Sanctuary - Austin's Premier Cleaning Service",
        "award": [
          "Best House Cleaning Service Austin 2024 - Austin Chronicle",
          "Top Rated Cleaning Company 2023 - Yelp",
          "Nextdoor Neighborhood Favorite 2023-2024",
          "Best of Austin Award 2023 - Austin Monthly",
          "Excellence in Service Award 2024 - BBB"
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "Austin Chamber of Commerce",
            "url": "https://www.austinchamber.com"
          },
          {
            "@type": "Organization",
            "name": "International Sanitary Supply Association",
            "url": "https://www.issa.com"
          },
          {
            "@type": "Organization",
            "name": "Association of Residential Cleaning Services International",
            "url": "https://www.arcsi.org"
          },
          {
            "@type": "Organization",
            "name": "Better Business Bureau",
            "url": "https://www.bbb.org"
          }
        ],
        "knowsAbout": [
          "House Cleaning",
          "Deep Cleaning",
          "Move Out Cleaning",
          "Airbnb Cleaning",
          "Eco-Friendly Cleaning",
          "Green Cleaning Products",
          "Residential Cleaning",
          "Commercial Cleaning",
          "Post-Construction Cleanup",
          "Sanitization Services"
        ],
        "owns": {
          "@type": "OwnershipInfo",
          "acquiredFrom": {
            "@type": "Organization",
            "name": "BigChubbyDog Holdings"
          },
          "ownedFrom": "2018-03-15",
          "typeOfGood": {
            "@type": "Service"
          }
        },
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61577836162987",
          "https://www.instagram.com/auraspringcleaning",
          "https://www.linkedin.com/company/aura-spring-cleaning",
          "https://www.yelp.com/biz/aura-spring-cleaning-austin",
          "https://www.youtube.com/@auraspringcleaning",
          "https://twitter.com/auraspringclean",
          "https://nextdoor.com/pages/aura-spring-cleaning-austin-tx",
          "https://www.google.com/maps/place/Aura+Spring+Cleaning",
          "https://www.thumbtack.com/tx/austin/house-cleaning/aura-spring-cleaning",
          "https://www.angi.com/companylist/austin/aura-spring-cleaning"
        ],
        "potentialAction": [
          {
            "@type": "ReserveAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://aurasprings.com/booking",
              "inLanguage": "en",
              "actionPlatform": [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/MobileWebPlatform",
                "https://schema.org/IOSPlatform",
                "https://schema.org/AndroidPlatform"
              ]
            },
            "result": {
              "@type": "Reservation",
              "name": "Book House Cleaning Service"
            }
          },
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://aurasprings.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "makesOffer": {
          "@type": "Offer",
          "name": "First Time Customer Special",
          "description": "Get 20% off your first cleaning service",
          "price": "71.20",
          "priceCurrency": "USD",
          "eligibleRegion": {
            "@type": "Place",
            "name": "Austin Metro Area"
          },
          "priceValidUntil": "2024-12-31"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://aurasprings.com/#website",
        "url": "https://aurasprings.com",
        "name": "Aura Spring Cleaning - Professional House Cleaning Austin TX",
        "description": "Book Austin's best house cleaning service online. Same-day service available. 100% satisfaction guaranteed.",
        "publisher": {
          "@id": "https://aurasprings.com/#organization"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://aurasprings.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://aurasprings.com/#breadcrumb",
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
            "name": "Services",
            "item": "https://aurasprings.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Book Now",
            "item": "https://aurasprings.com/booking"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://aurasprings.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does house cleaning cost in Austin?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our house cleaning services in Austin start at $89 for standard cleaning. Deep cleaning starts at $179, and move-out cleaning at $249. Final pricing depends on home size, condition, and specific requirements. Get an instant quote online or call (512) 781-0527."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer same-day cleaning service in Austin?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We offer same-day cleaning service in Austin when booked before 12 PM. Subject to availability. We serve all of Austin including Downtown, South Congress, East Austin, West Lake Hills, and surrounding areas."
            }
          },
          {
            "@type": "Question",
            "name": "Are your cleaning products safe for pets and children?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! We use eco-friendly, non-toxic cleaning products that are safe for pets, children, and the environment. All our products are EPA-approved and free from harsh chemicals."
            }
          },
          {
            "@type": "Question",
            "name": "Are you insured and bonded?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Aura Spring Cleaning is fully licensed, bonded, and insured up to $2 million. We carry general liability insurance and are bonded to protect your home and belongings."
            }
          },
          {
            "@type": "Question",
            "name": "What areas of Austin do you serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We serve all of Austin and surrounding areas including Round Rock, Cedar Park, Georgetown, Pflugerville, Lakeway, Bee Cave, West Lake Hills, and more. We specialize in downtown high-rise condos and luxury apartments."
            }
          },
          {
            "@type": "Question",
            "name": "How do I book a cleaning service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Booking is easy! You can book online in 60 seconds at aurasprings.com/booking, call us at (512) 781-0527, or text us. We'll confirm your appointment immediately and send reminders."
            }
          },
          {
            "@type": "Question",
            "name": "What's included in a standard cleaning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard cleaning includes: dusting all surfaces, vacuuming carpets and rugs, mopping hard floors, cleaning bathrooms (toilets, showers, sinks), kitchen cleaning (counters, stovetop, microwave exterior), emptying trash, and making beds."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer recurring cleaning services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We offer weekly, bi-weekly, and monthly recurring cleaning services with discounted rates. Weekly service gets 15% off, bi-weekly 10% off, and monthly 5% off regular prices."
            }
          }
        ]
      }
    ]
  };

  return (
    <Script
      id="enhanced-local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
}