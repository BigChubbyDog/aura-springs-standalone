# Find or Create Dynamics 365 Environment
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Dynamics 365 Environment Finder" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Option 1: Direct Link to Power Platform Admin
Write-Host "OPTION 1: Check Existing Environments" -ForegroundColor Yellow
Write-Host "Opening Power Platform Admin Center..." -ForegroundColor White
Start-Process "https://admin.powerplatform.microsoft.com/environments"
Write-Host "Look for any environment and note its URL" -ForegroundColor Gray
Write-Host ""

# Option 2: Create Free Trial
Write-Host "OPTION 2: Create Free Dynamics 365 Trial" -ForegroundColor Yellow
Write-Host "1. Go to: https://trials.dynamics.com" -ForegroundColor White
Write-Host "2. Sign in with: admin@adminaccountbcd.onmicrosoft.com" -ForegroundColor White
Write-Host "3. Select 'Dynamics 365 Sales' or 'Customer Service'" -ForegroundColor White
Write-Host "4. Start free 30-day trial" -ForegroundColor White
Write-Host "5. Once created, you'll get a URL like:" -ForegroundColor White
Write-Host "   https://orgXXXXXXXX.crm.dynamics.com" -ForegroundColor Green
Write-Host ""

$openTrial = Read-Host "Open Dynamics 365 trial page? (Y/N)"
if ($openTrial -eq 'Y' -or $openTrial -eq 'y') {
    Start-Process "https://trials.dynamics.com"
}

Write-Host ""
Write-Host "OPTION 3: Use Power Apps Instead (No Dynamics Needed)" -ForegroundColor Yellow
Write-Host "We can use Dataverse (included with Power Platform) instead of Dynamics 365" -ForegroundColor White
Write-Host "This is FREE with your existing licenses" -ForegroundColor Green
Write-Host ""

# Option 4: Check via Azure CLI
Write-Host "OPTION 4: Check via Command Line" -ForegroundColor Yellow
Write-Host "Checking for Power Platform environments..." -ForegroundColor White

try {
    # Login first
    az login --tenant "753965c2-2a85-437e-a9c9-9f824df99584" 2>$null | Out-Null
    
    # Try to list environments
    $environments = az rest --method GET `
        --url "https://api.bap.microsoft.com/providers/Microsoft.BusinessAppPlatform/scopes/admin/environments?api-version=2023-06-01" `
        2>$null | ConvertFrom-Json
    
    if ($environments.value) {
        Write-Host "✅ Found environments:" -ForegroundColor Green
        foreach ($env in $environments.value) {
            Write-Host "   Name: $($env.name)" -ForegroundColor White
            Write-Host "   URL: $($env.properties.linkedEnvironmentMetadata.instanceUrl)" -ForegroundColor Cyan
        }
    } else {
        Write-Host "No environments found" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Could not retrieve environments via CLI" -ForegroundColor Gray
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "RECOMMENDED: Skip Dynamics 365!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Since Dynamics 365 isn't set up, we can use alternatives:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. SharePoint Lists (FREE)" -ForegroundColor Green
Write-Host "   - Store customer data in SharePoint lists" -ForegroundColor White
Write-Host "   - Already have SharePoint site ready" -ForegroundColor White
Write-Host "   - No additional licensing needed" -ForegroundColor White
Write-Host ""
Write-Host "2. Azure Table Storage (CHEAP)" -ForegroundColor Green  
Write-Host "   - Store data in Azure Storage tables" -ForegroundColor White
Write-Host "   - Costs < $1/month for your volume" -ForegroundColor White
Write-Host "   - Very fast and reliable" -ForegroundColor White
Write-Host ""
Write-Host "3. SQL Database (ROBUST)" -ForegroundColor Green
Write-Host "   - Azure SQL Database Basic tier" -ForegroundColor White
Write-Host "   - ~$5/month" -ForegroundColor White
Write-Host "   - Full relational database" -ForegroundColor White
Write-Host ""

$skipDynamics = Read-Host "Skip Dynamics 365 and use SharePoint Lists instead? (Y/N)"
if ($skipDynamics -eq 'Y' -or $skipDynamics -eq 'y') {
    Write-Host ""
    Write-Host "✅ Great choice! Let's use SharePoint Lists" -ForegroundColor Green
    Write-Host "Updating configuration to use SharePoint..." -ForegroundColor Yellow
    
    # Update the .env.local to disable Dynamics
    $envPath = "C:\Users\dusta\01-Development\repos\aura-springs-standalone\.env.local"
    $envContent = Get-Content $envPath -Raw
    $envContent = $envContent -replace "DYNAMICS_365_URL=.*", "DYNAMICS_365_URL=DISABLED_USING_SHAREPOINT"
    $envContent | Set-Content $envPath
    
    Write-Host "✅ Configuration updated!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. We'll create SharePoint lists for:" -ForegroundColor White
    Write-Host "   - Customers" -ForegroundColor Gray
    Write-Host "   - Bookings" -ForegroundColor Gray
    Write-Host "   - Services" -ForegroundColor Gray
    Write-Host "   - Invoices" -ForegroundColor Gray
    Write-Host "2. Update the code to use SharePoint instead of Dynamics" -ForegroundColor White
    Write-Host "3. Everything else (Teams, Email, etc.) will work as-is!" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")