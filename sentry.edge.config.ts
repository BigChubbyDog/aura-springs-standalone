import * as Sentry from '@sentry/nextjs';

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || 'YOUR_SENTRY_DSN_HERE',
    
    // Adjust this value in production
    tracesSampleRate: 1.0,
    
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}