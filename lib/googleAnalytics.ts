// Google Analytics 4 Configuration and Event Tracking

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Check if GA is available
export const isGAEnabled = () => {
  return typeof window !== 'undefined' && 
         window.gtag && 
         GA_MEASUREMENT_ID && 
         GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';
};

// Page view tracking
export const pageview = (url: string) => {
  if (!isGAEnabled()) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Event tracking
export const event = (action: string, parameters?: any) => {
  if (!isGAEnabled()) return;
  
  window.gtag('event', action, parameters);
};

// E-commerce Events
export const ecommerceEvents = {
  // View item list (services page)
  viewItemList: (items: any[], listName: string) => {
    event('view_item_list', {
      item_list_id: listName,
      item_list_name: listName,
      items: items,
    });
  },

  // View item (specific service)
  viewItem: (service: any) => {
    event('view_item', {
      currency: 'USD',
      value: service.price,
      items: [service],
    });
  },

  // Add to cart (select service)
  addToCart: (service: any) => {
    event('add_to_cart', {
      currency: 'USD',
      value: service.price,
      items: [service],
    });
  },

  // Begin checkout
  beginCheckout: (services: any[], totalValue: number) => {
    event('begin_checkout', {
      currency: 'USD',
      value: totalValue,
      items: services,
    });
  },

  // Purchase (booking confirmed)
  purchase: (transactionId: string, services: any[], totalValue: number) => {
    event('purchase', {
      transaction_id: transactionId,
      value: totalValue,
      currency: 'USD',
      items: services,
    });
  },
};

// Conversion Events
export const conversionEvents = {
  // Lead generation
  generateLead: (value?: number) => {
    event('generate_lead', {
      currency: 'USD',
      value: value || 0,
    });
  },

  // Phone call click
  phoneCall: () => {
    event('phone_call_click', {
      event_category: 'engagement',
      event_label: 'header',
    });
  },

  // Form submission
  formSubmit: (formName: string) => {
    event('form_submit', {
      form_name: formName,
      event_category: 'engagement',
    });
  },

  // Booking started
  bookingStarted: () => {
    event('booking_started', {
      event_category: 'conversion',
      event_label: 'booking_flow',
    });
  },

  // Booking completed
  bookingCompleted: (bookingId: string, value: number) => {
    event('booking_completed', {
      booking_id: bookingId,
      currency: 'USD',
      value: value,
      event_category: 'conversion',
    });
  },

  // Quote requested
  quoteRequested: (serviceType?: string) => {
    event('quote_requested', {
      service_type: serviceType,
      event_category: 'conversion',
    });
  },

  // Newsletter signup
  newsletterSignup: () => {
    event('newsletter_signup', {
      event_category: 'engagement',
    });
  },
};

// Enhanced Ecommerce Data Layer
export const dataLayer = {
  // Push service impression
  pushServiceImpression: (service: any, position: number) => {
    if (!isGAEnabled()) return;
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'service_impression',
      ecommerce: {
        items: [{
          item_id: service.id,
          item_name: service.name,
          item_category: service.category,
          price: service.price,
          index: position,
        }],
      },
    });
  },

  // Push promotion view
  pushPromotionView: (promotion: any) => {
    if (!isGAEnabled()) return;
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'view_promotion',
      ecommerce: {
        items: [{
          promotion_id: promotion.id,
          promotion_name: promotion.name,
          creative_name: promotion.creative,
          creative_slot: promotion.position,
        }],
      },
    });
  },

  // Clear ecommerce data
  clearEcommerce: () => {
    if (!isGAEnabled()) return;
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ecommerce: null,
    });
  },
};

// User Properties
export const setUserProperties = (properties: { [key: string]: any }) => {
  if (!isGAEnabled()) return;
  
  window.gtag('set', 'user_properties', properties);
};

// Custom Dimensions
export const setCustomDimensions = (dimensions: { [key: string]: any }) => {
  if (!isGAEnabled()) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    custom_map: dimensions,
  });
};

// Timing Events
export const timingComplete = (name: string, value: number, category?: string) => {
  event('timing_complete', {
    name: name,
    value: value,
    event_category: category || 'performance',
  });
};

// Exception Tracking
export const exception = (description: string, fatal: boolean = false) => {
  event('exception', {
    description: description,
    fatal: fatal,
  });
};

// Social Interactions
export const socialInteraction = (network: string, action: string, target?: string) => {
  event('social', {
    social_network: network,
    social_action: action,
    social_target: target,
  });
};

// Search Tracking
export const siteSearch = (searchTerm: string, resultsCount?: number) => {
  event('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Video Tracking
export const videoTracking = {
  start: (videoTitle: string) => {
    event('video_start', {
      video_title: videoTitle,
      event_category: 'video',
    });
  },
  
  progress: (videoTitle: string, percentComplete: number) => {
    event('video_progress', {
      video_title: videoTitle,
      video_percent: percentComplete,
      event_category: 'video',
    });
  },
  
  complete: (videoTitle: string) => {
    event('video_complete', {
      video_title: videoTitle,
      event_category: 'video',
    });
  },
};

// File Download Tracking
export const fileDownload = (fileName: string, fileType: string) => {
  event('file_download', {
    file_name: fileName,
    file_extension: fileType,
    event_category: 'download',
  });
};

// Scroll Tracking
export const scrollDepth = (percentage: number) => {
  event('scroll', {
    percent_scrolled: percentage,
    event_category: 'engagement',
  });
};

// Print Tracking
export const printPage = () => {
  event('print', {
    event_category: 'engagement',
    page_path: window.location.pathname,
  });
};

// Extend Window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}