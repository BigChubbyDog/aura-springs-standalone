# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Deployment
```bash
npm run deploy              # Deploy to Azure (uses PowerShell script)
npm run deploy:staging      # Deploy to staging environment
npm run deploy:prod         # Build and deploy to production
```

### Analysis
```bash
npm run analyze    # Analyze bundle size with @next/bundle-analyzer
npm run sitemap    # Generate sitemap
```

## High-Level Architecture

This is a Next.js 15 application for Aura Spring Cleaning, an Austin-based luxury cleaning service specializing in downtown high-rises and Airbnb properties.

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 3.4 with custom utilities
- **UI Components**: Radix UI primitives, Lucide icons, Framer Motion animations
- **Forms**: React Hook Form with Zod validation
- **Integrations**: 
  - Azure (App Service, Key Vault, Application Insights)
  - Microsoft Graph API for Dynamics 365
  - Stripe/Square/PayPal payment processing
  - Image optimization with Unsplash/Pexels APIs

### Key Directories
- `app/` - Next.js App Router pages and API routes
  - `api/` - Backend API endpoints (booking, contact, quotes, webhooks)
  - `services/` - Service-specific landing pages (SEO optimized)
  - `areas/` - Location-specific pages for Austin neighborhoods
- `components/` - Reusable React components
  - `booking/` - Booking widgets and forms
  - `SEO/` - Schema markup and geo-targeting components
  - `sections/` - Homepage sections (Hero, Services, Testimonials)
- `lib/` - Business logic and integrations
  - Azure, Dynamics 365, pricing services
- `scripts/` - Deployment and utility PowerShell scripts

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured (@/components, @/lib, etc.)
- Target ES2022 with incremental compilation

### Build Configuration
- Standalone output for containerized deployment
- Image optimization with AVIF/WebP support
- Bundle optimization for specific packages
- Security headers and HTTPS enforcement

### Azure Deployment
The application deploys to Azure App Service with:
- Resource group: `rg-auraspringcleaning-prod`
- Web app: `auraspringcleaning`
- Custom domains: auraspringcleaning.com, www.auraspringcleaning.com
- Key Vault for secrets management
- Application Insights for monitoring

Deployment uses either PowerShell script (`scripts/deploy-to-azure.ps1`) or Azure Pipelines (`azure-pipelines.yml`).

### Environment Variables
Required environment variables include Azure credentials, API keys for Stripe/image services, and Dynamics 365 configuration. See README.md for setup details.