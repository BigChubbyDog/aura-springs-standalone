'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Mountain, 
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
  Trees,
  Waves,
  Crown,
  Car,
  Heart,
  Eye,
  Target,
  Gem,
  Leaf,
  Sun
} from 'lucide-react';

const WestLakeHillsPage = () => {
  const serviceMenus = [
    {
      title: 'Luxury Estate Cleaning',
      icon: Crown,
      frequency: 'Weekly, Bi-weekly',
      duration: '4-8 hours',
      pricing: '$280-650',
      description: 'White-glove cleaning for West Lake Hills luxury estates and custom homes',
      includes: [
        'Executive-level service with attention to luxury finishes and materials',
        'Multiple master suites: Complete cleaning of all bedrooms and en-suite bathrooms',
        'Formal dining and living areas: Careful cleaning of fine furniture and artwork',
        'Gourmet kitchen service: Professional-grade appliances and custom cabinetry care',
        'Home office and library cleaning: Dust-free environment for important documents',
        'Multiple levels: Thorough cleaning of multi-story homes and staircases',
        'Outdoor space prep: Patio, deck, and outdoor kitchen cleaning',
        'Luxury material care: Marble, granite, hardwood, and designer fixture maintenance',
        'Concierge coordination: Work with housekeepers, landscapers, and other staff'
      ]
    },
    {
      title: 'Lakefront Property Service',
      icon: Waves,
      frequency: 'Weekly or Bi-weekly',
      duration: '3-6 hours',
      pricing: '$220-480',
      description: 'Specialized cleaning for waterfront homes with unique lakeside challenges',
      includes: [
        'Lake view window cleaning: Maximize scenic views with crystal-clear windows',
        'Dock and waterfront area cleaning: Outdoor spaces and water access areas',
        'Humidity management: Special attention to moisture control and ventilation',
        'Outdoor entertaining areas: Patios, decks, and lakeside living spaces',
        'Beach and water toy storage: Organization of water sports equipment',
        'Seasonal deep cleans: Preparing for lake season and winter storage',
        'Guest house cleaning: Secondary structures and entertainment areas',
        'Boat house maintenance: Clean and organize watercraft storage areas',
        'Environmental care: Eco-friendly products safe for lake ecosystem'
      ]
    },
    {
      title: 'Hill Country Custom Home',
      icon: Mountain,
      frequency: 'Weekly, Bi-weekly, Monthly',
      duration: '3-7 hours',
      pricing: '$200-550',
      description: 'Tailored cleaning for architectural custom homes in the Hill Country setting',
      includes: [
        'Architectural detail cleaning: Stone, cedar, and natural material care',
        'Vaulted ceilings and skylights: Specialized equipment for high-reach cleaning',
        'Custom millwork and built-ins: Careful cleaning of bespoke woodwork',
        'Multiple outdoor spaces: Courtyard, patio, and landscape integration areas',
        'Wine cellar and bar areas: Climate-controlled space maintenance',
        'Home theater and media rooms: Electronics-safe cleaning procedures',
        'Mudroom and utility areas: High-traffic zone deep cleaning',
        'Guest quarters: Independent living space complete cleaning',
        'Garage and workshop areas: Multi-bay garage and storage organization'
      ]
    },
    {
      title: 'Executive Maintenance Program',
      icon: Award,
      frequency: 'Weekly with Quarterly Deep',
      duration: '4-6 hours regular, 8-12 hours deep',
      pricing: '$350-500 regular, $600-1200 deep',
      description: 'Comprehensive maintenance program for busy executives and professionals',
      includes: [
        'Priority scheduling: Guaranteed time slots that work with executive calendars',
        'Key holder service: Secure access management for busy schedules',
        'Household management: Coordination with other service providers',
        'Seasonal transitions: Complete home preparation for season changes',
        'Event preparation: Pre and post-party cleaning services',
        'Travel preparation: Home security and maintenance during extended travel',
        'Quarterly deep services: Intensive cleaning of all systems and spaces',
        'Inventory management: Restocking of household supplies and essentials',
        'Quality assurance: Regular inspections and service optimization'
      ]
    },
    {
      title: 'Move-in Estate Service',
      icon: Home,
      frequency: 'One-time Intensive',
      duration: '8-16 hours',
      pricing: '$600-1500',
      description: 'Comprehensive move-in cleaning for luxury West Lake Hills properties',
      includes: [
        'Complete estate deep cleaning: Every surface, room, and system thoroughly cleaned',
        'New construction cleanup: Paint, construction dust, and debris removal',
        'Luxury appliance setup: Professional cleaning and preparation of high-end appliances',
        'Closet and storage organization: Custom organization systems setup',
        'Window and mirror restoration: Professional-grade cleaning for maximum clarity',
        'Floor restoration: Deep cleaning and conditioning of all floor surfaces',
        'Fixture and hardware detailing: Polishing of all metals and decorative elements',
        'HVAC system cleaning: Complete air system cleaning for optimal air quality',
        'Move-in ready guarantee: White-glove standard with final walkthrough'
      ]
    },
    {
      title: 'Special Event Preparation',
      icon: Sparkles,
      frequency: 'Event-based',
      duration: '4-10 hours',
      pricing: '$300-800',
      description: 'Premium cleaning for entertaining and special events in luxury homes',
      includes: [
        'Pre-event deep cleaning: Complete home preparation for hosting',
        'Guest area focus: Extra attention to spaces where guests will be present',
        'Outdoor entertainment prep: Patios, pools, and landscape areas',
        'Kitchen and bar setup: Professional cleaning for catering and entertaining',
        'Powder room and guest bath detail: White-glove cleaning for guest areas',
        'Post-event cleanup: Complete restoration after parties and gatherings',
        'Same-day service: Available for last-minute event preparation',
        'Coordination services: Work with caterers, event planners, and other vendors',
        'Discreet service: Professional, unobtrusive cleaning during events'
      ]
    }
  ];

  const westLakeProperties = [
    {
      name: 'Luxury Estates',
      type: '5,000+ sq ft Custom Homes',
      area: 'Scenic Overlook',
      specialty: 'Executive-level service',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000'
    },
    {
      name: 'Lakefront Homes',
      type: 'Waterfront Properties',
      area: 'Lake Austin Access',
      specialty: 'Environmental care',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000'
    },
    {
      name: 'Hill Country Estates',
      type: 'Architectural Custom Homes',
      area: 'Hill Country Views',
      specialty: 'Natural material expertise',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000'
    },
    {
      name: 'Executive Properties',
      type: 'Professional Residences',
      area: 'Westlake Village',
      specialty: 'Concierge-level service',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000'
    }
  ];

  const westlakeFeatures = [
    {
      icon: Crown,
      title: 'Luxury Home Specialists',
      description: 'Expertise in high-end finishes, custom features, and luxury materials'
    },
    {
      icon: Trees,
      title: 'Environmental Stewardship',
      description: 'Eco-friendly products safe for Hill Country and lake ecosystems'
    },
    {
      icon: Car,
      title: 'Secure Access Management',
      description: 'Background-checked team with secure property access protocols'
    },
    {
      icon: Award,
      title: 'Concierge-Level Service',
      description: 'White-glove treatment with attention to executive lifestyle needs'
    }
  ];

  const serviceTiers = [
    {
      name: 'Premium Estate',
      price: '$280-450',
      homes: '3,000-5,000 sq ft',
      features: ['Weekly or bi-weekly', 'Luxury material care', 'Multi-level cleaning', 'Outdoor spaces']
    },
    {
      name: 'Luxury Lakefront',
      price: '$350-550',
      homes: '4,000-6,000 sq ft',
      features: ['Waterfront expertise', 'Environmental care', 'Guest house included', 'Seasonal prep']
    },
    {
      name: 'Executive Estate',
      price: '$450-650',
      homes: '5,000+ sq ft',
      features: ['Concierge service', 'Priority scheduling', 'Event preparation', 'Household management']
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>House Cleaning West Lake Hills Austin TX | Luxury Estate & Lakefront Home Cleaning | Aura Spring</title>
      <meta name="description" content="Premium house cleaning services in West Lake Hills Austin. Specializing in luxury estates, lakefront properties, custom homes, and executive residences. White-glove concierge service." />
      <meta name="keywords" content="house cleaning west lake hills austin, luxury home cleaning austin, lakefront property cleaning, estate cleaning service, executive house cleaning, westlake village cleaning, custom home cleaning austin texas" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="West Lake Hills, Austin" />
      <meta name="geo.position" content="30.2729;-97.8081" />
      <meta name="ICBM" content="30.2729, -97.8081" />
      <link rel="canonical" href="https://aurasprings.com/areas/west-lake-hills" />

      {/* Structured Data for Local SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "West Lake Hills Austin Luxury House Cleaning Services",
          "description": "Premium house cleaning services for West Lake Hills luxury estates and lakefront properties",
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
            "name": "West Lake Hills, Austin",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.2729,
              "longitude": -97.8081
            }
          },
          "serviceType": "Luxury Estate Cleaning Service",
          "priceRange": "$280-$650"
        })
      }} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1464822759356-8d6106e78f86?q=80&w=2940)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Mountain className="w-16 h-16 text-emerald-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              West Lake Hills
              <span className="block text-emerald-200 mt-2">Luxury Cleaning</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-4 max-w-3xl mx-auto">
              White-glove cleaning services for luxury estates, lakefront properties, and executive homes in Austin's most prestigious neighborhood
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Hill Country • Lake Austin • Luxury Estates • Executive Homes
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* West Lake Hills Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {westlakeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
              >
                <feature.icon className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
                <h3 className="font-bold text-gray-500 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tier Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Service Tiers for Luxury Properties
            </h2>
            <p className="text-lg text-gray-400">
              Tailored cleaning programs for different estate sizes and needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 ${
                  index === 1 
                    ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white transform scale-105 shadow-2xl' 
                    : 'bg-white border-2 border-emerald-200'
                }`}
              >
                <h3 className={`text-xl font-bold mb-3 ${index === 1 ? 'text-white' : 'text-gray-500'}`}>
                  {tier.name}
                </h3>
                <div className={`text-2xl font-bold mb-2 ${index === 1 ? 'text-emerald-100' : 'text-emerald-600'}`}>
                  {tier.price}
                </div>
                <div className={`text-sm mb-4 ${index === 1 ? 'text-emerald-200' : 'text-gray-400'}`}>
                  {tier.homes}
                </div>
                
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${index === 1 ? 'text-emerald-200' : 'text-emerald-600'}`} />
                      <span className={`text-sm ${index === 1 ? 'text-emerald-100' : 'text-gray-400'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {index === 1 && (
                  <div className="mt-4 px-3 py-1 bg-white/20 rounded-full text-center">
                    <span className="text-xs font-semibold">Most Popular</span>
                  </div>
                )}
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
              <span className="text-gray-500">Luxury Estate </span>
              <span className="text-emerald-600">Cleaning Services</span>
            </h2>
            <p className="text-xl text-gray-400">
              White-glove service tailored for West Lake Hills luxury properties
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
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <service.icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-emerald-100 mt-1">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{service.pricing}</div>
                      <div className="text-emerald-200 text-sm">{service.frequency}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-emerald-600" />
                        Duration: {service.duration}
                      </h4>
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h5 className="font-semibold text-emerald-800 mb-2">Ideal for:</h5>
                        <ul className="text-sm text-emerald-700 space-y-1">
                          <li>• Luxury West Lake Hills estates</li>
                          <li>• Busy executives and professionals</li>
                          <li>• Lakefront and waterfront properties</li>
                          <li>• Custom Hill Country homes</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        Premium Service Includes:
                      </h4>
                      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
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

      {/* West Lake Hills Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Luxury Properties We Serve
            </h2>
            <p className="text-lg text-gray-400">
              Trusted by West Lake Hills' most discerning homeowners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {westLakeProperties.map((property, index) => (
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
                    <p className="text-emerald-200">{property.type}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-emerald-600">{property.area}</span>
                    <span className="text-sm font-semibold text-gray-500">{property.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">White-glove service available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Lifestyle Integration */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-500">Luxury Living </span>
                <span className="text-emerald-600">Made Effortless</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Crown,
                    title: 'Executive Lifestyle Support',
                    description: 'Flexible scheduling and concierge-level service that adapts to your professional demands and social calendar.'
                  },
                  {
                    icon: Waves,
                    title: 'Lakefront Expertise',
                    description: 'Specialized care for waterfront properties, understanding the unique challenges of lake living and environmental considerations.'
                  },
                  {
                    icon: Trees,
                    title: 'Hill Country Harmony',
                    description: 'Eco-friendly practices that respect the natural beauty and environmental sensitivity of the Hill Country setting.'
                  },
                  {
                    icon: Gem,
                    title: 'Luxury Material Mastery',
                    description: 'Expertise in caring for high-end finishes, custom millwork, natural stone, and designer fixtures with precision.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-emerald-600" />
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
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000"
                alt="West Lake Hills luxury home cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 border-2 border-emerald-500">
                <Crown className="w-6 h-6 text-emerald-600 mb-2" />
                <p className="font-bold text-gray-500">Luxury</p>
                <p className="text-sm text-gray-400">White-glove Service</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* West Lake Hills Stats */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              West Lake Hills by the Numbers
            </h2>
            <p className="text-xl text-emerald-100">
              Trusted by Austin's most prestigious neighborhood
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Luxury Estates', sublabel: 'Professionally maintained' },
              { number: '98%', label: 'Executive Satisfaction', sublabel: 'White-glove standard' },
              { number: '$5M+', label: 'Average Home Value', sublabel: 'Properties served' },
              { number: '4.9★', label: 'Luxury Rating', sublabel: 'Concierge-level service' }
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
                <div className="text-sm text-emerald-200 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Luxury West Lake Hills Cleaning?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            White-glove service that exceeds the expectations of Austin's most discerning homeowners
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Schedule Luxury Service
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call (512) 781-0527
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <Crown className="w-8 h-8 mx-auto mb-2 text-emerald-200" />
              <div className="text-sm font-semibold">White-glove Service</div>
            </div>
            <div className="text-center">
              <Trees className="w-8 h-8 mx-auto mb-2 text-emerald-200" />
              <div className="text-sm font-semibold">Eco-friendly Luxury</div>
            </div>
            <div className="text-center">
              <Waves className="w-8 h-8 mx-auto mb-2 text-emerald-200" />
              <div className="text-sm font-semibold">Lakefront Expertise</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Local SEO Footer */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            <strong>Service Area:</strong> West Lake Hills, Westlake Village, Lake Austin, Hill Country,
            Bee Cave, Lost Creek, Barton Creek, and surrounding luxury neighborhoods
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/areas/downtown-austin" className="text-emerald-600 hover:underline">Downtown Austin</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/the-domain" className="text-emerald-600 hover:underline">The Domain</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/cedar-park" className="text-emerald-600 hover:underline">Cedar Park</Link>
            <span className="text-gray-300">|</span>
            <Link href="/services" className="text-emerald-600 hover:underline">All Services</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WestLakeHillsPage;