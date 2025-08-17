# Test Aura Spring Cleaning Site Functionality
Write-Host "Testing Aura Spring Cleaning Website..." -ForegroundColor Green
Write-Host ""

# Wait for server to be ready
Write-Host "Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Test Homepage
Write-Host "`n[1] Testing Homepage..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Homepage loads successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Homepage failed to load: $_" -ForegroundColor Red
}

# Test API Endpoints
Write-Host "`n[2] Testing API Endpoints..." -ForegroundColor Cyan

$endpoints = @(
    @{Name="Booking API"; Url="http://localhost:3000/api/booking"; Method="POST"},
    @{Name="Contact API"; Url="http://localhost:3000/api/contact"; Method="POST"},
    @{Name="Quote API"; Url="http://localhost:3000/api/quote"; Method="POST"},
    @{Name="Email Capture API"; Url="http://localhost:3000/api/email-capture"; Method="POST"}
)

foreach ($endpoint in $endpoints) {
    try {
        $body = @{
            test = $true
            email = "test@example.com"
            name = "Test User"
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $endpoint.Url -Method $endpoint.Method -Body $body -ContentType "application/json" -ErrorAction SilentlyContinue
        Write-Host "✓ $($endpoint.Name) is responding" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode -eq 400 -or $_.Exception.Response.StatusCode -eq 405) {
            Write-Host "⚠ $($endpoint.Name) is working but needs proper data" -ForegroundColor Yellow
        } else {
            Write-Host "✗ $($endpoint.Name) failed: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Test Important Pages
Write-Host "`n[3] Testing Key Pages..." -ForegroundColor Cyan

$pages = @(
    "/booking",
    "/services",
    "/about",
    "/pricing",
    "/areas/downtown-austin",
    "/services/house-cleaning"
)

foreach ($page in $pages) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000$page" -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ $page loads successfully" -ForegroundColor Green
        }
    } catch {
        Write-Host "✗ $page failed to load" -ForegroundColor Red
    }
}

# Check for JavaScript errors
Write-Host "`n[4] Checking for Console Errors..." -ForegroundColor Cyan
Write-Host "Open http://localhost:3000 in browser and check Console (F12)" -ForegroundColor Yellow
Write-Host "Look for:" -ForegroundColor White
Write-Host "  - No red error messages" -ForegroundColor White
Write-Host "  - No 'localStorage is not defined' errors" -ForegroundColor White
Write-Host "  - No 404 errors for resources" -ForegroundColor White

# Summary
Write-Host "`n=== TEST SUMMARY ===" -ForegroundColor Green
Write-Host "1. Server is running at: http://localhost:3000" -ForegroundColor White
Write-Host "2. Open browser and check for visual issues" -ForegroundColor White
Write-Host "3. Test booking form functionality" -ForegroundColor White
Write-Host "4. Check mobile responsiveness (F12 > Device Mode)" -ForegroundColor White
Write-Host ""
Write-Host "Press Enter to open the website..." -ForegroundColor Yellow
Read-Host
Start-Process "http://localhost:3000"