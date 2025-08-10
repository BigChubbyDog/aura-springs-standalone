'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/abTesting';

// Microsoft Clarity Configuration
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'YOUR_CLARITY_ID';

// Hotjar Configuration  
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || 'YOUR_HOTJAR_ID';
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SV || '6';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize Microsoft Clarity
  useEffect(() => {
    if (typeof window === 'undefined' || !CLARITY_PROJECT_ID || CLARITY_PROJECT_ID === 'YOUR_CLARITY_ID') {
      return;
    }

    // Initialize Clarity
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window as any, document, "clarity", "script", CLARITY_PROJECT_ID);

    // Set up custom user identification if available
    if (window.clarity) {
      // You can set custom user ID here if you have user authentication
      // window.clarity("set", "user_id", "USER_ID");
      
      // Set custom session data
      window.clarity("set", "page_type", getPageType(pathname));
    }
  }, []);

  // Initialize Hotjar (Alternative/Additional to Clarity)
  useEffect(() => {
    if (typeof window === 'undefined' || !HOTJAR_ID || HOTJAR_ID === 'YOUR_HOTJAR_ID') {
      return;
    }

    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:parseInt(HOTJAR_ID),hjsv:parseInt(HOTJAR_SV)};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window as any,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  }, []);

  // Track page views
  useEffect(() => {
    const url = pathname + searchParams.toString();
    
    // Track with Google Analytics
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: url,
      });
    }

    // Track with Clarity
    if (window.clarity) {
      window.clarity('set', 'page_path', url);
    }

    // Track custom page view event
    trackEvent('page_view', {
      page_path: pathname,
      page_location: url,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Track milestone scroll depths
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
          trackEvent('scroll_depth', {
            percentage: maxScroll,
            page_path: pathname,
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, [pathname]);

  // Track engagement time
  useEffect(() => {
    let startTime = Date.now();
    let isVisible = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isVisible) {
          const engagementTime = Math.round((Date.now() - startTime) / 1000);
          trackEvent('engagement_time', {
            time_seconds: engagementTime,
            page_path: pathname,
          });
          isVisible = false;
        }
      } else {
        startTime = Date.now();
        isVisible = true;
      }
    };

    const handleUnload = () => {
      if (isVisible) {
        const engagementTime = Math.round((Date.now() - startTime) / 1000);
        trackEvent('engagement_time', {
          time_seconds: engagementTime,
          page_path: pathname,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [pathname]);

  return null;
}

// Helper function to determine page type
function getPageType(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/services')) return 'service';
  if (pathname.startsWith('/areas')) return 'area';
  if (pathname === '/booking') return 'booking';
  if (pathname === '/pricing') return 'pricing';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname === '/about' || pathname === '/team') return 'about';
  if (pathname === '/privacy' || pathname === '/terms' || pathname === '/accessibility') return 'legal';
  return 'other';
}

// Extend Window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
    hj?: (...args: any[]) => void;
    _hjSettings?: any;
  }
}