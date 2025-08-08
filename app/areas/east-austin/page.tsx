'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Zap, 
  MapPin, 
  Star,
  Clock,
  Phone,
  Calendar,
  CheckCircle,
  Sparkles,
  Home,
  Users,
  Shield,
  Award,
  DollarSign,
  Utensils,
  Palette,
  TreePine,
  Building,
  Coffee,
  Heart,
  Eye,
  Target,
  TrendingUp,
  Hammer
} from 'lucide-react';

const EastAustinPage = () => {
  const serviceMenus = [
    {
      title: 'Modern Loft Cleaning',
      icon: Building,
      frequency: 'Weekly, Bi-weekly, Monthly',
      duration: '2-4 hours',
      pricing: '$140-300',
      description: 'Contemporary cleaning for East Austin\'s trendy lofts and modern condos',
      includes: [
        'Open-concept space cleaning: Efficient cleaning of large, flowing floor plans',
        'Industrial fixture care: Gentle cleaning of exposed brick, concrete, and metal',
        'Modern appliance maintenance: Stainless steel, smart home devices, tech integration',
        'Minimalist organization: Maintaining clean lines and uncluttered spaces',
        'Floor-to-ceiling windows: Complete window cleaning for maximum natural light',
        'Urban dust management: Extra attention to city dust and pollution',
        'Flexible layout cleaning: Adapt to changing furniture arrangements',
        'Tech-friendly cleaning: Safe around computers, smart home systems, and electronics'
      ]
    },
    {
      title: 'Food Truck & Restaurant',
      icon: Utensils,
      frequency: 'Daily or Weekly',
      duration: '2-5 hours',
      pricing: '$150-400',
      description: 'Commercial cleaning for East Austin\'s vibrant food scene',
      includes: [
        'Kitchen deep cleaning: Grease removal, equipment sanitizing, food prep areas',
        'Dining area maintenance: Tables, chairs, floors cleaned between service',
        'Food truck exterior: Cleaning service windows, customer areas, equipment',
        'Health department compliance: Meeting all restaurant cleanliness standards',
        'Hood and ventilation cleaning: Grease trap and exhaust system maintenance',
        'Floor care: Non-slip cleaning for kitchen and dining areas',
        'Trash and recycling: Complete waste management and area sanitization',
        'After-hours cleaning: Work around business hours for minimal disruption'
      ]
    },
    {
      title: 'Artist Studio & Gallery',
      icon: Palette,
      frequency: 'Weekly or Bi-weekly',
      duration: '2-4 hours',
      pricing: '$120-250',
      description: 'Specialized cleaning for creative spaces and art galleries',
      includes: [
        'Dust-sensitive cleaning: Protecting artwork and materials from dust damage',
        'Paint-safe products: Cleaners that won\'t affect paint, canvas, or art supplies',
        'Studio organization: Careful arrangement of brushes, paints, and equipment',
        'Gallery preparation: White-glove cleaning for exhibitions and openings',
        'Floor protection: Paint-splatter cleaning and protective treatments',
        'Ventilation cleaning: Maintaining air quality in creative spaces',
        'Installation support: Clean spaces before and after art installations',
        'Creative storage: Organized cleaning of supply closets and storage areas'
      ]
    },
    {
      title: 'Historic Renovation Cleanup',
      icon: Hammer,
      frequency: 'Project-based',
      duration: '4-10 hours',
      pricing: '$300-700',
      description: 'Specialized cleaning for East Austin\'s ongoing renovation projects',
      includes: [
        'Renovation dust removal: Complete elimination of construction dust',
        'Historic material care: Safe cleaning of original wood, brick, and fixtures',
        'New construction integration: Cleaning where old meets new architecture',
        'Paint and debris cleanup: Removal of construction materials and overspray',
        'Floor restoration prep: Deep cleaning before refinishing hardwoods',
        'Window restoration: Cleaning original windows and new installations',
        'HVAC system cleaning: Removing construction dust from air systems',
        'Final walkthrough: Move-in ready preparation with quality guarantee'
      ]
    },
    {
      title: 'Airbnb & Short-term Rentals',
      icon: Star,
      frequency: 'Between Guests',
      duration: '2-3 hours',
      pricing: '$100-180',
      description: 'Quick turnovers for East Austin vacation rentals and investment properties',
      includes: [
        'Rapid reset service: Complete cleaning and staging between guests',
        'Neighborhood guide setup: East Austin restaurant and attraction recommendations',
        'Social media staging: Instagram-worthy presentation for guest photos',
        'Local business support: Stock local coffee, snacks, and Austin favorites',
        'Urban lifestyle prep: Clean and organize for city-style living',
        'Review optimization: Attention to details that earn 5-star ratings',
        'Same-day turnaround: Fast service for back-to-back bookings',
        'Quality assurance: Final inspection and guest-ready certification'
      ]
    },
    {
      title: 'New Development Cleaning',
      icon: TrendingUp,
      frequency: 'One-time or Monthly',
      duration: '3-8 hours',
      pricing: '$200-500',
      description: 'Cleaning for East Austin\'s new residential and mixed-use developments',
      includes: [
        'Brand new property cleaning: Final construction cleanup and detailing',
        'Model unit preparation: Show-ready cleaning for sales presentations',
        'Common area maintenance: Lobby, mailroom, and shared space cleaning',
        'Move-in preparation: New resident welcome cleaning services',
        'Development coordination: Working with property management and leasing',
        'Amenity space cleaning: Gym, pool, rooftop, and community areas',
        'Parking garage maintenance: Cleaning of covered and uncovered areas',
        'Ongoing maintenance: Regular cleaning contracts for new developments'
      ]
    }
  ];

  const eastAustinSpots = [
    {
      name: 'Modern Lofts',
      type: 'Contemporary Living',
      area: 'East 6th Street',
      specialty: 'Industrial-chic cleaning',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000'
    },
    {
      name: 'Food Truck Lots',
      type: 'Culinary Destinations',
      area: 'E 5th & E 6th',
      specialty: 'Commercial kitchen cleaning',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2000'
    },
    {
      name: 'Art Galleries',
      type: 'Creative Spaces',
      area: 'E Austin Studio Tour',
      specialty: 'Gallery-grade cleaning',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2000'
    },
    {
      name: 'New Developments',
      type: 'Mixed-use Buildings',
      area: 'East Cesar Chavez',
      specialty: 'Development cleaning',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000'
    }
  ];

  const eastAustinFeatures = [
    {
      icon: TrendingUp,
      title: 'Growth Area Specialists',
      description: 'Expertise in new developments and rapid neighborhood changes'
    },
    {
      icon: Utensils,
      title: 'Food Scene Support',
      description: 'Commercial cleaning for restaurants and food truck operations'
    },
    {
      icon: Palette,
      title: 'Arts District Ready',
      description: 'Specialized cleaning for galleries, studios, and creative spaces'
    },
    {
      icon: Building,
      title: 'Modern Architecture',
      description: 'Cleaning techniques for contemporary lofts and industrial spaces'
    }
  ];

  const developmentTypes = [
    {
      name: 'Luxury Lofts',
      units: '500+ units',
      features: ['Industrial aesthetic', 'Open floor plans', 'Modern fixtures'],
      price: '$140-300'
    },
    {
      name: 'Mixed-use Developments',
      units: '1000+ units',
      features: ['Retail ground floor', 'Residential upper floors', 'Shared amenities'],
      price: '$160-320'
    },
    {
      name: 'Artist Live/Work Spaces',
      units: '200+ units',
      features: ['Creative studios', 'Gallery spaces', 'Flexible layouts'],
      price: '$120-280'
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>House Cleaning East Austin TX | Modern Loft & New Development Cleaning | Aura Spring</title>
      <meta name="description" content="Professional house cleaning services in East Austin. Specializing in modern lofts, new developments, food trucks, art galleries, and the vibrant East Austin lifestyle." />
      <meta name="keywords" content="house cleaning east austin, modern loft cleaning austin, new development cleaning, food truck cleaning austin, art gallery cleaning, east 6th street cleaning, east austin maid service, contemporary home cleaning austin" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="East Austin" />
      <meta name="geo.position" content="30.2515;-97.7279" />
      <meta name="ICBM" content="30.2515, -97.7279" />
      <link rel="canonical" href="https://aurasprings.com/areas/east-austin" />

      {/* Structured Data for Local SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "East Austin House Cleaning Services",
          "description": "Professional house cleaning services for East Austin modern lofts and new developments",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Aura Spring Cleaning",
            "telephone": "(512) 781-0527",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            }
          },
          "areaServed": {
            "@type": "Place",
            "name": "East Austin",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.2515,
              "longitude": -97.7279
            }
          },
          "serviceType": "Modern Home Cleaning Service"
        })
      }} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2940)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Zap className="w-16 h-16 text-indigo-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              East Austin
              <span className="block text-indigo-200 mt-2">Modern Cleaning</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-4 max-w-3xl mx-auto">
              Contemporary cleaning services for modern lofts, new developments, creative spaces, and Austin's most dynamic neighborhood
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                E 6th • Food Trucks • Arts District • New Developments
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* East Austin Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eastAustinFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
              >
                <feature.icon className="w-10 h-10 mx-auto mb-3 text-indigo-600" />
                <h3 className="font-bold text-gray-500 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Types Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              East Austin Development Types
            </h2>
            <p className="text-lg text-gray-400">
              Specialized cleaning for Austin's fastest-growing neighborhood
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {developmentTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-500 mb-3">{type.name}</h3>
                <div className="text-sm font-semibold text-indigo-600 mb-4">{type.units}</div>
                
                <ul className="space-y-2 mb-6">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-2xl font-bold text-indigo-600">{type.price}</div>
                  <div className="text-sm text-gray-400">Starting price range</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Service Menus */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">East Austin </span>
              <span className="text-indigo-600">Cleaning Services</span>
            </h2>
            <p className="text-xl text-gray-400">
              Specialized services for modern living and creative spaces
            </p>
          </motion.div>

          <div className="space-y-8">
            {serviceMenus.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <service.icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-indigo-100 mt-1">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{service.pricing}</div>
                      <div className="text-indigo-200 text-sm">{service.frequency}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        Duration: {service.duration}
                      </h4>
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <h5 className="font-semibold text-indigo-800 mb-2">Perfect for:</h5>
                        <ul className="text-sm text-indigo-700 space-y-1">
                          <li>• Modern East Austin lofts and condos</li>
                          <li>• Creative professionals and artists</li>
                          <li>• New development residents</li>
                          <li>• Food truck and restaurant operators</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                        Service Details:
                      </h4>
                      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* East Austin Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              East Austin Hotspots We Serve
            </h2>
            <p className="text-lg text-gray-400">
              From modern lofts to creative spaces across East Austin
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {eastAustinSpots.map((spot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{spot.name}</h3>
                    <p className="text-indigo-200">{spot.type}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-indigo-600">{spot.area}</span>
                    <span className="text-sm font-semibold text-gray-500">{spot.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Specialized service available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood Evolution */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-500">Growing with </span>
                <span className="text-indigo-600">East Austin</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: TrendingUp,
                    title: 'Rapid Development Ready',
                    description: 'We adapt to East Austin\'s fast-changing landscape with new buildings opening monthly.'
                  },
                  {
                    icon: Utensils,
                    title: 'Food Scene Partners',
                    description: 'Supporting the incredible East Austin food truck and restaurant boom with commercial cleaning.'
                  },
                  {
                    icon: Palette,
                    title: 'Arts Community Support',
                    description: 'Gentle, art-safe cleaning for studios, galleries, and creative live-work spaces.'
                  },
                  {
                    icon: Building,
                    title: 'Modern Living Expertise',
                    description: 'Specialized techniques for industrial lofts, open floor plans, and contemporary fixtures.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-500 mb-2">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000"
                alt="East Austin modern loft cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 border-2 border-indigo-500">
                <Zap className="w-6 h-6 text-indigo-600 mb-2" />
                <p className="font-bold text-gray-500">Austin's</p>
                <p className="text-sm text-gray-400">Fastest Growing Area</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* East Austin Stats */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              East Austin by the Numbers
            </h2>
            <p className="text-xl text-indigo-100">
              Leading the cleaning charge in Austin's most dynamic neighborhood
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '1,000+', label: 'New Residents', sublabel: 'Served this year' },
              { number: '50+', label: 'Food Businesses', sublabel: 'Cleaned weekly' },
              { number: '25+', label: 'Art Galleries', sublabel: 'Maintained monthly' },
              { number: '4.9★', label: 'Innovation Rating', sublabel: 'Cutting-edge service' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold">{stat.label}</div>
                <div className="text-sm text-indigo-200 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Modern East Austin Cleaning?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Professional service that keeps pace with Austin's most dynamic neighborhood
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Modern Cleaning
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call (512) 781-0527
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-indigo-200" />
              <div className="text-sm font-semibold">New Development Ready</div>
            </div>
            <div className="text-center">
              <Palette className="w-8 h-8 mx-auto mb-2 text-indigo-200" />
              <div className="text-sm font-semibold">Arts-Safe Products</div>
            </div>
            <div className="text-center">
              <Building className="w-8 h-8 mx-auto mb-2 text-indigo-200" />
              <div className="text-sm font-semibold">Modern Space Experts</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Local SEO Footer */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            <strong>Service Area:</strong> East 6th Street, East 5th Street, East Cesar Chavez, 
            Holly, Cherrywood, Mueller, Windsor Park, and all East Austin neighborhoods
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/areas/downtown-austin" className="text-indigo-600 hover:underline">Downtown Austin</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/south-congress" className="text-indigo-600 hover:underline">South Congress</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/the-domain" className="text-indigo-600 hover:underline">The Domain</Link>
            <span className="text-gray-300">|</span>
            <Link href="/services" className="text-indigo-600 hover:underline">All Services</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default EastAustinPage;