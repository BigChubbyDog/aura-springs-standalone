import * as Sentry from '@sentry/nextjs';

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || 'YOUR_SENTRY_DSN_HERE',
    
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
    
    replaysOnErrorSampleRate: 1.0,
    
    // This sets the sample rate to be 10%. You may want to change it to 100% in development and lower in production
    replaysSessionSampleRate: 0.1,
    
    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
      Sentry.replayIntegration({
        // Mask all text and media content by default
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Filter out certain errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      // Random network errors
      'Network request failed',
      'NetworkError',
      'Failed to fetch',
      // Ignore browser extension errors
      /extensions\//i,
      /^chrome:\/\//i,
      /^moz-extension:\/\//i,
    ],
    
    beforeSend(event, hint) {
      // Filter out errors from browser extensions
      if (event.exception) {
        const error = hint.originalException;
        // Check if error is from an extension
        if (error && error.stack && error.stack.match(/chrome-extension:|moz-extension:/)) {
          return null;
        }
      }
      return event;
    },
  });
}