'use client';

import { useState } from 'react';
import PhotoCarousel from '@/components/PhotoCarousel';
import PricingCalculator from '@/components/PricingCalculator';
import { cleaningImages } from '@/lib/imageService';
import { Star, Shield, Clock, Sparkles, Phone, MapPin, Award, Users } from 'lucide-react';

export default function HomePage() {
  const [showPricing, setShowPricing] = useState(false);

  const services = [
    {
      title: 'Standard Cleaning',
      description: 'Regular maintenance cleaning for your home',
      price: 'From $150',
      icon: <Sparkles className="w-8 h-8 text-aura-primary-500" />,
      features: ['Dusting & Vacuuming', 'Kitchen & Bathrooms', 'Floor Cleaning'],
    },
    {
      title: 'Deep Cleaning',
      description: 'Thorough top-to-bottom home transformation',
      price: 'From $225',
      icon: <Shield className="w-8 h-8 text-aura-primary-500" />,
      features: ['Baseboards & Trim', 'Inside Appliances', 'Light Fixtures'],
    },
    {
      title: 'Move In/Out',
      description: 'Complete cleaning for moving transitions',
      price: 'From $270',
      icon: <Clock className="w-8 h-8 text-aura-primary-500" />,
      features: ['Empty Home Clean', 'Cabinet Interiors', 'Garage Included'],
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'Downtown Austin',
      rating: 5,
      text: 'Aura Spring Cleaning transformed my high-rise condo! Their attention to detail is unmatched.',
      image: cleaningImages.testimonials[0],
    },
    {
      name: 'Michael Chen',
      location: 'The Domain',
      rating: 5,
      text: 'Professional, punctual, and pristine results every time. Worth every penny!',
      image: cleaningImages.testimonials[1],
    },
    {
      name: 'Jennifer Adams',
      location: 'West Lake Hills',
      rating: 5,
      text: 'I\'ve tried many cleaning services, but Aura Spring Cleaning is by far the best.',
      image: cleaningImages.testimonials[2],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-aura-primary-50/20 to-white">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <PhotoCarousel
          images={cleaningImages.hero}
          title="Austin's Premier Luxury Cleaning Service"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Aura Spring Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              Transform your space into a sanctuary of cleanliness. 
              Serving Austin's finest homes since 2018.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowPricing(true)}
                className="bg-aura-primary-600 hover:bg-aura-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl"
              >
                Get Instant Quote
              </button>
              <a
                href="tel:512-781-0527"
                className="bg-white/95 hover:bg-white text-aura-primary-700 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (512) 781-0527
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-aura-primary-600" />
              <div>
                <p className="font-bold text-2xl">500+</p>
                <p className="text-sm text-gray-400">Happy Customers</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-bold text-2xl">4.9/5</p>
                <p className="text-sm text-gray-400">Average Rating</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-bold text-2xl">100%</p>
                <p className="text-sm text-gray-400">Insured & Bonded</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-bold text-2xl">15+</p>
                <p className="text-sm text-gray-400">Expert Cleaners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-aura-primary-700 mb-4">
            Our Premium Services
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Choose from our range of professional cleaning services, 
            each designed to meet your specific needs and exceed your expectations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-8 hover:-translate-y-2"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-500 mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <p className="text-3xl font-bold text-aura-primary-600 mb-4">{service.price}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <Star className="w-4 h-4 text-aura-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-aura-primary-100 hover:bg-aura-primary-200 text-aura-primary-700 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-20 bg-gradient-to-b from-aura-primary-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-aura-primary-700 mb-4">
            See The Aura Difference
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Our professional team delivers exceptional results every time, 
            transforming spaces into pristine sanctuaries.
          </p>
          <PhotoCarousel
            images={cleaningImages.results}
            autoPlay={true}
            interval={4000}
          />
        </div>
      </section>

      {/* Pricing Calculator Section */}
      {showPricing && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-aura-primary-700 mb-4">
              Transparent Pricing, No Surprises
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              Use our instant calculator to get an accurate quote for your home. 
              Our competitive rates beat major competitors by up to 25%!
            </p>
            <PricingCalculator />
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-aura-primary-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-aura-primary-700 mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-500">{testimonial.name}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-400 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-aura-primary-700 mb-4">
            Proudly Serving Austin & Surrounding Areas
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            We bring our premium cleaning services to the finest neighborhoods in Central Texas
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {['Downtown Austin', 'The Domain', 'West Lake Hills', 'Zilker', 
              'Tarrytown', 'Round Rock', 'Cedar Park', 'Georgetown'].map((area) => (
              <div
                key={area}
                className="bg-gradient-to-r from-aura-primary-50 to-aura-primary-100 rounded-lg p-4 text-center hover:shadow-lg transition-all"
              >
                <MapPin className="w-6 h-6 text-aura-primary-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-500">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-aura-primary-600 to-aura-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for a Spotless Home?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of satisfied customers who trust Aura Spring Cleaning 
            for their home cleaning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowPricing(true)}
              className="bg-white text-aura-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              Book Your Cleaning Today
            </button>
            <a
              href="tel:512-781-0527"
              className="bg-aura-primary-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-aura-primary-900 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call for Same-Day Service
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}