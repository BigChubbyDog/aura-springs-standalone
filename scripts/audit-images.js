/**
 * Image Audit Script
 * Checks all images across the site for proper loading
 */

const fetch = require('node-fetch');
const chalk = require('chalk');

const BASE_URL = 'http://localhost:3000';

// Pages to check for images
const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/about', name: 'About' },
  { path: '/gallery', name: 'Gallery' },
  { path: '/areas/the-domain', name: 'The Domain' },
  { path: '/towers/the-quincy', name: 'The Quincy' },
];

// Track unique images across all pages
const allImages = new Set();
const brokenImages = new Set();
const externalImages = new Set();
const localImages = new Set();

async function checkImage(url) {
  try {
    // Skip data URLs
    if (url.startsWith('data:')) {
      return { status: 'ok', type: 'data' };
    }
    
    // Check if external or local
    const isExternal = url.startsWith('http://') || url.startsWith('https://');
    
    if (isExternal) {
      const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
      return { 
        status: response.ok ? 'ok' : 'broken', 
        type: 'external',
        httpStatus: response.status 
      };
    } else {
      // Local image - check relative to base URL
      const fullUrl = url.startsWith('/') ? BASE_URL + url : BASE_URL + '/' + url;
      const response = await fetch(fullUrl, { method: 'HEAD', timeout: 5000 });
      return { 
        status: response.ok ? 'ok' : 'broken', 
        type: 'local',
        httpStatus: response.status 
      };
    }
  } catch (error) {
    return { status: 'error', type: 'unknown', error: error.message };
  }
}

async function analyzePageImages(url, pageName) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(chalk.red(`❌ Failed to load page: ${pageName}`));
      return { error: true };
    }
    
    const html = await response.text();
    
    // Find all image sources
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    const srcRegex = /src=["']([^"']+)["']/gi;
    
    const images = [];
    let match;
    
    // Find img tags
    while ((match = imgRegex.exec(html)) !== null) {
      images.push(match[1]);
    }
    
    // Find any src attributes (catches Next/Image components too)
    html.replace(srcRegex, (full, src) => {
      if (!images.includes(src) && !src.includes('.js') && !src.includes('.css')) {
        images.push(src);
      }
      return full;
    });
    
    // Also check for background images in style attributes
    const bgRegex = /url\(["']?([^"')]+)["']?\)/gi;
    while ((match = bgRegex.exec(html)) !== null) {
      images.push(match[1]);
    }
    
    console.log(chalk.cyan(`\n📸 ${pageName}: Found ${images.length} images`));
    
    let pageOk = 0;
    let pageBroken = 0;
    let pageExternal = 0;
    let pageLocal = 0;
    
    // Check each unique image
    for (const img of images) {
      // Skip empty or invalid URLs
      if (!img || img === '#' || img === 'undefined' || img === 'null') {
        continue;
      }
      
      allImages.add(img);
      
      // Only check each image once per run
      if (!brokenImages.has(img)) {
        const result = await checkImage(img);
        
        if (result.status === 'ok') {
          pageOk++;
          if (result.type === 'external') {
            externalImages.add(img);
            pageExternal++;
          } else if (result.type === 'local') {
            localImages.add(img);
            pageLocal++;
          }
        } else {
          pageBroken++;
          brokenImages.add(img);
          console.log(chalk.red(`  ❌ Broken: ${img.substring(0, 60)}...`));
        }
      }
    }
    
    // Page summary
    if (pageBroken === 0) {
      console.log(chalk.green(`  ✅ All images loading (${pageOk} total)`));
    } else {
      console.log(chalk.yellow(`  ⚠️  ${pageBroken} broken images`));
    }
    
    console.log(`  📊 External: ${pageExternal}, Local: ${pageLocal}`);
    
    return {
      total: images.length,
      ok: pageOk,
      broken: pageBroken,
      external: pageExternal,
      local: pageLocal
    };
  } catch (error) {
    console.log(chalk.red(`❌ Error analyzing ${pageName}: ${error.message}`));
    return { error: true };
  }
}

async function runImageAudit() {
  console.log(chalk.blue.bold('\n🖼️  Aura Spring Cleaning - Image Audit\n'));
  console.log(chalk.yellow('Checking all images across the site...\n'));
  
  // Check if server is running
  try {
    await fetch(BASE_URL);
  } catch (error) {
    console.log(chalk.red('❌ Server is not running at ' + BASE_URL));
    console.log(chalk.yellow('Please run: npm run dev'));
    process.exit(1);
  }
  
  const results = [];
  
  // Analyze each page
  for (const page of pages) {
    const url = BASE_URL + page.path;
    const result = await analyzePageImages(url, page.name);
    results.push({ ...result, name: page.name });
  }
  
  // Overall summary
  console.log(chalk.blue.bold('\n📊 Overall Summary'));
  console.log('─'.repeat(40));
  
  console.log(`Total unique images: ${allImages.size}`);
  console.log(`External images (Unsplash/Pexels): ${externalImages.size}`);
  console.log(`Local images: ${localImages.size}`);
  
  if (brokenImages.size === 0) {
    console.log(chalk.green.bold('✅ All images loading successfully!'));
  } else {
    console.log(chalk.red(`❌ Broken images: ${brokenImages.size}`));
    console.log(chalk.yellow('\n⚠️  Broken Image URLs:'));
    brokenImages.forEach(img => {
      console.log(`  - ${img.substring(0, 80)}...`);
    });
  }
  
  // Recommendations
  console.log(chalk.blue.bold('\n💡 Recommendations'));
  console.log('─'.repeat(40));
  
  if (localImages.size < 5) {
    console.log('• Consider adding more local images for faster loading');
  }
  
  if (externalImages.size > 20) {
    console.log('• Consider downloading critical images locally');
  }
  
  if (brokenImages.size > 0) {
    console.log('• Fix or replace broken image URLs');
  }
  
  // Check for missing alt text
  console.log('\n📝 Alt Text Check');
  const response = await fetch(BASE_URL);
  const html = await response.text();
  const imgWithoutAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
  
  if (imgWithoutAlt > 0) {
    console.log(chalk.yellow(`⚠️  ${imgWithoutAlt} images missing alt text`));
  } else {
    console.log(chalk.green('✅ All images have alt text'));
  }
  
  console.log(chalk.cyan('\n✅ Image audit complete!'));
}

// Run the audit
runImageAudit().catch(console.error);