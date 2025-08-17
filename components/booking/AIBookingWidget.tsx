'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Home, Sparkles, ChevronRight, 
  Brain, Zap, TrendingUp, MessageSquare, Clock,
  DollarSign, Building2, Users, CheckCircle
} from 'lucide-react';
import { calculatePrice } from '@/lib/pricingService';
import { getAIResponse, extractEntities } from '@/lib/vertexAI';
import { trackConversion, appendUTMToUrl } from '@/lib/utmTracking';
import { conversionEvents, ecommerceEvents } from '@/lib/googleAnalytics';

interface AIBookingWidgetProps {
  defaultService?: string;
  defaultLocation?: string;
  towerResident?: boolean;
  airbnbHost?: boolean;
}

const AIBookingWidget: React.FC<AIBookingWidgetProps> = ({
  defaultService = '',
  defaultLocation = '',
  towerResident = false,
  airbnbHost = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isThinking, setIsThinking] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [instantQuote, setInstantQuote] = useState<number>(0);
  const [bookingData, setBookingData] = useState({
    serviceType: defaultService || '',
    location: defaultLocation || '',
    date: '',
    time: '',
    frequency: airbnbHost ? 'weekly' : 'biweekly',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    tower: defaultLocation || '',
    extras: [] as string[],
    specialInstructions: '',
    name: '',
    email: '',
    phone: '',
  });

  // Tower-specific configurations
  const towerConfigs: { [key: string]: any } = {
    '70-rainey': {
      name: '70 Rainey',
      avgSqFt: { '1BR': 800, '2BR': 1200, '3BR': 1800 },
      popularServices: ['standard', 'airbnb'],
      specialFeatures: ['floor-to-ceiling windows', 'modern fixtures'],
    },
    '44-east': {
      name: '44 East Ave',
      avgSqFt: { '1BR': 750, '2BR': 1100, '3BR': 1600 },
      popularServices: ['standard', 'deep'],
      specialFeatures: ['luxury finishes', 'smart home features'],
    },
    'the-shore': {
      name: 'The Shore',
      avgSqFt: { '1BR': 850, '2BR': 1300, '3BR': 1900 },
      popularServices: ['airbnb', 'standard'],
      specialFeatures: ['lake views', 'premium appliances'],
    },
  };

  // AI-powered service recommendation
  useEffect(() => {
    if (bookingData.location && bookingData.bedrooms) {
      generateAISuggestion();
      calculateInstantQuote();
    }
  }, [bookingData.location, bookingData.bedrooms, bookingData.bathrooms, bookingData.squareFeet, bookingData.serviceType]);

  const generateAISuggestion = async () => {
    setIsThinking(true);
    
    try {
      // Build context for AI
      const context = {
        location: bookingData.location,
        tower: bookingData.tower,
        isAirbnbHost: airbnbHost,
        isTowerResident: towerResident,
        bedrooms: bookingData.bedrooms,
        bathrooms: bookingData.bathrooms,
        squareFeet: bookingData.squareFeet,
      };

      // Generate suggestion based on context
      let suggestion = '';
      
      if (airbnbHost) {
        suggestion = `As an Airbnb host, our 2-hour turnover service at $${instantQuote} is perfect for you. We can handle linens and restocking too!`;
      } else if (towerResident && bookingData.tower) {
        const config = towerConfigs[bookingData.tower];
        if (config) {
          suggestion = `Welcome ${config.name} resident! Based on your ${bookingData.bedrooms}BR unit, we recommend ${config.popularServices[0] === 'standard' ? 'bi-weekly' : 'monthly'} service. Your neighbors love our attention to ${config.specialFeatures[0]}.`;
        }
      } else if (bookingData.squareFeet > 2500) {
        suggestion = `For your spacious ${bookingData.squareFeet}sqft home, we recommend our Signature Deep Clean to start, then bi-weekly maintenance. Special rate: $${instantQuote}`;
      } else {
        suggestion = `Perfect! For your ${bookingData.bedrooms}BR/${bookingData.bathrooms}BA home, we recommend bi-weekly service at $${instantQuote}. Save 15% compared to one-time cleaning!`;
      }

      setAiSuggestion(suggestion);
    } catch (error) {
      console.error('AI suggestion error:', error);
      setAiSuggestion('We have the perfect cleaning plan for you!');
    } finally {
      setIsThinking(false);
    }
  };

  const calculateInstantQuote = () => {
    const pricing = calculatePrice({
      bedrooms: bookingData.bedrooms,
      bathrooms: bookingData.bathrooms,
      squareFeet: bookingData.squareFeet,
      serviceType: bookingData.serviceType as any || 'standard',
      frequency: bookingData.frequency as any,
      addOns: bookingData.extras,
      location: bookingData.location,
    });

    setInstantQuote(pricing.total);
    
    // Track pricing view
    ecommerceEvents.viewItem({
      id: bookingData.serviceType,
      name: `${bookingData.serviceType} cleaning`,
      category: 'cleaning-service',
      price: pricing.total,
    });
  };

  // Popular Rainey Street towers
  const raineyTowers = [
    { id: '70-rainey', name: '70 Rainey', units: 164 },
    { id: '44-east', name: '44 East Ave', units: 200 },
    { id: 'the-shore', name: 'The Shore', units: 100 },
    { id: 'millennium', name: 'Millennium Rainey', units: 300 },
    { id: 'skyhouse', name: 'Skyhouse Austin', units: 320 },
    { id: 'windsor', name: 'Windsor on the Lake', units: 250 },
    { id: 'other', name: 'Other/House', units: 0 },
  ];

  // AI-optimized time slots
  const getSmartTimeSlots = () => {
    const baseSlots = [
      { time: '8:00 AM', available: true, popular: false },
      { time: '10:00 AM', available: true, popular: true },
      { time: '12:00 PM', available: true, popular: false },
      { time: '2:00 PM', available: true, popular: true },
      { time: '4:00 PM', available: true, popular: false },
    ];

    // Mark popular times for Airbnb
    if (airbnbHost) {
      baseSlots[1].popular = true; // 10 AM checkout clean
      baseSlots[3].popular = true; // 2 PM pre-checkin clean
    }

    return baseSlots;
  };

  const handleSubmit = async () => {
    // Track conversion
    trackConversion('booking_started', instantQuote);
    conversionEvents.bookingStarted();
    
    // Create booking URL with UTM params
    const bookingUrl = appendUTMToUrl('/api/booking', {
      utm_source: towerResident ? 'tower-resident' : 'website',
      utm_medium: 'booking-widget',
      utm_campaign: bookingData.serviceType,
    });

    // Submit booking
    try {
      const response = await fetch(bookingUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          quote: instantQuote,
          aiRecommendation: aiSuggestion,
        }),
      });

      if (response.ok) {
        trackConversion('booking_completed', instantQuote);
        conversionEvents.bookingCompleted('booking-' + Date.now(), instantQuote);
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl mx-auto">
      {/* AI Header */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
        <Brain className="w-8 h-8 text-purple-600" />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">AI-Powered Instant Quote</h3>
          <p className="text-sm text-gray-600">
            {isThinking ? 'Calculating best price...' : aiSuggestion || 'Get personalized recommendations'}
          </p>
        </div>
        {instantQuote > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Your Price</p>
            <p className="text-2xl font-bold text-green-600">${instantQuote}</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`flex-1 h-2 mx-1 rounded-full transition-all ${
              step <= currentStep ? 'bg-gradient-to-r from-[#7c9768] to-[#4c673d]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Location & Property */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Where do you live?</h2>
            
            {/* Tower Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Building
              </label>
              <div className="grid grid-cols-2 gap-3">
                {raineyTowers.map((tower) => (
                  <button
                    key={tower.id}
                    onClick={() => {
                      setBookingData({ ...bookingData, tower: tower.id, location: tower.name });
                      if (tower.id !== 'other') {
                        setAiSuggestion(`Great! We service ${tower.name} regularly.`);
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      bookingData.tower === tower.id
                        ? 'border-[#7c9768] bg-[#7c9768]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                    <p className="font-medium text-sm">{tower.name}</p>
                    {tower.units > 0 && (
                      <p className="text-xs text-gray-500">{tower.units} units</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  value={bookingData.bedrooms}
                  onChange={(e) => setBookingData({ ...bookingData, bedrooms: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} BR</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  value={bookingData.bathrooms}
                  onChange={(e) => setBookingData({ ...bookingData, bathrooms: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} BA</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sq Ft
                </label>
                <input
                  type="number"
                  value={bookingData.squareFeet}
                  onChange={(e) => setBookingData({ ...bookingData, squareFeet: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
                  placeholder="1500"
                />
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Get Instant Quote →
            </button>
          </motion.div>
        )}

        {/* Step 2: Service Selection */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Service</h2>
            
            {/* AI Recommendation Banner */}
            {aiSuggestion && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">AI Recommendation</p>
                    <p className="text-sm text-green-700">{aiSuggestion}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {[
                { 
                  id: 'standard', 
                  name: 'Standard Cleaning', 
                  desc: 'Regular maintenance', 
                  price: instantQuote 
                },
                { 
                  id: 'deep', 
                  name: 'Deep Cleaning', 
                  desc: 'Thorough detailed clean', 
                  price: Math.round(instantQuote * 1.5) 
                },
                { 
                  id: 'moveInOut', 
                  name: 'Move In/Out', 
                  desc: 'Complete empty home clean', 
                  price: Math.round(instantQuote * 1.67) 
                },
                { 
                  id: 'airbnb', 
                  name: 'Airbnb Turnover', 
                  desc: '2-hour quick reset', 
                  price: Math.round(instantQuote * 0.9) 
                },
              ].map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setBookingData({ ...bookingData, serviceType: service.id });
                    calculateInstantQuote();
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    bookingData.serviceType === service.id
                      ? 'border-[#7c9768] bg-[#7c9768]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.desc}</p>
                    </div>
                    <p className="text-xl font-bold text-[#7c9768]">${service.price}</p>
                  </div>
                  {service.id === 'airbnb' && airbnbHost && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Recommended for you
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">When would you like service?</h2>

            {/* Frequency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cleaning Frequency
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'onetime', name: 'One Time', discount: '0%' },
                  { id: 'weekly', name: 'Weekly', discount: '20% off' },
                  { id: 'biweekly', name: 'Bi-Weekly', discount: '15% off' },
                  { id: 'monthly', name: 'Monthly', discount: '10% off' },
                ].map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => {
                      setBookingData({ ...bookingData, frequency: freq.id });
                      calculateInstantQuote();
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      bookingData.frequency === freq.id
                        ? 'border-[#7c9768] bg-[#7c9768]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium">{freq.name}</p>
                    {freq.discount !== '0%' && (
                      <p className="text-xs text-green-600 font-semibold">{freq.discount}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Cleaning Date
              </label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
              />
            </div>

            {/* Smart Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                {getSmartTimeSlots().map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setBookingData({ ...bookingData, time: slot.time })}
                    className={`p-3 rounded-lg border-2 transition-all relative ${
                      bookingData.time === slot.time
                        ? 'border-[#7c9768] bg-[#7c9768]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium">{slot.time}</p>
                    {slot.popular && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Contact & Confirm */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Almost Done!</h2>

            {/* Price Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Your Cleaning Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{bookingData.serviceType || 'Standard'} Cleaning</span>
                </div>
                <div className="flex justify-between">
                  <span>Property:</span>
                  <span className="font-medium">
                    {bookingData.bedrooms}BR/{bookingData.bathrooms}BA ({bookingData.squareFeet}sqft)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span className="font-medium">{bookingData.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">${instantQuote}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
                required
              />
              <textarea
                placeholder="Special instructions (optional)"
                value={bookingData.specialInstructions}
                onChange={(e) => setBookingData({ ...bookingData, specialInstructions: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768]"
                rows={3}
              />
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Bonded</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Eco-Friendly</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIBookingWidget;