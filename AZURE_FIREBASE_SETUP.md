# Azure Deployment Configuration for Firebase Booking System

## Required Azure App Service Configuration

### 1. Environment Variables to Add in Azure Portal

Navigate to your Azure App Service → Configuration → Application Settings and add:

```bash
# Firebase Admin SDK (Server-side)
FIREBASE_PROJECT_ID=aura-spring-cleaning-ce122
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@aura-spring-cleaning-ce122.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[YOUR_PRIVATE_KEY_HERE]\n-----END PRIVATE KEY-----\n"

# Microsoft Teams Webhook (Already configured)
TEAMS_WEBHOOK_URL=https://adminaccountbcd.webhook.office.com/webhookb2/df9b5b12-f537-435b-a578-c6f540ae7c5c@753965c2-2a85-437e-a9c9-9f824df99584/IncomingWebhook/ade6e7bcf89a420f97b09dd6ca021bbc/85ae95d7-aee8-44ea-8e78-af97c72fa4a9/V2ChyK7Cl-K-zvRJAyxjNAJe8th0jh-73cKcm4Wdw7mfY1

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Email Configuration (for booking confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=Mail@auraspringcleaning.com
SMTP_PASSWORD=your_email_password_here
EMAIL_TO=valerie@auraspringcleaning.com
EMAIL_CC=dustin@auraspringcleaning.com
```

### 2. Firebase Service Account Key

**IMPORTANT**: Never commit the serviceAccountKey.json to git!

#### Option A: Use Environment Variables (Recommended for Azure)
Instead of using the serviceAccountKey.json file, break it into environment variables as shown above.

#### Option B: Use Azure Key Vault (Most Secure)
1. Store the service account JSON in Azure Key Vault
2. Grant your App Service access to Key Vault
3. Reference the secret in your app

### 3. CORS Configuration

Add these origins to your Azure App Service CORS settings:
- https://auraspringcleaning.com
- https://www.auraspringcleaning.com
- https://auraspringcleaning.azurewebsites.net

### 4. Required Azure Services

✅ **Already Configured:**
- Azure App Service (Windows)
- Application Insights
- Azure CDN

⚠️ **Optional but Recommended:**
- Azure Key Vault (for secure credential storage)
- Azure Blob Storage (for file uploads/images)

## Deployment Steps

### 1. Prepare for Deployment

```bash
# Build the application
npm run build

# Test the build locally
npm run start
```

### 2. Deploy to Azure

```powershell
# Using the existing PowerShell script
npm run deploy

# Or using Azure CLI
az webapp deployment source config-zip \
  --resource-group rg-auraspringcleaning-prod \
  --name auraspringcleaning \
  --src deploy.zip
```

### 3. Verify Firebase Connection

After deployment, test the Firebase connection:

```bash
# Check Firebase integration status
curl https://auraspringcleaning.com/api/booking/firebase

# Expected response:
{
  "status": "Firebase Booking API",
  "features": [
    "AI-powered booking analysis",
    "Intelligent scheduling",
    "Duration estimation",
    "Personalized recommendations"
  ],
  "firebase": {
    "project": "aura-spring-cleaning-ce122",
    "vertexAI": "enabled"
  }
}
```

## Firebase Features That Work Out-of-the-Box

✅ **Client-Side Features (No Config Needed):**
- Firestore database operations
- Firebase Authentication (if enabled)
- Analytics tracking
- Vertex AI for booking intelligence
- Real-time data synchronization
- Offline persistence

✅ **Server-Side Features (Need Config):**
- Firebase Admin SDK operations
- Secure database writes
- User management
- Cloud Messaging
- Storage operations

## Security Considerations

1. **Firestore Security Rules**: Configure in Firebase Console
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read for all bookings (for availability checking)
       match /bookings/{document=**} {
         allow read: if true;
         allow write: if request.auth != null || 
                        request.resource.data.customerEmail != null;
       }
     }
   }
   ```

2. **API Security**: The booking API validates all inputs and sanitizes data

3. **Rate Limiting**: Consider adding rate limiting in Azure API Management

## Testing After Deployment

1. **Test Booking Creation:**
   - Go to https://auraspringcleaning.com/booking
   - Fill out the form with test data
   - Verify booking appears in Firebase Console

2. **Test AI Assistant:**
   - Click "AI Booking Assistant"
   - Type: "I need a deep clean for my 3 bedroom house"
   - Verify AI provides recommendations

3. **Test Teams Integration:**
   - Complete a booking
   - Check Microsoft Teams channel for notification

## Monitoring

- **Firebase Console**: https://console.firebase.google.com/project/aura-spring-cleaning-ce122
  - View bookings in Firestore
  - Monitor usage and performance
  - Check error logs

- **Azure Application Insights**: Already configured
  - Monitor API performance
  - Track errors and exceptions
  - View custom events

## Troubleshooting

### Issue: Firebase Admin not working
**Solution**: Ensure FIREBASE_PRIVATE_KEY env variable has proper line breaks (\n)

### Issue: Vertex AI not responding
**Solution**: Vertex AI requires Blaze plan (already active) and may need to be enabled in GCP Console

### Issue: Bookings not saving
**Solution**: Check Firestore security rules and ensure database is in production mode

### Issue: No Teams notifications
**Solution**: Verify TEAMS_WEBHOOK_URL is set correctly in Azure Configuration

## Cost Considerations

**Firebase Blaze Plan Costs:**
- Firestore: $0.18/100K reads, $0.18/100K writes
- Vertex AI: $0.0005 per 1K characters
- Storage: $0.026/GB per month
- Expected monthly cost: ~$10-30 for moderate usage

**Azure Costs:**
- Already budgeted in your current Azure setup
- No additional Azure costs for Firebase integration

## Support

- Firebase Support: https://firebase.google.com/support
- Azure Support: Via Azure Portal
- Vertex AI Docs: https://firebase.google.com/docs/vertex-ai