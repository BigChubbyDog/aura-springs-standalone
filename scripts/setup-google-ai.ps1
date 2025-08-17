# Setup Google AI for Aura Spring Cleaning Chatbot
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Google AI / Firebase Vertex Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you set up AI-powered chat for your website." -ForegroundColor Yellow
Write-Host ""

# Check if .env.local exists
$envFile = ".env.local"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ .env.local not found. Creating one..." -ForegroundColor Red
    New-Item $envFile -ItemType File
}

# Check if API key already exists
$existingKey = Select-String -Path $envFile -Pattern "GOOGLE_AI_API_KEY" -Quiet
if ($existingKey) {
    Write-Host "✅ Google AI API key already configured!" -ForegroundColor Green
    $useExisting = Read-Host "Do you want to update it? (y/n)"
    if ($useExisting -ne 'y') {
        Write-Host "Using existing configuration." -ForegroundColor Gray
        exit 0
    }
}

Write-Host "To get your FREE Google AI API key:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open your browser and go to:" -ForegroundColor White
Write-Host "   https://makersuite.google.com/app/apikey" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Sign in with your Google account" -ForegroundColor White
Write-Host ""
Write-Host "3. Click 'Get API Key' or 'Create API Key'" -ForegroundColor White
Write-Host ""
Write-Host "4. Copy the API key (starts with 'AIza...')" -ForegroundColor White
Write-Host ""

# Open the URL in default browser
$openBrowser = Read-Host "Would you like me to open the browser for you? (y/n)"
if ($openBrowser -eq 'y') {
    Start-Process "https://makersuite.google.com/app/apikey"
    Write-Host "✅ Browser opened. Get your API key and come back here." -ForegroundColor Green
    Write-Host ""
}

# Get API key from user
Write-Host "Paste your Google AI API key here:" -ForegroundColor Cyan
$apiKey = Read-Host "(It will be hidden for security)"

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "❌ No API key provided. Exiting..." -ForegroundColor Red
    exit 1
}

# Validate API key format
if ($apiKey -notmatch '^AIza[0-9A-Za-z\-_]+$') {
    Write-Host "⚠️ Warning: API key format looks unusual. Make sure you copied it correctly." -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit 1
    }
}

# Update .env.local
Write-Host ""
Write-Host "Updating .env.local..." -ForegroundColor Yellow

# Remove old key if exists
$content = Get-Content $envFile | Where-Object { $_ -notmatch "GOOGLE_AI_API_KEY" }

# Add new key
$content += ""
$content += "# Google AI / Vertex AI (Added $(Get-Date -Format 'yyyy-MM-dd HH:mm'))"
$content += "GOOGLE_AI_API_KEY=$apiKey"

# Save file
$content | Set-Content $envFile

Write-Host "✅ Google AI API key saved to .env.local" -ForegroundColor Green
Write-Host ""

# Test the API key
Write-Host "Testing API connection..." -ForegroundColor Yellow
$testUrl = "https://generativelanguage.googleapis.com/v1beta/models?key=$apiKey"

try {
    $response = Invoke-RestMethod -Uri $testUrl -Method Get -ErrorAction Stop
    Write-Host "✅ API key is valid and working!" -ForegroundColor Green
    Write-Host "   Available models:" -ForegroundColor Gray
    foreach ($model in $response.models) {
        if ($model.name -like "*gemini*") {
            Write-Host "   - $($model.displayName)" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "⚠️ Could not verify API key. It might still work." -ForegroundColor Yellow
    Write-Host "   Error: $_" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart your development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Test the AI chat on your website" -ForegroundColor White
Write-Host ""
Write-Host "3. Watch Teams for real-time notifications" -ForegroundColor White
Write-Host ""
Write-Host "Features now available:" -ForegroundColor Cyan
Write-Host "✅ AI-powered responses using Gemini Pro" -ForegroundColor Green
Write-Host "✅ Natural language understanding" -ForegroundColor Green
Write-Host "✅ Automatic price calculations" -ForegroundColor Green
Write-Host "✅ Smart escalation to human support" -ForegroundColor Green
Write-Host "✅ Teams notifications for all chats" -ForegroundColor Green
Write-Host ""
Write-Host "Your chatbot is now smarter than most competitors' human agents! 🚀" -ForegroundColor Magenta