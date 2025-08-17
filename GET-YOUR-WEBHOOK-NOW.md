# 🚨 GET YOUR TEAMS WEBHOOK RIGHT NOW - 2 MINUTES

## QUICK STEPS:

### 1️⃣ OPEN TEAMS (30 seconds)
- Open Microsoft Teams on your computer or browser
- Go to: https://teams.microsoft.com

### 2️⃣ CREATE THE WEBHOOK (1 minute)

**EXACT CLICKS:**
1. Click on **Teams** (left sidebar)
2. Pick any channel or create new one called **"Aura Leads"**
3. Click the **three dots (...)** next to channel name
4. Click **"Connectors"**
5. Type **"webhook"** in search box
6. Find **"Incoming Webhook"** and click **"Configure"**
7. Type name: **"Aura Spring Cleaning"**
8. Click **"Create"** button
9. **COPY THE LONG URL THAT APPEARS**

### 3️⃣ TEST IT (30 seconds)

Run this in PowerShell with YOUR webhook URL:

```powershell
$webhook = "PASTE-YOUR-URL-HERE"
$body = @{
    text = "✅ Webhook working! Valerie will get notifications here."
} | ConvertTo-Json
Invoke-RestMethod -Uri $webhook -Method Post -Body $body -ContentType "application/json"
```

## IF YOU DON'T HAVE TEAMS:

### Option A: Use Email Only
The system already sends all leads to valerie@auraspringcleaning.com - Teams is optional for instant notifications.

### Option B: Create Free Teams Account
1. Go to: https://www.microsoft.com/en-us/microsoft-teams/free
2. Sign up with valerie@auraspringcleaning.com
3. Create account (free)
4. Follow steps above

## WHAT THE URL LOOKS LIKE:

Your webhook URL will look similar to this:
```
https://outlook.office.com/webhookb2/abc123def-4567-89ab-cdef-0123456789ab@abc123def-4567-89ab-cdef-0123456789ab/IncomingWebhook/xyz987654321/abc123def-4567-89ab-cdef-0123456789ab
```

It's about 200+ characters long!

## COMMON ISSUES:

❌ **"I don't see Connectors"**
- You need admin rights or channel owner permissions
- Ask your IT admin to enable connectors

❌ **"I don't have Teams"**
- Email notifications still work perfectly
- All leads go to valerie@auraspringcleaning.com

❌ **"The URL doesn't work"**
- Make sure you copied the ENTIRE URL
- It should start with https://outlook.office.com/webhookb2/

## STILL NEED HELP?

The website works perfectly WITHOUT Teams webhook!
- ✅ All forms send to valerie@auraspringcleaning.com
- ✅ Customers get confirmations
- ✅ You can track everything via email

Teams webhook just adds INSTANT notifications as a bonus feature.

---

**Remember**: Only YOU can create your webhook because it's tied to YOUR Teams account!