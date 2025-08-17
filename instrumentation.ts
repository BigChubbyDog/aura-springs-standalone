/**
 * Instrumentation file for Next.js
 * This file is loaded before the application starts
 * Used for setting up monitoring and observability tools
 */

export async function register() {
  // Only run instrumentation in production
  if (process.env.NODE_ENV === 'production') {
    // Sentry configuration would go here if we were using it
    // Example:
    // if (process.env.NEXT_RUNTIME === 'nodejs') {
    //   await import('./sentry.server.config');
    // }
    // if (process.env.NEXT_RUNTIME === 'edge') {
    //   await import('./sentry.edge.config');
    // }
    
    // For now, we'll just log that instrumentation is loaded
    console.log('Instrumentation loaded');
  }
}