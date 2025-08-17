import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Building2, Clock, Shield, Star, Phone, MapPin, CheckCircle, Calendar, DollarSign, Users } from 'lucide-react';

const BookingWidget = dynamic(() => import('@/components/booking/BookingWidget'));
const EmailCapture = dynamic(() => import('@/components/EmailCapture'));

export const metadata: Metadata = {
  title: '70 Rainey Cleaning Service | Airbnb & Residential | Aura Spring Cleaning',
  description: 'Professional cleaning service for 70 Rainey Street residents and Airbnb hosts. 2-hour turnaround, eco-friendly, tower-specific expertise. Book online or call (512) 781-0527.',
  keywords: '70 Rainey cleaning, 70 Rainey Airbnb cleaning, Rainey Street tower cleaning, Austin high-rise cleaning service',
  openGraph: {
    title: '70 Rainey Street Cleaning Service - Aura Spring Cleaning',
    description: 'Specialized cleaning for 70 Rainey residents. Same-day service, Airbnb turnovers, deep cleaning.',
    images: ['/images/70-rainey-cleaning.jpg'],
  },
};

// Tower-specific data
const towerInfo = {
  name: '70 Rainey',
  address: '70 Rainey St, Austin, TX 78701',
  units: 164,
  floors: 34,
  built: 2016,
  amenities: ['Rooftop Pool', 'Fitness Center', 'Business Center', 'Pet Spa'],
  nearbyAttractions: ['Rainey Street Historic District', 'Lady Bird Lake', 'Downtown Austin'],
  walkScore: 91,
  transitScore: 52,
  bikeScore: 89,
};

const services = [
  {
    title: 'Residential Cleaning',
    price: '$150-$225',
    features: ['Weekly/Biweekly/Monthly', 'Same cleaner request', 'Eco-friendly products', 'Pet-friendly'],
    icon: Building2,
  },
  {
    title: 'Airbnb Turnover',
    price: '$135',
    features: ['2-hour turnaround', 'Linen service available', 'Restocking supplies', 'Photo documentation'],
    icon: Clock,
    popular: true,
  },
  {
    title: 'Move In/Out',
    price: '$250',
    features: ['Deep clean all surfaces', 'Inside appliances', 'Cabinet cleaning', 'Carpet shampooing available'],
    icon: Calendar,
  },
  {
    title: 'Deep Cleaning',
    price: '$225',
    features: ['Quarterly recommended', 'Baseboards & blinds', 'Light fixtures', 'Detailed sanitization'],
    icon: Star,
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    unit: '70 Rainey Resident',
    text: 'Best cleaning service in the building! They know exactly how to handle our floor-to-ceiling windows and modern fixtures.',
    rating: 5,
  },
  {
    name: 'Mike D.',
    unit: 'Airbnb Superhost',
    text: 'Aura Spring has cleaned my 70 Rainey Airbnb over 100 times. Never missed a turnover, always 5-star reviews from guests.',
    rating: 5,
  },
  {
    name: 'Jennifer L.',
    unit: 'Penthouse Owner',
    text: 'They understand luxury. My 2-bedroom penthouse has never looked better. Worth every penny!',
    rating: 5,
  },
];

export default function SeventyRaineyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                70 Rainey Street
                <span className="block text-[#e1e9d9] text-2xl mt-2">Professional Cleaning Service</span>
              </h1>
              <p className="text-xl text-[#e1e9d9] mb-6">
                Trusted by residents and Airbnb hosts in Austin's premier Rainey Street tower.
                Expert cleaning for modern high-rise living.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Tower Specialist Since 2016</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Insured & Bonded</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>4.9★ Rating</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/booking?tower=70-rainey"
                  className="px-8 py-3 bg-white text-[#7c9768] font-bold rounded-lg hover:shadow-xl transition-all text-center"
                >
                  Book Online - 60 Seconds
                </Link>
                <a
                  href="tel:512-781-0527"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  (512) 781-0527
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Quote Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Unit Type</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur text-white">
                    <option>Studio (600-800 sqft) - $150</option>
                    <option>1 Bedroom (800-1000 sqft) - $150</option>
                    <option>2 Bedroom (1200-1500 sqft) - $175</option>
                    <option>2 Bed + Den (1500-1800 sqft) - $200</option>
                    <option>3 Bedroom (2000+ sqft) - $225</option>
                    <option>Penthouse (2500+ sqft) - $275+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Service Type</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur text-white">
                    <option>Standard Cleaning</option>
                    <option>Deep Cleaning (+50%)</option>
                    <option>Move In/Out (+67%)</option>
                    <option>Airbnb Turnover (-10%)</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-[#e1e9d9] text-[#4c673d] font-bold rounded-lg hover:bg-white transition-all">
                  Get Instant Quote →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tower Info Bar */}
      <section className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#7c9768]" />
              <span className="text-gray-600">{towerInfo.address}</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <span>{towerInfo.units} Units</span>
              <span>{towerInfo.floors} Floors</span>
              <span>Walk Score: {towerInfo.walkScore}</span>
              <span>Built: {towerInfo.built}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cleaning Services for 70 Rainey Residents
            </h2>
            <p className="text-xl text-gray-600">
              Specialized service for your modern high-rise home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 ${
                  service.popular ? 'ring-2 ring-[#7c9768]' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-[#7c9768] text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="w-12 h-12 bg-[#7c9768]/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-[#7c9768]" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-2xl font-bold text-[#7c9768] mb-4">{service.price}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#7c9768] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why 70 Rainey Residents Choose Aura Spring
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#7c9768]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-[#7c9768]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tower Expertise</h3>
                    <p className="text-gray-600">We know 70 Rainey's unique features: floor-to-ceiling windows, modern fixtures, and building requirements.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#7c9768]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#7c9768]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Trusted by Your Neighbors</h3>
                    <p className="text-gray-600">Over 50 residents and Airbnb hosts in your building trust us for regular cleaning.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#7c9768]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#7c9768]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Flexible Scheduling</h3>
                    <p className="text-gray-600">Same-day service, evening appointments, and weekend availability for your convenience.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#7c9768]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-[#7c9768]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tower Resident Pricing</h3>
                    <p className="text-gray-600">Special rates for 70 Rainey residents. Save 15% with bi-weekly service.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <BookingWidget 
                defaultService="standard"
                defaultLocation="70 Rainey"
                towerResident={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What Your Neighbors Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7c9768] to-[#4c673d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Your 70 Rainey Neighbors
          </h2>
          <p className="text-xl text-[#e1e9d9] mb-8">
            Get your first cleaning for 20% off. Same-day availability!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking?tower=70-rainey&discount=TOWER20"
              className="px-8 py-3 bg-white text-[#7c9768] font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              Book Now - Get 20% Off
            </Link>
            <a
              href="tel:512-781-0527"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Call (512) 781-0527
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}