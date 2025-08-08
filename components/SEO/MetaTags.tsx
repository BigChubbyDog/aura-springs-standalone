import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  noindex?: boolean;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'Aura Spring Cleaning - #1 House Cleaning Service in Austin, TX',
  description = 'Premium house cleaning and maid services in Austin. Expert deep cleaning, regular cleaning, move-in/out, and Airbnb cleaning. Eco-friendly, insured, and trusted by 1000+ Austin homes. Book online or call (512) 781-0527.',
  keywords = 'house cleaning Austin, maid service Austin TX, deep cleaning Austin, Airbnb cleaning Austin, move out cleaning Austin, eco-friendly cleaning Austin, residential cleaning Austin, professional cleaners Austin, home cleaning service Austin, apartment cleaning Austin',
  image = 'https://auraspringcleaning.com/images/og-image.jpg',
  url = 'https://auraspringcleaning.com',
  type = 'website',
  author = 'Aura Spring Cleaning',
  publishDate,
  modifiedDate,
  noindex = false,
}) => {
  const fullTitle = title.includes('Aura') ? title : `${title} | Aura Spring Cleaning`;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={url} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Aura Spring Cleaning" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@auraspringclean" />
      <meta property="twitter:creator" content="@auraspringclean" />
      
      {/* Article specific */}
      {type === 'article' && publishDate && (
        <>
          <meta property="article:published_time" content={publishDate} />
          {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
          <meta property="article:author" content={author} />
        </>
      )}
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="Austin" />
      <meta name="geo.position" content="30.2672;-97.7431" />
      <meta name="ICBM" content="30.2672, -97.7431" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="1234 Congress Ave" />
      <meta name="business:contact_data:locality" content="Austin" />
      <meta name="business:contact_data:region" content="TX" />
      <meta name="business:contact_data:postal_code" content="78701" />
      <meta name="business:contact_data:country_name" content="United States" />
      <meta name="business:contact_data:email" content="hello@auraspringcleaning.com" />
      <meta name="business:contact_data:phone_number" content="+15127810527" />
      <meta name="business:contact_data:website" content="https://auraspringcleaning.com" />
      
      {/* Mobile App */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Aura Cleaning" />
      
      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#7c9768" />
      
      {/* Verification Tags */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      <meta name="p:domain_verify" content="YOUR_PINTEREST_VERIFICATION_CODE" />
    </Head>
  );
};

export default MetaTags;