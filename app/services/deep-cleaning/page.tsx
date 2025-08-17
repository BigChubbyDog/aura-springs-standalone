'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Shield, Clock, CheckCircle, Star, Award, 
  ArrowRight, Phone, Calendar, Home, Zap, Heart,
  Droplets, Wind, Bug, Paintbrush, Wrench, Gem,
  Eye, Thermometer, Waves, TreePine, Coffee, Music
} from 'lucide-react';

const DeepCleaningPage = () => {
  const [selectedRoom, setSelectedRoom] = useState('kitchen');
  const [homeSize, setHomeSize] = useState('2000');

  const deepCleanFeatures = {
    kitchen: {
      name: 'Kitchen Deep Clean',
      icon: Coffee,
      tasks: [
        'Inside oven deep scrubbing & degreasing',
        'Refrigerator interior & exterior, including coils',
        'Dishwasher interior cleaning & filter',
        'Microwave interior deep clean',
        'Cabinet interiors & reorganization',
        'Backsplash tile & grout restoration',
        'Light fixtures & ceiling fan blades',
        'Under sink organization & sanitization',
        'Small appliance deep cleaning',
        'Exhaust hood & filter degreasing'
      ]
    },
    bathroom: {
      name: 'Bathroom Restoration',
      icon: Droplets,
      tasks: [
        'Tile & grout deep scrubbing with restoration',
        'Shower door descaling & glass treatment',
        'Toilet complete disassembly cleaning',
        'Vanity drawer organization & sanitization',
        'Mirror & fixture polishing to shine',
        'Exhaust fan cleaning & dust removal',
        'Medicine cabinet interior cleaning',
        'Behind toilet & hard-to-reach areas',
        'Shower head & faucet descaling',
        'Baseboard & trim detail work'
      ]
    },
    bedroom: {
      name: 'Bedroom Sanctuary',
      icon: Heart,
      tasks: [
        'Mattress vacuuming & rotation',
        'Under bed complete cleaning',
        'Closet organization & dusting',
        'Ceiling fan blade detailing',
        'Window sill & track cleaning',
        'Light switch & outlet sanitization',
        'Baseboard & crown molding',
        'Behind furniture cleaning',
        'Air vent & register cleaning',
        'Carpet edge detailing'
      ]
    },
    living: {
      name: 'Living Space Revival',
      icon: Home,
      tasks: [
        'Upholstery vacuuming & spot treatment',
        'Under cushion deep cleaning',
        'Entertainment center detailing',
        'Bookshelf dusting & organization',
        'Window blind slat-by-slat cleaning',
        'Picture frame & artwork dusting',
        'Fireplace & mantle detailing',
        'Carpet deep vacuuming with edges',
        'Air purifier & fan cleaning',
        'Decorative item hand cleaning'
      ]
    }
  };

  // Deep cleaning = Base price * 1.5 (from pricingService.ts)
  const pricingTiers = [
    { size: '1000', label: '< 1,500 sq ft', beds: '1-2 Bed', price: 188, hours: '4-5' }, // ($125 base) * 1.5
    { size: '1500', label: '1,500-2,000 sq ft', beds: '2-3 Bed', price: 188, hours: '5-6' }, // ($125 base) * 1.5
    { size: '2000', label: '2,000-2,500 sq ft', beds: '3 Bed', price: 225, hours: '6-7' }, // ($150 base) * 1.5
    { size: '2500', label: '2,500-3,000 sq ft', beds: '3-4 Bed', price: 263, hours: '7-8' }, // ($175 base) * 1.5
    { size: '3000', label: '3,000-3,500 sq ft', beds: '4+ Bed', price: 300, hours: '8-9' }, // ($200 base) * 1.5
    { size: '3500', label: '3,500+ sq ft', beds: '5+ Bed', price: 338, hours: '9-10' } // ($225 base) * 1.5
  ];

  const situations = [
    {
      title: 'Spring Refresh',
      description: 'Annual deep clean to welcome the new season',
      icon: TreePine,
      color: 'green'
    },
    {
      title: 'Post-Construction',
      description: 'Remove dust and debris after renovations',
      icon: Wrench,
      color: 'orange'
    },
    {
      title: 'Allergy Relief',
      description: 'Eliminate allergens and improve air quality',
      icon: Wind,
      color: 'blue'
    },
    {
      title: 'Special Events',
      description: 'Perfect preparation for hosting guests',
      icon: Gem,
      color: 'purple'
    }
  ];

  const process = [
    { step: 1, title: 'Assessment', description: 'Walk-through to identify focus areas', time: '15 min' },
    { step: 2, title: 'Preparation', description: 'Protect surfaces and gather supplies', time: '15 min' },
    { step: 3, title: 'Top to Bottom', description: 'Clean from ceilings to baseboards', time: '3-4 hrs' },
    { step: 4, title: 'Deep Details', description: 'Focus on overlooked areas', time: '2-3 hrs' },
    { step: 5, title: 'Final Polish', description: 'Quality check and finishing touches', time: '30 min' }
  ];

  const getCurrentPrice = () => {
    return pricingTiers.find(tier => tier.size === homeSize)?.price || 585;
  };

  return (
    <>
      <title>Deep Cleaning Service Austin | Spring Cleaning | Move-In Ready</title>
      <meta name="description" content="Austin's most thorough deep cleaning service. Perfect for spring cleaning, move-ins, or annual refresh. 6-10 hour comprehensive clean starting at $385." />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2940)',
            filter: 'brightness(0.3)'
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Complete Home Transformation</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block text-purple-400">Deep Cleaning</span>
            <span className="block mt-2">Every Surface, Every Corner</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            The ultimate reset for your home. We clean what others miss, 
            giving you that "just moved in" feeling all over again.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold">6-10</div>
              <div className="text-sm">Hours Deep Clean</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Satisfaction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold">5★</div>
              <div className="text-sm">Rated Service</div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking?service=deep-cleaning"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Deep Cleaning
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg border border-white/30 hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              (512) 781-0527
            </a>
          </div>
        </motion.div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Perfect For These
              <span className="text-purple-600 ml-2">Situations</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {situations.map((situation, index) => (
              <motion.div
                key={situation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 border-${situation.color}-500`}
              >
                <situation.icon className={`w-12 h-12 mb-4 text-${situation.color}-600`} />
                <h3 className="text-xl font-bold mb-2">{situation.title}</h3>
                <p className="text-gray-400">{situation.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Room Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Room-by-Room
              <span className="text-purple-600 ml-2">Deep Clean Details</span>
            </h2>
            <p className="text-xl text-gray-400">
              Click each room to see exactly what we clean
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {Object.entries(deepCleanFeatures).map(([key, room]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedRoom(key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-6 rounded-xl text-left transition-all ${
                    selectedRoom === key
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <room.icon className={`w-8 h-8 ${
                      selectedRoom === key ? 'text-white' : 'text-purple-600'
                    }`} />
                    <div>
                      <h3 className="text-xl font-bold">{room.name}</h3>
                      <p className={`text-sm ${
                        selectedRoom === key ? 'text-purple-100' : 'text-gray-400'
                      }`}>
                        {room.tasks.length} detailed tasks
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoom}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-500">
                  {deepCleanFeatures[selectedRoom as keyof typeof deepCleanFeatures].name} Checklist
                </h3>
                <div className="space-y-3">
                  {deepCleanFeatures[selectedRoom as keyof typeof deepCleanFeatures].tasks.map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400">{task}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Our Deep Clean
              <span className="text-purple-600 ml-2">Process</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="text-purple-600 font-bold mb-2">Step {step.step}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 mb-2">{step.description}</p>
                    <div className="text-sm text-purple-600 font-semibold">{step.time}</div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{step.step}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Deep Clean
              <span className="text-purple-600 ml-2">Investment</span>
            </h2>
          </motion.div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-400 mb-4">
                Select Your Home Size
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pricingTiers.map((tier) => (
                  <button
                    key={tier.size}
                    onClick={() => setHomeSize(tier.size)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      homeSize === tier.size
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Home className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">{tier.label}</div>
                    <div className="text-sm text-gray-400">{tier.beds}</div>
                    <div className="text-2xl font-bold text-purple-600 mt-2">${tier.price}</div>
                    <div className="text-xs text-gray-500">{tier.hours} hours</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white text-center">
              <div className="text-lg mb-2">Your Deep Clean Investment</div>
              <div className="text-5xl font-bold mb-2">${getCurrentPrice()}</div>
              <div className="text-sm opacity-90 mb-4">
                Includes all supplies and equipment
              </div>
              <Link
                href={`/booking?service=deep-cleaning&price=${getCurrentPrice()}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Book Deep Cleaning
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes It Deep */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              What Makes It
              <span className="text-purple-600 ml-2">"Deep"</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-green-600">✓ Regular Cleaning Includes</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Surface cleaning</li>
                <li>• Visible area dusting</li>
                <li>• Standard vacuuming</li>
                <li>• Basic bathroom cleaning</li>
                <li>• Kitchen counters & sinks</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-600">✓✓ Deep Cleaning Adds</h3>
              <ul className="space-y-2 text-gray-400 font-semibold">
                <li>• Inside appliances & cabinets</li>
                <li>• Behind & under furniture</li>
                <li>• Light fixtures & ceiling fans</li>
                <li>• Baseboards & window sills</li>
                <li>• Air vents & switch plates</li>
                <li>• Grout restoration & spot treatment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the Deep Clean Difference
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Your home deserves a fresh start. Book Austin's most thorough cleaning service.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Eye className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Coverage</div>
              </div>
              <div>
                <Thermometer className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">CDC</div>
                <div className="text-sm">Standards</div>
              </div>
              <div>
                <Gem className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">Premium</div>
                <div className="text-sm">Results</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking?service=deep-cleaning"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Schedule Deep Cleaning
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition-all"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default DeepCleaningPage;