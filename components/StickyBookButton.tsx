'use client';

import { Calendar, Phone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StickyBookButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render on all devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <>
      {/* Main sticky button */}
      <div
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-aura-primary-600 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-2 font-bold text-lg animate-pulse hover:animate-none hover:bg-aura-primary-700 transition-all"
            aria-label="Book cleaning service"
          >
            <Calendar className="w-5 h-5" />
            Book Now - (512) 781-0527
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-4 space-y-3 animate-in slide-in-from-bottom-5">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close booking options"
            >
              ×
            </button>
            
            <Link
              href="/booking"
              className="flex items-center justify-center gap-2 bg-aura-primary-600 text-white rounded-xl px-4 py-3 font-semibold hover:bg-aura-primary-700 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Online Booking
            </Link>
            
            <a
              href="tel:512-781-0527"
              className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-xl px-4 py-3 font-semibold hover:bg-green-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            
            <Link
              href="/#pricing"
              onClick={() => setIsExpanded(false)}
              className="block text-center text-aura-primary-600 font-medium hover:text-aura-primary-700 transition-colors"
            >
              Get Quote First
            </Link>
          </div>
        )}
      </div>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}