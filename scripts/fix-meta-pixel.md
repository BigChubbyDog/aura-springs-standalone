# Meta Pixel Fix Instructions

## 🚨 PROBLEM IDENTIFIED
Your Meta Conversion API access token is invalid (Error code 190: "Invalid OAuth access token").

## ✅ SOLUTION: Generate New Access Token

### Step 1: Go to Facebook Events Manager
1. Open: https://business.facebook.com/events_manager2
2. Select your pixel: **753683467224168**
3. Click "Settings" in the left menu
4. Scroll to "Conversions API" section

### Step 2: Generate New Access Token
1. Click "Generate access token" 
2. Select these permissions (IMPORTANT):
   - ✅ ads_management
   - ✅ ads_read  
   - ✅ business_management
3. Click "Generate Token"
4. Copy the entire token (starts with "EAAN...")

### Step 3: Update Your .env.local File
Replace the old token in `.env.local`:

```env
# Old (INVALID):
META_CONVERSION_ACCESS_TOKEN=EAANRdWAWb4wBPDIVQu9ZCyIneGGznzHCuAkEbwrRbMm6t2erySxUheumcpbVoh8xd9lGN0fL5Otqfbi0ZAUk4rlsSafEaTL9e9dwW4EuglBBGE8r1aQqweOY9ZA00qT0C4kEuZCgmcYpQN3PibdsDXCvYGgZCUGIgi7tGZBRgVjWmrZBzD7bN360fsDR0fgAgZDZD

# New (paste your new token):
META_CONVERSION_ACCESS_TOKEN=YOUR_NEW_TOKEN_HERE
```

### Step 4: Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Start again:
npm run dev
```

### Step 5: Test the Fix
1. Open: https://agreeable-wave-03b0a1110.1.azurestaticapps.net/test-meta-pixel
2. Click "Run All Tests"
3. Check Facebook Events Manager → Test Events tab
4. You should see events appearing!

---

## 🔍 What Was Wrong?

The access token you provided has expired or doesn't have the correct permissions. Facebook access tokens for Conversion API need:
1. **System User Token** (not regular user token)
2. **Correct Permissions** (ads_management, ads_read, business_management)
3. **To be regenerated** if they expire

---

## 📝 Browser-Side Pixel Status

✅ **Good News**: Your browser-side Meta Pixel IS working!
- Pixel ID 753683467224168 is correctly installed
- It's firing PageView events
- The fbq function is loaded

❌ **Issue**: Only the server-side Conversion API is failing due to invalid token

---

## 🚀 Quick Test Commands

After updating the token, test with:

```bash
# Test the API endpoint directly
curl -X POST "http://localhost:3000/api/meta-conversion" \
  -H "Content-Type: application/json" \
  -d '{"eventName":"Test","eventData":{"value":100},"userData":{"email":"test@test.com"}}'
```

---

## 🆘 Alternative: Use Browser-Only Tracking

If you can't get a new token immediately, the browser pixel alone still works for:
- PageView tracking ✅
- Basic conversion tracking ✅  
- Custom events ✅
- Retargeting audiences ✅

Just won't have:
- iOS 14.5+ tracking enhancement
- Server-side deduplication
- Enhanced match rates

---

## Need Help?

The specific error "Invalid OAuth access token - Cannot parse access token" means Facebook can't read your token at all. This usually means:
1. Token has extra spaces or line breaks
2. Token is expired
3. Token is for wrong app/pixel
4. Token doesn't have required permissions

Generate a fresh token following the steps above to fix it!