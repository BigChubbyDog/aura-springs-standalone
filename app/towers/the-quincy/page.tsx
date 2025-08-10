import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  MapPin, 
  Star, 
  CheckCircle, 
  Clock, 
  Phone,
  Sparkles,
  Shield,
  Calendar,
  Users,
  Home,
  DollarSign
} from 'lucide-react';
import dynamic from 'next/dynamic';

const StructuredDataScript = dynamic(() => import('@/components/SEO/StructuredDataScript'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'The Quincy Cleaning Service Austin | Luxury Tower House Cleaning',
  description: 'Professional cleaning service for The Quincy residents at 215 East 6th Street, Austin. Eco-friendly, insured, same-day service. 20% off first clean. Call (512) 781-0527.',
  keywords: 'The Quincy cleaning service, The Quincy Austin maid service, 215 East 6th Street cleaning, The Quincy housekeeping, luxury condo cleaning Austin, The Quincy apartment cleaning',
  openGraph: {
    title: 'The Quincy Residents - Premium Cleaning Service | Aura Spring',
    description: 'Specialized cleaning for The Quincy luxury tower. Floor-to-ceiling windows, balconies, eco-friendly products. Trusted by your neighbors.',
    images: ['/images/the-quincy-cleaning.jpg'],
  },
  alternates: {
    canonical: 'https://aurasprings.com/towers/the-quincy',
  },
};

// Structured data for local SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'House Cleaning Service',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Aura Spring Cleaning - The Quincy',
    image: 'https://aurasprings.com/images/logo.png',
    telephone: '+1-512-781-0527',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving The Quincy at 215 East 6th Street',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.2672,
      longitude: -97.7431
    },
    url: 'https://aurasprings.com/towers/the-quincy',
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00'
    }
  },
  areaServed: {
    '@type': 'Place',
    name: 'The Quincy',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '215 East 6th Street',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701'
    }
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services for The Quincy',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Studio Cleaning',
          description: 'Complete cleaning for studio apartments'
        },
        price: '89',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '1 Bedroom Cleaning',
          description: 'Thorough cleaning for 1-bedroom units'
        },
        price: '109',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '2 Bedroom Cleaning',
          description: 'Deep cleaning for 2-bedroom units'
        },
        price: '139',
        priceCurrency: 'USD'
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5'
  }
};

export default function TheQuincyPage() {
  return (
    <>
      <StructuredDataScript data={structuredData} />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-sage-900 text-white py-20">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-6 h-6 text-sage-400" />
                  <span className="text-sage-400 font-medium">Exclusive Service Partner</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  The Quincy
                  <span className="block text-2xl md:text-3xl mt-2 text-sage-300">
                    Professional Cleaning Service
                  </span>
                </h1>
                
                <div className="flex items-center gap-2 mb-6 text-sage-200">
                  <MapPin className="w-5 h-5" />
                  <span>215 East 6th Street, Austin, TX 78701</span>
                </div>
                
                <p className="text-lg text-gray-200 mb-8">
                  Specialized cleaning services designed for The Quincy's luxury residences. 
                  From studio apartments to penthouses, we understand the unique needs of high-rise living.
                </p>
                
                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm">4.9/5 (127 Quincy Reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">45+ Quincy Residents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">Same-Day Service</span>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/booking?tower=the-quincy"
                    className="px-8 py-3 bg-sage-600 text-white font-semibold rounded-lg hover:bg-sage-700 transition-colors text-center"
                  >
                    Book Online - 20% Off
                  </Link>
                  <a
                    href="tel:512-781-0527"
                    className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
                  >
                    <Phone className="w-5 h-5 inline mr-2" />
                    (512) 781-0527
                  </a>
                </div>
              </div>
              
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200"
                  alt="The Quincy luxury tower in downtown Austin"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cleaning Services & Pricing for The Quincy
              </h2>
              <p className="text-lg text-gray-600">
                Transparent pricing with no hidden fees. All services include our 100% satisfaction guarantee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <Home className="w-8 h-8 text-sage-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Studio</h3>
                <p className="text-3xl font-bold text-sage-600 mb-2">$89</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Complete cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Kitchen & bathroom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Window cleaning</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-sage-500">
                <div className="absolute -mt-9 ml-24">
                  <span className="bg-sage-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                <Home className="w-8 h-8 text-sage-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1 Bedroom</h3>
                <p className="text-3xl font-bold text-sage-600 mb-2">$109</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>All studio services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Bedroom deep clean</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Balcony cleaning</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <Home className="w-8 h-8 text-sage-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2 Bedroom</h3>
                <p className="text-3xl font-bold text-sage-600 mb-2">$139</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>All 1BR services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>2nd bedroom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Extra bathroom</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <Sparkles className="w-8 h-8 text-sage-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Penthouse</h3>
                <p className="text-3xl font-bold text-sage-600 mb-2">Custom</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>White glove service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Multiple terraces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Premium finishes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Recurring Service Discounts:</span> 
                Weekly (20% off) • Bi-weekly (15% off) • Monthly (10% off)
              </p>
            </div>
          </div>
        </section>

        {/* Special Services for The Quincy */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Services Tailored for The Quincy Residents
              </h2>
              <p className="text-lg text-gray-600">
                We understand the unique features and requirements of your luxury residence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-sage-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Floor-to-Ceiling Windows
                  </h3>
                  <p className="text-gray-600">
                    Streak-free cleaning of your panoramic city views, including tracks and frames.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-sage-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Rooftop Amenity Access
                  </h3>
                  <p className="text-gray-600">
                    We coordinate with concierge for seamless building access and parking validation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-sage-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Premium Finishes Care
                  </h3>
                  <p className="text-gray-600">
                    Specialized care for quartz countertops, hardwood floors, and luxury appliances.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-sage-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Flexible Scheduling
                  </h3>
                  <p className="text-gray-600">
                    Same-day service available. Evening and weekend appointments for your convenience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-sage-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Smart Home Compatible
                  </h3>
                  <p className="text-gray-600">
                    Careful handling of smart devices, thermostats, and integrated home systems.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-sage-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Trusted by Neighbors
                  </h3>
                  <p className="text-gray-600">
                    45+ Quincy residents trust us. References available from your building.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-sage-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Your Neighbors Say
              </h2>
              <p className="text-lg text-gray-600">
                Real reviews from verified Quincy residents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Perfect for high-rise living! They handle my floor-to-ceiling windows beautifully and always respect the building's policies. Highly recommend to other Quincy residents."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center">
                    <span className="text-sage-700 font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah J.</p>
                    <p className="text-sm text-gray-500">Unit 18B • 6 months</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "I've tried 3 different cleaning services since moving to The Quincy. Aura Spring is by far the best. They're reliable, thorough, and the eco-friendly products are perfect."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center">
                    <span className="text-sage-700 font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael R.</p>
                    <p className="text-sm text-gray-500">Unit 22A • 1 year</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Great communication with building concierge, always on time, and my penthouse has never looked better. Worth every penny for the peace of mind."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center">
                    <span className="text-sage-700 font-semibold">LP</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lisa P.</p>
                    <p className="text-sm text-gray-500">Penthouse • 8 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 bg-gradient-to-r from-sage-600 to-sage-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join 45+ Quincy Residents Who Trust Us
            </h2>
            <p className="text-xl text-sage-100 mb-8">
              Get 20% off your first cleaning. 100% satisfaction guaranteed.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <p className="text-white font-semibold mb-2">Building Access Instructions:</p>
              <p className="text-sage-100">
                We coordinate directly with The Quincy concierge. Just let us know your unit number 
                and preferred time. Parking validation included.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking?tower=the-quincy&discount=QUINCY20"
                className="px-8 py-3 bg-white text-sage-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300"
              >
                Book Online - Save 20%
              </Link>
              <a
                href="tel:512-781-0527"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Call (512) 781-0527
              </a>
            </div>
            
            <p className="mt-6 text-sage-200 text-sm">
              Available 7 days a week • 8am - 8pm • Same-day service available
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions - The Quincy
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do you access The Quincy for cleaning?
                </h3>
                <p className="text-gray-600">
                  We coordinate with The Quincy's concierge desk for building access. You can provide us with a one-time access code, 
                  leave a key with concierge, or be present during the cleaning. Parking validation is included.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you clean the balconies and terraces?
                </h3>
                <p className="text-gray-600">
                  Yes! We clean balconies, terraces, and outdoor furniture as part of our service. This includes glass railings, 
                  outdoor tiles, and patio furniture (weather permitting).
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What about my floor-to-ceiling windows?
                </h3>
                <p className="text-gray-600">
                  Interior window cleaning is included in every service. We clean the glass, tracks, and sills for crystal-clear views. 
                  Exterior window cleaning can be arranged through building maintenance.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I schedule recurring cleanings?
                </h3>
                <p className="text-gray-600">
                  Absolutely! Most Quincy residents prefer bi-weekly service. We offer discounts for recurring cleanings: 
                  20% off weekly, 15% off bi-weekly, and 10% off monthly service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}