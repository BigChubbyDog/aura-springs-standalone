# Get Dynamics 365 Environment URL
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Finding Your Dynamics 365 Environment" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Method 1: Open Power Platform Admin directly
Write-Host "Opening Power Platform Admin Center..." -ForegroundColor Yellow
Write-Host "Look for your Dynamics 365 environment URL" -ForegroundColor White
Start-Process "https://admin.powerplatform.microsoft.com/environments"

Write-Host ""
Write-Host "Your Dynamics 365 URL should look like:" -ForegroundColor Yellow
Write-Host "  https://orgXXXXXXXX.crm.dynamics.com" -ForegroundColor Green
Write-Host "  or" -ForegroundColor Gray
Write-Host "  https://YOURORGNAME.crm.dynamics.com" -ForegroundColor Green
Write-Host ""

# Method 2: Try to list via PowerShell
Write-Host "Checking for Dynamics 365 environments via API..." -ForegroundColor Yellow

$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$clientId = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"
$clientSecret = "$env:AURASPRING_CLIENT_SECRET"

# Get access token
$tokenBody = @{
    grant_type    = "client_credentials"
    client_id     = $clientId
    client_secret = $clientSecret
    scope         = "https://management.azure.com/.default"
}

try {
    $tokenResponse = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $tokenBody `
        -ContentType "application/x-www-form-urlencoded"
    
    $token = $tokenResponse.access_token
    
    # Try to get Power Platform environments
    $headers = @{
        Authorization = "Bearer $token"
    }
    
    # Check common Dynamics URLs
    Write-Host ""
    Write-Host "Checking common Dynamics 365 URLs..." -ForegroundColor Yellow
    
    $possibleUrls = @(
        "https://adminaccountbcd.crm.dynamics.com",
        "https://auraspring.crm.dynamics.com",
        "https://auraspringcleaning.crm.dynamics.com",
        "https://org829637ae.crm.dynamics.com",
        "https://orgadminaccountbcd.crm.dynamics.com"
    )
    
    foreach ($url in $possibleUrls) {
        Write-Host "Testing: $url" -NoNewline
        try {
            $dnsResult = Resolve-DnsName -Name ($url -replace "https://", "") -ErrorAction Stop 2>$null
            if ($dnsResult) {
                Write-Host " ✅ EXISTS!" -ForegroundColor Green
                Write-Host "   This could be your Dynamics 365 URL!" -ForegroundColor Yellow
            }
        } catch {
            Write-Host " ❌ Not found" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "Could not retrieve via API" -ForegroundColor Gray
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "MANUAL STEPS TO FIND YOUR URL:" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to: https://home.dynamics.com" -ForegroundColor White
Write-Host "2. Sign in with: admin@adminaccountbcd.onmicrosoft.com" -ForegroundColor White
Write-Host "3. Look for 'Dynamics 365' apps" -ForegroundColor White
Write-Host "4. Click on any Dynamics 365 app (Sales, Customer Service, etc.)" -ForegroundColor White
Write-Host "5. Once it loads, check the browser URL" -ForegroundColor White
Write-Host "6. Copy the base URL (everything before /main.aspx)" -ForegroundColor White
Write-Host ""

$openDynamics = Read-Host "Open Dynamics 365 home page? (Y/N)"
if ($openDynamics -eq 'Y' -or $openDynamics -eq 'y') {
    Start-Process "https://home.dynamics.com"
}

Write-Host ""
Write-Host "Once you find your URL, update .env.local:" -ForegroundColor Yellow
Write-Host "DYNAMICS_365_URL=<your-url-here>" -ForegroundColor Green
Write-Host ""

# Prompt for manual entry
$manualUrl = Read-Host "Enter your Dynamics 365 URL if you found it (or press Enter to skip)"
if ($manualUrl -and $manualUrl -ne "") {
    Write-Host ""
    Write-Host "Testing URL: $manualUrl" -ForegroundColor Yellow
    
    try {
        $hostname = ($manualUrl -replace "https://", "" -replace "http://", "" -split "/")[0]
        $dnsResult = Resolve-DnsName -Name $hostname -ErrorAction Stop
        
        if ($dnsResult) {
            Write-Host "✅ URL is valid!" -ForegroundColor Green
            
            # Update .env.local
            $envPath = "C:\Users\dusta\01-Development\repos\aura-springs-standalone\.env.local"
            $envContent = Get-Content $envPath -Raw
            $envContent = $envContent -replace "DYNAMICS_365_URL=.*", "DYNAMICS_365_URL=$manualUrl"
            $envContent | Set-Content $envPath
            
            Write-Host "✅ Updated .env.local with new URL!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Next: Test the connection with:" -ForegroundColor Yellow
            Write-Host "npx tsx scripts/test-microsoft-ecosystem.ts" -ForegroundColor White
        }
    } catch {
        Write-Host "❌ URL doesn't seem valid" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")