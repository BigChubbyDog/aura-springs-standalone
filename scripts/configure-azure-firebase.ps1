# PowerShell script to configure Azure App Service for Firebase integration
# Run this after deploying your app to Azure

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "rg-auraspringcleaning-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$AppServiceName = "auraspringcleaning",
    
    [Parameter(Mandatory=$false)]
    [string]$ServiceAccountKeyPath = ".\serviceAccountKey.json"
)

Write-Host "🚀 Configuring Azure App Service for Firebase Integration" -ForegroundColor Cyan

# Check if Azure CLI is installed
if (!(Get-Command az -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Azure CLI is not installed. Please install it first." -ForegroundColor Red
    exit 1
}

# Check if logged in to Azure
$account = az account show 2>$null
if (!$account) {
    Write-Host "🔐 Please log in to Azure..." -ForegroundColor Yellow
    az login
}

Write-Host "✅ Connected to Azure" -ForegroundColor Green

# Function to set app settings
function Set-AppSetting {
    param(
        [string]$Name,
        [string]$Value,
        [bool]$IsSecret = $false
    )
    
    if ($IsSecret) {
        Write-Host "  🔒 Setting $Name (secret)" -ForegroundColor Gray
    } else {
        Write-Host "  📝 Setting $Name" -ForegroundColor Gray
    }
    
    az webapp config appsettings set `
        --resource-group $ResourceGroup `
        --name $AppServiceName `
        --settings "$Name=$Value" `
        --output none
}

Write-Host "`n📋 Configuring Firebase environment variables..." -ForegroundColor Cyan

# Firebase configuration
Set-AppSetting -Name "FIREBASE_PROJECT_ID" -Value "aura-spring-cleaning-ce122"
Set-AppSetting -Name "FIREBASE_CLIENT_EMAIL" -Value "firebase-adminsdk-fbsvc@aura-spring-cleaning-ce122.iam.gserviceaccount.com"

# Read service account key if it exists
if (Test-Path $ServiceAccountKeyPath) {
    Write-Host "  📄 Found service account key file" -ForegroundColor Green
    $serviceAccount = Get-Content $ServiceAccountKeyPath | ConvertFrom-Json
    
    # Extract and set private key
    if ($serviceAccount.private_key) {
        # Replace newlines with \n for environment variable
        $privateKey = $serviceAccount.private_key -replace "`r`n", "\n" -replace "`n", "\n"
        Set-AppSetting -Name "FIREBASE_PRIVATE_KEY" -Value $privateKey -IsSecret $true
        Write-Host "  ✅ Firebase private key configured" -ForegroundColor Green
    }
} else {
    Write-Host "  ⚠️  No service account key file found. You'll need to set FIREBASE_PRIVATE_KEY manually in Azure Portal" -ForegroundColor Yellow
}

Write-Host "`n📋 Configuring Teams Webhook..." -ForegroundColor Cyan
$teamsWebhook = "https://adminaccountbcd.webhook.office.com/webhookb2/df9b5b12-f537-435b-a578-c6f540ae7c5c@753965c2-2a85-437e-a9c9-9f824df99584/IncomingWebhook/ade6e7bcf89a420f97b09dd6ca021bbc/85ae95d7-aee8-44ea-8e78-af97c72fa4a9/V2ChyK7Cl-K-zvRJAyxjNAJe8th0jh-73cKcm4Wdw7mfY1"
Set-AppSetting -Name "TEAMS_WEBHOOK_URL" -Value $teamsWebhook -IsSecret $true

Write-Host "`n📋 Configuring Email settings..." -ForegroundColor Cyan
Set-AppSetting -Name "SMTP_HOST" -Value "smtp.gmail.com"
Set-AppSetting -Name "SMTP_PORT" -Value "587"
Set-AppSetting -Name "SMTP_USER" -Value "Mail@auraspringcleaning.com"
Set-AppSetting -Name "EMAIL_TO" -Value "valerie@auraspringcleaning.com"
Set-AppSetting -Name "EMAIL_CC" -Value "dustin@auraspringcleaning.com"

Write-Host "`n📋 Configuring CORS..." -ForegroundColor Cyan
az webapp cors add `
    --resource-group $ResourceGroup `
    --name $AppServiceName `
    --allowed-origins "https://auraspringcleaning.com" "https://www.auraspringcleaning.com" "https://auraspringcleaning.azurewebsites.net" `
    --output none

Write-Host "  ✅ CORS configured" -ForegroundColor Green

Write-Host "`n📋 Enabling Always On..." -ForegroundColor Cyan
az webapp config set `
    --resource-group $ResourceGroup `
    --name $AppServiceName `
    --always-on true `
    --output none

Write-Host "  ✅ Always On enabled" -ForegroundColor Green

Write-Host "`n📋 Setting Node.js version..." -ForegroundColor Cyan
az webapp config appsettings set `
    --resource-group $ResourceGroup `
    --name $AppServiceName `
    --settings WEBSITE_NODE_DEFAULT_VERSION="~20" `
    --output none

Write-Host "  ✅ Node.js 20 configured" -ForegroundColor Green

Write-Host "`n📋 Restarting App Service..." -ForegroundColor Cyan
az webapp restart `
    --resource-group $ResourceGroup `
    --name $AppServiceName `
    --output none

Write-Host "  ✅ App Service restarted" -ForegroundColor Green

Write-Host "`n✨ Configuration Complete!" -ForegroundColor Green
Write-Host "`n📌 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. If you haven't set FIREBASE_PRIVATE_KEY, add it manually in Azure Portal"
Write-Host "  2. Add SMTP_PASSWORD for email notifications in Azure Portal"
Write-Host "  3. Add Stripe keys if using payment processing"
Write-Host "  4. Test the booking system at https://$AppServiceName.azurewebsites.net/booking"
Write-Host "`n📊 Monitor your app at: https://portal.azure.com" -ForegroundColor Blue
Write-Host "🔥 Firebase Console: https://console.firebase.google.com/project/aura-spring-cleaning-ce122" -ForegroundColor Blue