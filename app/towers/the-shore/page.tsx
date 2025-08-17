import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Building2, Clock, Shield, Star, Phone, MapPin, CheckCircle, Calendar, DollarSign, Users, Waves } from 'lucide-react';

const PricingCalculator = dynamic(() => import('@/components/PricingCalculator'));
const EmailCapture = dynamic(() => import('@/components/EmailCapture'));

export const metadata: Metadata = {
  title: 'The Shore Condos Cleaning Service | Lady Bird Lake Living | Aura Spring',
  description: 'Professional cleaning for The Shore residents. Lakeside luxury deserves premium cleaning. Airbnb turnovers, deep cleaning, eco-friendly service.',
  keywords: 'The Shore cleaning, Lady Bird Lake condos cleaning, Austin waterfront cleaning service',
};

const towerInfo = {
  name: 'The Shore',
  address: '603 Davis St, Austin, TX 78701',
  units: 100,
  floors: 24,
  built: 2016,
  amenities: ['Infinity Edge Pool', 'Private Marina', 'Fitness Center', 'Dog Park', 'Kayak Storage'],
  nearbyAttractions: ['Lady Bird Lake', 'Rainey Street', 'Austin Rowing Club', 'Trail Access'],
  walkScore: 89,
  transitScore: 48,
  bikeScore: 96,
};

export default function TheShorePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-8 w-8" />
              <span className="text-lg font-semibold">Lakeside Luxury Living</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">The Shore Cleaning Service</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Premium cleaning for waterfront living. Your lakeside sanctuary deserves the finest care, 
              from Lady Bird Lake views to pristine interiors.
            </p>
            <div className="flex gap-4">
              <Link href="/booking">
                <button className="bg-white text-[#7c9768] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                  Book Now - Shore Resident Discount
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
              <div className="text-3xl font-bold text-[#7c9768]">100</div>
              <div className="text-gray-600">Waterfront Units</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">24</div>
              <div className="text-gray-600">Floors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">40+</div>
              <div className="text-gray-600">Units Serviced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">96</div>
              <div className="text-gray-600">Bike Score</div>
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
          <h2 className="text-3xl font-bold text-center mb-12">Cleaning Services for The Shore</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Building2 className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Lakeside Living Clean</h3>
              <p className="text-gray-600 mb-4">Regular maintenance for your waterfront home</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$155-$235</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Window & glass care</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Balcony cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Humidity control focus</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 ring-2 ring-[#7c9768]">
              <Clock className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Weekend Warrior Special</h3>
              <p className="text-gray-600 mb-4">Perfect for your active lakeside lifestyle</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$135</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">After-weekend refresh</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Sports equipment care</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Pet-friendly service</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <Shield className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Seasonal Deep Clean</h3>
              <p className="text-gray-600 mb-4">Combat Austin's elements thoroughly</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$235-$335</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Pollen removal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Air vent cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Detailed sanitization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lake Living Features */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Specialized Care for Lakeside Living</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Waterfront Challenges We Handle</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Waves className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Humidity & Moisture Control</p>
                    <p className="text-sm text-gray-600">Prevent mold and mildew in lakeside conditions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold">Pollen & Outdoor Elements</p>
                    <p className="text-sm text-gray-600">Extra attention during Austin's allergy seasons</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold">Window & Glass Maintenance</p>
                    <p className="text-sm text-gray-600">Keep your lake views crystal clear</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Shore Amenities We Know</h3>
              <ul className="space-y-3">
                {towerInfo.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#7c9768]" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-[#7c9768]/10 rounded-lg">
                <p className="font-semibold">Perfect Location:</p>
                <p className="text-sm mt-2">Direct trail access for running & biking</p>
                <p className="text-sm">Walking distance to Rainey Street</p>
                <p className="text-sm">Marina access for water activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shore Residents Love Aura</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Living by the lake means extra dust and pollen. Aura keeps my condo spotless despite the challenges!"</p>
              <p className="font-semibold">- David, 18th Floor</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"They're perfect for my weekend rental. Quick turnaround and guests love how fresh everything feels."</p>
              <p className="font-semibold">- Lisa, 12th Floor</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"After morning runs on the trail, it's amazing to come home to a perfectly clean space. Highly recommend!"</p>
              <p className="font-semibold">- Ryan, 20th Floor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get Your Shore Condo Quote</h2>
          <PricingCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Lakeside Clean Living</h2>
          <p className="text-xl mb-8">Join 40+ Shore residents who trust Aura with their waterfront homes</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <button className="px-8 py-3 bg-white text-[#7c9768] font-bold rounded-lg hover:scale-105 transition-transform">
                Book Your First Clean - Save 20%
              </button>
            </Link>
            <a href="tel:512-781-0527" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call for Same-Day Service
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}