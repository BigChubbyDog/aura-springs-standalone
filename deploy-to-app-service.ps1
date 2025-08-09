# Deploy to Azure App Service
# Requires Azure CLI and environment variables to be set

Write-Host "Deploying to Azure App Service..." -ForegroundColor Cyan

# Check if logged in
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "Please login to Azure first using: az login" -ForegroundColor Yellow
    exit 1
}

$resourceGroup = "rg-auraspringcleaning-prod"
$appName = "auraspringcleaning-app"

# Build the application
Write-Host "Building application..." -ForegroundColor Yellow
npm ci
npm run build

# Create deployment package
Write-Host "Creating deployment package..." -ForegroundColor Yellow
if (Test-Path deploy.zip) {
    Remove-Item deploy.zip
}

# Create a startup script
@"
#!/bin/bash
cd /home/site/wwwroot
npm start
"@ | Out-File -FilePath startup.sh -Encoding utf8

# Package everything needed
Compress-Archive -Path @(
    ".next",
    "public", 
    "package.json",
    "package-lock.json",
    "next.config.js",
    "startup.sh",
    "node_modules"
) -DestinationPath deploy.zip -Force

# Deploy
Write-Host "Deploying to Azure..." -ForegroundColor Yellow
az webapp deploy `
    --name $appName `
    --resource-group $resourceGroup `
    --src-path deploy.zip `
    --type zip

# Set startup command
az webapp config set `
    --name $appName `
    --resource-group $resourceGroup `
    --startup-file "startup.sh"

# Clean up
Remove-Item deploy.zip -Force -ErrorAction SilentlyContinue
Remove-Item startup.sh -Force -ErrorAction SilentlyContinue

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "View at: https://auraspringcleaning-app.azurewebsites.net" -ForegroundColor Cyan