'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Building2, Sparkles, Check, X, ArrowRight, Star, 
  Clock, Shield, Award, Heart, Calendar, Phone, Calculator,
  TrendingUp, Users, Zap, ChevronRight, Info, Gift, 
  CreditCard, Lock, RefreshCw, Gem, Crown, Trophy
} from 'lucide-react';

const PricingPage = () => {
  const [selectedTier, setSelectedTier] = useState('signature');
  const [frequency, setFrequency] = useState('biweekly');
  const [homeSize, setHomeSize] = useState('2000');
  const [isMonthly, setIsMonthly] = useState(false);

  // ADJUSTED Premium pricing structure - New pricing as requested
  const pricingTiers = {
    essential: {
      name: 'Essential Clean',
      icon: Home,
      color: 'blue',
      description: 'Professional cleaning for everyday living',
      features: [
        'All rooms cleaned thoroughly',
        'Kitchen & bathroom sanitization',
        'Dusting & vacuuming',
        'Floor mopping',
        'Trash removal',
        'Bed making',
        'Surface cleaning'
      ],
      excluded: [
        'Inside appliances',
        'Window cleaning',
        'Baseboards monthly',
        'Priority scheduling'
      ],
      pricing: {
        onetime: { '1000': 200, '1500': 230, '2000': 265, '2500': 305, '3000': 350, '3500': 400 },
        monthly: { '1000': 190, '1500': 220, '2000': 250, '2500': 290, '3000': 335, '3500': 380 },
        biweekly: { '1000': 180, '1500': 205, '2000': 240, '2500': 275, '3000': 315, '3500': 360 },
        weekly: { '1000': 170, '1500': 195, '2000': 225, '2500': 260, '3000': 300, '3500': 340 }
      }
    },
    signature: {
      name: 'Signature Service',
      icon: Gem,
      color: 'green',
      popular: true,
      description: 'Our most popular luxury cleaning experience',
      features: [
        'Everything in Essential',
        'Inside oven & microwave',
        'Inside refrigerator monthly',
        'Window interior cleaning',
        'Baseboards & door frames',
        'Light fixtures & ceiling fans',
        'Priority scheduling',
        'Same team guarantee',
        'Eco-premium products'
      ],
      excluded: [
        'Laundry service',
        'Organization services',
        'Deep carpet cleaning'
      ],
      pricing: {
        onetime: { '1000': 280, '1500': 320, '2000': 370, '2500': 425, '3000': 485, '3500': 550 },
        monthly: { '1000': 265, '1500': 305, '2000': 350, '2500': 405, '3000': 460, '3500': 520 },
        biweekly: { '1000': 250, '1500': 290, '2000': 335, '2500': 385, '3000': 435, '3500': 495 },
        weekly: { '1000': 240, '1500': 270, '2000': 315, '2500': 360, '3000': 410, '3500': 465 }
      }
    },
    executive: {
      name: 'Executive Estate',
      icon: Crown,
      color: 'purple',
      description: 'White-glove service for luxury properties',
      features: [
        'Everything in Signature',
        'Laundry wash & fold',
        'Closet organization',
        'Pantry organization',
        'Plant care',
        'Silver/brass polishing',
        'Leather conditioning',
        'Deep carpet spot treatment',
        'Concierge scheduling',
        'Holiday decoration service',
        '24/7 support line',
        'Quarterly deep detail'
      ],
      excluded: [],
      pricing: {
        onetime: { '1000': 400, '1500': 460, '2000': 530, '2500': 610, '3000': 700, '3500': 800 },
        monthly: { '1000': 380, '1500': 435, '2000': 505, '2500': 580, '3000': 665, '3500': 760 },
        biweekly: { '1000': 360, '1500': 415, '2000': 480, '2500': 550, '3000': 630, '3500': 720 },
        weekly: { '1000': 340, '1500': 390, '2000': 450, '2500': 520, '3000': 595, '3500': 680 }
      }
    }
  };

  const frequencies = [
    { id: 'weekly', name: 'Weekly', discount: '30%', popular: false },
    { id: 'biweekly', name: 'Bi-Weekly', discount: '20%', popular: true },
    { id: 'monthly', name: 'Monthly', discount: '10%', popular: false },
    { id: 'onetime', name: 'One-Time', discount: '0%', popular: false }
  ];

  const homeSizes = [
    { value: '1000', label: '< 1,500 sq ft', beds: '1-2 Bed' },
    { value: '1500', label: '1,500-2,000 sq ft', beds: '2-3 Bed' },
    { value: '2000', label: '2,000-2,500 sq ft', beds: '3 Bed' },
    { value: '2500', label: '2,500-3,000 sq ft', beds: '3-4 Bed' },
    { value: '3000', label: '3,000-3,500 sq ft', beds: '4+ Bed' },
    { value: '3500', label: '3,500+ sq ft', beds: '5+ Bed' }
  ];

  const addOns = [
    { name: 'Move-In/Out Deep Clean', price: 200, description: 'Complete property preparation' },
    { name: 'Post-Construction', price: 350, description: 'Dust & debris removal' },
    { name: 'Garage Detailing', price: 150, description: 'Full garage organization & cleaning' },
    { name: 'Window Exterior', price: 200, description: 'All exterior windows' },
    { name: 'Carpet Deep Clean', price: 250, description: 'Professional steam cleaning' },
    { name: 'Pressure Washing', price: 300, description: 'Driveway, patio, walkways' }
  ];

  const getCurrentPrice = () => {
    const tier = pricingTiers[selectedTier as keyof typeof pricingTiers];
    return tier.pricing[frequency as keyof typeof tier.pricing][homeSize as keyof typeof tier.pricing.onetime] || 0;
  };

  const getMonthlyInvestment = () => {
    const price = getCurrentPrice();
    switch(frequency) {
      case 'weekly': return price * 4.33;
      case 'biweekly': return price * 2.17;
      case 'monthly': return price;
      case 'onetime': return 0;
      default: return price * 2.17;
    }
  };

  const timeValue = {
    weekly: { hours: 6, activities: 'Weekly adventures on Lady Bird Lake' },
    biweekly: { hours: 6, activities: 'Two full Greenbelt explorations' },
    monthly: { hours: 6, activities: 'A full day at Zilker Park' },
    onetime: { hours: 6, activities: 'One perfect Austin Saturday' }
  };

  // Send booking to M365
  const handleBooking = async (tier: string) => {
    const bookingData = {
      tier: pricingTiers[tier as keyof typeof pricingTiers].name,
      frequency,
      homeSize: homeSizes.find(h => h.value === homeSize)?.label,
      price: getCurrentPrice(),
      monthlyInvestment: getMonthlyInvestment(),
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Pricing Page Inquiry',
          customerEmail: 'inquiry@pending.com',
          customerPhone: '000-000-0000',
          serviceType: bookingData.tier,
          serviceDate: new Date().toISOString().split('T')[0],
          serviceTime: '09:00',
          address: 'Pending',
          squareFeet: parseInt(homeSize),
          bedrooms: 3,
          bathrooms: 2,
          addOns: [],
          frequency: frequency,
          totalPrice: bookingData.price,
          specialInstructions: `Pricing inquiry from website: ${JSON.stringify(bookingData)}`
        })
      });

      if (response.ok) {
        window.location.href = `/booking?tier=${tier}&frequency=${frequency}&size=${homeSize}&price=${getCurrentPrice()}`;
      }
    } catch (error) {
      console.error('Booking error:', error);
      window.location.href = '/booking';
    }
  };

  return (
    <>
      <title>Premium Cleaning Pricing Austin | Luxury Service Rates | Aura Spring</title>
      <meta name="description" content="Transparent luxury cleaning pricing for Austin homes. Starting at $195/visit. Save 30% with weekly service. Executive estate cleaning available." />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-800 to-green-700 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 400 + 200,
                height: Math.random() * 400 + 200,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Austin's Premium Cleaning Service</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Investment in Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mt-2">
              Time & Lifestyle
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Premium pricing for premium service. Your home deserves the best, 
            and so does your time.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">2,500+</div>
              <div className="text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">6+ Years</div>
              <div className="text-sm">Of Excellence</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Transparent 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 ml-2">
                Luxury Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Choose your service level and see your investment instantly
            </p>
          </motion.div>

          {/* Step 1: Frequency Selection */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Step 1: Choose Your Frequency</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {frequencies.map((freq) => (
                <motion.button
                  key={freq.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFrequency(freq.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    frequency === freq.id 
                      ? 'border-green-500 bg-green-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {freq.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <RefreshCw className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="font-bold text-lg">{freq.name}</div>
                  <div className="text-green-600 font-semibold">Save {freq.discount}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 2: Home Size */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Step 2: Select Your Home Size</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {homeSizes.map((size) => (
                <motion.button
                  key={size.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHomeSize(size.value)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    homeSize === size.value 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Home className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="font-bold">{size.label}</div>
                  <div className="text-sm text-gray-600">{size.beds}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 3: Service Tiers */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Step 3: Choose Your Service Level</h3>
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Object.entries(pricingTiers).map(([key, tier]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedTier(key)}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all ${
                    selectedTier === key ? 'ring-4 ring-green-500 shadow-2xl' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-green-600 text-white px-4 py-1 rounded-bl-lg">
                      <Star className="w-4 h-4 inline mr-1" />
                      POPULAR
                    </div>
                  )}

                  <div className={`p-8 bg-gradient-to-br ${
                    tier.color === 'green' ? 'from-green-50 to-blue-50' :
                    tier.color === 'purple' ? 'from-purple-50 to-pink-50' :
                    'from-blue-50 to-cyan-50'
                  }`}>
                    <tier.icon className={`w-12 h-12 mb-4 ${
                      tier.color === 'green' ? 'text-green-600' :
                      tier.color === 'purple' ? 'text-purple-600' :
                      'text-blue-600'
                    }`} />
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gray-800">
                        ${tier.pricing[frequency as keyof typeof tier.pricing][homeSize as keyof typeof tier.pricing.onetime]}
                      </div>
                      <div className="text-sm text-gray-600">per cleaning</div>
                      {frequency !== 'onetime' && (
                        <div className="text-lg text-green-600 font-semibold mt-2">
                          ${Math.round(
                            tier.pricing[frequency as keyof typeof tier.pricing][homeSize as keyof typeof tier.pricing.onetime] * 
                            (frequency === 'weekly' ? 4.33 : frequency === 'biweekly' ? 2.17 : 1)
                          )}/month
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      {tier.features.slice(0, 5).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {tier.features.length > 5 && (
                        <div className="text-sm text-gray-600 font-semibold">
                          +{tier.features.length - 5} more features
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBooking(key)}
                      className={`w-full py-3 rounded-lg font-bold transition-all ${
                        selectedTier === key
                          ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedTier === key ? 'Book This Service' : 'Select This Tier'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Add-On Services */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Premium Add-On Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addOns.map((addon) => (
                <div key={addon.name} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-gray-800">{addon.name}</div>
                      <div className="text-sm text-gray-600">{addon.description}</div>
                    </div>
                    <div className="text-lg font-bold text-green-600">+${addon.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Time Value Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-5xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-8">Your Investment = Your Time Back</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <div className="text-3xl font-bold mb-2">
                {timeValue[frequency as keyof typeof timeValue].hours} Hours
              </div>
              <div className="text-sm">Returned Every Cleaning</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold mb-2">
                {frequency === 'weekly' ? '312' : frequency === 'biweekly' ? '156' : '72'} Hours
              </div>
              <div className="text-sm">Saved Annually</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
              <div className="text-3xl font-bold mb-2">Priceless</div>
              <div className="text-sm">Memories Created</div>
            </div>
          </div>

          <p className="text-xl mb-8">
            {timeValue[frequency as keyof typeof timeValue].activities}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <CreditCard className="w-5 h-5" />
              Book Your Premium Service
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all"
            >
              <Phone className="w-5 h-5" />
              (512) 781-0527
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Pricing Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Why is Aura Spring more expensive than other services?</h3>
              <p className="text-gray-700">
                We invest in the best: thoroughly vetted & trained professionals, premium eco-friendly products, 
                comprehensive insurance, and consistent teams. Our clients value reliability, trust, and the 
                luxury of never worrying about their home's cleanliness.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Do prices include everything?</h3>
              <p className="text-gray-700">
                Yes! Our quoted prices are all-inclusive. No hidden fees, no surprises. 
                Taxes, supplies, insurance, and our happiness guarantee are all included.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">How do I lock in these rates?</h3>
              <p className="text-gray-700">
                Book recurring service to lock in today's rates for 12 months. 
                We reward loyalty - the longer you're with us, the more benefits you receive.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;