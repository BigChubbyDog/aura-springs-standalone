import { useEffect, useState } from 'react';

// A/B Test Configuration
export interface ABTest {
  id: string;
  name: string;
  variants: {
    [key: string]: {
      weight: number; // Percentage weight (0-100)
      content?: any;
    };
  };
  goal: string; // Conversion goal to track
  active: boolean;
}

// Active A/B Tests
export const abTests: { [key: string]: ABTest } = {
  heroButton: {
    id: 'hero-button-text',
    name: 'Hero CTA Button Text',
    variants: {
      control: { weight: 50 },
      variant1: { weight: 25 }, // "Book in 60 Seconds"
      variant2: { weight: 25 }, // "Schedule Now - Save 15%"
    },
    goal: 'booking_started',
    active: true,
  },
  pricingDisplay: {
    id: 'pricing-display',
    name: 'Pricing Display Format',
    variants: {
      control: { weight: 50 }, // "From $150"
      variant1: { weight: 50 }, // "$150 - $300"
    },
    goal: 'quote_requested',
    active: true,
  },
  testimonialPlacement: {
    id: 'testimonial-placement',
    name: 'Testimonial Section Placement',
    variants: {
      control: { weight: 50 }, // After services
      variant1: { weight: 50 }, // After hero
    },
    goal: 'engagement_time',
    active: true,
  },
};

// Get or assign variant for a test
export function getVariant(testId: string): string {
  if (typeof window === 'undefined') return 'control';
  
  const test = abTests[testId];
  if (!test || !test.active) return 'control';
  
  // Check if user already has a variant assigned
  const storageKey = `ab_${testId}`;
  const stored = localStorage.getItem(storageKey);
  if (stored) return stored;
  
  // Assign a variant based on weights
  const variant = assignVariant(test);
  localStorage.setItem(storageKey, variant);
  
  // Track variant assignment
  trackEvent('ab_test_assigned', {
    test_id: testId,
    test_name: test.name,
    variant: variant,
  });
  
  return variant;
}

// Assign variant based on weights
function assignVariant(test: ABTest): string {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const [variant, config] of Object.entries(test.variants)) {
    cumulative += config.weight;
    if (random <= cumulative) {
      return variant;
    }
  }
  
  return 'control';
}

// Track conversion for a test
export function trackConversion(testId: string, goal?: string) {
  const test = abTests[testId];
  if (!test || !test.active) return;
  
  const variant = getVariant(testId);
  const conversionGoal = goal || test.goal;
  
  trackEvent('ab_test_conversion', {
    test_id: testId,
    test_name: test.name,
    variant: variant,
    goal: conversionGoal,
  });
}

// Track general events
export function trackEvent(eventName: string, parameters?: any) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // Microsoft Clarity Custom Events
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName, parameters);
  }
  
  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Track Event:', eventName, parameters);
  }
}

// React Hook for A/B Testing
export function useABTest(testId: string) {
  const [variant, setVariant] = useState<string>('control');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setVariant(getVariant(testId));
    setIsLoading(false);
  }, [testId]);
  
  const trackConversionForTest = (goal?: string) => {
    trackConversion(testId, goal);
  };
  
  return { variant, isLoading, trackConversion: trackConversionForTest };
}

// Get variant content
export function getVariantContent(testId: string, variant: string, contentMap: { [key: string]: any }) {
  return contentMap[variant] || contentMap.control;
}

// Clear all A/B test assignments (for testing)
export function clearABTests() {
  if (typeof window === 'undefined') return;
  
  Object.keys(abTests).forEach(testId => {
    localStorage.removeItem(`ab_${testId}`);
  });
}

// Extend Window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}