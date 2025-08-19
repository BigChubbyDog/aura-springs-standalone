# Check which email accounts and groups actually exist in Microsoft 365
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Checking Email Accounts in Microsoft 365" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$clientId = "94d3924d-79c4-4280-975d-8223752343b8"
$clientSecret = "$env:AZURE_CLIENT_SECRET"

# Get access token
$tokenBody = @{
    grant_type    = "client_credentials"
    client_id     = $clientId
    client_secret = $clientSecret
    scope         = "https://graph.microsoft.com/.default"
}

try {
    $tokenResponse = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $tokenBody `
        -ContentType "application/x-www-form-urlencoded"
    
    $headers = @{
        Authorization = "Bearer $($tokenResponse.access_token)"
        'Content-Type' = 'application/json'
    }
    
    Write-Host "✅ Connected to Microsoft Graph" -ForegroundColor Green
    Write-Host ""
    
    # Check for users with auraspringcleaning.com domain
    Write-Host "CHECKING USER MAILBOXES:" -ForegroundColor Cyan
    Write-Host "========================" -ForegroundColor Cyan
    
    $expectedEmails = @(
        "valerie@auraspringcleaning.com",
        "dustin@auraspringcleaning.com",
        "booking@auraspringcleaning.com",
        "hello@auraspringcleaning.com",
        "schedule@auraspringcleaning.com",
        "ann@auraspringcleaning.com",
        "anna@auraspringcleaning.com",
        "rene@auraspringcleaning.com",
        "tianqi@auraspringcleaning.com"
    )
    
    foreach ($email in $expectedEmails) {
        Write-Host -NoNewline "Checking $email... "
        try {
            $user = Invoke-RestMethod -Method Get `
                -Uri "https://graph.microsoft.com/v1.0/users/$email" `
                -Headers $headers `
                -ErrorAction SilentlyContinue
            
            if ($user) {
                Write-Host "✅ EXISTS" -ForegroundColor Green
                Write-Host "  Display Name: $($user.displayName)" -ForegroundColor Gray
                Write-Host "  Account Enabled: $($user.accountEnabled)" -ForegroundColor Gray
            }
        } catch {
            $statusCode = $_.Exception.Response.StatusCode.value__
            if ($statusCode -eq 404) {
                Write-Host "❌ NOT FOUND" -ForegroundColor Red
            } else {
                Write-Host "⚠️ ERROR: $statusCode" -ForegroundColor Yellow
            }
        }
    }
    
    Write-Host ""
    Write-Host "CHECKING DISTRIBUTION GROUPS:" -ForegroundColor Cyan
    Write-Host "=============================" -ForegroundColor Cyan
    
    # Check for groups
    try {
        $groups = Invoke-RestMethod -Method Get `
            -Uri "https://graph.microsoft.com/v1.0/groups?`$filter=mailEnabled eq true" `
            -Headers $headers
        
        if ($groups.value) {
            foreach ($group in $groups.value) {
                if ($group.mail -like "*auraspringcleaning.com") {
                    Write-Host "📧 Group: $($group.displayName)" -ForegroundColor Yellow
                    Write-Host "   Email: $($group.mail)" -ForegroundColor White
                    Write-Host "   Type: $($group.groupTypes -join ', ')" -ForegroundColor Gray
                }
            }
        } else {
            Write-Host "No distribution groups found" -ForegroundColor Gray
        }
    } catch {
        Write-Host "Could not retrieve groups" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "CHECKING SHARED MAILBOXES:" -ForegroundColor Cyan
    Write-Host "==========================" -ForegroundColor Cyan
    
    # Check for shared mailboxes (these show as users with specific properties)
    try {
        $allUsers = Invoke-RestMethod -Method Get `
            -Uri "https://graph.microsoft.com/v1.0/users" `
            -Headers $headers
        
        if ($allUsers.value) {
            foreach ($user in $allUsers.value) {
                if ($user.userType -eq "Member" -and $user.mail) {
                    Write-Host "📮 $($user.mail)" -ForegroundColor White
                    Write-Host "   Display Name: $($user.displayName)" -ForegroundColor Gray
                    Write-Host "   Type: $($user.userType)" -ForegroundColor Gray
                }
            }
        }
    } catch {
        Write-Host "Could not retrieve all mailboxes" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Failed to connect: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "RECOMMENDATIONS:" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To create missing email accounts:" -ForegroundColor White
Write-Host "1. Go to: https://admin.microsoft.com" -ForegroundColor Gray
Write-Host "2. Navigate to: Users → Active users" -ForegroundColor Gray
Write-Host "3. Click: Add a user" -ForegroundColor Gray
Write-Host ""
Write-Host "To create distribution groups:" -ForegroundColor White
Write-Host "1. Go to: https://admin.exchange.microsoft.com" -ForegroundColor Gray
Write-Host "2. Navigate to: Recipients → Groups" -ForegroundColor Gray
Write-Host "3. Click: Add a group → Distribution list" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")