'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, CheckCircle, Clock, Shield, Calendar, Sparkles, 
  DollarSign, Award, Phone, ArrowRight, Package, Key,
  Truck, ClipboardCheck, Star, Users, Heart, MapPin
} from 'lucide-react';

const MoveInOutCleaningPage = () => {
  const [selectedService, setSelectedService] = useState('moveout');

  // Adjusted pricing structure
  const services = {
    moveout: {
      name: 'Move-Out Cleaning',
      basePrice: 550,
      description: 'Get your deposit back with our comprehensive move-out deep clean',
      icon: Truck,
      features: [
        'Deep clean all rooms and surfaces',
        'Inside all appliances (oven, fridge, microwave)',
        'Inside all cabinets and drawers',
        'Baseboards and window sills',
        'Light fixtures and ceiling fans',
        'Bathroom deep sanitization',
        'Carpet vacuuming and spot treatment',
        'Garage cleaning (if applicable)',
        'Final walkthrough checklist',
        'Photo documentation for landlord'
      ],
      guarantee: '100% Deposit Return Guarantee'
    },
    movein: {
      name: 'Move-In Cleaning',
      basePrice: 500,
      description: 'Start fresh in your new home with a pristine, sanitized space',
      icon: Key,
      features: [
        'Complete sanitization of all surfaces',
        'Deep clean kitchen and bathrooms',
        'Inside all appliances',
        'Cabinet and drawer cleaning',
        'Disinfect all touchpoints',
        'HVAC vent cleaning',
        'Window cleaning (interior)',
        'Carpet deep vacuuming',
        'Closet shelving sanitization',
        'Move-in ready certification'
      ],
      guarantee: 'Health-Safe Living Space Guarantee'
    },
    renovation: {
      name: 'Post-Construction',
      basePrice: 750,
      description: 'Remove construction dust and debris for a move-in ready home',
      icon: Package,
      features: [
        'Construction dust removal',
        'Paint overspray cleaning',
        'Window cleaning (inside & out)',
        'Deep floor cleaning and mopping',
        'Air vent and filter cleaning',
        'Light fixture detailing',
        'Cabinet interior/exterior cleaning',
        'Appliance cleaning and polishing',
        'Debris removal',
        'Final builder clean standards'
      ],
      guarantee: 'Builder-Approved Clean Standard'
    }
  };

  const squareFootPricing = [
    { range: '< 1,000 sq ft', multiplier: 0.8, label: 'Studio/1BR' },
    { range: '1,000-1,500 sq ft', multiplier: 0.9, label: '1-2BR' },
    { range: '1,500-2,000 sq ft', multiplier: 1.0, label: '2-3BR' },
    { range: '2,000-2,500 sq ft', multiplier: 1.15, label: '3BR' },
    { range: '2,500-3,000 sq ft', multiplier: 1.3, label: '3-4BR' },
    { range: '3,000-4,000 sq ft', multiplier: 1.5, label: '4+BR' },
    { range: '4,000+ sq ft', multiplier: 1.8, label: '5+BR/Estate' }
  ];

  const process = [
    { step: '01', title: 'Book Online', desc: 'Select your date and service', icon: Calendar },
    { step: '02', title: 'Pre-Clean Inspection', desc: 'We document the initial condition', icon: ClipboardCheck },
    { step: '03', title: 'Deep Clean', desc: 'Comprehensive top-to-bottom service', icon: Sparkles },
    { step: '04', title: 'Quality Check', desc: 'Final inspection with checklist', icon: CheckCircle },
    { step: '05', title: 'Documentation', desc: 'Photos and certificate provided', icon: Award }
  ];

  const testimonials = [
    {
      name: 'Jennifer M.',
      role: 'Downtown Condo Owner',
      content: 'Got my full $2,800 deposit back! The landlord said it was the cleanest unit he\'d ever seen.',
      rating: 5,
      service: 'Move-Out Clean'
    },
    {
      name: 'Robert & Lisa K.',
      role: 'New Homeowners',
      content: 'Moving into a truly clean home made such a difference. Worth every penny!',
      rating: 5,
      service: 'Move-In Clean'
    },
    {
      name: 'Austin Property Mgmt',
      role: 'Property Management Company',
      content: 'We recommend Aura Spring to all our tenants. Professional and thorough every time.',
      rating: 5,
      service: 'Corporate Client'
    }
  ];

  return (
    <>
      <title>Move In/Out Cleaning Austin | Deep Cleaning Services | Aura Spring</title>
      <meta name="description" content="Professional move-in and move-out cleaning in Austin. Get your deposit back guaranteed. Deep cleaning from $500. Same-day service available." />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-green-800 to-blue-700 overflow-hidden">
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
            <Shield className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">100% Deposit Return Guarantee</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Move In/Out
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 mt-2">
              Deep Cleaning Experts
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Austin's most thorough move-out cleaning service. Get your full deposit 
            back or start fresh in a pristine new home. Professional deep cleaning 
            that exceeds property management standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/booking?service=moveout"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Move-Out Cleaning
            </Link>
            <Link
              href="/booking?service=movein"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all"
            >
              <Key className="w-5 h-5" />
              Book Move-In Cleaning
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">$550</div>
              <div className="text-sm">Move-Out Base</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm">Deposit Guarantee</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">4-6hr</div>
              <div className="text-sm">Deep Clean</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Service Options */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Choose Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 ml-2">
                Moving Service
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Professional deep cleaning for every moving situation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(services).map(([key, service]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedService(key)}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all ${
                  selectedService === key ? 'ring-4 ring-green-500 shadow-2xl' : ''
                }`}
              >
                <div className="p-8">
                  <service.icon className="w-12 h-12 mb-4 text-green-600" />
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-500">
                      ${service.basePrice}
                    </span>
                    <span className="text-gray-400">+</span>
                    <div className="text-sm text-gray-400">Base price for 2,000 sq ft</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-lg p-4 mb-6">
                    <div className="font-semibold text-green-700 mb-2">
                      {service.guarantee}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 5).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                    <div className="text-sm text-gray-400 font-semibold pl-7">
                      +{service.features.length - 5} more included
                    </div>
                  </div>

                  <Link
                    href={`/booking?service=${key}`}
                    className="block w-full py-3 text-center rounded-lg font-bold transition-all bg-gradient-to-r from-green-600 to-purple-600 text-white hover:shadow-lg"
                  >
                    Book {service.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-purple-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Transparent
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-600 ml-2">
                Pricing Structure
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Fair pricing based on your home size
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Size-Based Pricing</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {squareFootPricing.map((tier) => (
                <motion.div
                  key={tier.range}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-50 to-purple-50 rounded-lg p-4 text-center"
                >
                  <div className="font-bold text-lg">{tier.range}</div>
                  <div className="text-sm text-gray-400 mb-2">{tier.label}</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${Math.round(services[selectedService as keyof typeof services].basePrice * tier.multiplier)}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-gray-400 mt-6">
              * Final pricing may vary based on condition and special requirements
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Our Proven
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 ml-2">
                5-Step Process
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-500 mb-2">{item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Deposit Success Stories
            </h2>
            <p className="text-xl text-gray-400">
              Join hundreds of satisfied Austin movers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 italic mb-4">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-xs text-green-600 mt-1">{testimonial.service}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deposit Guarantee Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 via-purple-700 to-blue-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <Shield className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-6">
            100% Deposit Return Guarantee
          </h2>
          <p className="text-xl mb-8 opacity-90">
            We're so confident in our move-out cleaning that we guarantee you'll 
            get your full deposit back, or we'll return to re-clean at no charge.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">What's Included:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                'Pre-inspection documentation',
                'Complete deep cleaning checklist',
                'Photo documentation of all areas',
                'Move-out certification letter',
                'Free re-clean if needed',
                '48-hour service guarantee'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/booking?service=moveout&guarantee=deposit"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              Book with Guarantee
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all"
            >
              <Phone className="w-5 h-5" />
              (512) 781-0527
            </a>
          </div>
        </motion.div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Serving All
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 ml-2">
                Austin Areas
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              'Downtown Austin', 'South Congress', 'East Austin', 'West Lake Hills',
              'The Domain', 'Zilker', 'Hyde Park', 'Mueller',
              'Bouldin Creek', 'Travis Heights', 'Clarksville', 'Tarrytown',
              'Round Rock', 'Cedar Park', 'Pflugerville', 'Georgetown'
            ].map((area) => (
              <motion.div
                key={area}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-purple-50 rounded-lg p-3 text-center flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-gray-400">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-green-100 to-blue-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready for a Stress-Free Move?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let us handle the deep cleaning while you focus on your new beginning
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <h3 className="font-bold mb-2">Same-Day Service</h3>
                <p className="text-sm text-gray-400">Emergency cleaning available</p>
              </div>
              <div>
                <Users className="w-12 h-12 mx-auto mb-3 text-green-600" />
                <h3 className="font-bold mb-2">Experienced Team</h3>
                <p className="text-sm text-gray-400">Trained & background checked</p>
              </div>
              <div>
                <Heart className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                <h3 className="font-bold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-sm text-gray-400">100% happiness promise</p>
              </div>
            </div>

            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-12 py-4 bg-gradient-to-r from-green-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105 text-lg"
            >
              <Calendar className="w-6 h-6" />
              Schedule Your Move Cleaning Today
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default MoveInOutCleaningPage;