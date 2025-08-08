'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar, MapPin, Star, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'House Cleaning', href: '/services/house-cleaning' },
        { name: 'Deep Cleaning', href: '/services/deep-cleaning' },
        { name: 'Move In/Out', href: '/services/move-in-out-cleaning' },
        { name: 'Airbnb Cleaning', href: '/services/airbnb-cleaning' },
        { name: 'Commercial', href: '/services/commercial-cleaning' },
      ]
    },
    {
      name: 'Areas',
      href: '/areas',
      dropdown: [
        { name: 'Downtown Austin', href: '/areas/downtown-austin' },
        { name: 'The Domain', href: '/areas/the-domain' },
        { name: 'South Congress', href: '/areas/south-congress' },
        { name: 'East Austin', href: '/areas/east-austin' },
        { name: 'West Lake Hills', href: '/areas/west-lake-hills' },
      ]
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-aura-primary-500 to-aura-primary-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:5125552872" className="flex items-center gap-1 hover:text-aura-primary-100 transition-colors">
              <Phone className="w-3 h-3" />
              (512) 555-2872
            </a>
            <div className="hidden md:flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Serving Austin & Surrounding Areas
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.9 Rating</span>
            </div>
            <span className="hidden md:inline">Same Day Service Available</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/AuraClean.svg"
                  alt="Aura Spring Cleaning Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-aura-primary-500">Aura Spring Cleaning</h1>
                <p className="text-xs text-aura-secondary-500">Premium Cleaning Service</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-400 hover:text-aura-primary-500 font-medium transition-colors"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-gray-400 hover:bg-aura-primary-500/10 hover:text-aura-primary-500 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/booking"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-aura-primary-500 to-aura-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block py-2 text-gray-400 font-medium hover:text-aura-primary-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block py-1 text-sm text-gray-400 hover:text-aura-primary-500 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/booking"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-aura-primary-500 to-aura-primary-700 text-white font-semibold rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;