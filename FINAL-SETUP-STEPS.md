# 🚀 Final Setup Steps for AI Chatbot

## What's Already Done ✅
1. ✅ Firebase service account configured
2. ✅ Firestore Gemini Chatbot Extension installed
3. ✅ Blaze plan activated
4. ✅ Google Analytics & Ads linked
5. ✅ Teams webhook configured
6. ✅ Firestore rules updated for extension
7. ✅ Firebase SDK installed
8. ✅ Integration code written

## What You Need to Do Now 🔧

### Step 1: Create Firebase Web App (2 minutes)
The Firebase Console should be open in your browser. If not, go to:
https://console.firebase.google.com/project/aura-spring-cleaning-ce122/settings/general

1. Scroll to **"Your apps"** section
2. Click **</> Add app** (Web icon)
3. App nickname: **"Aura Spring Website"**
4. Click **Register app**
5. Copy the configuration shown

### Step 2: Run Configuration Script (1 minute)
```powershell
cd C:\Users\dusta\repos\aura-springs-standalone
powershell scripts\get-firebase-config.ps1
```

When prompted, paste:
- The `apiKey` (starts with AIza...)
- The `appId` (format: 1:xxx:web:xxx)
- The `measurementId` (optional, starts with G-)

### Step 3: Deploy Firestore Rules (1 minute)
```powershell
# Deploy the updated Firestore rules
firebase deploy --only firestore:rules
```

If that doesn't work, manually update in Firebase Console:
1. Go to: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/firestore/rules
2. Copy contents of `firestore.rules` file
3. Paste and click "Publish"

### Step 4: Test the Complete System (2 minutes)

1. **Restart dev server**:
```bash
npm run dev
```

2. **Open website**: http://localhost:3000

3. **Click chat bubble** (bottom right)

4. **Test these messages**:
   - "How much for 3BR/2BA 2000sqft?" → Should get "$200"
   - "I need cleaning today" → Should escalate to Teams
   - "Do you clean The Quincy?" → Should know the building

5. **Check Firestore**: 
   https://console.firebase.google.com/project/aura-spring-cleaning-ce122/firestore/data/~2Fchat_sessions

6. **Check Teams** for notifications

## How the System Works 🔄

```mermaid
User → Chat UI → Firestore → Gemini Extension → AI Response → Firestore → Chat UI
                     ↓                                              ↓
                Teams Notification                          User sees response
```

1. User types message
2. Message saved to Firestore with `status: PENDING`
3. Gemini Extension detects new message
4. Extension sends to Gemini Pro AI
5. AI generates response
6. Extension writes response to Firestore
7. Chat UI updates with response
8. Teams gets notification

## Monitoring & Debugging 🔍

### Check if Extension is Working:
- **Extension Logs**: https://console.cloud.google.com/logs/query;query=resource.type%3D%22firebase_ext%22
- **Firestore Data**: Look for `chat_sessions` collection
- **Extension Dashboard**: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/extensions

### Common Issues & Fixes:

**Chat not responding?**
- Check if web app config is added
- Verify Firestore rules are published
- Check extension logs for errors

**No Teams notifications?**
- Verify TEAMS_WEBHOOK_URL in .env.local
- Check /api/chat endpoint is working

**AI giving generic responses?**
- System prompt may not be included
- Check if extension has correct configuration

## Success Indicators ✨

When everything is working:
- 💬 Chat responds within 2-3 seconds
- 🤖 AI knows your pricing ($150 base + $25 increments)
- 📱 Teams gets instant notifications
- 💾 Chat history saved in Firestore
- 📊 Analytics tracks conversations

## Support Resources 📚

- **Firebase Console**: https://console.firebase.google.com/project/aura-spring-cleaning-ce122
- **Extension Docs**: https://extensions.dev/extensions/googlecloud/firestore-genai-chatbot
- **Gemini API**: https://ai.google.dev/
- **Teams Webhook**: Check CRITICAL-CREDENTIALS.md

---
**Estimated Total Setup Time**: 6 minutes

Once complete, your AI chatbot will be:
- Smarter than competitors' human agents
- Available 24/7
- Integrated with Teams
- Tracking all conversations
- Converting visitors to customers!