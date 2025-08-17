# 📞 Microsoft Teams Phone Configuration

## Primary Contact - Valerie
**Name:** Valerie (Business Partner)  
**Teams Phone:** (512) 781-0527  
**Email:** valerie@auraspringcleaning.com  
**Role:** Primary contact for all Aura Spring Cleaning leads

## Secondary Contact
**Teams Phone:** (737) 330-1489  
**Role:** Backup/secondary contact

---

## ✅ Teams Phone System Setup

### Phone Numbers
1. **Primary:** (512) 781-0527 - Valerie's Teams number
2. **Secondary:** (737) 330-1489 - Backup Teams number

### How It Works
- Both numbers are **Microsoft Teams Phone System** numbers
- Calls route directly to Teams app (desktop/mobile)
- No Twilio or third-party services needed
- Voicemail goes to Teams/Outlook

---

## 📱 Lead Routing Configuration

### All Customer Calls
- **Primary number displayed:** (512) 781-0527 (Valerie)
- **Calls ring:** Valerie's Teams app
- **Backup:** (737) 330-1489 if needed

### Email Notifications
- **Primary:** valerie@auraspringcleaning.com
- **CC:** dustin@auraspringcleaning.com

### Website Configuration
```javascript
// Environment Variables (.env.local)
NEXT_PUBLIC_PHONE=(512) 781-0527  // Valerie's Teams number
TEAMS_PHONE_PRIMARY=+15127810527
TEAMS_PHONE_SECONDARY=+17373301489
EMAIL_TO=valerie@auraspringcleaning.com
```

---

## 🔧 Teams Integration Features

### Available with Teams Phone
- ✅ Direct call routing to Teams app
- ✅ Voicemail transcription
- ✅ Call forwarding/delegation
- ✅ Auto-attendant options
- ✅ Call recording
- ✅ SMS/text messaging (if enabled)

### Setup in Teams Admin Center
1. Go to: https://admin.teams.microsoft.com
2. Navigate to: Voice > Phone numbers
3. Assign numbers to users (Valerie gets primary)
4. Configure call routing policies

---

## 📊 Lead Flow

```
Customer Calls (512) 781-0527
    ↓
Rings Valerie's Teams App
    ↓
If no answer → Teams Voicemail
    ↓
Voicemail notification → Valerie's email
```

---

## 🚀 Advantages of Teams Phone

1. **Integrated with Microsoft 365** - All in one ecosystem
2. **Mobile app** - Answer calls anywhere
3. **Voicemail to email** - Never miss a message
4. **Call analytics** - Track in Teams admin center
5. **No third-party costs** - Part of M365 subscription

---

## 📝 Important Notes

- **NO TWILIO NEEDED** - Using Teams Phone System
- **Both numbers are Teams numbers**
- **Valerie's number (512) 781-0527** is primary
- **All website CTAs** point to Valerie's number
- **Email notifications** go to valerie@auraspringcleaning.com

---

*Configuration Date: 2025-08-17*  
*Phone System: Microsoft Teams*  
*Primary Contact: Valerie - (512) 781-0527*