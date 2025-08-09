'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Clock, Users } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  popular?: boolean;
  features: string[];
  savings?: string;
}

const plans: Plan[] = [
  {
    id: 'weekly_standard',
    name: 'Weekly Standard',
    price: 250,
    interval: 'week',
    features: [
      '2-hour cleaning session',
      'Same team every week',
      'Eco-friendly products',
      'Priority scheduling',
      'Free cancellation'
    ],
    savings: 'Save $70/month'
  },
  {
    id: 'weekly_luxury',
    name: 'Weekly Luxury',
    price: 380,
    interval: 'week',
    popular: true,
    features: [
      '3-hour deep cleaning',
      'Dedicated luxury team',
      'Premium products',
      'White glove service',
      'Complimentary add-ons',
      'Same-day requests'
    ],
    savings: 'Save $120/month'
  },
  {
    id: 'biweekly_standard',
    name: 'Bi-Weekly Standard',
    price: 280,
    interval: '2 weeks',
    features: [
      '2.5-hour cleaning',
      'Consistent team',
      'Eco-friendly products',
      'Flexible scheduling',
      'Satisfaction guarantee'
    ],
    savings: 'Save $40/month'
  },
  {
    id: 'monthly_deep',
    name: 'Monthly Deep',
    price: 450,
    interval: 'month',
    features: [
      '5-hour deep cleaning',
      'Full team (4 cleaners)',
      'All appliances included',
      'Baseboards & windows',
      'Organizational service'
    ]
  }
];

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSubscribe = async (plan: Plan) => {
    if (!customerInfo.name || !customerInfo.email) {
      setSelectedPlan(plan);
      setShowCheckout(true);
      return;
    }

    setLoading(plan.id);
    
    try {
      // Create checkout session
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          metadata: {
            source: 'subscription_page',
            plan_name: plan.name
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { checkoutUrl } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleQuickCheckout = async () => {
    if (!selectedPlan || !customerInfo.name || !customerInfo.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    await handleSubscribe(selectedPlan);
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Save with Subscriptions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join 300+ Austin families who trust us with their recurring cleaning needs. 
            Cancel anytime, no contracts required.
          </p>
          
          {/* Trust badges */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Insured & Bonded</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-green-600" />
              <span>Always On Time</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 text-green-600" />
              <span>Same Team</span>
            </div>
          </div>
        </div>

        {/* Subscription Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-green-600' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-semibold">Popular</span>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Plan name */}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/{plan.interval}</span>
                </div>

                {/* Savings badge */}
                {plan.savings && (
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <Zap className="w-4 h-4" />
                    {plan.savings}
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Subscribe button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Processing...
                    </span>
                  ) : (
                    'Start 7-Day Trial'
                  )}
                </motion.button>

                {/* Trial info */}
                <p className="text-xs text-gray-500 text-center mt-2">
                  Free for 7 days, then ${plan.price}/{plan.interval}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            Why Choose a Subscription?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h4 className="font-semibold mb-2">Save Up to 20%</h4>
              <p className="text-gray-600 text-sm">
                Subscribers save hundreds compared to one-time bookings
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h4 className="font-semibold mb-2">Same Team Every Time</h4>
              <p className="text-gray-600 text-sm">
                Build trust with a dedicated team that knows your home
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h4 className="font-semibold mb-2">Priority Scheduling</h4>
              <p className="text-gray-600 text-sm">
                Get your preferred time slot and skip the booking hassle
              </p>
            </div>
          </div>
        </div>

        {/* Quick checkout modal */}
        {showCheckout && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4">
                Complete Your Subscription
              </h3>
              
              <p className="text-gray-600 mb-6">
                Starting {selectedPlan.name} - ${selectedPlan.price}/{selectedPlan.interval}
              </p>

              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleQuickCheckout}
                  disabled={loading === selectedPlan.id}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading === selectedPlan.id ? 'Processing...' : 'Continue to Payment'}
                </button>
                
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    setSelectedPlan(null);
                  }}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                You'll be redirected to our secure payment page powered by Stripe
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}