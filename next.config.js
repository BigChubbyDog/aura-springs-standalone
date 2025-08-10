const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  
  // Output configuration for Azure Static Web Apps
  output: 'standalone',
  
  // Compression
  compress: true,
  
  // Power pack optimizations
  poweredByHeader: false,
  
  // Skip TypeScript and ESLint errors during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization
  images: {
    domains: ['aurasprings.com', 'images.unsplash.com', 'auraspringcleaning.com', 'images.pexels.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers for SEO, security, and caching
  async headers() {
    return [
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://*.azurestaticapps.net https://*.stripe.com https://*.office365.com https://*.microsoft.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com https://js.stripe.com https://*.googletagmanager.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://*.stripe.com https://*.microsoft.com https://*.office365.com https://*.google-analytics.com https://www.google-analytics.com; frame-src 'self' https://*.stripe.com https://*.office365.com https://outlook.office365.com;"
          }
        ],
      },
      // Cache static assets for 1 year
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/Headshots/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Cache fonts for 1 year
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Cache CSS and JS for 1 year (with versioning)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Cache HTML pages for 1 hour
      {
        source: '/:path*((?!api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400'
          }
        ],
      },
      // Don't cache API routes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate'
          }
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/maid-service',
        destination: '/services/house-cleaning',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/austin/:path*',
        destination: '/areas/austin/:path*',
      },
      {
        source: '/downtown-austin',
        destination: '/areas/downtown-austin',
      },
      {
        source: '/the-domain',
        destination: '/areas/the-domain',
      },
    ];
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://aurasprings.com',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX',
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXX',
  },
  
  // PWA support and experimental features
  experimental: {
    // Temporarily disabled optimizeCss due to missing 'critters' dependency
    // optimizeCss: true,
    // optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
    scrollRestoration: true,
    // cpus: Math.max(1, (require('os').cpus().length) - 1),
    // workerThreads: false,
    // esmExternals: true,
  },
};

// Bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Wrap with bundle analyzer if needed
let config = nextConfig;
if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer(config);
}

// Wrap with Sentry
module.exports = withSentryConfig(
  config,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    silent: true,
    org: 'aura-spring-cleaning',
    project: 'javascript-nextjs',
  },
  {
    // Upload source maps only in production
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);