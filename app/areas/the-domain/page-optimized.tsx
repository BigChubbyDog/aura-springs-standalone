import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  MapPin, 
  Star,
  Clock,
  Phone,
  Calendar,
  CheckCircle,
  ShoppingBag,
  Car,
  Trees,
  Coffee,
  Zap
} from 'lucide-react';

// Lazy load heavy components
const DomainServiceMenu = dynamic(() => import('@/components/areas/DomainServiceMenu'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

const DomainProperties = dynamic(() => import('@/components/areas/DomainProperties'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
});

// Move large data arrays to separate file to reduce main bundle
const features = [
  { icon: ShoppingBag, title: 'Shopping Paradise', desc: 'Over 100 stores and restaurants' },
  { icon: Car, title: 'Easy Parking', desc: 'Ample parking throughout' },
  { icon: Trees, title: 'Green Spaces', desc: 'Parks and outdoor areas' },
  { icon: Coffee, title: 'Dining & Coffee', desc: '30+ restaurants and cafes' },
  { icon: Zap, title: 'Tech Hub', desc: 'Near major tech companies' }
];

const testimonials = [
  {
    name: 'Sarah M.',
    property: 'Domain Tower I',
    text: 'Aura Spring has been cleaning my condo for 2 years. Always professional and thorough!',
    rating: 5
  },
  {
    name: 'Mike R.',
    property: 'Standard Domain',
    text: 'Best cleaning service in the Domain area. They understand luxury living standards.',
    rating: 5
  },
  {
    name: 'Jennifer L.',
    property: 'Alexan Domain',
    text: 'Reliable, efficient, and my apartment always smells amazing after they visit!',
    rating: 5
  }
];

export default function TheDomainPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">The Domain Area Cleaning Service</h1>
          <p className="text-xl mb-8 max-w-3xl">
            Premium cleaning services for Austin's premier shopping and residential district. 
            Serving all luxury apartments and condos in The Domain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/booking"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Book Now - Valerie: (512) 781-0527
            </Link>
            <Link 
              href="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-center"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Key Info */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Service Area</h3>
              <p className="text-gray-600">All Domain properties</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">4.9 Rating</h3>
              <p className="text-gray-600">250+ Domain residents</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Flexible Hours</h3>
              <p className="text-gray-600">7 days a week</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Quick Booking</h3>
              <p className="text-gray-600">(512) 781-0527</p>
            </div>
          </div>
        </div>
      </section>

      {/* About The Domain */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About The Domain</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                The Domain is Austin's premier destination for shopping, dining, and upscale living. 
                This 303-acre development features luxury apartments, high-end retail, and innovative 
                office spaces, creating a vibrant live-work-play environment.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our cleaning service specializes in maintaining the high standards expected by Domain 
                residents. We understand the unique needs of luxury living and provide consistent, 
                reliable service to over 250 households in the area.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.slice(0, 4).map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{feature.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>303-acre mixed-use development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Over 100 shops and restaurants</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>15+ luxury apartment communities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Home to major tech companies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Free parking throughout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Menus - Lazy Loaded */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Domain Cleaning Services</h2>
          <DomainServiceMenu />
          <div className="text-center mt-8">
            <Link 
              href="/booking"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Book Your Cleaning Today
            </Link>
          </div>
        </div>
      </section>

      {/* Properties We Serve - Lazy Loaded */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Domain Properties We Serve</h2>
          <DomainProperties />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Domain Residents Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.property}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Cleaner Home?</h2>
          <p className="text-xl mb-8">
            Join 250+ Domain residents who trust Aura Spring Cleaning for their homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Online Now
            </Link>
            <a 
              href="tel:5127810527"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              <Phone className="inline-block w-5 h-5 mr-2" />
              Call Valerie: (512) 781-0527
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}