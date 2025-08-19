# Add Service Principal as Application User in Dynamics 365
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Adding Service Principal to Dynamics 365" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$appId = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"
$appName = "AuraSpring-Master-Integration"
$dynamicsUrl = "https://mortgagelcdefault.crm.dynamics.com"

Write-Host "Service Principal Details:" -ForegroundColor Yellow
Write-Host "  Application ID: $appId" -ForegroundColor White
Write-Host "  Display Name: $appName" -ForegroundColor White
Write-Host "  Dynamics URL: $dynamicsUrl" -ForegroundColor White
Write-Host ""

# Step 1: Check if Power Platform CLI is installed
Write-Host "Checking for Power Platform CLI..." -ForegroundColor Cyan
$pacInstalled = Get-Command pac -ErrorAction SilentlyContinue

if (-not $pacInstalled) {
    Write-Host "Power Platform CLI not found. Installing..." -ForegroundColor Yellow
    
    # Install Power Platform CLI via npm
    Write-Host "Installing via npm..." -ForegroundColor Gray
    npm install -g @microsoft/powerplatform-cli
    
    # Refresh PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # Check again
    $pacInstalled = Get-Command pac -ErrorAction SilentlyContinue
    if ($pacInstalled) {
        Write-Host "✅ Power Platform CLI installed successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Could not install Power Platform CLI" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install manually from:" -ForegroundColor Yellow
        Write-Host "https://aka.ms/PowerPlatformCLI" -ForegroundColor Cyan
    }
}

if ($pacInstalled) {
    Write-Host "✅ Power Platform CLI is available" -ForegroundColor Green
    Write-Host ""
    
    # Step 2: Authenticate with Power Platform
    Write-Host "Authenticating with Power Platform..." -ForegroundColor Cyan
    Write-Host "This will open a browser window for authentication" -ForegroundColor Gray
    
    try {
        # Clear any existing auth
        pac auth clear 2>$null
        
        # Authenticate
        pac auth create --url $dynamicsUrl
        
        Write-Host "✅ Authenticated successfully" -ForegroundColor Green
        Write-Host ""
        
        # Step 3: Add application user
        Write-Host "Adding application user to Dynamics 365..." -ForegroundColor Cyan
        
        try {
            # Create application user
            pac admin application-user create `
                --application-id $appId `
                --environment-url $dynamicsUrl
            
            Write-Host "✅ Application user created successfully!" -ForegroundColor Green
            
            # Step 4: Assign security role
            Write-Host ""
            Write-Host "Next: Assign security role" -ForegroundColor Yellow
            Write-Host "1. Go to: $dynamicsUrl" -ForegroundColor White
            Write-Host "2. Navigate to: Settings → Security → Users" -ForegroundColor White
            Write-Host "3. Find: $appName" -ForegroundColor White
            Write-Host "4. Click 'Manage Roles'" -ForegroundColor White
            Write-Host "5. Assign: 'System Administrator' or 'System Customizer'" -ForegroundColor White
            
        } catch {
            if ($_.Exception.Message -like "*already exists*") {
                Write-Host "⚠️ Application user already exists" -ForegroundColor Yellow
                Write-Host "   Just need to assign proper security role" -ForegroundColor Gray
            } else {
                Write-Host "❌ Error creating application user: $_" -ForegroundColor Red
            }
        }
        
    } catch {
        Write-Host "❌ Authentication failed: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Manual authentication required" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Manual Steps (if automation fails):" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Via Dynamics 365 UI" -ForegroundColor Cyan
Write-Host "1. Go to: $dynamicsUrl" -ForegroundColor White
Write-Host "2. Navigate to: Settings → Security → Users" -ForegroundColor White
Write-Host "3. Switch view to: 'Application Users'" -ForegroundColor White
Write-Host "4. Click: New → Application User" -ForegroundColor White
Write-Host "5. Enter:" -ForegroundColor White
Write-Host "   - Application ID: $appId" -ForegroundColor Green
Write-Host "   - Full Name: $appName" -ForegroundColor Green
Write-Host "   - Primary Email: auraspring@auraspringcleaning.com" -ForegroundColor Green
Write-Host "6. Save and assign 'System Administrator' role" -ForegroundColor White
Write-Host ""
Write-Host "Option 2: Via Power Platform Admin Center" -ForegroundColor Cyan
Write-Host "1. Go to: https://admin.powerplatform.microsoft.com" -ForegroundColor White
Write-Host "2. Select environment: mortgagelcdefault" -ForegroundColor White
Write-Host "3. Go to: Settings → Users + permissions → Application users" -ForegroundColor White
Write-Host "4. Click: + New app user" -ForegroundColor White
Write-Host "5. Search for: $appId" -ForegroundColor White
Write-Host "6. Add and assign security role" -ForegroundColor White
Write-Host ""

# Open Power Platform Admin Center
$openAdmin = Read-Host "Open Power Platform Admin Center now? (Y/N)"
if ($openAdmin -eq 'Y' -or $openAdmin -eq 'y') {
    Start-Process "https://admin.powerplatform.microsoft.com/environments"
}

Write-Host ""
Write-Host "After adding the application user, test with:" -ForegroundColor Yellow
Write-Host "powershell.exe -File scripts\check-dynamics-access.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")