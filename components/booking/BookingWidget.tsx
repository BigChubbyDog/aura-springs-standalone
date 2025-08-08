'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Home, Sparkles, ChevronRight } from 'lucide-react';

interface BookingStep {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const BookingWidget = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceType: '',
    location: '',
    date: '',
    time: '',
    frequency: 'one-time',
    homeSize: '',
    extras: [] as string[]
  });

  const steps: BookingStep[] = [
    { id: 1, title: 'Service', icon: <Sparkles className="w-5 h-5" /> },
    { id: 2, title: 'Location', icon: <MapPin className="w-5 h-5" /> },
    { id: 3, title: 'Schedule', icon: <Calendar className="w-5 h-5" /> },
    { id: 4, title: 'Details', icon: <Home className="w-5 h-5" /> },
  ];

  const services = [
    {
      id: 'regular',
      name: 'Regular Cleaning',
      price: 'From $175',
      description: 'Maintain your home\'s sparkle',
      popular: false,
      icon: '✨'
    },
    {
      id: 'deep',
      name: 'Deep Cleaning',
      price: 'From $350',
      description: 'Thorough top-to-bottom clean',
      popular: true,
      icon: '🧹'
    },
    {
      id: 'move',
      name: 'Move In/Out',
      price: 'From $495',
      description: 'Fresh start for your new home',
      popular: false,
      icon: '📦'
    },
    {
      id: 'airbnb',
      name: 'Airbnb Turnover',
      price: 'From $150',
      description: 'Quick reset for guests',
      popular: false,
      icon: '🏠'
    }
  ];

  const austinAreas = [
    'Downtown - 78701',
    'The Domain - 78758',
    'South Congress (SoCo) - 78704',
    'East Austin - 78702',
    'Rainey Street - 78701',
    'West Lake Hills - 78746',
    'Zilker - 78704',
    'Mueller - 78723'
  ];

  const extras = [
    { id: 'fridge', name: 'Inside Fridge', price: '+$35' },
    { id: 'oven', name: 'Inside Oven', price: '+$45' },
    { id: 'windows', name: 'Interior Windows', price: '+$60' },
    { id: 'laundry', name: 'Laundry Service', price: '+$40' },
    { id: 'garage', name: 'Garage Cleaning', price: '+$75' },
    { id: 'balcony', name: 'Balcony/Patio', price: '+$50' }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const calculatePrice = () => {
    let basePrice = 175;
    if (bookingData.serviceType === 'deep') basePrice = 350;
    if (bookingData.serviceType === 'move') basePrice = 495;
    if (bookingData.serviceType === 'airbnb') basePrice = 150;
    
    const extrasPrice = bookingData.extras.length * 45;
    const frequencyDiscount = bookingData.frequency === 'weekly' ? 0.15 : 
                             bookingData.frequency === 'biweekly' ? 0.10 : 0;
    
    const total = (basePrice + extrasPrice) * (1 - frequencyDiscount);
    return total.toFixed(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#c3d3b3]/20 p-8"
    >
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              className={`flex items-center gap-2 ${
                step.id <= currentStep ? 'text-[#7c9768]' : 'text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.id < currentStep
                    ? 'bg-[#7c9768] text-white'
                    : step.id === currentStep
                    ? 'bg-[#e1e9d9] text-[#4c673d] ring-2 ring-[#7c9768]'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.icon}
              </div>
              <span className="hidden sm:block font-medium">{step.title}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                  step.id < currentStep ? 'bg-[#7c9768]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">Choose Your Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingData({ ...bookingData, serviceType: service.id })}
                  className={`relative cursor-pointer rounded-xl p-6 transition-all duration-300 ${
                    bookingData.serviceType === service.id
                      ? 'bg-gradient-to-br from-[#7c9768] to-[#4c673d] text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  {service.popular && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-2xl mb-2 block">{service.icon}</span>
                      <h4 className="font-semibold text-lg">{service.name}</h4>
                      <p className={`text-sm mt-1 ${
                        bookingData.serviceType === service.id ? 'text-white/90' : 'text-gray-400'
                      }`}>
                        {service.description}
                      </p>
                    </div>
                    <span className="font-bold">{service.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-500">Where in Austin?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {austinAreas.map((area) => (
                <motion.button
                  key={area}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingData({ ...bookingData, location: area })}
                  className={`p-4 rounded-lg text-left transition-all duration-300 ${
                    bookingData.location === area
                      ? 'bg-[#7c9768] text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-400'
                  }`}
                >
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {area}
                </motion.button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Or enter your zip code..."
                className="w-full p-4 pl-12 rounded-lg border border-gray-200 focus:border-[#7c9768] focus:ring-2 focus:ring-[#c3d3b3] transition-all duration-300"
                value={bookingData.location.includes('787') ? '' : bookingData.location}
                onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        )}

        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-500">When would you like us to visit?</h3>
            
            {/* Frequency Selection */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-3 block">Cleaning Frequency</label>
              <div className="grid grid-cols-4 gap-3">
                {['one-time', 'weekly', 'biweekly', 'monthly'].map((freq) => (
                  <motion.button
                    key={freq}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBookingData({ ...bookingData, frequency: freq })}
                    className={`p-3 rounded-lg capitalize transition-all duration-300 ${
                      bookingData.frequency === freq
                        ? 'bg-[#7c9768] text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-400'
                    }`}
                  >
                    {freq.replace('-', ' ')}
                    {freq !== 'one-time' && (
                      <span className="block text-xs mt-1 opacity-75">
                        Save {freq === 'weekly' ? '15%' : freq === 'biweekly' ? '10%' : '5%'}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Select Date</label>
                <input
                  type="date"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:border-[#7c9768] focus:ring-2 focus:ring-[#c3d3b3]"
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Preferred Time</label>
                <select
                  className="w-full p-4 rounded-lg border border-gray-200 focus:border-[#7c9768] focus:ring-2 focus:ring-[#c3d3b3]"
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                >
                  <option value="">Select time</option>
                  <option value="8:00 AM">8:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Details & Extras */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-500">Final Details</h3>
            
            {/* Home Size */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-3 block">Home Size</label>
              <div className="grid grid-cols-3 gap-3">
                {['1-2 BR', '3-4 BR', '5+ BR'].map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBookingData({ ...bookingData, homeSize: size })}
                    className={`p-4 rounded-lg transition-all duration-300 ${
                      bookingData.homeSize === size
                        ? 'bg-[#7c9768] text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-400'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add-on Services */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-3 block">Add Extra Services</label>
              <div className="grid grid-cols-2 gap-3">
                {extras.map((extra) => (
                  <motion.button
                    key={extra.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const newExtras = bookingData.extras.includes(extra.id)
                        ? bookingData.extras.filter(e => e !== extra.id)
                        : [...bookingData.extras, extra.id];
                      setBookingData({ ...bookingData, extras: newExtras });
                    }}
                    className={`p-3 rounded-lg text-left transition-all duration-300 ${
                      bookingData.extras.includes(extra.id)
                        ? 'bg-[#e1e9d9] border-2 border-[#7c9768] text-[#4c673d]'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-400 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{extra.name}</span>
                      <span className="text-sm font-bold text-[#7c9768]">{extra.price}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#f0f4ec] to-[#f0f4ec] rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-400">Estimated Total</span>
                <span className="text-3xl font-bold text-[#4c673d]">${calculatePrice()}</span>
              </div>
              {bookingData.frequency !== 'one-time' && (
                <p className="text-sm text-[#7c9768]">
                  You're saving {bookingData.frequency === 'weekly' ? '15%' : bookingData.frequency === 'biweekly' ? '10%' : '5%'} with {bookingData.frequency} cleaning!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            currentStep === 1
              ? 'invisible'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
          }`}
        >
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={currentStep === 4 ? () => console.log('Booking:', bookingData) : handleNext}
          disabled={
            (currentStep === 1 && !bookingData.serviceType) ||
            (currentStep === 2 && !bookingData.location) ||
            (currentStep === 3 && (!bookingData.date || !bookingData.time))
          }
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            currentStep === 4
              ? 'bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white shadow-lg'
              : 'bg-[#7c9768] hover:bg-[#4c673d] text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
          }`}
        >
          {currentStep === 4 ? 'Book Now' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookingWidget;