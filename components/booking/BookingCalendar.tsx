'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { metaPixel } from '@/lib/metaPixel';
import { cleaningServiceEvents } from '@/lib/metaPixelEvents';

interface BookingCalendarProps {
  serviceType?: string;
  initialPrice?: number;
  onComplete?: (booking: any) => void;
}

export default function BookingCalendar({ 
  serviceType = 'Standard Cleaning', 
  initialPrice = 150,
  onComplete 
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apt: '',
    city: 'Austin',
    state: 'TX',
    zip: '',
    bedrooms: 2,
    bathrooms: 2,
    frequency: 'biweekly',
    specialInstructions: '',
    referralSource: ''
  });

  // Available time slots
  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  // Calculate dynamic price based on home size and frequency
  const calculatePrice = () => {
    const basePrice = 100 + (formData.bedrooms * 25) + (formData.bathrooms * 20);
    const frequencyMultiplier = {
      weekly: 0.80,
      biweekly: 0.85,
      monthly: 0.90,
      onetime: 1.00
    };
    return Math.round(basePrice * frequencyMultiplier[formData.frequency as keyof typeof frequencyMultiplier]);
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  // Check if date is available (not in past, not Sunday)
  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getDay() !== 0; // Not in past and not Sunday
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Track booking initiation
    const price = calculatePrice();
    cleaningServiceEvents.completeBooking({
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      zipCode: formData.zip,
      serviceType: serviceType,
      price: price,
      frequency: formData.frequency,
      bookingId: `BOOK-${Date.now()}`
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Call completion handler
    if (onComplete) {
      onComplete({
        ...formData,
        date: selectedDate,
        time: selectedTime,
        service: serviceType,
        price: price
      });
    }
    
    setIsLoading(false);
    setStep(4); // Show confirmation
  };

  // Navigation functions
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {['Date & Time', 'Your Info', 'Review', 'Confirmed'].map((label, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step > index + 1 ? 'bg-green-500 text-white' :
                step === index + 1 ? 'bg-aura-primary-600 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              {index < 3 && (
                <div className={`h-1 w-20 md:w-32 ${
                  step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span>Select Date</span>
          <span>Contact Info</span>
          <span>Confirm</span>
          <span>Done!</span>
        </div>
      </div>

      {/* Step 1: Calendar */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
          
          {/* Calendar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentMonth).map((date, index) => (
                <button
                  key={index}
                  onClick={() => date && isDateAvailable(date) && setSelectedDate(date)}
                  disabled={!date || !isDateAvailable(date)}
                  className={`
                    p-3 text-center rounded-lg transition-all
                    ${!date ? 'invisible' : ''}
                    ${date && !isDateAvailable(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${date && isDateAvailable(date) ? 'hover:bg-aura-primary-50 cursor-pointer' : ''}
                    ${selectedDate?.toDateString() === date?.toDateString() ? 'bg-aura-primary-600 text-white hover:bg-aura-primary-700' : ''}
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <h3 className="font-semibold mb-3">Available Times</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border transition-all ${
                      selectedTime === time 
                        ? 'bg-aura-primary-600 text-white border-aura-primary-600' 
                        : 'border-gray-300 hover:border-aura-primary-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Next Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedDate || !selectedTime}
              className="px-6 py-3 bg-aura-primary-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-aura-primary-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Contact Information */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Street Address *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apt/Suite</label>
              <input
                type="text"
                value={formData.apt}
                onChange={(e) => setFormData({...formData, apt: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code *</label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({...formData, zip: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bedrooms</label>
              <select
                value={formData.bedrooms}
                onChange={(e) => setFormData({...formData, bedrooms: Number(e.target.value)})}
                className="w-full p-2 border rounded-lg"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bathrooms</label>
              <select
                value={formData.bathrooms}
                onChange={(e) => setFormData({...formData, bathrooms: Number(e.target.value)})}
                className="w-full p-2 border rounded-lg"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} Bathroom{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Cleaning Frequency</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { value: 'weekly', label: 'Weekly', discount: '20% off' },
                  { value: 'biweekly', label: 'Bi-weekly', discount: '15% off' },
                  { value: 'monthly', label: 'Monthly', discount: '10% off' },
                  { value: 'onetime', label: 'One-time', discount: 'No discount' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({...formData, frequency: option.value})}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.frequency === option.value 
                        ? 'border-aura-primary-500 bg-aura-primary-50' 
                        : 'border-gray-200 hover:border-aura-primary-300'
                    }`}
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.discount}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Special Instructions</label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Gate codes, pet instructions, specific areas to focus on..."
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.zip}
              className="px-6 py-3 bg-aura-primary-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-aura-primary-700 transition-colors"
            >
              Review Booking
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Review Your Booking</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-aura-primary-600" />
              Appointment Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Date:</span>
                <span className="ml-2 font-semibold">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Time:</span>
                <span className="ml-2 font-semibold">{selectedTime}</span>
              </div>
              <div>
                <span className="text-gray-600">Service:</span>
                <span className="ml-2 font-semibold">{serviceType}</span>
              </div>
              <div>
                <span className="text-gray-600">Frequency:</span>
                <span className="ml-2 font-semibold capitalize">{formData.frequency}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-aura-primary-600" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-semibold">{formData.firstName} {formData.lastName}</span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-semibold">{formData.phone}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-semibold">{formData.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Address:</span>
                <span className="ml-2 font-semibold">
                  {formData.address} {formData.apt && `#${formData.apt}`}, {formData.city}, {formData.state} {formData.zip}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-aura-primary-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-aura-primary-600" />
              Pricing
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">
                  {formData.bedrooms} bedrooms, {formData.bathrooms} bathrooms
                </div>
                <div className="text-sm text-gray-600">
                  {formData.frequency === 'weekly' && '20% weekly discount applied'}
                  {formData.frequency === 'biweekly' && '15% bi-weekly discount applied'}
                  {formData.frequency === 'monthly' && '10% monthly discount applied'}
                </div>
              </div>
              <div className="text-3xl font-bold text-aura-primary-600">
                ${calculatePrice()}
              </div>
            </div>
          </div>

          {formData.specialInstructions && (
            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                Special Instructions
              </h4>
              <p className="text-sm text-gray-700">{formData.specialInstructions}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Aura Spring Cleaning. We've sent a confirmation email to {formData.email}.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-3">Your Appointment:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">
                  {selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold">{serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">${calculatePrice()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-aura-primary-50 rounded-lg p-4 mb-6">
            <Sparkles className="h-6 w-6 text-aura-primary-600 mx-auto mb-2" />
            <p className="text-sm text-aura-primary-700">
              <strong>What's Next?</strong> Our team will arrive at your location on the scheduled date. 
              Payment is collected after the service is complete.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-aura-primary-600 text-white rounded-lg font-semibold hover:bg-aura-primary-700 transition-colors"
            >
              Return Home
            </button>
            <button 
              onClick={() => {
                setStep(1);
                setSelectedDate(null);
                setSelectedTime(null);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  address: '',
                  apt: '',
                  city: 'Austin',
                  state: 'TX',
                  zip: '',
                  bedrooms: 2,
                  bathrooms: 2,
                  frequency: 'biweekly',
                  specialInstructions: '',
                  referralSource: ''
                });
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Book Another Service
            </button>
          </div>
        </div>
      )}
    </div>
  );
}