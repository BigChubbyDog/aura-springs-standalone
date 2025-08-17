# 🤖 Firebase Gemini Chatbot Extension Configuration

## Extension Installed: ✅
**Build Chatbot with the Gemini API** (v0.0.15)

## What This Extension Does
- Automatically processes chat messages in Firestore
- Uses Google's Gemini Pro AI to generate responses
- Stores full conversation history
- Handles rate limiting and error recovery

## Required Setup Steps

### 1. Get Your Firebase Web App Configuration

1. Go to Firebase Console: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/overview
2. Click the **gear icon** ⚙️ → **Project settings**
3. Scroll down to **Your apps**
4. Click **</> Add app** (Web icon)
5. Register app with nickname: "Aura Spring Website"
6. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "aura-spring-cleaning-ce122.firebaseapp.com",
  projectId: "aura-spring-cleaning-ce122",
  storageBucket: "aura-spring-cleaning-ce122.appspot.com",
  messagingSenderId: "109844210378416870045",
  appId: "..." // This is what we need
};
```

### 2. Update Environment Variables

Add to `.env.local`:
```env
# Firebase Web App Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=109844210378416870045
```

### 3. Extension Configuration

The extension is configured to use these Firestore paths:
- **Sessions**: `chat_sessions`
- **Messages**: `chat_sessions/{sessionId}/messages`

Message fields:
- `prompt` - User's message
- `response` - AI's response
- `status` - PENDING → PROCESSING → COMPLETED
- `createTime` - When message was sent
- `completeTime` - When response was ready

### 4. How It Works

1. **User sends message** → Saved to Firestore with `status: PENDING`
2. **Extension triggers** → Reads prompt, sends to Gemini Pro
3. **Gemini responds** → Extension writes response, updates `status: COMPLETED`
4. **Chat UI updates** → Shows response to user
5. **Teams notified** → Real-time alerts for new chats

### 5. Testing the Extension

Run this test in PowerShell:
```powershell
# Test the Gemini extension directly
$testMessage = @{
    prompt = "How much for a 3BR/2BA 2000sqft home?"
    status = "PENDING"
    createTime = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    metadata = @{
        userName = "Test User"
        source = "manual-test"
    }
} | ConvertTo-Json

# This would be done through Firestore SDK in production
Write-Host "Test message ready. The extension will process messages automatically."
```

### 6. Monitor Extension

1. **Firebase Console**: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/extensions
2. **View logs**: Click on the extension → "View logs"
3. **Check usage**: Extension details → "Usage"

### 7. Billing & Limits

With Blaze plan activated:
- **Free tier**: 1,000 requests/month
- **After free tier**: $0.00025 per 1K characters
- **Rate limits**: 60 requests/minute
- **Max tokens**: 1024 per response

### 8. Integration with Our Chat

Our `FirestoreChatbot` class handles:
- Creating sessions
- Sending messages in correct format
- Waiting for AI responses
- Real-time updates via Firestore listeners

### 9. Troubleshooting

If chat doesn't respond:
1. Check extension logs in Firebase Console
2. Verify Firestore rules allow writes
3. Check if Gemini API is enabled
4. Verify billing account is active

### Quick Links

- **Extension Details**: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/extensions/instances/firestore-genai-chatbot
- **Firestore Data**: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/firestore
- **Extension Logs**: https://console.cloud.google.com/logs

---
**Status**: Extension installed, needs web app configuration to complete setup