# Send a sample booking notification to Teams
$webhookUrl = "https://adminaccountbcd.webhook.office.com/webhookb2/df9b5b12-f537-435b-a578-c6f540ae7c5c@753965c2-2a85-437e-a9c9-9f824df99584/IncomingWebhook/ade6e7bcf89a420f97b09dd6ca021bbc/85ae95d7-aee8-44ea-8e78-af97c72fa4a9/V2ChyK7Cl-K-zvRJAyxjNAJe8th0jh-73cKcm4Wdw7mfY1"

$bookingMessage = @{
    "@type" = "MessageCard"
    "@context" = "https://schema.org/extensions"
    "themeColor" = "00ff00"
    "summary" = "New Booking - Deep Cleaning - $225"
    "sections" = @(
        @{
            "activityTitle" = "🎉 New Booking Received!"
            "activitySubtitle" = "$(Get-Date -Format 'dddd, MMMM dd, yyyy h:mm tt')"
            "activityImage" = "https://auraspringcleaning.com/logo.png"
            "text" = "A new deep cleaning service has been booked through the website."
            "facts" = @(
                @{ "name" = "Customer"; "value" = "Sarah Johnson" }
                @{ "name" = "Phone"; "value" = "(512) 555-4567" }
                @{ "name" = "Email"; "value" = "sarah.johnson@example.com" }
                @{ "name" = "Service"; "value" = "Deep Cleaning" }
                @{ "name" = "Date"; "value" = "Tuesday, August 20, 2025" }
                @{ "name" = "Time"; "value" = "10:00 AM" }
                @{ "name" = "Address"; "value" = "456 Rainey St, Unit 2B, Austin, TX 78701" }
                @{ "name" = "Property"; "value" = "2 bed / 2 bath - 1,200 sq ft" }
                @{ "name" = "Add-ons"; "value" = "Inside Oven, Inside Fridge" }
                @{ "name" = "Total Price"; "value" = "$225.00" }
                @{ "name" = "Payment"; "value" = "To be collected on service" }
                @{ "name" = "Booking ID"; "value" = "ASC-20250817-RN4X7" }
                @{ "name" = "Special Notes"; "value" = "Has 2 cats, please be careful with doors" }
            )
        }
    )
    "potentialAction" = @(
        @{
            "@type" = "OpenUri"
            "name" = "📞 Call Customer"
            "targets" = @(
                @{ "os" = "default"; "uri" = "tel:5125554567" }
            )
        }
        @{
            "@type" = "OpenUri"
            "name" = "📧 Email Customer"
            "targets" = @(
                @{ "os" = "default"; "uri" = "mailto:sarah.johnson@example.com?subject=Re: Your Deep Cleaning Booking - ASC-20250817-RN4X7" }
            )
        }
        @{
            "@type" = "OpenUri"
            "name" = "📍 View Map"
            "targets" = @(
                @{ "os" = "default"; "uri" = "https://maps.google.com/?q=456+Rainey+St+Austin+TX+78701" }
            )
        }
    )
}

$jsonBody = $bookingMessage | ConvertTo-Json -Depth 10

Write-Host "Sending sample booking notification..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $jsonBody -ContentType "application/json"
Write-Host "✅ Sample booking sent to Teams!" -ForegroundColor Green