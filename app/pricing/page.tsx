'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Calculator,
  Home,
  Bed,
  Bath,
} from 'lucide-react';

const pricingPlans = [
  {
    name: 'One-Time Clean',
    description: 'Perfect for special occasions or trying our service',
    basePrice: 129,
    features: [
      'Standard cleaning checklist',
      'Eco-friendly products',
      'Licensed & insured team',
      'Satisfaction guarantee',
      '24-hour rescheduling',
    ],
    notIncluded: [
      'Priority scheduling',
      'Same cleaner guarantee',
      'Member discounts',
    ],
  },
  {
    name: 'Monthly Service',
    description: 'Regular maintenance for a consistently clean home',
    basePrice: 109,
    popular: true,
    features: [
      'Everything in One-Time',
      'Priority scheduling',
      '10% member discount',
      'Same cleaner requests',
      'Free re-cleans',
      'Flexible rescheduling',
    ],
    notIncluded: [
      'Deep cleaning included',
      'Supply restocking',
    ],
  },
  {
    name: 'Bi-Weekly Service',
    description: 'Our most popular plan for busy professionals',
    basePrice: 89,
    bestValue: true,
    features: [
      'Everything in Monthly',
      '20% member discount',
      'Deep clean 2x yearly',
      'Supply restocking',
      'VIP customer support',
      'Special event cleaning',
      'Referral rewards',
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [squareFeet, setSquareFeet] = useState(1500);
  const [frequency, setFrequency] = useState('bi-weekly');
  const [addOns, setAddOns] = useState({
    deepClean: false,
    insideOven: false,
    insideFridge: false,
    laundry: false,
    dishes: false,
    petHair: false,
  });

  const calculatePrice = () => {
    let basePrice = 89;
    
    // Frequency adjustment
    if (frequency === 'weekly') basePrice = 79;
    if (frequency === 'bi-weekly') basePrice = 89;
    if (frequency === 'monthly') basePrice = 109;
    if (frequency === 'one-time') basePrice = 129;
    
    // Size adjustments
    const bedroomPrice = (bedrooms - 1) * 15;
    const bathroomPrice = (bathrooms - 1) * 10;
    const sqftPrice = Math.max(0, (squareFeet - 1000) / 500) * 10;
    
    // Add-ons
    let addOnPrice = 0;
    if (addOns.deepClean) addOnPrice += 50;
    if (addOns.insideOven) addOnPrice += 20;
    if (addOns.insideFridge) addOnPrice += 20;
    if (addOns.laundry) addOnPrice += 15;
    if (addOns.dishes) addOnPrice += 15;
    if (addOns.petHair) addOnPrice += 20;
    
    return Math.round(basePrice + bedroomPrice + bathroomPrice + sqftPrice + addOnPrice);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transparent, Fair Pricing
            </h1>
            <p className="text-xl text-[#e1e9d9] max-w-3xl mx-auto">
              No hidden fees, no surprises. Get an instant quote for your home.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Calculator className="inline-block w-8 h-8 mr-2 text-[#7c9768]" />
              Instant Price Calculator
            </h2>
            <p className="text-gray-600">Customize your cleaning service and see pricing instantly</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cleaning Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                  >
                    <option value="weekly">Weekly (Best Value)</option>
                    <option value="bi-weekly">Bi-Weekly (Most Popular)</option>
                    <option value="monthly">Monthly</option>
                    <option value="one-time">One-Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Bed className="inline-block w-4 h-4 mr-1" />
                    Bedrooms: {bedrooms}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full accent-[#7c9768]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Bath className="inline-block w-4 h-4 mr-1" />
                    Bathrooms: {bathrooms}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full accent-[#7c9768]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Home className="inline-block w-4 h-4 mr-1" />
                    Square Feet: {squareFeet}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="250"
                    value={squareFeet}
                    onChange={(e) => setSquareFeet(Number(e.target.value))}
                    className="w-full accent-[#7c9768]"
                  />
                </div>
              </div>

              {/* Right Column - Add-ons */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-3">Optional Add-Ons</h3>
                
                {Object.entries({
                  deepClean: 'Deep Clean (+$50)',
                  insideOven: 'Inside Oven (+$20)',
                  insideFridge: 'Inside Fridge (+$20)',
                  laundry: 'Laundry Service (+$15)',
                  dishes: 'Wash Dishes (+$15)',
                  petHair: 'Pet Hair Removal (+$20)',
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOns[key as keyof typeof addOns]}
                      onChange={(e) => setAddOns({...addOns, [key]: e.target.checked})}
                      className="w-5 h-5 text-[#7c9768] rounded focus:ring-[#7c9768]"
                    />
                    <span className="text-gray-600">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Estimated Price</p>
                <p className="text-5xl font-bold text-[#7c9768]">
                  ${calculatePrice()}
                  <span className="text-lg text-gray-500 font-normal">/clean</span>
                </p>
                <Link
                  href="/booking"
                  className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300"
                >
                  Book This Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-600">Save more with regular service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-[#7c9768] scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#7c9768] text-white px-4 py-1 text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                {plan.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white px-4 py-1 text-sm font-semibold rounded-full">
                    Best Value
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-[#7c9768]">
                      ${plan.basePrice}
                      <span className="text-sm text-gray-500 font-normal">/clean</span>
                    </p>
                    <p className="text-xs text-gray-500">Starting price for 2BR/2BA</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 opacity-50">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="/booking"
                    className={`block w-full text-center px-4 py-2 font-semibold rounded-lg transition-all duration-300 ${
                      plan.popular || plan.bestValue
                        ? 'bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Pricing FAQs
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Are there any hidden fees?
              </h3>
              <p className="text-gray-600">
                No! Our pricing is completely transparent. The price you see is the price you pay. 
                Taxes are included, and there are no surprise charges.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Do you offer discounts?
              </h3>
              <p className="text-gray-600">
                Yes! New customers get 20% off their first cleaning. We also offer discounts for 
                regular service, seniors, military, and healthcare workers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                What forms of payment do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, PayPal, Apple Pay, and Google Pay. 
                Payment is processed after service completion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}