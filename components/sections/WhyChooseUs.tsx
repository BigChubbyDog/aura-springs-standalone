'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Shield, 
  Clock, 
  Sparkles, 
  Users, 
  Heart,
  CheckCircle,
  Star,
  Zap,
  ChevronRight
} from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Austin\'s #1 Rated',
      description: 'Top-rated luxury cleaning service on Google, Yelp, and Nextdoor',
      color: 'from-[#7c9768] to-[#4c673d]'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Fully Licensed & Insured',
      description: 'Complete peace of mind with $2M liability insurance',
      color: 'from-[#443474] to-[#7c9768]'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24-Hour Guarantee',
      description: 'Same-day service available for downtown high-rises',
      color: 'from-[#4c673d] to-[#8d9199]'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'White Glove Standards',
      description: 'Meticulous attention to detail that exceeds expectations',
      color: 'from-[#8d9199] to-[#443474]'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Trusted Teams',
      description: 'Background-checked, trained professionals you can trust',
      color: 'from-[#7c9768] to-[#443474]'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Eco-Conscious',
      description: 'Green cleaning products safe for pets and families',
      color: 'from-[#4c673d] to-[#7c9768]'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Book Online',
      description: 'Schedule in 60 seconds with our smart booking system'
    },
    {
      number: '02',
      title: 'We Clean',
      description: 'Our expert team arrives on time and transforms your space'
    },
    {
      number: '03',
      title: 'You Relax',
      description: 'Enjoy your pristine home while we handle everything'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Homes Cleaned' },
    { value: '98%', label: 'Customer Retention' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '6+', label: 'Years in Austin' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#4c673d]">Why Austin Chooses</span>{' '}
            <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
              Aura Springs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another cleaning service. We're Austin's trusted partner for 
            creating pristine living spaces that match your lifestyle.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"
                   style={{ backgroundImage: `linear-gradient(135deg, ${reason.color})` }} />
              
              <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${reason.color} text-white mb-4`}>
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#ddddde] to-white rounded-2xl p-8 md:p-12 mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-[#4c673d]">Effortless</span>{' '}
            <span className="text-[#7c9768]">3-Step Process</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#7c9768] to-[#4c673d] flex items-center justify-center text-white">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                </motion.div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="w-8 h-8 text-[#7c9768]" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <motion.h3
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-[#4c673d]">The</span>{' '}
            <span className="text-[#7c9768]">Aura Springs Difference</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Features</th>
                  <th className="text-center py-3 px-4">
                    <div className="inline-flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#7c9768]" />
                      <span className="font-bold text-[#7c9768]">Aura Springs</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-gray-500">Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Licensed & Insured',
                  'Same-Day Service',
                  'Eco-Friendly Products',
                  'Satisfaction Guarantee',
                  'Online Booking',
                  'Transparent Pricing',
                  'Background Checks',
                  'Custom Cleaning Plans'
                ].map((feature, index) => (
                  <motion.tr
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-gray-100"
                  >
                    <td className="py-3 px-4 text-gray-700">{feature}</td>
                    <td className="text-center py-3 px-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                      >
                        <CheckCircle className="w-6 h-6 text-[#7c9768] mx-auto" />
                      </motion.div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-gray-300">✗</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c9768] to-[#4c673d]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#443474]/20 to-transparent" />
          
          <div className="relative p-8 md:p-12 text-center text-white">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Zap className="w-12 h-12" />
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-4">Limited Time Offer</h3>
            <p className="text-xl mb-6 text-white/90">
              Join 500+ Austin residents who trust us with their homes
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#4c673d] font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get 20% Off Your First Clean
            </motion.button>
            
            <p className="mt-4 text-sm text-white/70">
              No contracts • Cancel anytime • 100% satisfaction guaranteed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;