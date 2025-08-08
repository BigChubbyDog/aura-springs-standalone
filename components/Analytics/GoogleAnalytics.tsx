'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      window.gtag('config', measurementId, {
        page_path: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, measurementId]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
};

// Custom event tracking functions
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce tracking
export const trackPurchase = (transactionData: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', transactionData);
  }
};

// Form submission tracking
export const trackFormSubmission = (formName: string, formData?: any) => {
  trackEvent('form_submit', 'engagement', formName);
  
  // Track specific form conversions
  if (formName === 'booking_form') {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'YOUR_CONVERSION_ID',
        value: formData?.price || 0,
        currency: 'USD',
      });
    }
  }
};

// Phone call tracking
export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent('phone_call', 'contact', phoneNumber);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'YOUR_PHONE_CONVERSION_ID',
    });
  }
};

// Social media tracking
export const trackSocialClick = (network: string, action: string) => {
  trackEvent('social_click', 'social', `${network}_${action}`);
};

// Scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;
  
  let scrollDepths = [25, 50, 75, 90, 100];
  let scrolledDepths = new Set<number>();
  
  const trackScrollDepth = () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    scrollDepths.forEach(depth => {
      if (scrollPercentage >= depth && !scrolledDepths.has(depth)) {
        scrolledDepths.add(depth);
        trackEvent('scroll_depth', 'engagement', `${depth}%`);
      }
    });
  };
  
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
  
  return () => window.removeEventListener('scroll', trackScrollDepth);
};

// Time on page tracking
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return;
  
  const startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // seconds
  const trackedIntervals = new Set<number>();
  
  const checkTimeOnPage = setInterval(() => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    intervals.forEach(interval => {
      if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
        trackedIntervals.add(interval);
        trackEvent('time_on_page', 'engagement', `${interval}s`);
      }
    });
    
    if (trackedIntervals.size === intervals.length) {
      clearInterval(checkTimeOnPage);
    }
  }, 10000); // Check every 10 seconds
  
  return () => clearInterval(checkTimeOnPage);
};

export default GoogleAnalytics;