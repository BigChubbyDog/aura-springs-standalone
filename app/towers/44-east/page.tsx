import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Building2, Clock, Shield, Star, Phone, MapPin, CheckCircle, Calendar, DollarSign, Users } from 'lucide-react';

const PricingCalculator = dynamic(() => import('@/components/PricingCalculator'));
const EmailCapture = dynamic(() => import('@/components/EmailCapture'));

export const metadata: Metadata = {
  title: '44 East Ave Cleaning Service | Luxury Downtown Austin | Aura Spring',
  description: 'Professional cleaning for 44 East Ave residents. Premier downtown Austin address with premium cleaning service. Airbnb turnovers, deep cleaning, eco-friendly.',
  keywords: '44 East Ave cleaning, downtown Austin luxury cleaning, Rainey Street area cleaning',
};

const towerInfo = {
  name: '44 East Ave',
  address: '44 East Ave, Austin, TX 78701',
  units: 200,
  floors: 32,
  built: 2017,
  amenities: ['Rooftop Pool & Lounge', 'Fitness Center', 'Pet Grooming Station', 'Wine Storage', 'Guest Suites'],
  nearbyAttractions: ['Rainey Street', 'Convention Center', 'Lady Bird Lake Trail'],
  walkScore: 94,
  transitScore: 58,
  bikeScore: 92,
};

export default function FortyFourEastPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8" />
              <span className="text-lg font-semibold">Luxury Downtown Living</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">44 East Ave Cleaning Service</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Exceptional cleaning for one of Austin's most prestigious addresses. Steps from Rainey Street, 
              your luxury home deserves luxury service.
            </p>
            <div className="flex gap-4">
              <Link href="/booking">
                <button className="bg-white text-[#7c9768] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                  Book Now - Resident Discount
                </button>
              </Link>
              <a href="tel:512-781-0527" className="bg-[#7c9768]/20 backdrop-blur text-white px-8 py-3 rounded-lg font-bold hover:bg-[#7c9768]/30 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                (512) 781-0527
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tower Stats */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">200+</div>
              <div className="text-gray-600">Premium Units</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">32</div>
              <div className="text-gray-600">Floors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">75+</div>
              <div className="text-gray-600">Units Serviced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">Same</div>
              <div className="text-gray-600">Day Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">5★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tailored Services for 44 East Ave</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Building2 className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Regular Cleaning</h3>
              <p className="text-gray-600 mb-4">Maintain your luxury space pristinely</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$160-$250</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Weekly/Biweekly service</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Dedicated team</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Eco-friendly products</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 ring-2 ring-[#7c9768]">
              <Clock className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Airbnb Service</h3>
              <p className="text-gray-600 mb-4">Perfect turnovers for your rental</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$135</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">2-hour guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Weekend availability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Guest supplies check</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <Shield className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Deep Clean</h3>
              <p className="text-gray-600 mb-4">Complete refresh for your home</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$240-$350</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">All surfaces detailed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Appliances inside & out</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Window cleaning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Building Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why 44 East Ave Residents Choose Aura</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Building Amenities We Service</h3>
              <ul className="space-y-3">
                {towerInfo.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#7c9768]" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-[#7c9768]/10 rounded-lg">
                <p className="font-semibold">Location Benefits:</p>
                <p className="text-sm mt-2">Walk Score: {towerInfo.walkScore} - Walker's Paradise</p>
                <p className="text-sm">Bike Score: {towerInfo.bikeScore} - Very Bikeable</p>
                <p className="text-sm">Steps from Rainey Street entertainment</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Our 44 East Ave Promise</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <p className="font-semibold">Building Knowledge</p>
                    <p className="text-sm text-gray-600">We know your floor plans and premium finishes</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Flexible Scheduling</p>
                    <p className="text-sm text-gray-600">Work around your downtown lifestyle</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold">Neighbor Approved</p>
                    <p className="text-sm text-gray-600">Trusted by 75+ units in your building</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold">Fully Insured</p>
                    <p className="text-sm text-gray-600">$2M liability coverage for peace of mind</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Your Neighbors Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Aura has been cleaning my 44 East condo for 2 years. They're always on time and do an amazing job with my floor-to-ceiling windows!"</p>
              <p className="font-semibold">- Jennifer, 28th Floor</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Perfect for my Airbnb. They handle turnovers flawlessly and my guests always comment on how clean everything is."</p>
              <p className="font-semibold">- Mark, 15th Floor</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"The team knows exactly how to care for our luxury finishes. Worth every penny for the peace of mind."</p>
              <p className="font-semibold">- Sarah, Penthouse</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Calculate Your 44 East Ave Quote</h2>
          <PricingCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Your 44 East Ave Neighbors</h2>
          <p className="text-xl mb-8">Experience why we're the preferred cleaning service for your building</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <button className="px-8 py-3 bg-white text-[#7c9768] font-bold rounded-lg hover:scale-105 transition-transform">
                Book Now - Resident Special
              </button>
            </Link>
            <a href="tel:512-781-0527" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call Valerie Directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}