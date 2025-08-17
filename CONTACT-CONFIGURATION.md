# Aura Spring Cleaning - Contact Configuration

## Primary Business Contact
**Valerie** (Business Partner)  
**Phone:** (512) 781-0527  
**Role:** Primary contact for all Aura Spring Cleaning leads

## Secondary Contact
**Teams Phone:** (737) 330-1489  
**Role:** Alternative contact number

## Lead Routing Configuration

### All Leads Should:
1. **Primary notification** → Valerie at (512) 781-0527
2. **Copy/backup** → Teams phone or email system
3. **SMS notifications** → Configure Twilio to forward to Valerie

## Website Display Priority
1. **Primary number shown:** (512) 781-0527 (Valerie)
2. **All "Call Now" buttons:** Link to Valerie's number
3. **Contact forms:** Notify Valerie immediately

## Implementation Checklist
- [x] Website displays (512) 781-0527 as primary number
- [ ] Configure SMS forwarding to Valerie
- [ ] Set up email notifications to Valerie
- [ ] Update booking system to notify Valerie
- [ ] Configure voicemail/after-hours routing

## API Configuration Needed
```javascript
// In .env.local
PRIMARY_PHONE=5127810527  // Valerie
PRIMARY_PHONE_DISPLAY=(512) 781-0527
NOTIFICATION_PHONE=5127810527
NOTIFICATION_EMAIL=valerie@auraspringcleaning.com  // Add Valerie's email

// SMS Configuration
TWILIO_NOTIFY_NUMBER=+15127810527  // Send SMS to Valerie
```

## Forms That Need Updates
1. Contact form → Send notification to Valerie
2. Booking form → Send confirmation to Valerie
3. Quote calculator → Send quote requests to Valerie
4. Email capture → Notify Valerie of new leads

## Important Notes
- Valerie is the business partner and primary contact
- All customer inquiries should route to her first
- The (737) 330-1489 Teams number can be backup/secondary
- Ensure Valerie receives ALL leads immediately

---
*Updated: 2025-08-17*
*Primary Contact: Valerie - (512) 781-0527*