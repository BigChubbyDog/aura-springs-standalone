'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Austin service zone definitions
const SERVICE_ZONES = {
  downtown: {
    name: 'Downtown Core',
    priceMultiplier: 1.25,
    bounds: { lat: [30.25, 30.275], lng: [-97.75, -97.73] },
    features: ['High-rise expertise', 'Same-day availability', 'Luxury finishes'],
    timezone: 'America/Chicago',
    availability: {
      sameDayBooking: true,
      timeSlots: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'],
      blackoutDates: [], // No blackout dates for premium zone
      rushHourPremium: true
    }
  },
  westlake: {
    name: 'Westlake',
    priceMultiplier: 1.20,
    bounds: { lat: [30.27, 30.31], lng: [-97.82, -97.77] },
    features: ['Estate properties', 'Eco-friendly options', 'Dedicated teams'],
    timezone: 'America/Chicago',
    availability: {
      sameDayBooking: true,
      timeSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
      blackoutDates: [], // Premium area gets priority
      rushHourPremium: false
    }
  },
  zilker: {
    name: 'Zilker/South Austin',
    priceMultiplier: 1.15,
    bounds: { lat: [30.25, 30.27], lng: [-97.77, -97.75] },
    features: ['Luxury apartments', 'Airbnb turnover', 'Flexible scheduling'],
    timezone: 'America/Chicago',
    availability: {
      sameDayBooking: false,
      timeSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'],
      blackoutDates: [],
      rushHourPremium: false
    }
  },
  eastside: {
    name: 'East Austin',
    priceMultiplier: 1.10,
    bounds: { lat: [30.25, 30.28], lng: [-97.73, -97.70] },
    features: ['Modern condos', 'Pet-friendly cleaning', 'Weekend availability'],
    timezone: 'America/Chicago',
    availability: {
      sameDayBooking: false,
      timeSlots: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
      blackoutDates: [],
      rushHourPremium: false
    }
  },
  standard: {
    name: 'Greater Austin',
    priceMultiplier: 1.00,
    bounds: { lat: [30.0, 30.5], lng: [-98.0, -97.5] }, // Broader Austin metro area
    features: ['Standard service area', 'Quality cleaning', 'Scheduled booking'],
    timezone: 'America/Chicago',
    availability: {
      sameDayBooking: false,
      timeSlots: ['9:00 AM', '12:00 PM', '3:00 PM'],
      blackoutDates: ['2025-12-25', '2025-01-01'], // Standard holidays
      rushHourPremium: false
    }
  }
};

// Base service prices
const BASE_PRICES = {
  standard: 150,
  deep: 225,
  moveIn: 275,
  moveOut: 275,
  construction: 350,
};

export default function GeoBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serviceZone, setServiceZone] = useState(SERVICE_ZONES.standard);
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'standard',
    date: '',
    time: '',
    notes: '',
  });
  const [minimumDate, setMinimumDate] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [pricing, setPricing] = useState({
    basePrice: BASE_PRICES.standard,
    zoneMultiplier: 1.0,
    totalPrice: BASE_PRICES.standard,
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize URL parameters and geolocation on component mount
  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Calculate minimum date on client side only
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setMinimumDate(tomorrow.toISOString().split('T')[0]);

    // Handle URL parameters for service pre-selection
    const serviceParam = searchParams.get('service');
    const serviceNameParam = searchParams.get('name');

    if (serviceParam) {
      // Map service types from URL to form values
      const serviceTypeMap: { [key: string]: string } = {
        'residential': 'standard',
        'deep-clean': 'deep',
        'move-out': 'moveOut',
        'commercial': 'construction',
        'airbnb-essential': 'standard',
        'airbnb-premium': 'deep',
        'airbnb-ultra': 'construction'
      };

      const mappedServiceType = serviceTypeMap[serviceParam] || 'standard';
      setFormData(prev => ({
        ...prev,
        serviceType: mappedServiceType,
        notes: serviceNameParam ? `Interested in: ${serviceNameParam}` : ''
      }));
    }

    initializeGeolocation();
  }, [searchParams]);

  // Update pricing when serviceType or zone changes
  useEffect(() => {
    updatePricing();
  }, [formData.serviceType, serviceZone]);

  // Update minimum date when service zone changes (client-side only)
  useEffect(() => {
    if (isClient) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Premium zones (downtown, westlake) can book same day if before 2 PM
      if (serviceZone.availability.sameDayBooking) {
        const currentHour = today.getHours();
        if (currentHour < 14) { // Before 2 PM
          setMinimumDate(today.toISOString().split('T')[0]);
          return;
        }
      }

      setMinimumDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [serviceZone, isClient]);

  // Initialize geolocation detection
  const initializeGeolocation = async () => {
    if (navigator.geolocation) {
      try {
        setLocationStatus('loading');
        const position = await getCurrentPosition();
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        // Determine service zone based on coordinates
        const zone = await determineServiceZone(position.coords.latitude, position.coords.longitude);
        setServiceZone(zone);
        setLocationStatus('success');
      } catch (error) {
        console.error('Error getting location:', error);
        setLocationStatus('error');
      }
    } else {
      setLocationStatus('error');
      console.log('Geolocation is not supported by this browser');
    }
  };

  // Get current position as a promise
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  };
  // Get minimum available date based on service zone (client-side only)
  const getMinimumDate = () => {
    if (!isClient) return '';

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Premium zones (downtown, westlake) can book same day if before 2 PM
    if (serviceZone.availability.sameDayBooking) {
      const currentHour = today.getHours();
      if (currentHour < 14) { // Before 2 PM
        return today.toISOString().split('T')[0];
      }
    }

    return tomorrow.toISOString().split('T')[0];
  };

  // Check if a date is available (not blacklisted)
  const isDateAvailable = (dateString: string) => {
    return !serviceZone.availability.blackoutDates.includes(dateString);
  };
  // Get available time slots for the selected date (client-side only)
  const getAvailableTimeSlots = () => {
    if (!isClient || !formData.date) return serviceZone.availability.timeSlots;

    const selectedDate = new Date(formData.date);
    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();

    if (isToday) {
      const currentHour = today.getHours();
      // Filter out past time slots for today
      return serviceZone.availability.timeSlots.filter(timeSlot => {
        const [time, period] = timeSlot.split(' ');
        const [hours] = time.split(':').map(Number);
        const hour24 = period === 'PM' && hours !== 12 ? hours + 12 : hours;
        return hour24 > currentHour + 2; // Need 2 hours notice
      });
    }

    return serviceZone.availability.timeSlots;
  };

  // Determine service zone based on coordinates
  const determineServiceZone = async (lat: number, lng: number) => {
    // Optional: Make an Azure Maps API call here for more precise location data
    // For now, we'll use the defined service zones

    for (const [key, zone] of Object.entries(SERVICE_ZONES)) {
      if (key === 'standard') continue;

      if (
        lat >= zone.bounds.lat[0] &&
        lat <= zone.bounds.lat[1] &&
        lng >= zone.bounds.lng[0] &&
        lng <= zone.bounds.lng[1]
      ) {
        return zone;
      }
    }

    return SERVICE_ZONES.standard;
  };

  // Update pricing based on service type and zone
  const updatePricing = () => {
    const basePrice = BASE_PRICES[formData.serviceType as keyof typeof BASE_PRICES] || BASE_PRICES.standard;
    const zoneMultiplier = serviceZone.priceMultiplier;
    const totalPrice = Math.round(basePrice * zoneMultiplier);

    setPricing({
      basePrice,
      zoneMultiplier,
      totalPrice
    });
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setBookingStatus('submitting');

      // Combine all booking data
      const bookingData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        service: {
          type: formData.serviceType,
          basePrice: pricing.basePrice
        },
        location: {
          address: formData.address,
          coordinates: location,
          zone: serviceZone.name,
          priceMultiplier: serviceZone.priceMultiplier
        },
        schedule: {
          date: formData.date,
          time: formData.time,
          timezone: serviceZone.timezone
        },
        pricing: {
          basePrice: pricing.basePrice,
          zoneMultiplier: pricing.zoneMultiplier,
          totalPrice: pricing.totalPrice
        },
        notes: formData.notes,
        meta: {
          bookingTime: new Date().toISOString(),
          source: 'website-geo-booking'
        }
      };

      // Submit to API endpoint (Option 2: SharePoint integration)
      const response = await fetch('/api/geo-booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }

      const result = await response.json();

      setBookingStatus('success');

      // Redirect to confirmation page after successful booking
      setTimeout(() => {
        router.push(`/booking/confirmation?id=${result.data.id}`);
      }, 2000);

    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      setBookingStatus('error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
        Book Your Austin Luxury Cleaning
      </h2>

      {/* Location Status */}
      {locationStatus === 'loading' && (
        <div className="bg-blue-50 p-4 mb-6 rounded-md">
          <p className="flex items-center text-blue-700">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Detecting your location for accurate service pricing...
          </p>
        </div>
      )}

      {locationStatus === 'success' && (
        <div className="bg-green-50 p-4 mb-6 rounded-md">
          <p className="text-green-700 font-medium">
            📍 Location detected: <span className="font-bold">{serviceZone.name}</span>
          </p>
          <div className="mt-2">
            <ul className="list-disc list-inside text-sm text-green-600 pl-2">
              {serviceZone.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {locationStatus === 'error' && (
        <div className="bg-yellow-50 p-4 mb-6 rounded-md">
          <p className="text-yellow-700">
            Unable to detect your location. Using standard pricing for Greater Austin area.
          </p>
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Service Address</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="123 Main St, Austin, TX"
            />
          </div>
        </div>

        {/* Service Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Service Details</h3>

          {/* Show note if service was pre-selected */}
          {searchParams.get('service') && (
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-blue-700 text-sm">
                ✓ Service pre-selected: <strong>{searchParams.get('name') || 'Selected service'}</strong>
                <br />
                <span className="text-blue-600">You can change the service type below if needed.</span>
              </p>
            </div>
          )}

          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              required
              value={formData.serviceType || 'standard'}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="standard">Essential Time Back - Residential (Starting at ${BASE_PRICES.standard})</option>
              <option value="deep">Complete Time Freedom - Deep Clean (Starting at ${BASE_PRICES.deep})</option>
              <option value="moveIn">Move-In Ready Cleaning (${BASE_PRICES.moveIn})</option>
              <option value="moveOut">Transition Time Saver - Move-Out (${BASE_PRICES.moveOut})</option>
              <option value="construction">Workspace Time Optimizer - Commercial (${BASE_PRICES.construction})</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Preferred Date
              {serviceZone.availability.sameDayBooking && (
                <span className="text-green-600 text-sm ml-2">✓ Same-day booking available</span>
              )}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={isClient ? getMinimumDate() : minimumDate}
              value={formData.date || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              suppressHydrationWarning
            />
            {formData.date && !isDateAvailable(formData.date) && (
              <p className="text-red-600 text-sm mt-1">This date is not available. Please select another date.</p>
            )}
          </div>

          {/* Time Selection */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Preferred Time
              {formData.date && (
                <span className="text-blue-600 text-sm ml-2" suppressHydrationWarning>
                  ({getAvailableTimeSlots().length} slots available)
                </span>
              )}
            </label>
            <select
              id="time"
              name="time"
              required
              value={formData.time || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              disabled={!formData.date}
              suppressHydrationWarning
            >
              <option value="">Select a time</option>
              {getAvailableTimeSlots().map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                  {serviceZone.availability.rushHourPremium &&
                    (timeSlot.includes('8:00 AM') || timeSlot.includes('6:00 PM')) &&
                    ' (+$25 rush hour)'
                  }
                </option>
              ))}
            </select>
            {!formData.date && (
              <p className="text-gray-500 text-sm mt-1">Please select a date first</p>
            )}
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Special Instructions</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Any special requests or access instructions..."
            />
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-purple-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-purple-800">Pricing Summary</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>${pricing.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Location ({serviceZone.name}):</span>
              <span>{pricing.zoneMultiplier}x multiplier</span>
            </div>
            <div className="border-t border-purple-200 mt-2 pt-2 flex justify-between font-bold">
              <span>Total Price:</span>
              <span>${pricing.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={bookingStatus === 'submitting'}
            className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
              ${bookingStatus === 'submitting' ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {bookingStatus === 'submitting' ? 'Processing...' : 'Book Now'}
          </button>
        </div>

        {/* Success Message */}
        {bookingStatus === 'success' && (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-green-700 font-medium">
              Your booking has been successfully submitted! Redirecting to confirmation page...
            </p>
          </div>
        )}

        {/* Error Message */}
        {bookingStatus === 'error' && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700 font-medium">
              {errorMessage || 'There was an error processing your booking. Please try again.'}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
