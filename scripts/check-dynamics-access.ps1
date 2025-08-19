# Simple script to check Dynamics 365 access
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Checking Dynamics 365 Access" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$clientId = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"
$clientSecret = "$env:AURASPRING_CLIENT_SECRET"
$dynamicsUrl = "https://mortgagelcdefault.crm.dynamics.com"

Write-Host "Testing with AuraSpring-Master-Integration service principal..." -ForegroundColor Yellow
Write-Host ""

# Step 1: Get access token for Dynamics 365
Write-Host "Step 1: Getting access token..." -ForegroundColor Cyan
$tokenBody = @{
    grant_type    = "client_credentials"
    client_id     = $clientId
    client_secret = $clientSecret
    scope         = "$dynamicsUrl/.default"
}

try {
    $tokenResponse = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $tokenBody `
        -ContentType "application/x-www-form-urlencoded"
    
    Write-Host "✅ Successfully obtained access token" -ForegroundColor Green
    Write-Host ""
    
    # Step 2: Test Dynamics 365 API Access
    Write-Host "Step 2: Testing Dynamics 365 API access..." -ForegroundColor Cyan
    $headers = @{
        Authorization = "Bearer $($tokenResponse.access_token)"
        'OData-MaxVersion' = '4.0'
        'OData-Version' = '4.0'
        Accept = 'application/json'
    }
    
    try {
        $testResponse = Invoke-RestMethod -Method Get `
            -Uri "$dynamicsUrl/api/data/v9.2/contacts?`$top=1" `
            -Headers $headers
        
        Write-Host "✅ Successfully accessed Dynamics 365 API!" -ForegroundColor Green
        Write-Host "   You have proper permissions configured." -ForegroundColor White
        
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 403) {
            Write-Host "❌ Access Denied (403 Forbidden)" -ForegroundColor Red
            Write-Host ""
            Write-Host "SOLUTION NEEDED:" -ForegroundColor Yellow
            Write-Host "=================" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "The service principal can authenticate but needs permissions in Dynamics 365." -ForegroundColor White
            Write-Host ""
            Write-Host "To grant access:" -ForegroundColor Cyan
            Write-Host "1. Go to: https://mortgagelcdefault.crm.dynamics.com" -ForegroundColor White
            Write-Host "2. Navigate to: Settings → Security → Users" -ForegroundColor White
            Write-Host "3. Switch view to 'Application Users'" -ForegroundColor White
            Write-Host "4. Click 'New' → 'Application User'" -ForegroundColor White
            Write-Host "5. Enter these details:" -ForegroundColor White
            Write-Host "   - Application ID: 8b01f8e9-18d3-40d4-90c1-9777f6288bce" -ForegroundColor Green
            Write-Host "   - Full Name: AuraSpring-Master-Integration" -ForegroundColor Green
            Write-Host "   - Primary Email: auraspring@auraspringcleaning.com" -ForegroundColor Green
            Write-Host "6. Save the user" -ForegroundColor White
            Write-Host "7. Assign security role: 'System Administrator' or 'System Customizer'" -ForegroundColor White
            Write-Host ""
            Write-Host "Alternative method using Power Platform Admin:" -ForegroundColor Cyan
            Write-Host "1. Go to: https://admin.powerplatform.microsoft.com" -ForegroundColor White
            Write-Host "2. Select your environment" -ForegroundColor White
            Write-Host "3. Go to Settings → Users + permissions → Application users" -ForegroundColor White
            Write-Host "4. Add the service principal there" -ForegroundColor White
        } else {
            Write-Host "❌ Error accessing Dynamics API: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "❌ Failed to get access token: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")