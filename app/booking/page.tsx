'use client';

import { Suspense } from 'react';
import BookingForm from '@/components/booking/BookingForm';
import MicrosoftBookingsWidget from '@/components/booking/MicrosoftBookingsWidget';

function BookingFormFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="animate-pulse space-y-6">
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  // Use Microsoft Bookings widget for integrated booking experience
  const useMicrosoftBookings = true;

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-[#4c673d]">Book Your</span>{' '}
          <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
            Luxury Cleaning Service
          </span>
        </h1>
        
        <p className="text-center text-gray-400 mb-12">
          Experience Austin's premier cleaning service. Book instantly with Microsoft Bookings.
        </p>

        {useMicrosoftBookings ? (
          <MicrosoftBookingsWidget embedded={true} />
        ) : (
          <Suspense fallback={<BookingFormFallback />}>
            <BookingForm />
          </Suspense>
        )}

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#7c9768] mb-2">Location-Based Pricing</h3>
            <p className="text-gray-400">
              Our smart system adjusts pricing based on your Austin neighborhood for the best value.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#443474] mb-2">Same-Day Service</h3>
            <p className="text-gray-400">
              Available for downtown high-rises and urgent cleaning needs.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#4c673d] mb-2">Eco-Friendly Options</h3>
            <p className="text-gray-400">
              Green cleaning products safe for pets, kids, and the environment.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#8d9199] mb-2">Trusted Teams</h3>
            <p className="text-gray-400">
              Background-checked professionals experienced with Austin's premier properties.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}