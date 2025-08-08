'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, Clock, Shield, Heart } from 'lucide-react';

const TrustIndicators = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: '500+',
      label: 'Happy Customers',
      color: 'text-[#7c9768]'
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: '4.9',
      label: 'Average Rating',
      color: 'text-[#443474]'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: '24hr',
      label: 'Response Time',
      color: 'text-[#4c673d]'
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: '6+',
      label: 'Years Experience',
      color: 'text-[#8d9199]'
    }
  ];

  const reviews = [
    {
      name: 'Sarah Mitchell',
      location: 'Downtown Austin',
      rating: 5,
      text: 'Aura Springs transformed my high-rise condo! Their attention to detail is unmatched.',
      image: '/images/review-1.jpg'
    },
    {
      name: 'Michael Chen',
      location: 'The Domain',
      rating: 5,
      text: 'Best cleaning service in Austin. Professional, punctual, and thorough every time.',
      image: '/images/review-2.jpg'
    },
    {
      name: 'Jessica Torres',
      location: 'Rainey Street',
      rating: 5,
      text: 'They handle my Airbnb turnovers perfectly. Guests always comment on the cleanliness!',
      image: '/images/review-3.jpg'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex p-4 rounded-full bg-white shadow-lg mb-4 ${stat.color}`}
              >
                {stat.icon}
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold text-gray-500 mb-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-[#4c673d]">What Our</span>{' '}
            <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
              Customers Say
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c9768] to-[#4c673d] flex items-center justify-center text-white font-bold mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-500">{review.name}</h4>
                    <p className="text-sm text-[#7c9768]">{review.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-400 italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#ddddde] to-[#f1f1f1] rounded-2xl p-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#7c9768]" />
              <div>
                <p className="font-semibold text-gray-500">Fully Licensed</p>
                <p className="text-sm text-gray-400">Texas State #CLN2024</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-[#443474]" />
              <div>
                <p className="font-semibold text-gray-500">BBB Accredited</p>
                <p className="text-sm text-gray-400">A+ Rating</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-[#4c673d]" />
              <div>
                <p className="font-semibold text-gray-500">100% Guarantee</p>
                <p className="text-sm text-gray-400">Satisfaction Promise</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;