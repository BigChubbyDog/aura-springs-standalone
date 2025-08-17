// Sophisticated pricing engine for maximum profitability while maintaining competitive rates
// Based on Austin market research and competitor analysis

export interface PricingFactors {
  bedrooms: number;
  bathrooms: number;
  offices?: number;  // Added offices as optional
  squareFeet: number;
  serviceType: 'standard' | 'deep' | 'moveInOut' | 'airbnb' | 'postConstruction';
  frequency: 'onetime' | 'weekly' | 'biweekly' | 'monthly';
  addOns: string[];
  location: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
  dayOfWeek?: number; // 0-6, Sunday-Saturday
  rushService?: boolean;
}

// Base pricing structure (competitive with Austin market)
const BASE_PRICES = {
  // Base charge for up to 3BR/2BA and 1300 sq ft
  minimum: 150,
  baseBedrooms: 3,    // Included in base price
  baseBathrooms: 2,   // Included in base price
  baseSqFt: 1300,     // Included in base price (lowered from 1500)
  
  // Incremental pricing
  per250SqFt: 25,     // $25 for each 250 sq ft above 1300
  perBedroom: 25,     // $25 for each bedroom above 3
  perBathroom: 25,    // $25 for each bathroom above 2
  perOffice: 25,      // $25 for each office
};

// Frequency discounts to encourage recurring revenue
const FREQUENCY_DISCOUNTS = {
  onetime: 0,       // No discount
  monthly: 0.10,    // 10% off
  biweekly: 0.15,   // 15% off (sweet spot for profitability)
  weekly: 0.20,     // 20% off (highest volume)
};

// Location-based pricing adjustments (premium areas)
const LOCATION_MULTIPLIERS: { [key: string]: number } = {
  'downtown': 1.20,        // 20% premium for downtown high-rises
  'the-domain': 1.15,       // 15% premium for Domain area
  'west-lake-hills': 1.25,  // 25% premium for luxury area
  'zilker': 1.10,           // 10% premium
  'tarrytown': 1.15,        // 15% premium
  'default': 1.0,           // Standard pricing
};

// Add-on services with profit margins
export const ADD_ONS = {
  insideOven: { name: 'Inside Oven', price: 35 },
  insideFridge: { name: 'Inside Fridge', price: 30 },
  insideWindows: { name: 'Window Cleaning (Interior Only)', price: 45 },
  laundry: { name: 'Laundry Service', price: 40 },
  dishes: { name: 'Dish Washing', price: 25 },
  garage: { name: 'Garage Cleaning', price: 50 },
  balcony: { name: 'Balcony/Patio', price: 35 },
  petHair: { name: 'Pet Hair Removal', price: 30 },
  organizePantry: { name: 'Pantry Organization', price: 45 },
  greenCleaning: { name: 'Eco-Friendly Products', price: 15 },
};

// Time-based pricing (surge pricing for peak times)
const TIME_MULTIPLIERS = {
  morning: { weekday: 1.0, weekend: 1.15 },   // Higher weekend morning demand
  afternoon: { weekday: 1.0, weekend: 1.10 },  // Moderate weekend afternoon
  evening: { weekday: 1.10, weekend: 1.05 },   // Evening premium
};

// Calculate optimized pricing
export function calculatePrice(factors: PricingFactors): {
  subtotal: number;
  discount: number;
  addOnsTotal: number;
  surcharge: number;
  total: number;
  savings: number;
  breakdown: {
    base: number;
    rooms: number;
    sqft: number;
    location: number;
    timing: number;
  };
} {
  // Base calculation - starts at $150 for up to 3BR/2BA and 1300 sq ft
  let basePrice = BASE_PRICES.minimum;
  
  // Square footage pricing - $25 per 250 sq ft above 1300 (or portion thereof)
  const sqftOverBase = Math.max(0, factors.squareFeet - BASE_PRICES.baseSqFt);
  const sqftIncrements = Math.ceil(sqftOverBase / 250);  // Charge for any portion of 250 sq ft
  const sqftPrice = sqftIncrements * BASE_PRICES.per250SqFt;
  
  // Room-based pricing - $25 per bedroom above 3, $25 per bathroom above 2
  const bedroomPrice = Math.max(0, factors.bedrooms - BASE_PRICES.baseBedrooms) * BASE_PRICES.perBedroom;
  const bathroomPrice = Math.max(0, factors.bathrooms - BASE_PRICES.baseBathrooms) * BASE_PRICES.perBathroom;
  
  // Office pricing - $25 per office
  const officePrice = (factors.offices || 0) * BASE_PRICES.perOffice;
  
  // Service type multiplier
  const serviceMultiplier = {
    standard: 1.0,      // $150 base
    deep: 1.5,          // $225 base (150 * 1.5)
    moveInOut: 1.67,    // $250 base (150 * 1.67)
    airbnb: 0.9,        // Lower for quick turnovers to encourage volume
    postConstruction: 2.5,
  }[factors.serviceType];
  
  // Calculate base subtotal (include office price)
  let subtotal = (basePrice + sqftPrice + bedroomPrice + bathroomPrice + officePrice) * serviceMultiplier;
  
  // Location adjustment
  const locationKey = factors.location?.toLowerCase().replace(/\s+/g, '-') || 'default';
  const locationMultiplier = LOCATION_MULTIPLIERS[locationKey] || LOCATION_MULTIPLIERS.default;
  subtotal *= locationMultiplier;
  
  // Time-based surcharge
  let timeSurcharge = 0;
  if (factors.timeOfDay && factors.dayOfWeek !== undefined) {
    const isWeekend = factors.dayOfWeek === 0 || factors.dayOfWeek === 6;
    const timeMultiplier = TIME_MULTIPLIERS[factors.timeOfDay][isWeekend ? 'weekend' : 'weekday'];
    timeSurcharge = subtotal * (timeMultiplier - 1);
  }
  
  // Rush service surcharge (25% for same-day)
  if (factors.rushService) {
    timeSurcharge += subtotal * 0.25;
  }
  
  // Add-ons calculation
  const addOnsTotal = factors.addOns.reduce((sum, addon) => {
    return sum + (ADD_ONS[addon as keyof typeof ADD_ONS]?.price || 0);
  }, 0);
  
  // Frequency discount
  const discountRate = FREQUENCY_DISCOUNTS[factors.frequency];
  const discount = (subtotal + addOnsTotal) * discountRate;
  
  // Final calculation
  const total = Math.round(subtotal + addOnsTotal + timeSurcharge - discount);
  
  // Calculate savings for marketing
  const oneTimePrice = subtotal + addOnsTotal + timeSurcharge;
  const savings = Math.round(oneTimePrice - total);
  
  return {
    subtotal: Math.round(subtotal),
    discount: Math.round(discount),
    addOnsTotal,
    surcharge: Math.round(timeSurcharge),
    total,
    savings,
    breakdown: {
      base: basePrice,
      rooms: bedroomPrice + bathroomPrice + officePrice,
      sqft: Math.round(sqftPrice),
      location: Math.round(subtotal * (locationMultiplier - 1) / serviceMultiplier),
      timing: Math.round(timeSurcharge),
    },
  };
}

// Get competitor comparison for marketing
export function getCompetitorComparison(total: number): {
  mollyMaid: number;
  merryMaids: number;
  theCleaningAuthority: number;
  ourPrice: number;
  savings: string;
} {
  // Based on Austin market research
  const competitorMultipliers = {
    mollyMaid: 1.25,           // Typically 25% higher
    merryMaids: 1.20,           // 20% higher
    theCleaningAuthority: 1.15, // 15% higher
  };
  
  return {
    mollyMaid: Math.round(total * competitorMultipliers.mollyMaid),
    merryMaids: Math.round(total * competitorMultipliers.merryMaids),
    theCleaningAuthority: Math.round(total * competitorMultipliers.theCleaningAuthority),
    ourPrice: total,
    savings: `Save up to $${Math.round(total * 0.25)} vs competitors!`,
  };
}

// Revenue optimization suggestions
export function getRevenueOptimization(factors: PricingFactors): string[] {
  const suggestions = [];
  
  if (factors.frequency === 'onetime') {
    suggestions.push('Switch to bi-weekly service and save 15%!');
  }
  
  if (factors.addOns.length === 0) {
    suggestions.push('Add deep oven cleaning for just $35 more');
  }
  
  if (!factors.addOns.includes('greenCleaning')) {
    suggestions.push('Go eco-friendly with green products for only $15');
  }
  
  if (factors.serviceType === 'standard' && factors.frequency === 'onetime') {
    suggestions.push('Upgrade to deep cleaning for a thorough refresh');
  }
  
  return suggestions;
}