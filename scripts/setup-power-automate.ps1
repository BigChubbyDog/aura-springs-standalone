# Setup Power Automate Flows for Aura Spring Cleaning
# This script helps configure Power Automate flows in the Azure portal

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Power Automate Flow Setup Guide" -ForegroundColor Green
Write-Host "Aura Spring Cleaning - Microsoft Ecosystem" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration values
$tenantId = "753965c2-2a85-437e-a9c9-9f824df99584"
$dynamics365Url = "https://org829637ae.crm.dynamics.com"
$sharepointSite = "https://adminaccountbcd.sharepoint.com/sites/AuraSpringCleaningTeams"
$teamsWebhook = "https://adminaccountbcd.webhook.office.com/webhookb2/df9b5b12-f537-435b-a578-c6f540ae7c5c@753965c2-2a85-437e-a9c9-9f824df99584/IncomingWebhook/ade6e7bcf89a420f97b09dd6ca021bbc/85ae95d7-aee8-44ea-8e78-af97c72fa4a9/V2ChyK7Cl-K-zvRJAyxjNAJe8th0jh-73cKcm4Wdw7mfY1"

Write-Host "📋 Prerequisites:" -ForegroundColor Yellow
Write-Host "1. Access to Power Automate: https://make.powerautomate.com"
Write-Host "2. Permissions for Dynamics 365 CRM"
Write-Host "3. SharePoint site access"
Write-Host "4. Microsoft Teams admin access"
Write-Host ""

Write-Host "🔧 Configuration Values:" -ForegroundColor Yellow
Write-Host "Tenant ID: $tenantId"
Write-Host "Dynamics 365: $dynamics365Url"
Write-Host "SharePoint: $sharepointSite"
Write-Host ""

# Flow definitions
$flows = @(
    @{
        Name = "Aura Spring - New Booking Workflow"
        Description = "Processes new bookings from website"
        Trigger = "HTTP Request"
        Actions = @(
            "Create/Update Contact in Dynamics 365",
            "Create Calendar Event in Teams", 
            "Send Teams Notification",
            "Send Customer Email",
            "Create SharePoint Folder"
        )
    },
    @{
        Name = "Aura Spring - Service Completion"
        Description = "Process completed services with photos"
        Trigger = "Microsoft Forms"
        Actions = @(
            "Upload Photos to SharePoint",
            "Update Dynamics 365 Service Record",
            "Generate Invoice",
            "Send Feedback Request"
        )
    },
    @{
        Name = "Aura Spring - Quote Request Handler"
        Description = "Process quote requests from website"
        Trigger = "HTTP Request"
        Actions = @(
            "Create Lead in Dynamics",
            "Calculate Price (Azure Function)",
            "Send Quote Email",
            "Create Follow-up Task"
        )
    },
    @{
        Name = "Aura Spring - Weekly Schedule"
        Description = "Generate and distribute weekly schedules"
        Trigger = "Recurrence (Sunday 6PM)"
        Actions = @(
            "Get Next Week Appointments",
            "Generate Schedule Document",
            "Upload to SharePoint",
            "Send to Team",
            "Post to Teams"
        )
    },
    @{
        Name = "Aura Spring - Payment Processing"
        Description = "Handle payment notifications"
        Trigger = "Stripe Webhook"
        Actions = @(
            "Update Invoice Status",
            "Send Receipt",
            "Update Customer Record",
            "Log in SharePoint"
        )
    },
    @{
        Name = "Aura Spring - Feedback Handler"
        Description = "Process customer feedback"
        Trigger = "Microsoft Forms"
        Actions = @(
            "Update Customer Record",
            "Check Rating",
            "Alert Management or Thank Customer",
            "Store Feedback"
        )
    },
    @{
        Name = "Aura Spring - Emergency Booking Alert"
        Description = "Handle emergency bookings"
        Trigger = "HTTP Request (urgency=emergency)"
        Actions = @(
            "SMS to Valerie (512-781-0527)",
            "Post Urgent Card to Teams",
            "Check Team Availability",
            "Auto-Assign Team"
        )
    }
)

Write-Host "📝 Power Automate Flows to Create:" -ForegroundColor Cyan
Write-Host ""

$flowNumber = 1
foreach ($flow in $flows) {
    Write-Host "Flow $flowNumber`: $($flow.Name)" -ForegroundColor Green
    Write-Host "  Trigger: $($flow.Trigger)" -ForegroundColor White
    Write-Host "  Actions:" -ForegroundColor White
    foreach ($action in $flow.Actions) {
        Write-Host "    - $action" -ForegroundColor Gray
    }
    Write-Host ""
    $flowNumber++
}

Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""
Write-Host "📌 Setup Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open Power Automate:" -ForegroundColor White
Write-Host "   https://make.powerautomate.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. For each flow above, create using these connections:" -ForegroundColor White
Write-Host "   - Office 365 Outlook: schedule@auraspringcleaning.com"
Write-Host "   - Dynamics 365: $dynamics365Url"
Write-Host "   - SharePoint: $sharepointSite"
Write-Host "   - Teams Webhook: (provided in each flow)"
Write-Host ""
Write-Host "3. After creating each HTTP-triggered flow, copy the URL and add to .env.local:" -ForegroundColor White
Write-Host "   POWER_AUTOMATE_NEW_BOOKING_URL=<url>"
Write-Host "   POWER_AUTOMATE_SERVICE_COMPLETION_URL=<url>"
Write-Host "   POWER_AUTOMATE_QUOTE_REQUEST_URL=<url>"
Write-Host "   POWER_AUTOMATE_EMERGENCY_URL=<url>"
Write-Host ""
Write-Host "4. Test each flow using the test panel in Power Automate" -ForegroundColor White
Write-Host ""

Write-Host "🔗 Important URLs:" -ForegroundColor Yellow
Write-Host "Power Automate: https://make.powerautomate.com"
Write-Host "Dynamics 365: $dynamics365Url"
Write-Host "SharePoint: $sharepointSite"
Write-Host "Teams Admin: https://admin.teams.microsoft.com"
Write-Host ""

Write-Host "📊 Monitoring:" -ForegroundColor Yellow
Write-Host "View flow runs: https://make.powerautomate.com/flows"
Write-Host "Check failures: Enable email notifications in flow settings"
Write-Host ""

Write-Host "✅ Setup guide complete!" -ForegroundColor Green
Write-Host "Follow the instructions above to configure Power Automate flows." -ForegroundColor White
Write-Host ""

# Option to export flow templates
$exportTemplates = Read-Host "Would you like to export flow templates as JSON? (Y/N)"
if ($exportTemplates -eq 'Y' -or $exportTemplates -eq 'y') {
    Write-Host "Generating flow template files..." -ForegroundColor Yellow
    
    # Create templates directory
    $templatesDir = Join-Path $PSScriptRoot "..\power-automate-templates"
    if (-not (Test-Path $templatesDir)) {
        New-Item -ItemType Directory -Path $templatesDir | Out-Null
    }
    
    # Save configuration
    $config = @{
        TenantId = $tenantId
        Dynamics365Url = $dynamics365Url
        SharePointSite = $sharepointSite
        TeamsWebhook = $teamsWebhook
        Flows = $flows
    }
    
    $config | ConvertTo-Json -Depth 10 | Out-File "$templatesDir\flow-configuration.json"
    Write-Host "✅ Flow configuration saved to: $templatesDir\flow-configuration.json" -ForegroundColor Green
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")