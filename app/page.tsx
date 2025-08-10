'use client';

import dynamic from 'next/dynamic';

const PhotoCarousel = dynamic(() => import('@/components/PhotoCarousel'), {
  loading: () => <div className="h-[500px] bg-gray-100 animate-pulse rounded-2xl" />,
});

const PricingCalculator = dynamic(() => import('@/components/PricingCalculator'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false, // Client-side only for calculator
});
import { MetaTags } from '@/components/SEO/MetaTags';
import { StructuredData } from '@/components/SEO/StructuredData';
import { cleaningImages } from '@/lib/imageService';
import {
  Award,
  Clock,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function HomePage() {
  const [showPricing, setShowPricing] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const handleShowPricing = () => {
    setShowPricing(true);
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const services = [
    {
      title: 'Standard Cleaning',
      description: 'Regular maintenance cleaning for your home',
      price: 'From $150',
      icon: <Sparkles className="h-8 w-8 text-aura-primary-500" />,
      features: [
        'Dusting & Vacuuming',
        'Kitchen & Bathrooms',
        'Floor Cleaning',
      ],
    },
    {
      title: 'Deep Cleaning',
      description: 'Thorough top-to-bottom home transformation',
      price: 'From $225',
      icon: <Shield className="h-8 w-8 text-aura-primary-500" />,
      features: ['Baseboards & Trim', 'Inside Appliances', 'Light Fixtures'],
    },
    {
      title: 'Move In/Out',
      description: 'Complete cleaning for moving transitions',
      price: 'From $270',
      icon: <Clock className="h-8 w-8 text-aura-primary-500" />,
      features: ['Empty Home Clean', 'Cabinet Interiors', 'Garage Included'],
    },
  ];

  const testimonials: {
    name: string;
    location: string;
    rating: number;
    text: string;
    image: string;
  }[] = [
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
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Aura Spring Cleaning',
    url: 'https://auraspringcleaning.com',
    logo: 'https://auraspringcleaning.com/images/logo.png',
    description:
      'Premium house cleaning services in Austin, TX. Specializing in deep cleaning, move-in/out cleaning, and eco-friendly solutions.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1234 Congress Ave',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.2672,
      longitude: -97.7431,
    },
    telephone: '+1-512-781-0527',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
  };

  return (
    <div>
      <MetaTags
        title="Aura Spring Cleaning - Premium House Cleaning in Austin, TX"
        description="Experience top-notch house cleaning services in Austin. Book online for deep cleaning, move-in/out cleaning, and eco-friendly solutions."
        url="https://auraspringcleaning.com"
        image="https://auraspringcleaning.com/images/og-image.jpg"
      />
      <StructuredData data={structuredData} />
      <main className="min-h-screen bg-gradient-to-b from-white via-aura-primary-50/20 to-white">
        {/* Hero Section with Carousel */}
        <section className="relative">
          <PhotoCarousel
            images={cleaningImages.hero}
            title="Austin's Premier Luxury Cleaning Service"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="mx-auto w-full max-w-7xl px-4 pb-12">
              <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-2xl md:text-7xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Aura Spring Cleaning
              </h1>
              <p className="mb-8 max-w-2xl text-lg font-medium text-white drop-shadow-lg md:text-2xl" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                Transform your space into a sanctuary of cleanliness. Serving
                Austin's finest homes since 2018.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleShowPricing}
                  className="rounded-xl bg-aura-primary-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-aura-primary-700"
                >
                  Get Instant Quote
                </button>
                <a
                  href="tel:512-781-0527"
                  className="flex items-center gap-2 rounded-xl bg-white/95 px-8 py-4 text-lg font-bold text-aura-primary-700 shadow-xl transition-all hover:scale-105 hover:bg-white"
                >
                  <Phone className="h-5 w-5" />
                  Call (512) 781-0527
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-white py-8 shadow-sm">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex items-center justify-center gap-3">
                <Award className="h-8 w-8 text-aura-primary-600" />
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Star className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">4.9/5</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-gray-600">Insured & Bonded</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-sm text-gray-600">Expert Cleaners</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-4 text-center text-4xl font-bold text-aura-primary-700">
              Our Premium Services
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
              Choose from our range of professional cleaning services, each
              designed to meet your specific needs and exceed your expectations.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-500">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-gray-400">{service.description}</p>
                  <p className="mb-4 text-3xl font-bold text-aura-primary-600">
                    {service.price}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-400"
                      >
                        <Star className="h-4 w-4 text-aura-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full rounded-lg bg-aura-primary-100 py-3 font-semibold text-aura-primary-700 transition-colors hover:bg-aura-primary-200">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before & After Gallery */}
        <section className="bg-gradient-to-b from-aura-primary-50/30 to-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-4 text-center text-4xl font-bold text-aura-primary-700">
              See The Aura Difference
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
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
          <section ref={pricingRef} className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4">
              <h2 className="mb-4 text-center text-4xl font-bold text-aura-primary-700">
                Transparent Pricing, No Surprises
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
                Use our instant calculator to get an accurate quote for your
                home. Our competitive rates beat major competitors by up to 25%!
              </p>
              <PricingCalculator />
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="mx-auto mb-4 h-16 w-16 rounded-full"
                  />
                  <h3 className="text-center text-lg font-bold">
                    {testimonial.name}
                  </h3>
                  <p className="text-center text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                  <p className="mt-4 text-center">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-4 text-center text-4xl font-bold text-aura-primary-700">
              Proudly Serving Austin & Surrounding Areas
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
              We bring our premium cleaning services to the finest neighborhoods
              in Central Texas
            </p>

            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                'Downtown Austin',
                'The Domain',
                'West Lake Hills',
                'Zilker',
                'Tarrytown',
                'Round Rock',
                'Cedar Park',
                'Georgetown',
              ].map(area => (
                <div
                  key={area}
                  className="rounded-lg bg-gradient-to-r from-aura-primary-50 to-aura-primary-100 p-4 text-center transition-all hover:shadow-lg"
                >
                  <MapPin className="mx-auto mb-2 h-6 w-6 text-aura-primary-600" />
                  <p className="font-semibold text-gray-500">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-aura-primary-600 to-aura-primary-700 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ready for a Spotless Home?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Join hundreds of satisfied customers who trust Aura Spring
              Cleaning for their home cleaning needs.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setShowPricing(true)}
                className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-aura-primary-700 shadow-xl transition-all hover:scale-105"
              >
                Book Your Cleaning Today
              </button>
              <a
                href="tel:512-781-0527"
                className="flex items-center justify-center gap-2 rounded-xl bg-aura-primary-800 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-aura-primary-900"
              >
                <Phone className="h-5 w-5" />
                Call for Same-Day Service
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
