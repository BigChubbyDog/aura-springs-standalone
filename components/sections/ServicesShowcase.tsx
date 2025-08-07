'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sparkles, Building, Calendar, Shield, Leaf } from 'lucide-react';

const ServicesShowcase = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Downtown High-Rise Cleaning',
      description: 'Specialized service for luxury condos and penthouses in Austin\'s skyline',
      features: ['White-glove service', 'Flexible scheduling', 'Eco-friendly products'],
      price: 'From $175',
      gradient: 'from-[#7c9768] to-[#4c673d]'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Deep Cleaning Service',
      description: 'Comprehensive top-to-bottom cleaning for move-ins, seasons, or special occasions',
      features: ['Inside appliances', 'Baseboards & fixtures', 'Cabinet cleaning'],
      price: 'From $350',
      gradient: 'from-[#443474] to-[#7c9768]'
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Airbnb Turnover',
      description: 'Quick, thorough turnovers for short-term rental properties',
      features: ['Same-day service', 'Linen service', 'Guest-ready staging'],
      price: 'From $150',
      gradient: 'from-[#8d9199] to-[#443474]'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Recurring Maintenance',
      description: 'Regular cleaning to maintain your home\'s pristine condition',
      features: ['Weekly/Bi-weekly', '15% discount', 'Priority scheduling'],
      price: 'From $140',
      gradient: 'from-[#4c673d] to-[#8d9199]'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#4c673d]">Premium</span>{' '}
            <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
              Cleaning Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored solutions for Austin's downtown luxury living. 
            We don't just clean - we create an aura of excellence in your space.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                   style={{ backgroundImage: `linear-gradient(135deg, ${service.gradient})` }} />
              
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100">
                {/* Icon and Title */}
                <div className="flex items-start mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white mr-4`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-[#7c9768] font-semibold text-lg">{service.price}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-[#7c9768] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r ${service.gradient} 
                             shadow-md hover:shadow-lg transition-all duration-300`}
                >
                  Book This Service
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Offers Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#7c9768] to-[#4c673d] rounded-2xl p-8 text-white text-center shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">First-Time Customer Special</h3>
              <p className="text-white/90">Get 20% off your first deep cleaning service</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#4c673d] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Claim Your Discount
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Shield />, text: 'Licensed & Insured' },
            { icon: <Leaf />, text: 'Eco-Friendly' },
            { icon: <Calendar />, text: 'Same Day Service' },
            { icon: <Sparkles />, text: '100% Satisfaction' }
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-md"
            >
              <div className="text-[#7c9768] mb-2">{badge.icon}</div>
              <span className="text-sm font-medium text-gray-700">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;