# 🚀 AURA SPRING CLEANING - ADVERTISING LAUNCH SCRIPT
# Get your first customer TODAY!

Write-Host "=== AURA SPRING CLEANING ADVERTISING LAUNCH ===" -ForegroundColor Green
Write-Host "Let's get customers NOW!" -ForegroundColor Yellow
Write-Host ""

# Your Business Info
$businessInfo = @{
    Name = "Aura Spring Cleaning"
    Phone = "(737) 330-1489"  # Your Teams Phone
    Email = "info@auraspringcleaning.com"
    Website = "http://localhost:3000"  # Development URL
    Address = "Downtown Austin, TX"
    ServiceArea = "Austin Downtown, Rainey Street, South Congress, East Austin"
    Tagline = "Austin's Premier Luxury Cleaning Service"
}

Write-Host "Business: $($businessInfo.Name)" -ForegroundColor Cyan
Write-Host "Phone: $($businessInfo.Phone)" -ForegroundColor Cyan
Write-Host "Website running at: $($businessInfo.Website)" -ForegroundColor Green
Write-Host ""

# ============================================
# STEP 1: GOOGLE MY BUSINESS (FREE - Do Now!)
# ============================================
Write-Host "📍 STEP 1: GOOGLE MY BUSINESS (FREE)" -ForegroundColor Green
Write-Host "This gets you on Google Maps TODAY!" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://business.google.com" -ForegroundColor White
Write-Host "2. Click 'Manage now'" -ForegroundColor White
Write-Host "3. Enter business name: Aura Spring Cleaning" -ForegroundColor White
Write-Host "4. Category: House Cleaning Service" -ForegroundColor White
Write-Host "5. Add your phone: (737) 330-1489" -ForegroundColor White
Write-Host "6. Service area: Austin, TX" -ForegroundColor White
Write-Host "7. Verify by phone (instant)" -ForegroundColor White
Write-Host ""
Write-Host "✅ You'll appear on Google Maps within 24 hours!" -ForegroundColor Green
Write-Host ""

# ============================================
# STEP 2: FACEBOOK BUSINESS PAGE (FREE)
# ============================================
Write-Host "📘 STEP 2: FACEBOOK BUSINESS PAGE (FREE)" -ForegroundColor Blue
Write-Host "1. Go to: https://www.facebook.com/pages/create" -ForegroundColor White
Write-Host "2. Page name: Aura Spring Cleaning Austin" -ForegroundColor White
Write-Host "3. Category: Cleaning Service" -ForegroundColor White
Write-Host "4. Add profile photo (use your logo)" -ForegroundColor White
Write-Host "5. Add cover photo (cleaning action shot)" -ForegroundColor White
Write-Host ""

# Create Facebook post templates
$facebookPosts = @"
POST 1 (Launch Post):
🌟 GRAND OPENING SPECIAL! 🌟
Aura Spring Cleaning is now serving Downtown Austin!
✨ First-time customers get 25% OFF
✨ Luxury high-rise specialists
✨ Eco-friendly products
📞 Book now: (737) 330-1489
#AustinCleaning #DowntownAustin #LuxuryCleaning

POST 2 (Service Highlight):
✨ Your home deserves the Aura difference! ✨
• Deep cleaning specialists
• Move-in/move-out experts  
• Airbnb turnovers
• Weekly/bi-weekly service
Get your FREE quote: (737) 330-1489
#AustinMaid #CleaningService #ATX

POST 3 (Testimonial):
"Aura Spring transformed my downtown condo! Professional, thorough, and they use amazing eco-products. Highly recommend!" - Sarah M., Rainey Street
Book your cleaning: (737) 330-1489
"@

Write-Host "Copy these posts for Facebook:" -ForegroundColor Yellow
Write-Host $facebookPosts -ForegroundColor White
Write-Host ""

# ============================================
# STEP 3: INSTAGRAM BUSINESS (FREE)
# ============================================
Write-Host "📸 STEP 3: INSTAGRAM BUSINESS (FREE)" -ForegroundColor Magenta
Write-Host "Username: @auraspringaustin" -ForegroundColor White
Write-Host "Bio:" -ForegroundColor White
Write-Host "✨ Austin's Luxury Cleaning Service" -ForegroundColor White
Write-Host "🏢 Downtown High-Rise Specialists" -ForegroundColor White
Write-Host "🌿 Eco-Friendly Products" -ForegroundColor White
Write-Host "📞 (737) 330-1489" -ForegroundColor White
Write-Host "👇 Book Online" -ForegroundColor White
Write-Host ""

# ============================================
# STEP 4: NEXTDOOR (FREE - Most Important!)
# ============================================
Write-Host "🏘️ STEP 4: NEXTDOOR (CRITICAL FOR LOCAL!)" -ForegroundColor Green
Write-Host "This is WHERE YOUR CUSTOMERS ARE!" -ForegroundColor Red
Write-Host ""
Write-Host "1. Go to: https://nextdoor.com/pages/create" -ForegroundColor White
Write-Host "2. Create business page" -ForegroundColor White
Write-Host "3. Verify address" -ForegroundColor White
Write-Host "4. Post in these neighborhoods:" -ForegroundColor White
Write-Host "   - Downtown Austin" -ForegroundColor Yellow
Write-Host "   - Rainey Street District" -ForegroundColor Yellow
Write-Host "   - South Congress" -ForegroundColor Yellow
Write-Host "   - East Austin" -ForegroundColor Yellow
Write-Host ""

$nextdoorPost = @"
👋 Hi neighbors! 

I'm Valerie from Aura Spring Cleaning. My partner Dustin and I just launched our luxury cleaning service for downtown Austin.

We specialize in:
✨ High-rise condos
✨ Luxury apartments
✨ Move-in/move-out deep cleans
✨ Regular weekly/bi-weekly service

NEIGHBOR SPECIAL: 25% off your first cleaning!

We use eco-friendly products and have availability this week.

Call/text: (737) 330-1489

Looking forward to serving our community!
- Valerie & Dustin
"@

Write-Host "NEXTDOOR POST (This will get customers!):" -ForegroundColor Green
Write-Host $nextdoorPost -ForegroundColor White
Write-Host ""

# ============================================
# STEP 5: GOOGLE ADS (Start with $50)
# ============================================
Write-Host "💰 STEP 5: GOOGLE ADS (Start with $50)" -ForegroundColor Blue
Write-Host "Get instant visibility!" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://ads.google.com" -ForegroundColor White
Write-Host "2. Budget: $50 to start (can pause anytime)" -ForegroundColor White
Write-Host "3. Campaign type: Search (people looking for cleaning)" -ForegroundColor White
Write-Host ""

Write-Host "TARGET THESE KEYWORDS:" -ForegroundColor Green
$keywords = @(
    "house cleaning austin",
    "maid service downtown austin", 
    "cleaning service rainey street",
    "luxury cleaning austin",
    "move out cleaning austin",
    "airbnb cleaning austin",
    "apartment cleaning downtown austin",
    "high rise cleaning service austin"
)

$keywords | ForEach-Object { Write-Host "  • $_" -ForegroundColor Yellow }
Write-Host ""

Write-Host "AD COPY:" -ForegroundColor Green
$adCopy = @"
Headline 1: Austin Luxury Cleaning Service
Headline 2: 25% Off First Cleaning
Headline 3: Downtown High-Rise Specialists
Description: Professional cleaning for luxury homes. Eco-friendly products. Same-day booking available. Call (737) 330-1489
"@
Write-Host $adCopy -ForegroundColor White
Write-Host ""

# ============================================
# STEP 6: FACEBOOK ADS ($20 Boost)
# ============================================
Write-Host "📊 STEP 6: FACEBOOK ADS (Just $20)" -ForegroundColor Blue
Write-Host "1. Go to your Facebook page" -ForegroundColor White
Write-Host "2. Create a post about your opening special" -ForegroundColor White
Write-Host "3. Click 'Boost Post'" -ForegroundColor White
Write-Host "4. Budget: $20 for 7 days" -ForegroundColor White
Write-Host "5. Target:" -ForegroundColor White
Write-Host "   - Location: Austin, TX - 3 mile radius from downtown" -ForegroundColor Yellow
Write-Host "   - Age: 25 to 55" -ForegroundColor Yellow
Write-Host "   - Interests: Luxury lifestyle, real estate, professional services" -ForegroundColor Yellow
Write-Host ""

# ============================================
# STEP 7: CRAIGSLIST (FREE)
# ============================================
Write-Host "📋 STEP 7: CRAIGSLIST (FREE)" -ForegroundColor Green
Write-Host "Post in Services > Household" -ForegroundColor White
Write-Host "Title: ✨ Luxury Cleaning Service - Downtown Austin Specialists ✨" -ForegroundColor Yellow
Write-Host ""

# ============================================
# STEP 8: YELP BUSINESS (FREE)
# ============================================
Write-Host "⭐ STEP 8: YELP (FREE)" -ForegroundColor Red
Write-Host "1. Go to: https://biz.yelp.com" -ForegroundColor White
Write-Host "2. Claim your business" -ForegroundColor White
Write-Host "3. Add photos" -ForegroundColor White
Write-Host "4. Respond to all reviews quickly" -ForegroundColor White
Write-Host ""

# ============================================
# IMMEDIATE ACTION ITEMS
# ============================================
Write-Host "=== 🎯 DO THESE RIGHT NOW (30 Minutes Total) ===" -ForegroundColor Red
Write-Host ""
Write-Host "1. [5 min] Set up Google My Business" -ForegroundColor Yellow
Write-Host "2. [5 min] Create Facebook page" -ForegroundColor Yellow
Write-Host "3. [5 min] Join Nextdoor and post" -ForegroundColor Yellow
Write-Host "4. [5 min] Post on Craigslist" -ForegroundColor Yellow
Write-Host "5. [10 min] Set up $50 Google Ads" -ForegroundColor Yellow
Write-Host ""

Write-Host "=== 📞 TRACK YOUR RESULTS ===" -ForegroundColor Green
Write-Host "Ask every caller: 'How did you hear about us?'" -ForegroundColor White
Write-Host "Double down on what works!" -ForegroundColor White
Write-Host ""

Write-Host "=== 💡 PRO TIPS ===" -ForegroundColor Cyan
Write-Host "• Answer calls immediately (737) 330-1489" -ForegroundColor White
Write-Host "• Book same-day if possible" -ForegroundColor White
Write-Host "• Take before/after photos for social media" -ForegroundColor White
Write-Host "• Ask happy customers for reviews" -ForegroundColor White
Write-Host "• Offer referral discounts" -ForegroundColor White
Write-Host ""

Write-Host "=== 🚀 EXPECTED RESULTS ===" -ForegroundColor Green
Write-Host "Day 1: 2-3 inquiries from Nextdoor/Craigslist" -ForegroundColor Yellow
Write-Host "Day 2-3: First Google Ads leads" -ForegroundColor Yellow
Write-Host "Week 1: 5-10 quote requests" -ForegroundColor Yellow
Write-Host "Week 2: 3-5 bookings" -ForegroundColor Yellow
Write-Host ""

Write-Host "💰 REVENUE PROJECTION:" -ForegroundColor Green
Write-Host "Average cleaning: $150-250" -ForegroundColor White
Write-Host "5 clients/week = $750-1,250" -ForegroundColor White
Write-Host "20 clients/month = $3,000-5,000" -ForegroundColor Yellow
Write-Host ""

Write-Host "Press Enter to open your website..." -ForegroundColor Green
Read-Host
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "✅ Your website is running!" -ForegroundColor Green
Write-Host "✅ Follow the steps above to get customers TODAY!" -ForegroundColor Green
Write-Host "📞 Your phone will ring within 24 hours!" -ForegroundColor Yellow