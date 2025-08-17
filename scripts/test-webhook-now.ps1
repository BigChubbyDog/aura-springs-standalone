# Test the saved Teams webhook
$webhookUrl = "https://adminaccountbcd.webhook.office.com/webhookb2/df9b5b12-f537-435b-a578-c6f540ae7c5c@753965c2-2a85-437e-a9c9-9f824df99584/IncomingWebhook/ade6e7bcf89a420f97b09dd6ca021bbc/85ae95d7-aee8-44ea-8e78-af97c72fa4a9/V2ChyK7Cl-K-zvRJAyxjNAJe8th0jh-73cKcm4Wdw7mfY1"

Write-Host "Testing Aura Spring Cleaning Teams Webhook..." -ForegroundColor Yellow

$testMessage = @{
    "@type" = "MessageCard"
    "@context" = "https://schema.org/extensions"
    "themeColor" = "00ff00"
    "summary" = "Webhook Configuration Successful"
    "sections" = @(
        @{
            "activityTitle" = "✅ Teams Webhook Successfully Connected!"
            "activitySubtitle" = "$(Get-Date -Format 'dddd, MMMM dd, yyyy h:mm tt')"
            "activityImage" = "https://auraspringcleaning.com/logo.png"
            "text" = "Your Teams integration is now active. All lead notifications will appear here."
            "facts" = @(
                @{ "name" = "Primary Contact"; "value" = "Valerie Boatman" }
                @{ "name" = "Phone"; "value" = "(512) 781-0527" }
                @{ "name" = "Email"; "value" = "valerie@auraspringcleaning.com" }
                @{ "name" = "Status"; "value" = "✅ Active and Working" }
                @{ "name" = "Notification Types"; "value" = "Bookings, Contacts, Quotes, Payments" }
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
        @{
            "@type" = "OpenUri"
            "name" = "Call Valerie"
            "targets" = @(
                @{ "os" = "default"; "uri" = "tel:5127810527" }
            )
        }
    )
}

$jsonBody = $testMessage | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $jsonBody -ContentType "application/json"
    
    if ($response -eq 1) {
        Write-Host "`n✅ SUCCESS! Webhook is working!" -ForegroundColor Green
        Write-Host "Check your Teams channel for the notification." -ForegroundColor Cyan
        Write-Host "`nWebhook saved and configured in:" -ForegroundColor Yellow
        Write-Host "  • .env.local (TEAMS_WEBHOOK_URL)" -ForegroundColor Gray
        Write-Host "  • CRITICAL-CREDENTIALS.md" -ForegroundColor Gray
        Write-Host "  • CLAUDE.md (for persistence)" -ForegroundColor Gray
        Write-Host "`nValerie will now receive all notifications in Teams!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}