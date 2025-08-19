# Azure Service Principal Secret Renewal Guide
# Run this script to get step-by-step instructions or auto-renew if you have Azure CLI

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Azure Service Principal Secret Renewal" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$servicePrincipals = @(
    @{
        Name = "Claude-Master-Automation"
        AppId = "94d3924d-79c4-4280-975d-8223752343b8"
        Purpose = "SharePoint, Teams Calendar, Graph API"
    },
    @{
        Name = "AuraSpring-Master-Integration"
        AppId = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"
        Purpose = "Dynamics 365 CRM Integration"
    }
)

Write-Host "Service Principals needing new secrets:" -ForegroundColor Yellow
foreach ($sp in $servicePrincipals) {
    Write-Host "  - $($sp.Name): $($sp.AppId)" -ForegroundColor White
    Write-Host "    Purpose: $($sp.Purpose)" -ForegroundColor Gray
}
Write-Host ""

# Check if Azure CLI is installed
$azInstalled = Get-Command az -ErrorAction SilentlyContinue
if ($azInstalled) {
    Write-Host "Azure CLI detected! You can renew automatically." -ForegroundColor Green
    $autoRenew = Read-Host "Do you want to automatically renew the secrets? (Y/N)"
    
    if ($autoRenew -eq 'Y' -or $autoRenew -eq 'y') {
        Write-Host ""
        Write-Host "Logging into Azure..." -ForegroundColor Yellow
        az login
        
        foreach ($sp in $servicePrincipals) {
            Write-Host ""
            Write-Host "Renewing secret for: $($sp.Name)" -ForegroundColor Cyan
            
            try {
                # Create new secret (valid for 2 years)
                $endDate = (Get-Date).AddYears(2).ToString("yyyy-MM-dd")
                $result = az ad app credential reset `
                    --id $sp.AppId `
                    --years 2 `
                    --append `
                    --query password `
                    --output tsv
                
                if ($result) {
                    Write-Host "✅ New secret generated for $($sp.Name)" -ForegroundColor Green
                    Write-Host "   New Secret: " -NoNewline
                    Write-Host $result -ForegroundColor Yellow
                    Write-Host ""
                    Write-Host "   Add this to your .env.local file:" -ForegroundColor Cyan
                    
                    if ($sp.Name -eq "Claude-Master-Automation") {
                        Write-Host "   AZURE_CLIENT_SECRET=$result" -ForegroundColor White
                    } else {
                        Write-Host "   DYNAMICS_365_CLIENT_SECRET=$result" -ForegroundColor White
                        Write-Host "   AURASPRING_CLIENT_SECRET=$result" -ForegroundColor White
                    }
                } else {
                    Write-Host "❌ Failed to generate secret for $($sp.Name)" -ForegroundColor Red
                }
            } catch {
                Write-Host "❌ Error: $_" -ForegroundColor Red
            }
        }
        
        Write-Host ""
        Write-Host "================================" -ForegroundColor Green
        Write-Host "Secret renewal complete!" -ForegroundColor Green
        Write-Host "Update your .env.local file with the new secrets above." -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "Azure CLI not detected. Follow manual steps below:" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== MANUAL RENEWAL STEPS ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to Azure Portal: https://portal.azure.com" -ForegroundColor White
Write-Host ""
Write-Host "2. Navigate to: Azure Active Directory > App registrations" -ForegroundColor White
Write-Host ""
Write-Host "3. For EACH app above:" -ForegroundColor White
Write-Host "   a. Search for the App ID" -ForegroundColor Gray
Write-Host "   b. Click on the app name" -ForegroundColor Gray
Write-Host "   c. Go to 'Certificates & secrets' in left menu" -ForegroundColor Gray
Write-Host "   d. Click '+ New client secret'" -ForegroundColor Gray
Write-Host "   e. Description: 'Aura Spring Integration - $(Get-Date -Format 'yyyy-MM')'" -ForegroundColor Gray
Write-Host "   f. Expires: 24 months (recommended)" -ForegroundColor Gray
Write-Host "   g. Click 'Add'" -ForegroundColor Gray
Write-Host "   h. IMMEDIATELY copy the 'Value' (not the ID!)" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Update .env.local with new secrets:" -ForegroundColor White
Write-Host ""
Write-Host "   For Claude-Master-Automation:" -ForegroundColor Cyan
Write-Host "   AZURE_CLIENT_SECRET=<new-secret-value>" -ForegroundColor Gray
Write-Host ""
Write-Host "   For AuraSpring-Master-Integration:" -ForegroundColor Cyan
Write-Host "   DYNAMICS_365_CLIENT_SECRET=<new-secret-value>" -ForegroundColor Gray
Write-Host "   AURASPRING_CLIENT_SECRET=<new-secret-value>" -ForegroundColor Gray
Write-Host ""

Write-Host "=== IMPORTANT NOTES ===" -ForegroundColor Red
Write-Host "• Copy the secret VALUE, not the Secret ID" -ForegroundColor Yellow
Write-Host "• You can't view the secret again after leaving the page" -ForegroundColor Yellow
Write-Host "• Old secrets remain valid until expiry (you can delete them)" -ForegroundColor Yellow
Write-Host "• Test immediately after updating .env.local" -ForegroundColor Yellow
Write-Host ""

Write-Host "After updating secrets, test with:" -ForegroundColor Green
Write-Host "npx tsx scripts/test-microsoft-ecosystem.ts" -ForegroundColor White
Write-Host ""

# Option to open Azure Portal
$openPortal = Read-Host "Open Azure Portal in browser? (Y/N)"
if ($openPortal -eq 'Y' -or $openPortal -eq 'y') {
    Start-Process "https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps"
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")