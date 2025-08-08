'use client';

import { useState } from 'react';
import { calculatePrice, getCompetitorComparison, getRevenueOptimization, ADD_ONS, PricingFactors } from '@/lib/pricingService';
import { Home, Bed, Bath, CheckCircle } from 'lucide-react';

export default function PricingCalculator() {
  const [factors, setFactors] = useState<PricingFactors>({
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 1000,
    serviceType: 'standard',
    frequency: 'onetime',
    addOns: [],
    location: 'default',
  });

  const pricing = calculatePrice(factors);
  const competitors = getCompetitorComparison(pricing.total);
  const suggestions = getRevenueOptimization(factors);

  const toggleAddOn = (addon: string) => {
    setFactors(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addon)
        ? prev.addOns.filter(a => a !== addon)
        : [...prev.addOns, addon]
    }));
  };

  const popularLocations = [
    'Downtown',
    'The Domain',
    'West Lake Hills',
    'Zilker',
    'Tarrytown',
    'Other',
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-aura-primary-700 mb-6">
        Instant Pricing Calculator
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Service Type
            </label>
            <select
              value={factors.serviceType}
              onChange={(e) => setFactors({...factors, serviceType: e.target.value as any})}
              className="w-full px-4 py-3 border-2 border-aura-primary-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
            >
              <option value="standard">Standard Cleaning</option>
              <option value="deep">Deep Cleaning</option>
              <option value="moveInOut">Move In/Out</option>
              <option value="airbnb">Airbnb Turnover</option>
              <option value="postConstruction">Post Construction</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                <Bed className="w-4 h-4" /> Bedrooms
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={factors.bedrooms}
                onChange={(e) => setFactors({...factors, bedrooms: parseInt(e.target.value) || 1})}
                className="w-full px-4 py-3 border-2 border-aura-primary-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
                <Bath className="w-4 h-4" /> Bathrooms
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={factors.bathrooms}
                onChange={(e) => setFactors({...factors, bathrooms: parseInt(e.target.value) || 1})}
                className="w-full px-4 py-3 border-2 border-aura-primary-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2">
              <Home className="w-4 h-4" /> Square Feet
            </label>
            <input
              type="number"
              min="500"
              max="10000"
              step="100"
              value={factors.squareFeet}
              onChange={(e) => setFactors({...factors, squareFeet: parseInt(e.target.value) || 1000})}
              className="w-full px-4 py-3 border-2 border-aura-primary-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Cleaning Frequency
            </label>
            <select
              value={factors.frequency}
              onChange={(e) => setFactors({...factors, frequency: e.target.value as any})}
              className="w-full px-4 py-3 border-2 border-aura-primary-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
            >
              <option value="onetime">One Time</option>
              <option value="monthly">Monthly (10% off)</option>
              <option value="biweekly">Bi-Weekly (15% off)</option>
              <option value="weekly">Weekly (20% off)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Location
            </label>
            <select
              value={factors.location}
              onChange={(e) => setFactors({...factors, location: e.target.value})}
              className="w-full px-4 py-3 border-2 border-aura-primary-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
            >
              {popularLocations.map(loc => (
                <option key={loc} value={loc.toLowerCase().replace(/\s+/g, '-')}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-400 mb-3">Add-On Services</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.entries(ADD_ONS).map(([key, addon]) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    factors.addOns.includes(key)
                      ? 'border-aura-primary-500 bg-aura-primary-50'
                      : 'border-gray-200 hover:border-aura-primary-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={factors.addOns.includes(key)}
                      onChange={() => toggleAddOn(key)}
                      className="w-5 h-5 text-aura-primary-600 rounded focus:ring-aura-primary-500"
                    />
                    <span className="text-sm font-medium">{addon.name}</span>
                  </div>
                  <span className="text-sm font-bold text-aura-primary-700">
                    +${addon.price}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray-100 pt-6">
        <div className="bg-gradient-to-r from-aura-primary-50 to-aura-primary-100 rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Base Price</p>
              <p className="text-2xl font-bold text-aura-primary-700">${pricing.subtotal}</p>
            </div>
            {pricing.discount > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-400">Frequency Discount</p>
                <p className="text-2xl font-bold text-green-600">-${pricing.discount}</p>
              </div>
            )}
            {pricing.addOnsTotal > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-400">Add-Ons</p>
                <p className="text-2xl font-bold text-aura-primary-600">+${pricing.addOnsTotal}</p>
              </div>
            )}
          </div>

          <div className="text-center border-t-2 border-aura-primary-200 pt-4">
            <p className="text-lg text-gray-400 mb-2">Your Total Price</p>
            <p className="text-5xl font-bold text-aura-primary-700">${pricing.total}</p>
            {pricing.savings > 0 && (
              <p className="text-sm text-green-600 mt-2">
                You save ${pricing.savings} with {factors.frequency} service!
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <h4 className="font-semibold text-amber-900 mb-2">Competitor Comparison</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Molly Maid:</span>
              <span className="font-semibold text-red-600 ml-2">${competitors.mollyMaid}</span>
            </div>
            <div>
              <span className="text-gray-400">Merry Maids:</span>
              <span className="font-semibold text-red-600 ml-2">${competitors.merryMaids}</span>
            </div>
            <div>
              <span className="text-gray-400">TCA:</span>
              <span className="font-semibold text-red-600 ml-2">${competitors.theCleaningAuthority}</span>
            </div>
          </div>
          <p className="text-green-700 font-bold mt-2">{competitors.savings}</p>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="w-full mt-6 bg-gradient-to-r from-aura-primary-600 to-aura-primary-700 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-aura-primary-700 hover:to-aura-primary-800 transition-all shadow-lg hover:shadow-xl">
          Book This Service Now
        </button>
      </div>
    </div>
  );
}