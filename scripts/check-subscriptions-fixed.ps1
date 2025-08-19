# Check Microsoft 365 Subscriptions and Licenses
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Checking Your Microsoft Subscriptions" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$clientId = "94d3924d-79c4-4280-975d-8223752343b8"
$clientSecret = $env:AZURE_CLIENT_SECRET # Get from environment variable

# Get access token for Graph API
$tokenBody = @{
    grant_type    = "client_credentials"
    client_id     = $clientId
    client_secret = $clientSecret
    scope         = "https://graph.microsoft.com/.default"
}

try {
    Write-Host "Getting access token..." -ForegroundColor Yellow
    $tokenResponse = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $tokenBody `
        -ContentType "application/x-www-form-urlencoded"
    
    $token = $tokenResponse.access_token
    $headers = @{
        Authorization = "Bearer $token"
        'Content-Type' = 'application/json'
    }
    
    Write-Host "✅ Connected to Microsoft Graph" -ForegroundColor Green
    Write-Host ""
    
    # 1. Get Organization Details
    Write-Host "ORGANIZATION DETAILS:" -ForegroundColor Cyan
    try {
        $org = Invoke-RestMethod -Method Get `
            -Uri "https://graph.microsoft.com/v1.0/organization" `
            -Headers $headers
        
        if ($org.value) {
            $orgDetails = $org.value[0]
            Write-Host "  Tenant Name: $($orgDetails.displayName)" -ForegroundColor White
            $domains = $orgDetails.verifiedDomains | Where-Object { $_.isDefault }
            if ($domains) {
                Write-Host "  Domain: $($domains[0].name)" -ForegroundColor White
            }
            Write-Host "  Tenant ID: $($orgDetails.id)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  Could not retrieve organization details" -ForegroundColor Gray
    }
    
    # 2. Get Subscribed SKUs (Licenses)
    Write-Host ""
    Write-Host "ACTIVE SUBSCRIPTIONS & LICENSES:" -ForegroundColor Cyan
    try {
        $skus = Invoke-RestMethod -Method Get `
            -Uri "https://graph.microsoft.com/v1.0/subscribedSkus" `
            -Headers $headers
        
        if ($skus.value) {
            $dynamicsFound = $false
            $powerPlatformFound = $false
            
            foreach ($sku in $skus.value) {
                $productName = $sku.skuPartNumber
                $available = $sku.prepaidUnits.enabled
                $consumed = $sku.consumedUnits
                
                # Highlight important products
                $color = "White"
                if ($productName -like "*DYNAMICS*" -or $productName -like "*D365*" -or $productName -like "*CRM*") {
                    $color = "Green"
                    $dynamicsFound = $true
                    Write-Host "  🎯 $productName" -ForegroundColor $color
                } elseif ($productName -like "*POWER*") {
                    $color = "Yellow"
                    $powerPlatformFound = $true
                    Write-Host "  ⚡ $productName" -ForegroundColor $color
                } elseif ($productName -like "*O365*" -or $productName -like "*OFFICE*" -or $productName -like "*M365*") {
                    Write-Host "  📧 $productName" -ForegroundColor $color
                } else {
                    Write-Host "  • $productName" -ForegroundColor $color
                }
                
                Write-Host "     Licenses: $consumed used of $available available" -ForegroundColor Gray
                
                # Show service plans for Dynamics products
                if ($productName -like "*DYNAMICS*" -or $productName -like "*D365*") {
                    Write-Host "     Services included:" -ForegroundColor Cyan
                    foreach ($plan in $sku.servicePlans) {
                        if ($plan.provisioningStatus -eq "Success") {
                            Write-Host "       ✓ $($plan.servicePlanName)" -ForegroundColor Gray
                        }
                    }
                }
            }
            
            Write-Host ""
            if ($dynamicsFound) {
                Write-Host "✅ DYNAMICS 365 LICENSES FOUND!" -ForegroundColor Green
                Write-Host "   You have Dynamics 365 in your tenant" -ForegroundColor White
            } else {
                Write-Host "⚠️ No Dynamics 365 licenses found" -ForegroundColor Yellow
                Write-Host "   But you may have access through Power Platform" -ForegroundColor Gray
            }
            
            if ($powerPlatformFound) {
                Write-Host "✅ POWER PLATFORM LICENSES FOUND!" -ForegroundColor Green
                Write-Host "   You can use Power Apps, Power Automate, and Dataverse" -ForegroundColor White
            }
        } else {
            Write-Host "  No subscriptions found" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  Error retrieving subscriptions: $_" -ForegroundColor Red
    }
    
} catch {
    Write-Host "Error connecting to Graph API: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "FINDING YOUR DYNAMICS 365 URL:" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Since you have Dynamics 365, here's how to find your URL:" -ForegroundColor White
Write-Host ""
Write-Host "Option 1: Power Apps" -ForegroundColor Cyan
Write-Host "1. Go to: https://make.powerapps.com" -ForegroundColor White
Write-Host "2. Sign in with admin@adminaccountbcd.onmicrosoft.com" -ForegroundColor White
Write-Host "3. Look at top-right corner for environment name" -ForegroundColor White
Write-Host "4. Click Settings (gear) → Session details" -ForegroundColor White
Write-Host "5. Find 'Instance URL'" -ForegroundColor White
Write-Host ""
Write-Host "Option 2: Dynamics 365 Home" -ForegroundColor Cyan
Write-Host "1. Go to: https://home.dynamics.com" -ForegroundColor White
Write-Host "2. Sign in and click any Dynamics app" -ForegroundColor White
Write-Host "3. Check the browser URL once it loads" -ForegroundColor White
Write-Host ""

$openPowerApps = Read-Host "Open Power Apps to find URL? (Y/N)"
if ($openPowerApps -eq 'Y' -or $openPowerApps -eq 'y') {
    Start-Process "https://make.powerapps.com"
}

Write-Host ""
Write-Host "Once you find your URL, it will look like:" -ForegroundColor Yellow
Write-Host "  https://orgXXXXXXXX.crm.dynamics.com" -ForegroundColor Green
Write-Host "  or" -ForegroundColor Gray  
Write-Host "  https://yourorgname.crm.dynamics.com" -ForegroundColor Green
Write-Host ""

$manualUrl = Read-Host "Enter your Dynamics 365 URL when you find it (or press Enter to skip)"
if ($manualUrl -and $manualUrl -ne "") {
    # Update .env.local
    $envPath = "C:\Users\dusta\01-Development\repos\aura-springs-standalone\.env.local"
    $envContent = Get-Content $envPath -Raw
    $envContent = $envContent -replace "DYNAMICS_365_URL=.*", "DYNAMICS_365_URL=$manualUrl"
    $envContent | Set-Content $envPath
    
    Write-Host "✅ Updated .env.local with URL: $manualUrl" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next: Test the connection with:" -ForegroundColor Yellow
    Write-Host "npx tsx scripts/test-microsoft-ecosystem.ts" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")