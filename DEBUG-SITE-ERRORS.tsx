// 🚨 SITE ERROR DEBUGGING WITH CONSOLE NINJA
// This component tracks and helps fix all site errors

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ErrorInfo {
  type: string;
  message: string;
  page: string;
  timestamp: string;
  stack?: string;
}

interface PageLoadInfo {
  path: string;
  loadTime: number;
  status: 'fast' | 'slow' | 'critical';
}

export default function SiteErrorDebugger() {
  const pathname = usePathname();
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [pageLoads, setPageLoads] = useState<PageLoadInfo[]>([]);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  
  useEffect(() => {
    // Track page load performance
    const startTime = performance.now();
    console.group(`📄 Page Load: ${pathname}`);
    console.time('Page Load Time');
    
    // Check for slow pages from our test
    const slowPages = [
      '/areas/the-domain',
      '/towers/the-quincy', 
      '/towers/70-rainey',
      '/towers/the-shore',
      '/terms',
      '/privacy'
    ];
    
    if (slowPages.includes(pathname)) {
      console.error(`⚠️ KNOWN SLOW/BROKEN PAGE: ${pathname}`);
      console.log('This page has issues that need fixing!');
    }
    
    // Track all console errors
    const originalError = console.error;
    console.error = function(...args) {
      console.group('🚨 ERROR CAPTURED');
      console.log('Page:', pathname);
      console.log('Error:', args[0]);
      console.trace('Stack trace');
      console.groupEnd();
      
      setErrors(prev => [...prev, {
        type: 'console.error',
        message: String(args[0]),
        page: pathname,
        timestamp: new Date().toISOString()
      }]);
      
      originalError.apply(console, args);
    };
    
    // Track image loading errors
    const handleImageError = (e: Event) => {
      const target = e.target as HTMLImageElement;
      console.group('🖼️ IMAGE ERROR');
      console.error('Failed to load image:', target.src);
      console.log('Alt text:', target.alt);
      console.log('Parent element:', target.parentElement);
      
      // Check if it's the empty string issue
      if (target.src === '' || target.src === window.location.href) {
        console.error('⚠️ EMPTY SRC ATTRIBUTE DETECTED!');
        console.log('This causes page reload - CRITICAL BUG');
      }
      
      console.groupEnd();
      
      setImageErrors(prev => [...prev, target.src]);
    };
    
    // Add global error listeners
    window.addEventListener('error', (e) => {
      console.group('🌐 WINDOW ERROR');
      console.error('Global error:', e.message);
      console.log('Filename:', e.filename);
      console.log('Line:', e.lineno, 'Column:', e.colno);
      console.groupEnd();
    });
    
    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.group('⚡ UNHANDLED PROMISE REJECTION');
      console.error('Promise rejected:', e.reason);
      console.trace();
      console.groupEnd();
    });
    
    // Find all images and add error handlers
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src === '' || img.src === window.location.href) {
        console.error(`🚨 Empty src on image with alt="${img.alt}"`);
      }
      img.addEventListener('error', handleImageError);
    });
    
    // Check for broken links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        // Internal link - check if page exists
        fetch(href, { method: 'HEAD' })
          .then(res => {
            if (!res.ok) {
              console.error(`❌ Broken link found: ${href}`);
              setBrokenLinks(prev => [...prev, href]);
            }
          })
          .catch(() => {
            console.error(`❌ Failed to check link: ${href}`);
          });
      }
    });
    
    // Track page load completion
    const loadEndTime = performance.now();
    const loadTime = loadEndTime - startTime;
    
    console.timeEnd('Page Load Time');
    
    let status: 'fast' | 'slow' | 'critical' = 'fast';
    if (loadTime > 10000) {
      status = 'critical';
      console.error(`🔴 CRITICAL: Page took ${(loadTime/1000).toFixed(1)}s to load!`);
    } else if (loadTime > 3000) {
      status = 'slow';
      console.warn(`🟡 SLOW: Page took ${(loadTime/1000).toFixed(1)}s to load`);
    } else {
      console.log(`🟢 FAST: Page loaded in ${loadTime.toFixed(0)}ms`);
    }
    
    setPageLoads(prev => [...prev, {
      path: pathname,
      loadTime,
      status
    }]);
    
    console.groupEnd();
    
    // Cleanup
    return () => {
      console.error = originalError;
      images.forEach(img => {
        img.removeEventListener('error', handleImageError);
      });
    };
  }, [pathname]);
  
  // Debug specific known issues
  useEffect(() => {
    console.group('🔍 CHECKING KNOWN ISSUES');
    
    // Issue 1: Sentry configuration
    if (typeof window !== 'undefined' && !(window as any).Sentry) {
      console.warn('⚠️ Sentry not configured properly');
      console.log('Fix: Move sentry configs to instrumentation.ts');
    }
    
    // Issue 2: Missing API routes
    const apiEndpoints = [
      '/api/booking',
      '/api/contact', 
      '/api/quote'
    ];
    
    apiEndpoints.forEach(endpoint => {
      fetch(endpoint, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            console.log(`✅ API endpoint working: ${endpoint}`);
          } else {
            console.error(`❌ API endpoint error: ${endpoint} - ${res.status}`);
          }
        })
        .catch(err => {
          console.error(`❌ API endpoint failed: ${endpoint}`, err);
        });
    });
    
    // Issue 3: Check for missing env variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_PHONE',
      'NEXT_PUBLIC_EMAIL',
      'EMAIL_TO'
    ];
    
    requiredEnvVars.forEach(envVar => {
      const value = process.env[envVar];
      if (!value) {
        console.error(`❌ Missing env variable: ${envVar}`);
      } else {
        console.log(`✅ Env variable set: ${envVar}`);
      }
    });
    
    console.groupEnd();
  }, []);
  
  // Performance monitoring
  useEffect(() => {
    console.group('⚡ PERFORMANCE METRICS');
    
    // Check memory usage
    if (performance.memory) {
      const memory = (performance as any).memory;
      const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2);
      const limitMB = (memory.jsHeapSizeLimit / 1048576).toFixed(2);
      const percentage = ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(1);
      
      console.log(`Memory: ${usedMB}MB / ${limitMB}MB (${percentage}%)`);
      
      if (parseFloat(percentage) > 90) {
        console.error('⚠️ HIGH MEMORY USAGE - Possible memory leak!');
      }
    }
    
    // Check for long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(0)}ms`);
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    }
    
    console.groupEnd();
  }, [pathname]);
  
  // Visual debug panel (optional - can be hidden)
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '10px',
      maxWidth: '400px',
      maxHeight: '300px',
      overflow: 'auto',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 99999
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        🔍 Debug Panel (Console Ninja Active)
      </div>
      
      <div>
        <strong>Current Page:</strong> {pathname}
      </div>
      
      {pageLoads.length > 0 && (
        <div>
          <strong>Load Time:</strong>{' '}
          <span style={{
            color: pageLoads[pageLoads.length - 1].status === 'critical' ? 'red' :
                   pageLoads[pageLoads.length - 1].status === 'slow' ? 'yellow' : 'green'
          }}>
            {(pageLoads[pageLoads.length - 1].loadTime / 1000).toFixed(2)}s
          </span>
        </div>
      )}
      
      {errors.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <strong style={{ color: 'red' }}>Errors: {errors.length}</strong>
          {errors.slice(-3).map((err, i) => (
            <div key={i} style={{ fontSize: '10px', marginTop: '5px' }}>
              {err.message.substring(0, 100)}...
            </div>
          ))}
        </div>
      )}
      
      {imageErrors.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <strong style={{ color: 'orange' }}>Image Errors: {imageErrors.length}</strong>
        </div>
      )}
      
      {brokenLinks.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <strong style={{ color: 'yellow' }}>Broken Links: {brokenLinks.length}</strong>
          {brokenLinks.slice(0, 3).map((link, i) => (
            <div key={i} style={{ fontSize: '10px' }}>{link}</div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7 }}>
        Check console for detailed debugging
      </div>
    </div>
  );
}

// Export debugging utilities
export const siteDebug = {
  checkAllPages: async () => {
    console.group('🔍 CHECKING ALL PAGES');
    
    const pages = [
      '/',
      '/about',
      '/services',
      '/pricing',
      '/booking',
      '/contact',
      '/gallery',
      '/faq',
      '/blog',
      '/testimonials',
      '/careers',
      '/areas/downtown-austin',
      '/areas/the-domain',
      '/towers/the-quincy',
      '/towers/70-rainey',
      '/terms',
      '/privacy'
    ];
    
    for (const page of pages) {
      console.time(`Check ${page}`);
      try {
        const res = await fetch(page);
        const time = performance.now();
        
        if (res.ok) {
          console.log(`✅ ${page} - OK (${time.toFixed(0)}ms)`);
        } else {
          console.error(`❌ ${page} - ${res.status}`);
        }
      } catch (err) {
        console.error(`❌ ${page} - FAILED`, err);
      }
      console.timeEnd(`Check ${page}`);
    }
    
    console.groupEnd();
  },
  
  findEmptyImages: () => {
    const images = document.querySelectorAll('img');
    const emptyImages: HTMLImageElement[] = [];
    
    images.forEach(img => {
      if (!img.src || img.src === '' || img.src === window.location.href) {
        emptyImages.push(img);
        console.error('Empty image found:', img);
      }
    });
    
    console.log(`Found ${emptyImages.length} images with empty src`);
    return emptyImages;
  },
  
  measurePageWeight: () => {
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    
    console.group('📊 PAGE WEIGHT ANALYSIS');
    
    const byType: Record<string, number> = {};
    
    resources.forEach(resource => {
      const size = (resource as any).transferSize || 0;
      totalSize += size;
      
      const type = resource.name.split('.').pop() || 'other';
      byType[type] = (byType[type] || 0) + size;
    });
    
    console.table(byType);
    console.log(`Total page weight: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    
    if (totalSize > 3 * 1024 * 1024) {
      console.error('⚠️ Page is too heavy! Should be under 3MB');
    }
    
    console.groupEnd();
  }
};