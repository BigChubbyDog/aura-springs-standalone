'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Clock, 
  Shield, 
  CheckCircle, 
  Star, 
  Phone,
  Calendar,
  Home,
  Users,
  Award
} from 'lucide-react';
import { metaPixel } from '@/lib/metaPixel';
import { cleaningServiceEvents } from '@/lib/metaPixelEvents';

export default function StandardCleaningPage() {
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly' | 'onetime'>('biweekly');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);

  const calculatePrice = () => {
    const basePrice = 100 + (bedrooms * 25) + (bathrooms * 20);
    const frequencyDiscount = {
      weekly: 0.20,
      biweekly: 0.15,
      monthly: 0.10,
      onetime: 0
    };
    const discount = basePrice * frequencyDiscount[frequency];
    return Math.round(basePrice - discount);
  };

  const handleBookNow = () => {
    const price = calculatePrice();
    cleaningServiceEvents.startBooking('Standard Cleaning', price);
    metaPixel.initiateCheckout({
      content_category: 'Standard Cleaning',
      content_ids: ['standard-cleaning'],
      value: price,
      currency: 'USD',
      num_items: 1
    });
  };

  const features = [
    'Kitchen: Counters, sink, stovetop, microwave exterior, cabinet fronts',
    'Bathrooms: Toilet, tub/shower, sink, mirrors, floor',
    'Living Areas: Dusting, vacuuming, mopping',
    'Bedrooms: Making beds, dusting, vacuuming',
    'All Rooms: Trash removal, light switches, door handles',
    'Eco-friendly cleaning products included'
  ];

  const benefits = [
    { icon: <Clock className="h-6 w-6" />, title: 'Save 3+ Hours Weekly', desc: 'Spend time on what matters most' },
    { icon: <Shield className="h-6 w-6" />, title: 'Insured & Bonded', desc: '$2M liability insurance' },
    { icon: <Users className="h-6 w-6" />, title: 'Consistent Teams', desc: 'Same cleaners every visit' },
    { icon: <Award className="h-6 w-6" />, title: 'Satisfaction Guaranteed', desc: '100% happiness promise' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-aura-primary-50/20">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-aura-primary-600 to-aura-primary-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8" />
              <span className="text-lg font-semibold">Most Popular Service</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Standard Cleaning</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Regular maintenance cleaning to keep your home consistently fresh and spotless. 
              Perfect for busy professionals and families.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={handleBookNow}
                className="bg-white text-aura-primary-700 px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                Book Now - From ${calculatePrice()}
              </button>
              <a 
                href="tel:512-781-0527"
                className="bg-aura-primary-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-aura-primary-900 flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                (512) 781-0527
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-aura-primary-600">2-3</div>
              <div className="text-gray-600">Hours per clean</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-aura-primary-600">$150+</div>
              <div className="text-gray-600">Starting price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-aura-primary-600">20%</div>
              <div className="text-gray-600">Weekly discount</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-aura-primary-600">4.9/5</div>
              <div className="text-gray-600">Customer rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-aura-primary-700">Every Standard Clean Includes:</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-aura-primary-50 to-aura-primary-100 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6 text-aura-primary-700">Pricing Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bedrooms</label>
                  <select 
                    value={bedrooms} 
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bathrooms</label>
                  <select 
                    value={bathrooms} 
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num} Bathroom{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cleaning Frequency</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'weekly', label: 'Weekly', discount: '20% off' },
                      { value: 'biweekly', label: 'Bi-weekly', discount: '15% off' },
                      { value: 'monthly', label: 'Monthly', discount: '10% off' },
                      { value: 'onetime', label: 'One-time', discount: 'No discount' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setFrequency(option.value as any)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          frequency === option.value 
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
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Estimated Price:</span>
                    <span className="text-3xl font-bold text-aura-primary-600">${calculatePrice()}</span>
                  </div>
                  <button 
                    onClick={handleBookNow}
                    className="w-full bg-aura-primary-600 text-white py-3 rounded-lg font-bold hover:bg-aura-primary-700 transition-colors"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Standard Cleaning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-aura-primary-100 text-aura-primary-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gradient-to-b from-white to-aura-primary-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Book Online', desc: 'Select your service and schedule in 60 seconds' },
              { step: 2, title: 'We Confirm', desc: 'Receive confirmation and cleaner details' },
              { step: 3, title: 'We Clean', desc: 'Professional team arrives and transforms your home' },
              { step: 4, title: 'You Relax', desc: 'Enjoy your spotless home and free time' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-aura-primary-600 text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Jennifer M.', 
                location: 'Downtown Austin',
                text: 'The bi-weekly service has been life-changing! My apartment is always guest-ready.',
                rating: 5
              },
              { 
                name: 'Robert K.', 
                location: 'West Lake Hills',
                text: 'Professional, punctual, and thorough. Worth every penny for the time it saves me.',
                rating: 5
              },
              { 
                name: 'Maria S.', 
                location: 'Round Rock',
                text: 'Love having the same team every time. They know exactly how I like things done!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { 
                q: 'How long does a standard cleaning take?',
                a: 'Typically 2-3 hours depending on home size and condition. We send 2-person teams for efficiency.'
              },
              { 
                q: 'Do I need to provide cleaning supplies?',
                a: 'No! We bring all eco-friendly cleaning products and equipment. You can also request us to use your preferred products.'
              },
              { 
                q: 'What if I need to reschedule?',
                a: 'No problem! Just give us 24 hours notice to reschedule without any fees.'
              },
              { 
                q: 'Are you insured?',
                a: 'Yes, we carry $2 million in liability insurance and are fully bonded for your peace of mind.'
              },
              { 
                q: 'Can I customize what gets cleaned?',
                a: 'Absolutely! Let us know your priorities and we\'ll create a custom cleaning plan for you.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-aura-primary-600 to-aura-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready for a Consistently Clean Home?</h2>
          <p className="text-xl mb-8">Join 500+ Austin families who trust us with their homes</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleBookNow}
              className="bg-white text-aura-primary-700 px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Book Standard Cleaning
            </button>
            <Link 
              href="/services"
              className="bg-aura-primary-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-aura-primary-900 inline-flex items-center justify-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}