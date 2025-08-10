// Facebook Pixel Implementation for Retargeting

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// Check if Facebook Pixel is enabled
export const isFBPixelEnabled = () => {
  return typeof window !== 'undefined' && 
         window.fbq && 
         FB_PIXEL_ID && 
         FB_PIXEL_ID !== '';
};

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (!FB_PIXEL_ID || typeof window === 'undefined') return;

  (function(f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', FB_PIXEL_ID);
};

// Standard Events
export const fbPixelEvents = {
  // Page View
  pageView: () => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'PageView');
  },

  // View Content (Service Page)
  viewContent: (contentName: string, contentCategory: string, value?: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value: value,
      currency: 'USD'
    });
  },

  // Search
  search: (searchString: string) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'Search', {
      search_string: searchString
    });
  },

  // Add to Cart (Service Selected)
  addToCart: (contentName: string, contentId: string, value: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'AddToCart', {
      content_name: contentName,
      content_ids: [contentId],
      content_type: 'product',
      value: value,
      currency: 'USD'
    });
  },

  // Initiate Checkout
  initiateCheckout: (value: number, numItems: number = 1) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'InitiateCheckout', {
      value: value,
      currency: 'USD',
      num_items: numItems
    });
  },

  // Add Payment Info
  addPaymentInfo: (value: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'AddPaymentInfo', {
      value: value,
      currency: 'USD'
    });
  },

  // Purchase (Booking Completed)
  purchase: (value: number, contentName: string, contentId: string) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'Purchase', {
      value: value,
      currency: 'USD',
      content_name: contentName,
      content_ids: [contentId],
      content_type: 'product'
    });
  },

  // Lead (Contact Form, Quote Request)
  lead: (contentName: string, value?: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'Lead', {
      content_name: contentName,
      value: value,
      currency: 'USD'
    });
  },

  // Complete Registration (Account Created)
  completeRegistration: (contentName: string, status?: string) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'CompleteRegistration', {
      content_name: contentName,
      status: status,
      value: 0,
      currency: 'USD'
    });
  },

  // Contact
  contact: () => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'Contact');
  },

  // Schedule (Booking Time Selected)
  schedule: (appointmentDate: string, value: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'Schedule', {
      appointment_date: appointmentDate,
      value: value,
      currency: 'USD'
    });
  },

  // Subscribe (Newsletter)
  subscribe: (predictedLTV?: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('track', 'Subscribe', {
      predicted_ltv: predictedLTV,
      currency: 'USD'
    });
  }
};

// Custom Events
export const fbCustomEvents = {
  // Quote Calculator Used
  quoteCalculator: (estimatedValue: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'QuoteCalculator', {
      estimated_value: estimatedValue,
      currency: 'USD'
    });
  },

  // Service Area Selected
  serviceAreaSelected: (area: string) => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'ServiceAreaSelected', {
      area: area
    });
  },

  // Cleaning Frequency Selected
  frequencySelected: (frequency: string, discount?: number) => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'CleaningFrequencySelected', {
      frequency: frequency,
      discount_percent: discount
    });
  },

  // Phone Call Click
  phoneCallClick: (source: string) => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'PhoneCallClick', {
      source: source
    });
  },

  // Chat Started
  chatStarted: () => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'ChatStarted');
  },

  // Testimonial Viewed
  testimonialViewed: () => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'TestimonialViewed');
  },

  // Before/After Gallery Viewed
  galleryViewed: (galleryType: string) => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'GalleryViewed', {
      gallery_type: galleryType
    });
  },

  // Referral Program Clicked
  referralProgramClicked: () => {
    if (!isFBPixelEnabled()) return;
    fbq('trackCustom', 'ReferralProgramClicked');
  }
};

// Advanced Matching (Hash user data for better matching)
export const setAdvancedMatching = (userData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}) => {
  if (!isFBPixelEnabled()) return;

  // Hash sensitive data before sending
  const advancedMatching: any = {};
  
  if (userData.email) {
    advancedMatching.em = hashData(userData.email.toLowerCase());
  }
  if (userData.phone) {
    advancedMatching.ph = hashData(userData.phone.replace(/\D/g, ''));
  }
  if (userData.firstName) {
    advancedMatching.fn = hashData(userData.firstName.toLowerCase());
  }
  if (userData.lastName) {
    advancedMatching.ln = hashData(userData.lastName.toLowerCase());
  }
  if (userData.city) {
    advancedMatching.ct = hashData(userData.city.toLowerCase());
  }
  if (userData.state) {
    advancedMatching.st = hashData(userData.state.toLowerCase());
  }
  if (userData.zipCode) {
    advancedMatching.zp = hashData(userData.zipCode);
  }

  fbq('init', FB_PIXEL_ID, advancedMatching);
};

// Simple hash function for advanced matching
function hashData(data: string): string {
  // In production, use a proper hashing library like crypto-js
  // This is a simple implementation for demonstration
  return btoa(data);
}

// Conversion API Event (Server-side tracking)
export const sendConversionAPIEvent = async (
  eventName: string,
  eventData: any,
  userData?: any
) => {
  if (!FB_PIXEL_ID) return;

  const endpoint = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`;
  const accessToken = process.env.FB_CONVERSION_API_TOKEN;

  if (!accessToken) {
    console.warn('Facebook Conversion API token not configured');
    return;
  }

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      user_data: userData,
      custom_data: eventData,
      action_source: 'website'
    }],
    access_token: accessToken
  };

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Facebook Conversion API error:', error);
  }
};

// Extend Window interface
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// Helper function to track page views with Next.js routing
export const handleRouteChange = (url: string) => {
  fbPixelEvents.pageView();
};