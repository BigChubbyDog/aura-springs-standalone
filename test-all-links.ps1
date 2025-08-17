Write-Host "=== TESTING ALL WEBSITE LINKS ===" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"

# Define all links to test
$links = @(
    # Main Pages
    @{Name="Homepage"; Path="/"; Type="Page"},
    @{Name="About"; Path="/about"; Type="Page"},
    @{Name="Services"; Path="/services"; Type="Page"},
    @{Name="Pricing"; Path="/pricing"; Type="Page"},
    @{Name="Booking"; Path="/booking"; Type="Page"},
    @{Name="Contact"; Path="/contact"; Type="Page"},
    @{Name="Gallery"; Path="/gallery"; Type="Page"},
    @{Name="FAQ"; Path="/faq"; Type="Page"},
    @{Name="Blog"; Path="/blog"; Type="Page"},
    @{Name="Testimonials"; Path="/testimonials"; Type="Page"},
    @{Name="Careers"; Path="/careers"; Type="Page"},
    
    # Service Pages
    @{Name="House Cleaning"; Path="/services/house-cleaning"; Type="Service"},
    @{Name="Deep Cleaning"; Path="/services/deep-cleaning"; Type="Service"},
    @{Name="Standard Cleaning"; Path="/services/standard-cleaning"; Type="Service"},
    @{Name="Move In/Out"; Path="/services/move-in-out-cleaning"; Type="Service"},
    @{Name="Airbnb Cleaning"; Path="/services/airbnb-cleaning"; Type="Service"},
    @{Name="Commercial"; Path="/services/commercial-cleaning"; Type="Service"},
    
    # Area Pages
    @{Name="Downtown Austin"; Path="/areas/downtown-austin"; Type="Area"},
    @{Name="East Austin"; Path="/areas/east-austin"; Type="Area"},
    @{Name="Cedar Park"; Path="/areas/cedar-park"; Type="Area"},
    @{Name="The Domain"; Path="/areas/the-domain"; Type="Area"},
    
    # Tower Pages
    @{Name="The Quincy"; Path="/towers/the-quincy"; Type="Tower"},
    @{Name="70 Rainey"; Path="/towers/70-rainey"; Type="Tower"},
    @{Name="The Shore"; Path="/towers/the-shore"; Type="Tower"},
    
    # Legal Pages
    @{Name="Terms"; Path="/terms"; Type="Legal"},
    @{Name="Privacy"; Path="/privacy"; Type="Legal"}
)

$results = @{
    Working = 0
    Failed = 0
    Slow = 0
}

$failedLinks = @()
$slowLinks = @()

Write-Host "Testing $($links.Count) links..." -ForegroundColor Yellow
Write-Host ""

foreach ($link in $links) {
    Write-Host -NoNewline "Testing $($link.Name)... " -ForegroundColor White
    
    try {
        $startTime = Get-Date
        $response = Invoke-WebRequest -Uri "$baseUrl$($link.Path)" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $responseTime = ((Get-Date) - $startTime).TotalMilliseconds
        
        if ($response.StatusCode -eq 200) {
            if ($responseTime -gt 3000) {
                $time = [math]::Round($responseTime)
                Write-Host "[SLOW] ${time}ms" -ForegroundColor Yellow
                $results.Slow++
                $slowLinks += "$($link.Name) - $($link.Path) (${time}ms)"
            } 
            else {
                $time = [math]::Round($responseTime)
                Write-Host "[OK] ${time}ms" -ForegroundColor Green
                $results.Working++
            }
        }
    } 
    catch {
        Write-Host "[FAILED]" -ForegroundColor Red
        $results.Failed++
        $failedLinks += "$($link.Name) - $($link.Path)"
    }
}

Write-Host ""
Write-Host "=== TEST RESULTS ===" -ForegroundColor Cyan
Write-Host "Working: $($results.Working) links" -ForegroundColor Green
Write-Host "Slow: $($results.Slow) links" -ForegroundColor Yellow
if ($results.Failed -eq 0) {
    Write-Host "Failed: $($results.Failed) links" -ForegroundColor Green
}
else {
    Write-Host "Failed: $($results.Failed) links" -ForegroundColor Red
}

if ($failedLinks.Count -gt 0) {
    Write-Host ""
    Write-Host "Failed Links:" -ForegroundColor Red
    foreach ($link in $failedLinks) {
        Write-Host "  - $link" -ForegroundColor Red
    }
}

if ($slowLinks.Count -gt 0) {
    Write-Host ""
    Write-Host "Slow Links (>3 seconds):" -ForegroundColor Yellow
    foreach ($link in $slowLinks) {
        Write-Host "  - $link" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== RECOMMENDATIONS ===" -ForegroundColor Cyan
if ($results.Failed -eq 0) {
    Write-Host "All links are working properly!" -ForegroundColor Green
} 
else {
    Write-Host "Fix the failed links to improve user experience" -ForegroundColor Yellow
}

if ($results.Slow -gt 0) {
    Write-Host "Optimize slow-loading pages for better performance" -ForegroundColor Yellow
}