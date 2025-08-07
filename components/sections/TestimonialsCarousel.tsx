'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building, Home, Briefcase } from 'lucide-react';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Tech Executive',
      location: 'The Austonian, Downtown',
      type: 'high-rise',
      icon: <Building className="w-5 h-5" />,
      image: '/images/testimonial-1.jpg',
      rating: 5,
      text: 'Living on the 45th floor means I need a cleaning service that understands luxury. Aura Springs exceeded every expectation. They handle my penthouse with white-glove care, and their attention to detail is unmatched. The team even knows how to properly clean my floor-to-ceiling windows!',
      highlight: 'White-glove penthouse service',
      serviceType: 'Weekly Deep Clean',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Airbnb Superhost',
      location: 'Rainey Street District',
      type: 'airbnb',
      icon: <Home className="w-5 h-5" />,
      image: '/images/testimonial-2.jpg',
      rating: 5,
      text: 'I manage 12 Airbnb properties downtown, and Aura Springs has been a game-changer. Their same-day turnover service is flawless - guests consistently mention the cleanliness in reviews. They\'ve helped me maintain Superhost status for 3 years running.',
      highlight: '12 properties, perfect turnovers',
      serviceType: 'Airbnb Turnover Service',
      verified: true
    },
    {
      id: 3,
      name: 'Jennifer Park',
      role: 'Law Firm Partner',
      location: 'The Independent, Downtown',
      type: 'high-rise',
      icon: <Briefcase className="w-5 h-5" />,
      image: '/images/testimonial-3.jpg',
      rating: 5,
      text: 'Between 80-hour work weeks, I have zero time for cleaning. Aura Springs has given me my weekends back. They\'re incredibly flexible with my crazy schedule and always leave my condo spotless. Worth every penny!',
      highlight: 'Flexible scheduling for professionals',
      serviceType: 'Bi-weekly Maintenance',
      verified: true
    },
    {
      id: 4,
      name: 'David & Emma Thompson',
      role: 'Domain Residents',
      location: 'Domain NORTHSIDE',
      type: 'residential',
      icon: <Home className="w-5 h-5" />,
      image: '/images/testimonial-4.jpg',
      rating: 5,
      text: 'With two kids and two dogs, our home was always chaos. Aura Springs not only handles the mess but uses pet-safe products that give us peace of mind. They\'re like family now - trustworthy, reliable, and always cheerful.',
      highlight: 'Family & pet-friendly service',
      serviceType: 'Weekly Family Clean',
      verified: true
    },
    {
      id: 5,
      name: 'Robert Kim',
      role: 'Restaurant Owner',
      location: 'East 6th Street',
      type: 'commercial',
      icon: <Briefcase className="w-5 h-5" />,
      image: '/images/testimonial-5.jpg',
      rating: 5,
      text: 'We hired Aura Springs for our restaurant owner\'s residence above our establishment. They understand the unique challenges of living above a business and always work around our schedule. Exceptional service!',
      highlight: 'Commercial-residential expertise',
      serviceType: 'Monthly Deep Clean',
      verified: true
    },
    {
      id: 6,
      name: 'Lisa Martinez',
      role: 'Real Estate Agent',
      location: 'SoCo District',
      type: 'residential',
      icon: <Home className="w-5 h-5" />,
      image: '/images/testimonial-6.jpg',
      rating: 5,
      text: 'I recommend Aura Springs to all my clients. They\'ve cleaned over 50 properties for my showings and move-ins. Their staging clean service has helped me sell homes 20% faster. They\'re an essential part of my business now.',
      highlight: '50+ properties, faster sales',
      serviceType: 'Staging & Move-in Service',
      verified: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'high-rise': return 'from-[#7c9768] to-[#4c673d]';
      case 'airbnb': return 'from-[#443474] to-[#7c9768]';
      case 'commercial': return 'from-[#4c673d] to-[#8d9199]';
      default: return 'from-[#8d9199] to-[#443474]';
    }
  };

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
            <span className="text-[#4c673d]">Austin Loves</span>{' '}
            <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
              Aura Springs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of satisfied customers across Austin's most prestigious addresses
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Testimonial Content */}
                <div className="p-8 lg:p-12">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <Quote className="w-12 h-12 text-[#7c9768] opacity-30" />
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-700 leading-relaxed mb-8 italic"
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.p>

                  {/* Highlight Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="inline-block mb-6"
                  >
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getTypeColor(testimonials[currentIndex].type)} text-white text-sm font-semibold`}>
                      ✨ {testimonials[currentIndex].highlight}
                    </div>
                  </motion.div>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-[#7c9768]">
                        {testimonials[currentIndex].icon}
                        <span>{testimonials[currentIndex].location}</span>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    {testimonials[currentIndex].verified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-center"
                      >
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ Verified Customer
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Rating and Service Type */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      Service: {testimonials[currentIndex].serviceType}
                    </span>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`relative bg-gradient-to-br ${getTypeColor(testimonials[currentIndex].type)} p-12 flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10" />
                  
                  {/* Stats Display */}
                  <div className="relative text-white text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="mb-8"
                    >
                      <div className="text-6xl font-bold mb-2">500+</div>
                      <div className="text-xl">Happy Customers</div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">4.9</div>
                          <div className="text-sm opacity-90">Rating</div>
                        </div>
                        <div className="w-px h-12 bg-white/30" />
                        <div className="text-center">
                          <div className="text-3xl font-bold">98%</div>
                          <div className="text-sm opacity-90">Retention</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Service Type Icon */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mt-8"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {React.cloneElement(testimonials[currentIndex].icon, { className: 'w-10 h-10 text-white' })}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Testimonial Thumbnails */}
        <div className="flex justify-center gap-3 flex-wrap">
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`p-3 rounded-lg transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-2">
                {testimonial.icon}
                <div className="text-left">
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className={`text-xs ${index === currentIndex ? 'text-white/80' : 'text-gray-500'}`}>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Google Reviews Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c9768] to-[#4c673d] border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-800">500+ Reviews</div>
              <div className="text-sm text-gray-600">4.9★ on Google</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;