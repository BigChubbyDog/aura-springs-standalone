# Email Routing Configuration for Aura Spring Cleaning

## 📧 Primary Email Recipients

### Business Owners
- **Valerie Boatman** (Primary Contact)
  - Email: `valerie@auraspringcleaning.com`
  - Phone: (512) 781-0527
  - Receives: ALL new bookings, cancellations, quotes, urgent matters
  - Role: Owner, primary decision maker

- **Dustin Allan** (Technical & Financial)
  - Email: `dustin@auraspringcleaning.com`
  - Receives: CC on bookings, payment notifications, system alerts
  - Role: Co-owner, handles tech and finances

## 📮 System Email Addresses

### Automated System Accounts
- **booking@auraspringcleaning.com**
  - Purpose: Sends booking confirmations to customers
  - Type: System account (sender)
  - Monitored by: Valerie

- **hello@auraspringcleaning.com**
  - Purpose: General inquiries, customer service
  - Type: Monitored inbox
  - Monitored by: Valerie

- **schedule@auraspringcleaning.com**
  - Purpose: Calendar management, scheduling changes
  - Type: Has calendar attached
  - Monitored by: Valerie

## 👥 Team Distribution Groups

### Management Team
```
EMAIL_MANAGEMENT=valerie@auraspringcleaning.com,dustin@auraspringcleaning.com
```

### Cleaning Team
```
EMAIL_CLEANERS=ann@auraspringcleaning.com,anna@auraspringcleaning.com,rene@auraspringcleaning.com,tianqi@auraspringcleaning.com
```
- **Ann**: Cleaner
- **Anna**: Cleaner
- **Rene**: Cleaner
- **Tianqi**: Cleaner

### System Accounts
```
EMAIL_SYSTEMS=booking@auraspringcleaning.com,hello@auraspringcleaning.com,schedule@auraspringcleaning.com
```

## 🔄 Event-Based Email Routing

### NEW_BOOKING Event
When a new booking is received:
- **To**: `valerie@auraspringcleaning.com`, `dustin@auraspringcleaning.com`
- **CC**: `booking@auraspringcleaning.com`
- **BCC**: `schedule@auraspringcleaning.com`
- **Priority**: HIGH
- **Actions**: 
  - Create calendar event
  - Send Teams notification
  - Customer gets confirmation

### BOOKING_MODIFIED Event
When a booking is changed:
- **To**: `schedule@auraspringcleaning.com`
- **CC**: `valerie@auraspringcleaning.com`
- **Priority**: MEDIUM
- **Actions**:
  - Update calendar event
  - Notify affected cleaners

### BOOKING_CANCELLED Event
When a booking is cancelled:
- **To**: `valerie@auraspringcleaning.com`
- **CC**: `dustin@auraspringcleaning.com`, `schedule@auraspringcleaning.com`
- **Priority**: HIGH
- **Actions**:
  - Remove calendar event
  - Alert team immediately

### CUSTOMER_INQUIRY Event
General customer questions:
- **To**: `hello@auraspringcleaning.com`
- **CC**: `valerie@auraspringcleaning.com`
- **Priority**: MEDIUM
- **Actions**:
  - Create task for follow-up

### QUOTE_REQUEST Event
Quote requests from website:
- **To**: `valerie@auraspringcleaning.com`
- **CC**: `booking@auraspringcleaning.com`
- **Priority**: MEDIUM
- **Actions**:
  - Create lead in CRM
  - Schedule follow-up

### TEAM_ASSIGNMENT Event
Assigning cleaners to jobs:
- **To**: `cleaners@auraspringcleaning.com` (goes to all cleaners)
- **CC**: `schedule@auraspringcleaning.com`
- **Priority**: LOW
- **Actions**:
  - Update calendar with team info

### SERVICE_COMPLETED Event
After service is done:
- **To**: `valerie@auraspringcleaning.com`
- **CC**: `booking@auraspringcleaning.com`
- **Priority**: LOW
- **Actions**:
  - Update CRM
  - Request customer review

### PAYMENT_RECEIVED Event
Payment confirmations:
- **To**: `dustin@auraspringcleaning.com`
- **CC**: `booking@auraspringcleaning.com`
- **Priority**: LOW
- **Actions**:
  - Update invoice status

### EMERGENCY_BOOKING Event
Last-minute urgent bookings:
- **To**: `valerie@auraspringcleaning.com`, `dustin@auraspringcleaning.com`
- **SMS**: (512) 781-0527 (Valerie's cell)
- **Priority**: URGENT
- **Actions**:
  - Send SMS alert
  - Create urgent calendar event
  - Teams notification with alert

## 📱 SMS Notifications

### Primary SMS Contact
- **Valerie Boatman**: (512) 781-0527
- **Receives SMS for**:
  - Emergency bookings
  - System critical errors
  - VIP customer requests

## 📊 Email Volume Management

### Daily Email Flow
- **New Bookings**: 5-10 per day → Valerie
- **Modifications**: 2-3 per day → Schedule account
- **Inquiries**: 10-15 per day → Hello account
- **Quotes**: 3-5 per day → Valerie

### Email Priority Levels
1. **URGENT** (Red): Emergency bookings, system failures
2. **HIGH** (Green): New bookings, cancellations
3. **MEDIUM** (Yellow): Modifications, quotes, inquiries
4. **LOW** (Gray): Completions, payments, routine updates

## 🔐 Email Security & Access

### Who Has Access
- **Full Access**: Valerie (all accounts)
- **Financial Access**: Dustin (payment notifications)
- **System Access**: Automated booking system
- **Calendar Access**: Schedule account (automated)

### Email Authentication
- **SMTP**: Microsoft 365 authenticated
- **Graph API**: OAuth2 with service principal
- **Security**: All emails encrypted in transit

## 📝 Configuration Location

### Environment Variables (.env.local)
```env
# Primary recipient
EMAIL_TO=valerie@auraspringcleaning.com

# CC recipients
EMAIL_CC=dustin@auraspringcleaning.com,hello@auraspringcleaning.com

# BCC recipients
EMAIL_BCC=schedule@auraspringcleaning.com

# Sender
EMAIL_FROM=booking@auraspringcleaning.com

# Distribution groups
EMAIL_MANAGEMENT=valerie@auraspringcleaning.com,dustin@auraspringcleaning.com
EMAIL_CLEANERS=ann@auraspringcleaning.com,anna@auraspringcleaning.com,rene@auraspringcleaning.com,tianqi@auraspringcleaning.com
EMAIL_SYSTEMS=booking@auraspringcleaning.com,hello@auraspringcleaning.com,schedule@auraspringcleaning.com
```

## 🎯 Key Points for Claude

1. **Valerie gets everything important** - She's the primary contact
2. **Dustin handles tech and payments** - CC him on financial matters
3. **booking@ sends, doesn't receive** - It's the system sender account
4. **hello@ is for customer service** - General inquiries go here
5. **schedule@ manages the calendar** - Has the master calendar attached
6. **Emergency bookings trigger SMS** - Direct to Valerie's phone
7. **Cleaners have individual emails** - Ann, Anna, Rene, Tianqi

## 🚨 Important Notes

- **Never send sensitive data** to cleaner emails
- **Always CC Valerie** on important matters
- **Use schedule@** for calendar-related updates
- **Emergency SMS** only for true emergencies (< 24hr notice)
- **Payment emails** always include Dustin

## 📞 Contact Hierarchy

1. **First Contact**: Valerie (owner) - all business decisions
2. **Technical Issues**: Dustin - system/payment problems
3. **Scheduling**: schedule@ account - calendar changes
4. **General**: hello@ account - customer service

This configuration ensures Valerie stays informed of all important business activities while Dustin handles technical and financial aspects. The system is designed to route emails intelligently based on the type of event.