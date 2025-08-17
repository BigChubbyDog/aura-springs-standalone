import './globals-simple.css';
import { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EnhancedLocalBusinessSchema from '@/components/SEO/EnhancedLocalBusinessSchema';
import SkipToContent from '@/components/SkipToContent';
import ScrollToTop from '@/components/ScrollToTop';
import dynamic from 'next/dynamic';

const StickyBookButton = dynamic(() => import('@/components/StickyBookButton'));

const FloatingCTABar = dynamic(() => import('@/components/FloatingCTABar'));

const Breadcrumbs = dynamic(() => import('@/components/Breadcrumbs'));

const ServiceWorkerRegistration = dynamic(() => import('@/components/ServiceWorkerRegistration'));

const CookieConsent = dynamic(() => import('@/components/CookieConsent'));

const Analytics = dynamic(() => import('@/components/Analytics'));

const EmailCapture = dynamic(() => import('@/components/EmailCapture'));

const LiveChat = dynamic(() => import('@/components/LiveChat'));

const AbandonedCartRecovery = dynamic(() => import('@/components/booking/AbandonedCartRecovery'));

const MetaPixelAdvancedMatching = dynamic(() => import('@/components/MetaPixelAdvancedMatching'));

export const metadata: Metadata = {
  title: 'Aura Spring Cleaning | #1 House Cleaning Service Austin TX | Same Day Booking',
  description: '⭐ 5-Star Rated Austin House Cleaning Service. Save 2+ hours weekly! Professional cleaners for homes, condos & Airbnbs. Book online in 60 seconds. Same-day service available. 100% satisfaction guaranteed. Eco-friendly products. Licensed & insured. Call (512) 781-0527 for instant quote!',
  keywords: 'house cleaning austin, cleaning service austin tx, maid service austin, apartment cleaning austin, condo cleaning downtown austin, airbnb cleaning austin, move out cleaning austin, deep cleaning austin texas, house cleaners near me, austin cleaning company, professional house cleaning, recurring cleaning service austin, one time cleaning austin, residential cleaning austin, home cleaning service 78701, austin tx maids, best cleaning service austin, affordable house cleaning austin, eco friendly cleaning austin, green cleaning service austin',
  authors: [{ name: 'Aura Spring Cleaning' }],
  creator: 'Aura Spring Cleaning',
  publisher: 'BigChubbyDog Holdings',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aurasprings.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aura Spring Cleaning | #1 House Cleaning Service Austin TX | Book Online',
    description: '⭐⭐⭐⭐⭐ Trusted by 500+ Austin families. Professional house cleaning from $89. Same-day service. 100% satisfaction guaranteed. Book online in 60 seconds!',
    url: 'https://aurasprings.com',
    siteName: 'Aura Spring Cleaning',
    images: [
      {
        url: 'https://aurasprings.com/images/austin-house-cleaning-service.jpg',
        width: 1200,
        height: 630,
        alt: 'Aura Spring Cleaning - Professional House Cleaning Service Austin Texas',
      },
      {
        url: 'https://aurasprings.com/images/cleaning-team-austin.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Cleaning Team in Austin TX',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Spring Cleaning | #1 House Cleaning Austin TX | Book Now',
    description: '⭐ 5-Star Rated. Professional house cleaning from $89. Same-day service available. 100% satisfaction guaranteed. Book online in 60 seconds!',
    images: ['https://aurasprings.com/images/twitter-card.jpg'],
    creator: '@auraspringclean',
    site: '@auraspringclean',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || 'google-site-verification=YOUR_CODE_HERE',
    bing: 'YOUR_BING_VERIFICATION_CODE',
  },
  category: 'cleaning service',
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Austin',
    'geo.position': '30.2672;-97.7431',
    'ICBM': '30.2672, -97.7431',
    'og:locality': 'Austin',
    'og:region': 'TX',
    'og:postal-code': '78701',
    'og:country-name': 'USA',
    'og:email': 'hello@aurasprings.com',
    'og:phone_number': '+1-512-781-0527',
    'article:author': 'Aura Spring Cleaning',
    'article:publisher': 'https://www.facebook.com/pages/703446826182837',
    'fb:page_id': '703446826182837',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Analytics configuration
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NCMQXRKL'; // Using provided GTM ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-JB55XBQ8Y3'; // Using provided GA ID
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '753683467224168'; // Using provided Meta Pixel ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Must be as high as possible in head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NCMQXRKL');
            `,
          }}
        />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/images/AuraClean.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/Aura 512x512.svg" />
        <meta name="theme-color" content="#7c9768" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Aura Spring Cleaning" />
        <meta name="copyright" content="Aura Spring Cleaning, LLC" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Austin" />
        <meta name="geo.position" content="30.2672;-97.7431" />
        <meta name="ICBM" content="30.2672, -97.7431" />
        
        {/* Local Business Schema */}
        <meta itemProp="name" content="Aura Spring Cleaning" />
        <meta itemProp="telephone" content="+1-512-781-0527" />
        <meta itemProp="email" content="hello@aurasprings.com" />
        <meta itemProp="address" content="Austin, TX 78701" />
        
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="pnbwtozgdfalnrrcodc3fu0h3qoeum" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JB55XBQ8Y3"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JB55XBQ8Y3', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '753683467224168');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script
            id="ms-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `,
            }}
          />
        )}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="bg-white">
        {/* Google Tag Manager (noscript) - Must be immediately after opening body tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NCMQXRKL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Skip to main content for screen readers */}
        <SkipToContent />
        
        {/* Floating CTA Bar */}
        <FloatingCTABar />
        
        {/* Scroll to top on page navigation */}
        <ScrollToTop />
        
        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=753683467224168&ev=PageView&noscript=1"
          />
        </noscript>

        <Header />
        <Breadcrumbs />
        {children}
        <Footer />
        
        {/* Sticky Book Button for Mobile */}
        <StickyBookButton />
        
        {/* Service Worker Registration */}
        <ServiceWorkerRegistration />
        
        {/* Cookie Consent for GDPR/CCPA */}
        <CookieConsent />
        
        {/* Analytics and Tracking */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        
        {/* Email Capture Lead Magnet */}
        <EmailCapture variant="popup" delay={15000} />
        
        {/* Live Chat Widget */}
        <LiveChat position="bottom-right" />
        
        {/* Abandoned Cart Recovery */}
        <AbandonedCartRecovery />
        
        {/* Meta Pixel Advanced Matching */}
        <MetaPixelAdvancedMatching />
        
        {/* Structured Data */}
        <EnhancedLocalBusinessSchema />
      </body>
    </html>
  );
}