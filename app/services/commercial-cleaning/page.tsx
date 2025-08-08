'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, CheckCircle, Clock, Shield, Calendar, Sparkles, 
  DollarSign, Award, Phone, ArrowRight, Briefcase, Users,
  BarChart3, Heart, MapPin, Star, Zap, TrendingUp, FileCheck
} from 'lucide-react';

const CommercialCleaningPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  // Commercial service plans
  const servicePlans = {
    starter: {
      name: 'Starter Business',
      monthlyPrice: 800,
      sqftIncluded: 2000,
      frequency: 'Weekly',
      icon: Briefcase,
      features: [
        'Weekly office cleaning',
        'Trash removal & recycling',
        'Restroom sanitization',
        'Kitchen/break room cleaning',
        'Vacuum & mop floors',
        'Dust workstations',
        'Basic supply restocking',
        'Monthly deep clean'
      ],
      idealFor: 'Small offices, startups, professional services'
    },
    professional: {
      name: 'Professional Plus',
      monthlyPrice: 1500,
      sqftIncluded: 5000,
      frequency: '2-3x Weekly',
      icon: Building2,
      popular: true,
      features: [
        'Everything in Starter',
        'Multi-weekly service',
        'Conference room detailing',
        'Window cleaning (monthly)',
        'Carpet spot treatment',
        'Disinfection protocols',
        'Supply management',
        'Priority response time',
        'Quarterly deep clean'
      ],
      idealFor: 'Medium offices, medical practices, retail spaces'
    },
    enterprise: {
      name: 'Enterprise Elite',
      monthlyPrice: 3000,
      sqftIncluded: 10000,
      frequency: 'Daily',
      icon: TrendingUp,
      features: [
        'Everything in Professional',
        'Daily cleaning service',
        'Dedicated account manager',
        'Custom cleaning schedule',
        'Floor care program',
        'Exterior maintenance',
        'Event cleanup services',
        'Emergency response 24/7',
        'Monthly facility audit',
        'Green cleaning certification'
      ],
      idealFor: 'Large offices, corporate headquarters, multi-tenant'
    }
  };

  const industries = [
    { name: 'Medical & Dental', icon: '🏥', special: 'OSHA compliant protocols' },
    { name: 'Legal Offices', icon: '⚖️', special: 'Confidential document handling' },
    { name: 'Tech Companies', icon: '💻', special: 'Electronics-safe cleaning' },
    { name: 'Retail Stores', icon: '🛍️', special: 'Customer area focus' },
    { name: 'Restaurants', icon: '🍽️', special: 'Health code compliance' },
    { name: 'Fitness Centers', icon: '💪', special: 'Equipment sanitization' },
    { name: 'Schools', icon: '🎓', special: 'Child-safe products' },
    { name: 'Banks', icon: '🏦', special: 'Security protocols' }
  ];

  const benefits = [
    {
      title: 'Increase Productivity',
      description: 'Clean workspace = 15% more productive employees',
      icon: BarChart3,
      stat: '+15%'
    },
    {
      title: 'Reduce Sick Days',
      description: 'Professional cleaning reduces illness by 30%',
      icon: Heart,
      stat: '-30%'
    },
    {
      title: 'Impress Clients',
      description: 'First impressions drive 70% of business decisions',
      icon: Star,
      stat: '70%'
    },
    {
      title: 'Save Money',
      description: 'Outsourcing saves 25% vs in-house cleaning',
      icon: DollarSign,
      stat: '25%'
    }
  ];

  const testimonials = [
    {
      company: 'Austin Tech Solutions',
      contact: 'Michael Chen, CEO',
      content: 'Aura Spring transformed our office environment. Employee satisfaction is up 40%!',
      employees: '50 employees',
      rating: 5
    },
    {
      company: 'Downtown Medical Group',
      contact: 'Dr. Sarah Williams',
      content: 'Impeccable service, especially important for our medical practice. Highly recommend.',
      employees: '3 locations',
      rating: 5
    },
    {
      company: 'The Law Offices of Johnson & Associates',
      contact: 'Robert Johnson, Partner',
      content: 'Professional, discrete, and thorough. Perfect for our law firm\'s needs.',
      employees: '25 employees',
      rating: 5
    }
  ];

  return (
    <>
      <title>Commercial Cleaning Services Austin | Office Cleaning | Aura Spring</title>
      <meta name="description" content="Professional commercial cleaning services in Austin. Office cleaning from $800/month. Daily, weekly, and custom schedules. Serving businesses since 2018." />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-green-800 to-purple-700 overflow-hidden">
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
            <span className="font-semibold">Austin's #1 Commercial Cleaning Partner</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Commercial Cleaning
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mt-2">
              That Means Business
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Professional office cleaning services that create healthier, more productive 
            workspaces. Trusted by 200+ Austin businesses to maintain pristine environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/booking?service=commercial"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Get Free Quote
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              (512) 781-0527
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm">Business Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">500K</div>
              <div className="text-sm">Sq Ft Cleaned Daily</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Service Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm">Insured & Bonded</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Austin Businesses
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 ml-2">
                Choose Aura Spring
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Measurable benefits that impact your bottom line
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
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all hover:scale-105"
              >
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <div className="text-3xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Plans */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Flexible Plans
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 ml-2">
                for Every Business
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              From startups to enterprises, we have you covered
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(servicePlans).map(([key, plan]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedPlan(key)}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all ${
                  selectedPlan === key ? 'ring-4 ring-green-500 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-blue-500 text-white px-4 py-1 rounded-bl-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <plan.icon className="w-12 h-12 mb-4 text-blue-600" />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-500">
                      ${plan.monthlyPrice}
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-400">Up to {plan.sqftIncluded.toLocaleString()} sq ft</div>
                    <div className="font-semibold text-green-700">{plan.frequency} Service</div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.slice(0, 6).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 6 && (
                      <div className="text-sm text-gray-400 font-semibold pl-7">
                        +{plan.features.length - 6} more features
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-gray-400 italic mb-6">
                    Ideal for: {plan.idealFor}
                  </div>

                  <Link
                    href={`/booking?service=commercial&plan=${key}`}
                    className="block w-full py-3 text-center rounded-lg font-bold transition-all bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              Need a custom solution? 
              <Link href="/contact" className="text-green-600 font-semibold ml-1 hover:underline">
                Contact us for enterprise pricing
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Industry
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 ml-2">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Specialized cleaning protocols for every industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-bold mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-400">{industry.special}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Our Commercial
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 ml-2">
                Service Process
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Free Assessment', desc: 'On-site evaluation & custom quote', icon: FileCheck },
              { step: '02', title: 'Tailored Plan', desc: 'Schedule & services to fit your needs', icon: Calendar },
              { step: '03', title: 'Professional Service', desc: 'Trained, insured cleaning teams', icon: Users },
              { step: '04', title: 'Quality Assurance', desc: 'Regular inspections & feedback', icon: Award }
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
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-400" />
                )}
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">
                    {item.step}
                  </div>
                  <item.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Austin's
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 ml-2">
                Leading Businesses
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.company}
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
                  <div className="font-bold">{testimonial.company}</div>
                  <div className="text-sm text-gray-400">{testimonial.contact}</div>
                  <div className="text-xs text-green-600 mt-1">{testimonial.employees}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Green Cleaning Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 via-blue-700 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Heart className="w-5 h-5 text-green-400" />
            <span className="font-semibold">Green Cleaning Certified</span>
          </div>

          <h2 className="text-4xl font-bold mb-6">
            Eco-Friendly Commercial Cleaning
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Protect your employees and the environment with our green cleaning protocols
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Zap className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
              <h3 className="font-bold mb-2">EPA Approved</h3>
              <p className="text-sm opacity-90">All products meet EPA Safer Choice standards</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Shield className="w-10 h-10 mx-auto mb-3 text-green-400" />
              <h3 className="font-bold mb-2">LEED Compliant</h3>
              <p className="text-sm opacity-90">Support your building's LEED certification</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Heart className="w-10 h-10 mx-auto mb-3 text-pink-400" />
              <h3 className="font-bold mb-2">Healthier Workplace</h3>
              <p className="text-sm opacity-90">Reduce allergens and improve air quality</p>
            </div>
          </div>

          <Link
            href="/booking?service=commercial&type=green"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            <Heart className="w-5 h-5" />
            Go Green with Your Cleaning
          </Link>
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
              Serving Austin's
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 ml-2">
                Business Districts
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              'Downtown Austin', 'The Domain', 'South Congress', 'East Austin',
              'Northwest Hills', 'Arboretum', 'Tech Ridge', 'Mueller',
              'Round Rock', 'Cedar Park', 'Pflugerville', 'Georgetown',
              'Lakeway', 'Bee Cave', 'Westlake', 'Dripping Springs'
            ].map((area) => (
              <motion.div
                key={area}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-3 text-center flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-400">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-green-100 to-purple-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Elevate Your Workspace?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join 200+ Austin businesses that trust Aura Spring for pristine offices
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              Limited Time Offer
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              First Month 50% OFF
            </div>
            <p className="text-gray-400 mb-6">
              Plus free deep clean service ($500 value)
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking?service=commercial&offer=first50"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Claim Your Offer
              </Link>
              <a
                href="tel:5127810527"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-400 font-bold rounded-lg hover:bg-gray-200 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call for Free Quote
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="text-sm font-semibold">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-semibold">Licensed & Bonded</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-semibold">Background Checked</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default CommercialCleaningPage;