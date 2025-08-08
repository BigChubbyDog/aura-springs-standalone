'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Calendar, CheckCircle, Star, Shield, Award, Heart, 
  Sparkles, Home, Users, Zap, ArrowRight, Phone, Mail,
  Coffee, TreePine, Waves, Dog, Music, Bike, ChevronRight,
  Calculator, MapPin, DollarSign, RefreshCw, Lock, Leaf
} from 'lucide-react';

const RegularCleaningPage = () => {
  const [frequency, setFrequency] = useState('weekly');
  const [homeSize, setHomeSize] = useState('2bed');

  const frequencies = [
    { id: 'weekly', name: 'Weekly', discount: '20%', popular: true },
    { id: 'biweekly', name: 'Bi-Weekly', discount: '15%', popular: false },
    { id: 'monthly', name: 'Monthly', discount: '10%', popular: false },
    { id: 'onetime', name: 'One-Time', discount: '0%', popular: false }
  ];

  const homeSizes = [
    { id: '1bed', name: '1 Bed/1 Bath', basePrice: 120, time: '1.5-2 hours' },
    { id: '2bed', name: '2 Bed/2 Bath', basePrice: 150, time: '2-2.5 hours' },
    { id: '3bed', name: '3 Bed/2 Bath', basePrice: 180, time: '2.5-3 hours' },
    { id: '4bed', name: '4+ Bed/3+ Bath', basePrice: 220, time: '3-4 hours' }
  ];

  const getPrice = () => {
    const home = homeSizes.find(h => h.id === homeSize);
    const freq = frequencies.find(f => f.id === frequency);
    if (!home || !freq) return 150;
    
    const discount = parseInt(freq.discount) / 100;
    return Math.round(home.basePrice * (1 - discount));
  };

  const includedServices = [
    { category: 'Kitchen', items: [
      'Counter & surface sanitization',
      'Appliance exterior cleaning',
      'Sink & faucet polishing',
      'Cabinet face wiping',
      'Floor mopping & spot cleaning',
      'Trash removal'
    ]},
    { category: 'Bathrooms', items: [
      'Toilet thorough cleaning & disinfection',
      'Shower/tub scrubbing & descaling',
      'Mirror & fixture polishing',
      'Counter & sink sanitization',
      'Floor mopping & grout attention',
      'Towel arrangement'
    ]},
    { category: 'Living Areas', items: [
      'Dusting all surfaces & decor',
      'Vacuum carpets & rugs',
      'Mop hardwood/tile floors',
      'Couch & cushion tidying',
      'Window sill & blind dusting',
      'Light switch & doorknob sanitizing'
    ]},
    { category: 'Bedrooms', items: [
      'Bed making with hospital corners',
      'Surface dusting & organizing',
      'Floor vacuuming/mopping',
      'Mirror cleaning',
      'Nightstand arrangement',
      'Under-bed light cleaning'
    ]}
  ];

  const addOns = [
    { name: 'Inside Oven Cleaning', price: 35, time: '+30 min' },
    { name: 'Inside Fridge Cleaning', price: 35, time: '+30 min' },
    { name: 'Window Cleaning (Interior)', price: 45, time: '+45 min' },
    { name: 'Laundry Wash & Fold', price: 25, time: '+20 min' },
    { name: 'Garage Cleaning', price: 50, time: '+45 min' },
    { name: 'Balcony/Patio Cleaning', price: 30, time: '+30 min' }
  ];

  const timeBackCalculator = {
    weekly: { hours: 4, activities: 'Weekly paddleboarding session on Lady Bird Lake' },
    biweekly: { hours: 8, activities: 'Full day hiking Barton Creek Greenbelt monthly' },
    monthly: { hours: 4, activities: 'Monthly brunch and shopping on South Congress' }
  };

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'Downtown Austin',
      rating: 5,
      text: 'Switching to weekly service gave me my Saturdays back. Now I actually make it to the farmers market!',
      service: 'Weekly Cleaning',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200'
    },
    {
      name: 'James Chen',
      location: 'The Domain',
      rating: 5,
      text: 'The bi-weekly service is perfect. My condo stays pristine while I focus on my startup.',
      service: 'Bi-Weekly Cleaning',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200'
    },
    {
      name: 'Maria Rodriguez',
      location: 'East Austin',
      rating: 5,
      text: 'Best decision ever! More time with my dogs at Zilker Park instead of cleaning.',
      service: 'Weekly Cleaning',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200'
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Regular House Cleaning Service Austin | Weekly, Bi-Weekly, Monthly</title>
      <meta name="description" content="Austin's most reliable regular cleaning service. Save 4-8 hours weekly. Consistent teams, eco-friendly products, starting at $120. Book recurring cleaning today!" />
      <meta name="keywords" content="regular cleaning austin, weekly cleaning service, bi-weekly house cleaning, monthly maid service, recurring cleaning austin tx, apartment cleaning service" />
      
      {/* Hero Section with Time-Saving Focus */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2940)',
            filter: 'brightness(0.4)'
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-6"
          >
            <RefreshCw className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-300">Save 20% with Weekly Service</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block text-green-400">Regular Cleaning</span>
            <span className="block mt-2">Your Time Back, Every Week</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Imagine never thinking about cleaning again. Wake up to a pristine home 
            while you were out living your best Austin life.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold">4-8</div>
              <div className="text-sm">Hours Saved Weekly</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold">Same</div>
              <div className="text-sm">Team Every Time</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Satisfaction</div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Start Your Regular Service
            </Link>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg border border-white/30 hover:bg-white/20 transition-all"
            >
              <Calculator className="w-5 h-5" />
              Calculate Your Savings
            </button>
          </div>
        </motion.div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-800">Transparent </span>
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Time-Saving Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              The more you book, the more you save - both money and time
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Calculate Your Investment</h3>
              
              {/* Frequency Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cleaning Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {frequencies.map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setFrequency(freq.id)}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        frequency === freq.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {freq.popular && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                      <div className="font-semibold">{freq.name}</div>
                      <div className="text-sm text-green-600">Save {freq.discount}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Home Size
                </label>
                <div className="space-y-2">
                  {homeSizes.map((home) => (
                    <button
                      key={home.id}
                      onClick={() => setHomeSize(home.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all flex justify-between items-center ${
                        homeSize === home.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold">{home.name}</div>
                        <div className="text-sm text-gray-500">{home.time}</div>
                      </div>
                      <div className="text-lg font-bold text-gray-700">
                        ${home.basePrice}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Your Price Per Clean:</span>
                  <span className="text-3xl font-bold">${getPrice()}</span>
                </div>
                {frequency !== 'onetime' && (
                  <div className="text-sm opacity-90">
                    You save ${homeSizes.find(h => h.id === homeSize)!.basePrice - getPrice()} per visit!
                  </div>
                )}
              </div>

              <Link
                href="/booking"
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
              >
                Book This Package
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Time Back Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Your Time Back</h3>
              
              {frequency !== 'onetime' && (
                <div className="mb-6">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {timeBackCalculator[frequency as keyof typeof timeBackCalculator]?.hours || 4}
                  </div>
                  <div className="text-lg text-gray-700">Hours returned to you monthly</div>
                  <div className="text-sm text-gray-600 mt-2">
                    That's {timeBackCalculator[frequency as keyof typeof timeBackCalculator]?.activities}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">With your time back, you could:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Waves className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">Paddleboard Lady Bird Lake at sunset</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TreePine className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Explore all Greenbelt trails</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Dog className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">Take your pup to every dog park</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">Try every coffee shop on South Congress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-700">Never miss live music on Rainey Street</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <div className="text-sm font-semibold text-green-700 mb-1">Annual Impact:</div>
                <div className="text-2xl font-bold text-gray-800">
                  {frequency === 'weekly' ? '208' : frequency === 'biweekly' ? '104' : '48'} hours
                </div>
                <div className="text-sm text-gray-600">
                  That's {frequency === 'weekly' ? '26' : frequency === 'biweekly' ? '13' : '6'} full days of freedom!
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included - Detailed Service List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-800">Every Regular Clean </span>
              <span className="text-green-600">Includes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive cleaning that maintains your home's pristine condition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedServices.map((service, index) => (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-500" />
                  {service.category}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Add-on Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Enhance Your Service</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addOns.map((addon) => (
                <div key={addon.name} className="bg-white rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-800">{addon.name}</div>
                    <div className="text-sm text-gray-500">{addon.time}</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">+${addon.price}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-800">Why Austin Trusts </span>
              <span className="text-green-600">Our Regular Service</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Same Team</h3>
              <p className="text-gray-600">Your dedicated team knows your home and preferences</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <Lock className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold mb-2">Secure Entry</h3>
              <p className="text-gray-600">Bonded, insured, and background-checked professionals</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <Leaf className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Safe for kids, pets, and the environment</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-bold mb-2">Flexible</h3>
              <p className="text-gray-600">Easy rescheduling and vacation holds</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-800">Life-Changing </span>
              <span className="text-green-600">Regular Service</span>
            </h2>
            <p className="text-xl text-gray-600">
              Hear from Austinites who got their weekends back
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-2">"{testimonial.text}"</p>
                <div className="text-sm text-green-600 font-semibold">{testimonial.service}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Living, Stop Cleaning
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 2,500+ Austinites who never worry about cleaning
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">52</div>
                <div className="text-sm">Saturdays Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold">208</div>
                <div className="text-sm">Hours Returned</div>
              </div>
              <div>
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm">Peace of Mind</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Regular Service Now
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              (512) 781-0527
            </a>
          </div>
          
          <div className="mt-8 text-sm text-green-200">
            First-time customers save 20% • No contracts • Cancel anytime
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default RegularCleaningPage;