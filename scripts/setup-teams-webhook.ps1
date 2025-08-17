# Teams Webhook Setup for Aura Spring Cleaning
# This script helps configure Microsoft Teams webhook for lead notifications to Valerie

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Aura Spring Cleaning - Teams Webhook Setup" -ForegroundColor Green
Write-Host "Primary Contact: Valerie - (512) 781-0527" -ForegroundColor Yellow
Write-Host "================================`n" -ForegroundColor Cyan

# Instructions for creating Teams webhook
Write-Host "STEP 1: Create Incoming Webhook in Teams" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "1. Open Microsoft Teams"
Write-Host "2. Go to the channel where you want notifications (e.g., 'Sales Leads')"
Write-Host "3. Click the '...' menu next to the channel name"
Write-Host "4. Select 'Manage channel' > 'Connectors'"
Write-Host "5. Search for 'Incoming Webhook' and click 'Configure'"
Write-Host "6. Name it: 'Aura Spring Cleaning - Lead Notifications'"
Write-Host "7. Upload logo (optional) and click 'Create'"
Write-Host "8. Copy the webhook URL that appears`n"

Write-Host "STEP 2: Enter Your Webhook URL" -ForegroundColor Green
Write-Host "-------------------------------" -ForegroundColor Gray
$webhookUrl = Read-Host "Paste your Teams webhook URL here"

if ([string]::IsNullOrWhiteSpace($webhookUrl)) {
    Write-Host "`nNo webhook URL provided. Exiting..." -ForegroundColor Red
    exit 1
}

# Validate webhook URL
if ($webhookUrl -notmatch "https://.*webhook.office.com/.*") {
    Write-Host "`nInvalid webhook URL format. Please use the URL from Teams." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Webhook URL validated!" -ForegroundColor Green

# Update .env.local file
$envPath = Join-Path (Split-Path $PSScriptRoot -Parent) ".env.local"

Write-Host "`nSTEP 3: Updating Environment Configuration" -ForegroundColor Green
Write-Host "------------------------------------------" -ForegroundColor Gray

# Check if .env.local exists
if (Test-Path $envPath) {
    # Read existing content
    $envContent = Get-Content $envPath -Raw
    
    # Check if TEAMS_WEBHOOK_URL already exists
    if ($envContent -match "TEAMS_WEBHOOK_URL=") {
        # Update existing
        $envContent = $envContent -replace "TEAMS_WEBHOOK_URL=.*", "TEAMS_WEBHOOK_URL=$webhookUrl"
        Write-Host "Updated existing TEAMS_WEBHOOK_URL" -ForegroundColor Yellow
    } else {
        # Add new
        $envContent += "`n# Microsoft Teams Webhook for Lead Notifications`nTEAMS_WEBHOOK_URL=$webhookUrl`n"
        Write-Host "Added TEAMS_WEBHOOK_URL to configuration" -ForegroundColor Green
    }
    
    # Save updated content
    $envContent | Set-Content $envPath -NoNewline
} else {
    # Create new .env.local with webhook URL
    @"
# Aura Spring Cleaning Environment Variables
# Primary Contact: Valerie (512) 781-0527

# Microsoft Teams Webhook for Lead Notifications
TEAMS_WEBHOOK_URL=$webhookUrl

# Email Configuration (Valerie is primary contact)
EMAIL_TO=valerie@auraspringcleaning.com
EMAIL_CC=dustin@auraspringcleaning.com
NEXT_PUBLIC_PHONE=(512) 781-0527
NEXT_PUBLIC_EMAIL=valerie@auraspringcleaning.com

# Business Hours
BUSINESS_HOURS_START=8
BUSINESS_HOURS_END=18
BUSINESS_DAYS=Mon,Tue,Wed,Thu,Fri
WEEKEND_HOURS_START=9
WEEKEND_HOURS_END=17
"@ | Set-Content $envPath
    Write-Host "Created new .env.local with configuration" -ForegroundColor Green
}

Write-Host "`n✅ Environment configuration updated!" -ForegroundColor Green

# Test the webhook
Write-Host "`nSTEP 4: Testing Webhook Connection" -ForegroundColor Green
Write-Host "-----------------------------------" -ForegroundColor Gray

$testMessage = @{
    "@type" = "MessageCard"
    "@context" = "https://schema.org/extensions"
    "themeColor" = "7c9768"
    "summary" = "Webhook Test - Aura Spring Cleaning"
    "sections" = @(
        @{
            "activityTitle" = "🎉 Teams Webhook Successfully Configured!"
            "activitySubtitle" = "$(Get-Date -Format 'dddd, MMMM dd, yyyy h:mm tt')"
            "activityImage" = "https://auraspringcleaning.com/logo.png"
            "text" = "Your Teams webhook is now ready to receive lead notifications for Aura Spring Cleaning."
            "facts" = @(
                @{ "name" = "Primary Contact"; "value" = "Valerie Boatman" }
                @{ "name" = "Phone"; "value" = "(512) 781-0527" }
                @{ "name" = "Email"; "value" = "valerie@auraspringcleaning.com" }
                @{ "name" = "Service Area"; "value" = "Austin, TX" }
            )
        }
    )
    "potentialAction" = @(
        @{
            "@type" = "OpenUri"
            "name" = "View Website"
            "targets" = @(
                @{ "os" = "default"; "uri" = "https://auraspringcleaning.com" }
            )
        }
    )
}

$jsonBody = $testMessage | ConvertTo-Json -Depth 10

try {
    Write-Host "Sending test message to Teams..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $jsonBody -ContentType "application/json"
    
    if ($response -eq 1) {
        Write-Host "✅ Test message sent successfully!" -ForegroundColor Green
        Write-Host "Check your Teams channel for the test notification.`n" -ForegroundColor Cyan
        
        # Show what notifications will look like
        Write-Host "NOTIFICATIONS YOU'LL RECEIVE:" -ForegroundColor Green
        Write-Host "-----------------------------" -ForegroundColor Gray
        Write-Host "• New booking alerts with customer details"
        Write-Host "• Contact form submissions"
        Write-Host "• Quote requests with pricing"
        Write-Host "• Payment confirmations"
        Write-Host "• Urgent customer inquiries`n"
        
        Write-Host "All notifications will include:" -ForegroundColor Yellow
        Write-Host "• Customer name and contact info"
        Write-Host "• Service type and details"
        Write-Host "• Quick action buttons (Call, Email, View)"
        Write-Host "• Timestamp and booking ID`n"
        
        Write-Host "================================" -ForegroundColor Cyan
        Write-Host "✅ SETUP COMPLETE!" -ForegroundColor Green
        Write-Host "Valerie will now receive all lead notifications in Teams" -ForegroundColor Yellow
        Write-Host "================================`n" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️ Unexpected response from Teams. Please verify in your channel." -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Failed to send test message!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "`nPlease verify:"
    Write-Host "1. The webhook URL is correct"
    Write-Host "2. The Teams channel exists and is active"
    Write-Host "3. You have permissions to post to the channel`n"
}

# Create test script
$testScriptPath = Join-Path $PSScriptRoot "test-teams-notification.ps1"
@'
# Test Teams Notification Script
# Run this to send a test lead notification

$webhookUrl = $env:TEAMS_WEBHOOK_URL
if (-not $webhookUrl) {
    # Try to read from .env.local
    $envPath = Join-Path (Split-Path $PSScriptRoot -Parent) ".env.local"
    if (Test-Path $envPath) {
        $envContent = Get-Content $envPath -Raw
        if ($envContent -match "TEAMS_WEBHOOK_URL=(.+)") {
            $webhookUrl = $matches[1].Trim()
        }
    }
}

if (-not $webhookUrl) {
    Write-Host "❌ TEAMS_WEBHOOK_URL not found. Run setup-teams-webhook.ps1 first." -ForegroundColor Red
    exit 1
}

# Sample lead data
$leadData = @{
    customerName = "John Smith"
    customerPhone = "(512) 555-1234"
    customerEmail = "john.smith@example.com"
    serviceType = "Deep Cleaning"
    serviceDate = (Get-Date).AddDays(3).ToString("yyyy-MM-dd")
    serviceTime = "10:00 AM"
    address = "123 Main St, Austin, TX 78701"
    totalPrice = 225
    bookingId = "ASC-TEST-$(Get-Random -Maximum 9999)"
}

$message = @{
    "@type" = "MessageCard"
    "@context" = "https://schema.org/extensions"
    "themeColor" = "00ff00"
    "summary" = "New Booking Alert - $($leadData.serviceType)"
    "sections" = @(
        @{
            "activityTitle" = "🎉 New Booking Alert!"
            "activitySubtitle" = "$(Get-Date -Format 'dddd, MMMM dd, yyyy h:mm tt')"
            "text" = "A new $($leadData.serviceType) booking has been received"
            "facts" = @(
                @{ "name" = "Customer"; "value" = $leadData.customerName }
                @{ "name" = "Phone"; "value" = $leadData.customerPhone }
                @{ "name" = "Email"; "value" = $leadData.customerEmail }
                @{ "name" = "Service"; "value" = $leadData.serviceType }
                @{ "name" = "Date"; "value" = "$($leadData.serviceDate) at $($leadData.serviceTime)" }
                @{ "name" = "Address"; "value" = $leadData.address }
                @{ "name" = "Total Price"; "value" = "$$$($leadData.totalPrice)" }
                @{ "name" = "Booking ID"; "value" = $leadData.bookingId }
            )
        }
    )
    "potentialAction" = @(
        @{
            "@type" = "OpenUri"
            "name" = "Call Customer"
            "targets" = @(
                @{ "os" = "default"; "uri" = "tel:$($leadData.customerPhone)" }
            )
        }
        @{
            "@type" = "OpenUri"
            "name" = "Email Customer"
            "targets" = @(
                @{ "os" = "default"; "uri" = "mailto:$($leadData.customerEmail)" }
            )
        }
    )
}

$jsonBody = $message | ConvertTo-Json -Depth 10

try {
    Write-Host "Sending test booking notification to Teams..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $jsonBody -ContentType "application/json"
    Write-Host "✅ Test notification sent! Check Teams channel." -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to send notification: $_" -ForegroundColor Red
}
'@ | Set-Content $testScriptPath

Write-Host "Created test script: $testScriptPath" -ForegroundColor Cyan
Write-Host "Run it anytime to test notifications: .\test-teams-notification.ps1`n" -ForegroundColor Gray