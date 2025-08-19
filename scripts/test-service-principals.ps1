# Test Azure Service Principal Authentication
# This script tests both service principals to identify authentication issues

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Azure Service Principal Authentication Test" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"

# Service Principal 1: Claude-Master-Automation
$sp1 = @{
    Name = "Claude-Master-Automation"
    ClientId = "94d3924d-79c4-4280-975d-8223752343b8"
    ClientSecret = "$env:AZURE_CLIENT_SECRET"
    Purpose = "SharePoint, Teams, Graph API"
}

# Service Principal 2: AuraSpring-Master-Integration  
$sp2 = @{
    Name = "AuraSpring-Master-Integration"
    ClientId = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"
    ClientSecret = "$env:AURASPRING_CLIENT_SECRET"
    Purpose = "Dynamics 365 CRM"
}

function Test-ServicePrincipal {
    param (
        [hashtable]$ServicePrincipal,
        [string]$Scope = "https://graph.microsoft.com/.default"
    )
    
    Write-Host "Testing: $($ServicePrincipal.Name)" -ForegroundColor Yellow
    Write-Host "App ID: $($ServicePrincipal.ClientId)" -ForegroundColor Gray
    Write-Host "Purpose: $($ServicePrincipal.Purpose)" -ForegroundColor Gray
    
    $body = @{
        grant_type    = "client_credentials"
        client_id     = $ServicePrincipal.ClientId
        client_secret = $ServicePrincipal.ClientSecret
        scope         = $Scope
    }
    
    try {
        $response = Invoke-RestMethod -Method Post `
            -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
            -Body $body `
            -ContentType "application/x-www-form-urlencoded" `
            -ErrorAction Stop
        
        Write-Host "✅ SUCCESS: Token acquired!" -ForegroundColor Green
        Write-Host "   Token expires in: $($response.expires_in) seconds" -ForegroundColor Gray
        
        # Test Graph API call with the token
        if ($Scope -like "*graph.microsoft.com*") {
            try {
                $headers = @{
                    Authorization = "Bearer $($response.access_token)"
                }
                
                # Try to get service principal info
                $graphTest = Invoke-RestMethod -Method Get `
                    -Uri "https://graph.microsoft.com/v1.0/servicePrincipals?`$filter=appId eq '$($ServicePrincipal.ClientId)'" `
                    -Headers $headers `
                    -ErrorAction Stop
                
                if ($graphTest.value) {
                    Write-Host "   Graph API: ✅ Working" -ForegroundColor Green
                    Write-Host "   Display Name: $($graphTest.value[0].displayName)" -ForegroundColor Gray
                }
            } catch {
                Write-Host "   Graph API: ⚠️ Token valid but Graph call failed" -ForegroundColor Yellow
                Write-Host "   Error: $_" -ForegroundColor Red
            }
        }
        
        return $true
        
    } catch {
        Write-Host "❌ FAILED: Authentication error" -ForegroundColor Red
        
        if ($_.Exception.Response) {
            $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
            $errorBody = $reader.ReadToEnd() | ConvertFrom-Json
            
            Write-Host "   Error: $($errorBody.error)" -ForegroundColor Red
            Write-Host "   Description: $($errorBody.error_description)" -ForegroundColor Red
            
            # Parse specific error codes
            if ($errorBody.error_description -like "*AADSTS7000215*") {
                Write-Host "   ⚠️ Invalid client secret - The secret value is incorrect" -ForegroundColor Yellow
                Write-Host "   📌 Solution: Create a new secret in Azure Portal" -ForegroundColor Cyan
            }
            elseif ($errorBody.error_description -like "*AADSTS700016*") {
                Write-Host "   ⚠️ Application not found" -ForegroundColor Yellow
                Write-Host "   📌 Solution: Check the App ID is correct" -ForegroundColor Cyan
            }
            elseif ($errorBody.error_description -like "*AADSTS50034*") {
                Write-Host "   ⚠️ Account doesn't exist in tenant" -ForegroundColor Yellow
            }
        } else {
            Write-Host "   Error: $_" -ForegroundColor Red
        }
        
        return $false
    }
}

Write-Host ""
Write-Host "=== Test 1: Claude-Master-Automation ===" -ForegroundColor Cyan
$test1 = Test-ServicePrincipal -ServicePrincipal $sp1

Write-Host ""
Write-Host "=== Test 2: AuraSpring-Master-Integration ===" -ForegroundColor Cyan
$test2 = Test-ServicePrincipal -ServicePrincipal $sp2

# Test Dynamics 365 specific scope
Write-Host ""
Write-Host "=== Test 3: Dynamics 365 Authentication ===" -ForegroundColor Cyan
$dynamicsUrl = "https://org829637ae.crm.dynamics.com"
Write-Host "Testing with Dynamics URL: $dynamicsUrl" -ForegroundColor Gray

# First check if the Dynamics URL exists
try {
    $dnsResult = Resolve-DnsName -Name "org829637ae.crm.dynamics.com" -ErrorAction Stop
    Write-Host "✅ DNS Resolution: Found" -ForegroundColor Green
} catch {
    Write-Host "❌ DNS Resolution: Domain not found" -ForegroundColor Red
    Write-Host "   The Dynamics 365 URL is incorrect or environment doesn't exist" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   📌 To find your correct Dynamics 365 URL:" -ForegroundColor Cyan
    Write-Host "   1. Go to: https://admin.powerplatform.microsoft.com" -ForegroundColor White
    Write-Host "   2. Click 'Environments' in the left menu" -ForegroundColor White
    Write-Host "   3. Look for your Dynamics 365 environment" -ForegroundColor White
    Write-Host "   4. The URL will be shown there" -ForegroundColor White
}

# Try Dynamics authentication anyway
$test3 = Test-ServicePrincipal -ServicePrincipal $sp2 -Scope "$dynamicsUrl/.default"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Yellow

$totalTests = 3
$passedTests = 0

if ($test1) { $passedTests++ }
if ($test2) { $passedTests++ }
if ($test3) { $passedTests++ }

Write-Host "Tests Passed: $passedTests / $totalTests" -ForegroundColor $(if ($passedTests -eq $totalTests) { "Green" } elseif ($passedTests -gt 0) { "Yellow" } else { "Red" })

if ($passedTests -lt $totalTests) {
    Write-Host ""
    Write-Host "🔧 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. If authentication failed: Create new secrets in Azure Portal" -ForegroundColor White
    Write-Host "2. If DNS failed: Find correct Dynamics 365 URL" -ForegroundColor White
    Write-Host "3. Run this script again after making changes" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")