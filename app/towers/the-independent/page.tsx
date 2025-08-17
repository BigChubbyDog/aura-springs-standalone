import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Building2, Clock, Shield, Star, Phone, MapPin, CheckCircle, Calendar, DollarSign, Users } from 'lucide-react';

const PricingCalculator = dynamic(() => import('@/components/PricingCalculator'));
const EmailCapture = dynamic(() => import('@/components/EmailCapture'));

export const metadata: Metadata = {
  title: 'The Independent Cleaning Service | Austin\'s Tallest Tower | Aura Spring',
  description: 'Professional cleaning for The Independent residents. Austin\'s tallest residential tower deserves premium cleaning. Airbnb turnovers, deep cleaning, same-day service.',
  keywords: 'The Independent cleaning, Austin tallest building cleaning, downtown Austin luxury cleaning',
};

const towerInfo = {
  name: 'The Independent',
  address: '301 West Ave, Austin, TX 78701',
  units: 370,
  floors: 58,
  built: 2019,
  height: '690 feet - Austin\'s tallest residential building',
  amenities: ['Infinity Pool', 'Sky Lounge', 'Private Theater', 'Dog Park', 'Concierge'],
  nearbyAttractions: ['2nd Street District', 'Whole Foods HQ', 'Seaholm District'],
  walkScore: 97,
  transitScore: 62,
  bikeScore: 95,
};

export default function TheIndependentPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8" />
              <span className="text-lg font-semibold">Austin's Tallest Tower</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">The Independent Cleaning Service</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Premium cleaning for Austin's most prestigious address. 58 floors of excellence deserve 
              exceptional service. Trusted by 100+ Independent residents.
            </p>
            <div className="flex gap-4">
              <Link href="/booking">
                <button className="bg-white text-[#7c9768] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                  Book Now - 20% Off First Clean
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
              <div className="text-3xl font-bold text-[#7c9768]">370</div>
              <div className="text-gray-600">Luxury Units</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">58</div>
              <div className="text-gray-600">Floors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">100+</div>
              <div className="text-gray-600">Happy Residents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">2hr</div>
              <div className="text-gray-600">Turnaround</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7c9768]">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Services for Independent Residents</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Building2 className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Luxury Condo Cleaning</h3>
              <p className="text-gray-600 mb-4">Regular maintenance for your sky-high home</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$175-$300</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Floor-to-ceiling windows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Premium finishes care</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Balcony cleaning</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 ring-2 ring-[#7c9768]">
              <Clock className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Airbnb Turnover</h3>
              <p className="text-gray-600 mb-4">Quick turnaround for your investment property</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$150</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">2-hour turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Linen service</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">5-star ready</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <Shield className="h-8 w-8 text-[#7c9768] mb-4" />
              <h3 className="text-xl font-bold mb-2">Deep Cleaning</h3>
              <p className="text-gray-600 mb-4">Thorough seasonal refresh for your unit</p>
              <p className="text-2xl font-bold text-[#7c9768] mb-4">$250-$400</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Inside appliances</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Light fixtures</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Baseboards & vents</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Building Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About The Independent</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Building Features</h3>
              <ul className="space-y-3">
                {towerInfo.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#7c9768]" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-[#7c9768]/10 rounded-lg">
                <p className="font-semibold">Building Stats:</p>
                <p className="text-sm mt-2">{towerInfo.floors} floors | {towerInfo.units} units</p>
                <p className="text-sm">{towerInfo.height}</p>
                <p className="text-sm">Walk Score: {towerInfo.walkScore} | Transit: {towerInfo.transitScore}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Why Choose Aura for The Independent?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <p className="font-semibold">Tower Expertise</p>
                    <p className="text-sm text-gray-600">We know The Independent's unique layouts and finishes</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold">Building Approved</p>
                    <p className="text-sm text-gray-600">Fully insured and approved by management</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Resident Referrals</p>
                    <p className="text-sm text-gray-600">Recommended by your neighbors</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get Your Instant Quote</h2>
          <PricingCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 100+ Independent Residents</h2>
          <p className="text-xl mb-8">Experience the Aura difference in Austin's tallest tower</p>
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