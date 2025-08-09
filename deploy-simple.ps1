# Simple Azure Deployment Script for Aura Spring Cleaning
# This script deploys the built Next.js app to Azure Static Web Apps

Write-Host "Deploying Aura Spring Cleaning to Azure..." -ForegroundColor Cyan

# Check if Azure CLI is installed
$azVersion = az version 2>$null
if (-not $azVersion) {
    Write-Host "Azure CLI is not installed. Please install it from https://aka.ms/installazurecliwindows" -ForegroundColor Red
    exit 1
}

# Check if logged in to Azure
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "Please log in to Azure..." -ForegroundColor Yellow
    az login
}

# Set variables
$resourceGroup = "rg-auraspringcleaning-prod"
$location = "centralus"
$appName = "auraspringcleaning"

# Check if build exists
if (-not (Test-Path ".next")) {
    Write-Host "Building application..." -ForegroundColor Yellow
    npm run build
}

# Create resource group if it doesn't exist
Write-Host "Checking resource group..." -ForegroundColor Yellow
$rgExists = az group exists --name $resourceGroup | ConvertFrom-Json
if (-not $rgExists) {
    Write-Host "Creating resource group: $resourceGroup" -ForegroundColor Green
    az group create --name $resourceGroup --location $location
}

# Deploy to Azure Static Web Apps
Write-Host "Deploying to Azure Static Web Apps..." -ForegroundColor Yellow

# Check if static web app exists
$swaExists = az staticwebapp show --name $appName --resource-group $resourceGroup 2>$null
if (-not $swaExists) {
    Write-Host "Creating Static Web App: $appName" -ForegroundColor Green
    az staticwebapp create `
        --name $appName `
        --resource-group $resourceGroup `
        --source . `
        --location $location `
        --branch main `
        --app-location "/" `
        --output-location ".next" `
        --sku Free
}

# Get deployment token
$deploymentToken = az staticwebapp secrets list --name $appName --resource-group $resourceGroup --query "properties.apiKey" -o tsv

if ($deploymentToken) {
    Write-Host "Deployment token retrieved" -ForegroundColor Green
    
    # Deploy using SWA CLI (if installed)
    $swaCliExists = Get-Command swa -ErrorAction SilentlyContinue
    if ($swaCliExists) {
        Write-Host "Deploying with SWA CLI..." -ForegroundColor Yellow
        swa deploy --deployment-token $deploymentToken --app-location . --output-location .next
    } else {
        Write-Host "Installing SWA CLI..." -ForegroundColor Yellow
        npm install -g @azure/static-web-apps-cli
        swa deploy --deployment-token $deploymentToken --app-location . --output-location .next
    }
} else {
    Write-Host "Could not retrieve deployment token" -ForegroundColor Red
    exit 1
}

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Your site will be available at: https://$appName.azurestaticapps.net" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure custom domain in Azure Portal" -ForegroundColor White
Write-Host "2. Set up environment variables in Azure Portal > Configuration" -ForegroundColor White
Write-Host "3. Monitor your app in Azure Portal > Application Insights" -ForegroundColor White