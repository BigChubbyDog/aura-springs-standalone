// Test the actual pricing service from the application
import { calculatePrice } from './lib/pricingService';

console.log('==============================================');
console.log('TESTING ACTUAL PRICING SERVICE');
console.log('==============================================\n');

interface TestCase {
  name: string;
  factors: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    serviceType: 'standard' | 'deep' | 'moveInOut' | 'airbnb' | 'postConstruction';
    frequency: 'onetime' | 'weekly' | 'biweekly' | 'monthly';
    addOns: string[];
    location: string;
  };
  expected: number;
}

const testCases: TestCase[] = [
  {
    name: '1BR/1BA 800sqft Standard',
    factors: {
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 800,
      serviceType: 'standard',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 150
  },
  {
    name: '3BR/2BA 1300sqft Standard',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1300,
      serviceType: 'standard',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 150
  },
  {
    name: '3BR/2BA 1500sqft Standard',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1500,
      serviceType: 'standard',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 175
  },
  {
    name: '3BR/2BA 2000sqft Standard',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 2000,
      serviceType: 'standard',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 225
  },
  {
    name: '4BR/2BA 1000sqft Standard',
    factors: {
      bedrooms: 4,
      bathrooms: 2,
      squareFeet: 1000,
      serviceType: 'standard',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 175
  },
  {
    name: '3BR/2BA 1300sqft Deep Clean',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1300,
      serviceType: 'deep',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 225
  },
  {
    name: '3BR/2BA 1300sqft Move In/Out',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1300,
      serviceType: 'moveInOut',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 251
  },
  {
    name: '4BR/3BA 2000sqft Deep Clean',
    factors: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2000,
      serviceType: 'deep',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 413
  },
  {
    name: '5BR/4BA 3000sqft Post-Construction',
    factors: {
      bedrooms: 5,
      bathrooms: 4,
      squareFeet: 3000,
      serviceType: 'postConstruction',
      frequency: 'onetime',
      addOns: [],
      location: 'default'
    },
    expected: 1063
  },
  {
    name: '3BR/2BA 1500sqft Downtown Premium',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1500,
      serviceType: 'standard',
      frequency: 'onetime',
      addOns: [],
      location: 'downtown'
    },
    expected: 210  // 175 * 1.2
  },
  {
    name: '3BR/2BA 1500sqft Bi-weekly Discount',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1500,
      serviceType: 'standard',
      frequency: 'biweekly',
      addOns: [],
      location: 'default'
    },
    expected: 149  // 175 * 0.85
  },
  {
    name: '3BR/2BA 1500sqft with Add-ons',
    factors: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1500,
      serviceType: 'standard',
      frequency: 'onetime',
      addOns: ['insideOven', 'insideFridge'],
      location: 'default'
    },
    expected: 240  // 175 + 35 + 30
  }
];

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
  const result = calculatePrice(test.factors);
  const pass = result.total === test.expected;
  
  if (pass) {
    passed++;
    console.log(`✅ Test ${index + 1}: ${test.name}`);
    console.log(`   Expected: $${test.expected}, Got: $${result.total}`);
  } else {
    failed++;
    console.log(`❌ Test ${index + 1}: ${test.name}`);
    console.log(`   Expected: $${test.expected}, Got: $${result.total}`);
    console.log(`   Breakdown: Base=$${result.breakdown.base}, Rooms=$${result.breakdown.rooms}, SqFt=$${result.breakdown.sqft}, Location=$${result.breakdown.location}`);
  }
});

console.log('\n==============================================');
console.log('PRICING SERVICE TEST SUMMARY');
console.log('==============================================');
console.log(`Total Tests: ${testCases.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Success Rate: ${((passed/testCases.length)*100).toFixed(1)}%`);

// Test some special calculations
console.log('\n==============================================');
console.log('SPECIAL PRICING CALCULATIONS');
console.log('==============================================\n');

const specialTests = [
  { bedrooms: 6, bathrooms: 5, squareFeet: 4000, serviceType: 'standard' as const },
  { bedrooms: 2, bathrooms: 1, squareFeet: 750, serviceType: 'airbnb' as const },
  { bedrooms: 4, bathrooms: 3.5, squareFeet: 2800, serviceType: 'deep' as const },
  { bedrooms: 5, bathrooms: 3, squareFeet: 3500, serviceType: 'moveInOut' as const }
];

specialTests.forEach(test => {
  const result = calculatePrice({
    ...test,
    bathrooms: Math.floor(test.bathrooms),  // Round down half bathrooms
    frequency: 'onetime',
    addOns: [],
    location: 'default'
  });
  
  console.log(`${test.bedrooms}BR/${test.bathrooms}BA ${test.squareFeet}sqft ${test.serviceType}:`);
  console.log(`  Price: $${result.total}`);
  console.log(`  Breakdown: Base=$${result.breakdown.base}, Rooms=$${result.breakdown.rooms}, SqFt=$${result.breakdown.sqft}`);
  console.log('');
});