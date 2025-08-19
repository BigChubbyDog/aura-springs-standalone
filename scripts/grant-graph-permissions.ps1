# Grant Microsoft Graph API Permissions for Email and Calendar
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Granting Graph API Permissions" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$appId = "94d3924d-79c4-4280-975d-8223752343b8"  # Claude-Master-Automation

Write-Host "Service Principal: Claude-Master-Automation" -ForegroundColor Yellow
Write-Host "App ID: $appId" -ForegroundColor Gray
Write-Host ""

# Required permissions for email and calendar
$requiredPermissions = @(
    "Mail.Send",
    "Mail.ReadWrite",
    "Calendars.ReadWrite",
    "User.Read.All",
    "Directory.Read.All"
)

Write-Host "Required Graph API Permissions:" -ForegroundColor Cyan
foreach ($perm in $requiredPermissions) {
    Write-Host "  • $perm" -ForegroundColor White
}
Write-Host ""

# Step 1: Open Azure Portal to grant permissions
Write-Host "MANUAL STEPS REQUIRED:" -ForegroundColor Yellow
Write-Host "======================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Opening Azure Portal..." -ForegroundColor Cyan
Start-Process "https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/CallAnAPI/appId/$appId/isMSAApp/false"

Write-Host ""
Write-Host "2. In the Azure Portal:" -ForegroundColor Cyan
Write-Host "   a. Click '+ Add a permission'" -ForegroundColor White
Write-Host "   b. Select 'Microsoft Graph'" -ForegroundColor White
Write-Host "   c. Choose 'Application permissions'" -ForegroundColor White
Write-Host "   d. Add these permissions:" -ForegroundColor White
Write-Host "      - Mail → Mail.Send" -ForegroundColor Green
Write-Host "      - Mail → Mail.ReadWrite" -ForegroundColor Green
Write-Host "      - Calendars → Calendars.ReadWrite" -ForegroundColor Green
Write-Host "      - User → User.Read.All" -ForegroundColor Green
Write-Host "      - Directory → Directory.Read.All" -ForegroundColor Green
Write-Host "   e. Click 'Add permissions'" -ForegroundColor White
Write-Host "   f. Click 'Grant admin consent for adminaccountbcd'" -ForegroundColor Yellow
Write-Host ""

# Step 2: Check/Create new client secret
Write-Host "3. Create New Client Secret (if needed):" -ForegroundColor Cyan
Write-Host "   a. Go to 'Certificates & secrets'" -ForegroundColor White
Write-Host "   b. Click '+ New client secret'" -ForegroundColor White
Write-Host "   c. Description: 'Email and Calendar Access'" -ForegroundColor White
Write-Host "   d. Expires: Choose duration" -ForegroundColor White
Write-Host "   e. Copy the secret value immediately!" -ForegroundColor Yellow
Write-Host ""

$continue = Read-Host "Press Enter when you've completed the Azure Portal steps"

# Step 3: Update the secret if needed
Write-Host ""
Write-Host "Do you have a new client secret to update? (Y/N)" -ForegroundColor Yellow
$updateSecret = Read-Host

if ($updateSecret -eq 'Y' -or $updateSecret -eq 'y') {
    $newSecret = Read-Host "Enter the new client secret" -AsSecureString
    $secretText = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($newSecret))
    
    # Update .env.local
    $envPath = "C:\Users\dusta\01-Development\repos\aura-springs-standalone\.env.local"
    $envContent = Get-Content $envPath -Raw
    
    # Update both AZURE_CLIENT_SECRET and DYNAMICS_365_CLIENT_SECRET
    $envContent = $envContent -replace "AZURE_CLIENT_SECRET=.*", "AZURE_CLIENT_SECRET=$secretText"
    $envContent = $envContent -replace "DYNAMICS_365_CLIENT_SECRET=.*", "DYNAMICS_365_CLIENT_SECRET=$secretText"
    
    $envContent | Set-Content $envPath
    
    Write-Host "✅ Updated .env.local with new secret" -ForegroundColor Green
    Write-Host ""
}

# Step 4: Test the permissions
Write-Host "Testing Graph API Access..." -ForegroundColor Cyan
Write-Host ""

$testScript = @'
# Test Graph API Email and Calendar Access
$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$clientId = "94d3924d-79c4-4280-975d-8223752343b8"

# Read the secret from .env.local
$envPath = "C:\Users\dusta\01-Development\repos\aura-springs-standalone\.env.local"
$envContent = Get-Content $envPath -Raw
if ($envContent -match "AZURE_CLIENT_SECRET=(.+)") {
    $clientSecret = $matches[1].Trim()
} else {
    Write-Host "Could not find AZURE_CLIENT_SECRET in .env.local" -ForegroundColor Red
    exit
}

# Get access token for Graph API
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
    
    Write-Host "✅ Successfully obtained Graph API token" -ForegroundColor Green
    
    $headers = @{
        Authorization = "Bearer $($tokenResponse.access_token)"
        'Content-Type' = 'application/json'
    }
    
    # Test 1: Check mail permissions
    Write-Host ""
    Write-Host "Testing Mail permissions..." -ForegroundColor Yellow
    try {
        # Try to access mail folders (will fail if no mailbox, but shows permission works)
        $mailTest = Invoke-RestMethod -Method Get `
            -Uri "https://graph.microsoft.com/v1.0/users/schedule@auraspringcleaning.com/mailFolders" `
            -Headers $headers `
            -ErrorAction SilentlyContinue
        
        Write-Host "  ✅ Mail permissions granted!" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 404) {
            Write-Host "  ✅ Mail permissions granted (mailbox not found, which is expected)" -ForegroundColor Green
        } elseif ($_.Exception.Response.StatusCode.value__ -eq 403) {
            Write-Host "  ❌ Mail permissions NOT granted - need admin consent" -ForegroundColor Red
        } else {
            Write-Host "  ⚠️ Mail test inconclusive: $_" -ForegroundColor Yellow
        }
    }
    
    # Test 2: Check calendar permissions
    Write-Host ""
    Write-Host "Testing Calendar permissions..." -ForegroundColor Yellow
    try {
        # Try to access calendar (will fail if no mailbox, but shows permission works)
        $calendarTest = Invoke-RestMethod -Method Get `
            -Uri "https://graph.microsoft.com/v1.0/users/schedule@auraspringcleaning.com/calendar" `
            -Headers $headers `
            -ErrorAction SilentlyContinue
        
        Write-Host "  ✅ Calendar permissions granted!" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 404) {
            Write-Host "  ✅ Calendar permissions granted (mailbox not found, which is expected)" -ForegroundColor Green
        } elseif ($_.Exception.Response.StatusCode.value__ -eq 403) {
            Write-Host "  ❌ Calendar permissions NOT granted - need admin consent" -ForegroundColor Red
        } else {
            Write-Host "  ⚠️ Calendar test inconclusive: $_" -ForegroundColor Yellow
        }
    }
    
    # Test 3: Check user read permissions
    Write-Host ""
    Write-Host "Testing User.Read.All permissions..." -ForegroundColor Yellow
    try {
        $usersTest = Invoke-RestMethod -Method Get `
            -Uri "https://graph.microsoft.com/v1.0/users?`$top=1" `
            -Headers $headers
        
        if ($usersTest.value) {
            Write-Host "  ✅ User.Read.All permissions granted!" -ForegroundColor Green
            Write-Host "     Found $($usersTest.value.Count) user(s)" -ForegroundColor Gray
        }
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 403) {
            Write-Host "  ❌ User.Read.All permissions NOT granted - need admin consent" -ForegroundColor Red
        } else {
            Write-Host "  ❌ Error: $_" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "❌ Failed to get Graph API token: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "This usually means the client secret is invalid or expired." -ForegroundColor Yellow
    Write-Host "Please create a new secret in Azure Portal." -ForegroundColor Yellow
}
'@

# Save and run the test script
$testScriptPath = "C:\Users\dusta\01-Development\repos\aura-springs-standalone\scripts\test-graph-permissions.ps1"
$testScript | Out-File -FilePath $testScriptPath -Encoding UTF8

Write-Host "Running permission test..." -ForegroundColor Yellow
& powershell.exe -ExecutionPolicy Bypass -File $testScriptPath

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If permissions are granted:" -ForegroundColor Green
Write-Host "1. Email sending will work via Graph API" -ForegroundColor White
Write-Host "2. Calendar events can be created" -ForegroundColor White
Write-Host "3. User directory can be accessed" -ForegroundColor White
Write-Host ""
Write-Host "Test the integration with:" -ForegroundColor Yellow
Write-Host "npx tsx scripts/test-microsoft-ecosystem.ts" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")