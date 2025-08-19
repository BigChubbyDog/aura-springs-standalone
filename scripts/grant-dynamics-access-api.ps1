# Grant Dynamics 365 Access via API
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Granting Dynamics 365 Access via API" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration - Using Claude-Master-Automation for admin operations
$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$adminClientId = "94d3924d-79c4-4280-975d-8223752343b8"  # Claude-Master-Automation
$adminClientSecret = "$env:AZURE_CLIENT_SECRET"
$targetAppId = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"  # AuraSpring-Master-Integration
$dynamicsUrl = "https://mortgagelcdefault.crm.dynamics.com"

Write-Host "Using Claude-Master-Automation to grant access..." -ForegroundColor Yellow
Write-Host ""

# Step 1: Get admin access token
Write-Host "Getting admin access token..." -ForegroundColor Cyan
$tokenBody = @{
    grant_type    = "client_credentials"
    client_id     = $adminClientId
    client_secret = $adminClientSecret
    scope         = "$dynamicsUrl/.default"
}

try {
    $tokenResponse = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $tokenBody `
        -ContentType "application/x-www-form-urlencoded"
    
    $adminToken = $tokenResponse.access_token
    Write-Host "✅ Admin token obtained" -ForegroundColor Green
    Write-Host ""
    
    # Step 2: Create Application User in Dynamics 365
    Write-Host "Creating application user in Dynamics 365..." -ForegroundColor Cyan
    
    $headers = @{
        Authorization = "Bearer $adminToken"
        'OData-MaxVersion' = '4.0'
        'OData-Version' = '4.0'
        'Content-Type' = 'application/json'
        Accept = 'application/json'
        Prefer = 'return=representation'
    }
    
    # Application user data
    $appUserData = @{
        applicationid = $targetAppId
        fullname = "AuraSpring-Master-Integration"
        firstname = "AuraSpring"
        lastname = "Integration"
        internalemailaddress = "auraspring@auraspringcleaning.com"
        isdisabled = $false
    } | ConvertTo-Json
    
    try {
        # First, check if user already exists
        Write-Host "Checking if application user already exists..." -ForegroundColor Gray
        $checkUrl = "$dynamicsUrl/api/data/v9.2/systemusers?`$filter=applicationid eq $targetAppId"
        
        $existingUser = Invoke-RestMethod -Method Get `
            -Uri $checkUrl `
            -Headers $headers
        
        if ($existingUser.value -and $existingUser.value.Count -gt 0) {
            Write-Host "⚠️ Application user already exists" -ForegroundColor Yellow
            $userId = $existingUser.value[0].systemuserid
            Write-Host "   User ID: $userId" -ForegroundColor Gray
            
            # Enable the user if disabled
            if ($existingUser.value[0].isdisabled) {
                Write-Host "   Enabling disabled user..." -ForegroundColor Yellow
                $enableData = @{ isdisabled = $false } | ConvertTo-Json
                
                Invoke-RestMethod -Method Patch `
                    -Uri "$dynamicsUrl/api/data/v9.2/systemusers($userId)" `
                    -Headers $headers `
                    -Body $enableData
                
                Write-Host "   ✅ User enabled" -ForegroundColor Green
            }
        } else {
            # Create new application user
            Write-Host "Creating new application user..." -ForegroundColor Gray
            
            $createResponse = Invoke-RestMethod -Method Post `
                -Uri "$dynamicsUrl/api/data/v9.2/systemusers" `
                -Headers $headers `
                -Body $appUserData
            
            $userId = $createResponse.systemuserid
            Write-Host "✅ Application user created!" -ForegroundColor Green
            Write-Host "   User ID: $userId" -ForegroundColor Gray
        }
        
        # Step 3: Assign Security Role
        Write-Host ""
        Write-Host "Assigning security roles..." -ForegroundColor Cyan
        
        # Get System Administrator role
        $roleQuery = "`$filter=name eq 'System Administrator'&`$select=roleid,name"
        $rolesUrl = "$dynamicsUrl/api/data/v9.2/roles?$roleQuery"
        
        $roles = Invoke-RestMethod -Method Get `
            -Uri $rolesUrl `
            -Headers $headers
        
        if ($roles.value -and $roles.value.Count -gt 0) {
            $roleId = $roles.value[0].roleid
            Write-Host "Found System Administrator role: $roleId" -ForegroundColor Gray
            
            # Associate role with user
            $associateUrl = "$dynamicsUrl/api/data/v9.2/systemusers($userId)/systemuserroles_association/`$ref"
            $roleRef = @{
                "@odata.id" = "$dynamicsUrl/api/data/v9.2/roles($roleId)"
            } | ConvertTo-Json
            
            try {
                Invoke-RestMethod -Method Post `
                    -Uri $associateUrl `
                    -Headers $headers `
                    -Body $roleRef
                
                Write-Host "✅ System Administrator role assigned!" -ForegroundColor Green
            } catch {
                if ($_.Exception.Message -like "*already exists*" -or $_.Exception.Response.StatusCode.value__ -eq 409) {
                    Write-Host "⚠️ Role already assigned" -ForegroundColor Yellow
                } else {
                    Write-Host "❌ Could not assign role: $_" -ForegroundColor Red
                }
            }
        } else {
            Write-Host "❌ System Administrator role not found" -ForegroundColor Red
        }
        
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 403) {
            Write-Host "❌ Access Denied - Admin privileges required" -ForegroundColor Red
            Write-Host ""
            Write-Host "The Claude-Master-Automation service principal needs admin access." -ForegroundColor Yellow
            Write-Host "Please grant it manually first, then run this script again." -ForegroundColor Yellow
        } else {
            Write-Host "❌ Error creating application user: $_" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "❌ Failed to get admin token: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Testing Access" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Test with the target service principal
Write-Host "Testing AuraSpring-Master-Integration access..." -ForegroundColor Cyan

$testTokenBody = @{
    grant_type    = "client_credentials"
    client_id     = $targetAppId
    client_secret = "$env:AURASPRING_CLIENT_SECRET"
    scope         = "$dynamicsUrl/.default"
}

try {
    $testToken = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $testTokenBody `
        -ContentType "application/x-www-form-urlencoded"
    
    $testHeaders = @{
        Authorization = "Bearer $($testToken.access_token)"
        'OData-MaxVersion' = '4.0'
        'OData-Version' = '4.0'
        Accept = 'application/json'
    }
    
    $testResponse = Invoke-RestMethod -Method Get `
        -Uri "$dynamicsUrl/api/data/v9.2/contacts?`$top=1" `
        -Headers $testHeaders
    
    Write-Host "✅ SUCCESS! AuraSpring-Master-Integration can now access Dynamics 365!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run your application and it will work!" -ForegroundColor Yellow
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 403) {
        Write-Host "❌ Still getting 403 - Manual configuration needed" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please manually add the application user at:" -ForegroundColor Yellow
        Write-Host "https://admin.powerplatform.microsoft.com" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Test failed: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")