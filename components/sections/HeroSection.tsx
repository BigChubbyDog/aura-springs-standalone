'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Austin's Premier",
      subtitle: "Luxury High-Rise Cleaning",
      description: "White-glove service for downtown condos, penthouses & Airbnb properties",
      image: "/images/placeholder-austin-skyline.svg",
      gradient: "from-[#2e3d22]/90 via-[#4c673d]/70 to-transparent"
    },
    {
      title: "Time is Luxury",
      subtitle: "We Give You Yours Back",
      description: "Spend time with family & friends while we create an aura that glows in your home",
      image: "/images/placeholder-austin-skyline.svg",
      gradient: "from-[#443474]/90 via-[#8d9199]/70 to-transparent"
    },
    {
      title: "Downtown Living",
      subtitle: "Elevated Cleaning Standards",
      description: "Specialized service for The Domain, SoCo, East Austin & Rainey Street",
      image: "/images/placeholder-austin-skyline.svg",
      gradient: "from-[#637853]/90 via-[#7c9768]/70 to-transparent"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            {/* Image placeholder - add actual images later */}
            <div className="w-full h-full bg-gradient-to-br from-[#7c9768] to-[#4c673d]" />
            <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-[#7c9768]/10 blur-3xl"
            initial={{ 
              x: Math.random() * 1920,
              y: Math.random() * 1080 
            }}
            animate={{
              x: [null, Math.random() * 1920],
              y: [null, Math.random() * 1080],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-32 h-32">
              {/* Logo placeholder */}
              <div className="w-full h-full bg-white/20 rounded-full" />
            </div>
          </motion.div>

          {/* Main Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              <span className="block text-[#a5bd8d] text-3xl md:text-4xl mb-2 font-light">
                {heroSlides[currentSlide].title}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#e1e9d9]">
                {heroSlides[currentSlide].subtitle}
              </span>
            </motion.h1>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#e1e9d9] mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {heroSlides[currentSlide].description}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(124, 151, 104, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-semibold rounded-lg shadow-2xl backdrop-blur-sm border border-[#7c9768]/20 transition-all duration-300"
            >
              Book Your First Clean - 20% Off
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Get Instant Quote
            </motion.button>
          </motion.div>

          {/* Service Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {['Licensed & Insured', 'Same Day Service', '100% Satisfaction', 'Eco-Friendly'].map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <span className="text-sm text-white font-medium">{badge}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-[#7c9768]' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <svg 
          className="w-6 h-6 text-white/70" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;