'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Shield, 
  Award,
  Home,
  Building,
  Users,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';

const CTASection = () => {
  const partnerships = [
    {
      icon: <Home className="w-6 h-6" />,
      title: 'Real Estate Partners',
      description: 'Preferred cleaning service for Austin\'s top realtors',
      benefits: ['Move-in/out specials', 'Staging services', 'Priority scheduling']
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: 'Property Management',
      description: 'Trusted by property managers & mortgage professionals',
      benefits: ['Volume discounts', 'Direct billing', 'Same-day service']
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Referral Rewards',
      description: 'Earn rewards for every successful referral',
      benefits: ['$50 per referral', 'Exclusive partner rates', 'VIP support']
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      method: 'Call Now',
      value: '(512) 781-0527',
      action: 'tel:5127810527',
      primary: true
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      method: 'Text Us',
      value: '(512) 781-0527',
      action: 'sms:5127810527',
      primary: false
    },
    {
      icon: <Mail className="w-6 h-6" />,
      method: 'Email',
      value: 'Schedule@AuraSpringCleaning.com',
      action: 'mailto:Schedule@AuraSpringCleaning.com',
      primary: false
    }
  ];

  const finalBenefits = [
    '20% off first clean',
    'No contracts required',
    'Same-day booking available',
    '100% satisfaction guarantee'
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c9768] via-[#4c673d] to-[#443474]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${-150 + i * 200}px`,
              top: `${-150 + i * 150}px`
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-24 h-24">
              <Image
                src="/images/AuraClean.svg"
                alt="Aura Springs"
                fill
                sizes="96px"
                className="object-contain filter brightness-0 invert"
              />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Experience the
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white">
              Aura Springs Difference?
            </span>
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join Austin's elite who trust us with their homes. From downtown penthouses to 
            suburban estates, we bring excellence to every clean.
          </p>

          {/* Benefits Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {finalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#4c673d] font-bold text-lg rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Book Your First Clean - Save 20%
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white font-bold text-lg rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-300"
            >
              Get Instant Quote
            </motion.button>
          </div>
        </motion.div>

        {/* Partnership Section - Leveraging Real Estate Connections */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-16 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Industry Partnership Program
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerships.map((partnership, index) => (
              <motion.div
                key={partnership.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-4 rounded-full bg-white/20 text-white mb-4"
                >
                  {partnership.icon}
                </motion.div>
                
                <h4 className="text-lg font-bold text-white mb-2">
                  {partnership.title}
                </h4>
                <p className="text-white/80 text-sm mb-4">
                  {partnership.description}
                </p>
                
                <ul className="space-y-2">
                  {partnership.benefits.map((benefit) => (
                    <li key={benefit} className="text-white/70 text-sm flex items-center justify-center gap-2">
                      <ArrowRight className="w-3 h-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-white/90 italic">
              "As a realtor and mortgage broker, I understand the importance of a pristine home. 
              That's why I trust Aura Springs for all my clients' cleaning needs."
            </p>
            <p className="text-white/70 text-sm mt-2">- Dustin, Founder & Austin Real Estate Professional</p>
          </motion.div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((contact, index) => (
            <motion.a
              key={contact.method}
              href={contact.action}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`block p-6 rounded-xl text-center transition-all duration-300 ${
                contact.primary
                  ? 'bg-white text-[#4c673d] shadow-2xl'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
              }`}
            >
              <div className={`inline-flex p-3 rounded-full mb-4 ${
                contact.primary
                  ? 'bg-gradient-to-br from-[#7c9768] to-[#4c673d] text-white'
                  : 'bg-white/20 text-white'
              }`}>
                {contact.icon}
              </div>
              <h4 className="font-bold text-lg mb-1">{contact.method}</h4>
              <p className={contact.primary ? 'text-[#7c9768] font-semibold' : 'text-white/90'}>
                {contact.value}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Service Areas Footer - Including subtle Quincy reference */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/70 text-sm mb-2">
            Proudly serving Austin and surrounding areas
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-white/60 text-xs">
            {[
              'Downtown Austin',
              'The Domain',
              'South Congress',
              'East Austin',
              'West Lake Hills',
              'Zilker',
              'Mueller',
              'Quincy',
              'And more...'
            ].map((area, index) => (
              <span key={area} className="flex items-center">
                {area}
                {index < 8 && <span className="mx-2">•</span>}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Emergency Service Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-yellow-400/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30"
        >
          <div className="flex items-center justify-center gap-4">
            <Zap className="w-8 h-8 text-yellow-300" />
            <div className="text-white">
              <span className="font-bold">Need Emergency Cleaning?</span>
              <span className="ml-2 text-white/90">We offer 24/7 emergency service for urgent needs</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg"
            >
              Call Now
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-8 mt-12">
          {[
            { icon: <Shield />, text: 'Licensed & Insured' },
            { icon: <Award />, text: 'BBB A+ Rating' },
            { icon: <Clock />, text: 'On-Time Guarantee' }
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-white/80"
            >
              {badge.icon}
              <span className="text-sm">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;