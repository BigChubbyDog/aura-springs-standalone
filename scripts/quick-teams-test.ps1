# Quick Teams Webhook Test
# Replace the webhook URL below with your actual Teams webhook URL

$webhookUrl = Read-Host "Please paste your Teams webhook URL"

if ([string]::IsNullOrWhiteSpace($webhookUrl)) {
    Write-Host "No webhook URL provided. Please get the URL from Teams first." -ForegroundColor Red
    Write-Host "`nHow to get your webhook URL:" -ForegroundColor Yellow
    Write-Host "1. Open Microsoft Teams"
    Write-Host "2. Go to your channel (e.g., 'Sales Leads')"
    Write-Host "3. Click ... > Connectors"
    Write-Host "4. Find 'Incoming Webhook' and click Configure"
    Write-Host "5. Name it 'Aura Spring Cleaning' and click Create"
    Write-Host "6. Copy the webhook URL that appears"
    exit
}

Write-Host "`nSending test notification to Teams..." -ForegroundColor Yellow

$testMessage = @{
    "@type" = "MessageCard"
    "@context" = "https://schema.org/extensions"
    "themeColor" = "00ff00"
    "summary" = "New Booking - Deep Cleaning - $225"
    "sections" = @(
        @{
            "activityTitle" = "🎉 TEST: New Booking Alert!"
            "activitySubtitle" = "$(Get-Date -Format 'dddd, MMMM dd, yyyy h:mm tt')"
            "activityImage" = "https://auraspringcleaning.com/logo.png"
            "text" = "**This is a test notification** - Your Teams integration is working!"
            "facts" = @(
                @{ "name" = "Customer"; "value" = "Test Customer" }
                @{ "name" = "Phone"; "value" = "(512) 555-TEST" }
                @{ "name" = "Email"; "value" = "test@example.com" }
                @{ "name" = "Service"; "value" = "Deep Cleaning" }
                @{ "name" = "Date"; "value" = "Tomorrow at 10:00 AM" }
                @{ "name" = "Address"; "value" = "123 Test St, Austin, TX 78701" }
                @{ "name" = "Total Price"; "value" = "$225" }
                @{ "name" = "Booking ID"; "value" = "ASC-TEST-001" }
                @{ "name" = "Primary Contact"; "value" = "Valerie - (512) 781-0527" }
            )
        }
    )
    "potentialAction" = @(
        @{
            "@type" = "OpenUri"
            "name" = "Call Valerie"
            "targets" = @(
                @{ "os" = "default"; "uri" = "tel:5127810527" }
            )
        }
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
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $jsonBody -ContentType "application/json"
    
    if ($response -eq 1) {
        Write-Host "`n✅ SUCCESS! Test notification sent to Teams!" -ForegroundColor Green
        Write-Host "Check your Teams channel for the test booking alert." -ForegroundColor Cyan
        
        # Save the webhook URL to .env.local
        $envPath = Join-Path (Split-Path $PSScriptRoot -Parent) ".env.local"
        $saveConfig = Read-Host "`nDo you want to save this webhook URL to your configuration? (Y/N)"
        
        if ($saveConfig -eq 'Y' -or $saveConfig -eq 'y') {
            if (Test-Path $envPath) {
                $envContent = Get-Content $envPath -Raw
                if ($envContent -match "TEAMS_WEBHOOK_URL=") {
                    $envContent = $envContent -replace "TEAMS_WEBHOOK_URL=.*", "TEAMS_WEBHOOK_URL=$webhookUrl"
                } else {
                    $envContent += "`n# Microsoft Teams Webhook`nTEAMS_WEBHOOK_URL=$webhookUrl`n"
                }
                $envContent | Set-Content $envPath -NoNewline
            } else {
                "TEAMS_WEBHOOK_URL=$webhookUrl" | Set-Content $envPath
            }
            Write-Host "✅ Webhook URL saved to configuration!" -ForegroundColor Green
        }
        
        Write-Host "`n==================================" -ForegroundColor Cyan
        Write-Host "Teams Integration Complete!" -ForegroundColor Green
        Write-Host "Valerie will now receive all notifications" -ForegroundColor Yellow
        Write-Host "==================================" -ForegroundColor Cyan
    }
} catch {
    Write-Host "`n❌ Failed to send notification!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "`nPlease check:"
    Write-Host "1. The webhook URL is complete and correct"
    Write-Host "2. Your Teams channel is active"
    Write-Host "3. You have permissions to use webhooks"
}