// Meta Pixel Advanced Configuration for Cleaning Services

// Value optimization settings for cleaning service
export const VALUE_OPTIMIZATION_CONFIG = {
  // Customer Lifetime Value multipliers by service type
  LTV_MULTIPLIERS: {
    'weekly': 52,        // Weekly service = 52x annual value
    'biweekly': 26,      // Bi-weekly = 26x annual value
    'monthly': 12,       // Monthly = 12x annual value
    'onetime': 1,        // One-time service
    'moveinout': 1.5,    // Move services often lead to recurring
    'airbnb': 24,        // Airbnb usually becomes regular client
  },

  // Average order values by service type
  AVERAGE_VALUES: {
    'standard': 150,
    'deep': 250,
    'moveinout': 350,
    'airbnb': 120,
    'postConstruction': 500,
  },

  // Lead quality scores (for optimization)
  LEAD_SCORES: {
    'phone_call': 100,
    'booking_complete': 95,
    'quote_request': 80,
    'pricing_calculator': 60,
    'email_signup': 40,
    'page_view': 10,
  },
};

// Custom audience segments for retargeting
export const CUSTOM_AUDIENCES = {
  // High-value prospects
  HIGH_VALUE_PROSPECTS: {
    events: ['ViewContent', 'InitiateCheckout'],
    minValue: 200,
    lookbackWindow: 30, // days
  },

  // Abandoned bookings
  ABANDONED_BOOKINGS: {
    includeEvents: ['InitiateCheckout', 'AddPaymentInfo'],
    excludeEvents: ['Purchase'],
    lookbackWindow: 7,
  },

  // Tower residents
  TOWER_RESIDENTS: {
    urlContains: '/towers/',
    minPageViews: 2,
    lookbackWindow: 90,
  },

  // Recurring service prospects
  RECURRING_PROSPECTS: {
    customEvents: ['ViewRecurringPricing', 'SelectFrequency'],
    lookbackWindow: 30,
  },

  // Past customers for win-back
  PAST_CUSTOMERS: {
    events: ['Purchase'],
    lookbackWindow: 180,
    excludeRecentDays: 30, // Exclude recent customers
  },
};

// Conversion optimization rules
export const CONVERSION_RULES = {
  // Aggregated Event Measurement priority (iOS 14.5+)
  EVENT_PRIORITY: [
    'Purchase',           // Priority 1 (highest)
    'CompleteRegistration', // Priority 2
    'InitiateCheckout',   // Priority 3
    'AddPaymentInfo',     // Priority 4
    'Lead',               // Priority 5
    'ViewContent',        // Priority 6
    'Search',             // Priority 7
    'PageView',           // Priority 8 (lowest)
  ],

  // Value optimization thresholds
  VALUE_THRESHOLDS: {
    minimum_purchase: 100,      // Don't track purchases under $100
    maximum_purchase: 2000,     // Cap at $2000 to avoid skewing
    minimum_lead_value: 50,     // Minimum lead value to track
  },

  // Attribution windows
  ATTRIBUTION_WINDOWS: {
    click_through: 7,    // 7-day click attribution
    view_through: 1,     // 1-day view attribution
  },
};

// Dynamic remarketing product catalog
export const PRODUCT_CATALOG = {
  services: [
    {
      id: 'standard_cleaning',
      title: 'Standard House Cleaning',
      description: 'Regular maintenance cleaning for your home',
      availability: 'in stock',
      condition: 'new',
      price: 150,
      link: 'https://aurasprings.com/services/house-cleaning',
      image_link: 'https://aurasprings.com/images/standard-cleaning.jpg',
      brand: 'Aura Spring Cleaning',
      category: 'Cleaning Services > Residential',
    },
    {
      id: 'deep_cleaning',
      title: 'Deep Cleaning Service',
      description: 'Thorough top-to-bottom cleaning',
      availability: 'in stock',
      condition: 'new',
      price: 250,
      link: 'https://aurasprings.com/services/deep-cleaning',
      image_link: 'https://aurasprings.com/images/deep-cleaning.jpg',
      brand: 'Aura Spring Cleaning',
      category: 'Cleaning Services > Residential > Deep Clean',
    },
    {
      id: 'move_cleaning',
      title: 'Move In/Out Cleaning',
      description: 'Complete cleaning for moving transitions',
      availability: 'in stock',
      condition: 'new',
      price: 350,
      link: 'https://aurasprings.com/services/move-in-out-cleaning',
      image_link: 'https://aurasprings.com/images/move-cleaning.jpg',
      brand: 'Aura Spring Cleaning',
      category: 'Cleaning Services > Moving',
    },
  ],
};

// Server event deduplication
export const DEDUPLICATION_CONFIG = {
  // Generate unique event IDs
  generateEventId: (eventName: string, userId?: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const userPart = userId || 'anonymous';
    return `${eventName}_${userPart}_${timestamp}_${random}`;
  },

  // Event deduplication window (in milliseconds)
  deduplicationWindow: 5000, // 5 seconds
};

// Enhanced matching parameters
export const ENHANCED_MATCHING = {
  // Fields to collect for better matching
  requiredFields: ['email', 'phone'],
  optionalFields: ['fn', 'ln', 'ct', 'st', 'zp', 'country', 'db', 'ge'],
  
  // Automatic data collection from forms
  formSelectors: {
    email: 'input[type="email"], input[name*="email"]',
    phone: 'input[type="tel"], input[name*="phone"]',
    firstName: 'input[name*="first"], input[name*="fname"]',
    lastName: 'input[name*="last"], input[name*="lname"]',
    zipCode: 'input[name*="zip"], input[name*="postal"]',
  },
};