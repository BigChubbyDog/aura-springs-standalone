# 🔐 Firebase Service Account Setup for Aura Spring Cleaning

## Your Firebase Project Details
- **Project ID**: `aura-spring-cleaning-ce122`
- **Service Account**: `firebase-adminsdk-fbsvc@aura-spring-cleaning-ce122.iam.gserviceaccount.com`

## Step 1: Download Service Account Key

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: **aura-spring-cleaning-ce122**
3. Click the ⚙️ gear icon → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file
7. Save it as: `serviceAccountKey.json` in your project root

## Step 2: IMPORTANT - Security Setup

Add to `.gitignore`:
```
serviceAccountKey.json
**/serviceAccountKey.json
firebase-service-account.json
```

## Step 3: Enable Vertex AI API

1. Go to: https://console.cloud.google.com/
2. Select project: **aura-spring-cleaning-ce122**
3. Go to **APIs & Services** → **Enable APIs**
4. Search and enable:
   - **Vertex AI API**
   - **Cloud Natural Language API** (optional)
   - **Generative Language API**

## Step 4: Update Environment Variables

Add to `.env.local`:
```env
# Firebase Configuration
FIREBASE_PROJECT_ID=aura-spring-cleaning-ce122
FIREBASE_SERVICE_ACCOUNT_EMAIL=firebase-adminsdk-fbsvc@aura-spring-cleaning-ce122.iam.gserviceaccount.com

# Use the Google AI key for Gemini (still works)
GOOGLE_AI_API_KEY=AIzaSyDfdbiZODc8FbmQZLwbOyg3q4SERIOprEo
```

## Step 5: Create Firebase Config File

Create `lib/firebaseAdmin.ts`:
```typescript
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Try to load service account from file
    const serviceAccount = require('../serviceAccountKey.json');
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'aura-spring-cleaning-ce122'
    });
  } catch (error) {
    // Fallback to environment variables (for production)
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }
}

export default admin;
```

## Quick Command to Download Key

Run this in PowerShell:
```powershell
# Open Firebase Console directly to service accounts
Start-Process "https://console.firebase.google.com/project/aura-spring-cleaning-ce122/settings/serviceaccounts/adminsdk"
```

## Testing Your Setup

Once you have the service account key:

1. Place `serviceAccountKey.json` in project root
2. Restart dev server: `npm run dev`
3. Test the chat - it will now use Firebase authentication

## Features This Enables

✅ **Firebase Authentication** - Secure API access
✅ **Vertex AI Integration** - Advanced AI models
✅ **Firestore Database** - Store chat history
✅ **Firebase Analytics** - Track chat usage
✅ **Cloud Functions** - Serverless chat processing

---
**Note**: The service account key is sensitive. Never commit it to Git!