# 📋 HUMAN TODO LIST - Items Requiring Your Action

## 🔑 API Keys & Credentials Needed

### Analytics & Tracking
1. **Google Analytics 4**
   - [ ] Create GA4 property at https://analytics.google.com
   - [ ] Get Measurement ID (G-XXXXXXXXXX format)
   - [ ] Add to `.env.local`: `NEXT_PUBLIC_GA_ID=your-id`

2. **Google Tag Manager**
   - [ ] Create GTM container at https://tagmanager.google.com
   - [ ] Get Container ID (GTM-XXXX format)
   - [ ] Add to `.env.local`: `NEXT_PUBLIC_GTM_ID=your-id`

3. **Facebook Pixel**
   - [ ] Create Facebook Pixel at https://business.facebook.com/events_manager
   - [ ] Get Pixel ID
   - [ ] Add to `.env.local`: `NEXT_PUBLIC_FB_PIXEL_ID=your-id`
   - [ ] Optional: Get Conversion API token for server-side tracking

4. **Google Ads**
   - [ ] Set up Google Ads account
   - [ ] Create conversion actions for:
     - Booking Completed
     - Quote Requested
     - Phone Call
     - Lead Form
     - Newsletter Signup
   - [ ] Get conversion labels for each action
   - [ ] Add to `.env.local`:
     ```
     NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
     NEXT_PUBLIC_GOOGLE_ADS_BOOKING_LABEL=xxxxx
     NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL=xxxxx
     NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL=xxxxx
     NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=xxxxx
     NEXT_PUBLIC_GOOGLE_ADS_NEWSLETTER_LABEL=xxxxx
     ```

5. **Microsoft Clarity**
   - [ ] Sign up at https://clarity.microsoft.com
   - [ ] Create project for aurasprings.com
   - [ ] Get Project ID
   - [ ] Add to `.env.local`: `NEXT_PUBLIC_CLARITY_PROJECT_ID=your-id`

6. **Hotjar**
   - [ ] Sign up at https://www.hotjar.com (optional, as you have Clarity)
   - [ ] Get Site ID
   - [ ] Add to `.env.local`: `NEXT_PUBLIC_HOTJAR_ID=your-id`

7. **Sentry Error Tracking**
   - [ ] Sign up at https://sentry.io
   - [ ] Create project
   - [ ] Get DSN
   - [ ] Add to `.env.local`: `NEXT_PUBLIC_SENTRY_DSN=your-dsn`

## 📧 Email & Communication Services

8. **Email Service for Lead Capture**
   - [ ] Choose email service (SendGrid, Mailgun, AWS SES, or Resend)
   - [ ] Get API key
   - [ ] Add to `.env.local`: `EMAIL_SERVICE_API_KEY=your-key`
   - [ ] Configure webhook URL for email captures: `EMAIL_CAPTURE_WEBHOOK_URL=your-webhook`

9. **Instagram Integration**
   - [ ] Get Instagram Basic Display API access token
   - [ ] Or provide Instagram business account username for manual updates
   - [ ] Add to `.env.local`: `INSTAGRAM_ACCESS_TOKEN=your-token`

## 📦 Missing Assets & Content

10. **PDF Assets**
    - [ ] Create actual PDF for cleaning checklist at `/public/downloads/ultimate-cleaning-checklist.pdf`
    - [ ] Design should match brand and include 20% off coupon code

11. **Tower-Specific Information** (for SEO pages)
    - [ ] Confirm tower list within 3 miles of Rainey Street:
      - The Quincy ✓
      - 70 Rainey
      - The Shore
      - The Millenium Rainey
      - 44 East Ave
      - The Independent
      - The Austonian
      - Four Seasons Residences
      - W Austin Residences
      - Northshore Austin
      - The Bowie
      - 5th & West Residences
    
    - [ ] For each tower provide:
      - Exact address
      - Number of units
      - Property management company
      - Parking/access instructions
      - Any special rates for residents
      - Concierge contact info (if partnership exists)

12. **Images & Media**
    - [ ] Professional photos of team cleaning high-rise units
    - [ ] Before/after photos from actual tower apartments
    - [ ] Photos of Austin skyline/towers for landing pages
    - [ ] Team member headshots (if showing actual team)

## 🔧 Technical Setup

13. **Domain Verification**
    - [ ] Verify domain ownership in Google Search Console
    - [ ] Add verification code to `.env.local`: `GOOGLE_SITE_VERIFICATION=your-code`
    - [ ] Verify domain in Facebook Business Manager (already have meta tag)

14. **Payment Processing** (if not already setup)
    - [ ] Stripe/Square/PayPal API keys
    - [ ] Test and production keys

## 📊 Business Information

15. **Service Pricing**
    - [ ] Specific pricing for tower units:
      - Studio apartments
      - 1-bedroom
      - 2-bedroom
      - 3-bedroom+
      - Penthouse units
    - [ ] Add-on services pricing
    - [ ] Recurring service discounts

16. **Legal/Compliance**
    - [ ] Privacy Policy URL (if external)
    - [ ] Terms of Service URL (if external)
    - [ ] Insurance information to display
    - [ ] Business license number

## 🎯 Marketing Materials

17. **Testimonials & Reviews**
    - [ ] Google reviews from tower residents
    - [ ] Permission to use customer names/photos
    - [ ] Video testimonials (if available)

18. **Competitive Advantages**
    - [ ] List of competitors serving these towers
    - [ ] Your unique selling points for high-rise residents
    - [ ] Any exclusive partnerships or certifications

## 🚀 Deployment

19. **Azure Configuration**
    - [ ] Confirm these environment variables are set in Azure:
      - All API keys mentioned above
      - Database connection strings (if applicable)
      - Email service configuration

20. **Testing**
    - [ ] Test phone number for SMS notifications
    - [ ] Test email addresses for form submissions
    - [ ] Staging environment URL for testing

## 📝 Optional Enhancements

21. **Advanced Features**
    - [ ] Twilio credentials for SMS reminders
    - [ ] Calendar integration (Google/Outlook) API keys
    - [ ] Review platform API keys (Google, Yelp)
    - [ ] CRM integration details (HubSpot, Salesforce, etc.)

## 🎨 Branding

22. **Brand Assets**
    - [ ] High-resolution logo variations
    - [ ] Brand guidelines (exact colors, fonts)
    - [ ] Approved marketing copy/taglines

## 💬 Live Chat & Support Systems

23. **Live Chat Platform** (Choose One)
    - [ ] **Option A: Intercom**
      - Sign up at intercom.com
      - Get App ID and API Key
      - Add to `.env.local`:
        ```
        NEXT_PUBLIC_INTERCOM_APP_ID=your-app-id
        INTERCOM_ACCESS_TOKEN=your-token
        ```
    - [ ] **Option B: Crisp Chat**
      - Sign up at crisp.chat
      - Get Website ID
      - Add to `.env.local`:
        ```
        NEXT_PUBLIC_CRISP_WEBSITE_ID=your-id
        ```
    - [ ] **Option C: Tawk.to** (Free)
      - Sign up at tawk.to
      - Get Property ID and Widget ID
      - Add to `.env.local`:
        ```
        NEXT_PUBLIC_TAWK_PROPERTY_ID=your-property-id
        NEXT_PUBLIC_TAWK_WIDGET_ID=your-widget-id
        ```

24. **Chat Bot / AI Assistant**
    - [ ] **Option A: Dialogflow (Google)**
      - Create agent at dialogflow.cloud.google.com
      - Get Service Account Key
      - Add to `.env.local`:
        ```
        DIALOGFLOW_PROJECT_ID=your-project-id
        DIALOGFLOW_PRIVATE_KEY=your-key
        ```
    - [ ] **Option B: OpenAI GPT**
      - Get API key from platform.openai.com
      - Add to `.env.local`:
        ```
        OPENAI_API_KEY=your-api-key
        ```

## 📅 Booking & Scheduling

25. **Calendar Integration**
    - [ ] **Google Calendar API**
      - Enable API at console.cloud.google.com
      - Create service account
      - Share calendar with service account email
      - Add to `.env.local`:
        ```
        GOOGLE_CALENDAR_ID=your-calendar-id
        GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
        GOOGLE_PRIVATE_KEY=your-private-key
        ```
    - [ ] **Microsoft Graph API** (for Outlook)
      - Register app in Azure AD
      - Get Client ID and Secret
      - Add to `.env.local`:
        ```
        MICROSOFT_CLIENT_ID=your-client-id
        MICROSOFT_CLIENT_SECRET=your-secret
        MICROSOFT_TENANT_ID=your-tenant-id
        ```

26. **Scheduling Platform Integration**
    - [ ] **Calendly API**
      - Get API key from calendly.com/integrations
      - Add to `.env.local`:
        ```
        CALENDLY_API_KEY=your-api-key
        CALENDLY_USER_URI=your-user-uri
        ```
    - [ ] **Acuity Scheduling**
      - Get User ID and API Key
      - Add to `.env.local`:
        ```
        ACUITY_USER_ID=your-user-id
        ACUITY_API_KEY=your-api-key
        ```

## 👥 Customer Portal

27. **Authentication Provider**
    - [ ] **Auth0**
      - Create application at auth0.com
      - Add to `.env.local`:
        ```
        AUTH0_DOMAIN=your-domain.auth0.com
        AUTH0_CLIENT_ID=your-client-id
        AUTH0_CLIENT_SECRET=your-secret
        ```
    - [ ] **Firebase Auth**
      - Set up project at firebase.google.com
      - Add to `.env.local`:
        ```
        FIREBASE_API_KEY=your-api-key
        FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
        FIREBASE_PROJECT_ID=your-project-id
        ```
    - [ ] **Clerk**
      - Sign up at clerk.dev
      - Add to `.env.local`:
        ```
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
        CLERK_SECRET_KEY=your-secret
        ```

## 🎁 Referral Program

28. **Referral Tracking Platform**
    - [ ] **ReferralCandy**
      - Sign up and get API credentials
      - Add to `.env.local`:
        ```
        REFERRALCANDY_API_KEY=your-key
        REFERRALCANDY_SECRET_KEY=your-secret
        ```
    - [ ] **Post Affiliate Pro**
      - Get API credentials
      - Add to `.env.local`:
        ```
        PAP_API_URL=your-url
        PAP_USERNAME=your-username
        PAP_API_KEY=your-key
        ```
    - [ ] **Rewardful**
      - Get API key from rewardful.com
      - Add to `.env.local`:
        ```
        REWARDFUL_API_KEY=your-key
        ```

## ⭐ Review Management

29. **Review Platforms API**
    - [ ] **Google Places API**
      - Enable in Google Cloud Console
      - Get API Key and Place ID
      - Add to `.env.local`:
        ```
        GOOGLE_PLACES_API_KEY=your-key
        GOOGLE_PLACE_ID=your-place-id
        ```
    - [ ] **Yelp Fusion API**
      - Get API key from yelp.com/developers
      - Find your business ID
      - Add to `.env.local`:
        ```
        YELP_API_KEY=your-key
        YELP_BUSINESS_ID=your-business-id
        ```
    - [ ] **Trustpilot API**
      - Get API credentials
      - Add to `.env.local`:
        ```
        TRUSTPILOT_API_KEY=your-key
        TRUSTPILOT_API_SECRET=your-secret
        TRUSTPILOT_BUSINESS_UNIT_ID=your-id
        ```

30. **Review Request Automation**
    - [ ] **BirdEye**
      - Get API credentials
      - Add to `.env.local`:
        ```
        BIRDEYE_API_KEY=your-key
        BIRDEYE_BUSINESS_ID=your-id
        ```
    - [ ] **Grade.us**
      - Get API access
      - Add to `.env.local`:
        ```
        GRADEUS_API_KEY=your-key
        ```

## 🏠 Property Management Integration

31. **Building Management Systems**
    - [ ] For each tower, get:
      - Property manager contact email
      - Preferred communication method
      - Bulk discount agreements
      - Concierge desk phone numbers
      - Parking validation process
      - Service elevator access times
      - Insurance requirements
      - Background check requirements

32. **Access Management**
    - [ ] **BuildingLink Integration** (if applicable)
      - Get API access from property managers
      - Add credentials to `.env.local`
    - [ ] **Butterfly MX** (for buildings with this system)
      - Get integration credentials
      - Add to `.env.local`

## 📊 Business Intelligence

33. **Analytics Dashboard**
    - [ ] **Looker Studio** (formerly Google Data Studio)
      - Connect GA4, Google Ads, and other data sources
      - Create dashboard for tracking KPIs
    - [ ] **Segment**
      - Get Write Key from segment.com
      - Add to `.env.local`:
        ```
        NEXT_PUBLIC_SEGMENT_WRITE_KEY=your-key
        ```

34. **Customer Data Platform**
    - [ ] **Mixpanel**
      - Get Project Token
      - Add to `.env.local`:
        ```
        NEXT_PUBLIC_MIXPANEL_TOKEN=your-token
        ```
    - [ ] **Amplitude**
      - Get API Key
      - Add to `.env.local`:
        ```
        NEXT_PUBLIC_AMPLITUDE_API_KEY=your-key
        ```

---

## Priority Order (Recommended)

### 🔴 Critical (Do First)
1. Google Analytics 4 ID
2. Facebook Pixel ID
3. Email service API key
4. Tower addresses and details
5. Actual PDF cleaning checklist

### 🟡 Important (Do Second)
6. Google Ads conversion labels
7. Microsoft Clarity ID
8. Instagram access token
9. Professional photos
10. Tower-specific pricing

### 🟢 Nice to Have (Do Later)
11. Sentry error tracking
12. Video testimonials
13. Advanced integrations
14. Competitive analysis details

---

**Note**: Most features will work without these, but having them will significantly improve tracking, conversions, and SEO performance.