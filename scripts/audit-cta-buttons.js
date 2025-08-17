/**
 * CTA Button Audit Script
 * Checks all call-to-action buttons across the site
 */

const fetch = require('node-fetch');
const chalk = require('chalk');

const BASE_URL = 'http://localhost:3000';

// Pages to check for CTAs
const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/booking', name: 'Booking Page' },
  { path: '/services', name: 'Services Page' },
  { path: '/pricing', name: 'Pricing Page' },
  { path: '/contact', name: 'Contact Page' },
  { path: '/areas/the-domain', name: 'The Domain Area' },
  { path: '/towers/the-quincy', name: 'The Quincy Tower' },
];

// CTA patterns to look for
const ctaPatterns = [
  'Book Now',
  'Get Quote',
  'Call',
  'Schedule',
  'Contact',
  'Learn More',
  'Get Started',
  'Sign Up',
  'Free Estimate',
  '512-781-0527', // Valerie's number
  '737-330-1489', // Old number
];

async function fetchPageContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { error: `HTTP ${response.status}` };
    }
    const html = await response.text();
    return { html };
  } catch (error) {
    return { error: error.message };
  }
}

function analyzeCTAs(html, pageName) {
  const results = {
    page: pageName,
    totalButtons: 0,
    bookingCTAs: 0,
    phoneCTAs: 0,
    quoteCTAs: 0,
    learnMoreCTAs: 0,
    brokenLinks: [],
    valeriePhone: false,
    oldPhone: false,
  };

  // Count button elements
  const buttonMatches = html.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
  results.totalButtons = buttonMatches.length;

  // Count Link components
  const linkMatches = html.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || [];
  results.totalButtons += linkMatches.length;

  // Check for specific CTAs
  ctaPatterns.forEach(pattern => {
    const regex = new RegExp(pattern, 'gi');
    const matches = html.match(regex) || [];
    
    if (pattern.includes('Book')) {
      results.bookingCTAs += matches.length;
    } else if (pattern.includes('Call') || pattern.includes('512') || pattern.includes('737')) {
      results.phoneCTAs += matches.length;
      if (pattern === '512-781-0527') {
        results.valeriePhone = matches.length > 0;
      }
      if (pattern === '737-330-1489') {
        results.oldPhone = matches.length > 0;
      }
    } else if (pattern.includes('Quote') || pattern.includes('Estimate')) {
      results.quoteCTAs += matches.length;
    } else if (pattern.includes('Learn More')) {
      results.learnMoreCTAs += matches.length;
    }
  });

  // Check for href attributes
  const hrefMatches = html.match(/href=["']([^"']+)["']/gi) || [];
  hrefMatches.forEach(match => {
    const href = match.replace(/href=["']|["']/g, '');
    if (href === '' || href === '#' || href === 'undefined' || href === 'null') {
      results.brokenLinks.push(href);
    }
  });

  return results;
}

async function runAudit() {
  console.log(chalk.blue.bold('\n🔍 CTA Button Audit for Aura Spring Cleaning\n'));
  console.log(chalk.yellow('Primary Contact: Valerie - (512) 781-0527\n'));
  
  // Check if server is running
  try {
    await fetch(BASE_URL);
  } catch (error) {
    console.log(chalk.red('❌ Server is not running at ' + BASE_URL));
    console.log(chalk.yellow('Please run: npm run dev'));
    process.exit(1);
  }

  const allResults = [];
  
  // Analyze each page
  for (const page of pages) {
    const url = BASE_URL + page.path;
    console.log(chalk.cyan(`\nAnalyzing: ${page.name}`));
    
    const { html, error } = await fetchPageContent(url);
    
    if (error) {
      console.log(chalk.red(`❌ Failed to fetch: ${error}`));
      continue;
    }
    
    const results = analyzeCTAs(html, page.name);
    allResults.push(results);
    
    // Display results for this page
    console.log(`  Total CTAs: ${results.totalButtons}`);
    console.log(`  Booking CTAs: ${results.bookingCTAs}`);
    console.log(`  Phone CTAs: ${results.phoneCTAs}`);
    console.log(`  Quote CTAs: ${results.quoteCTAs}`);
    console.log(`  Learn More CTAs: ${results.learnMoreCTAs}`);
    
    if (results.valeriePhone) {
      console.log(chalk.green(`  ✅ Valerie's phone number present`));
    } else {
      console.log(chalk.yellow(`  ⚠️  Valerie's phone number missing`));
    }
    
    if (results.oldPhone) {
      console.log(chalk.yellow(`  ⚠️  Old phone number still present`));
    }
    
    if (results.brokenLinks.length > 0) {
      console.log(chalk.red(`  ❌ Broken links: ${results.brokenLinks.length}`));
    }
  }
  
  // Summary
  console.log(chalk.blue.bold('\n📊 Summary'));
  console.log('─'.repeat(40));
  
  const totalCTAs = allResults.reduce((sum, r) => sum + r.totalButtons, 0);
  const totalBooking = allResults.reduce((sum, r) => sum + r.bookingCTAs, 0);
  const totalPhone = allResults.reduce((sum, r) => sum + r.phoneCTAs, 0);
  const totalQuote = allResults.reduce((sum, r) => sum + r.quoteCTAs, 0);
  const totalBroken = allResults.reduce((sum, r) => sum + r.brokenLinks.length, 0);
  const pagesWithValerie = allResults.filter(r => r.valeriePhone).length;
  const pagesWithOldPhone = allResults.filter(r => r.oldPhone).length;
  
  console.log(`Total CTAs across all pages: ${totalCTAs}`);
  console.log(`Booking CTAs: ${totalBooking}`);
  console.log(`Phone CTAs: ${totalPhone}`);
  console.log(`Quote CTAs: ${totalQuote}`);
  
  if (pagesWithValerie === pages.length) {
    console.log(chalk.green(`✅ Valerie's phone on all pages`));
  } else {
    console.log(chalk.yellow(`⚠️  Valerie's phone on ${pagesWithValerie}/${pages.length} pages`));
  }
  
  if (pagesWithOldPhone > 0) {
    console.log(chalk.yellow(`⚠️  Old phone number on ${pagesWithOldPhone} pages`));
  }
  
  if (totalBroken > 0) {
    console.log(chalk.red(`❌ Total broken links: ${totalBroken}`));
  }
  
  // Recommendations
  console.log(chalk.blue.bold('\n💡 Recommendations'));
  console.log('─'.repeat(40));
  
  if (totalBooking < pages.length * 2) {
    console.log('• Add more booking CTAs (at least 2 per page)');
  }
  
  if (pagesWithValerie < pages.length) {
    console.log('• Add Valerie\'s phone number (512-781-0527) to all pages');
  }
  
  if (pagesWithOldPhone > 0) {
    console.log('• Replace old phone number with Valerie\'s (512-781-0527)');
  }
  
  if (totalBroken > 0) {
    console.log('• Fix broken links and empty hrefs');
  }
  
  console.log(chalk.green('\n✅ Audit complete!'));
  console.log(chalk.cyan('Contact Valerie at (512) 781-0527 for any questions.'));
}

// Run the audit
runAudit().catch(console.error);