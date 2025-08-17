Write-Host "=== PHONE NUMBER VERIFICATION ===" -ForegroundColor Cyan
Write-Host ""

$phoneNumber = "512-781-0527"
Write-Host "Verifying: $phoneNumber" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. CHECKING TWILIO ACCOUNT..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

# Check if Twilio CLI is available
$twilioInstalled = Get-Command twilio -ErrorAction SilentlyContinue
if ($twilioInstalled) {
    Write-Host "Checking Twilio phone numbers..." -ForegroundColor Yellow
    twilio phone-numbers:list 2>$null | Select-String "512.*781.*0527"
} else {
    Write-Host "Twilio CLI not installed. Install with: npm install -g twilio-cli" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "2. REVERSE LOOKUP INFORMATION..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

# Phone number details
Write-Host "Number: (512) 781-0527" -ForegroundColor White
Write-Host "Area Code: 512 (Austin, Texas)" -ForegroundColor White
Write-Host "Exchange: 781" -ForegroundColor White
Write-Host "Type: Likely VoIP/Cloud number" -ForegroundColor White

Write-Host ""
Write-Host "3. TESTING NUMBER (SAFE METHODS)..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

# Create a test call script
Write-Host "Options to verify:" -ForegroundColor Yellow
Write-Host ""
Write-Host "A. CALL FROM ANOTHER PHONE:" -ForegroundColor Cyan
Write-Host "   - Call from a different phone" -ForegroundColor White
Write-Host "   - Note where it rings (Teams, Twilio app, forwarding)" -ForegroundColor White
Write-Host ""

Write-Host "B. CHECK TWILIO CONSOLE:" -ForegroundColor Cyan
Write-Host "   1. Go to: https://console.twilio.com" -ForegroundColor White
Write-Host "   2. Login with your account" -ForegroundColor White
Write-Host "   3. Navigate to Phone Numbers > Manage > Active Numbers" -ForegroundColor White
Write-Host "   4. Search for: 512-781-0527" -ForegroundColor White
Write-Host ""

Write-Host "C. CHECK TEAMS ADMIN CENTER:" -ForegroundColor Cyan
Write-Host "   1. Go to: https://admin.teams.microsoft.com" -ForegroundColor White
Write-Host "   2. Navigate to Voice > Phone numbers" -ForegroundColor White
Write-Host "   3. Look for any 512 numbers" -ForegroundColor White
Write-Host ""

Write-Host "4. CHECKING WEBSITE REFERENCES..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

# Count occurrences in codebase
$codebaseCount = (Get-ChildItem -Path . -Recurse -Include *.tsx,*.ts,*.js,*.jsx -ErrorAction SilentlyContinue | Select-String "512.*781.*0527").Count
Write-Host "Found in $codebaseCount code files" -ForegroundColor Yellow

Write-Host ""
Write-Host "5. ENVIRONMENT VARIABLES CHECK..." -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

# Check .env files
$envFiles = @(".env", ".env.local", ".env.production")
foreach ($envFile in $envFiles) {
    if (Test-Path $envFile) {
        Write-Host "Checking $envFile..." -ForegroundColor White
        $twilioNumber = Get-Content $envFile | Select-String "TWILIO.*PHONE"
        if ($twilioNumber) {
            Write-Host "  Found: $twilioNumber" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "=== VERIFICATION STEPS ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "To verify ownership and routing:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. CHECK TWILIO:" -ForegroundColor Green
Write-Host "   - Login to https://console.twilio.com" -ForegroundColor White
Write-Host "   - Check 'Phone Numbers' section" -ForegroundColor White
Write-Host "   - Look for configuration/forwarding" -ForegroundColor White
Write-Host ""
Write-Host "2. TEST CALL:" -ForegroundColor Green
Write-Host "   - Call 512-781-0527 from your cell" -ForegroundColor White
Write-Host "   - Note: Does it ring in Teams?" -ForegroundColor White
Write-Host "   - Note: Goes to voicemail?" -ForegroundColor White
Write-Host "   - Note: Disconnected?" -ForegroundColor White
Write-Host ""
Write-Host "3. CHECK BILLING:" -ForegroundColor Green
Write-Host "   - Check credit card statements for Twilio charges" -ForegroundColor White
Write-Host "   - Check Azure billing for Communication Services" -ForegroundColor White
Write-Host ""

Write-Host "=== QUICK ONLINE LOOKUP ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can also check these services:" -ForegroundColor Yellow
Write-Host "1. WhitePages: https://www.whitepages.com/phone/1-512-781-0527" -ForegroundColor White
Write-Host "2. TrueCaller: https://www.truecaller.com" -ForegroundColor White
Write-Host "3. Google the number: '512-781-0527'" -ForegroundColor White
Write-Host ""

Write-Host "=== RECOMMENDATION ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMMEDIATE ACTION:" -ForegroundColor Red
Write-Host "1. Call the number NOW from your phone to see where it goes" -ForegroundColor Yellow
Write-Host "2. Check your Twilio account (most likely owner)" -ForegroundColor Yellow
Write-Host "3. Update website to use correct active number" -ForegroundColor Yellow
Write-Host ""
Write-Host "The number appears to be a Twilio number based on the code configuration." -ForegroundColor White
Write-Host "It may be forwarding to another number or disconnected if not maintained." -ForegroundColor White