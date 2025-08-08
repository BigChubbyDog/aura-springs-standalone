'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, Star, Clock, Shield, Calendar, CheckCircle, TrendingUp,
  DollarSign, Users, Award, Sparkles, Phone, ArrowRight, 
  Zap, Gift, Heart, Building2, MapPin, BarChart3
} from 'lucide-react';

const AirbnbCleaningPage = () => {
  const [selectedPackage, setSelectedPackage] = useState('premium');

  // New pricing structure with setup fees and per-service pricing
  const packages = {
    basic: {
      name: 'Basic Turnover',
      setupFee: 99,
      servicePrice: 89,
      features: [
        'Complete property cleaning',
        'Linen change & bed making',
        'Bathroom sanitization',
        'Kitchen cleaning & appliances',
        'Trash removal & fresh bags',
        'Basic supply check',
        'Interior window cleaning'
      ],
      turnaround: '4-5 hours',
      icon: Home
    },
    standard: {
      name: 'Standard Turnover',
      setupFee: 149,
      servicePrice: 119,
      features: [
        'Everything in Basic',
        'Amenity restocking',
        'Damage inspection report',
        'Guest supply management',
        'Photo-ready staging',
        'Quality assurance checklist'
      ],
      turnaround: '3-4 hours',
      icon: CheckCircle
    },
    premium: {
      name: 'Premium Hosting',
      setupFee: 199,
      servicePrice: 149,
      popular: true,
      features: [
        'Everything in Standard',
        'Priority scheduling',
        'Same-day availability',
        'Professional staging',
        'Detailed reporting',
        'Guest welcome setup',
        'Maintenance coordination'
      ],
      turnaround: '2-3 hours',
      icon: Star
    },
    superhost: {
      name: 'Superhost Elite',
      setupFee: 299,
      servicePrice: 199,
      features: [
        'Everything in Premium',
        'Luxury amenity service',
        'Concierge coordination',
        'Professional photography',
        '24/7 emergency service',
        'Monthly deep cleaning',
        'Dedicated account manager',
        'Revenue optimization consulting'
      ],
      turnaround: '2 hours guaranteed',
      icon: Award
    }
  };

  const stats = [
    { value: '500+', label: 'Properties Managed', icon: Building2 },
    { value: '4.9★', label: 'Host Rating', icon: Star },
    { value: '2hr', label: 'Avg Turnaround', icon: Clock },
    { value: '99%', label: 'On-Time Rate', icon: CheckCircle }
  ];

  const benefits = [
    {
      title: 'Maximize Occupancy',
      description: 'Quick turnarounds mean more bookings and higher revenue',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Superhost Status',
      description: 'Our quality helps you maintain 5-star reviews',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      title: 'Time Freedom',
      description: 'Focus on growing your portfolio, not cleaning',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Guest Satisfaction',
      description: 'Professional cleaning leads to happier guests',
      icon: Heart,
      color: 'text-pink-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Superhost - 8 Properties',
      content: 'Aura Spring transformed my Airbnb business. I went from managing 2 properties to 8 in just 6 months!',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'David Chen',
      role: 'Downtown Austin Host',
      content: 'The team is incredible. They handle everything from cleaning to restocking. My ratings have never been better.',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Luxury Property Manager',
      content: 'Professional, reliable, and the attention to detail is unmatched. Worth every penny!',
      rating: 5,
      image: '👩‍🏫'
    }
  ];

  return (
    <>
      <title>Airbnb Cleaning Services Austin | Professional Turnover | Aura Spring</title>
      <meta name="description" content="Professional Airbnb cleaning services in Austin. 2-hour turnarounds, 5-star quality, amenity management. Trusted by 500+ hosts. Superhost status guaranteed." />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-purple-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
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
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Trusted by 500+ Austin Hosts</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Airbnb Cleaning
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 mt-2">
              That Drives 5-Star Reviews
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Professional turnovers in 2 hours or less. From downtown condos to 
            luxury estates, we help Austin hosts maximize occupancy and maintain 
            Superhost status.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Start Professional Service
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              (512) 781-0527
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Hosts Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Austin's Top Hosts
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 ml-2">
                Choose Aura Spring
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We understand the unique demands of short-term rentals and deliver 
              the consistency your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <benefit.icon className={`w-12 h-12 mb-4 ${benefit.color}`} />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Service Packages
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-600 ml-2">
                Tailored for Success
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Choose the perfect level of service for your property
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {Object.entries(packages).map(([key, pkg]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedPackage(key)}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all ${
                  selectedPackage === key ? 'ring-4 ring-green-500 shadow-2xl' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-purple-500 text-white px-4 py-1 rounded-bl-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <pkg.icon className="w-12 h-12 mb-4 text-green-600" />
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">One-time setup fee:</div>
                    <div className="text-2xl font-bold text-red-600 mb-3">${pkg.setupFee}</div>
                    
                    <div className="text-sm text-gray-600 mb-1">Per turnover:</div>
                    <div className="text-4xl font-bold text-green-600">${pkg.servicePrice}</div>
                    <span className="text-gray-500">/service</span>
                  </div>

                  <div className="text-sm text-purple-600 font-semibold mb-4">
                    Turnaround: {pkg.turnaround}
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/booking?service=airbnb&package=${key}`}
                    className="block w-full py-3 text-center rounded-lg font-bold transition-all bg-gradient-to-r from-green-600 to-purple-600 text-white hover:shadow-lg"
                  >
                    Choose {pkg.name}
                  </Link>
                </div>
              </motion.div>
            ))}
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
                Turnover Process
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Systematic excellence, every single time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Guest Checkout', desc: 'Notification received, team dispatched', icon: Users },
              { step: '02', title: 'Deep Clean', desc: 'Complete sanitization & cleaning', icon: Sparkles },
              { step: '03', title: 'Stage & Stock', desc: 'Photo-ready staging, amenity check', icon: Gift },
              { step: '04', title: 'Quality Check', desc: 'Final inspection & host update', icon: CheckCircle }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-green-400 to-purple-400" />
                )}
                <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 mb-2">
                    {item.step}
                  </div>
                  <item.icon className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
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
              Host Success Stories
            </h2>
            <p className="text-xl text-gray-400">
              Join hundreds of successful Austin Airbnb hosts
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
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20 bg-gradient-to-br from-green-100 via-purple-100 to-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Serving Austin's
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 ml-2">
                Prime Locations
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              'Downtown Austin', 'South Congress', 'East Austin',
              'The Domain', 'Zilker', 'Hyde Park',
              'Mueller', 'Rainey Street', 'West Lake Hills'
            ].map((area) => (
              <motion.div
                key={area}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all flex items-center gap-3"
              >
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-semibold">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Unit Custom Quotes */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Property Managers
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">
                & Multi-Unit Owners
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Managing multiple Airbnb properties? We offer custom pricing packages 
              with volume discounts and dedicated account management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Multi-Unit Benefits</h3>
              <div className="space-y-4">
                {[
                  { icon: BarChart3, title: 'Volume Discounts', desc: 'Save more with multiple properties' },
                  { icon: Users, title: 'Dedicated Account Manager', desc: 'Single point of contact for all properties' },
                  { icon: Calendar, title: 'Coordinated Scheduling', desc: 'Optimize routes and timing across portfolio' },
                  { icon: Shield, title: 'Master Service Agreement', desc: 'Simplified contracts and billing' }
                ].map((benefit, index) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <benefit.icon className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Request Custom Quote</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Properties
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>2-5 properties</option>
                    <option>6-10 properties</option>
                    <option>11-20 properties</option>
                    <option>20+ properties</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Turnovers (Estimate)
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>20-50 turnovers</option>
                    <option>51-100 turnovers</option>
                    <option>101-200 turnovers</option>
                    <option>200+ turnovers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Information
                  </label>
                  <input 
                    type="text" 
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-2"
                  />
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-2"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Get Custom Quote
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 via-purple-700 to-blue-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Maximize Your Airbnb Revenue?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ Austin hosts who trust Aura Spring for professional turnovers
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Special Offer for New Hosts</h3>
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              50% OFF Setup Fee
            </div>
            <p className="mb-6 opacity-90">
              Plus free amenity starter pack ($100 value)
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking?service=airbnb&offer=setupdiscount"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Claim Your Offer
              </Link>
              <a
                href="tel:5127810527"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-green-400" />
              <span className="font-semibold">Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-yellow-400" />
              <span className="font-semibold">Background Checked</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-pink-400" />
              <span className="font-semibold">Satisfaction Guaranteed</span>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AirbnbCleaningPage;