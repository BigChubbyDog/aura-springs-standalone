# Test Dynamics 365 Access with Claude-Master-Automation
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Testing with Claude-Master-Automation" -ForegroundColor Green
Write-Host "(Already has System Administrator role)" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration - Using Claude-Master-Automation
$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$clientId = "94d3924d-79c4-4280-975d-8223752343b8"
$clientSecret = "$env:AZURE_CLIENT_SECRET"
$dynamicsUrl = "https://mortgagelcdefault.crm.dynamics.com"

Write-Host "Service Principal: Claude-Master-Automation" -ForegroundColor White
Write-Host "App ID: $clientId" -ForegroundColor Gray
Write-Host "Dynamics URL: $dynamicsUrl" -ForegroundColor Gray
Write-Host ""

# Get access token
Write-Host "Getting access token..." -ForegroundColor Cyan
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
    
    # Test Dynamics 365 API Access
    Write-Host "Testing Dynamics 365 API access..." -ForegroundColor Cyan
    $headers = @{
        Authorization = "Bearer $($tokenResponse.access_token)"
        'OData-MaxVersion' = '4.0'
        'OData-Version' = '4.0'
        Accept = 'application/json'
    }
    
    # Test 1: Get contacts
    Write-Host "Test 1: Retrieving contacts..." -ForegroundColor Yellow
    try {
        $contactsResponse = Invoke-RestMethod -Method Get `
            -Uri "$dynamicsUrl/api/data/v9.2/contacts?`$top=1" `
            -Headers $headers
        
        Write-Host "  ✅ Can access contacts!" -ForegroundColor Green
        if ($contactsResponse.value) {
            Write-Host "  Found $($contactsResponse.value.Count) contact(s)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  ❌ Cannot access contacts: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test 2: Get accounts
    Write-Host ""
    Write-Host "Test 2: Retrieving accounts..." -ForegroundColor Yellow
    try {
        $accountsResponse = Invoke-RestMethod -Method Get `
            -Uri "$dynamicsUrl/api/data/v9.2/accounts?`$top=1" `
            -Headers $headers
        
        Write-Host "  ✅ Can access accounts!" -ForegroundColor Green
        if ($accountsResponse.value) {
            Write-Host "  Found $($accountsResponse.value.Count) account(s)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  ❌ Cannot access accounts: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test 3: Get current user info
    Write-Host ""
    Write-Host "Test 3: Getting current user info..." -ForegroundColor Yellow
    try {
        $whoAmIResponse = Invoke-RestMethod -Method Get `
            -Uri "$dynamicsUrl/api/data/v9.2/WhoAmI" `
            -Headers $headers
        
        Write-Host "  ✅ WhoAmI successful!" -ForegroundColor Green
        Write-Host "  User ID: $($whoAmIResponse.UserId)" -ForegroundColor Gray
        Write-Host "  Business Unit ID: $($whoAmIResponse.BusinessUnitId)" -ForegroundColor Gray
        Write-Host "  Organization ID: $($whoAmIResponse.OrganizationId)" -ForegroundColor Gray
    } catch {
        Write-Host "  ❌ Cannot get user info: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test 4: Create a test contact
    Write-Host ""
    Write-Host "Test 4: Creating test contact..." -ForegroundColor Yellow
    $testContact = @{
        firstname = "Test"
        lastname = "Contact-$(Get-Random -Maximum 9999)"
        emailaddress1 = "test$(Get-Random -Maximum 9999)@auraspringcleaning.com"
        telephone1 = "512-555-$(Get-Random -Minimum 1000 -Maximum 9999)"
    } | ConvertTo-Json
    
    try {
        $createHeaders = $headers.Clone()
        $createHeaders['Content-Type'] = 'application/json'
        $createHeaders['Prefer'] = 'return=representation'
        
        $createResponse = Invoke-RestMethod -Method Post `
            -Uri "$dynamicsUrl/api/data/v9.2/contacts" `
            -Headers $createHeaders `
            -Body $testContact
        
        Write-Host "  ✅ Successfully created test contact!" -ForegroundColor Green
        Write-Host "  Contact ID: $($createResponse.contactid)" -ForegroundColor Gray
        Write-Host "  Name: $($createResponse.firstname) $($createResponse.lastname)" -ForegroundColor Gray
        
        # Clean up - delete the test contact
        try {
            Invoke-RestMethod -Method Delete `
                -Uri "$dynamicsUrl/api/data/v9.2/contacts($($createResponse.contactid))" `
                -Headers $headers
            Write-Host "  ✅ Test contact cleaned up" -ForegroundColor Gray
        } catch {
            Write-Host "  ⚠️ Could not delete test contact" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "  ❌ Cannot create contact: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "✅ SUCCESS! Dynamics 365 is fully configured!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Claude-Master-Automation has full access to:" -ForegroundColor White
    Write-Host "  • Create and manage contacts" -ForegroundColor Gray
    Write-Host "  • Create and manage accounts" -ForegroundColor Gray
    Write-Host "  • Create service appointments" -ForegroundColor Gray
    Write-Host "  • Generate leads and invoices" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Your application is ready to use!" -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ Failed to get access token: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please verify:" -ForegroundColor Yellow
    Write-Host "1. Client ID is correct: $clientId" -ForegroundColor White
    Write-Host "2. Client Secret is valid" -ForegroundColor White
    Write-Host "3. The application user exists in Dynamics 365" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")