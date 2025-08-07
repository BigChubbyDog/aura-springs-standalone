# Deploy Aura Spring Cleaning to Azure
# Uses Service Principal authentication

param(
    [Parameter(Mandatory=$false)]
    [string]$Environment = "production",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "rg-auraspringcleaning-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$AppServicePlan = "asp-auraspringcleaning-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$WebAppName = "auraspringcleaning",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "southcentralus"
)

# Service Principal Credentials (set these as environment variables)
$tenantId = $env:AZURE_TENANT_ID
$clientId = $env:AZURE_CLIENT_ID
$clientSecret = $env:AZURE_CLIENT_SECRET

if (-not $tenantId -or -not $clientId -or -not $clientSecret) {
    Write-Host "❌ Azure credentials not found in environment variables" -ForegroundColor Red
    Write-Host "Please set AZURE_TENANT_ID, AZURE_CLIENT_ID, and AZURE_CLIENT_SECRET" -ForegroundColor Yellow
    exit 1
}

Write-Host "🚀 Starting Azure deployment for Aura Spring Cleaning..." -ForegroundColor Cyan

# Login to Azure using Service Principal
Write-Host "Authenticating with Azure..." -ForegroundColor Yellow
$securePassword = ConvertTo-SecureString $clientSecret -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($clientId, $securePassword)
Connect-AzAccount -ServicePrincipal -Credential $credential -Tenant $tenantId

# Create Resource Group if it doesn't exist
Write-Host "Checking Resource Group..." -ForegroundColor Yellow
$rg = Get-AzResourceGroup -Name $ResourceGroup -ErrorAction SilentlyContinue
if (-not $rg) {
    Write-Host "Creating Resource Group: $ResourceGroup" -ForegroundColor Green
    New-AzResourceGroup -Name $ResourceGroup -Location $Location
}

# Create App Service Plan if it doesn't exist
Write-Host "Checking App Service Plan..." -ForegroundColor Yellow
$plan = Get-AzAppServicePlan -ResourceGroupName $ResourceGroup -Name $AppServicePlan -ErrorAction SilentlyContinue
if (-not $plan) {
    Write-Host "Creating App Service Plan: $AppServicePlan" -ForegroundColor Green
    New-AzAppServicePlan -ResourceGroupName $ResourceGroup `
                         -Name $AppServicePlan `
                         -Location $Location `
                         -Tier "Standard" `
                         -WorkerSize "Small" `
                         -Linux
}

# Create Web App if it doesn't exist
Write-Host "Checking Web App..." -ForegroundColor Yellow
$webapp = Get-AzWebApp -ResourceGroupName $ResourceGroup -Name $WebAppName -ErrorAction SilentlyContinue
if (-not $webapp) {
    Write-Host "Creating Web App: $WebAppName" -ForegroundColor Green
    New-AzWebApp -ResourceGroupName $ResourceGroup `
                 -Name $WebAppName `
                 -AppServicePlan $AppServicePlan `
                 -Runtime "NODE:20-lts"
}

# Configure App Settings
Write-Host "Configuring App Settings..." -ForegroundColor Yellow
$appSettings = @{
    "WEBSITE_NODE_DEFAULT_VERSION" = "~20"
    "NEXT_PUBLIC_SITE_URL" = "https://auraspringcleaning.com"
    "NEXT_PUBLIC_SITE_NAME" = "Aura Spring Cleaning"
    "NODE_ENV" = $Environment
    "NEXT_PUBLIC_AZURE_TENANT_ID" = $tenantId
    "NEXT_PUBLIC_AZURE_CLIENT_ID" = $clientId
    "AZURE_CLIENT_SECRET" = $clientSecret
    "DYNAMICS_365_URL" = "https://org829637ae.crm.dynamics.com"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" = $env:STRIPE_PUBLISHABLE_KEY
    "UNSPLASH_ACCESS_KEY" = "wjEgF3Q1KnH_BnMRJ1GO4s2ZULbOnHdBArClj66HR8g"
    "PEXELS_API_KEY" = "3wtvEl6J6LD0Bx43Gcf6MSrYW4xJIpUgtMQ48rvLNdtFrIitGAB2SKr0"
}

Set-AzWebApp -ResourceGroupName $ResourceGroup `
             -Name $WebAppName `
             -AppSettings $appSettings

# Build the application
Write-Host "Building Next.js application..." -ForegroundColor Yellow
npm ci
npm run build

# Create deployment package
Write-Host "Creating deployment package..." -ForegroundColor Yellow
$zipPath = ".\deploy.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

# Create zip file with all necessary files
Compress-Archive -Path @(
    ".\*"
) -DestinationPath $zipPath -Force -CompressionLevel Optimal

# Deploy to Azure
Write-Host "Deploying to Azure Web App..." -ForegroundColor Yellow
Publish-AzWebApp -ResourceGroupName $ResourceGroup `
                 -Name $WebAppName `
                 -ArchivePath $zipPath `
                 -Force

# Configure custom domain
Write-Host "Configuring custom domain..." -ForegroundColor Yellow
$customDomains = @("auraspringcleaning.com", "www.auraspringcleaning.com")
foreach ($domain in $customDomains) {
    Write-Host "Adding domain: $domain" -ForegroundColor Green
    Set-AzWebApp -ResourceGroupName $ResourceGroup `
                 -Name $WebAppName `
                 -HostNames @($domain, "$WebAppName.azurewebsites.net")
}

# Enable HTTPS only
Write-Host "Enabling HTTPS only..." -ForegroundColor Yellow
Set-AzWebApp -ResourceGroupName $ResourceGroup `
             -Name $WebAppName `
             -HttpsOnly $true

# Create Azure Key Vault for secrets
Write-Host "Setting up Key Vault..." -ForegroundColor Yellow
$keyVaultName = "kv-auraspringcleaning"
$keyVault = Get-AzKeyVault -ResourceGroupName $ResourceGroup -VaultName $keyVaultName -ErrorAction SilentlyContinue
if (-not $keyVault) {
    Write-Host "Creating Key Vault: $keyVaultName" -ForegroundColor Green
    New-AzKeyVault -ResourceGroupName $ResourceGroup `
                   -VaultName $keyVaultName `
                   -Location $Location `
                   -EnabledForDeployment `
                   -EnabledForTemplateDeployment `
                   -EnabledForDiskEncryption
}

# Store secrets in Key Vault
Write-Host "Storing secrets in Key Vault..." -ForegroundColor Yellow
$secrets = @{
    "AzureClientSecret" = $clientSecret
    "StripeSecretKey" = $env:STRIPE_SECRET_KEY
    "CosmosDBKey" = "your-cosmos-key"
}

foreach ($key in $secrets.Keys) {
    $secretValue = ConvertTo-SecureString $secrets[$key] -AsPlainText -Force
    Set-AzKeyVaultSecret -VaultName $keyVaultName -Name $key -SecretValue $secretValue
}

# Enable Application Insights
Write-Host "Setting up Application Insights..." -ForegroundColor Yellow
$appInsightsName = "ai-auraspringcleaning"
$appInsights = Get-AzApplicationInsights -ResourceGroupName $ResourceGroup -Name $appInsightsName -ErrorAction SilentlyContinue
if (-not $appInsights) {
    Write-Host "Creating Application Insights: $appInsightsName" -ForegroundColor Green
    New-AzApplicationInsights -ResourceGroupName $ResourceGroup `
                              -Name $appInsightsName `
                              -Location $Location `
                              -Kind web
}

# Link Application Insights to Web App
$appInsights = Get-AzApplicationInsights -ResourceGroupName $ResourceGroup -Name $appInsightsName
Set-AzWebApp -ResourceGroupName $ResourceGroup `
             -Name $WebAppName `
             -AppSettings @{ "APPINSIGHTS_INSTRUMENTATIONKEY" = $appInsights.InstrumentationKey }

# Clean up
Remove-Item $zipPath -Force

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your site is available at: https://auraspringcleaning.com" -ForegroundColor Cyan
Write-Host "📊 Azure Portal: https://portal.azure.com" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure DNS records for auraspringcleaning.com to point to Azure" -ForegroundColor White
Write-Host "2. Set up SSL certificate in Azure Portal" -ForegroundColor White
Write-Host "3. Configure backup and disaster recovery" -ForegroundColor White
Write-Host "4. Set up staging environment" -ForegroundColor White