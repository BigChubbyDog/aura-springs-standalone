# Dynamics 365 Setup Guide for Aura Spring Cleaning

## Current Status
✅ **Dynamics 365 URL Found**: `https://mortgagelcdefault.crm.dynamics.com`  
✅ **Service Principal Created**: AuraSpring-Master-Integration  
✅ **Authentication Working**: Service principal can get access tokens  
❌ **Permissions Needed**: Service principal needs to be added as application user in Dynamics 365

## Service Principal Details
- **Application ID**: `8b01f8e9-18d3-40d4-90c1-9777f6288bce`
- **Display Name**: AuraSpring-Master-Integration
- **Client Secret**: Stored in `.env.local` as `DYNAMICS_365_CLIENT_SECRET`
- **Tenant ID**: `753965c2-2a85-437e-a9c9-9f824df99584`

## Quick Fix Instructions

### Option 1: Via Power Platform Admin Center (Easiest)
1. Open [Power Platform Admin Center](https://admin.powerplatform.microsoft.com)
2. Select environment: **mortgagelcdefault**
3. Navigate to: **Settings** → **Users + permissions** → **Application users**
4. Click: **+ New app user**
5. Search for Application ID: `8b01f8e9-18d3-40d4-90c1-9777f6288bce`
6. Select the app when it appears
7. Add to environment
8. Assign security role: **System Administrator** or **System Customizer**
9. Click **Create**

### Option 2: Via Dynamics 365 UI
1. Open [Dynamics 365](https://mortgagelcdefault.crm.dynamics.com)
2. Navigate to: **Settings** → **Security** → **Users**
3. Switch view to: **Application Users**
4. Click: **New** → **Application User**
5. Enter these details:
   - **Application ID**: `8b01f8e9-18d3-40d4-90c1-9777f6288bce`
   - **Full Name**: AuraSpring-Master-Integration
   - **Primary Email**: auraspring@auraspringcleaning.com
6. Click **Save**
7. Click **Manage Roles**
8. Assign: **System Administrator** role
9. Save changes

### Option 3: Using PowerShell Automation
```powershell
# Run the automated setup script
powershell.exe -ExecutionPolicy Bypass -File scripts\add-dynamics-app-user.ps1
```

## Testing the Connection
After granting permissions, test that everything works:

```powershell
# Test Dynamics 365 access
powershell.exe -ExecutionPolicy Bypass -File scripts\check-dynamics-access.ps1
```

Expected output:
```
✅ Successfully obtained access token
✅ Successfully accessed Dynamics 365 API!
   You have proper permissions configured.
```

## What This Enables

Once configured, the application can:

### 1. Customer Management
- Create new customers automatically from bookings
- Update customer information
- Track customer history and preferences
- Maintain customer profiles with cleaning preferences

### 2. Service Appointments
- Create service appointments in Dynamics 365
- Schedule recurring cleanings
- Track service status (Scheduled, In Progress, Completed)
- Manage team assignments

### 3. Lead Management
- Convert website inquiries to leads
- Track lead sources (Website, Google, Facebook, etc.)
- Score and prioritize leads
- Automate follow-ups

### 4. Invoice Management
- Generate invoices for services
- Track payment status
- Send automated payment reminders
- Integrate with payment systems

### 5. Complete Integration
- Sync with Microsoft Teams for notifications
- Store documents in SharePoint
- Trigger Power Automate flows
- Send automated emails via Outlook

## Files Configured

### `.env.local`
```env
DYNAMICS_365_URL=https://mortgagelcdefault.crm.dynamics.com
DYNAMICS_365_CLIENT_ID=8b01f8e9-18d3-40d4-90c1-9777f6288bce
DYNAMICS_365_CLIENT_SECRET=[REDACTED-SECRET]
```

### `lib/dynamics365Service.ts`
Complete Dynamics 365 CRM integration service with:
- Customer CRUD operations
- Service appointment management
- Lead creation and tracking
- Invoice generation
- Customer history retrieval

### `lib/microsoftEcosystemIntegration.ts`
Orchestrates the entire Microsoft ecosystem:
- Processes bookings through all services
- Handles errors gracefully
- Provides status for each integration

## Testing the Complete Flow

Once permissions are granted, test the full booking flow:

```bash
# From the project directory
npx tsx scripts/test-microsoft-ecosystem.ts
```

This will test:
- ✅ Teams notifications
- ✅ Dynamics 365 customer creation
- ✅ Service appointment scheduling
- ✅ SharePoint document creation
- ✅ Power Automate flow triggers
- ✅ Email notifications

## Troubleshooting

### Error: 403 Forbidden
**Solution**: Service principal not added as application user. Follow Option 1 or 2 above.

### Error: Invalid client secret
**Solution**: Secret may have expired. Create new secret in Azure Portal:
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to: Azure Active Directory → App registrations
3. Select: AuraSpring-Master-Integration
4. Go to: Certificates & secrets
5. Create new client secret
6. Update `.env.local` with new secret

### Error: Cannot resolve DNS
**Solution**: Wrong Dynamics URL. Verify at [Power Platform Admin](https://admin.powerplatform.microsoft.com)

### Error: Insufficient privileges
**Solution**: Application user needs higher security role. Assign "System Administrator" role.

## Support Scripts

### `scripts/check-dynamics-access.ps1`
Tests current Dynamics 365 access and provides specific error messages.

### `scripts/add-dynamics-app-user.ps1`
Attempts to automatically add the service principal as an application user.

### `scripts/grant-dynamics-access-api.ps1`
Uses API calls to grant access programmatically.

### `scripts/test-microsoft-ecosystem.ts`
Tests the complete Microsoft ecosystem integration.

## Next Steps

After granting permissions:

1. **Test the connection** using the test scripts
2. **Create Power Automate flows** in Power Platform
3. **Configure SharePoint lists** for document management
4. **Set up Teams channels** for notifications
5. **Test end-to-end booking flow** through the website

## Need Help?

If you encounter issues:
1. Check the error messages in test scripts
2. Verify service principal credentials in Azure Portal
3. Ensure Dynamics 365 subscription is active
4. Check Power Platform environment settings
5. Review security role assignments

Remember: The service principal MUST be added as an application user in Dynamics 365 with appropriate security roles for the integration to work.