'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Building2, 
  Calendar, 
  Users, 
  Star, 
  CheckCircle,
  Phone,
  ArrowLeft,
  Home,
  Sparkles,
  Shield,
  Clock,
  DollarSign,
  Award,
  Wifi,
  Car,
  Trees,
  Dumbbell,
  Package,
  Coffee,
  ChevronRight
} from 'lucide-react';
import dynamic from 'next/dynamic';

const PricingCalculator = dynamic(() => import('@/components/PricingCalculator'));

export interface TowerData {
  id: string;
  name: string;
  address: string;
  distance: string;
  units: string;
  yearBuilt: string;
  floors: number;
  coordinates: { lat: number; lng: number };
  features: string[];
  amenities?: string[];
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  residents: number;
  reviews: number;
  rating: number;
  nearbyAttractions?: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  specialAccess?: string;
  parkingInfo?: string;
  petPolicy?: string;
  managementCompany?: string;
}

interface TowerPageTemplateProps {
  tower: TowerData;
}

const getAmenityIcon = (amenity: string) => {
  const iconMap: { [key: string]: any } = {
    'pool': <Wifi className="w-5 h-5" />,
    'gym': <Dumbbell className="w-5 h-5" />,
    'fitness': <Dumbbell className="w-5 h-5" />,
    'parking': <Car className="w-5 h-5" />,
    'park': <Trees className="w-5 h-5" />,
    'dog': <Trees className="w-5 h-5" />,
    'concierge': <Package className="w-5 h-5" />,
    'coffee': <Coffee className="w-5 h-5" />,
    'wifi': <Wifi className="w-5 h-5" />,
    'smart': <Home className="w-5 h-5" />,
  };
  
  const lowerAmenity = amenity.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerAmenity.includes(key)) return icon;
  }
  return <CheckCircle className="w-5 h-5" />;
};

export default function TowerPageTemplate({ tower }: TowerPageTemplateProps) {
  const [showPricing, setShowPricing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const allImages = [tower.image, ...(tower.gallery || [])];

  const pricingTiers = [
    {
      name: 'Studio/1BR',
      price: '$89-109',
      sqft: '400-800 sq ft',
      duration: '2-3 hours',
      features: [
        'Complete cleaning',
        'Kitchen & bathroom deep clean',
        'Vacuum & mop all floors',
        'Dust all surfaces',
        'Trash removal'
      ]
    },
    {
      name: '2BR',
      price: '$129-149',
      sqft: '800-1200 sq ft',
      duration: '3-4 hours',
      features: [
        'Everything in Studio/1BR',
        'Additional bedroom cleaning',
        'Balcony/patio cleaning',
        'Inside appliances',
        'Baseboards & windowsills'
      ],
      popular: true
    },
    {
      name: '3BR+',
      price: '$169+',
      sqft: '1200+ sq ft',
      duration: '4-5 hours',
      features: [
        'Everything in 2BR',
        'Multiple bathrooms',
        'Extended living areas',
        'Premium attention to detail',
        'Complimentary add-ons'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      unit: `${tower.name} Resident`,
      text: 'Aura Spring has been cleaning my condo for 6 months. They know the building well and always arrive on time.',
      rating: 5
    },
    {
      name: 'James L.',
      unit: 'Penthouse Suite',
      text: 'The team is professional and respects our building\'s security protocols. Highly recommend!',
      rating: 5
    },
    {
      name: 'Maria G.',
      unit: '2BR Unit',
      text: 'They handle my luxury finishes with care and always leave my place spotless.',
      rating: 5
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-aura-primary-50/20">
      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/towers"
              className="inline-flex items-center gap-2 text-aura-primary-600 hover:text-aura-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Towers
            </Link>
            <Link
              href="/booking"
              className="bg-aura-primary-600 text-white px-6 py-2 rounded-lg hover:bg-aura-primary-700 transition-colors"
            >
              Book Cleaning
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={allImages[selectedImage]}
                  alt={tower.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-900">
                    {tower.residents} Active Customers
                  </span>
                </div>
              </div>
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === idx ? 'ring-2 ring-aura-primary-600' : ''
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${tower.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tower Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{tower.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{tower.address}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{tower.rating}</span>
                    <span className="text-gray-600">({tower.reviews} reviews)</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{tower.distance}</span>
                </div>
              </div>

              <p className="text-lg text-gray-700">{tower.longDescription}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Building2 className="w-6 h-6 text-aura-primary-600 mb-2" />
                  <p className="text-sm text-gray-600">Building Info</p>
                  <p className="font-semibold">{tower.floors} Floors • {tower.units}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Calendar className="w-6 h-6 text-aura-primary-600 mb-2" />
                  <p className="text-sm text-gray-600">Established</p>
                  <p className="font-semibold">Built in {tower.yearBuilt}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-aura-primary-600 mb-2" />
                  <p className="text-sm text-gray-600">Our Presence</p>
                  <p className="font-semibold">{tower.residents} Active Clients</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Award className="w-6 h-6 text-aura-primary-600 mb-2" />
                  <p className="text-sm text-gray-600">Service Rating</p>
                  <p className="font-semibold">{tower.rating}/5.0 Stars</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowPricing(true)}
                  className="flex-1 bg-aura-primary-600 text-white px-6 py-3 rounded-lg hover:bg-aura-primary-700 transition-colors font-semibold"
                >
                  Get Instant Quote
                </button>
                <a
                  href="tel:512-781-0527"
                  className="flex-1 border-2 border-aura-primary-600 text-aura-primary-600 px-6 py-3 rounded-lg hover:bg-aura-primary-50 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building Features & Amenities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Building Features & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tower.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {getAmenityIcon(feature)}
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
            {tower.amenities?.map((amenity, index) => (
              <div key={`amenity-${index}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {getAmenityIcon(amenity)}
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>

          {/* Special Access Information */}
          {(tower.specialAccess || tower.parkingInfo || tower.petPolicy) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {tower.specialAccess && (
                <div className="bg-aura-primary-50 p-6 rounded-lg">
                  <Shield className="w-8 h-8 text-aura-primary-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Building Access</h3>
                  <p className="text-gray-700">{tower.specialAccess}</p>
                </div>
              )}
              {tower.parkingInfo && (
                <div className="bg-aura-primary-50 p-6 rounded-lg">
                  <Car className="w-8 h-8 text-aura-primary-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Parking</h3>
                  <p className="text-gray-700">{tower.parkingInfo}</p>
                </div>
              )}
              {tower.petPolicy && (
                <div className="bg-aura-primary-50 p-6 rounded-lg">
                  <Trees className="w-8 h-8 text-aura-primary-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Pet Policy</h3>
                  <p className="text-gray-700">{tower.petPolicy}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-b from-white to-aura-primary-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cleaning Services for {tower.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored cleaning packages designed specifically for {tower.name} layouts and finishes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-xl p-8 ${
                  tier.popular ? 'ring-2 ring-aura-primary-600 relative' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-aura-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-4">{tier.sqft}</p>
                <div className="text-4xl font-bold text-aura-primary-600 mb-2">{tier.price}</div>
                <p className="text-gray-600 mb-6">Estimated {tier.duration}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className="block w-full text-center bg-aura-primary-600 text-white py-3 rounded-lg hover:bg-aura-primary-700 transition-colors font-semibold"
                >
                  Book This Package
                </Link>
              </div>
            ))}
          </div>

          {showPricing && (
            <div className="mt-8">
              <PricingCalculator />
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What {tower.name} Residents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      {tower.nearbyAttractions && tower.nearbyAttractions.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-white to-aura-primary-50/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nearby Attractions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tower.nearbyAttractions.map((attraction, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow">
                  <MapPin className="w-5 h-5 text-aura-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{attraction.name}</h3>
                    <p className="text-sm text-gray-600">{attraction.type} • {attraction.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-aura-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Premium Cleaning at {tower.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join {tower.residents} other residents who trust Aura Spring Cleaning
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
              (512) 781-0527
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}