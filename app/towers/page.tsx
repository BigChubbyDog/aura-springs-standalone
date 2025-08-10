import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Building2, 
  Users, 
  Star, 
  ChevronRight,
  Search,
  Filter,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { towerData } from '@/lib/towerData';

export const metadata: Metadata = {
  title: 'Luxury Tower Cleaning Services | Downtown Austin High-Rise Buildings',
  description: 'Professional cleaning services for Austin\'s premier luxury towers including The Quincy, 70 Rainey, The Independent, and more. Specialized high-rise condo cleaning near Rainey Street.',
  keywords: 'luxury tower cleaning Austin, high-rise condo cleaning, Rainey Street cleaning service, downtown Austin maid service, The Quincy cleaning, 70 Rainey cleaning, The Independent cleaning',
};

export default function TowersPage() {
  const towers = Object.values(towerData).sort((a, b) => b.residents - a.residents);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-aura-primary-50/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-aura-primary-600 to-aura-primary-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Luxury Tower Cleaning Services
            </h1>
            <p className="text-2xl mb-4">
              Serving Austin's Premier High-Rise Communities
            </p>
            <p className="text-lg max-w-3xl mx-auto mb-8 text-white/90">
              Specialized cleaning services for downtown Austin's most prestigious residential towers. 
              We understand the unique needs of high-rise living and deliver exceptional service to over 
              1,000 residents across 10+ luxury buildings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-aura-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
              >
                Book Your Cleaning
              </Link>
              <a
                href="tel:512-781-0527"
                className="bg-aura-primary-800 text-white px-8 py-4 rounded-lg hover:bg-aura-primary-900 transition-colors font-bold text-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (512) 781-0527
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-aura-primary-600">10+</div>
              <div className="text-gray-600">Luxury Towers Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-aura-primary-600">1,000+</div>
              <div className="text-gray-600">Happy Residents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-aura-primary-600">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-aura-primary-600">24/7</div>
              <div className="text-gray-600">Booking Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Towers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Our Service Buildings
              </h2>
              <p className="text-gray-600">
                Click on any building to see specific services and pricing
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-sm text-gray-500">
                Sorted by number of active customers
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {towers.map((tower) => (
              <Link
                key={tower.id}
                href={`/towers/${tower.id}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={tower.image}
                    alt={tower.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">
                      {tower.residents} Customers
                    </span>
                  </div>
                  {tower.id === 'the-quincy' && (
                    <div className="absolute top-4 right-4 bg-aura-primary-600 text-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-aura-primary-600 transition-colors">
                    {tower.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{tower.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{tower.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{tower.reviews} reviews</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{tower.distance}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {tower.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{tower.floors} floors</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{tower.units}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-aura-primary-600 font-semibold group-hover:text-aura-primary-700">
                      View Services & Pricing
                    </span>
                    <ChevronRight className="w-5 h-5 text-aura-primary-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Tower Residents Choose Aura Spring
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-aura-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-aura-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Building Expertise</h3>
              <p className="text-gray-600">
                We know each building's unique layouts, access requirements, and luxury finishes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-aura-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-aura-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted by Neighbors</h3>
              <p className="text-gray-600">
                Join hundreds of your neighbors who trust us with their luxury homes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-aura-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-aura-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Concierge Approved</h3>
              <p className="text-gray-600">
                Pre-approved by building management and concierge teams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-b from-white to-aura-primary-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Service Area Map
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We specialize in luxury towers within a 3-mile radius of Rainey Street, 
            covering all of downtown Austin's premier residential buildings
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-aura-primary-600 mx-auto mb-4" />
                <p className="text-gray-600">Interactive map showing all service locations</p>
                <p className="text-sm text-gray-500 mt-2">Downtown Austin • Rainey Street • East Austin • South Congress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-aura-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Premium Tower Cleaning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join over 1,000 satisfied residents across Austin's luxury towers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-white text-aura-primary-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
            >
              Book Your First Cleaning
            </Link>
            <a
              href="tel:512-781-0527"
              className="bg-aura-primary-700 text-white px-8 py-4 rounded-lg hover:bg-aura-primary-800 transition-colors font-bold text-lg flex items-center justify-center gap-2"
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