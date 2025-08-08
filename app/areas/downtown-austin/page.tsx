'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Building2, 
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
  Target,
  Eye,
  Heart
} from 'lucide-react';

const DowntownAustinPage = () => {
  const serviceMenus = [
    {
      title: 'Regular House Cleaning',
      icon: Home,
      frequency: 'Weekly, Bi-weekly, Monthly',
      duration: '2-4 hours',
      pricing: '$120-280',
      description: 'Comprehensive maintenance cleaning for downtown condos and high-rises',
      includes: [
        'Living Areas: Dust all surfaces, vacuum carpets, mop hardwood floors',
        'Kitchen: Clean countertops, sink, stovetop, exterior appliances, sweep/mop floors',
        'Bathrooms: Scrub tub/shower, clean toilet inside/out, sanitize fixtures, mop floors',
        'Bedrooms: Dust furniture, vacuum/sweep floors, make beds (if requested)',
        'Trash: Empty all wastebaskets and replace liners',
        'Windows: Clean interior windows and mirrors',
        'High-touch surfaces: Sanitize light switches, door handles, remotes'
      ]
    },
    {
      title: 'Deep Cleaning Service',
      icon: Sparkles,
      frequency: 'Quarterly or One-time',
      duration: '4-8 hours',
      pricing: '$280-520',
      description: 'Intensive cleaning for downtown properties needing extra attention',
      includes: [
        'Everything in Regular Cleaning PLUS:',
        'Inside appliances: Oven, microwave, refrigerator interior cleaning',
        'Cabinet fronts and interior shelving deep cleaning',
        'Baseboards, trim, and door frames detailed cleaning',
        'Light fixtures and ceiling fans thorough cleaning',
        'Window sills and tracks deep cleaning',
        'Grout and tile scrubbing in all bathrooms',
        'Behind/under furniture cleaning (where accessible)',
        'Closet organization and cleaning (if requested)'
      ]
    },
    {
      title: 'Airbnb Turnover Cleaning',
      icon: Building2,
      frequency: 'Between Guests',
      duration: '2-3 hours',
      pricing: '$100-180',
      description: 'Fast, thorough turnovers for downtown vacation rentals and Airbnb properties',
      includes: [
        'Strip and remake all beds with provided linens',
        'Laundry: Wash, dry, fold, and restock towels and linens',
        'Kitchen: Full cleaning, dishwasher load, restock supplies',
        'Bathrooms: Deep clean, sanitize, restock amenities',
        'Living areas: Vacuum, dust, organize, reset furniture',
        'Trash removal and fresh liner placement',
        'Check and restock: Coffee, toiletries, cleaning supplies',
        'Quality photos for listing verification (if requested)'
      ]
    },
    {
      title: 'Move-in/Move-out Cleaning',
      icon: Users,
      frequency: 'One-time Service',
      duration: '4-6 hours',
      pricing: '$220-380',
      description: 'Detailed cleaning for lease transitions and property handovers',
      includes: [
        'Complete deep clean of all rooms and surfaces',
        'Inside all appliances: Oven, refrigerator, dishwasher, microwave',
        'Cabinet interiors and exteriors thoroughly cleaned',
        'All drawers removed and cleaned inside and out',
        'Light fixtures and ceiling fans detailed cleaning',
        'Window cleaning interior and tracks',
        'Bathroom deep scrub including grout and caulking',
        'Closet cleaning and organizing',
        'Security deposit protection guarantee'
      ]
    },
    {
      title: 'Post-Construction Cleanup',
      icon: Shield,
      frequency: 'One-time Service',
      duration: '6-12 hours',
      pricing: '$400-800',
      description: 'Specialized cleaning for new construction and major renovations',
      includes: [
        'Construction debris and dust removal',
        'Paint splatter and adhesive removal',
        'Window cleaning inside and outside',
        'Floor protection removal and deep cleaning',
        'Light fixture and ceiling fan installation cleaning',
        'HVAC vent and register cleaning',
        'Cabinet and drawer interior/exterior cleaning',
        'Bathroom fixture and tile restoration',
        'Move-in ready certification'
      ]
    },
    {
      title: 'Office & Commercial Cleaning',
      icon: Award,
      frequency: 'Daily, Weekly, Monthly',
      duration: 'Varies by size',
      pricing: 'Custom Quote',
      description: 'Professional cleaning for downtown offices, retail spaces, and commercial properties',
      includes: [
        'Reception and common areas: Dust, vacuum, sanitize surfaces',
        'Private offices: Desk cleaning, trash removal, floor care',
        'Conference rooms: Table sanitizing, chair cleaning, AV equipment dusting',
        'Kitchen/break rooms: Appliance cleaning, counter sanitizing, restocking',
        'Restrooms: Complete sanitization and restocking',
        'Window cleaning and blind dusting',
        'Floor care: Vacuum carpets, mop hard surfaces, periodic deep cleaning',
        'Flexible scheduling around business hours'
      ]
    }
  ];

  const downtownBuildings = [
    {
      name: 'The Austonian',
      type: 'Luxury High-rise',
      units: '200+ units',
      specialty: 'Premium penthouse cleaning',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000'
    },
    {
      name: 'Four Seasons Residences',
      type: 'Ultra-luxury Condos',
      units: '150+ units',
      specialty: 'White-glove service',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2000'
    },
    {
      name: 'W Austin Residences',
      type: 'Modern Luxury',
      units: '159 units',
      specialty: 'Contemporary living spaces',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000'
    },
    {
      name: 'The Shore',
      type: 'Waterfront Living',
      units: '300+ units',
      specialty: 'Lake view properties',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000'
    }
  ];

  const neighborhoodFeatures = [
    {
      icon: Building2,
      title: 'High-rise Specialists',
      description: 'Expert in luxury condo and penthouse cleaning'
    },
    {
      icon: Clock,
      title: 'Same-day Service',
      description: 'Available for urgent cleaning needs'
    },
    {
      icon: Shield,
      title: 'Secure Building Access',
      description: 'Background-checked team with building credentials'
    },
    {
      icon: Star,
      title: 'Concierge Coordination',
      description: 'Work seamlessly with building management'
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>House Cleaning Downtown Austin TX | Luxury Condo & High-rise Cleaning | Aura Spring</title>
      <meta name="description" content="Premium house cleaning services in Downtown Austin. Specializing in high-rise condos, luxury buildings, and Airbnb properties. Same-day service available. The Austonian, Four Seasons, W Austin." />
      <meta name="keywords" content="house cleaning downtown austin, condo cleaning austin, high rise cleaning austin, luxury apartment cleaning, the austonian cleaning, four seasons cleaning, w austin cleaning, downtown austin maid service, airbnb cleaning downtown austin" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="Downtown Austin" />
      <meta name="geo.position" content="30.2672;-97.7431" />
      <meta name="ICBM" content="30.2672, -97.7431" />
      <link rel="canonical" href="https://aurasprings.com/areas/downtown-austin" />

      {/* Structured Data for Local SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Downtown Austin House Cleaning Services",
          "description": "Professional house cleaning services for Downtown Austin high-rise condos and luxury buildings",
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
            "name": "Downtown Austin",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.2672,
              "longitude": -97.7431
            }
          },
          "serviceType": "House Cleaning Service"
        })
      }} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2940)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Building2 className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Downtown Austin
              <span className="block text-blue-200 mt-2">House Cleaning</span>
            </h1>
            <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Premium cleaning services for luxury condos, high-rises, and downtown living spaces
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                The Austonian • Four Seasons • W Austin
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Area Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoodFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
              >
                <feature.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <h3 className="font-bold text-gray-500 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Menus */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">Complete Service </span>
              <span className="text-blue-600">Menu & Pricing</span>
            </h2>
            <p className="text-xl text-gray-400">
              Detailed cleaning services tailored for downtown Austin properties
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
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <service.icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-blue-100 mt-1">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{service.pricing}</div>
                      <div className="text-blue-200 text-sm">{service.frequency}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Duration: {service.duration}
                      </h4>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-800 mb-2">Perfect for:</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• High-rise condos and penthouses</li>
                          <li>• Luxury downtown apartments</li>
                          <li>• Busy professionals</li>
                          <li>• Investment properties</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        What's Included:
                      </h4>
                      <ul className="space-y-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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

      {/* Featured Buildings */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Featured Downtown Buildings We Serve
            </h2>
            <p className="text-lg text-gray-400">
              Trusted by residents in Austin's most prestigious addresses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {downtownBuildings.map((building, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden border border-blue-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={building.image}
                    alt={building.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{building.name}</h3>
                    <p className="text-blue-200">{building.type}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-blue-600">{building.units}</span>
                    <span className="text-sm font-semibold text-gray-500">{building.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Regular service available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Downtown Austin by the Numbers
            </h2>
            <p className="text-xl text-blue-100">
              Why we're the trusted choice for downtown cleaning
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Buildings Served', sublabel: 'High-rise expertise' },
              { number: '1,200+', label: 'Downtown Units', sublabel: 'Regular customers' },
              { number: '2hrs', label: 'Response Time', sublabel: 'Emergency cleaning' },
              { number: '4.9★', label: 'Customer Rating', sublabel: 'Verified reviews' }
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
                <div className="text-sm text-blue-200 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Expertise */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-500">Why Downtown Austin </span>
                <span className="text-blue-600">Residents Choose Us</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Eye,
                    title: 'High-rise Expertise',
                    description: 'Specialized training for luxury condos and penthouses with unique cleaning challenges.'
                  },
                  {
                    icon: Clock,
                    title: 'Flexible Scheduling',
                    description: 'Work around your busy schedule with early morning, evening, and weekend availability.'
                  },
                  {
                    icon: Shield,
                    title: 'Building Security',
                    description: 'Background-checked team with proper credentials for secure building access.'
                  },
                  {
                    icon: Target,
                    title: 'Concierge Coordination',
                    description: 'Seamless communication with building management and concierge services.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
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
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000"
                alt="Downtown Austin luxury condo cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 border-2 border-blue-500">
                <Heart className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-bold text-gray-500">500+ Happy</p>
                <p className="text-sm text-gray-400">Downtown Residents</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Premium Downtown Austin Cleaning?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Same-day service available for downtown high-rises and condos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Online Now
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call (512) 781-0527
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-200" />
              <div className="text-sm font-semibold">Same-day Available</div>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-blue-200" />
              <div className="text-sm font-semibold">Insured & Bonded</div>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-blue-200" />
              <div className="text-sm font-semibold">4.9★ Rating</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Local SEO Footer */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            <strong>Service Area:</strong> Downtown Austin, The Austonian, Four Seasons Residences, 
            W Austin, The Shore, 360 Condos, Spring Condominiums, Northshore, and all downtown high-rises
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/areas/the-domain" className="text-blue-600 hover:underline">The Domain</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/south-congress" className="text-blue-600 hover:underline">South Congress</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/east-austin" className="text-blue-600 hover:underline">East Austin</Link>
            <span className="text-gray-300">|</span>
            <Link href="/services" className="text-blue-600 hover:underline">All Services</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default DowntownAustinPage;