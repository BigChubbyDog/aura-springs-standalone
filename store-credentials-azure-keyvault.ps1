# Store Aura Spring Cleaning Credentials in Azure Key Vault
Write-Host "=== STORING CREDENTIALS IN AZURE KEY VAULT ===" -ForegroundColor Cyan
Write-Host ""

# Azure Key Vault Configuration
$keyVaultName = "bcd-keyvault"  # Your BigChubbyDog Key Vault
$resourceGroup = "rg-auraspringcleaning-prod"

# Login to Azure (if not already logged in)
Write-Host "Checking Azure login status..." -ForegroundColor Yellow
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "Please login to Azure..." -ForegroundColor Yellow
    az login
}

# Credentials gathered today
$credentials = @{
    # GitHub App Configuration
    "github-app-name" = "bigchubbydog-bot-web"
    "github-app-id" = "1790698"
    "github-client-id" = "Iv23liuwA60K1mnPEhu4"
    "github-client-secret" = "cb289fe7e4ceb7b3d248f82c2a800d0fcc70371a"
    "github-webhook-secret" = "bigchubbydog-secret-2025-nmls2044646"
    
    # Google Services
    "google-analytics-id" = "G-JB55XBQ8Y3"
    "google-tag-manager-id" = "GTM-NCMQXRKL"
    "google-site-verification" = "YOUR_CODE_HERE"  # Placeholder
    
    # Facebook/Meta
    "facebook-pixel-id" = "753683467224168"
    "facebook-domain-verification" = "pnbwtozgdfalnrrcodc3fu0h3qoeum"
    
    # Business Contact (Public info - not secrets)
    # Note: Valerie's number (512-781-0527) is public business info, not stored here
    "teams-phone" = "737-330-1489"
    "business-email" = "info@auraspringcleaning.com"
    
    # GitHub Accounts (for reference)
    "github-primary-account" = "PersonalBigChubbyDog"
    "github-personal-account" = "dallan1986"
    "github-bot-account" = "BigChubbyDog-BOT"
    "github-admin-account" = "AllAcctAdminBCD"
    
    # API Keys (placeholders - add real values)
    "stripe-publishable-key" = "pk_test_placeholder"
    "stripe-secret-key" = "sk_test_placeholder"
    "twilio-account-sid" = "AC_placeholder"
    "twilio-auth-token" = "auth_placeholder"
    "sendgrid-api-key" = "SG.placeholder"
    
    # Azure Resources
    "azure-subscription-id" = "YOUR_SUBSCRIPTION_ID"
    "azure-tenant-id" = "YOUR_TENANT_ID"
    
    # Domains
    "primary-domain" = "auraspringcleaning.com"
    "secondary-domain" = "aurasprings.com"
}

Write-Host "Found $($credentials.Count) credentials to store" -ForegroundColor Green
Write-Host ""

# Check if Key Vault exists
Write-Host "Checking Key Vault: $keyVaultName" -ForegroundColor Yellow
$kvExists = az keyvault show --name $keyVaultName --resource-group $resourceGroup 2>$null

if (-not $kvExists) {
    Write-Host "Creating Key Vault: $keyVaultName" -ForegroundColor Yellow
    az keyvault create `
        --name $keyVaultName `
        --resource-group $resourceGroup `
        --location "centralus" `
        --sku standard
}

Write-Host ""
Write-Host "Storing credentials in Key Vault..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($key in $credentials.Keys) {
    $secretName = $key
    $secretValue = $credentials[$key]
    
    Write-Host -NoNewline "Storing $secretName... " -ForegroundColor White
    
    try {
        # Store secret in Key Vault
        $result = az keyvault secret set `
            --vault-name $keyVaultName `
            --name $secretName `
            --value $secretValue `
            2>$null
        
        if ($result) {
            Write-Host "✓ Success" -ForegroundColor Green
            $successCount++
        } 
        else {
            Write-Host "✗ Failed" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "=== STORAGE COMPLETE ===" -ForegroundColor Cyan
Write-Host "✓ Stored: $successCount secrets" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "✗ Failed: $failCount secrets" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== HOW TO RETRIEVE SECRETS ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "PowerShell:" -ForegroundColor Yellow
Write-Host '  $secret = az keyvault secret show --name "github-app-id" --vault-name "bcd-keyvault" --query value -o tsv' -ForegroundColor White
Write-Host ""
Write-Host "Azure CLI:" -ForegroundColor Yellow
Write-Host '  az keyvault secret show --name github-app-id --vault-name bcd-keyvault' -ForegroundColor White
Write-Host ""
Write-Host "In Code (.env.local):" -ForegroundColor Yellow
Write-Host '  GITHUB_APP_ID=@Microsoft.KeyVault(SecretUri=https://bcd-keyvault.vault.azure.net/secrets/github-app-id/)' -ForegroundColor White
Write-Host ""

# Create environment variable template
Write-Host "=== CREATING ENV TEMPLATE ===" -ForegroundColor Cyan
$envTemplate = @"
# Azure Key Vault References for Aura Spring Cleaning
# Copy these to your .env.local or App Service Configuration

# GitHub App
GITHUB_APP_NAME=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/github-app-name/)
GITHUB_APP_ID=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/github-app-id/)
GITHUB_CLIENT_ID=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/github-client-id/)
GITHUB_CLIENT_SECRET=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/github-client-secret/)
GITHUB_WEBHOOK_SECRET=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/github-webhook-secret/)

# Google Services
NEXT_PUBLIC_GA_ID=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/google-analytics-id/)
NEXT_PUBLIC_GTM_ID=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/google-tag-manager-id/)
GOOGLE_SITE_VERIFICATION=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/google-site-verification/)

# Facebook/Meta
NEXT_PUBLIC_FB_PIXEL_ID=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/facebook-pixel-id/)
FACEBOOK_DOMAIN_VERIFICATION=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/facebook-domain-verification/)

# Payment Processing
STRIPE_PUBLISHABLE_KEY=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/stripe-publishable-key/)
STRIPE_SECRET_KEY=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/stripe-secret-key/)

# Communications
TWILIO_ACCOUNT_SID=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/twilio-account-sid/)
TWILIO_AUTH_TOKEN=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/twilio-auth-token/)
SENDGRID_API_KEY=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/sendgrid-api-key/)

# Business Info
BUSINESS_PHONE=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/business-phone/)
BUSINESS_EMAIL=@Microsoft.KeyVault(SecretUri=https://$keyVaultName.vault.azure.net/secrets/business-email/)
"@

$envTemplate | Out-File -FilePath "keyvault-env-template.txt" -Encoding utf8
Write-Host "Environment template saved to: keyvault-env-template.txt" -ForegroundColor Green

Write-Host ""
Write-Host "=== IMPORTANT NOTES ===" -ForegroundColor Yellow
Write-Host "1. Enable Managed Identity on your Azure App Service" -ForegroundColor White
Write-Host "2. Grant the App Service access to Key Vault secrets" -ForegroundColor White
Write-Host "3. Use Key Vault references in App Service Configuration" -ForegroundColor White
Write-Host "4. Never commit secrets directly to source control" -ForegroundColor White
Write-Host ""
Write-Host "Done! Your credentials are now securely stored in Azure Key Vault." -ForegroundColor Green