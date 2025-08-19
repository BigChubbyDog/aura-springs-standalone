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
            Write-Host "  Domain: $($orgDetails.verifiedDomains | Where-Object { $_.isDefault } | Select-Object -ExpandProperty name)" -ForegroundColor White
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
        }
    } catch {
        Write-Host "  Error retrieving subscriptions: $_" -ForegroundColor Red
    }
    
    # 3. Check for Dynamics 365 environments
    Write-Host ""
    Write-Host "CHECKING FOR DYNAMICS 365 ENVIRONMENTS:" -ForegroundColor Cyan
    
    # Try different API endpoints
    $environmentApis = @(
        "https://api.bap.microsoft.com/providers/Microsoft.BusinessAppPlatform/scopes/admin/environments",
        "https://api.powerplatform.com/environments/~default"
    )
    
    foreach ($apiUrl in $environmentApis) {
        try {
            Write-Host "  Checking: $apiUrl" -ForegroundColor Gray
            $envResponse = Invoke-RestMethod -Method Get `
                -Uri "$apiUrl`?api-version=2020-10-01" `
                -Headers $headers `
                -ErrorAction SilentlyContinue
            
            if ($envResponse.value) {
                Write-Host "  ✅ Found environments!" -ForegroundColor Green
                foreach ($env in $envResponse.value) {
                    Write-Host "     Name: $($env.properties.displayName)" -ForegroundColor White
                    if ($env.properties.linkedEnvironmentMetadata.instanceUrl) {
                        Write-Host "     URL: $($env.properties.linkedEnvironmentMetadata.instanceUrl)" -ForegroundColor Cyan
                        
                        # Save the first Dynamics URL found
                        $global:DynamicsUrl = $env.properties.linkedEnvironmentMetadata.instanceUrl
                    }
                }
                break
            }
        } catch {
            # Continue to next API
        }
    }
    
    # 4. Try to find Dynamics URL via different method
    if (-not $global:DynamicsUrl) {
        Write-Host ""
        Write-Host "ALTERNATIVE: Checking Power Platform..." -ForegroundColor Yellow
        Write-Host "  Opening Power Platform Admin Center" -ForegroundColor White
        Write-Host "  Please check for your environment URL there" -ForegroundColor Gray
        Start-Process "https://admin.powerplatform.microsoft.com"
    }
    
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan

if ($global:DynamicsUrl) {
    Write-Host "✅ Found Dynamics URL: $global:DynamicsUrl" -ForegroundColor Green
    Write-Host ""
    Write-Host "Update your .env.local file:" -ForegroundColor Yellow
    Write-Host "DYNAMICS_365_URL=$global:DynamicsUrl" -ForegroundColor White
    
    $updateEnv = Read-Host "Update .env.local automatically? (Y/N)"
    if ($updateEnv -eq 'Y' -or $updateEnv -eq 'y') {
        $envPath = "C:\Users\dusta\01-Development\repos\aura-springs-standalone\.env.local"
        $envContent = Get-Content $envPath -Raw
        $envContent = $envContent -replace "DYNAMICS_365_URL=.*", "DYNAMICS_365_URL=$global:DynamicsUrl"
        $envContent | Set-Content $envPath
        Write-Host "✅ Updated .env.local!" -ForegroundColor Green
    }
} else {
    Write-Host "To find your Dynamics 365 URL manually:" -ForegroundColor Yellow
    Write-Host "1. Go to https://make.powerapps.com" -ForegroundColor White
    Write-Host "2. Look at the environment selector (top right)" -ForegroundColor White
    Write-Host "3. Click on Settings (gear icon) → Session details" -ForegroundColor White
    Write-Host "4. Look for 'Instance URL' or 'Environment URL'" -ForegroundColor White
    Write-Host ""
    Write-Host "OR" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to https://admin.powerplatform.microsoft.com" -ForegroundColor White
    Write-Host "2. Click Environments" -ForegroundColor White
    Write-Host "3. Select your environment" -ForegroundColor White
    Write-Host "4. Copy the Environment URL" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")