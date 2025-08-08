'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Star,
  Shield,
  Award,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Regular Cleaning', href: '/services/regular-cleaning' },
    { name: 'Deep Cleaning', href: '/services/deep-cleaning' },
    { name: 'Move In/Out', href: '/services/move-in-out-cleaning' },
    { name: 'Airbnb Cleaning', href: '/services/airbnb-cleaning' },
    { name: 'Office Cleaning', href: '/services/commercial-cleaning' },
    { name: 'Post-Construction', href: '/services/post-construction' },
  ];

  const areas = [
    { name: 'Downtown Austin', href: '/areas/downtown-austin' },
    { name: 'The Domain', href: '/areas/the-domain' },
    { name: 'South Congress', href: '/areas/south-congress' },
    { name: 'East Austin', href: '/areas/east-austin' },
    { name: 'West Lake Hills', href: '/areas/west-lake-hills' },
    { name: 'Cedar Park', href: '/areas/cedar-park' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/auraspringsatx', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/auraspringsatx', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/auraspringsatx', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/aura-springs-cleaning', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-8">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <Shield className="w-8 h-8 text-[#7c9768] mb-2" />
            <h4 className="font-semibold text-gray-500">Licensed & Insured</h4>
            <p className="text-sm text-gray-400">Full protection guaranteed</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Star className="w-8 h-8 text-[#7c9768] mb-2" />
            <h4 className="font-semibold text-gray-500">4.9 Star Rating</h4>
            <p className="text-sm text-gray-400">500+ happy customers</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Award className="w-8 h-8 text-[#7c9768] mb-2" />
            <h4 className="font-semibold text-gray-500">Award Winning</h4>
            <p className="text-sm text-gray-400">Best of Austin 2024</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Heart className="w-8 h-8 text-[#7c9768] mb-2" />
            <h4 className="font-semibold text-gray-500">Eco-Friendly</h4>
            <p className="text-sm text-gray-400">Green cleaning products</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-200">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                {/* Logo placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-[#7c9768] to-[#4c673d] rounded-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#7c9768]">Aura Spring</h3>
                <p className="text-xs text-gray-400">Cleaning Excellence</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Austin&apos;s premier luxury cleaning service, specializing in high-rise condos, 
              penthouses, and Airbnb properties.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <a href="tel:5127810527" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#7c9768] transition-colors">
                <Phone className="w-4 h-4" />
                (512) 781-0527
              </a>
              <a href="mailto:Schedule@AuraSpringCleaning.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#7c9768] transition-colors">
                <Mail className="w-4 h-4" />
                Schedule@AuraSpringCleaning.com
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Serving Austin, TX<br />& Surrounding Areas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Mon-Fri: 8AM-6PM
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-500 font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-[#7c9768] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-gray-500 font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {areas.map((area) => (
                <li key={area.name}>
                  <Link 
                    href={area.href}
                    className="text-sm text-gray-400 hover:text-[#7c9768] transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-500 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-[#7c9768] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-500 font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get cleaning tips and exclusive offers delivered to your inbox.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#7c9768] hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Aura Spring Cleaning. All rights reserved. 
              <span className="hidden md:inline"> | Part of BigChubbyDog Holdings</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {legal.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-[#7c9768] transition-colors"
                  >
                    {item.name}
                  </Link>
                  {index < legal.length - 1 && <span className="text-gray-400">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-2">Secure Payment Options</p>
            <div className="flex justify-center gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-400">Visa</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-400">Mastercard</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-400">Amex</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-400">Discover</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-400">PayPal</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-400">Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;