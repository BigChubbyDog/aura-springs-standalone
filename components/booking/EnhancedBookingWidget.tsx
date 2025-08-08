'use client';

import { useState } from 'react';
import { calculatePrice, ADD_ONS, PricingFactors } from '@/lib/pricingService';
import { processNewBooking, sendCustomerConfirmation, BookingData } from '@/lib/microsoftIntegration';
import { Calendar, Clock, MapPin, Home, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';

export default function EnhancedBookingWidget() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Customer Info
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    
    // Service Details
    serviceType: 'standard',
    serviceDate: '',
    serviceTime: '09:00',
    
    // Property Info
    address: '',
    city: 'Austin',
    zipCode: '',
    propertyType: 'apartment',
    
    // Sizing
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 1000,
    
    // Options
    frequency: 'onetime',
    addOns: [] as string[],
    specialInstructions: '',
    
    // Marketing
    howHeard: '',
    referralSource: ''
  });

  const pricingFactors: PricingFactors = {
    bedrooms: formData.bedrooms,
    bathrooms: formData.bathrooms,
    squareFeet: formData.squareFeet,
    serviceType: formData.serviceType as any,
    frequency: formData.frequency as any,
    addOns: formData.addOns,
    location: formData.zipCode.startsWith('787') ? getLocationFromZip(formData.zipCode) : 'default',
  };

  const pricing = calculatePrice(pricingFactors);

  function getLocationFromZip(zip: string): string {
    const premiumZips: { [key: string]: string } = {
      '78701': 'downtown',
      '78702': 'east-austin',
      '78703': 'tarrytown',
      '78704': 'south-congress',
      '78746': 'west-lake-hills',
      '78758': 'the-domain',
    };
    return premiumZips[zip] || 'default';
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const bookingData: BookingData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        serviceType: formData.serviceType,
        serviceDate: formData.serviceDate,
        serviceTime: formData.serviceTime,
        address: `${formData.address}, ${formData.city}, TX ${formData.zipCode}`,
        squareFeet: formData.squareFeet,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        addOns: formData.addOns,
        frequency: formData.frequency,
        totalPrice: pricing.total,
        specialInstructions: formData.specialInstructions,
      };

      // Process booking through Microsoft integrations
      const results = await processNewBooking(bookingData);
      
      // Send confirmation to customer
      await sendCustomerConfirmation(bookingData);

      // Store booking in database (if you have one)
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      setBookingComplete(true);
      
      // Track conversion for analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': pricing.total,
          'currency': 'USD'
        });
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('There was an error processing your booking. Please try again or call us at (512) 555-0100.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-green-800 mb-4">Booking Confirmed!</h2>
        <p className="text-lg text-gray-400 mb-4">
          Thank you, {formData.customerName}! Your cleaning service has been scheduled.
        </p>
        <div className="bg-white rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-gray-500 mb-3">Booking Details:</h3>
          <p className="text-gray-400"><strong>Date:</strong> {formData.serviceDate}</p>
          <p className="text-gray-400"><strong>Time:</strong> {formData.serviceTime}</p>
          <p className="text-gray-400"><strong>Service:</strong> {formData.serviceType}</p>
          <p className="text-gray-400"><strong>Total:</strong> ${pricing.total}</p>
        </div>
        <p className="text-gray-400 mb-6">
          A confirmation email has been sent to {formData.customerEmail}
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-aura-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-aura-primary-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-aura-primary-700">Book Your Cleaning</h2>
          <div className="text-sm text-gray-500">Step {step} of 3</div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-aura-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-500 mb-4">Contact Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
                placeholder="John Smith"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
                placeholder="(512) 555-0100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              >
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-500 mt-8 mb-4">Property Address</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
                placeholder="1234 Congress Ave, Apt 501"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
                  placeholder="78701"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-500 mb-4">Service Details</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Service Type *
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              >
                <option value="standard">Standard Cleaning</option>
                <option value="deep">Deep Cleaning</option>
                <option value="moveInOut">Move In/Out</option>
                <option value="airbnb">Airbnb Turnover</option>
                <option value="postConstruction">Post Construction</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              >
                <option value="onetime">One Time</option>
                <option value="monthly">Monthly (Save 10%)</option>
                <option value="biweekly">Bi-Weekly (Save 15%)</option>
                <option value="weekly">Weekly (Save 20%)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.serviceDate}
                onChange={(e) => setFormData({...formData, serviceDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Preferred Time *
              </label>
              <select
                value={formData.serviceTime}
                onChange={(e) => setFormData({...formData, serviceTime: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              >
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-500 mt-8 mb-4">Property Size</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.bedrooms}
                onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value) || 1})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.5"
                value={formData.bathrooms}
                onChange={(e) => setFormData({...formData, bathrooms: parseFloat(e.target.value) || 1})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Square Feet
              </label>
              <input
                type="number"
                min="500"
                max="10000"
                step="100"
                value={formData.squareFeet}
                onChange={(e) => setFormData({...formData, squareFeet: parseInt(e.target.value) || 1000})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={formData.specialInstructions}
              onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-aura-primary-500 focus:outline-none"
              placeholder="Any specific requests, gate codes, parking instructions, etc."
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-500 mb-4">Add-On Services</h3>
          
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(ADD_ONS).map(([key, addon]) => (
              <label
                key={key}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.addOns.includes(key)
                    ? 'border-aura-primary-500 bg-aura-primary-50'
                    : 'border-gray-200 hover:border-aura-primary-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.addOns.includes(key)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, addOns: [...formData.addOns, key]});
                      } else {
                        setFormData({...formData, addOns: formData.addOns.filter(a => a !== key)});
                      }
                    }}
                    className="w-5 h-5 text-aura-primary-600 rounded focus:ring-aura-primary-500"
                  />
                  <span className="font-medium">{addon.name}</span>
                </div>
                <span className="font-bold text-aura-primary-700">+${addon.price}</span>
              </label>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-aura-primary-50 to-aura-primary-100 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-500 mb-4">Booking Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-400">
                <span>Service:</span>
                <span className="font-medium">{formData.serviceType}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Date & Time:</span>
                <span className="font-medium">{formData.serviceDate} at {formData.serviceTime}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Property:</span>
                <span className="font-medium">{formData.bedrooms}BR/{formData.bathrooms}BA - {formData.squareFeet} sq ft</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Frequency:</span>
                <span className="font-medium">{formData.frequency}</span>
              </div>
              {formData.addOns.length > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Add-ons:</span>
                  <span className="font-medium">{formData.addOns.length} selected</span>
                </div>
              )}
            </div>
            
            <div className="border-t-2 border-aura-primary-200 pt-4">
              <div className="flex justify-between text-gray-400 mb-2">
                <span>Subtotal:</span>
                <span className="font-medium">${pricing.subtotal}</span>
              </div>
              {pricing.discount > 0 && (
                <div className="flex justify-between text-green-600 mb-2">
                  <span>Discount:</span>
                  <span className="font-medium">-${pricing.discount}</span>
                </div>
              )}
              {pricing.addOnsTotal > 0 && (
                <div className="flex justify-between text-gray-400 mb-2">
                  <span>Add-ons:</span>
                  <span className="font-medium">+${pricing.addOnsTotal}</span>
                </div>
              )}
              <div className="flex justify-between text-2xl font-bold text-aura-primary-700">
                <span>Total:</span>
                <span>${pricing.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Payment will be collected after service completion. 
              We accept cash, card, Venmo, and Zelle.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 border-2 border-gray-300 text-gray-400 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
        )}
        
        {step < 3 ? (
          <button
            onClick={() => {
              if (step === 1 && (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.address || !formData.zipCode)) {
                setError('Please fill in all required fields');
                return;
              }
              if (step === 2 && (!formData.serviceDate)) {
                setError('Please select a service date');
                return;
              }
              setError(null);
              setStep(step + 1);
            }}
            className="ml-auto px-8 py-3 bg-aura-primary-600 text-white rounded-lg font-semibold hover:bg-aura-primary-700 transition-colors"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Complete Booking
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}