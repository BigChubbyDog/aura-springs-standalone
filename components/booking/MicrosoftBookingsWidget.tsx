'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, ChevronRight, Users, Sparkles } from 'lucide-react';

interface BookingsWidgetProps {
  serviceType?: string;
  location?: string;
  embedded?: boolean;
}

export default function MicrosoftBookingsWidget({ 
  serviceType = 'standard', 
  location = 'austin',
  embedded = false 
}: BookingsWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingsUrl, setBookingsUrl] = useState('');
  const [showFloatingButton, setShowFloatingButton] = useState(!embedded);

  useEffect(() => {
    // Construct Microsoft Bookings URL with parameters
    const baseUrl = 'https://outlook.office365.com/owa/calendar/AuraSpringCleaning@bigchubbydog.com/bookings/';
    const params = new URLSearchParams({
      service: serviceType,
      location: location,
      source: 'website',
      ref: window.location.pathname
    });
    
    setBookingsUrl(`${baseUrl}?${params.toString()}`);
    
    // Simulate loading time for iframe
    setTimeout(() => setIsLoading(false), 1500);
  }, [serviceType, location]);

  const handleDirectBooking = () => {
    window.open(bookingsUrl, '_blank', 'width=800,height=600');
  };

  if (embedded) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Book Your Cleaning Service
          </h2>
          <p className="text-green-100">
            Select your preferred date and time. We'll confirm within 30 minutes.
          </p>
        </div>

        {/* Booking Options */}
        <div className="p-6 space-y-4 border-b">
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 border-2 border-green-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors"
              onClick={() => setBookingsUrl(bookingsUrl.replace('service=standard', 'service=luxury'))}
            >
              <Sparkles className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold">Luxury Cleaning</h3>
              <p className="text-sm text-gray-600">Premium service for high-end homes</p>
              <p className="text-lg font-bold text-green-600 mt-2">From $400</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 border-2 border-green-500 rounded-lg cursor-pointer bg-green-50"
            >
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold">Standard Cleaning</h3>
              <p className="text-sm text-gray-600">Complete home cleaning service</p>
              <p className="text-lg font-bold text-green-600 mt-2">From $280</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 border-2 border-green-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors"
              onClick={() => setBookingsUrl(bookingsUrl.replace('service=standard', 'service=recurring'))}
            >
              <Clock className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold">Recurring Service</h3>
              <p className="text-sm text-gray-600">Weekly or bi-weekly discount</p>
              <p className="text-lg font-bold text-green-600 mt-2">Save 15%</p>
            </motion.div>
          </div>
        </div>

        {/* Microsoft Bookings Iframe */}
        <div className="relative" style={{ minHeight: '600px' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading booking calendar...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={bookingsUrl}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="yes"
            onLoad={() => setIsLoading(false)}
            className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            title="Microsoft Bookings - Aura Spring Cleaning"
          />
        </div>

        {/* Trust Indicators */}
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Free Cancellation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Insured & Bonded</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>100% Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Alternative Booking Button */}
        <div className="p-4 text-center bg-white border-t">
          <p className="text-sm text-gray-600 mb-3">
            Having trouble with the calendar? 
          </p>
          <button
            onClick={handleDirectBooking}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-semibold"
          >
            Open Booking Page
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Floating Button Version
  return (
    <>
      {showFloatingButton && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDirectBooking}
            className="bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <span className="hidden group-hover:block animate-slide-left pr-2 font-semibold">
                Book Now
              </span>
            </div>
          </motion.button>
          
          {/* Pulsing indicator */}
          <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20"></div>
        </motion.div>
      )}
    </>
  );
}