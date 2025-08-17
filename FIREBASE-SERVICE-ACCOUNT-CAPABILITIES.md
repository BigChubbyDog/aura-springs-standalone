# 🔐 Firebase Service Account - Complete Capabilities Reference

## Service Account Details
- **Email**: `firebase-adminsdk-fbsvc@aura-spring-cleaning-ce122.iam.gserviceaccount.com`
- **Project ID**: `aura-spring-cleaning-ce122`
- **Client ID**: `109844210378416870045`
- **Private Key ID**: `b062dd24de351d39baba128150068e9fad10cece`
- **Key File**: `serviceAccountKey.json` (stored in project root)

## Full Capabilities & Permissions

### 1. Firebase Admin SDK Powers
With this service account, we can programmatically:

#### **Firestore Database**
- ✅ Read/write any document without restrictions
- ✅ Create/delete collections
- ✅ Deploy security rules
- ✅ Create indexes
- ✅ Backup/restore data
- ✅ Monitor usage and performance

#### **Firebase Authentication**
- ✅ Create/delete users programmatically
- ✅ Set custom claims
- ✅ Generate custom tokens
- ✅ List all users
- ✅ Disable/enable accounts
- ✅ Send password reset emails

#### **Cloud Messaging (FCM)**
- ✅ Send push notifications to any device
- ✅ Send to topics
- ✅ Send multicast messages
- ✅ Manage device tokens
- ✅ Access VAPID key: `BAfPLLoMM4DF17O8TyczIjh_cmb-CtnyTgcwcw6ImmruXmfOySH5-dshC8GpjDGpj8KkjtEinYLbUmt8udByHu0`

#### **Cloud Storage**
- ✅ Upload/download files
- ✅ Delete files
- ✅ Set access permissions
- ✅ Generate signed URLs
- ✅ Manage buckets

#### **Firebase Extensions**
- ✅ Configure extension settings
- ✅ Monitor extension usage
- ✅ Access extension logs
- ✅ **Installed**: Firestore Gemini Chatbot (v0.0.15)

### 2. Google Cloud Platform Access
This service account also has access to:

#### **Vertex AI / Gemini**
- ✅ Use Gemini Pro model
- ✅ Generate AI responses
- ✅ Fine-tune models
- ✅ Access embeddings

#### **Cloud Functions**
- ✅ Deploy functions
- ✅ View logs
- ✅ Set environment variables
- ✅ Manage triggers

#### **Cloud Logging**
- ✅ Read all logs
- ✅ Create log entries
- ✅ Set up log sinks

#### **IAM & Security**
- ✅ View IAM policies
- ✅ Audit access logs
- ✅ Manage service accounts (limited)

### 3. Firebase Management API
Can programmatically manage the Firebase project:
- ✅ Create web/iOS/Android apps
- ✅ Get app configurations
- ✅ Update project settings
- ✅ Link Google Analytics
- ✅ Configure OAuth providers

### 4. What We Can Do With Code

```javascript
// Example: Everything we can do with this service account

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Firestore - unrestricted access
const db = admin.firestore();
await db.collection('any_collection').add({anything: 'we want'});

// Auth - full control
await admin.auth().createUser({
  email: 'user@example.com',
  password: 'password'
});

// Messaging - send to anyone
await admin.messaging().send({
  notification: { title: 'Hello', body: 'World' },
  token: 'device_token'
});

// Storage - manage files
const bucket = admin.storage().bucket();
await bucket.upload('file.pdf');

// Cloud Functions (via googleapis)
const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: 'serviceAccountKey.json',
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// Can deploy functions, manage APIs, etc.
```

### 5. Current Production Uses

This service account is currently being used for:

1. **AI Chatbot System**
   - Authenticating Firestore Gemini extension
   - Storing chat sessions and messages
   - Processing AI responses

2. **Lead Management**
   - Storing form submissions
   - Sending to Teams webhook
   - Email notifications

3. **Analytics**
   - Tracking user interactions
   - Storing conversion data
   - Monitoring performance

4. **Real-time Features**
   - Push notifications setup
   - Live chat system
   - Teams integration

### 6. Security Considerations

⚠️ **CRITICAL**: This service account has FULL ADMIN ACCESS to the Firebase project.

**Protected by**:
- ✅ Added to .gitignore (never committed)
- ✅ Stored locally only
- ✅ Used only server-side (never exposed to client)

**Can be used to**:
- Access all user data
- Delete entire database
- Send messages to all users
- Incur billing charges

### 7. How to Use in Any Script

```bash
# Set environment variable
export GOOGLE_APPLICATION_CREDENTIALS="serviceAccountKey.json"

# Or in code
process.env.GOOGLE_APPLICATION_CREDENTIALS = "serviceAccountKey.json"

# Then any Google/Firebase SDK will automatically authenticate
```

### 8. Billing Implications

With Blaze plan active, this service account can:
- Incur Firestore read/write costs
- Use Vertex AI (Gemini) API calls
- Send FCM messages (free up to limit)
- Store data in Cloud Storage
- Run Cloud Functions

Current costs should be minimal (~$5-10/month) with normal usage.

### 9. Backup & Recovery

**If service account key is lost**:
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Update serviceAccountKey.json
4. All features will continue working

**Key rotation recommended**: Every 90 days for security

---

## Summary

This service account is the **master key** to the entire Firebase/Google Cloud project. It can:
- ✅ Manage all Firebase services
- ✅ Access Google Cloud APIs
- ✅ Deploy and configure resources
- ✅ Process payments and billing
- ✅ Access all user data

**Current file location**: `C:\Users\dusta\repos\aura-springs-standalone\serviceAccountKey.json`

**Remember**: This is the most powerful credential in the project. Guard it carefully!