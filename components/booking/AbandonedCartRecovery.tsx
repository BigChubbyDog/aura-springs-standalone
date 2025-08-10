'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingData {
  service?: string;
  bedrooms?: number;
  bathrooms?: number;
  frequency?: string;
  date?: string;
  time?: string;
  address?: string;
  email?: string;
  phone?: string;
  name?: string;
  timestamp?: number;
  step?: number;
}

export default function AbandonedCartRecovery() {
  const [abandonedBooking, setAbandonedBooking] = useState<BookingData | null>(null);
  const router = useRouter();

  // Save booking progress
  const saveBookingProgress = (data: BookingData) => {
    const bookingData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem('booking_progress', JSON.stringify(bookingData));
    
    // If email is provided, trigger server-side save for email recovery
    if (data.email) {
      fetch('/api/abandoned-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      }).catch(console.error);
    }
  };

  // Check for abandoned bookings
  useEffect(() => {
    const checkAbandonedBooking = () => {
      const saved = localStorage.getItem('booking_progress');
      if (saved) {
        const data = JSON.parse(saved) as BookingData;
        const hoursSinceAbandoned = (Date.now() - (data.timestamp || 0)) / (1000 * 60 * 60);
        
        // If booking was abandoned more than 1 hour ago but less than 7 days
        if (hoursSinceAbandoned > 1 && hoursSinceAbandoned < 168) {
          setAbandonedBooking(data);
        }
        
        // Clear very old data (>7 days)
        if (hoursSinceAbandoned > 168) {
          localStorage.removeItem('booking_progress');
        }
      }
    };

    checkAbandonedBooking();
    
    // Check every minute for abandoned bookings
    const interval = setInterval(checkAbandonedBooking, 60000);
    return () => clearInterval(interval);
  }, []);

  // Resume booking
  const resumeBooking = () => {
    if (abandonedBooking) {
      // Navigate to booking page with saved data
      router.push(`/booking?resume=true`);
    }
  };

  // Clear abandoned booking
  const clearAbandonedBooking = () => {
    localStorage.removeItem('booking_progress');
    setAbandonedBooking(null);
  };

  // Show recovery prompt if there's an abandoned booking
  if (abandonedBooking && abandonedBooking.step && abandonedBooking.step > 1) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white rounded-lg shadow-2xl p-6 border-2 border-sage-500">
        <button
          onClick={clearAbandonedBooking}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ×
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Complete Your Booking!
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          You were almost done booking your cleaning service. Ready to finish?
        </p>
        
        <div className="text-xs text-gray-500 mb-4">
          <p>📍 Service: {abandonedBooking.service || 'Regular Cleaning'}</p>
          {abandonedBooking.date && <p>📅 Date: {abandonedBooking.date}</p>}
          {abandonedBooking.bedrooms && <p>🏠 Size: {abandonedBooking.bedrooms} bed, {abandonedBooking.bathrooms || 1} bath</p>}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={resumeBooking}
            className="flex-1 bg-sage-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sage-700 transition-colors"
          >
            Resume Booking
          </button>
          <button
            onClick={clearAbandonedBooking}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Not Now
          </button>
        </div>
        
        <p className="text-xs text-sage-600 mt-3 text-center">
          🎁 Complete now and save 15% with code: COMEBACK15
        </p>
      </div>
    );
  }

  return null;
}

// Hook to use in booking forms
export function useAbandonedCartRecovery() {
  const saveProgress = (data: BookingData) => {
    const bookingData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem('booking_progress', JSON.stringify(bookingData));
    
    // If email is provided, trigger server-side save
    if (data.email) {
      fetch('/api/abandoned-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      }).catch(console.error);
    }
  };

  const loadProgress = (): BookingData | null => {
    const saved = localStorage.getItem('booking_progress');
    if (saved) {
      return JSON.parse(saved) as BookingData;
    }
    return null;
  };

  const clearProgress = () => {
    localStorage.removeItem('booking_progress');
  };

  return { saveProgress, loadProgress, clearProgress };
}