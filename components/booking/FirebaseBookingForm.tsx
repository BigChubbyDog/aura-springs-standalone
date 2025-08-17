'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Home, MapPin, Phone, Mail, 
  Sparkles, CreditCard, CheckCircle, Bot,
  Send, Loader2, ChevronRight, Star, Gift
} from 'lucide-react';
import { calculatePrice } from '@/lib/pricingService';

interface BookingFormData {
  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Service Details
  serviceType: 'standard' | 'deep' | 'moveInOut' | 'airbnb' | 'postConstruction';
  serviceDate: string;
  serviceTime: string;
  frequency: 'onetime' | 'weekly' | 'biweekly' | 'monthly';
  
  // Property Details
  address: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  
  // Additional
  addOns: string[];
  specialInstructions: string;
  preferredCleaner: string;
  keyInstructions: string;
  petInfo: string;
}

export default function FirebaseBookingForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceType: 'standard',
    serviceDate: '',
    serviceTime: '',
    frequency: 'biweekly',
    address: '',
    squareFeet: 1300,
    bedrooms: 3,
    bathrooms: 2,
    addOns: [],
    specialInstructions: '',
    preferredCleaner: '',
    keyInstructions: '',
    petInfo: ''
  });
  
  const [aiAssistant, setAiAssistant] = useState({
    isOpen: false,
    message: '',
    response: ''
  });

  // Service types
  const serviceTypes = [
    { id: 'standard', name: 'Regular Cleaning', icon: Home, multiplier: 1 },
    { id: 'deep', name: 'Deep Cleaning', icon: Sparkles, multiplier: 1.5 },
    { id: 'moveInOut', name: 'Move In/Out', icon: Home, multiplier: 1.67 },
    { id: 'airbnb', name: 'Airbnb Turnover', icon: Home, multiplier: 0.9 },
    { id: 'postConstruction', name: 'Post-Construction', icon: Home, multiplier: 2.5 }
  ];

  // Frequencies
  const frequencies = [
    { id: 'weekly', name: 'Weekly', discount: 20 },
    { id: 'biweekly', name: 'Bi-Weekly', discount: 15 },
    { id: 'monthly', name: 'Monthly', discount: 10 },
    { id: 'onetime', name: 'One-Time', discount: 0 }
  ];

  // Add-ons
  const addOnOptions = [
    { id: 'insideOven', name: 'Oven Cleaning', price: 35 },
    { id: 'insideFridge', name: 'Fridge Cleaning', price: 30 },
    { id: 'insideWindows', name: 'Window Cleaning', price: 45 },
    { id: 'laundry', name: 'Laundry Service', price: 40 },
    { id: 'garage', name: 'Garage Cleaning', price: 50 },
    { id: 'petHair', name: 'Pet Hair Removal', price: 30 }
  ];

  // Calculate current price
  const getCurrentPrice = () => {
    const pricing = calculatePrice({
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      squareFeet: formData.squareFeet,
      serviceType: formData.serviceType,
      frequency: formData.frequency,
      addOns: formData.addOns,
      location: 'default'
    });
    return pricing.total;
  };

  // Fetch available time slots when date changes
  useEffect(() => {
    if (formData.serviceDate) {
      fetchAvailableSlots(formData.serviceDate);
    }
  }, [formData.serviceDate]);

  // Fetch personalized recommendations on mount
  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await fetch(`/api/booking/firebase?action=availability&date=${date}`);
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      // Fallback slots
      setAvailableSlots(['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/booking/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'recommendations',
          propertyType: 'residential'
        })
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleAIAssistant = async () => {
    if (!aiAssistant.message.trim()) return;
    
    setAiLoading(true);
    try {
      const response = await fetch('/api/booking/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          message: aiAssistant.message,
          context: formData
        })
      });
      
      const data = await response.json();
      
      // Update form with AI suggestions
      setFormData(prev => ({
        ...prev,
        serviceType: data.serviceType || prev.serviceType,
        frequency: data.suggestedFrequency || prev.frequency,
        addOns: data.addOns || prev.addOns
      }));
      
      setAiAssistant(prev => ({
        ...prev,
        response: data.insights || 'I recommend our standard bi-weekly service to keep your home consistently clean.'
      }));
    } catch (error) {
      console.error('AI Assistant error:', error);
      setAiAssistant(prev => ({
        ...prev,
        response: 'I can help you choose the perfect cleaning service. Our bi-weekly service is most popular!'
      }));
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create booking with Firebase
      const response = await fetch('/api/booking/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          booking: {
            ...formData,
            totalPrice: getCurrentPrice()
          }
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success state
        setStep(5);
        
        // If payment intent exists, redirect to payment
        if (result.paymentIntent) {
          // In production, integrate Stripe Elements here
          console.log('Payment intent:', result.paymentIntent);
        }
      } else {
        alert('Error creating booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error creating booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAddOn = (addOnId: string) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* AI Assistant Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => setAiAssistant(prev => ({ ...prev, isOpen: !prev.isOpen }))}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Bot className="w-5 h-5" />
          <span>AI Booking Assistant</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </motion.div>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {aiAssistant.isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200"
          >
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={aiAssistant.message}
                onChange={(e) => setAiAssistant(prev => ({ ...prev, message: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleAIAssistant()}
                placeholder="Tell me about your cleaning needs..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleAIAssistant}
                disabled={aiLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
            {aiAssistant.response && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-white rounded-lg"
              >
                <p className="text-gray-700">{aiAssistant.response}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendations */}
      {recommendations && step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200"
        >
          <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Personalized Recommendations
          </h3>
          <ul className="space-y-1">
            {recommendations.recommendations?.map((rec: string, i: number) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Service', 'Property', 'Schedule', 'Contact'].map((label, i) => (
            <div
              key={label}
              className={`text-sm font-medium ${
                step > i + 1 ? 'text-green-600' : step === i + 1 ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Select Your Service</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {serviceTypes.map(service => (
              <button
                key={service.id}
                onClick={() => updateFormData('serviceType', service.id as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.serviceType === service.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <service.icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <div className="font-medium">{service.name}</div>
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Cleaning Frequency</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {frequencies.map(freq => (
                <button
                  key={freq.id}
                  onClick={() => updateFormData('frequency', freq.id as any)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.frequency === freq.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{freq.name}</div>
                  {freq.discount > 0 && (
                    <div className="text-sm text-green-600">Save {freq.discount}%</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Add-On Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {addOnOptions.map(addon => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    formData.addOns.includes(addon.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{addon.name}</span>
                    <span className="text-sm font-bold text-purple-600">+${addon.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {/* Step 2: Property Details */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Property Details</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Service Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
              placeholder="123 Main St, Austin, TX 78701"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Square Feet</label>
              <input
                type="number"
                value={formData.squareFeet}
                onChange={(e) => updateFormData('squareFeet', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => updateFormData('bedrooms', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => updateFormData('bathrooms', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Special Instructions</label>
            <textarea
              value={formData.specialInstructions}
              onChange={(e) => updateFormData('specialInstructions', e.target.value)}
              rows={3}
              placeholder="Any specific areas to focus on, allergies, or preferences..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Key/Access Instructions</label>
              <input
                type="text"
                value={formData.keyInstructions}
                onChange={(e) => updateFormData('keyInstructions', e.target.value)}
                placeholder="Lockbox code, doorman, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pet Information</label>
              <input
                type="text"
                value={formData.petInfo}
                onChange={(e) => updateFormData('petInfo', e.target.value)}
                placeholder="2 friendly dogs, indoor cat, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Schedule */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Schedule Your Cleaning</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Service Date</label>
            <input
              type="date"
              value={formData.serviceDate}
              onChange={(e) => updateFormData('serviceDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {availableSlots.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Available Time Slots</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => updateFormData('serviceTime', slot)}
                    className={`py-2 px-3 rounded-lg border-2 transition-all ${
                      formData.serviceTime === slot
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Contact Information */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Contact Information</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => updateFormData('customerName', e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => updateFormData('customerEmail', e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => updateFormData('customerPhone', e.target.value)}
                placeholder="(512) 555-0123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Service Type:</span>
                <span className="font-medium capitalize">{formData.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="font-medium capitalize">{formData.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="font-medium">{formData.serviceDate} at {formData.serviceTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Property:</span>
                <span className="font-medium">{formData.bedrooms}BR/{formData.bathrooms}BA, {formData.squareFeet} sqft</span>
              </div>
              {formData.addOns.length > 0 && (
                <div className="flex justify-between">
                  <span>Add-ons:</span>
                  <span className="font-medium">{formData.addOns.length} selected</span>
                </div>
              )}
              <div className="pt-3 mt-3 border-t border-gray-300">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Price:</span>
                  <span className="text-green-600">${getCurrentPrice()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Book & Pay
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 5: Success */}
      {step === 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-lg text-gray-600 mb-8">
            We've sent a confirmation email to {formData.customerEmail}
          </p>
          <div className="p-6 bg-gray-50 rounded-xl text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Our team will arrive on {formData.serviceDate} at {formData.serviceTime}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>We'll bring all necessary cleaning supplies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Enjoy your free time while we handle the cleaning!</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Return Home
          </button>
        </motion.div>
      )}
    </div>
  );
}