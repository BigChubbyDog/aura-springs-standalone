# Microsoft Ecosystem Integration - Complete Setup Guide & Troubleshooting

## 🔴 CRITICAL ISSUES TO FIX

### 1. Azure Authentication Issues
**Problem:** Both service principals showing "Invalid client secret" errors
**Current Secrets:**
- Claude-Master-Automation: `[REDACTED-SECRET]`
- AuraSpring-Master-Integration: `[REDACTED-SECRET]`

### 2. Dynamics 365 URL
**Problem:** `org829637ae.crm.dynamics.com` doesn't exist (DNS not found)

---

## 📋 DETAILED TODO LIST WITH INSTRUCTIONS

### ✅ 1. VERIFY SERVICE PRINCIPAL AUTHENTICATION

#### A. Test Azure CLI Login
```powershell
# Test Claude-Master-Automation service principal
az login --service-principal `
  --username "94d3924d-79c4-4280-975d-8223752343b8" `
  --password "[REDACTED-SECRET]" `
  --tenant "753965c2-2a85-437e-a9c9-9f824df99584"

# If successful, test Graph API access
az rest --method GET --url "https://graph.microsoft.com/v1.0/me"

# Test AuraSpring-Master-Integration service principal
az login --service-principal `
  --username "8b01f8e9-18d3-40d4-90c1-9777f6288bce" `
  --password "[REDACTED-SECRET]" `
  --tenant "753965c2-2a85-437e-a9c9-9f824df99584"
```

#### B. If Login Fails - Create New Secrets
```powershell
# Reset secret for Claude-Master-Automation
az ad app credential reset `
  --id "94d3924d-79c4-4280-975d-8223752343b8" `
  --years 2

# Reset secret for AuraSpring-Master-Integration  
az ad app credential reset `
  --id "8b01f8e9-18d3-40d4-90c1-9777f6288bce" `
  --years 2
```

---

### 🔍 2. FIND CORRECT DYNAMICS 365 URL

#### Option A: Via Power Platform Admin Center
1. Go to: https://admin.powerplatform.microsoft.com
2. Click "Environments" in left menu
3. Look for your Dynamics 365 environment
4. Click on it and find "Environment URL"
5. It should look like: `https://orgXXXXXXXX.crm.dynamics.com`

#### Option B: Via Azure CLI
```powershell
# List all Dynamics 365 instances
az rest --method GET `
  --url "https://management.azure.com/subscriptions/993c0726-3416-41c5-a963-027d0ae895c7/providers/Microsoft.PowerPlatform/environments?api-version=2020-10-01"
```

#### Option C: Create New Dynamics 365 Trial
If no environment exists:
1. Go to: https://trials.dynamics.com
2. Sign in with admin@adminaccountbcd.onmicrosoft.com
3. Start a free trial of Dynamics 365 Sales
4. Note the new environment URL

---

### 🔐 3. GRANT API PERMISSIONS IN AZURE

#### For Claude-Master-Automation (94d3924d-79c4-4280-975d-8223752343b8):
1. Go to: https://portal.azure.com
2. Azure Active Directory → App registrations
3. Search for: Claude-Master-Automation
4. Click "API permissions"
5. Add these Microsoft Graph permissions:
   ```
   Application Permissions:
   ✓ Mail.Send
   ✓ Mail.ReadWrite
   ✓ Calendars.ReadWrite
   ✓ Sites.ReadWrite.All
   ✓ User.Read.All
   ✓ Group.ReadWrite.All
   ```
6. Click "Grant admin consent for adminaccountbcd"

#### For AuraSpring-Master-Integration (8b01f8e9-18d3-40d4-90c1-9777f6288bce):
1. Same process, but add:
   ```
   Dynamics 365 Permissions:
   ✓ user_impersonation (Delegated)
   
   Common Data Service Permissions:
   ✓ user_impersonation (Delegated)
   ```
2. Grant admin consent

---

### 📂 4. CONFIGURE SHAREPOINT PERMISSIONS

```powershell
# Connect to SharePoint Online
Connect-SPOService -Url https://adminaccountbcd-admin.sharepoint.com

# Grant permissions to service principals
$appId1 = "94d3924d-79c4-4280-975d-8223752343b8"
$appId2 = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"

# Add as site collection administrators
Add-SPOUser -Site https://adminaccountbcd.sharepoint.com/sites/AuraSpringCleaningTeams `
  -LoginName "c:0t.c|tenant|$appId1" `
  -Group "Site Collection Administrators"

Add-SPOUser -Site https://adminaccountbcd.sharepoint.com/sites/AuraSpringCleaningTeams `
  -LoginName "c:0t.c|tenant|$appId2" `
  -Group "Site Collection Administrators"
```

---

### 💬 5. SET UP TEAMS WEBHOOK & CHANNEL

#### A. Create Teams Channel
1. Open Microsoft Teams
2. Create team: "Aura Spring Cleaning"
3. Create channels:
   - #bookings (for new bookings)
   - #operations (for daily operations)
   - #alerts (for urgent issues)

#### B. Create Incoming Webhook
1. In Teams, go to #bookings channel
2. Click ⋯ (More options) → Connectors
3. Search for "Incoming Webhook"
4. Configure → Name: "Booking Notifications"
5. Copy the webhook URL
6. Update .env.local:
   ```
   TEAMS_WEBHOOK_URL=<new-webhook-url>
   ```

---

### ⚡ 6. CREATE POWER AUTOMATE FLOWS

1. Go to: https://make.powerautomate.com
2. Create these flows:

#### Flow 1: New Booking Processing
```yaml
Name: AuraSpring - New Booking
Trigger: When HTTP request received
Actions:
  1. Parse JSON (booking data)
  2. Create Contact in Dynamics 365
  3. Create Calendar Event
  4. Send Teams Card
  5. Send Email via Outlook
  6. Create SharePoint Folder
Response: Return booking ID
```

#### Flow 2: Service Completion
```yaml
Name: AuraSpring - Service Complete
Trigger: When item created (SharePoint list)
Actions:
  1. Update Dynamics 365 record
  2. Generate invoice
  3. Send customer email
  4. Request feedback (1hr delay)
```

After creating each flow:
1. Copy the HTTP trigger URL
2. Add to .env.local:
   ```
   POWER_AUTOMATE_NEW_BOOKING_URL=<url>
   POWER_AUTOMATE_SERVICE_COMPLETION_URL=<url>
   ```

---

### 🧪 7. TEST AUTHENTICATION SCRIPT

Create and run this test script:

```powershell
# Save as: test-auth.ps1
Write-Host "Testing Azure Authentication" -ForegroundColor Yellow

$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"

# Test 1: Claude-Master-Automation
$app1 = @{
    ClientId = "94d3924d-79c4-4280-975d-8223752343b8"
    ClientSecret = "[REDACTED-SECRET]"
}

# Test 2: AuraSpring-Master-Integration
$app2 = @{
    ClientId = "8b01f8e9-18d3-40d4-90c1-9777f6288bce"  
    ClientSecret = "[REDACTED-SECRET]"
}

# Get token for app1
$body1 = @{
    grant_type    = "client_credentials"
    client_id     = $app1.ClientId
    client_secret = $app1.ClientSecret
    scope         = "https://graph.microsoft.com/.default"
}

try {
    $token1 = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $body1 `
        -ContentType "application/x-www-form-urlencoded"
    
    Write-Host "✅ Claude-Master-Automation: Token acquired!" -ForegroundColor Green
} catch {
    Write-Host "❌ Claude-Master-Automation: Failed - $_" -ForegroundColor Red
}

# Get token for app2  
$body2 = @{
    grant_type    = "client_credentials"
    client_id     = $app2.ClientId
    client_secret = $app2.ClientSecret
    scope         = "https://graph.microsoft.com/.default"
}

try {
    $token2 = Invoke-RestMethod -Method Post `
        -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" `
        -Body $body2 `
        -ContentType "application/x-www-form-urlencoded"
    
    Write-Host "✅ AuraSpring-Master-Integration: Token acquired!" -ForegroundColor Green
} catch {
    Write-Host "❌ AuraSpring-Master-Integration: Failed - $_" -ForegroundColor Red
}
```

---

### 🔧 8. UPDATE ENVIRONMENT VARIABLES

Update `.env.local` with all correct values:

```env
# Azure Service Principals
AZURE_TENANT_ID=753965c2-2a85-437e-a9c9-9f824df99584
AZURE_SUBSCRIPTION_ID=993c0726-3416-41c5-a963-027d0ae895c7

# Claude-Master-Automation (SharePoint, Teams, Graph)
AZURE_CLIENT_ID=94d3924d-79c4-4280-975d-8223752343b8
AZURE_CLIENT_SECRET=[REDACTED-SECRET]

# AuraSpring-Master-Integration (Dynamics 365)
DYNAMICS_365_CLIENT_ID=8b01f8e9-18d3-40d4-90c1-9777f6288bce
DYNAMICS_365_CLIENT_SECRET=[REDACTED-SECRET]
DYNAMICS_365_URL=<GET-FROM-POWER-PLATFORM>

# SharePoint
SHAREPOINT_SITE_URL=https://adminaccountbcd.sharepoint.com/sites/AuraSpringCleaningTeams

# Teams
TEAMS_WEBHOOK_URL=<GET-FROM-TEAMS>

# Power Automate (after creating flows)
POWER_AUTOMATE_NEW_BOOKING_URL=
POWER_AUTOMATE_SERVICE_COMPLETION_URL=
```

---

### 📊 9. MONITORING & LOGS

#### Check Azure AD Sign-in Logs
1. Azure Portal → Azure Active Directory
2. Sign-in logs → Filter by:
   - Application: Your service principals
   - Status: Failure
3. Check error details

#### Enable Application Insights
```powershell
# Create Application Insights
az monitor app-insights component create `
  --app "auraspring-insights" `
  --location "eastus" `
  --resource-group "rg-auraspringcleaning-prod" `
  --application-type "Node.JS"
```

---

### 🚨 TROUBLESHOOTING CHECKLIST

- [ ] Service principal secrets are VALUES not IDs
- [ ] Secrets were created less than 24 hours ago
- [ ] API permissions granted with admin consent
- [ ] Dynamics 365 environment exists and URL is correct
- [ ] SharePoint site exists at the URL
- [ ] Teams webhook URL is valid and active
- [ ] All environment variables in .env.local
- [ ] Node.js server restarted after .env changes

---

### 📞 EMERGENCY CONTACTS

**If authentication still fails:**
1. Microsoft Support: 1-800-865-9408
2. Azure Portal Help: Click ? icon → Create support request
3. Dynamics 365 Support: admin.powerplatform.microsoft.com → Help + Support

---

## 🎯 SUCCESS CRITERIA

When everything works, you should see:
1. ✅ `npx tsx scripts/test-microsoft-ecosystem.ts` - All green checkmarks
2. ✅ Bookings create records in Dynamics 365
3. ✅ Documents appear in SharePoint
4. ✅ Notifications show in Teams
5. ✅ Emails sent via Graph API
6. ✅ Power Automate flows triggered

---

*Last Updated: 2025-08-18*
*Priority: CRITICAL - Fix authentication first, then Dynamics URL*