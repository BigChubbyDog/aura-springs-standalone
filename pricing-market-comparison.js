// Market Comparison Calculator
// Compares Aura Spring pricing to Austin market rates

function calculateAuraPrice(bedrooms, bathrooms, sqft) {
  let price = 150; // Base
  
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
  
  return price;
}

console.log('====================================================');
console.log('AURA SPRING PRICING vs AUSTIN MARKET COMPARISON');
console.log('====================================================\n');

// Test scenarios matching common Austin homes
const scenarios = [
  { beds: 1, baths: 1, sqft: 700, type: 'Studio/1BR Apartment' },
  { beds: 2, baths: 1, sqft: 900, type: '2BR Apartment' },
  { beds: 2, baths: 2, sqft: 1100, type: '2BR/2BA Condo' },
  { beds: 3, baths: 2, sqft: 1300, type: '3BR/2BA Starter Home' },
  { beds: 3, baths: 2, sqft: 1500, type: '3BR/2BA Average Home' },
  { beds: 3, baths: 2, sqft: 1800, type: '3BR/2BA Large Home' },
  { beds: 3, baths: 2, sqft: 2000, type: '3BR/2BA Family Home' },
  { beds: 4, baths: 2, sqft: 2200, type: '4BR/2BA Home' },
  { beds: 4, baths: 3, sqft: 2500, type: '4BR/3BA Executive' },
  { beds: 5, baths: 3, sqft: 3000, type: '5BR/3BA Luxury' },
  { beds: 5, baths: 4, sqft: 3500, type: '5BR/4BA Estate' },
  { beds: 6, baths: 4, sqft: 4000, type: '6BR/4BA Mansion' }
];

// Market ranges based on research
const marketRanges = {
  700: { low: 100, high: 120, avg: 110 },
  900: { low: 100, high: 130, avg: 115 },
  1100: { low: 110, high: 140, avg: 125 },
  1300: { low: 120, high: 160, avg: 140 },
  1500: { low: 135, high: 180, avg: 158 },
  1800: { low: 145, high: 200, avg: 173 },
  2000: { low: 135, high: 180, avg: 158 },  // Per research
  2200: { low: 160, high: 220, avg: 190 },
  2500: { low: 180, high: 250, avg: 215 },
  3000: { low: 200, high: 320, avg: 260 },
  3500: { low: 250, high: 380, avg: 315 },
  4000: { low: 300, high: 450, avg: 375 }
};

// Competitor specific pricing (estimated from research)
const competitors = {
  'Molly Maid': { base: 120, perSqft: 0.08, perRoom: 20 },
  'Merry Maids': { base: 150, perSqft: 0.075, perRoom: 25 },
  'Cleaning Authority': { base: 135, perSqft: 0.085, perRoom: 20 }
};

console.log('PRICING COMPARISON TABLE');
console.log('Home Type                    Aura    Market Range    Per SqFt   vs Market');
console.log('-------------------------------------------------------------------------');

scenarios.forEach(home => {
  const auraPrice = calculateAuraPrice(home.beds, home.baths, home.sqft);
  const market = marketRanges[home.sqft];
  const perSqft = (auraPrice / home.sqft).toFixed(3);
  
  // Determine position
  let position;
  if (auraPrice < market.low) {
    position = 'BELOW (-$' + (market.low - auraPrice) + ')';
  } else if (auraPrice > market.high) {
    position = 'ABOVE (+$' + (auraPrice - market.high) + ')';
  } else {
    const percentInRange = ((auraPrice - market.low) / (market.high - market.low) * 100).toFixed(0);
    position = 'IN RANGE (' + percentInRange + '%)';
  }
  
  const homeDesc = `${home.beds}BR/${home.baths}BA ${home.sqft}sqft`;
  console.log(
    `${homeDesc.padEnd(20)} $${String(auraPrice).padEnd(6)} $${market.low}-${market.high}        $${perSqft}     ${position}`
  );
});

console.log('\n====================================================');
console.log('COMPETITOR COMPARISON (Estimated)');
console.log('====================================================\n');

console.log('3BR/2BA 2000sqft Home Comparison:');
console.log('----------------------------------');
const testHome = { beds: 3, baths: 2, sqft: 2000 };
const auraPrice = calculateAuraPrice(testHome.beds, testHome.baths, testHome.sqft);

console.log(`Aura Spring:        $${auraPrice}`);

Object.entries(competitors).forEach(([name, comp]) => {
  const price = Math.round(comp.base + (testHome.sqft - 1000) * comp.perSqft);
  console.log(`${name.padEnd(20)}$${price} ${price > auraPrice ? '(+$' + (price - auraPrice) + ')' : '(-$' + (auraPrice - price) + ')'}`);
});

console.log('\n====================================================');
console.log('PER SQUARE FOOT ANALYSIS');
console.log('====================================================\n');

console.log('Austin Market Average: $0.09-$0.12 per sqft');
console.log('Premium Services:      $0.12-$0.16 per sqft\n');

console.log('Aura Spring Rates by Home Size:');
scenarios.forEach(home => {
  const auraPrice = calculateAuraPrice(home.beds, home.baths, home.sqft);
  const perSqft = (auraPrice / home.sqft).toFixed(3);
  const marketAvg = 0.105; // Midpoint of Austin average
  const variance = ((parseFloat(perSqft) - marketAvg) / marketAvg * 100).toFixed(1);
  
  console.log(
    `${home.sqft}sqft: $${perSqft}/sqft (${variance > 0 ? '+' : ''}${variance}% vs market avg)`
  );
});

console.log('\n====================================================');
console.log('COMPETITIVE POSITION SUMMARY');
console.log('====================================================\n');

let belowMarket = 0;
let inRange = 0;
let aboveMarket = 0;

scenarios.forEach(home => {
  const auraPrice = calculateAuraPrice(home.beds, home.baths, home.sqft);
  const market = marketRanges[home.sqft];
  
  if (auraPrice < market.low) belowMarket++;
  else if (auraPrice > market.high) aboveMarket++;
  else inRange++;
});

console.log(`Below Market:  ${belowMarket} scenarios`);
console.log(`In Range:      ${inRange} scenarios`);
console.log(`Above Market:  ${aboveMarket} scenarios`);

const percentInRange = (inRange / scenarios.length * 100).toFixed(1);
console.log(`\nMarket Alignment: ${percentInRange}% of scenarios are within market range`);

// Calculate average per sqft
let totalPerSqft = 0;
scenarios.forEach(home => {
  const auraPrice = calculateAuraPrice(home.beds, home.baths, home.sqft);
  totalPerSqft += auraPrice / home.sqft;
});
const avgPerSqft = (totalPerSqft / scenarios.length).toFixed(3);

console.log(`Average $/sqft:   $${avgPerSqft} (Austin avg: $0.09-$0.12)`);

if (avgPerSqft >= 0.09 && avgPerSqft <= 0.12) {
  console.log('\n✅ PRICING IS COMPETITIVE WITH AUSTIN MARKET');
} else if (avgPerSqft < 0.09) {
  console.log('\n⚠️ PRICING MAY BE TOO LOW FOR AUSTIN MARKET');
} else {
  console.log('\n⚠️ PRICING IS SLIGHTLY PREMIUM BUT JUSTIFIED FOR QUALITY SERVICE');
}