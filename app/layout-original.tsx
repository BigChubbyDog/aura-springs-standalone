import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

// SEO-optimized metadata for Austin cleaning service
export const metadata: Metadata = {
  metadataBase: new URL('https://aurasprings.com'),
  title: {
    default: 'Aura Springs Cleaning | #1 House Cleaning Service Austin TX | Downtown High-Rise Specialists',
    template: '%s | Aura Springs Austin'
  },
  description: 'Austin\'s premier luxury cleaning service specializing in downtown high-rises, condos, penthouses & Airbnb. ⭐ 4.9 Google Rating ✓ Same-day service ✓ Licensed & insured. Book online in 60 seconds!',
  keywords: [
    'house cleaning Austin',
    'cleaning service Austin TX',
    'Austin maid service',
    'downtown Austin cleaning',
    'high-rise cleaning Austin',
    'luxury condo cleaning Austin',
    'Airbnb cleaning Austin',
    'penthouse cleaning service',
    'The Domain cleaning service',
    'Rainey Street cleaning',
    'South Congress cleaning',
    'East Austin cleaning service',
    'professional cleaners Austin',
    'eco-friendly cleaning Austin',
    'same day cleaning Austin',
    'deep cleaning Austin',
    'move out cleaning Austin',
    'recurring cleaning Austin',
    'apartment cleaning Austin TX',
    'commercial cleaning Austin'
  ],
  authors: [{ name: 'Aura Springs Cleaning' }],
  creator: 'Aura Springs',
  publisher: 'Aura Springs Cleaning Services LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aurasprings.com',
    siteName: 'Aura Springs Cleaning Austin',
    title: 'Aura Springs - Austin\'s #1 Luxury Cleaning Service | Downtown High-Rise Specialists',
    description: 'Transform your Austin home with our premium cleaning service. Specializing in downtown high-rises, luxury condos & Airbnb properties. Book online - 20% off first clean!',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aura Springs Cleaning - Austin\'s Premier Cleaning Service',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Springs Cleaning | Austin\'s Premier House Cleaning Service',
    description: 'Downtown Austin\'s trusted cleaning service. High-rises, condos, Airbnb. Book online in 60 seconds!',
    images: ['/images/twitter-card.jpg'],
    creator: '@auraspringsatx',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aurasprings.com',
    languages: {
      'en-US': 'https://aurasprings.com',
      'es-US': 'https://aurasprings.com/es',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  category: 'Cleaning Services',
};

// Structured Data for Local Business
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CleaningService',
  '@id': 'https://aurasprings.com',
  name: 'Aura Springs Cleaning',
  image: 'https://aurasprings.com/images/logo.png',
  logo: 'https://aurasprings.com/images/AuraClean.svg',
  url: 'https://aurasprings.com',
  telephone: '+15125552872',
  email: 'hello@aurasprings.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Congress Ave',
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
  sameAs: [
    'https://www.facebook.com/auraspringsatx',
    'https://www.instagram.com/auraspringsatx',
    'https://www.linkedin.com/company/aura-springs-cleaning',
    'https://www.yelp.com/biz/aura-springs-cleaning-austin',
    'https://www.nextdoor.com/pages/aura-springs-cleaning-austin-tx'
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '523',
    bestRating: '5',
    worstRating: '1'
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Austin',
      '@id': 'https://en.wikipedia.org/wiki/Austin,_Texas'
    },
    {
      '@type': 'PostalCode',
      postalCode: '78701'
    },
    {
      '@type': 'PostalCode',
      postalCode: '78702'
    },
    {
      '@type': 'PostalCode',
      postalCode: '78703'
    },
    {
      '@type': 'PostalCode',
      postalCode: '78704'
    },
    {
      '@type': 'PostalCode',
      postalCode: '78758'
    },
    {
      '@type': 'PostalCode',
      postalCode: '78746'
    }
  ],
  serviceType: [
    'House Cleaning',
    'Apartment Cleaning',
    'Condo Cleaning',
    'High-Rise Cleaning',
    'Penthouse Cleaning',
    'Airbnb Cleaning',
    'Move In/Out Cleaning',
    'Deep Cleaning',
    'Recurring Cleaning',
    'Commercial Cleaning'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Regular Cleaning',
          description: 'Professional home cleaning service for Austin residents'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Deep Cleaning',
          description: 'Comprehensive deep cleaning for Austin homes'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Airbnb Turnover',
          description: 'Quick turnover cleaning for Airbnb hosts in Austin'
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Essential Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#7c9768" />
        
        {/* Geo-targeting Meta Tags */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Austin" />
        <meta name="geo.position" content="30.2672;-97.7431" />
        <meta name="ICBM" content="30.2672, -97.7431" />
        
        {/* Local Business Meta */}
        <meta name="business:contact_data:street_address" content="123 Congress Ave" />
        <meta name="business:contact_data:locality" content="Austin" />
        <meta name="business:contact_data:region" content="TX" />
        <meta name="business:contact_data:postal_code" content="78701" />
        <meta name="business:contact_data:country_name" content="United States" />
        <meta name="business:contact_data:phone_number" content="+15125552872" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Additional SEO Scripts */}
        <link rel="canonical" href="https://aurasprings.com" />
        <link rel="alternate" hrefLang="en-US" href="https://aurasprings.com" />
        <link rel="alternate" hrefLang="es-US" href="https://aurasprings.com/es" />
      </head>
      
      <body className={inter.className}>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXX');
            `,
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        
        <Header />
        {children}
        <Footer />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}