# PowerShell script to set Meta Pixel environment variables in Azure Static Web Apps

# Variables
$resourceGroup = "rg-auraspringcleaning"
$appName = "AuraSpringCleaningWebsite"

# Meta Conversion API settings
$accessToken = "EAANRdWAWb4wBPFmFguqptEZCxk3V6K2xzN4nhIBAnffyClVjPc5yreaXZCDXmKDlqw6QSruxbceqDRwbQDSU6SV539rsAlNoH2SChrZCix9fw8Rp9ZAjVFosDpDLZAQqpmZAe0IxtjkBT6NPOSzDNZBitQg2cKWxpVFnTbfbaZBF3EXjBjW7jezfQV2dlUacMgZDZD"
$testCode = "TEST63150"

Write-Host "Setting Meta Pixel environment variables in Azure..." -ForegroundColor Cyan

# Set the environment variables
az staticwebapp appsettings set `
    --name $appName `
    --resource-group $resourceGroup `
    --setting-names `
    META_CONVERSION_ACCESS_TOKEN=$accessToken `
    META_DATASET_ID=753683467224168 `
    META_TEST_EVENT_CODE=$testCode

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Environment variables set successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Note: Azure may take 2-3 minutes to propagate these changes." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To remove test mode later, run:" -ForegroundColor Cyan
    Write-Host "az staticwebapp appsettings delete --name $appName --resource-group $resourceGroup --setting-names META_TEST_EVENT_CODE"
} else {
    Write-Host "❌ Failed to set environment variables" -ForegroundColor Red
    Write-Host "Please check your Azure CLI login and permissions" -ForegroundColor Yellow
}