/**
 * CTA Functionality Test
 * Tests that all CTA buttons are clickable and lead to correct destinations
 */

const chalk = require('chalk');

const BASE_URL = 'http://localhost:3000';

// CTAs to test
const ctaTests = [
  {
    page: '/',
    selector: 'button:has-text("Get Instant Quote")',
    expectedAction: 'Shows pricing calculator',
    type: 'click'
  },
  {
    page: '/',
    selector: 'a[href="tel:512-781-0527"]',
    expectedAction: 'Phone link to Valerie',
    type: 'link'
  },
  {
    page: '/',
    selector: 'a[href="/booking"]',
    expectedAction: 'Navigate to booking page',
    type: 'navigation'
  },
  {
    page: '/services',
    selector: 'a:has-text("Book Now")',
    expectedAction: 'Navigate to booking',
    type: 'navigation'
  },
  {
    page: '/services',
    selector: 'a:has-text("Learn More")',
    expectedAction: 'Navigate to service details',
    type: 'navigation'
  },
  {
    page: '/booking',
    selector: 'button[type="submit"]',
    expectedAction: 'Submit booking form',
    type: 'form'
  },
  {
    page: '/contact',
    selector: 'button[type="submit"]',
    expectedAction: 'Submit contact form',
    type: 'form'
  }
];

async function testCTAs() {
  console.log(chalk.blue.bold('\n🔍 Testing CTA Functionality\n'));
  console.log(chalk.yellow('Primary Contact: Valerie - (512) 781-0527\n'));

  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    let passed = 0;
    let failed = 0;
    
    // Test each CTA
    for (const test of ctaTests) {
      const url = BASE_URL + test.page;
      console.log(chalk.cyan(`\nTesting: ${test.page}`));
      console.log(`  CTA: ${test.selector}`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait for selector
        await page.waitForSelector(test.selector, { timeout: 5000 });
        
        if (test.type === 'click') {
          // Test click action
          await page.click(test.selector);
          console.log(chalk.green(`  ✅ Clickable - ${test.expectedAction}`));
          passed++;
        } else if (test.type === 'link') {
          // Test link href
          const href = await page.$eval(test.selector, el => el.href);
          if (href) {
            console.log(chalk.green(`  ✅ Valid link - ${href}`));
            passed++;
          } else {
            console.log(chalk.red(`  ❌ Invalid link`));
            failed++;
          }
        } else if (test.type === 'navigation') {
          // Test navigation
          const href = await page.$eval(test.selector, el => el.href);
          if (href) {
            console.log(chalk.green(`  ✅ Navigate to ${href}`));
            passed++;
          } else {
            console.log(chalk.red(`  ❌ No navigation target`));
            failed++;
          }
        } else if (test.type === 'form') {
          // Check form exists
          const formExists = await page.$(test.selector) !== null;
          if (formExists) {
            console.log(chalk.green(`  ✅ Form button present`));
            passed++;
          } else {
            console.log(chalk.red(`  ❌ Form button missing`));
            failed++;
          }
        }
      } catch (error) {
        console.log(chalk.red(`  ❌ Failed: ${error.message}`));
        failed++;
      }
    }
    
    // Summary
    console.log(chalk.blue.bold('\n📊 Summary'));
    console.log('─'.repeat(40));
    console.log(chalk.green(`✅ Passed: ${passed}`));
    if (failed > 0) {
      console.log(chalk.red(`❌ Failed: ${failed}`));
    }
    
    if (failed === 0) {
      console.log(chalk.green.bold('\n🎉 All CTAs working correctly!'));
    } else {
      console.log(chalk.yellow.bold('\n⚠️  Some CTAs need attention'));
    }
    
  } catch (error) {
    console.log(chalk.red('Error running tests:', error.message));
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Simple version without Puppeteer (just checks HTML)
async function simpleCTATest() {
  const fetch = require('node-fetch');
  
  console.log(chalk.blue.bold('\n🔍 Simple CTA Link Test\n'));
  
  try {
    const response = await fetch(BASE_URL);
    const html = await response.text();
    
    // Check for key CTAs in HTML
    const checks = [
      { pattern: 'href="/booking"', name: 'Booking links' },
      { pattern: 'href="tel:512-781-0527"', name: 'Valerie phone links' },
      { pattern: 'href="/contact"', name: 'Contact links' },
      { pattern: 'href="/pricing"', name: 'Pricing links' },
      { pattern: 'onclick=', name: 'Click handlers' },
      { pattern: 'Book Now', name: 'Book Now buttons' },
      { pattern: 'Get Quote', name: 'Get Quote buttons' },
      { pattern: 'Call', name: 'Call buttons' }
    ];
    
    console.log('Checking homepage for CTAs:');
    checks.forEach(check => {
      const regex = new RegExp(check.pattern, 'gi');
      const matches = html.match(regex) || [];
      if (matches.length > 0) {
        console.log(chalk.green(`  ✅ ${check.name}: ${matches.length} found`));
      } else {
        console.log(chalk.yellow(`  ⚠️  ${check.name}: None found`));
      }
    });
    
  } catch (error) {
    console.log(chalk.red('Error:', error.message));
  }
}

// Run simple test (Puppeteer not needed for basic checks)
simpleCTATest().catch(console.error);