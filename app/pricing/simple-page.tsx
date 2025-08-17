'use client';

import React, { useState } from 'react';
import { calculatePrice } from '@/lib/pricingService';
import { motion } from 'framer-motion';
import { Home, Clock, Sparkles, Check, Calendar, Phone, Calculator } from 'lucide-react';
import Link from 'next/link';

const SimplePricingPage = () => {
  const [frequency, setFrequency] = useState('onetime');
  const [homeSize, setHomeSize] = useState('1300');
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [serviceType, setServiceType] = useState('standard');
  const [addOns, setAddOns] = useState<string[]>([]);

  // Frequency options with CORRECT discounts from pricingService
  const frequencies = [
    { id: 'weekly', name: 'Weekly', discount: '20%', popular: true },
    { id: 'biweekly', name: 'Bi-Weekly', discount: '15%', popular: false },
    { id: 'monthly', name: 'Monthly', discount: '10%', popular: false },
    { id: 'onetime', name: 'One-Time', discount: '0%', popular: false }
  ];

  // Home size options
  const homeSizes = [
    { value: '600', label: 'Studio', desc: '<600 sq ft', time: '1-1.5 hours' },
    { value: '900', label: '1 Bed/1 Bath', desc: '600-900 sq ft', time: '1.5-2 hours' },
    { value: '1200', label: '2 Bed/2 Bath', desc: '900-1200 sq ft', time: '2-2.5 hours' },
    { value: '1500', label: '3 Bed/2 Bath', desc: '1200-1800 sq ft', time: '2.5-3 hours' },
    { value: '2000', label: '4+ Bed/3+ Bath', desc: '1800+ sq ft', time: '3-4 hours' }
  ];

  // Add-on services
  const addOnOptions = [
    { id: 'insideOven', name: 'Deep Oven Cleaning', time: '+35 min', price: 35 },
    { id: 'insideFridge', name: 'Refrigerator Deep Clean', time: '+35 min', price: 30 },
    { id: 'insideWindows', name: 'Window Cleaning (Interior Only)', time: '+45 min', price: 45 },
    { id: 'laundry', name: 'Laundry Service (2 loads)', time: '+30 min', price: 40 },
    { id: 'garage', name: 'Garage Organization', time: '+50 min', price: 50 },
    { id: 'basement', name: 'Basement Cleaning', time: '+40 min', price: 45 },
    { id: 'petHair', name: 'Pet Hair Removal', time: '+20 min', price: 30 },
    { id: 'carpetCleaning', name: 'Carpet Deep Cleaning', time: '+60 min', price: 70 }
  ];

  // Extract bedrooms/bathrooms from home size selection
  const updateHomeSize = (size: string) => {
    setHomeSize(size);
    // Set typical bedroom/bathroom counts based on size
    switch(size) {
      case '600':
        setBedrooms(0); // Studio
        setBathrooms(1);
        break;
      case '900':
        setBedrooms(1);
        setBathrooms(1);
        break;
      case '1200':
        setBedrooms(2);
        setBathrooms(2);
        break;
      case '1500':
        setBedrooms(3);
        setBathrooms(2);
        break;
      case '2000':
        setBedrooms(4);
        setBathrooms(3);
        break;
      default:
        setBedrooms(3);
        setBathrooms(2);
    }
  };

  // Calculate price using actual pricing service
  const getPrice = () => {
    const pricing = calculatePrice({
      bedrooms,
      bathrooms,
      squareFeet: parseInt(homeSize),
      serviceType: serviceType as any,
      frequency: frequency as any,
      addOns,
      location: 'default'
    });
    return pricing.total;
  };

  const toggleAddOn = (addOnId: string) => {
    setAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(a => a !== addOnId)
        : [...prev, addOnId]
    );
  };

  const currentPrice = getPrice();
  const selectedFrequency = frequencies.find(f => f.id === frequency);
  const selectedHomeSize = homeSizes.find(h => h.value === homeSize);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Build your perfect cleaning plan. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Calculator */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Step 1: Frequency */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Cleaning Frequency</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {frequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => setFrequency(freq.id)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  frequency === freq.id
                    ? 'border-[#7c9768] bg-[#7c9768]/10'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {freq.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                <div className="font-semibold">{freq.name}</div>
                <div className="text-sm text-[#7c9768] font-medium">{freq.discount} off</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Home Size */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Home Size</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {homeSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => updateHomeSize(size.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  homeSize === size.value
                    ? 'border-[#7c9768] bg-[#7c9768]/10'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Home className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <div className="font-semibold text-sm">{size.label}</div>
                <div className="text-xs text-gray-500">{size.desc}</div>
                <div className="text-xs text-gray-400 mt-1">{size.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Add-Ons */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Optional Add-Ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {addOnOptions.map((addon) => (
              <button
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  addOns.includes(addon.id)
                    ? 'border-[#7c9768] bg-[#7c9768]/10'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{addon.name}</div>
                    <div className="text-xs text-gray-500">{addon.time}</div>
                  </div>
                  <div className="text-[#7c9768] font-bold">+${addon.price}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Your Estimated Price</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">${Math.round(currentPrice)}</span>
                <span className="text-xl opacity-90">
                  {selectedFrequency?.name} Cleaning
                </span>
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{selectedHomeSize?.label} • {selectedHomeSize?.desc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{selectedFrequency?.discount} discount applied</span>
                </div>
                {addOns.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{addOns.length} add-on{addOns.length > 1 ? 's' : ''} selected</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col gap-3">
              <Link
                href={`/booking?frequency=${frequency}&size=${homeSize}&price=${currentPrice}`}
                className="bg-white text-[#7c9768] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-center"
              >
                Book This Plan
              </Link>
              <a
                href="tel:512-781-0527"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call for Quote
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">How Our Pricing Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-[#7c9768] mb-2">Base Price</h4>
              <p className="text-gray-600">
                $150 for 3BR/2BA homes up to 1,300 sq ft. Additional rooms and square footage add $25 each.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#7c9768] mb-2">Frequency Discounts</h4>
              <p className="text-gray-600">
                Save more with regular service: Weekly (20% off), Bi-Weekly (15% off), Monthly (10% off).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#7c9768] mb-2">Service Types</h4>
              <p className="text-gray-600">
                Standard, Deep Clean (1.5x), Move In/Out (1.67x), Airbnb (10% off), Post-Construction (2.5x).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePricingPage;