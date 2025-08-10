// Meta Pixel Diagnostic Script
// Run this in browser console to diagnose Meta Pixel issues

console.log('🔍 META PIXEL DIAGNOSTIC TOOL');
console.log('================================\n');

// 1. Check if fbq is loaded
console.log('1️⃣ Checking if Meta Pixel (fbq) is loaded...');
if (typeof window.fbq !== 'undefined') {
  console.log('✅ fbq is loaded and available');
  console.log('   Type:', typeof window.fbq);
  console.log('   Version:', window.fbq.version || 'Unknown');
} else {
  console.log('❌ fbq is NOT loaded - Meta Pixel script may be blocked');
}

// 2. Check for ad blockers
console.log('\n2️⃣ Checking for potential ad blockers...');
const testImg = new Image();
testImg.src = 'https://www.facebook.com/tr?id=test&ev=test&noscript=1';
testImg.onload = () => console.log('✅ Facebook domain is accessible');
testImg.onerror = () => console.log('⚠️ Facebook domain may be blocked by ad blocker or network');

// 3. Check dataLayer
console.log('\n3️⃣ Checking dataLayer (for GTM)...');
if (typeof window.dataLayer !== 'undefined') {
  console.log('✅ dataLayer exists');
  console.log('   Events count:', window.dataLayer.length);
} else {
  console.log('❌ dataLayer not found');
}

// 4. Check cookies
console.log('\n4️⃣ Checking Facebook cookies...');
const cookies = document.cookie;
const fbp = cookies.match(/_fbp=([^;]+)/);
const fbc = cookies.match(/_fbc=([^;]+)/);
console.log('   _fbp cookie:', fbp ? '✅ ' + fbp[1] : '❌ Not found');
console.log('   _fbc cookie:', fbc ? '✅ ' + fbc[1] : '❌ Not found (normal if no FB click)');

// 5. Test PageView event
console.log('\n5️⃣ Testing PageView event...');
if (typeof window.fbq !== 'undefined') {
  try {
    window.fbq('track', 'PageView');
    console.log('✅ PageView event sent successfully');
  } catch (error) {
    console.log('❌ Error sending PageView:', error.message);
  }
} else {
  console.log('⚠️ Cannot test - fbq not loaded');
}

// 6. Test custom event with data
console.log('\n6️⃣ Testing custom Lead event with data...');
if (typeof window.fbq !== 'undefined') {
  try {
    window.fbq('track', 'Lead', {
      content_category: 'Test',
      value: 100,
      currency: 'USD'
    });
    console.log('✅ Lead event sent with data');
  } catch (error) {
    console.log('❌ Error sending Lead event:', error.message);
  }
} else {
  console.log('⚠️ Cannot test - fbq not loaded');
}

// 7. Check network requests
console.log('\n7️⃣ Monitoring network requests to Facebook...');
console.log('   Open Network tab and filter by "facebook" to see requests');
console.log('   Look for requests to:');
console.log('   - connect.facebook.net/en_US/fbevents.js');
console.log('   - facebook.com/tr/');

// 8. Check Pixel ID
console.log('\n8️⃣ Checking Pixel ID configuration...');
console.log('   Expected Pixel ID: 753683467224168');
if (typeof window.fbq !== 'undefined' && window.fbq.getState) {
  try {
    const state = window.fbq.getState();
    console.log('   Initialized pixels:', state?.pixels || 'Unable to retrieve');
  } catch (e) {
    console.log('   Unable to get pixel state');
  }
}

// 9. Test Conversion API endpoint
console.log('\n9️⃣ Testing Conversion API endpoint...');
fetch('/api/meta-conversion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventName: 'Test',
    eventData: { test: true },
    userData: { email: 'test@example.com' },
    sourceUrl: window.location.href,
    userAgent: navigator.userAgent
  })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    console.log('✅ Conversion API endpoint working');
    console.log('   Events received:', data.events_received);
    console.log('   Trace ID:', data.fbtrace_id);
  } else {
    console.log('❌ Conversion API error:', data.error);
  }
})
.catch(err => console.log('❌ Network error calling Conversion API:', err.message));

// 10. Provide solutions
console.log('\n🔧 COMMON SOLUTIONS:');
console.log('================================');
console.log('1. Disable ad blockers and privacy extensions');
console.log('2. Check if domain is whitelisted in Facebook Events Manager');
console.log('3. Use Meta Pixel Helper Chrome extension');
console.log('4. Clear browser cache and cookies');
console.log('5. Try in Incognito/Private mode');
console.log('6. Verify Pixel ID matches: 753683467224168');
console.log('7. Check Test Events tab with code: TEST63150');
console.log('\n📚 Full documentation: https://developers.facebook.com/docs/meta-pixel');