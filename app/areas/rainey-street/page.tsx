import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Star, CheckCircle, MapPin, Clock, Shield, Sparkles, Phone } from 'lucide-react';
import PhotoCarousel from '@/components/PhotoCarousel';
import PricingCalculator from '@/components/PricingCalculator';
import RaineyStreetGeoTarget from '@/components/SEO/RaineyStreetGeoTarget';

export const metadata: Metadata = {
  title: 'Rainey Street Cleaning Service | Luxury High-Rise & Condo Cleaning Austin',
  description: 'Premium cleaning service for Rainey Street residential towers including The Quincy, 70 Rainey, 44 East Ave, Millennium, and Northshore. Trusted by 100+ residents. Same-day service available.',
  keywords: 'rainey street cleaning, quincy austin cleaning, 70 rainey cleaning service, 44 east cleaning, millennium rainey cleaning, northshore austin cleaning, high rise cleaning rainey street',
  openGraph: {
    title: 'Rainey Street Luxury Cleaning | Aura Spring Cleaning',
    description: 'Serving Rainey Street\'s premier residential towers with 5-star cleaning services',
    images: ['/images/rainey-street-hero.jpg'],
  },
};

const raineyTowers = [
  {
    name: 'The Quincy',
    address: '516 E 6th St',
    units: '100+ units served',
    features: ['Concierge coordination', 'Flexible scheduling', 'Pet-friendly service'],
    testimonial: {
      text: 'Aura Spring Cleaning has been servicing our condo for 2 years. They know the building, work great with our concierge, and always deliver exceptional results.',
      author: 'Sarah M., Quincy Resident',
      rating: 5,
    },
  },
  {
    name: '70 Rainey',
    address: '70 Rainey St',
    units: '164 luxury residences',
    features: ['Penthouse specialists', 'Move-in/out experts', 'Green cleaning'],
  },
  {
    name: '44 East Ave',
    address: '44 East Ave',
    units: '200+ condos',
    features: ['Same-day service', 'Weekend availability', 'Deep cleaning'],
  },
  {
    name: 'The Millennium',
    address: '78 Rainey St',
    units: '359 residences',
    features: ['Airbnb turnovers', 'Post-construction', 'Monthly plans'],
  },
  {
    name: 'Northshore Austin',
    address: '84 East Ave',
    units: '239 luxury units',
    features: ['Lake view specialists', 'Balcony cleaning', 'Pet hair removal'],
  },
  {
    name: 'The Shore',
    address: '603 Davis St',
    units: '200+ residences',
    features: ['Eco-friendly products', 'Allergy-safe cleaning', 'Express service'],
  },
  {
    name: 'Waller Park Place',
    address: '60 East Ave',
    units: '150+ condos',
    features: ['Budget-friendly rates', 'Recurring discounts', 'Online booking'],
  },
  {
    name: 'Windsor on the Lake',
    address: '40 East Ave',
    units: '180 apartments',
    features: ['Studio specialists', 'Quick turnovers', 'Flexible timing'],
  },
];

const services = [
  {
    title: 'High-Rise Standard Clean',
    price: 'From $150',
    features: [
      'Perfect for Rainey Street condos',
      'All rooms thoroughly cleaned',
      'Kitchen & bathroom sanitization',
      'Vacuum & mop all floors',
      'Trash removal',
    ],
    popular: false,
  },
  {
    title: 'Luxury Deep Clean',
    price: 'From $225',
    features: [
      'Most requested by Quincy residents',
      'Everything in standard clean',
      'Inside appliances & cabinets',
      'Baseboards & light fixtures',
      'Balcony/patio cleaning',
    ],
    popular: true,
  },
  {
    title: 'Airbnb Turnover',
    price: 'From $125',
    features: [
      'Quick same-day turnarounds',
      'Linen change service available',
      'Restock essentials',
      'Guest-ready presentation',
      '4-hour turnaround',
    ],
    popular: false,
  },
];

export default function RaineyStreetPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Rainey Street's Trusted
              <span className="block text-aura-primary-400">Cleaning Service</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              Serving luxury high-rises and residential towers with premium cleaning services. 
              Proud partners with The Quincy and 100+ satisfied residents.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/booking?location=rainey-street"
                className="bg-aura-primary-600 hover:bg-aura-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl"
              >
                Book Rainey Street Service
              </Link>
              <a
                href="tel:512-555-0100"
                className="bg-white/95 hover:bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (512) 555-0100
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-aura-primary-400" />
                <span>Serving 8+ Rainey towers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-aura-primary-400" />
                <span>Fully insured & bonded</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-aura-primary-400" />
                <span>Same-day service available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-aura-primary-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm">Rainey Street Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2+ Years</p>
              <p className="text-sm">Serving The Quincy</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.9/5</p>
              <p className="text-sm">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold">Same Day</p>
              <p className="text-sm">Service Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buildings We Serve */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Rainey Street Towers We Service
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We're proud to be the preferred cleaning service for Rainey Street's premier residential buildings. 
            Our team knows each building's unique requirements and works seamlessly with concierge teams.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {raineyTowers.map((tower, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 ${
                  tower.name === 'The Quincy' ? 'ring-2 ring-aura-primary-500' : ''
                }`}
              >
                {tower.name === 'The Quincy' && (
                  <div className="bg-aura-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    PREFERRED PARTNER
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{tower.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {tower.address}
                    </p>
                  </div>
                  <Building2 className="w-8 h-8 text-aura-primary-500" />
                </div>
                <p className="text-sm font-semibold text-aura-primary-600 mb-3">{tower.units}</p>
                <ul className="space-y-2">
                  {tower.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {tower.testimonial && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-1 mb-2">
                      {[...Array(tower.testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">"{tower.testimonial.text}"</p>
                    <p className="text-xs text-gray-500 mt-2">- {tower.testimonial.author}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Quincy Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-aura-primary-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-aura-primary-600 text-white text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                EXCLUSIVE PARTNERSHIP
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                The Quincy's Preferred Cleaning Service
              </h2>
              <p className="text-gray-600 mb-6">
                For over 2 years, we've been the trusted cleaning partner for The Quincy residents. 
                Our team works seamlessly with the building's concierge to ensure smooth service delivery 
                and maintains the high standards expected by Quincy residents.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold">Concierge Coordination</p>
                    <p className="text-sm text-gray-600">We work directly with your concierge for seamless access</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold">Building Familiarity</p>
                    <p className="text-sm text-gray-600">Our team knows The Quincy's layouts and requirements</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold">Resident Referral Program</p>
                    <p className="text-sm text-gray-600">Get 15% off when you refer a neighbor</p>
                  </div>
                </li>
              </ul>
              <Link
                href="/booking?building=quincy&location=rainey-street"
                className="inline-block bg-aura-primary-600 hover:bg-aura-primary-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
              >
                Book Quincy Cleaning Service
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quincy Resident Special</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <p className="font-bold text-green-800">New Resident Offer</p>
                  <p className="text-green-700">First cleaning 20% off + free add-on service</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="font-bold text-blue-800">Recurring Service</p>
                  <p className="text-blue-700">Bi-weekly: Save 15% | Weekly: Save 20%</p>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                  <p className="font-bold text-purple-800">Referral Rewards</p>
                  <p className="text-purple-700">$25 credit for each neighbor referral</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">*Offers valid for Quincy residents only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Rainey Street Cleaning Services
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Tailored cleaning solutions for Rainey Street's unique high-rise living. 
            All prices include parking fees and building access coordination.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 ${
                  service.popular ? 'ring-2 ring-aura-primary-500' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-aura-primary-600 text-white text-xs font-bold px-4 py-2 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <Sparkles className="w-10 h-10 text-aura-primary-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-3xl font-bold text-aura-primary-600 mb-6">{service.price}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/booking?service=${service.title.toLowerCase().replace(/\s+/g, '-')}&location=rainey-street`}
                  className="block w-full text-center bg-aura-primary-100 hover:bg-aura-primary-200 text-aura-primary-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-900 font-semibold mb-2">
              🏢 Building Access Note
            </p>
            <p className="text-yellow-800">
              We coordinate directly with your building's concierge or management for seamless access. 
              No need to be home during service!
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Get Your Rainey Street Quote
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Instant pricing for your Rainey Street residence. Special rates for Quincy residents!
          </p>
          <PricingCalculator />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Rainey Street Residents Choose Aura
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-aura-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-aura-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">High-Rise Experts</h3>
              <p className="text-gray-600">
                Specialized in luxury high-rise cleaning with experience in all major Rainey towers
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-aura-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-aura-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Trusted & Insured</h3>
              <p className="text-gray-600">
                Fully bonded, insured, and background-checked team trusted by 100+ Rainey residents
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-aura-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-aura-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Same-day service, weekend availability, and coordination with concierge teams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-aura-primary-600 to-aura-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join 100+ Happy Rainey Street Residents
          </h2>
          <p className="text-xl mb-8">
            Experience the premium cleaning service trusted by The Quincy and Rainey Street's finest towers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking?location=rainey-street"
              className="bg-white text-aura-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              Book Rainey Street Service
            </Link>
            <a
              href="tel:512-555-0100"
              className="bg-aura-primary-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-aura-primary-900 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call (512) 555-0100
            </a>
          </div>
          <p className="text-sm mt-6 text-white/80">
            Mention "Quincy Resident" for exclusive discounts
          </p>
        </div>
      </section>
      
      {/* Geo-targeting SEO Components */}
      <RaineyStreetGeoTarget />
    </main>
  );
}