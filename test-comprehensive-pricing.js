// Comprehensive Pricing Test Suite
// Base: $150 for 3BR/2BA up to 1300 sq ft
// +$25 per 250 sq ft above 1300 (or portion thereof)
// +$25 per bedroom above 3
// +$25 per bathroom above 2

function calculatePrice(bedrooms, bathrooms, sqft, serviceType = 'standard') {
  // Base price
  let price = 150;
  
  // Square footage above 1300
  if (sqft > 1300) {
    const extraSqft = sqft - 1300;
    const increments = Math.ceil(extraSqft / 250);
    price += increments * 25;
  }
  
  // Extra bedrooms above 3
  if (bedrooms > 3) {
    price += (bedrooms - 3) * 25;
  }
  
  // Extra bathrooms above 2
  if (bathrooms > 2) {
    price += (bathrooms - 2) * 25;
  }
  
  // Service type multipliers
  const multipliers = {
    standard: 1.0,      // Base price
    deep: 1.5,          // 50% more
    moveInOut: 1.67,    // 67% more (to get $250 from $150)
    airbnb: 0.9,        // 10% discount
    postConstruction: 2.5  // 150% more
  };
  
  return Math.round(price * multipliers[serviceType]);
}

console.log('==============================================');
console.log('COMPREHENSIVE PRICING TEST SUITE');
console.log('==============================================\n');

let testNumber = 1;
const results = [];

function test(bedrooms, bathrooms, sqft, serviceType, expectedPrice = null) {
  const price = calculatePrice(bedrooms, bathrooms, sqft, serviceType);
  const serviceName = {
    standard: 'Standard',
    deep: 'Deep Clean',
    moveInOut: 'Move In/Out',
    airbnb: 'Airbnb',
    postConstruction: 'Post-Construction'
  }[serviceType];
  
  const result = {
    test: testNumber++,
    config: `${bedrooms}BR/${bathrooms}BA ${sqft}sqft`,
    service: serviceName,
    price: price,
    expected: expectedPrice,
    pass: expectedPrice ? price === expectedPrice : 'N/A'
  };
  
  results.push(result);
  
  const passIcon = expectedPrice ? (price === expectedPrice ? '✓' : '✗') : '→';
  const expectedText = expectedPrice ? ` (Expected: $${expectedPrice})` : '';
  
  console.log(`Test ${result.test}: ${result.config} ${serviceName}: $${price}${expectedText} ${passIcon}`);
  
  return price;
}

console.log('--- STANDARD CLEANING TESTS ---');
test(1, 1, 800, 'standard', 150);      // Small apartment
test(2, 1, 1000, 'standard', 150);     // 2BR apartment
test(3, 2, 1300, 'standard', 150);     // Base configuration
test(3, 2, 1500, 'standard', 175);     // +200sqft = 1 increment
test(3, 2, 1800, 'standard', 200);     // +500sqft = 2 increments
test(3, 2, 2000, 'standard', 225);     // +700sqft = 3 increments
test(4, 2, 1300, 'standard', 175);     // +1 bedroom
test(3, 3, 1300, 'standard', 175);     // +1 bathroom
test(4, 3, 1500, 'standard', 225);     // +1BR, +1BA, +200sqft
test(5, 3, 2500, 'standard', 350);     // Large home: 150 + 125(5x250sqft) + 50(2BR) + 25(1BA)

console.log('\n--- DEEP CLEANING TESTS (1.5x) ---');
test(3, 2, 1300, 'deep', 225);         // Base * 1.5
test(3, 2, 1500, 'deep', 263);         // 175 * 1.5 = 262.5 → 263
test(4, 2, 1300, 'deep', 263);         // 175 * 1.5 = 262.5 → 263
test(4, 3, 2000, 'deep', 413);         // 275 * 1.5 = 412.5 → 413
test(5, 4, 3000, 'deep', 638);         // 425 * 1.5 = 637.5 → 638

console.log('\n--- MOVE IN/OUT CLEANING TESTS (1.67x) ---');
test(3, 2, 1300, 'moveInOut', 251);    // Base * 1.67 = 250.5 → 251
test(3, 2, 1500, 'moveInOut', 292);    // 175 * 1.67 = 292.25 → 292
test(4, 3, 1800, 'moveInOut', 418);    // 250 * 1.67 = 417.5 → 418
test(5, 3, 2500, 'moveInOut', 585);    // 350 * 1.67 = 584.5 → 585
test(6, 4, 3500, 'moveInOut', 835);    // 500 * 1.67 = 835

console.log('\n--- AIRBNB CLEANING TESTS (0.9x) ---');
test(1, 1, 600, 'airbnb', 135);        // Studio
test(2, 1, 900, 'airbnb', 135);        // 1BR
test(3, 2, 1300, 'airbnb', 135);       // Base * 0.9
test(3, 2, 1500, 'airbnb', 158);       // 175 * 0.9 = 157.5 → 158
test(4, 2, 2000, 'airbnb', 225);       // 250 * 0.9 = 225

console.log('\n--- POST-CONSTRUCTION CLEANING TESTS (2.5x) ---');
test(3, 2, 1300, 'postConstruction', 375);    // Base * 2.5
test(3, 2, 1500, 'postConstruction', 438);    // 175 * 2.5 = 437.5 → 438
test(4, 3, 2000, 'postConstruction', 688);    // 275 * 2.5 = 687.5 → 688
test(5, 4, 3000, 'postConstruction', 1063);   // 425 * 2.5 = 1062.5 → 1063
test(6, 5, 4000, 'postConstruction', 1438);   // 575 * 2.5 = 1437.5 → 1438

console.log('\n--- EDGE CASES & SPECIAL SCENARIOS ---');
test(1, 1, 500, 'standard', 150);      // Tiny studio
test(2, 2, 1200, 'standard', 150);     // Below base sqft
test(10, 10, 1300, 'standard', 525);   // Many rooms: 150 + 175(7BR) + 200(8BA)
test(3, 2, 5000, 'standard', 525);     // Huge sqft: 150 + 375(15x250sqft)
test(3, 2, 1301, 'standard', 175);     // Just over 1300sqft
test(3, 2, 1549, 'standard', 175);     // Just under 1550sqft
test(3, 2, 1550, 'standard', 175);     // Exactly 1550sqft (250/250 = 1 increment)
test(3, 2, 1551, 'standard', 200);     // Just over 1550sqft

console.log('\n==============================================');
console.log('TEST SUMMARY');
console.log('==============================================');

const passed = results.filter(r => r.pass === true).length;
const failed = results.filter(r => r.pass === false).length;
const total = results.filter(r => r.pass !== 'N/A').length;

console.log(`\nTests with expected values: ${total}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Success Rate: ${total > 0 ? ((passed/total)*100).toFixed(1) : 0}%`);

if (failed > 0) {
  console.log('\n❌ FAILED TESTS:');
  results.filter(r => r.pass === false).forEach(r => {
    console.log(`  Test ${r.test}: ${r.config} ${r.service} - Got $${r.price}, Expected $${r.expected}`);
  });
}

console.log('\n==============================================');
console.log('PRICING FORMULA VERIFICATION');
console.log('==============================================');
console.log('\nBase Price: $150 (3BR/2BA, up to 1300 sqft)');
console.log('Square Footage: +$25 per 250 sqft above 1300');
console.log('Extra Bedrooms: +$25 per bedroom above 3');
console.log('Extra Bathrooms: +$25 per bathroom above 2');
console.log('\nService Multipliers:');
console.log('  Standard: 1.0x');
console.log('  Deep Clean: 1.5x');
console.log('  Move In/Out: 1.67x');
console.log('  Airbnb: 0.9x');
console.log('  Post-Construction: 2.5x');

// Calculate some manual examples to verify
console.log('\n--- MANUAL CALCULATION EXAMPLES ---');

function manualCalc(beds, baths, sqft, service) {
  console.log(`\n${beds}BR/${baths}BA ${sqft}sqft ${service}:`);
  
  let base = 150;
  console.log(`  Base: $${base}`);
  
  let sqftCharge = 0;
  if (sqft > 1300) {
    const extra = sqft - 1300;
    const increments = Math.ceil(extra / 250);
    sqftCharge = increments * 25;
    console.log(`  +${extra}sqft = ${increments} increments × $25 = $${sqftCharge}`);
  }
  
  let bedCharge = 0;
  if (beds > 3) {
    bedCharge = (beds - 3) * 25;
    console.log(`  +${beds - 3} bedrooms × $25 = $${bedCharge}`);
  }
  
  let bathCharge = 0;
  if (baths > 2) {
    bathCharge = (baths - 2) * 25;
    console.log(`  +${baths - 2} bathrooms × $25 = $${bathCharge}`);
  }
  
  const subtotal = base + sqftCharge + bedCharge + bathCharge;
  console.log(`  Subtotal: $${subtotal}`);
  
  const multipliers = {
    'Standard': 1.0,
    'Deep': 1.5,
    'Move In/Out': 1.67,
    'Airbnb': 0.9,
    'Post-Construction': 2.5
  };
  
  const multiplier = multipliers[service];
  const final = Math.round(subtotal * multiplier);
  console.log(`  × ${multiplier} (${service}) = $${final}`);
  
  return final;
}

manualCalc(4, 3, 2000, 'Standard');
manualCalc(4, 3, 2000, 'Deep');
manualCalc(5, 4, 3000, 'Move In/Out');