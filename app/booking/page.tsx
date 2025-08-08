'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    serviceType: searchParams.get('service') || 'standard',
    neighborhood: 'downtown',
    date: '',
    time: '10am',
    name: '',
    phone: '',
    email: '',
    address: '',
    specialInstructions: '',
    referral: '',
    homeSize: searchParams.get('size') || '2000',
    frequency: searchParams.get('frequency') || 'onetime'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          serviceType: formData.serviceType,
          serviceDate: formData.date,
          serviceTime: formData.time,
          address: formData.address,
          squareFeet: parseInt(formData.homeSize),
          bedrooms: 3, // Default
          bathrooms: 2, // Default
          addOns: [],
          frequency: formData.frequency,
          totalPrice: calculatePrice(),
          specialInstructions: `${formData.specialInstructions}${formData.referral ? ` | Referral: ${formData.referral}` : ''}`,
          neighborhood: formData.neighborhood
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            serviceType: 'standard',
            neighborhood: 'downtown',
            date: '',
            time: '10am',
            name: '',
            phone: '',
            email: '',
            address: '',
            specialInstructions: '',
            referral: '',
            homeSize: '2000',
            frequency: 'onetime'
          });
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePrice = () => {
    const basePrices: { [key: string]: number } = {
      standard: 175,
      deep: 350,
      movein: 495,
      airbnb: 150
    };
    
    const neighborhoodMultiplier: { [key: string]: number } = {
      downtown: 1.2,
      domain: 1.1,
      westlake: 1.3,
      other: 1.0
    };
    
    const base = basePrices[formData.serviceType] || 175;
    const multiplier = neighborhoodMultiplier[formData.neighborhood] || 1.0;
    
    return Math.round(base * multiplier);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-[#4c673d]">Book Your</span>{' '}
          <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
            Luxury Cleaning Service
          </span>
        </h1>
        
        <p className="text-center text-gray-400 mb-12">
          Experience Austin's premier cleaning service. Get location-based pricing instantly.
        </p>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-bold">Booking Confirmed!</p>
            <p>We'll contact you shortly at {formData.email || 'your email'} to confirm your appointment.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-bold">Booking Error</p>
            <p>There was an issue with your booking. Please try again or call us at (512) 781-0527.</p>
          </div>
        )}

        {/* Enhanced Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Price Display */}
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="text-sm text-gray-400">Estimated Price</div>
              <div className="text-3xl font-bold text-green-600">${calculatePrice()}</div>
              <div className="text-xs text-gray-500">Final price confirmed after home assessment</div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Service Type
              </label>
              <select 
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                required
              >
                <option value="standard">Regular Cleaning - From $175</option>
                <option value="deep">Deep Cleaning - From $350</option>
                <option value="movein">Move In/Out - From $495</option>
                <option value="airbnb">Airbnb Turnover - From $150</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Your Neighborhood
              </label>
              <select 
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                required
              >
                <option value="downtown">Downtown Austin - 78701</option>
                <option value="domain">The Domain - 78758</option>
                <option value="soco">South Congress - 78704</option>
                <option value="eastaustin">East Austin - 78702</option>
                <option value="westlake">Westlake Hills - 78746</option>
                <option value="zilker">Zilker - 78704</option>
                <option value="mueller">Mueller - 78723</option>
                <option value="other">Other Austin Area</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Preferred Time
              </label>
              <select 
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                required
              >
                <option value="8am">8:00 AM</option>
                <option value="10am">10:00 AM</option>
                <option value="12pm">12:00 PM</option>
                <option value="2pm">2:00 PM</option>
                <option value="4pm">4:00 PM</option>
              </select>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                  placeholder="(512) 555-0000"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Service Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                placeholder="123 Congress Ave, Austin, TX 78701"
                required
              />
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                placeholder="Gate code, pets, specific areas to focus on..."
              />
            </div>

            {/* Referral */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-[#443474] mb-2">
                Referred by a Realtor or Mortgage Broker?
              </label>
              <input
                type="text"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-[#443474] focus:border-transparent"
                placeholder="Enter referral partner name for special rates"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-bold rounded-lg transition-all duration-300 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-xl hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Book Now & Get 20% Off First Clean'}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-around text-center text-sm text-gray-400">
              <div>
                <div className="font-bold text-[#7c9768]">✓</div>
                <div>Licensed & Insured</div>
              </div>
              <div>
                <div className="font-bold text-[#443474]">✓</div>
                <div>Background Checked</div>
              </div>
              <div>
                <div className="font-bold text-[#4c673d]">✓</div>
                <div>Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#7c9768] mb-2">Location-Based Pricing</h3>
            <p className="text-gray-400">
              Our smart system adjusts pricing based on your Austin neighborhood for the best value.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#443474] mb-2">Same-Day Service</h3>
            <p className="text-gray-400">
              Available for downtown high-rises and urgent cleaning needs.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#4c673d] mb-2">Eco-Friendly Options</h3>
            <p className="text-gray-400">
              Green cleaning products safe for pets, kids, and the environment.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#8d9199] mb-2">Trusted Teams</h3>
            <p className="text-gray-400">
              Background-checked professionals experienced with Austin's premier properties.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}