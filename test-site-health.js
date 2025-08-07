const http = require('http');
const https = require('https');
const { URL } = require('url');

const BASE_URL = 'http://localhost:3001';
const TIMEOUT = 5000;

// Pages to test
const pagesToTest = [
  '/',
  '/about',
  '/services',
  '/services/regular-cleaning',
  '/services/deep-cleaning',
  '/services/move-in-out-cleaning',
  '/services/airbnb-cleaning',
  '/services/commercial-cleaning',
  '/pricing',
  '/booking',
  '/areas',
  '/areas/downtown-austin',
  '/areas/the-domain',
  '/areas/south-congress',
  '/areas/west-lake-hills',
  '/blog',
  '/contact',
  '/testimonials',
  '/faq',
  '/careers',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/refund-policy'
];

// API endpoints to test
const apiEndpoints = [
  { path: '/api/booking', method: 'GET' },
  { path: '/api/booking', method: 'POST', body: {
    customerName: 'Test User',
    customerEmail: 'test@example.com',
    customerPhone: '512-555-0123',
    serviceType: 'Regular Cleaning',
    serviceDate: '2025-02-01',
    serviceTime: '09:00',
    address: '123 Test St, Austin, TX',
    squareFeet: 2000,
    bedrooms: 3,
    bathrooms: 2,
    addOns: [],
    frequency: 'biweekly',
    totalPrice: 300,
    specialInstructions: 'Test booking'
  }}
];

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      ...options,
      timeout: TIMEOUT
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ 
        status: res.statusCode, 
        headers: res.headers,
        data 
      }));
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function testPage(path) {
  const url = `${BASE_URL}${path}`;
  try {
    const start = Date.now();
    const response = await makeRequest(url);
    const duration = Date.now() - start;
    
    if (response.status === 200) {
      // Check for React errors in the response
      const hasError = response.data.includes('Error:') || 
                      response.data.includes('Cannot read') ||
                      response.data.includes('undefined is not');
      
      if (hasError) {
        return {
          path,
          status: 'error',
          message: 'Page loads but contains errors',
          duration
        };
      }
      
      return {
        path,
        status: 'success',
        statusCode: response.status,
        duration
      };
    } else if (response.status === 404) {
      return {
        path,
        status: 'missing',
        statusCode: response.status,
        duration
      };
    } else {
      return {
        path,
        status: 'error',
        statusCode: response.status,
        duration
      };
    }
  } catch (error) {
    return {
      path,
      status: 'error',
      message: error.message
    };
  }
}

async function testAPI(endpoint) {
  const url = `${BASE_URL}${endpoint.path}`;
  const options = {
    method: endpoint.method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (endpoint.body) {
    options.body = endpoint.body;
  }
  
  try {
    const start = Date.now();
    const response = await makeRequest(url, options);
    const duration = Date.now() - start;
    
    return {
      path: `${endpoint.method} ${endpoint.path}`,
      status: response.status < 400 ? 'success' : 'error',
      statusCode: response.status,
      duration
    };
  } catch (error) {
    return {
      path: `${endpoint.method} ${endpoint.path}`,
      status: 'error',
      message: error.message
    };
  }
}

async function extractLinks(path) {
  const url = `${BASE_URL}${path}`;
  try {
    const response = await makeRequest(url);
    if (response.status !== 200) return [];
    
    // Extract href links from the HTML
    const linkRegex = /href=["']([^"']+)["']/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(response.data)) !== null) {
      const link = match[1];
      // Only include internal links
      if (link.startsWith('/') && !link.startsWith('//') && !link.includes('#')) {
        links.push(link);
      }
    }
    
    return [...new Set(links)]; // Remove duplicates
  } catch (error) {
    return [];
  }
}

async function runTests() {
  console.log(`\n${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.cyan}  Aura Spring Cleaning Site Health Test${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}\n`);
  
  // Wait for server to fully start
  console.log(`${colors.yellow}Waiting for server to be ready...${colors.reset}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test pages
  console.log(`\n${colors.blue}Testing Pages:${colors.reset}`);
  console.log(`${colors.blue}${'─'.repeat(50)}${colors.reset}`);
  
  const pageResults = [];
  let successCount = 0;
  let missingCount = 0;
  let errorCount = 0;
  
  for (const path of pagesToTest) {
    const result = await testPage(path);
    pageResults.push(result);
    
    if (result.status === 'success') {
      console.log(`${colors.green}✓${colors.reset} ${path.padEnd(35)} ${colors.green}OK${colors.reset} (${result.duration}ms)`);
      successCount++;
    } else if (result.status === 'missing') {
      console.log(`${colors.yellow}⚠${colors.reset} ${path.padEnd(35)} ${colors.yellow}404 Not Found${colors.reset}`);
      missingCount++;
    } else {
      console.log(`${colors.red}✗${colors.reset} ${path.padEnd(35)} ${colors.red}ERROR: ${result.message || `Status ${result.statusCode}`}${colors.reset}`);
      errorCount++;
    }
  }
  
  // Test APIs
  console.log(`\n${colors.blue}Testing API Endpoints:${colors.reset}`);
  console.log(`${colors.blue}${'─'.repeat(50)}${colors.reset}`);
  
  for (const endpoint of apiEndpoints) {
    const result = await testAPI(endpoint);
    
    if (result.status === 'success') {
      console.log(`${colors.green}✓${colors.reset} ${result.path.padEnd(35)} ${colors.green}OK${colors.reset} (${result.duration}ms)`);
    } else {
      console.log(`${colors.red}✗${colors.reset} ${result.path.padEnd(35)} ${colors.red}ERROR: ${result.message || `Status ${result.statusCode}`}${colors.reset}`);
    }
  }
  
  // Extract and test all internal links from homepage
  console.log(`\n${colors.blue}Scanning Internal Links:${colors.reset}`);
  console.log(`${colors.blue}${'─'.repeat(50)}${colors.reset}`);
  
  const homeLinks = await extractLinks('/');
  const uniqueLinks = [...new Set(homeLinks)];
  console.log(`Found ${uniqueLinks.length} unique internal links on homepage`);
  
  const linksToTest = uniqueLinks.filter(link => !pagesToTest.includes(link));
  if (linksToTest.length > 0) {
    console.log(`Testing ${linksToTest.length} additional links...`);
    for (const link of linksToTest.slice(0, 10)) { // Test first 10 to avoid overwhelming
      const result = await testPage(link);
      if (result.status === 'missing') {
        console.log(`${colors.yellow}⚠${colors.reset} ${link.padEnd(35)} ${colors.yellow}404 Not Found${colors.reset}`);
      }
    }
  }
  
  // Summary
  console.log(`\n${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.cyan}  Test Summary${colors.reset}`);
  console.log(`${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.green}✓ Successful:${colors.reset} ${successCount} pages`);
  console.log(`${colors.yellow}⚠ Missing:${colors.reset} ${missingCount} pages`);
  console.log(`${colors.red}✗ Errors:${colors.reset} ${errorCount} pages`);
  
  // Specific recommendations
  console.log(`\n${colors.blue}Recommendations:${colors.reset}`);
  if (missingCount > 0) {
    console.log(`${colors.yellow}• Create the following missing pages:${colors.reset}`);
    pageResults.filter(r => r.status === 'missing').forEach(r => {
      console.log(`  - ${r.path}`);
    });
  }
  
  if (errorCount > 0) {
    console.log(`${colors.red}• Fix errors on the following pages:${colors.reset}`);
    pageResults.filter(r => r.status === 'error').forEach(r => {
      console.log(`  - ${r.path}: ${r.message || `Status ${r.statusCode}`}`);
    });
  }
  
  // Test booking form functionality
  console.log(`\n${colors.blue}Testing Booking Form:${colors.reset}`);
  console.log(`${colors.blue}${'─'.repeat(50)}${colors.reset}`);
  
  // Check if booking page loads
  const bookingPageTest = await testPage('/booking');
  if (bookingPageTest.status === 'success') {
    console.log(`${colors.green}✓${colors.reset} Booking page loads successfully`);
  } else if (bookingPageTest.status === 'missing') {
    console.log(`${colors.red}✗${colors.reset} Booking page not found - needs to be created`);
  } else {
    console.log(`${colors.red}✗${colors.reset} Booking page has errors`);
  }
  
  // Test booking API
  const bookingAPITest = await testAPI({
    path: '/api/booking',
    method: 'POST',
    body: {
      customerName: 'Test Customer',
      customerEmail: 'test@test.com',
      customerPhone: '512-555-0000',
      serviceType: 'Regular Cleaning',
      serviceDate: new Date().toISOString().split('T')[0],
      serviceTime: '10:00',
      address: '123 Test St',
      squareFeet: 2000,
      bedrooms: 3,
      bathrooms: 2,
      addOns: [],
      frequency: 'weekly',
      totalPrice: 300,
      specialInstructions: 'Test booking'
    }
  });
  
  if (bookingAPITest.status === 'success') {
    console.log(`${colors.green}✓${colors.reset} Booking API accepts submissions`);
  } else {
    console.log(`${colors.red}✗${colors.reset} Booking API error: ${bookingAPITest.message || `Status ${bookingAPITest.statusCode}`}`);
  }
  
  console.log(`\n${colors.cyan}Test completed!${colors.reset}\n`);
}

// Run the tests
runTests().catch(console.error);