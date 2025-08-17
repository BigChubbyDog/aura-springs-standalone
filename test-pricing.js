// Test file for new pricing structure
// Base: $150 for 3BR/2BA up to 1300 sq ft
// +$25 per 250 sq ft above 1300
// +$25 per bedroom above 3
// +$25 per bathroom above 2

function calculatePrice(bedrooms, bathrooms, sqft, serviceType = 'standard') {
  // Base price
  let price = 150;
  
  // Square footage above 1300
  if (sqft > 1300) {
    const extraSqft = sqft - 1300;
    const increments = Math.ceil(extraSqft / 250);  // Charge for any portion of 250 sq ft
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
    standard: 1.0,      // $150 base
    deep: 1.5,          // $225 base
    moveInOut: 1.67,    // $250 base
    airbnb: 0.9,        // $135 base
    postConstruction: 2.5  // $375 base
  };
  
  return Math.round(price * multipliers[serviceType]);
}

// Test cases from user examples
console.log('=== Testing New Pricing Structure ===\n');

// Test 1: 1/1 standard (should be $150)
console.log('1BR/1BA 800sqft Standard:', calculatePrice(1, 1, 800, 'standard'), '(Expected: $150)');

// Test 2: 3/2 1500sqft (should be $175)
console.log('3BR/2BA 1500sqft Standard:', calculatePrice(3, 2, 1500, 'standard'), '(Expected: $175)');

// Test 3: 3/2 2000sqft (should be $225 - 700 extra sqft = 3 increments)
console.log('3BR/2BA 2000sqft Standard:', calculatePrice(3, 2, 2000, 'standard'), '(Expected: $225)');

// Test 4: 4/2 1000sqft (should be $175)
console.log('4BR/2BA 1000sqft Standard:', calculatePrice(4, 2, 1000, 'standard'), '(Expected: $175)');

// Test 5: Deep cleaning for 3/2 1300sqft (should be $225)
console.log('3BR/2BA 1300sqft Deep Clean:', calculatePrice(3, 2, 1300, 'deep'), '(Expected: $225)');

// Test 6: Move in/out for 3/2 1300sqft (should be $250)
console.log('3BR/2BA 1300sqft Move In/Out:', calculatePrice(3, 2, 1300, 'moveInOut'), '(Expected: $250)');

// Additional test cases
console.log('\n=== Additional Test Cases ===\n');

// Test 7: 4/3 2500sqft standard
console.log('4BR/3BA 2500sqft Standard:', calculatePrice(4, 3, 2500, 'standard'));

// Test 8: 5/3 3000sqft standard
console.log('5BR/3BA 3000sqft Standard:', calculatePrice(5, 3, 3000, 'standard'));

// Test 9: 2/2 1200sqft standard (under base)
console.log('2BR/2BA 1200sqft Standard:', calculatePrice(2, 2, 1200, 'standard'));

// Test 10: Post-construction 3/2 1500sqft
console.log('3BR/2BA 1500sqft Post-Construction:', calculatePrice(3, 2, 1500, 'postConstruction'));