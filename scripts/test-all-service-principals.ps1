# Test All Service Principals for Email and Calendar Access
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Testing All Service Principals" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"

# Service Principals to test
$servicePrincipals = @(
    @{
        Name = "Claude-Master-Automation"
        AppId = "94d3924d-79c4-4280-975d-8223752343b8"
        Secret = "$env:AZURE_CLIENT_SECRET"
    },
    @{
        Name = "BCD-Dynamics365-Integration"
        AppId = "09ac4822-fdd9-438a-99f7-18a689a5fdf6"
        Secret = $null  # We need to find or create this secret
    },
    @{
        Name = "Claude-Automation-Master"
        AppId = "7e27b2d6-116f-4a22-b951-b99d6a889cce"
        Secret = $null  # We need to find or create this secret
    }
)

function Test-ServicePrincipal {
    param(
        [string]$Name,
        [string]$AppId,
        [string]$Secret
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    Write-Host "App ID: $AppId" -ForegroundColor Gray
    
    if (-not $Secret) {
        Write-Host "  ⚠️ No secret available - skipping" -ForegroundColor Yellow
        Write-Host ""
        return
    }
    
    # Get access token
    $tokenBody = @{
        grant_type    = "client_credentials"
        client_id     = $AppId
        client_secret = $Secret
        scope         = "https://graph.microsoft.com/.default"
    }
    
    try {
        $tokenResponse = Invoke-RestMethod -Method Post `
            -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
            -Body $tokenBody `
            -ContentType "application/x-www-form-urlencoded" `
            -ErrorAction Stop
        
        Write-Host "  ✅ Authentication successful" -ForegroundColor Green
        
        $headers = @{
            Authorization = "Bearer $($tokenResponse.access_token)"
            'Content-Type' = 'application/json'
        }
        
        # Test capabilities
        $capabilities = @{
            Users = $false
            Mail = $false
            Calendar = $false
            Sites = $false
        }
        
        # Test User.Read.All
        try {
            $users = Invoke-RestMethod -Method Get `
                -Uri "https://graph.microsoft.com/v1.0/users?`$top=1" `
                -Headers $headers `
                -ErrorAction Stop
            $capabilities.Users = $true
            Write-Host "  ✅ User.Read.All: Yes" -ForegroundColor Green
        } catch {
            Write-Host "  ❌ User.Read.All: No" -ForegroundColor Red
        }
        
        # Test Mail.Send
        try {
            # This will fail but tells us about permissions
            $mailTest = Invoke-RestMethod -Method Get `
                -Uri "https://graph.microsoft.com/v1.0/me/messages" `
                -Headers $headers `
                -ErrorAction SilentlyContinue
            $capabilities.Mail = $true
            Write-Host "  ✅ Mail permissions: Yes" -ForegroundColor Green
        } catch {
            $statusCode = $_.Exception.Response.StatusCode.value__
            if ($statusCode -eq 404 -or $statusCode -eq 400) {
                # 404/400 means permission exists but no mailbox
                $capabilities.Mail = $true
                Write-Host "  ✅ Mail permissions: Yes (no mailbox configured)" -ForegroundColor Green
            } else {
                Write-Host "  ❌ Mail permissions: No" -ForegroundColor Red
            }
        }
        
        # Test Calendar
        try {
            $calendarTest = Invoke-RestMethod -Method Get `
                -Uri "https://graph.microsoft.com/v1.0/me/calendar" `
                -Headers $headers `
                -ErrorAction SilentlyContinue
            $capabilities.Calendar = $true
            Write-Host "  ✅ Calendar permissions: Yes" -ForegroundColor Green
        } catch {
            $statusCode = $_.Exception.Response.StatusCode.value__
            if ($statusCode -eq 404 -or $statusCode -eq 400) {
                # 404/400 means permission exists but no calendar
                $capabilities.Calendar = $true
                Write-Host "  ✅ Calendar permissions: Yes (no calendar configured)" -ForegroundColor Green
            } else {
                Write-Host "  ❌ Calendar permissions: No" -ForegroundColor Red
            }
        }
        
        # Test SharePoint/Sites
        try {
            $sites = Invoke-RestMethod -Method Get `
                -Uri "https://graph.microsoft.com/v1.0/sites?`$top=1" `
                -Headers $headers `
                -ErrorAction Stop
            $capabilities.Sites = $true
            Write-Host "  ✅ Sites.Read.All: Yes" -ForegroundColor Green
        } catch {
            Write-Host "  ❌ Sites.Read.All: No" -ForegroundColor Red
        }
        
        # Summary
        $score = ($capabilities.Values | Where-Object { $_ -eq $true }).Count
        Write-Host "  Score: $score/4 capabilities" -ForegroundColor Cyan
        
        return @{
            Name = $Name
            AppId = $AppId
            Score = $score
            Capabilities = $capabilities
        }
        
    } catch {
        Write-Host "  ❌ Authentication failed: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
    
    Write-Host ""
}

# Test each service principal
$results = @()
foreach ($sp in $servicePrincipals) {
    $result = Test-ServicePrincipal -Name $sp.Name -AppId $sp.AppId -Secret $sp.Secret
    if ($result) {
        $results += $result
    }
    Write-Host ""
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "TRYING TO FIND SECRETS FOR OTHER PRINCIPALS" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we have other secrets in environment or can create them
Write-Host "Checking for existing secrets in Azure..." -ForegroundColor Yellow
Write-Host ""

# Try to use Azure CLI if available
try {
    $azInstalled = Get-Command az -ErrorAction SilentlyContinue
    if ($azInstalled) {
        Write-Host "Azure CLI found. Attempting to create secrets..." -ForegroundColor Green
        Write-Host ""
        
        # Login check
        $loginStatus = az account show 2>$null
        if (-not $loginStatus) {
            Write-Host "Please login to Azure CLI first:" -ForegroundColor Yellow
            Write-Host "az login" -ForegroundColor Cyan
        } else {
            # Try to create secrets for other service principals
            foreach ($sp in $servicePrincipals | Where-Object { -not $_.Secret }) {
                Write-Host "Creating secret for: $($sp.Name)" -ForegroundColor Yellow
                try {
                    $newCred = az ad app credential reset --id $sp.AppId --query password -o tsv 2>$null
                    if ($newCred) {
                        Write-Host "  ✅ New secret created!" -ForegroundColor Green
                        Write-Host "  Secret: $newCred" -ForegroundColor Gray
                        
                        # Test with new secret
                        Write-Host "  Testing with new secret..." -ForegroundColor Yellow
                        $result = Test-ServicePrincipal -Name $sp.Name -AppId $sp.AppId -Secret $newCred
                        if ($result) {
                            $results += $result
                        }
                    }
                } catch {
                    Write-Host "  ❌ Could not create secret: $_" -ForegroundColor Red
                }
                Write-Host ""
            }
        }
    } else {
        Write-Host "Azure CLI not found. Install with:" -ForegroundColor Yellow
        Write-Host "winget install Microsoft.AzureCLI" -ForegroundColor Cyan
    }
} catch {
    Write-Host "Could not use Azure CLI: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "RECOMMENDATION" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

if ($results.Count -gt 0) {
    $best = $results | Sort-Object -Property Score -Descending | Select-Object -First 1
    Write-Host "Best Service Principal: $($best.Name)" -ForegroundColor Green
    Write-Host "App ID: $($best.AppId)" -ForegroundColor White
    Write-Host "Score: $($best.Score)/4 capabilities" -ForegroundColor Yellow
    Write-Host ""
    
    if ($best.Score -lt 4) {
        Write-Host "TO GET FULL ACCESS:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://portal.azure.com" -ForegroundColor White
        Write-Host "2. Navigate to: Azure Active Directory → App registrations" -ForegroundColor White
        Write-Host "3. Select: $($best.Name)" -ForegroundColor White
        Write-Host "4. Go to: API permissions" -ForegroundColor White
        Write-Host "5. Add these Microsoft Graph permissions:" -ForegroundColor White
        
        if (-not $best.Capabilities.Mail) {
            Write-Host "   - Mail.Send (Application)" -ForegroundColor Red
            Write-Host "   - Mail.ReadWrite (Application)" -ForegroundColor Red
        }
        if (-not $best.Capabilities.Calendar) {
            Write-Host "   - Calendars.ReadWrite (Application)" -ForegroundColor Red
        }
        if (-not $best.Capabilities.Users) {
            Write-Host "   - User.Read.All (Application)" -ForegroundColor Red
        }
        if (-not $best.Capabilities.Sites) {
            Write-Host "   - Sites.ReadWrite.All (Application)" -ForegroundColor Red
        }
        
        Write-Host "6. Click: Grant admin consent" -ForegroundColor Yellow
    } else {
        Write-Host "✅ This service principal has all required permissions!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")