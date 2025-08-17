// Test the new pricing structure
const { calculatePrice } = require('./lib/pricingService');

console.log('===== AURA SPRING CLEANING - NEW PRICING EXAMPLES =====\n');
console.log('Base Price: $150 (includes up to 3BR/2BA and 1500 sq ft)');
console.log('Each 250 sq ft above 1500: +$25');
console.log('Each bedroom above 3: +$25');
console.log('Each bathroom above 2: +$25');
console.log('Each office: +$25\n');
console.log('=======================================================\n');

// Test cases from user requirements
const testCases = [
  // User's specific examples
  { bedrooms: 3, bathrooms: 2, squareFeet: 2000, expected: 200, name: '3BR/2BA 2000sqft' },
  { bedrooms: 4, bathrooms: 2, squareFeet: 2000, expected: 225, name: '4BR/2BA 2000sqft' },
  { bedrooms: 4, bathrooms: 3, squareFeet: 2000, expected: 250, name: '4BR/3BA 2000sqft' },
  { bedrooms: 3, bathrooms: 3, squareFeet: 2000, expected: 225, name: '3BR/3BA 2000sqft' },
  
  // Additional test cases
  { bedrooms: 3, bathrooms: 2, squareFeet: 1500, expected: 150, name: '3BR/2BA 1500sqft (base)' },
  { bedrooms: 2, bathrooms: 1, squareFeet: 1200, expected: 150, name: '2BR/1BA 1200sqft' },
  { bedrooms: 3, bathrooms: 2, squareFeet: 1750, expected: 175, name: '3BR/2BA 1750sqft' },
  { bedrooms: 3, bathrooms: 2, squareFeet: 2250, expected: 225, name: '3BR/2BA 2250sqft' },
  { bedrooms: 3, bathrooms: 2, squareFeet: 2500, expected: 250, name: '3BR/2BA 2500sqft' },
  { bedrooms: 5, bathrooms: 4, squareFeet: 3000, expected: 350, name: '5BR/4BA 3000sqft' },
  { bedrooms: 3, bathrooms: 2, squareFeet: 2000, offices: 1, expected: 225, name: '3BR/2BA 2000sqft + 1 office' },
  { bedrooms: 4, bathrooms: 3, squareFeet: 2500, offices: 2, expected: 350, name: '4BR/3BA 2500sqft + 2 offices' },
];

testCases.forEach(test => {
  const factors = {
    bedrooms: test.bedrooms,
    bathrooms: test.bathrooms,
    squareFeet: test.squareFeet,
    offices: test.offices || 0,
    serviceType: 'standard',
    frequency: 'onetime',
    addOns: [],
    location: 'default',
  };
  
  const result = calculatePrice(factors);
  const baseCalc = result.breakdown.base + result.breakdown.sqft + result.breakdown.rooms;
  
  console.log(`${test.name}:`);
  console.log(`  Expected: $${test.expected}`);
  console.log(`  Calculated: $${baseCalc}`);
  console.log(`  Breakdown:`);
  console.log(`    - Base (3BR/2BA/1500sqft): $${result.breakdown.base}`);
  console.log(`    - Extra sq ft (${test.squareFeet - 1500}): $${result.breakdown.sqft}`);
  console.log(`    - Extra rooms: $${result.breakdown.rooms}`);
  
  if (test.offices) {
    console.log(`    - Offices (${test.offices}): $${test.offices * 25}`);
  }
  
  if (baseCalc === test.expected) {
    console.log('  ✅ CORRECT\n');
  } else {
    console.log(`  ❌ MISMATCH (difference: $${Math.abs(baseCalc - test.expected)})\n`);
  }
});

console.log('=======================================================');
console.log('Additional Pricing Scenarios:\n');

// Show some real-world examples
const realWorldExamples = [
  { bedrooms: 1, bathrooms: 1, squareFeet: 800, name: 'Studio/1BR Apartment' },
  { bedrooms: 2, bathrooms: 2, squareFeet: 1200, name: '2BR/2BA Condo' },
  { bedrooms: 3, bathrooms: 2, squareFeet: 1800, name: 'Average Austin Home' },
  { bedrooms: 4, bathrooms: 3, squareFeet: 2400, name: 'Large Family Home' },
  { bedrooms: 5, bathrooms: 4, squareFeet: 3500, offices: 1, name: 'Luxury Home with Office' },
];

realWorldExamples.forEach(example => {
  const factors = {
    bedrooms: example.bedrooms,
    bathrooms: example.bathrooms,
    squareFeet: example.squareFeet,
    offices: example.offices || 0,
    serviceType: 'standard',
    frequency: 'onetime',
    addOns: [],
    location: 'default',
  };
  
  const result = calculatePrice(factors);
  const basePrice = result.breakdown.base + result.breakdown.sqft + result.breakdown.rooms;
  
  console.log(`${example.name}: $${basePrice}`);
});

console.log('\n=======================================================');
console.log('Service Type Multipliers (applied to base price):\n');
console.log('Standard Cleaning: 1.0x');
console.log('Deep Cleaning: 1.5x');
console.log('Move In/Out: 1.8x');
console.log('Airbnb Turnover: 0.9x');
console.log('Post Construction: 2.5x');