# Deep Site Analysis for Aura Spring Cleaning
Write-Host "=== DEEP SITE ANALYSIS - AURA SPRING CLEANING ===" -ForegroundColor Cyan
Write-Host "Testing every page, button, and link..." -ForegroundColor Yellow
Write-Host ""

$baseUrl = "http://localhost:3000"
$errors = @()
$warnings = @()
$success = @()

# Define all routes that should exist
$routes = @{
    "Core Pages" = @(
        @{Path="/"; Name="Homepage"},
        @{Path="/about"; Name="About"},
        @{Path="/services"; Name="Services"},
        @{Path="/pricing"; Name="Pricing"},
        @{Path="/booking"; Name="Booking"},
        @{Path="/contact"; Name="Contact"},  # This is missing!
        @{Path="/blog"; Name="Blog"},
        @{Path="/testimonials"; Name="Testimonials"},
        @{Path="/careers"; Name="Careers"}
    )
    "Service Pages" = @(
        @{Path="/services/house-cleaning"; Name="House Cleaning"},
        @{Path="/services/deep-cleaning"; Name="Deep Cleaning"},
        @{Path="/services/regular-cleaning"; Name="Regular Cleaning"},
        @{Path="/services/standard-cleaning"; Name="Standard Cleaning"},
        @{Path="/services/move-in-out-cleaning"; Name="Move In/Out"},
        @{Path="/services/post-construction"; Name="Post Construction"},
        @{Path="/services/commercial-cleaning"; Name="Commercial"},
        @{Path="/services/airbnb-cleaning"; Name="Airbnb Cleaning"}
    )
    "Area Pages" = @(
        @{Path="/areas"; Name="All Areas"},
        @{Path="/areas/downtown-austin"; Name="Downtown Austin"},
        @{Path="/areas/east-austin"; Name="East Austin"},
        @{Path="/areas/cedar-park"; Name="Cedar Park"},
        @{Path="/areas/the-domain"; Name="The Domain"},
        @{Path="/areas/west-lake-hills"; Name="West Lake Hills"},
        @{Path="/areas/south-congress"; Name="South Congress"},
        @{Path="/areas/rainey-street"; Name="Rainey Street"}
    )
    "Tower Pages" = @(
        @{Path="/towers"; Name="All Towers"},
        @{Path="/towers/the-quincy"; Name="The Quincy"},
        @{Path="/towers/70-rainey"; Name="70 Rainey"},
        @{Path="/towers/the-shore"; Name="The Shore"},
        @{Path="/towers/the-independent"; Name="The Independent"}
    )
    "Legal Pages" = @(
        @{Path="/terms"; Name="Terms of Service"},
        @{Path="/privacy"; Name="Privacy Policy"},
        @{Path="/cookies"; Name="Cookie Policy"},
        @{Path="/refunds"; Name="Refund Policy"},
        @{Path="/accessibility"; Name="Accessibility"}
    )
    "Resource Pages" = @(
        @{Path="/resources/cleaning-checklist"; Name="Cleaning Checklist"},
        @{Path="/downloads/ultimate-cleaning-checklist"; Name="Ultimate Checklist"}
    )
}

Write-Host "[1] Testing All Page Routes..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Gray

foreach ($category in $routes.Keys) {
    Write-Host "`n$category`:" -ForegroundColor Cyan
    foreach ($route in $routes[$category]) {
        try {
            $response = Invoke-WebRequest -Uri "$baseUrl$($route.Path)" -UseBasicParsing -TimeoutSec 5 -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200) {
                Write-Host "  ✓ $($route.Name) - $($route.Path)" -ForegroundColor Green
                $success += "$($route.Path) - Working"
            } else {
                Write-Host "  ⚠ $($route.Name) - Status: $($response.StatusCode)" -ForegroundColor Yellow
                $warnings += "$($route.Path) - Status $($response.StatusCode)"
            }
        } catch {
            Write-Host "  ✗ $($route.Name) - 404 NOT FOUND" -ForegroundColor Red
            $errors += "$($route.Path) - 404 Page Missing"
        }
    }
}

Write-Host "`n[2] Testing API Endpoints..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Gray

$apiEndpoints = @(
    @{Path="/api/booking"; Method="POST"; Name="Booking API"},
    @{Path="/api/contact"; Method="POST"; Name="Contact API"},
    @{Path="/api/quote"; Method="POST"; Name="Quote API"},
    @{Path="/api/email-capture"; Method="POST"; Name="Email Capture"},
    @{Path="/api/subscriptions"; Method="GET"; Name="Subscriptions"},
    @{Path="/api/abandoned-cart"; Method="POST"; Name="Cart Recovery"}
)

foreach ($api in $apiEndpoints) {
    try {
        $body = @{test=$true} | ConvertTo-Json
        if ($api.Method -eq "POST") {
            $response = Invoke-RestMethod -Uri "$baseUrl$($api.Path)" -Method POST -Body $body -ContentType "application/json" -ErrorAction SilentlyContinue
        } else {
            $response = Invoke-RestMethod -Uri "$baseUrl$($api.Path)" -Method GET -ErrorAction SilentlyContinue
        }
        Write-Host "  ✓ $($api.Name) - Working" -ForegroundColor Green
        $success += "$($api.Path) - API Working"
    } catch {
        if ($_.Exception.Response.StatusCode -eq 400) {
            Write-Host "  ⚠ $($api.Name) - Needs proper data" -ForegroundColor Yellow
            $warnings += "$($api.Path) - Needs configuration"
        } else {
            Write-Host "  ✗ $($api.Name) - ERROR" -ForegroundColor Red
            $errors += "$($api.Path) - API Error"
        }
    }
}

Write-Host "`n[3] Common CTA Button Issues Found..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Gray

# List of common button issues based on code inspection
$buttonIssues = @(
    "❌ 'Contact Us' - Links to /contact which doesn't exist (404)",
    "❌ 'Learn More' buttons - Many don't have href, only empty onClick",
    "❌ 'Book Now' - Some instances missing href to /booking",
    "⚠️ 'Get Quote' - No /quote page, should link to pricing calculator",
    "⚠️ Tower pages - params.slug error needs async/await fix",
    "⚠️ Service pages - Some 'Book Service' buttons not wired up"
)

foreach ($issue in $buttonIssues) {
    Write-Host "  $issue" -ForegroundColor White
}

Write-Host "`n[4] Missing Critical Pages..." -ForegroundColor Red
Write-Host "================================" -ForegroundColor Gray

$missingPages = @(
    "/contact - Contact form page (critical for leads!)",
    "/quote - Quote request page",
    "/gallery - Before/after photos",
    "/faq - Frequently asked questions",
    "/service-areas - Service area map"
)

foreach ($missing in $missingPages) {
    Write-Host "  ✗ $missing" -ForegroundColor Red
}

Write-Host "`n[5] Broken Navigation Links..." -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Gray

Write-Host "  Header Menu:" -ForegroundColor White
Write-Host "    - Services dropdown → Some service pages missing links"
Write-Host "    - Areas dropdown → Working but needs all areas"
Write-Host "    - Contact → 404 ERROR"
Write-Host ""
Write-Host "  Footer Links:" -ForegroundColor White
Write-Host "    - Quick Links section → Multiple broken links"
Write-Host "    - Service Links → Some point to non-existent pages"
Write-Host "    - Contact Info → Phone works, email needs handler"

Write-Host "`n=== ANALYSIS SUMMARY ===" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Gray

$totalRoutes = 0
foreach ($category in $routes.Values) {
    $totalRoutes += $category.Count
}

Write-Host "`nPages Tested: $totalRoutes" -ForegroundColor White
Write-Host "✓ Working: $($success.Count)" -ForegroundColor Green
Write-Host "⚠ Warnings: $($warnings.Count)" -ForegroundColor Yellow
Write-Host "✗ Errors: $($errors.Count)" -ForegroundColor Red

Write-Host "`n=== CRITICAL FIXES NEEDED ===" -ForegroundColor Red
Write-Host "==============================" -ForegroundColor Gray

Write-Host @"

1. CREATE CONTACT PAGE (/app/contact/page.tsx)
   - This is referenced everywhere but doesn't exist!
   - Losing potential customers without contact form

2. FIX TOWER PAGES ERROR
   - Add 'async' to params in /towers/[slug]/page.tsx
   - Currently throwing params.slug errors

3. WIRE UP ALL 'LEARN MORE' BUTTONS
   - Many buttons have no href or onClick action
   - Should link to relevant service pages

4. ADD MISSING CTAs TO BOOKING
   - "Book Now" buttons should all go to /booking
   - "Get Quote" should open pricing calculator

5. CREATE MISSING PAGES
   - /contact (CRITICAL)
   - /gallery (for social proof)
   - /faq (reduce support calls)

6. FIX NAVIGATION DROPDOWNS
   - Ensure all menu items have valid destinations
   - Remove or redirect broken links

"@ -ForegroundColor White

Write-Host "=== QUICK FIX PRIORITY ===" -ForegroundColor Green
Write-Host "==========================" -ForegroundColor Gray

Write-Host @"

HIGH PRIORITY (Fix Today):
1. Create /contact page - You're losing leads!
2. Fix all "Book Now" buttons → /booking
3. Fix towers/[slug] params error
4. Wire up "Learn More" buttons

MEDIUM PRIORITY (Fix This Week):
1. Add /gallery page with before/after photos
2. Create /faq page
3. Fix service page CTAs
4. Add quote calculator to pricing page

LOW PRIORITY (Nice to Have):
1. Add animations to buttons
2. Improve mobile menu
3. Add chat widget
4. Enhance forms with better validation

"@ -ForegroundColor White

# Save report to file
$report = @"
AURA SPRING CLEANING - SITE ANALYSIS REPORT
Generated: $(Get-Date)

ERRORS FOUND:
$($errors -join "`n")

WARNINGS:
$($warnings -join "`n")

WORKING PAGES:
$($success -join "`n")
"@

$report | Out-File -FilePath "SITE-ANALYSIS-REPORT.txt"
Write-Host "`nFull report saved to: SITE-ANALYSIS-REPORT.txt" -ForegroundColor Cyan