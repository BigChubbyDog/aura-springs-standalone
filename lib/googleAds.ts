// Google Ads Conversion Tracking

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';

// Conversion labels for different actions
export const CONVERSION_LABELS = {
  BOOKING_COMPLETED: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_LABEL || '',
  QUOTE_REQUESTED: process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL || '',
  PHONE_CALL: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL || '',
  LEAD_FORM: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || '',
  NEWSLETTER_SIGNUP: process.env.NEXT_PUBLIC_GOOGLE_ADS_NEWSLETTER_LABEL || '',
  CHAT_STARTED: process.env.NEXT_PUBLIC_GOOGLE_ADS_CHAT_LABEL || '',
};

// Check if Google Ads is enabled
export const isGoogleAdsEnabled = () => {
  return typeof window !== 'undefined' && 
         window.gtag && 
         GOOGLE_ADS_ID && 
         GOOGLE_ADS_ID !== '';
};

// Initialize Google Ads
export const initGoogleAds = () => {
  if (!GOOGLE_ADS_ID || typeof window === 'undefined') return;

  // Load gtag.js if not already loaded
  if (!window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
  }

  // Configure Google Ads
  window.gtag('config', GOOGLE_ADS_ID, {
    page_path: window.location.pathname,
  });

  // Enable enhanced conversions
  window.gtag('config', GOOGLE_ADS_ID, {
    allow_enhanced_conversions: true
  });
};

// Track conversions
export const googleAdsConversions = {
  // Booking Completed
  bookingCompleted: (value: number, transactionId: string) => {
    if (!isGoogleAdsEnabled() || !CONVERSION_LABELS.BOOKING_COMPLETED) return;
    
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.BOOKING_COMPLETED}`,
      value: value,
      currency: 'USD',
      transaction_id: transactionId
    });
  },

  // Quote Requested
  quoteRequested: (value?: number) => {
    if (!isGoogleAdsEnabled() || !CONVERSION_LABELS.QUOTE_REQUESTED) return;
    
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.QUOTE_REQUESTED}`,
      value: value || 0,
      currency: 'USD'
    });
  },

  // Phone Call Click
  phoneCall: (source: string) => {
    if (!isGoogleAdsEnabled() || !CONVERSION_LABELS.PHONE_CALL) return;
    
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.PHONE_CALL}`,
      event_callback: () => {
        // Track the source of the call
        console.log('Phone call conversion tracked from:', source);
      }
    });
  },

  // Lead Form Submission
  leadForm: (formName: string, value?: number) => {
    if (!isGoogleAdsEnabled() || !CONVERSION_LABELS.LEAD_FORM) return;
    
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.LEAD_FORM}`,
      value: value || 0,
      currency: 'USD',
      lead_source: formName
    });
  },

  // Newsletter Signup
  newsletterSignup: () => {
    if (!isGoogleAdsEnabled() || !CONVERSION_LABELS.NEWSLETTER_SIGNUP) return;
    
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.NEWSLETTER_SIGNUP}`
    });
  },

  // Chat Started
  chatStarted: () => {
    if (!isGoogleAdsEnabled() || !CONVERSION_LABELS.CHAT_STARTED) return;
    
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.CHAT_STARTED}`
    });
  }
};

// Dynamic Remarketing
export const dynamicRemarketing = {
  // View item (service page)
  viewItem: (itemId: string, itemName: string, value: number) => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'view_item', {
      send_to: GOOGLE_ADS_ID,
      ecomm_prodid: itemId,
      ecomm_pagetype: 'product',
      ecomm_totalvalue: value,
      items: [{
        id: itemId,
        google_business_vertical: 'custom'
      }]
    });
  },

  // View item list (services page)
  viewItemList: (items: Array<{id: string, price: number}>) => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'view_item_list', {
      send_to: GOOGLE_ADS_ID,
      ecomm_pagetype: 'category',
      items: items.map(item => ({
        id: item.id,
        google_business_vertical: 'custom'
      }))
    });
  },

  // Add to cart
  addToCart: (itemId: string, value: number) => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'add_to_cart', {
      send_to: GOOGLE_ADS_ID,
      ecomm_prodid: itemId,
      ecomm_pagetype: 'cart',
      ecomm_totalvalue: value,
      items: [{
        id: itemId,
        google_business_vertical: 'custom'
      }]
    });
  },

  // Purchase
  purchase: (itemId: string, value: number, transactionId: string) => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'purchase', {
      send_to: GOOGLE_ADS_ID,
      ecomm_prodid: itemId,
      ecomm_pagetype: 'purchase',
      ecomm_totalvalue: value,
      transaction_id: transactionId,
      items: [{
        id: itemId,
        google_business_vertical: 'custom'
      }]
    });
  }
};

// Enhanced Conversions - Send hashed user data
export const setEnhancedConversions = (userData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  }
}) => {
  if (!isGoogleAdsEnabled()) return;

  const enhancedData: any = {};

  // Hash email
  if (userData.email) {
    enhancedData.email = hashForGoogle(userData.email);
  }

  // Format and hash phone
  if (userData.phone) {
    enhancedData.phone_number = hashForGoogle(formatPhoneForGoogle(userData.phone));
  }

  // Hash name
  if (userData.firstName) {
    enhancedData.first_name = hashForGoogle(userData.firstName);
  }
  if (userData.lastName) {
    enhancedData.last_name = hashForGoogle(userData.lastName);
  }

  // Hash address
  if (userData.address) {
    enhancedData.address = {
      street: userData.address.street ? hashForGoogle(userData.address.street) : undefined,
      city: userData.address.city ? hashForGoogle(userData.address.city) : undefined,
      region: userData.address.region ? hashForGoogle(userData.address.region) : undefined,
      postal_code: userData.address.postalCode ? hashForGoogle(userData.address.postalCode) : undefined,
      country: userData.address.country ? hashForGoogle(userData.address.country) : undefined,
    };
  }

  // Send enhanced conversion data
  window.gtag('set', 'user_data', enhancedData);
};

// Hash data for Google (SHA256 recommended in production)
function hashForGoogle(data: string): string {
  // In production, use SHA256 hashing
  // This is a simple implementation for demonstration
  return btoa(data.toLowerCase().trim());
}

// Format phone number for Google (E.164 format)
function formatPhoneForGoogle(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if not present (assuming US)
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  return `+${cleaned}`;
}

// Call Tracking
export const callTracking = {
  // Track call extension clicks
  callExtensionClick: () => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'click', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'call_extension',
      event_label: 'mobile_call'
    });
  },

  // Track call-only ad clicks
  callOnlyAdClick: () => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'click', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'call_only_ad',
      event_label: 'direct_call'
    });
  }
};

// Store Visits (for location extensions)
export const storeVisitTracking = {
  // Track store locator usage
  storeLocatorUsed: () => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'store_locator', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'engagement',
      event_label: 'find_location'
    });
  },

  // Track get directions clicks
  getDirections: (location: string) => {
    if (!isGoogleAdsEnabled()) return;
    
    window.gtag('event', 'get_directions', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'engagement',
      event_label: location
    });
  }
};

// Offline Conversion Import (for CRM integration)
export const offlineConversion = {
  // Prepare data for offline conversion import
  prepareOfflineConversion: (
    gclid: string, // Google Click ID
    conversionName: string,
    conversionTime: Date,
    conversionValue: number
  ) => {
    return {
      google_click_id: gclid,
      conversion_name: conversionName,
      conversion_time: conversionTime.toISOString(),
      conversion_value: conversionValue,
      conversion_currency: 'USD'
    };
  },

  // Store GCLID from URL parameters
  storeGclid: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');
    
    if (gclid) {
      // Store in cookie for 90 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 90);
      document.cookie = `gclid=${gclid};expires=${expiryDate.toUTCString()};path=/`;
      
      // Also store in localStorage
      localStorage.setItem('gclid', gclid);
      localStorage.setItem('gclid_timestamp', Date.now().toString());
    }
  },

  // Retrieve stored GCLID
  getStoredGclid: (): string | null => {
    // Try cookie first
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'gclid') {
        return value;
      }
    }
    
    // Fallback to localStorage
    return localStorage.getItem('gclid');
  }
};

// Extend Window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}