# GitHub Secrets Configuration

This document outlines all required GitHub repository secrets for successful deployment.

## Required Secrets for Azure Static Web Apps Deployment

### 🚀 **CRITICAL - Azure Deployment**
- **`AZURE_STATIC_WEB_APPS_API_TOKEN_AGREEABLE_WAVE_03B0A1110`**
  - Description: Azure Static Web Apps deployment token
  - Location: Azure Portal → Static Web Apps → Your App → Manage deployment token
  - Required: YES (deployment will fail without this)

### 💳 **Stripe Payment Processing**
- **`STRIPE_SECRET_KEY`**
  - Description: Stripe secret key (starts with sk_)
  - Format: `sk_test_51...` or `sk_live_51...`
  - Source: Stripe Dashboard → Developers → API keys

- **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`**
  - Description: Stripe publishable key (starts with pk_)
  - Format: `pk_test_51...` or `pk_live_51...`
  - Source: Stripe Dashboard → Developers → API keys

- **`STRIPE_WEBHOOK_SECRET`** (Optional)
  - Description: Stripe webhook endpoint secret (starts with whsec_)
  - Required: Only if using webhooks

### 📊 **Analytics & Tracking**
- **`NEXT_PUBLIC_GA_ID`**
  - Description: Google Analytics 4 Measurement ID
  - Format: G-XXXXXXXXXX

- **`NEXT_PUBLIC_GTM_ID`**
  - Description: Google Tag Manager Container ID
  - Format: GTM-XXXX

- **`NEXT_PUBLIC_FB_PIXEL_ID`**
  - Description: Facebook Pixel ID for advertising

- **`NEXT_PUBLIC_CLARITY_PROJECT_ID`**
  - Description: Microsoft Clarity project ID

### 🔐 **Azure Integration**
- **`NEXT_PUBLIC_AZURE_TENANT_ID`**
  - Description: Azure AD tenant ID for Microsoft Graph API

- **`NEXT_PUBLIC_AZURE_CLIENT_ID`**
  - Description: Azure AD application client ID

- **`AZURE_CLIENT_SECRET`**
  - Description: Azure AD application client secret (sensitive)

### 📧 **Email Configuration**
- **`SMTP_HOST`**
  - Description: SMTP server hostname
  - Default: smtp.office365.com

- **`SMTP_USER`**
  - Description: Email address for sending
  - Example: hello@auraspringcleaning.com

- **`SMTP_PASSWORD`**
  - Description: SMTP server password or app password

### 📱 **SMS Configuration (Optional)**
- **`TWILIO_ACCOUNT_SID`**
  - Description: Twilio account SID (starts with AC)

- **`TWILIO_AUTH_TOKEN`**
  - Description: Twilio authentication token

- **`TWILIO_PHONE_NUMBER`**
  - Description: Twilio phone number for SMS
  - Format: +1XXXXXXXXXX

## How to Add Secrets to GitHub

1. **Go to Repository Settings**
   - Navigate to your GitHub repository
   - Click on "Settings" tab
   - Select "Secrets and variables" → "Actions"

2. **Add New Secret**
   - Click "New repository secret"
   - Enter the secret name (exact case-sensitive match)
   - Paste the secret value
   - Click "Add secret"

3. **Verify Secrets**
   - Secrets will show as added but values are hidden
   - Names must match exactly (case-sensitive)
   - No spaces or special characters in names

## Deployment Verification

After adding all required secrets:

1. **Push a change** to the main branch
2. **Monitor GitHub Actions** under the "Actions" tab
3. **Check build logs** for any missing environment variables
4. **Verify deployment** at your Azure Static Web App URL

## Troubleshooting

### Common Issues:
- **Secret name mismatch**: Names are case-sensitive
- **Missing Azure token**: Deployment will fail immediately
- **Stripe keys**: Build may succeed but payment processing will fail
- **Analytics IDs**: Site will load but tracking won't work

### Required vs Optional:
- **REQUIRED**: Azure deployment token, Stripe keys
- **RECOMMENDED**: Analytics IDs for tracking
- **OPTIONAL**: SMS, additional integrations

## Security Notes

- Never commit secrets to code
- Use environment variables for all sensitive data
- Rotate secrets periodically
- Monitor secret usage in Actions logs
- Use different keys for staging/production

---

Last Updated: December 2024