// UTM Parameter Tracking and Source Attribution
import { event } from './googleAnalytics';

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Ads Click ID
  fbclid?: string; // Facebook Click ID
}

// Parse UTM parameters from URL
export function parseUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};
  
  // Standard UTM parameters
  if (params.get('utm_source')) utmParams.utm_source = params.get('utm_source')!;
  if (params.get('utm_medium')) utmParams.utm_medium = params.get('utm_medium')!;
  if (params.get('utm_campaign')) utmParams.utm_campaign = params.get('utm_campaign')!;
  if (params.get('utm_term')) utmParams.utm_term = params.get('utm_term')!;
  if (params.get('utm_content')) utmParams.utm_content = params.get('utm_content')!;
  
  // Click IDs for conversion tracking
  if (params.get('gclid')) utmParams.gclid = params.get('gclid')!;
  if (params.get('fbclid')) utmParams.fbclid = params.get('fbclid')!;
  
  return utmParams;
}

// Store UTM parameters in session storage
export function storeUTMParams(params?: UTMParams) {
  if (typeof window === 'undefined') return;
  
  const utmParams = params || parseUTMParams();
  
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
    sessionStorage.setItem('utm_timestamp', new Date().toISOString());
    
    // Track the traffic source
    trackTrafficSource(utmParams);
  }
}

// Retrieve stored UTM parameters
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const stored = sessionStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : {};
}

// Track traffic source in GA
export function trackTrafficSource(params: UTMParams) {
  const source = params.utm_source || (params.gclid ? 'google' : params.fbclid ? 'facebook' : 'direct');
  const medium = params.utm_medium || (params.gclid ? 'cpc' : params.fbclid ? 'social' : 'none');
  const campaign = params.utm_campaign || 'none';
  
  event('traffic_source', {
    source: source,
    medium: medium,
    campaign: campaign,
    term: params.utm_term,
    content: params.utm_content,
    has_gclid: !!params.gclid,
    has_fbclid: !!params.fbclid,
  });
}

// Append UTM parameters to internal links
export function appendUTMToUrl(url: string, params?: UTMParams): string {
  const utmParams = params || getStoredUTMParams();
  
  if (Object.keys(utmParams).length === 0) return url;
  
  const urlObj = new URL(url, window.location.origin);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value && !urlObj.searchParams.has(key)) {
      urlObj.searchParams.set(key, value);
    }
  });
  
  return urlObj.toString();
}

// Track conversions with source attribution
export function trackConversion(conversionType: string, value?: number) {
  const utmParams = getStoredUTMParams();
  
  event(`conversion_${conversionType}`, {
    conversion_type: conversionType,
    value: value,
    source: utmParams.utm_source || 'direct',
    medium: utmParams.utm_medium || 'none',
    campaign: utmParams.utm_campaign || 'none',
    gclid: utmParams.gclid,
    fbclid: utmParams.fbclid,
  });
}

// Pre-built campaign URLs for common sources
export const campaignURLs = {
  // Google Ads
  googleAds: (campaign: string, adGroup?: string) => ({
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: campaign,
    utm_content: adGroup,
  }),
  
  // Facebook/Instagram
  facebook: (campaign: string, adSet?: string) => ({
    utm_source: 'facebook',
    utm_medium: 'social',
    utm_campaign: campaign,
    utm_content: adSet,
  }),
  
  instagram: (campaign: string, post?: string) => ({
    utm_source: 'instagram',
    utm_medium: 'social',
    utm_campaign: campaign,
    utm_content: post,
  }),
  
  // Email campaigns
  email: (campaign: string, segment?: string) => ({
    utm_source: 'email',
    utm_medium: 'email',
    utm_campaign: campaign,
    utm_content: segment,
  }),
  
  // Tower-specific campaigns
  tower: (towerName: string, channel: string) => ({
    utm_source: towerName.toLowerCase().replace(/\s+/g, '-'),
    utm_medium: channel,
    utm_campaign: 'tower-resident',
  }),
  
  // Airbnb host campaigns
  airbnb: (source: string) => ({
    utm_source: source,
    utm_medium: 'referral',
    utm_campaign: 'airbnb-host',
  }),
};

// Generate trackable URLs
export function generateTrackableUrl(baseUrl: string, params: UTMParams): string {
  const url = new URL(baseUrl);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
}

// Common tracking scenarios
export const quickLinks = {
  // For Google Ads
  googleAds: (baseUrl: string) => 
    `${baseUrl}?utm_source=google&utm_medium=cpc&utm_campaign={campaign}&utm_content={adgroup}`,
  
  // For Facebook Ads
  facebookAds: (baseUrl: string) => 
    `${baseUrl}?utm_source=facebook&utm_medium=social&utm_campaign={campaign}&utm_content={adset}`,
  
  // For tower flyers/QR codes
  towerFlyer: (baseUrl: string, towerName: string) => 
    `${baseUrl}?utm_source=${towerName.toLowerCase().replace(/\s+/g, '-')}&utm_medium=qr-code&utm_campaign=tower-flyer`,
  
  // For email campaigns
  emailCampaign: (baseUrl: string, campaignName: string) => 
    `${baseUrl}?utm_source=email&utm_medium=email&utm_campaign=${campaignName}`,
};

// Attribution window (30 days)
export function isAttributionValid(): boolean {
  if (typeof window === 'undefined') return false;
  
  const timestamp = sessionStorage.getItem('utm_timestamp');
  if (!timestamp) return false;
  
  const storedDate = new Date(timestamp);
  const now = new Date();
  const daysDiff = (now.getTime() - storedDate.getTime()) / (1000 * 60 * 60 * 24);
  
  return daysDiff <= 30;
}

// Clear expired attribution
export function clearExpiredAttribution() {
  if (!isAttributionValid()) {
    sessionStorage.removeItem('utm_params');
    sessionStorage.removeItem('utm_timestamp');
  }
}

// Initialize UTM tracking
export function initUTMTracking() {
  if (typeof window === 'undefined') return;
  
  // Store UTM params if present in URL
  storeUTMParams();
  
  // Clear expired attribution
  clearExpiredAttribution();
  
  // Track page view with source
  const params = getStoredUTMParams();
  if (Object.keys(params).length > 0) {
    trackTrafficSource(params);
  }
}