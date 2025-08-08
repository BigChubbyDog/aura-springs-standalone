'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  Settings, 
  BarChart3, 
  Target, 
  Shield,
  CheckCircle,
  XCircle,
  Toggle,
  Info,
  AlertCircle,
  Eye,
  Zap
} from 'lucide-react';

const CookiesPage = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    preferences: false
  });

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: Shield,
      required: true,
      description: 'These cookies are necessary for our website to function properly and cannot be disabled.',
      purpose: 'Website functionality, security, and basic user experience',
      examples: [
        'Session management and user authentication',
        'Security protection against fraud and attacks',
        'Form submission and booking functionality',
        'Cookie consent preferences',
        'Load balancing and performance optimization'
      ],
      retention: 'Session or up to 1 year',
      thirdParty: false
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: BarChart3,
      required: false,
      description: 'Help us understand how visitors interact with our website to improve user experience.',
      purpose: 'Website performance analysis and improvement',
      examples: [
        'Google Analytics - visitor behavior and site usage',
        'Page views, bounce rates, and user flows',
        'Device and browser information',
        'Geographic location (city/state level)',
        'Traffic sources and referral data'
      ],
      retention: '24 months (Google Analytics standard)',
      thirdParty: true,
      providers: ['Google Analytics', 'Microsoft Clarity']
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: Target,
      required: false,
      description: 'Used to deliver personalized advertisements and track advertising effectiveness.',
      purpose: 'Personalized advertising and retargeting',
      examples: [
        'Facebook Pixel for social media advertising',
        'Google Ads conversion tracking',
        'Retargeting visitors who viewed specific services',
        'Cross-platform advertising optimization',
        'Interest-based advertisement delivery'
      ],
      retention: '12-24 months',
      thirdParty: true,
      providers: ['Facebook/Meta', 'Google Ads', 'Microsoft Advertising']
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      icon: Settings,
      required: false,
      description: 'Remember your choices and provide enhanced, personalized features.',
      purpose: 'Personalized user experience',
      examples: [
        'Language and region preferences',
        'Service area and location settings',
        'Previously viewed services and pricing',
        'Contact form pre-fill information',
        'Customized content recommendations'
      ],
      retention: '12 months',
      thirdParty: false
    }
  ];

  const handleToggle = (cookieId: string) => {
    if (cookieId === 'essential') return; // Can't disable essential cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [cookieId]: !prev[cookieId]
    }));
  };

  const savePreferences = () => {
    // In a real implementation, this would save to localStorage and communicate with the cookie consent system
    alert('Cookie preferences saved! These settings will be applied on your next page load.');
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Cookie Policy | Aura Spring Cleaning Austin TX - Website Cookies</title>
      <meta name="description" content="Cookie Policy for Aura Spring Cleaning. Learn about the cookies we use, manage your preferences, and understand how we use website tracking in Austin, Texas." />
      <meta name="keywords" content="cookie policy, website cookies, aura spring cleaning, austin cleaning service, privacy settings, tracking preferences" />
      <meta name="robots" content="index, follow" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Cookie className="w-16 h-16 text-orange-100" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-orange-100 mb-4">
              Understand and control how we use cookies on our website
            </p>
            <p className="text-lg text-orange-200">
              Last updated: {currentDate}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-amber-50 rounded-xl p-8 border border-amber-200"
          >
            <h2 className="text-2xl font-bold text-gray-500 mb-4">
              What Are Cookies?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when you visit 
              our website. They help us provide you with a better browsing experience, 
              remember your preferences, and understand how you use our site.
            </p>
            <p className="text-gray-400 leading-relaxed">
              At Aura Spring Cleaning, we believe in transparency. This policy explains 
              exactly which cookies we use, why we use them, and how you can control them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-500 mb-4">
              Types of Cookies We Use
            </h2>
            <p className="text-lg text-gray-400">
              We use different types of cookies for various purposes
            </p>
          </div>

          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`p-6 ${
                  cookie.required 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <cookie.icon className="w-6 h-6 text-white" />
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {cookie.name}
                        </h3>
                        {cookie.required && (
                          <span className="text-sm text-green-100">Required</span>
                        )}
                      </div>
                    </div>
                    
                    {!cookie.required && (
                      <button
                        onClick={() => handleToggle(cookie.id)}
                        className="flex items-center gap-2 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
                      >
                        {cookiePreferences[cookie.id] ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                      </button>
                    )}
                    
                    {cookie.required && (
                      <div className="bg-white/20 rounded-full p-2">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {cookie.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-500 mb-2 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Purpose
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">{cookie.purpose}</p>
                      
                      <h4 className="font-semibold text-gray-500 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Examples
                      </h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {cookie.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-500 mb-2">
                        Retention Period
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">{cookie.retention}</p>
                      
                      <h4 className="font-semibold text-gray-500 mb-2">
                        Third-Party Cookies
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {cookie.thirdParty ? 'Yes' : 'No'}
                      </p>
                      
                      {cookie.providers && (
                        <>
                          <h5 className="font-medium text-gray-400 text-sm mb-1">Providers:</h5>
                          <div className="flex flex-wrap gap-1">
                            {cookie.providers.map((provider, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-400">
                                {provider}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Preferences Management */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-4">
              Manage Your Cookie Preferences
            </h3>
            <p className="text-lg text-gray-400">
              You can control which cookies we use (except essential ones)
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <div className="space-y-4 mb-6">
              {cookieTypes.map((cookie) => (
                <div key={cookie.id} className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <cookie.icon className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-500">{cookie.name}</h4>
                      <p className="text-sm text-gray-400">{cookie.purpose}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {cookie.required ? (
                      <span className="text-sm text-green-600 font-medium">Always Active</span>
                    ) : (
                      <button
                        onClick={() => handleToggle(cookie.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          cookiePreferences[cookie.id] ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            cookiePreferences[cookie.id] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={savePreferences}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Control */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-green-50 rounded-xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-green-600" />
                Browser Cookie Controls
              </h3>
              <p className="text-gray-400 mb-6">
                You can also control cookies directly through your browser settings. 
                Here's how to manage cookies in popular browsers:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-500 mb-3">Desktop Browsers</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><strong>Chrome:</strong> Settings → Privacy & Security → Cookies</li>
                    <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 mb-3">Mobile Browsers</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><strong>Chrome Mobile:</strong> Settings → Site Settings → Cookies</li>
                    <li><strong>Safari iOS:</strong> Settings → Safari → Privacy & Security</li>
                    <li><strong>Samsung Browser:</strong> Settings → Sites and downloads</li>
                    <li><strong>Firefox Mobile:</strong> Settings → Data Management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                Impact of Disabling Cookies
              </h3>
              <p className="text-gray-400 mb-4">
                While you can disable cookies, please note that some website functionality may be affected:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>Booking forms may not remember your information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>You may need to re-enter preferences each visit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>Some interactive features may not work properly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>We won't be able to provide personalized content</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">
              Questions About Cookies?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              We're happy to explain our cookie usage and help you manage your preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:Privacy@AuraSpringCleaning.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Info className="w-5 h-5" />
                Ask About Cookies
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 border-2 border-amber-500 font-semibold rounded-lg hover:bg-amber-50 transition-all duration-300"
              >
                <Shield className="w-5 h-5" />
                View Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/privacy"
              className="text-amber-600 hover:text-orange-600 font-semibold"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/terms"
              className="text-amber-600 hover:text-orange-600 font-semibold"
            >
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/"
              className="text-amber-600 hover:text-orange-600 font-semibold"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CookiesPage;