/**
 * Site Error Checker
 * Run this script to detect and report all site errors
 */

const fetch = require('node-fetch');
const chalk = require('chalk');

const BASE_URL = 'http://localhost:3000';

// Pages to check
const pages = [
  '/',
  '/about',
  '/services',
  '/pricing',
  '/booking',
  '/contact',
  '/gallery',
  '/faq',
  '/blog',
  '/testimonials',
  '/careers',
  '/areas/downtown-austin',
  '/areas/the-domain',
  '/towers/the-quincy',
  '/towers/70-rainey',
  '/towers/the-shore',
  '/terms',
  '/privacy'
];

// API endpoints to check
const apiEndpoints = [
  '/api/booking',
  '/api/contact',
  '/api/quote',
  '/api/health'
];

// Static assets to check
const staticAssets = [
  '/favicon.ico',
  '/images/tower-placeholder.jpg'
];

async function checkPage(url) {
  const startTime = Date.now();
  try {
    const response = await fetch(url);
    const loadTime = Date.now() - startTime;
    
    if (response.ok) {
      if (loadTime > 3000) {
        return { url, status: 'slow', loadTime, httpStatus: response.status };
      }
      return { url, status: 'ok', loadTime, httpStatus: response.status };
    } else {
      return { url, status: 'error', loadTime, httpStatus: response.status };
    }
  } catch (error) {
    return { url, status: 'failed', error: error.message };
  }
}

async function runChecks() {
  console.log(chalk.blue.bold('\n🔍 Aura Spring Cleaning - Site Error Check\n'));
  console.log(chalk.yellow('Primary Contact: Valerie - (512) 781-0527\n'));
  
  // Check if server is running
  try {
    await fetch(BASE_URL);
  } catch (error) {
    console.log(chalk.red('❌ Server is not running at ' + BASE_URL));
    console.log(chalk.yellow('Please run: npm run dev'));
    process.exit(1);
  }
  
  // Check pages
  console.log(chalk.cyan.bold('📄 Checking Pages...'));
  const pageResults = await Promise.all(pages.map(page => checkPage(BASE_URL + page)));
  
  let pageErrors = 0;
  let slowPages = 0;
  
  pageResults.forEach(result => {
    if (result.status === 'ok') {
      console.log(chalk.green(`✅ ${result.url} - OK (${result.loadTime}ms)`));
    } else if (result.status === 'slow') {
      console.log(chalk.yellow(`⚠️  ${result.url} - SLOW (${result.loadTime}ms)`));
      slowPages++;
    } else if (result.status === 'error') {
      console.log(chalk.red(`❌ ${result.url} - ERROR ${result.httpStatus}`));
      pageErrors++;
    } else {
      console.log(chalk.red(`❌ ${result.url} - FAILED: ${result.error}`));
      pageErrors++;
    }
  });
  
  // Check API endpoints
  console.log(chalk.cyan.bold('\n🔌 Checking API Endpoints...'));
  const apiResults = await Promise.all(apiEndpoints.map(endpoint => checkPage(BASE_URL + endpoint)));
  
  let apiErrors = 0;
  
  apiResults.forEach(result => {
    if (result.httpStatus === 200 || result.httpStatus === 405) {
      console.log(chalk.green(`✅ ${result.url} - Available`));
    } else if (result.httpStatus === 404) {
      console.log(chalk.yellow(`⚠️  ${result.url} - Not Implemented`));
    } else {
      console.log(chalk.red(`❌ ${result.url} - ERROR ${result.httpStatus}`));
      apiErrors++;
    }
  });
  
  // Check static assets
  console.log(chalk.cyan.bold('\n📦 Checking Static Assets...'));
  const assetResults = await Promise.all(staticAssets.map(asset => checkPage(BASE_URL + asset)));
  
  let assetErrors = 0;
  
  assetResults.forEach(result => {
    if (result.status === 'ok') {
      console.log(chalk.green(`✅ ${result.url} - OK`));
    } else {
      console.log(chalk.red(`❌ ${result.url} - ERROR ${result.httpStatus || result.error}`));
      assetErrors++;
    }
  });
  
  // Summary
  console.log(chalk.blue.bold('\n📊 Summary'));
  console.log('─'.repeat(40));
  
  const totalErrors = pageErrors + apiErrors + assetErrors;
  
  if (totalErrors === 0 && slowPages === 0) {
    console.log(chalk.green.bold('✅ All checks passed! Site is healthy.'));
  } else {
    if (pageErrors > 0) {
      console.log(chalk.red(`❌ Page Errors: ${pageErrors}`));
    }
    if (slowPages > 0) {
      console.log(chalk.yellow(`⚠️  Slow Pages: ${slowPages}`));
    }
    if (apiErrors > 0) {
      console.log(chalk.red(`❌ API Errors: ${apiErrors}`));
    }
    if (assetErrors > 0) {
      console.log(chalk.red(`❌ Asset Errors: ${assetErrors}`));
    }
  }
  
  console.log(chalk.cyan('\n📞 Contact Valerie at (512) 781-0527 for any issues.'));
}

// Run the checks
runChecks().catch(console.error);