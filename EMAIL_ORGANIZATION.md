# Aura Spring Cleaning - Email & Calendar Organization

## 📧 Email Accounts Structure

### Management Team
- **valerie@auraspringcleaning.com** - Valerie Boatman (COO & Co-Founder)
  - Primary contact for operations
  - Receives all high-priority notifications
  - Phone: (512) 781-0527

- **dustin@auraspringcleaning.com** - Dustin Allan (CEO & Co-Founder)  
  - Technical operations and payments
  - Receives financial notifications

### System Accounts
- **booking@auraspringcleaning.com** - Automated Booking System
  - Sends booking confirmations
  - Password: `CleanTX#2025!System$Notify`
  - License: O365 Business Premium

- **hello@auraspringcleaning.com** - Customer Service
  - Primary customer contact email
  - Monitored by team
  - Password: `CleanTX#2025!Service$Main`
  - License: O365 Business Premium

- **schedule@auraspringcleaning.com** - Master Calendar System
  - Hosts master calendar
  - Manages all appointments
  - Password: `AuraClean#2025!Calendar$Auto`
  - License: O365 Business Premium

- **mail@auraspringcleaning.com** - Primary Mail System
  - System notifications
  - Password: `AuraClean#2025!System$Primary`

- **noreply@auraspringcleaning.com** - No-Reply System
  - One-way communications
  - Password: `AuraClean#2025!System$Auto`

- **accessibility@auraspringcleaning.com** - Accessibility Support
  - ADA compliance inquiries
  - Password: `AuraClean#2025!Support$Access`

### Cleaning Team
- **ann@auraspringcleaning.com** - Ann (Cleaner)
- **anna@auraspringcleaning.com** - Anna (Cleaner)
- **rene@auraspringcleaning.com** - Rene (Cleaner)
- **tianqi@auraspringcleaning.com** - Tianqi (Cleaner)

## 📊 Distribution Groups

### 1. **Aura Spring Management** (management@auraspringcleaning.com)
- Members: Valerie, Dustin
- Purpose: Executive decisions, high-priority items

### 2. **Aura Spring Cleaners** (cleaners@auraspringcleaning.com)
- Members: Ann, Anna, Rene, Tianqi
- Purpose: Team assignments, schedule updates

### 3. **Aura Spring Systems** (systems@auraspringcleaning.com)
- Members: booking@, hello@, schedule@, noreply@, mail@
- Purpose: System notifications, automated processes

## 📅 Master Calendar Configuration

**Primary Calendar:** schedule@auraspringcleaning.com

### Calendar Categories:
- 🟢 **Standard Cleaning** (Green)
- 🔵 **Deep Cleaning** (Blue)
- 🟠 **Move In/Out** (Orange)
- 🟣 **Airbnb Turnover** (Purple)
- 🔴 **Commercial** (Red)
- 🔺 **Emergency Service** (Dark Red)

## 🔔 Webhook Routing Logic

### Event Types & Routing:

#### 1. **NEW_BOOKING** 🎉
- **Priority:** HIGH
- **Teams Webhook:** Main channel
- **Email To:** valerie@, dustin@
- **Email CC:** booking@
- **Calendar:** Create event
- **Color:** Green

#### 2. **BOOKING_MODIFIED** ✏️
- **Priority:** MEDIUM
- **Teams Webhook:** Main channel
- **Email To:** schedule@
- **Email CC:** valerie@
- **Calendar:** Update event
- **Color:** Amber

#### 3. **BOOKING_CANCELLED** ❌
- **Priority:** HIGH
- **Teams Webhook:** Main channel
- **Email To:** valerie@
- **Email CC:** dustin@, schedule@
- **Calendar:** Remove event
- **Color:** Red

#### 4. **CUSTOMER_INQUIRY** 💬
- **Priority:** MEDIUM
- **Teams Webhook:** Main channel
- **Email To:** hello@
- **Email CC:** valerie@
- **Task:** Create follow-up
- **Color:** Info Blue

#### 5. **QUOTE_REQUEST** 💰
- **Priority:** MEDIUM
- **Teams Webhook:** Main channel
- **Email To:** valerie@
- **Email CC:** booking@
- **Task:** Create quote
- **Color:** Purple

#### 6. **TEAM_ASSIGNMENT** 👥
- **Priority:** LOW
- **Teams Webhook:** Main channel
- **Email To:** cleaners@
- **Email CC:** schedule@
- **Calendar:** Update with team
- **Color:** Gray

#### 7. **SERVICE_COMPLETED** ✅
- **Priority:** LOW
- **Teams Webhook:** Main channel
- **Email To:** valerie@
- **Email CC:** booking@
- **Calendar:** Mark complete
- **Color:** Green

#### 8. **PAYMENT_RECEIVED** 💳
- **Priority:** LOW
- **Teams Webhook:** Main channel
- **Email To:** dustin@
- **Email CC:** booking@
- **Color:** Green

#### 9. **EMERGENCY_BOOKING** 🚨
- **Priority:** URGENT
- **Teams Webhook:** Main channel
- **Email To:** valerie@, dustin@
- **SMS To:** (512) 781-0527
- **Calendar:** Create urgent event
- **Color:** Bright Red

## 🔐 Security Notes

1. All system accounts have complex passwords stored securely
2. O365 licenses assigned to key accounts
3. Multi-factor authentication recommended for management accounts
4. Service principal authentication for automated systems

## 🚀 Implementation

### Email Flow:
1. Customer books online → booking@ sends confirmation
2. New booking → Teams webhook + email to management
3. Calendar event created on schedule@ calendar
4. Team assignment → email to cleaners@
5. Service complete → update calendar, notify management

### Priority Levels:
- **URGENT:** Immediate notification (SMS + Email + Teams)
- **HIGH:** Quick response needed (Email + Teams)
- **MEDIUM:** Standard processing (Email + Teams)
- **LOW:** Informational only (Teams)

## 📋 Quick Reference

### Customer-Facing Emails:
- **hello@auraspringcleaning.com** - General inquiries
- **booking@auraspringcleaning.com** - Booking confirmations
- **accessibility@auraspringcleaning.com** - ADA support

### Internal Operations:
- **valerie@auraspringcleaning.com** - Operations manager
- **dustin@auraspringcleaning.com** - Technical/Financial
- **schedule@auraspringcleaning.com** - Calendar management
- **cleaners@auraspringcleaning.com** - Team distribution

### System Accounts:
- **mail@auraspringcleaning.com** - System mail
- **noreply@auraspringcleaning.com** - One-way communications

## 🔄 Integration Points

1. **Website Contact Form** → hello@
2. **Booking System** → booking@ + schedule@ (calendar)
3. **Teams Webhook** → All notifications
4. **Microsoft Graph API** → Email sending
5. **Dynamics 365** → Customer management

---
*Last Updated: 2025-08-18*
*Configured by: Claude with Dustin Allan*