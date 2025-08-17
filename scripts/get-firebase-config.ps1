# Get Firebase Web App Configuration
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Firebase Web App Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening Firebase Console to create web app..." -ForegroundColor Yellow
Start-Process "https://console.firebase.google.com/project/aura-spring-cleaning-ce122/settings/general"

Write-Host ""
Write-Host "STEPS TO FOLLOW IN BROWSER:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Scroll down to 'Your apps' section" -ForegroundColor White
Write-Host "2. Click the </> icon (Add web app)" -ForegroundColor White
Write-Host "3. Enter app nickname: 'Aura Spring Website'" -ForegroundColor Yellow
Write-Host "4. Check 'Also set up Firebase Hosting' (optional)" -ForegroundColor White
Write-Host "5. Click 'Register app'" -ForegroundColor White
Write-Host "6. Copy the configuration shown" -ForegroundColor White
Write-Host ""

Write-Host "The configuration will look like this:" -ForegroundColor Gray
Write-Host @"
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "aura-spring-cleaning-ce122.firebaseapp.com",
  projectId: "aura-spring-cleaning-ce122",
  storageBucket: "aura-spring-cleaning-ce122.appspot.com",
  messagingSenderId: "109844210378416870045",
  appId: "1:109844210378416870045:web:...",
  measurementId: "G-..."
};
"@ -ForegroundColor DarkGray

Write-Host ""
Write-Host "Once you have the configuration..." -ForegroundColor Cyan
Write-Host ""

# Get API Key
$apiKey = Read-Host "Paste the apiKey value (starts with AIza)"
if (-not $apiKey) {
    Write-Host "No API key provided. You can add it manually to .env.local later." -ForegroundColor Yellow
}

# Get App ID
$appId = Read-Host "Paste the appId value (format: 1:xxxxx:web:xxxxx)"
if (-not $appId) {
    Write-Host "No App ID provided. You can add it manually to .env.local later." -ForegroundColor Yellow
}

# Get Measurement ID (optional)
$measurementId = Read-Host "Paste the measurementId value (starts with G-) [optional]"

# Update .env.local if values provided
if ($apiKey -or $appId) {
    Write-Host ""
    Write-Host "Updating .env.local..." -ForegroundColor Yellow
    
    $envFile = ".env.local"
    $content = Get-Content $envFile
    
    # Add Firebase web config
    $newLines = @()
    $newLines += ""
    $newLines += "# Firebase Web App Configuration (Added $(Get-Date -Format 'yyyy-MM-dd HH:mm'))"
    
    if ($apiKey) {
        $newLines += "NEXT_PUBLIC_FIREBASE_API_KEY=$apiKey"
    }
    if ($appId) {
        $newLines += "NEXT_PUBLIC_FIREBASE_APP_ID=$appId"
    }
    if ($measurementId) {
        $newLines += "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$measurementId"
    }
    
    # Append to file
    $content + $newLines | Set-Content $envFile
    
    Write-Host "✅ Firebase web app configuration saved!" -ForegroundColor Green
}

# Update the lib/firestoreChatbot.ts file
Write-Host ""
Write-Host "Updating Firebase configuration in code..." -ForegroundColor Yellow

$chatbotFile = "lib/firestoreChatbot.ts"
if (Test-Path $chatbotFile) {
    $chatbotContent = Get-Content $chatbotFile -Raw
    
    if ($apiKey) {
        $chatbotContent = $chatbotContent -replace 'apiKey: process\.env\.NEXT_PUBLIC_FIREBASE_API_KEY \|\| process\.env\.GOOGLE_AI_API_KEY,', "apiKey: '$apiKey',"
        Write-Host "✅ Updated API key in chatbot configuration" -ForegroundColor Green
    }
    
    if ($appId) {
        $chatbotContent = $chatbotContent -replace 'appId: "1:109844210378416870045:web:YOUR_APP_ID"', "appId: '$appId'"
        Write-Host "✅ Updated App ID in chatbot configuration" -ForegroundColor Green
    }
    
    $chatbotContent | Set-Content $chatbotFile
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Firebase Web App Configuration Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart the development server: npm run dev" -ForegroundColor White
Write-Host "2. Test the AI chat on your website" -ForegroundColor White
Write-Host "3. Check Firestore for chat sessions" -ForegroundColor White
Write-Host ""

Write-Host "Monitor your chatbot:" -ForegroundColor Yellow
Write-Host "Firestore: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/firestore" -ForegroundColor Cyan
Write-Host "Extension: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/extensions" -ForegroundColor Cyan