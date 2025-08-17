# 📢 Microsoft Teams Webhook Setup Guide
**For Aura Spring Cleaning Lead Notifications**

## Quick Setup (5 minutes)

### Step 1: Create the Webhook in Teams

1. **Open Microsoft Teams**
2. **Navigate to your desired channel** (e.g., "Sales Leads" or "Customer Inquiries")
3. **Click the three dots (...)** next to the channel name
4. **Select "Connectors"** from the dropdown
5. **Search for "Incoming Webhook"** and click "Add" or "Configure"
6. **Name your webhook**: "Aura Spring Cleaning - Lead Notifications"
7. **Upload a logo** (optional): Use your Aura logo
8. **Click "Create"**
9. **IMPORTANT: Copy the webhook URL** that appears (it's very long)

### Step 2: Configure the Webhook

**Option A: Run the PowerShell Script**
```powershell
cd C:\Users\dusta\repos\aura-springs-standalone
.\scripts\setup-teams-webhook.ps1
# Paste your webhook URL when prompted
```

**Option B: Manual Configuration**

1. Open `C:\Users\dusta\repos\aura-springs-standalone\.env.local`
2. Add this line (replace with your actual webhook URL):
```
TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/YOUR-WEBHOOK-URL-HERE
```
3. Save the file

### Step 3: Test the Webhook

Run this command to send a test notification:
```powershell
cd C:\Users\dusta\repos\aura-springs-standalone
.\scripts\test-teams-notification.ps1
```

## What You'll See in Teams

### New Booking Alert Example:
```
🎉 New Booking Alert!
Saturday, August 17, 2025 10:30 AM

Customer: John Smith
Phone: (512) 555-1234
Email: john@example.com
Service: Deep Cleaning
Date: 2025-08-20 at 10:00 AM
Address: 123 Main St, Austin, TX 78701
Total Price: $225
Booking ID: ASC-1234567-ABC

[Call Customer] [Email Customer] [View in Dashboard]
```

### Contact Form Alert Example:
```
📧 New Contact Form Submission
Saturday, August 17, 2025 10:30 AM

Name: Jane Doe
Email: jane@example.com
Phone: (512) 555-5678
Subject: Quote Request
Message: Need weekly cleaning for 2BR condo

[Reply to Email]
```

## Webhook URL Format

Your webhook URL should look like this:
```
https://outlook.office.com/webhookb2/[GUID]@[GUID]/IncomingWebhook/[ID]/[GUID]
```

## Troubleshooting

### If the webhook doesn't work:
1. **Check the URL**: Make sure you copied the entire URL
2. **Check permissions**: Ensure you have rights to add connectors
3. **Check the channel**: Make sure the channel is active
4. **Test manually**: Try the test script

### Common Issues:
- **"401 Unauthorized"**: The webhook URL is incorrect
- **"400 Bad Request"**: The message format is wrong (shouldn't happen with our scripts)
- **No notification appears**: Check Teams notification settings

## Manual Test (Without Script)

You can test your webhook URL directly with this PowerShell command:
```powershell
$webhookUrl = "YOUR-WEBHOOK-URL-HERE"
$body = @{
    "@type" = "MessageCard"
    "@context" = "https://schema.org/extensions"
    "themeColor" = "7c9768"
    "summary" = "Test Message"
    "sections" = @(
        @{
            "activityTitle" = "✅ Webhook Test Successful!"
            "activitySubtitle" = "Aura Spring Cleaning"
            "text" = "Your Teams webhook is working! Valerie will receive all lead notifications here."
            "facts" = @(
                @{ "name" = "Contact"; "value" = "Valerie - (512) 781-0527" }
            )
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $body -ContentType "application/json"
```

## Benefits of Teams Notifications

✅ **Instant Alerts**: Get notified within seconds of new leads
✅ **Mobile Ready**: Works on Teams mobile app
✅ **Quick Actions**: Call or email directly from the notification
✅ **Team Visibility**: Everyone can see new leads
✅ **No Email Delays**: Faster than email notifications
✅ **Rich Formatting**: Easy to read customer details

## Support

If you need help setting up the webhook:
1. Contact your IT administrator
2. Check Microsoft Teams documentation
3. Ensure you have the right permissions in Teams

---

**Remember**: Once configured, Valerie will receive instant notifications for:
- New bookings
- Contact form submissions
- Quote requests
- Payment confirmations
- Urgent customer inquiries

All notifications will include customer contact information and quick action buttons!