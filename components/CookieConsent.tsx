'use client';

import { useState, useEffect } from 'react';
import { Cookie, Shield, Settings, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be changed
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        applyCookiePreferences(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const applyCookiePreferences = (prefs: typeof preferences) => {
    // Apply preferences to Google Analytics, Facebook Pixel, etc.
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (prefs.analytics && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      } else if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }

      // Marketing cookies
      if (prefs.marketing && window.fbq) {
        window.fbq('consent', 'grant');
      } else if (window.fbq) {
        window.fbq('consent', 'revoke');
      }

      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: prefs }));
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const rejected = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(rejected);
    localStorage.setItem('cookieConsent', JSON.stringify(rejected));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyCookiePreferences(rejected);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-200 animate-slide-up"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="w-5 h-5 text-aura-primary-600" />
                <h2 id="cookie-banner-title" className="text-lg font-semibold text-gray-900">
                  Cookie Preferences
                </h2>
              </div>
              <p id="cookie-banner-description" className="text-sm text-gray-600">
                We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                You can choose which cookies you allow. Read our{' '}
                <Link href="/privacy" className="text-aura-primary-600 hover:underline">
                  Privacy Policy
                </Link>{' '}
                for more information.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                aria-label="Cookie settings"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              
              <button
                onClick={rejectAll}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                aria-label="Reject all cookies"
              >
                Reject All
              </button>
              
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-aura-primary-600 text-white rounded-lg hover:bg-aura-primary-700 transition-colors text-sm font-medium"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowSettings(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-labelledby="cookie-settings-title"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 id="cookie-settings-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-aura-primary-600" />
                  Cookie Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Necessary Cookies</h3>
                    <span className="text-sm text-gray-500">Always Active</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    These cookies are essential for the website to function properly. They enable basic 
                    functions like page navigation and access to secure areas of the website.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                        aria-label="Toggle analytics cookies"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aura-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aura-primary-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. Includes Google Analytics.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Marketing Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer"
                        aria-label="Toggle marketing cookies"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aura-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aura-primary-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Used to track visitors across websites to display relevant advertisements. 
                    Includes Facebook Pixel and Google Ads.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Functional Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                        className="sr-only peer"
                        aria-label="Toggle functional cookies"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aura-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aura-primary-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Enable enhanced functionality and personalization, such as live chat, 
                    language preferences, and saved booking information.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={acceptSelected}
                  className="px-6 py-2 bg-aura-primary-600 text-white rounded-lg hover:bg-aura-primary-700 transition-colors font-medium"
                >
                  Save Preferences
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  For more information about how we use cookies, please see our{' '}
                  <Link href="/privacy" className="text-aura-primary-600 hover:underline">
                    Privacy Policy
                  </Link>
                  . You can change your preferences at any time by clicking the cookie icon in the footer.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

// Extend Window interface for Google Analytics and Facebook Pixel
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}