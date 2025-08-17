/**
 * Service Area Validator for Aura Spring Cleaning
 * Validates if addresses are within our service areas in Austin, TX
 */

// Core service areas in Austin with premium/standard pricing
export const SERVICE_AREAS = {
  premium: [
    // Downtown & Central
    { zipCode: '78701', name: 'Downtown Austin', surcharge: 0 },
    { zipCode: '78702', name: 'East Austin', surcharge: 0 },
    { zipCode: '78703', name: 'Tarrytown/West Austin', surcharge: 0 },
    { zipCode: '78704', name: 'South Austin/SoCo', surcharge: 0 },
    { zipCode: '78705', name: 'Central Austin/UT', surcharge: 0 },
    
    // High-Rise Districts
    { zipCode: '78712', name: 'Rainey Street District', surcharge: 0 },
    { zipCode: '78741', name: 'Riverside', surcharge: 0 },
    { zipCode: '78751', name: 'Hyde Park', surcharge: 0 },
    { zipCode: '78752', name: 'St. Johns', surcharge: 0 },
    { zipCode: '78756', name: 'Allandale', surcharge: 0 },
    { zipCode: '78757', name: 'Burnet Road', surcharge: 0 },
    
    // North Austin
    { zipCode: '78758', name: 'The Domain', surcharge: 0 },
    { zipCode: '78759', name: 'Great Hills', surcharge: 0 },
    
    // West Austin Premium
    { zipCode: '78731', name: 'Northwest Hills', surcharge: 0 },
    { zipCode: '78732', name: 'Steiner Ranch', surcharge: 10 },
    { zipCode: '78733', name: 'West Lake Hills', surcharge: 15 },
    { zipCode: '78734', name: 'Lakeway', surcharge: 20 },
    { zipCode: '78735', name: 'Barton Creek', surcharge: 10 },
    { zipCode: '78736', name: 'Oak Hill', surcharge: 5 },
    { zipCode: '78738', name: 'Bee Cave', surcharge: 20 },
    { zipCode: '78739', name: 'Circle C', surcharge: 10 },
    { zipCode: '78746', name: 'West Lake Hills', surcharge: 15 },
  ],
  
  standard: [
    // South Austin
    { zipCode: '78744', name: 'South Austin', surcharge: 5 },
    { zipCode: '78745', name: 'South Austin', surcharge: 5 },
    { zipCode: '78747', name: 'McKinney', surcharge: 10 },
    { zipCode: '78748', name: 'South Austin', surcharge: 10 },
    { zipCode: '78749', name: 'Southwest Austin', surcharge: 10 },
    
    // Southeast
    { zipCode: '78719', name: 'Del Valle', surcharge: 15 },
    { zipCode: '78721', name: 'Hornsby Bend', surcharge: 15 },
    { zipCode: '78723', name: 'East Austin', surcharge: 5 },
    { zipCode: '78724', name: 'Colony Park', surcharge: 10 },
    { zipCode: '78725', name: 'MLK', surcharge: 10 },
    
    // North
    { zipCode: '78727', name: 'North Austin', surcharge: 10 },
    { zipCode: '78728', name: 'Wells Branch', surcharge: 15 },
    { zipCode: '78729', name: 'Anderson Mill', surcharge: 15 },
    { zipCode: '78750', name: 'Anderson Mill', surcharge: 15 },
    { zipCode: '78753', name: 'North Austin', surcharge: 10 },
    { zipCode: '78754', name: 'Windsor Park', surcharge: 10 },
  ],
  
  extended: [
    // Surrounding Cities (with travel surcharge)
    { zipCode: '78613', name: 'Cedar Park', surcharge: 25 },
    { zipCode: '78626', name: 'Georgetown', surcharge: 30 },
    { zipCode: '78628', name: 'Georgetown', surcharge: 30 },
    { zipCode: '78633', name: 'Georgetown', surcharge: 30 },
    { zipCode: '78634', name: 'Hutto', surcharge: 35 },
    { zipCode: '78640', name: 'Kyle', surcharge: 30 },
    { zipCode: '78641', name: 'Leander', surcharge: 25 },
    { zipCode: '78652', name: 'Manchaca', surcharge: 20 },
    { zipCode: '78660', name: 'Pflugerville', surcharge: 25 },
    { zipCode: '78664', name: 'Round Rock', surcharge: 25 },
    { zipCode: '78665', name: 'Round Rock', surcharge: 25 },
    { zipCode: '78666', name: 'San Marcos', surcharge: 40 },
    { zipCode: '78681', name: 'Round Rock', surcharge: 25 },
    { zipCode: '78717', name: 'Austin (Far West)', surcharge: 20 },
    { zipCode: '78726', name: 'Austin (Far North)', surcharge: 20 },
    { zipCode: '78737', name: 'Dripping Springs', surcharge: 35 },
    { zipCode: '78742', name: 'Austin Airport', surcharge: 15 },
  ]
};

// High-value buildings and towers we service
export const PREMIUM_BUILDINGS = [
  // Rainey Street District
  'The Quincy',
  '70 Rainey',
  'The Shore',
  'Millennium Rainey',
  'Waterline',
  
  // Downtown
  'The Independent',
  'The Austonian',
  'The Bowie',
  'Northshore',
  'The Catherine',
  '5 Fifty Five',
  'Natiivo Austin',
  
  // The Domain
  'Domain Tower I',
  'Domain Tower II',
  'Alexan Domain',
  'Standard Domain',
  'Camden Domain',
  
  // South Congress
  'The Lively',
  'South Congress Tower',
  
  // West Austin
  'The Westerly',
  '3800 N Lamar',
];

export interface ServiceAreaResult {
  isServiceable: boolean;
  area?: string;
  zipCode?: string;
  surcharge?: number;
  estimatedDriveTime?: number;
  isPremiumBuilding?: boolean;
  message?: string;
}

/**
 * Validates if an address is within our service area
 */
export function validateServiceArea(
  address: string,
  zipCode?: string,
  buildingName?: string
): ServiceAreaResult {
  // Check if it's a premium building (always serviceable)
  if (buildingName) {
    const isPremium = PREMIUM_BUILDINGS.some(
      building => buildingName.toLowerCase().includes(building.toLowerCase())
    );
    
    if (isPremium) {
      return {
        isServiceable: true,
        isPremiumBuilding: true,
        surcharge: 0,
        message: `Premium building service - Priority scheduling available!`
      };
    }
  }
  
  // Extract zip code from address if not provided
  if (!zipCode) {
    const zipMatch = address.match(/\b\d{5}\b/);
    if (zipMatch) {
      zipCode = zipMatch[0];
    }
  }
  
  if (!zipCode) {
    return {
      isServiceable: false,
      message: 'Please provide a valid Austin, TX zip code'
    };
  }
  
  // Check all service tiers
  const allAreas = [
    ...SERVICE_AREAS.premium,
    ...SERVICE_AREAS.standard,
    ...SERVICE_AREAS.extended
  ];
  
  const area = allAreas.find(a => a.zipCode === zipCode);
  
  if (!area) {
    return {
      isServiceable: false,
      message: `Sorry, we don't currently service zip code ${zipCode}. Please call Valerie at (512) 781-0527 for special arrangements.`
    };
  }
  
  // Calculate estimated drive time based on distance/surcharge
  let estimatedDriveTime = 15; // Base time in minutes
  if (area.surcharge > 0) {
    estimatedDriveTime = Math.min(15 + (area.surcharge * 1.5), 60);
  }
  
  return {
    isServiceable: true,
    area: area.name,
    zipCode: area.zipCode,
    surcharge: area.surcharge,
    estimatedDriveTime,
    message: area.surcharge > 0 
      ? `We service ${area.name}! A travel fee of $${area.surcharge} applies.`
      : `Great news! ${area.name} is in our primary service area with no travel fees.`
  };
}

/**
 * Gets all serviceable zip codes
 */
export function getAllServiceableZipCodes(): string[] {
  const allAreas = [
    ...SERVICE_AREAS.premium,
    ...SERVICE_AREAS.standard,
    ...SERVICE_AREAS.extended
  ];
  
  return allAreas.map(area => area.zipCode);
}

/**
 * Calculates travel surcharge based on zip code
 */
export function calculateTravelSurcharge(zipCode: string): number {
  const allAreas = [
    ...SERVICE_AREAS.premium,
    ...SERVICE_AREAS.standard,
    ...SERVICE_AREAS.extended
  ];
  
  const area = allAreas.find(a => a.zipCode === zipCode);
  return area?.surcharge || 0;
}

/**
 * Gets service area tier (premium/standard/extended)
 */
export function getServiceTier(zipCode: string): 'premium' | 'standard' | 'extended' | null {
  if (SERVICE_AREAS.premium.some(a => a.zipCode === zipCode)) {
    return 'premium';
  }
  if (SERVICE_AREAS.standard.some(a => a.zipCode === zipCode)) {
    return 'standard';
  }
  if (SERVICE_AREAS.extended.some(a => a.zipCode === zipCode)) {
    return 'extended';
  }
  return null;
}

/**
 * Checks if address is in high-demand area (for pricing optimization)
 */
export function isHighDemandArea(zipCode: string): boolean {
  const highDemandZips = [
    '78701', // Downtown
    '78702', // East Austin
    '78703', // Tarrytown
    '78704', // SoCo
    '78712', // Rainey Street
    '78758', // The Domain
    '78733', // West Lake Hills
    '78746', // West Lake Hills
  ];
  
  return highDemandZips.includes(zipCode);
}

/**
 * Validates and formats address for service
 */
export function formatServiceAddress(
  address: string,
  unit?: string,
  buildingName?: string
): string {
  let formatted = address.trim();
  
  if (unit) {
    formatted = `${formatted}, Unit ${unit}`;
  }
  
  if (buildingName) {
    formatted = `${buildingName}, ${formatted}`;
  }
  
  // Ensure Austin, TX is in the address
  if (!formatted.toLowerCase().includes('austin') && !formatted.toLowerCase().includes(', tx')) {
    formatted = `${formatted}, Austin, TX`;
  }
  
  return formatted;
}