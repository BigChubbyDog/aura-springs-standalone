// Meta Pixel tracking utilities
declare global {
  interface Window {
    fbq: any;
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '753683467224168';

// Standard Events
export const metaPixel = {
  // Track page view
  pageView: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  },

  // Track when someone views content (product, service, etc.)
  viewContent: (params?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', params);
    }
  },

  // Track when someone searches
  search: (params?: {
    search_string?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Search', params);
    }
  },

  // Track when someone becomes a lead
  lead: (params?: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_category: 'Cleaning Service',
        value: params?.value || 150.00,
        currency: params?.currency || 'USD',
        ...params
      });
    }
  },

  // Track when someone starts the checkout process
  initiateCheckout: (params?: {
    content_category?: string;
    content_ids?: string[];
    contents?: any[];
    num_items?: number;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', params);
    }
  },

  // Track when someone adds payment info
  addPaymentInfo: (params?: {
    content_category?: string;
    content_ids?: string[];
    contents?: any[];
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddPaymentInfo', params);
    }
  },

  // Track when someone completes a purchase
  purchase: (params: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    contents?: any[];
    content_type?: string;
    value: number;
    currency: string;
    num_items?: number;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        content_category: 'Cleaning Service',
        content_type: 'service',
        ...params
      });
    }
  },

  // Track when someone completes registration/signup
  completeRegistration: (params?: {
    content_name?: string;
    status?: string;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', params);
    }
  },

  // Track when someone schedules an appointment
  schedule: (params?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule', params);
    }
  },

  // Track custom events
  trackCustom: (eventName: string, params?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, params);
    }
  },

  // Track contact form submissions
  contact: (params?: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_category: 'Cleaning Service Inquiry',
        ...params
      });
    }
  }
};

// Helper function to track conversions with both Pixel and Conversion API
export async function trackConversion(
  eventName: string,
  eventData: any,
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }
) {
  // Track with Meta Pixel (client-side)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
  }

  // Track with Conversion API (server-side)
  try {
    const response = await fetch('/api/meta-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventData,
        userData,
        sourceUrl: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });

    if (!response.ok) {
      console.error('Conversion API tracking failed');
    }
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
}