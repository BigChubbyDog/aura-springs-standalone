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