// Comprehensive Page Testing Script
const urls = [
  // Main pages
  { path: '/', name: 'Home' },
  { path: '/services', name: 'Services' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/booking', name: 'Booking' },
  { path: '/contact', name: 'Contact' },
  { path: '/about', name: 'About' },
  
  // Service pages
  { path: '/services/commercial-cleaning', name: 'Commercial Cleaning' },
  { path: '/services/standard-cleaning', name: 'Standard Cleaning' },
  { path: '/services/deep-cleaning', name: 'Deep Cleaning' },
  { path: '/services/move-in-out-cleaning', name: 'Move In/Out' },
  { path: '/services/airbnb-cleaning', name: 'Airbnb Cleaning' },
  { path: '/services/post-construction', name: 'Post Construction' },
  
  // Tower pages
  { path: '/towers', name: 'All Towers' },
  { path: '/towers/70-rainey', name: '70 Rainey Tower' },
  { path: '/towers/the-quincy', name: 'The Quincy Tower' },
  { path: '/towers/the-independent', name: 'The Independent Tower' },
  { path: '/towers/44-east', name: '44 East Tower' },
  { path: '/towers/the-shore', name: 'The Shore Tower' },
  
  // Area pages
  { path: '/areas', name: 'All Areas' },
  { path: '/areas/downtown-austin', name: 'Downtown Austin' },
  { path: '/areas/rainey-street', name: 'Rainey Street' },
  { path: '/areas/the-domain', name: 'The Domain' },
  { path: '/areas/south-congress', name: 'South Congress' },
  { path: '/areas/west-lake-hills', name: 'West Lake Hills' },
  { path: '/areas/cedar-park', name: 'Cedar Park' },
  { path: '/areas/east-austin', name: 'East Austin' },
];

const baseUrl = 'http://localhost:3000';

async function testPages() {
  console.log('🔍 Testing all pages...\n');
  const results = { success: [], error: [] };
  
  for (const url of urls) {
    try {
      const response = await fetch(baseUrl + url.path);
      const status = response.status;
      
      if (status === 200) {
        console.log(`✅ ${url.name}: ${url.path} - OK (${status})`);
        results.success.push(url);
      } else if (status === 404) {
        console.log(`❌ ${url.name}: ${url.path} - NOT FOUND (${status})`);
        results.error.push({ ...url, error: 'Page not found' });
      } else {
        console.log(`⚠️  ${url.name}: ${url.path} - Status ${status}`);
        results.error.push({ ...url, error: `Status ${status}` });
      }
    } catch (error) {
      console.log(`❌ ${url.name}: ${url.path} - ERROR: ${error.message}`);
      results.error.push({ ...url, error: error.message });
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Successful: ${results.success.length}/${urls.length}`);
  console.log(`❌ Failed: ${results.error.length}/${urls.length}`);
  
  if (results.error.length > 0) {
    console.log('\n❌ Failed pages:');
    results.error.forEach(page => {
      console.log(`  - ${page.name} (${page.path}): ${page.error}`);
    });
  }
  
  return results;
}

// Run tests
testPages().catch(console.error);