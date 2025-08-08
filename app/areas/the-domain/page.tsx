'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Building, 
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
  ShoppingBag,
  Car,
  Trees,
  Coffee,
  Zap,
  Heart,
  Eye,
  Target
} from 'lucide-react';

const TheDomainPage = () => {
  const serviceMenus = [
    {
      title: 'Regular House Cleaning',
      icon: Home,
      frequency: 'Weekly, Bi-weekly, Monthly',
      duration: '2-5 hours',
      pricing: '$140-320',
      description: 'Comprehensive maintenance cleaning for Domain luxury homes and condos',
      includes: [
        'Living Areas: Dust all surfaces, vacuum carpets and rugs, mop hardwood/tile floors',
        'Kitchen: Clean and sanitize countertops, sink, stovetop, wipe down appliances',
        'Bathrooms: Scrub and sanitize tub/shower, toilet, vanity, mirrors, and floors',
        'Bedrooms: Dust furniture and surfaces, vacuum floors, organize (if requested)',
        'Dining Room: Dust table and chairs, vacuum/sweep floors, clean light fixtures',
        'Entryway: Clean floors, dust surfaces, organize shoes and coats',
        'Trash: Empty all bins and replace liners throughout the home'
      ]
    },
    {
      title: 'Deep Cleaning Service',
      icon: Sparkles,
      frequency: 'Quarterly or One-time',
      duration: '4-8 hours',
      pricing: '$320-600',
      description: 'Intensive top-to-bottom cleaning for Domain properties needing extra care',
      includes: [
        'All Regular Cleaning tasks PLUS intensive deep cleaning:',
        'Kitchen Deep Clean: Inside oven, microwave, refrigerator, and dishwasher',
        'Cabinet Detailing: Interior and exterior of all cabinets and drawers',
        'Appliance Deep Clean: Coffee makers, toasters, blenders thoroughly cleaned',
        'Bathroom Deep Scrub: Grout cleaning, mineral deposit removal, deep tile scrub',
        'Baseboards & Trim: Detailed cleaning of all baseboards and door/window trim',
        'Light Fixtures: Complete cleaning of chandeliers, ceiling fans, and fixtures',
        'Window Interiors: All interior windows, sills, and tracks cleaned',
        'Closet Organization: Basic organizing and cleaning of bedroom closets'
      ]
    },
    {
      title: 'Executive Home Cleaning',
      icon: Award,
      frequency: 'Weekly or Bi-weekly',
      duration: '4-6 hours',
      pricing: '$280-450',
      description: 'Premium service for large Domain homes and executive properties',
      includes: [
        'White-glove service with attention to luxury finishes and materials',
        'Multiple bathrooms: Complete cleaning and sanitization of all bathrooms',
        'Formal dining and living areas: Careful cleaning of fine furniture and decor',
        'Home office cleaning: Desk organization, electronics dusting, file management',
        'Multiple bedrooms: All bedrooms cleaned, beds made with hospital corners',
        'Laundry assistance: Wash, dry, fold, and put away one load of laundry',
        'Kitchen premium service: All appliances inside/out, cabinet fronts detailed',
        'Entryway and mudroom: Organization and cleaning of high-traffic areas',
        'Quality assurance: Final walkthrough and touch-ups as needed'
      ]
    },
    {
      title: 'Airbnb & Vacation Rental',
      icon: Building,
      frequency: 'Between Guests',
      duration: '2-4 hours',
      pricing: '$120-220',
      description: 'Specialized turnover cleaning for Domain vacation rentals and investment properties',
      includes: [
        'Complete bed stripping and remaking with fresh linens provided',
        'Bathroom reset: Deep cleaning, fresh towels, amenity restocking',
        'Kitchen turnover: Dishwasher run, appliances cleaned, consumables restocked',
        'Living areas: Furniture reset, vacuum, dust, organize remote controls',
        'Laundry service: Wash and dry all used linens and towels',
        'Inventory check: Ensure all amenities and supplies are properly stocked',
        'Trash removal: All bins emptied and fresh liners installed',
        'Quality photos: Property photos for listing verification (optional add-on)',
        'Same-day turnaround available for premium rates'
      ]
    },
    {
      title: 'Move-in/Move-out Cleaning',
      icon: Users,
      frequency: 'One-time Service',
      duration: '4-8 hours',
      pricing: '$250-480',
      description: 'Comprehensive cleaning for lease transitions in Domain properties',
      includes: [
        'Complete empty-house deep cleaning from top to bottom',
        'All appliances: Interior cleaning of oven, refrigerator, dishwasher, microwave',
        'Cabinet interiors: All kitchen and bathroom cabinets cleaned inside and out',
        'Drawer cleaning: All drawers removed, cleaned inside and out',
        'Closet cleaning: All closets vacuumed, wiped down, and organized',
        'Bathroom deep clean: Grout scrubbing, mineral deposit removal, fixture polishing',
        'Window cleaning: Interior windows, sills, and blinds thoroughly cleaned',
        'Floor care: Deep cleaning appropriate to floor type (hardwood, tile, carpet)',
        'Security deposit guarantee: We ensure deposit-worthy cleanliness'
      ]
    },
    {
      title: 'Post-Construction & Renovation',
      icon: Shield,
      frequency: 'One-time Service',
      duration: '6-12 hours',
      pricing: '$450-900',
      description: 'Specialized cleaning for new construction and major home renovations',
      includes: [
        'Construction dust removal from all surfaces including hard-to-reach areas',
        'Paint overspray and construction debris cleanup',
        'New appliance cleaning: Protective films removed, surfaces polished',
        'Floor restoration: Deep cleaning and polishing of new flooring',
        'Window installation cleanup: Inside/outside cleaning of new windows',
        'Fixture installation cleaning: New light fixtures and hardware detailed',
        'Cabinet and drawer setup: New cabinetry cleaned and prepared for use',
        'HVAC cleaning: Vents and registers cleaned of construction dust',
        'Final walkthrough: Move-in ready certification provided'
      ]
    }
  ];

  const domainProperties = [
    {
      name: 'Domain Luxury Condos',
      type: 'High-end Condominiums',
      units: '500+ units',
      specialty: 'Modern luxury living',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000'
    },
    {
      name: 'Executive Homes',
      type: 'Single Family Luxury',
      units: '200+ homes',
      specialty: 'Large family estates',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000'
    },
    {
      name: 'Domain Apartments',
      type: 'Upscale Rentals',
      units: '800+ units',
      specialty: 'Professional residents',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000'
    },
    {
      name: 'Vacation Rentals',
      type: 'Investment Properties',
      units: '150+ properties',
      specialty: 'Short-term rental management',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2000'
    }
  ];

  const domainFeatures = [
    {
      icon: ShoppingBag,
      title: 'Shopping District Access',
      description: 'Convenient service around your shopping schedule'
    },
    {
      icon: Car,
      title: 'Parking Coordination',
      description: 'Familiar with Domain parking and building access'
    },
    {
      icon: Trees,
      title: 'Family-Friendly Focus',
      description: 'Child-safe products and family-oriented service'
    },
    {
      icon: Award,
      title: 'Executive Service',
      description: 'Premium cleaning for busy professionals'
    }
  ];

  const pricingTiers = [
    {
      name: 'Standard Service',
      price: '$140-220',
      features: ['Regular cleaning checklist', 'Eco-friendly products', 'Insured team', 'Online scheduling']
    },
    {
      name: 'Premium Service',
      price: '$220-320',
      features: ['All Standard features', 'Deep cleaning add-ons', 'Laundry assistance', 'Organization services']
    },
    {
      name: 'Executive Service',
      price: '$320-450',
      features: ['All Premium features', 'White-glove treatment', 'Priority scheduling', 'Custom requests']
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>House Cleaning The Domain Austin TX | Luxury Home & Condo Cleaning | Aura Spring</title>
      <meta name="description" content="Premium house cleaning services in The Domain Austin. Expert cleaning for luxury homes, condos, and executive properties. Same-day service available. Family-friendly and professional." />
      <meta name="keywords" content="house cleaning the domain austin, luxury home cleaning austin, domain condo cleaning, executive home cleaning, family house cleaning domain, maid service the domain, cleaning service north austin" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="The Domain, Austin" />
      <meta name="geo.position" content="30.3398;-97.7451" />
      <meta name="ICBM" content="30.3398, -97.7451" />
      <link rel="canonical" href="https://aurasprings.com/areas/the-domain" />

      {/* Structured Data for Local SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "The Domain Austin House Cleaning Services",
          "description": "Professional house cleaning services for The Domain Austin luxury homes and condominiums",
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
            "name": "The Domain, Austin",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.3398,
              "longitude": -97.7451
            }
          },
          "serviceType": "House Cleaning Service",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cleaning Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Regular House Cleaning"
                },
                "price": "$140-320",
                "priceCurrency": "USD"
              }
            ]
          }
        })
      }} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Building className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Domain Austin
              <span className="block text-green-200 mt-2">House Cleaning</span>
            </h1>
            <p className="text-xl text-green-100 mb-4 max-w-3xl mx-auto">
              Premium cleaning services for luxury homes, condos, and executive properties in Austin's premier shopping district
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Domain Condos • Executive Homes • Family Properties
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domain-Specific Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
              >
                <feature.icon className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <h3 className="font-bold text-gray-500 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Service Menus */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">Complete Cleaning </span>
              <span className="text-green-600">Service Menu</span>
            </h2>
            <p className="text-xl text-gray-400">
              Detailed services tailored for Domain luxury properties
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
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <service.icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-green-100 mt-1">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{service.pricing}</div>
                      <div className="text-green-200 text-sm">{service.frequency}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        Duration: {service.duration}
                      </h4>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Ideal for:</h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Domain luxury condos and homes</li>
                          <li>• Busy executives and professionals</li>
                          <li>• Families with children and pets</li>
                          <li>• Investment and rental properties</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Detailed Service Includes:
                      </h4>
                      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
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

      {/* Service Pricing Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Service Tiers & Pricing
            </h2>
            <p className="text-lg text-gray-400">
              Choose the service level that fits your Domain lifestyle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 ${
                  index === 1 
                    ? 'bg-gradient-to-b from-green-500 to-emerald-600 text-white transform scale-105 shadow-2xl' 
                    : 'bg-gradient-to-b from-green-50 to-emerald-50 border-2 border-green-200'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-gray-500'}`}>
                  {tier.name}
                </h3>
                <div className={`text-3xl font-bold mb-6 ${index === 1 ? 'text-green-100' : 'text-green-600'}`}>
                  {tier.price}
                </div>
                
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${index === 1 ? 'text-green-200' : 'text-green-600'}`} />
                      <span className={index === 1 ? 'text-green-100' : 'text-gray-400'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {index === 1 && (
                  <div className="mt-6 px-4 py-2 bg-white/20 rounded-lg text-center">
                    <span className="text-sm font-semibold">Most Popular</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Domain Properties We Serve
            </h2>
            <p className="text-lg text-gray-400">
              Trusted by residents across The Domain's finest properties
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {domainProperties.map((property, index) => (
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
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{property.name}</h3>
                    <p className="text-green-200">{property.type}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-green-600">{property.units}</span>
                    <span className="text-sm font-semibold text-gray-500">{property.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Regular & deep cleaning available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Lifestyle Integration */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-500">Perfect for the </span>
                <span className="text-green-600">Domain Lifestyle</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Coffee,
                    title: 'Executive Schedules',
                    description: 'Flexible timing that works around your professional commitments and Domain meetings.'
                  },
                  {
                    icon: ShoppingBag,
                    title: 'Shopping Coordination',
                    description: 'We understand Domain traffic patterns and can coordinate around your shopping trips.'
                  },
                  {
                    icon: Users,
                    title: 'Family-Friendly Service',
                    description: 'Child-safe products and pet-friendly cleaning perfect for Domain families.'
                  },
                  {
                    icon: Car,
                    title: 'Parking Solutions',
                    description: 'Familiar with Domain parking structures and building access protocols.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-green-600" />
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
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000"
                alt="Domain luxury home cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 border-2 border-green-500">
                <Heart className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-bold text-gray-500">800+ Happy</p>
                <p className="text-sm text-gray-400">Domain Residents</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Domain Statistics */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              The Domain by the Numbers
            </h2>
            <p className="text-xl text-green-100">
              Why Domain residents choose Aura Spring Cleaning
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '800+', label: 'Domain Properties', sublabel: 'Serviced monthly' },
              { number: '95%', label: 'Repeat Customers', sublabel: 'Love our service' },
              { number: '24hrs', label: 'Response Time', sublabel: 'Emergency service' },
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
                <div className="text-sm text-green-200 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Premium Domain Cleaning?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Same-day service available for all Domain properties
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Online Now
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call (512) 781-0527
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-200" />
              <div className="text-sm font-semibold">Same-day Available</div>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-green-200" />
              <div className="text-sm font-semibold">Insured & Bonded</div>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-green-200" />
              <div className="text-sm font-semibold">4.9★ Rating</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Local SEO Footer */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            <strong>Service Area:</strong> The Domain, Domain NORTHSIDE, Arboretum, Great Hills, 
            Northwest Austin, Anderson Mill, and surrounding luxury neighborhoods
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/areas/downtown-austin" className="text-green-600 hover:underline">Downtown Austin</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/south-congress" className="text-green-600 hover:underline">South Congress</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/west-lake-hills" className="text-green-600 hover:underline">West Lake Hills</Link>
            <span className="text-gray-300">|</span>
            <Link href="/services" className="text-green-600 hover:underline">All Services</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheDomainPage;