# Save Aura Spring Cleaning Secrets to Azure Key Vault
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Saving Secrets to Azure Key Vault" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Key Vault details - Using existing BCD Key Vault
$keyVaultName = "bcd-keyvault"
$resourceGroup = "BigChubbyDog"
$location = "centralus"

# Check if logged in to Azure
Write-Host "Checking Azure login status..." -ForegroundColor Yellow
$account = az account show 2>$null | ConvertFrom-Json

if (-not $account) {
    Write-Host "Not logged in to Azure. Logging in..." -ForegroundColor Yellow
    az login
    $account = az account show | ConvertFrom-Json
}

Write-Host "✅ Logged in as: $($account.user.name)" -ForegroundColor Green
Write-Host "   Subscription: $($account.name)" -ForegroundColor Gray
Write-Host ""

# Use existing BCD Key Vault
Write-Host "Using existing BCD Key Vault: $keyVaultName" -ForegroundColor Yellow
Write-Host "✅ Key Vault: $keyVaultName" -ForegroundColor Green

Write-Host ""
Write-Host "Saving secrets to Key Vault..." -ForegroundColor Yellow
Write-Host ""

# Function to save secret
function Save-Secret {
    param(
        [string]$Name,
        [string]$Value,
        [string]$Description
    )
    
    if ([string]::IsNullOrWhiteSpace($Value) -or $Value -eq "test_" -or $Value -like "test_*") {
        Write-Host "⚠️  Skipping $Name (no real value)" -ForegroundColor Yellow
        return
    }
    
    Write-Host "   Saving: $Name" -ForegroundColor Gray
    
    # Replace underscores with hyphens for Key Vault (it doesn't allow underscores)
    $kvName = $Name.Replace("_", "-").Replace("NEXT-PUBLIC-", "")
    
    az keyvault secret set `
        --vault-name $keyVaultName `
        --name $kvName `
        --value $Value `
        --tags "Description=$Description" "Project=AuraSpringCleaning" `
        --output none
    
    Write-Host "   ✅ $kvName saved" -ForegroundColor Green
}

# Load .env.local
$envFile = ".env.local"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ .env.local not found!" -ForegroundColor Red
    exit 1
}

# Parse .env.local
$envContent = Get-Content $envFile
$secrets = @{}

foreach ($line in $envContent) {
    if ($line -match "^([A-Z_]+)=(.+)$") {
        $key = $matches[1]
        $value = $matches[2]
        $secrets[$key] = $value
    }
}

# Critical Secrets to Save
Write-Host "1. Teams Webhook" -ForegroundColor Cyan
Save-Secret -Name "TEAMS-WEBHOOK-URL" `
    -Value $secrets["TEAMS_WEBHOOK_URL"] `
    -Description "Microsoft Teams webhook for notifications"

Write-Host ""
Write-Host "2. Contact Information" -ForegroundColor Cyan
Save-Secret -Name "PRIMARY-PHONE" `
    -Value "(512) 781-0527" `
    -Description "Valerie's phone number"

Save-Secret -Name "PRIMARY-EMAIL" `
    -Value "valerie@auraspringcleaning.com" `
    -Description "Valerie's email for leads"

Write-Host ""
Write-Host "3. Firebase Configuration" -ForegroundColor Cyan
Save-Secret -Name "FIREBASE-API-KEY" `
    -Value $secrets["NEXT_PUBLIC_FIREBASE_API_KEY"] `
    -Description "Firebase Web API Key"

Save-Secret -Name "FIREBASE-APP-ID" `
    -Value $secrets["NEXT_PUBLIC_FIREBASE_APP_ID"] `
    -Description "Firebase Web App ID"

Save-Secret -Name "FIREBASE-PROJECT-ID" `
    -Value "aura-spring-cleaning-ce122" `
    -Description "Firebase Project ID"

Save-Secret -Name "FIREBASE-MESSAGING-SENDER-ID" `
    -Value $secrets["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"] `
    -Description "Firebase Cloud Messaging Sender ID"

Save-Secret -Name "FIREBASE-VAPID-KEY" `
    -Value $secrets["NEXT_PUBLIC_VAPID_KEY"] `
    -Description "Firebase Web Push VAPID Key"

Write-Host ""
Write-Host "4. Google AI Configuration" -ForegroundColor Cyan
Save-Secret -Name "GOOGLE-AI-API-KEY" `
    -Value $secrets["GOOGLE_AI_API_KEY"] `
    -Description "Google AI/Gemini API Key"

Write-Host ""
Write-Host "5. Service Account (Base64 Encoded)" -ForegroundColor Cyan
if (Test-Path "serviceAccountKey.json") {
    $serviceAccountContent = Get-Content "serviceAccountKey.json" -Raw
    $serviceAccountBase64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($serviceAccountContent))
    
    Save-Secret -Name "FIREBASE-SERVICE-ACCOUNT-BASE64" `
        -Value $serviceAccountBase64 `
        -Description "Firebase Admin SDK Service Account (Base64)"
        
    Write-Host "   [INFO] Service account saved as Base64" -ForegroundColor Gray
}

Write-Host ""
Write-Host "6. Payment Processing (if configured)" -ForegroundColor Cyan
Save-Secret -Name "STRIPE-SECRET-KEY" `
    -Value $secrets["STRIPE_SECRET_KEY"] `
    -Description "Stripe Secret Key"

Save-Secret -Name "STRIPE-PUBLISHABLE-KEY" `
    -Value $secrets["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"] `
    -Description "Stripe Publishable Key"

Write-Host ""
Write-Host "7. Analytics (if configured)" -ForegroundColor Cyan
Save-Secret -Name "GA-ID" `
    -Value $secrets["NEXT_PUBLIC_GA_ID"] `
    -Description "Google Analytics ID"

Save-Secret -Name "FB-PIXEL-ID" `
    -Value $secrets["NEXT_PUBLIC_FB_PIXEL_ID"] `
    -Description "Facebook Pixel ID"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Secrets Saved to Azure Key Vault!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Display Key Vault details
Write-Host "Key Vault Details:" -ForegroundColor Cyan
Write-Host "  Name: $keyVaultName" -ForegroundColor White
Write-Host "  Resource Group: $resourceGroup" -ForegroundColor White
Write-Host "  URL: https://$keyVaultName.vault.azure.net/" -ForegroundColor White
Write-Host ""

# List all secrets
Write-Host "Saved Secrets:" -ForegroundColor Cyan
$savedSecrets = az keyvault secret list --vault-name $keyVaultName | ConvertFrom-Json

foreach ($secret in $savedSecrets) {
    if ($secret.tags -and $secret.tags.Project -eq "AuraSpringCleaning") {
        $name = $secret.name.Split('/')[-1]
        Write-Host "  ✅ $name" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "To retrieve a secret:" -ForegroundColor Yellow
Write-Host "  az keyvault secret show --vault-name $keyVaultName --name SECRET-NAME --query value -o tsv" -ForegroundColor Gray
Write-Host ""

Write-Host "To use in Azure App Service:" -ForegroundColor Yellow
Write-Host "  1. Enable Managed Identity on your App Service" -ForegroundColor Gray
Write-Host "  2. Grant the identity access to this Key Vault" -ForegroundColor Gray
Write-Host '  3. Reference secrets as: @Microsoft.KeyVault(SecretUri=...)' -ForegroundColor Gray
Write-Host ""

Write-Host "Portal Link:" -ForegroundColor Cyan
$portalUrl = "https://portal.azure.com/#blade/Microsoft_Azure_KeyVault/Vault/" + $keyVaultName
Write-Host "  $portalUrl" -ForegroundColor Blue