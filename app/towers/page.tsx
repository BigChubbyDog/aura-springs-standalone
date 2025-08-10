import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, MapPin, Star, Shield, Clock, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Austin High-Rise & Luxury Tower Cleaning Services | Rainey Street District',
  description: 'Premium cleaning services for Austin\'s luxury towers near Rainey Street. Serving The Quincy, 70 Rainey, The Shore, The Independent & more. Licensed, insured, 5-star rated.',
  keywords: 'Rainey Street cleaning service, Austin high-rise cleaning, luxury tower cleaning Austin, downtown Austin maid service, The Quincy cleaning, 70 Rainey cleaning service, The Shore cleaning, The Independent cleaning service',
  openGraph: {
    title: 'Luxury Tower Cleaning Services - Rainey Street District Austin',
    description: 'Specialized cleaning for Austin\'s premier high-rise residences. Same-day service, eco-friendly, trusted by 500+ tower residents.',
    images: ['/images/austin-skyline-towers.jpg'],
  },
};

// Tower data with SEO-optimized information
const towers = [
  {
    id: 'the-quincy',
    name: 'The Quincy',
    address: '215 East 6th Street, Austin, TX 78701',
    distance: '0.8 miles from Rainey St',
    units: '200+ luxury units',
    features: ['Concierge Service', 'Rooftop Pool', 'Floor-to-ceiling Windows', 'Premium Finishes'],
    description: 'Premier luxury living in the heart of downtown Austin with panoramic city views.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200',
  },
  {
    id: '70-rainey',
    name: '70 Rainey',
    address: '70 Rainey Street, Austin, TX 78701',
    distance: 'On Rainey Street',
    units: '164 luxury residences',
    features: ['Rainey Street Location', 'Resort-style Pool', 'Private Balconies', 'Smart Home Technology'],
    description: 'Iconic Rainey Street address with unparalleled amenities and walkable lifestyle.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
  },
  {
    id: 'the-shore',
    name: 'The Shore',
    address: '603 Davis Street, Austin, TX 78701',
    distance: '0.3 miles from Rainey St',
    units: '165 condominiums',
    features: ['Lady Bird Lake Views', 'Private Marina', 'Infinity Pool', 'Wellness Center'],
    description: 'Waterfront luxury living with direct access to Lady Bird Lake and trails.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
  },
  {
    id: 'millenium-rainey',
    name: 'The Millenium Rainey',
    address: '91 Rainey Street, Austin, TX 78701',
    distance: 'On Rainey Street',
    units: '300+ residences',
    features: ['Rainey Street Hub', 'Sky Lounge', 'Pet Spa', 'Co-working Spaces'],
    description: 'Modern tower living at the epicenter of Austin\'s entertainment district.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
  },
  {
    id: '44-east-ave',
    name: '44 East Ave',
    address: '44 East Avenue, Austin, TX 78701',
    distance: '0.5 miles from Rainey St',
    units: '180 luxury condos',
    features: ['Butler Trail Access', 'Panoramic Views', 'Wine Storage', 'Guest Suites'],
    description: 'Sophisticated urban living with immediate access to Austin\'s outdoor lifestyle.',
    image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=1200',
  },
  {
    id: 'the-independent',
    name: 'The Independent',
    address: '301 West Avenue, Austin, TX 78701',
    distance: '0.9 miles from Rainey St',
    units: '370 residences',
    features: ['Tallest in Austin', '360° Views', 'Private Theater', 'Luxury Amenities'],
    description: 'Austin\'s tallest residential tower with unmatched views and amenities.',
    image: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=1200',
  },
  {
    id: 'the-austonian',
    name: 'The Austonian',
    address: '200 Congress Avenue, Austin, TX 78701',
    distance: '1.1 miles from Rainey St',
    units: '178 luxury residences',
    features: ['Congress Avenue', 'Spa & Fitness', 'Wine Cellar', 'Concierge'],
    description: 'Iconic Congress Avenue address with world-class services and amenities.',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200',
  },
  {
    id: 'four-seasons-residences',
    name: 'Four Seasons Residences',
    address: '98 San Jacinto Blvd, Austin, TX 78701',
    distance: '0.7 miles from Rainey St',
    units: '145 luxury residences',
    features: ['Four Seasons Services', 'Lake Views', 'Hotel Amenities', 'Room Service'],
    description: 'Five-star living with Four Seasons hotel services and amenities.',
    image: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1200',
  },
];

export default function TowersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Luxury Tower Cleaning Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-2">
              Rainey Street District & Downtown Austin
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Specialized cleaning services for Austin's premier high-rise residences. 
              Trusted by 500+ tower residents. Licensed, insured, and eco-friendly.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9 Rating (500+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Same-Day Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA Bar */}
      <section className="bg-sage-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Tower Resident? Get 20% Off Your First Clean!</span>
            </div>
            <div className="flex gap-4">
              <a
                href="tel:512-781-0527"
                className="px-6 py-2 bg-white text-sage-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Call (512) 781-0527
              </a>
              <Link
                href="/booking"
                className="px-6 py-2 bg-sage-700 text-white font-semibold rounded-lg hover:bg-sage-800 transition-colors"
              >
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Towers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Towers We Service Near Rainey Street
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Click on any tower to learn about our specialized cleaning services for your building
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {towers.map((tower) => (
              <Link
                key={tower.id}
                href={`/towers/${tower.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={tower.image}
                    alt={`${tower.name} - Luxury Tower in Austin`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{tower.name}</h3>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tower.distance}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{tower.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Address:</span> {tower.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Size:</span> {tower.units}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tower.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-sage-50 text-sage-700 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services for Tower Residents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Specialized Services for High-Rise Living
            </h2>
            <p className="text-lg text-gray-600">
              Tailored cleaning solutions for the unique needs of tower residents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Floor-to-Ceiling Window Cleaning
              </h3>
              <p className="text-gray-600">
                Preserve your million-dollar views with streak-free window cleaning, including tracks and sills.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Balcony & Terrace Detailing
              </h3>
              <p className="text-gray-600">
                Deep clean outdoor spaces, furniture, and glass railings to maximize your outdoor living area.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Move-In/Move-Out Specialist
              </h3>
              <p className="text-gray-600">
                Complete deep cleaning for tower units, ensuring deposit returns and pristine move-in conditions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Eco-Friendly Products Only
              </h3>
              <p className="text-gray-600">
                Safe for sealed environments with limited ventilation. No harsh chemicals or strong odors.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600">
                Work with concierge for access. Evening and weekend appointments available.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                White Glove Service
              </h3>
              <p className="text-gray-600">
                Attention to luxury finishes, smart home devices, and high-end appliances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sage-600 to-sage-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Luxury Cleaning Service?
          </h2>
          <p className="text-xl text-sage-100 mb-8">
            Join 500+ satisfied tower residents. Get 20% off your first cleaning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="px-8 py-3 bg-white text-sage-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300"
            >
              Book Online Now
            </Link>
            <a
              href="tel:512-781-0527"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Call (512) 781-0527
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}