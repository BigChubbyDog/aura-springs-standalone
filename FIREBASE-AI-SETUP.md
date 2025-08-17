# 🤖 Firebase Vertex AI Setup for Aura Spring Cleaning

## Quick Setup (5 minutes)

### Step 1: Get Your Firebase/Google Cloud API Key

1. Go to https://console.cloud.google.com/
2. Select or create a project (e.g., "aura-spring-cleaning")
3. Enable the Vertex AI API:
   - Go to **APIs & Services** → **Enable APIs**
   - Search for "Vertex AI API" and enable it
4. Create API Key:
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **API Key**
   - Copy your API key

### Step 2: Alternative - Use Google AI Studio (Easier!)

1. Go to https://makersuite.google.com/app/apikey
2. Click **Get API Key**
3. Create new API key or use existing
4. Copy the key - this works with Gemini Pro for free!

### Step 3: Add to Environment Variables

Add to your `.env.local`:
```env
# Google AI / Vertex AI
GOOGLE_AI_API_KEY=your-api-key-here
FIREBASE_PROJECT_ID=your-project-id
```

### Step 4: Install Dependencies

```bash
npm install @google/generative-ai firebase-admin
```

## Features Included

✅ **AI-Powered Chat Responses**
- Natural language understanding
- Context-aware conversations
- Automatic entity extraction (names, emails, phones)
- Service recommendations based on conversation

✅ **Teams Real-Time Integration**
- New chat notifications
- Message monitoring every 5 messages
- Escalation alerts for urgent requests
- Direct links to call/email customer

✅ **Smart Escalation Triggers**
- "Talk to human" / "real person"
- Complaints or urgent issues
- Customer frustration detection
- Automatic Teams alert

✅ **Conversation Features**
- Remembers context throughout chat
- Extracts customer details automatically
- Provides accurate pricing based on new formula
- Suggests appropriate services

## Testing Your Setup

### 1. Test API Connection
```bash
curl -X GET http://localhost:3000/api/chat
```

Should return:
```json
{
  "status": "online",
  "features": {
    "ai_powered": true,
    "teams_integration": true,
    "escalation": true
  }
}
```

### 2. Test AI Response
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How much for a 3 bedroom house?", "sessionId": "test-123"}'
```

### 3. Test Teams Notification
The Teams webhook will automatically notify when:
- New chat starts
- Customer needs help
- Escalation triggered

## AI Capabilities

The AI assistant knows:
- **Pricing**: New structure ($150 base, +$25 per 250sqft/room)
- **Services**: Standard, Deep, Move-in/out, Airbnb, Post-construction
- **Buildings**: All Rainey Street towers
- **Availability**: Same-day service emphasis
- **Contact**: Valerie (512) 781-0527

## Common Questions It Can Answer

- "How much for a 3BR/2BA 2000sqft home?" → **$200**
- "Do you service The Quincy?" → **Yes, with resident discount**
- "I need cleaning today" → **Connects to Valerie immediately**
- "What's included in deep cleaning?" → **Detailed explanation**
- "Do you use eco-friendly products?" → **Yes, all products are green**

## Monitoring in Teams

You'll see in Teams:
```
💬 New Chat Started
Customer: John Smith
Email: john@example.com
Session: chat-xxx-yyy
Message: "I need a quote for my apartment"
AI Response: "I'd be happy to help! What's the size..."
[Call Customer] [Email Customer] [View Chat]
```

## Troubleshooting

### If AI doesn't respond:
1. Check API key is set in `.env.local`
2. Verify Google AI API is enabled
3. Check console for errors
4. Fallback uses smart rule-based responses

### If Teams notifications don't work:
1. Verify TEAMS_WEBHOOK_URL in `.env.local`
2. Check webhook is still active in Teams
3. Test with `scripts/test-teams-notification.ps1`

## Cost

- **Gemini Pro**: Free tier includes 60 requests/minute
- **Vertex AI**: $0.00025 per 1K characters (very cheap)
- **Recommended**: Start with free Gemini Pro

## Next Steps

1. Get API key from Google AI Studio (2 min)
2. Add to `.env.local` (30 sec)
3. Restart dev server (10 sec)
4. Test chat on website
5. Watch Teams for notifications!

---
**Ready to go! Your AI chat is now smarter than most competitors' human agents!** 🚀