'use client';

import { Calendar, Phone, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FloatingCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeUntilClose, setTimeUntilClose] = useState('');

  useEffect(() => {
    // Show after user has been on page for 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate time until business closes (6 PM)
    const updateTime = () => {
      const now = new Date();
      const closeTime = new Date();
      closeTime.setHours(18, 0, 0, 0); // 6 PM
      
      if (now.getHours() >= 18) {
        // After 6 PM, show next day opening
        setTimeUntilClose('Opens tomorrow at 8 AM');
      } else if (now.getHours() < 8) {
        // Before 8 AM
        setTimeUntilClose('Opens at 8 AM');
      } else {
        // During business hours
        const hoursLeft = closeTime.getHours() - now.getHours();
        const minutesLeft = closeTime.getMinutes() - now.getMinutes();
        
        if (hoursLeft > 0) {
          setTimeUntilClose(`Open for ${hoursLeft}h ${minutesLeft}m`);
        } else {
          setTimeUntilClose('Closing soon');
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform transition-transform duration-500 translate-y-0">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left side - Urgency message */}
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-semibold">{timeUntilClose}</span>
            <span className="hidden sm:inline">• Same-day service available!</span>
          </div>

          {/* Right side - CTA buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="bg-white text-green-700 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book Online</span>
              <span className="sm:hidden">Book</span>
            </Link>
            
            <a
              href="tel:5127810527"
              className="bg-green-800 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-green-900 transition-all flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">(512) 781-0527</span>
              <span className="sm:hidden">Call</span>
            </a>
            
            <a
              href="sms:5127810527?body=Hi%20Valerie%2C%20I%27d%20like%20to%20book%20a%20cleaning%20service"
              className="bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition-all"
              aria-label="Text us"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white/70 hover:text-white text-xl leading-none"
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  );
}