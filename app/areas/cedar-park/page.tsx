'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  TreePine, 
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
  School,
  Car,
  Heart,
  Trees,
  Building2,
  Coffee,
  Eye,
  Target,
  Baby,
  Dog,
  Sun
} from 'lucide-react';

const CedarParkPage = () => {
  const serviceMenus = [
    {
      title: 'Family Home Cleaning',
      icon: Heart,
      frequency: 'Weekly, Bi-weekly, Monthly',
      duration: '2-5 hours',
      pricing: '$120-280',
      description: 'Comprehensive cleaning for busy Cedar Park families with children and pets',
      includes: [
        'Child-safe, non-toxic cleaning products throughout the home',
        'Pet-friendly cleaning methods and odor elimination',
        'Toy organization and playroom cleaning with sanitization',
        'Kitchen deep clean: Family-friendly focus on high chairs and eating areas',
        'Bathroom sanitization: Extra attention to kids\' bathrooms and safety',
        'Living areas: Furniture cleaning, carpet care, and pet hair removal',
        'Laundry assistance: One load wash, dry, fold (optional add-on)',
        'Backyard and patio cleaning: Outdoor family and pet areas',
        'Flexible scheduling around school pickup and family activities'
      ]
    },
    {
      title: 'New Construction & Model Home',
      icon: Building2,
      frequency: 'One-time or Monthly',
      duration: '4-8 hours',
      pricing: '$200-450',
      description: 'Specialized cleaning for Cedar Park\'s new construction developments and model homes',
      includes: [
        'Post-construction deep cleaning: Complete dust and debris removal',
        'Model home maintenance: Show-ready condition for prospective buyers',
        'New home move-in prep: Final cleaning before family occupancy',
        'Builder coordination: Working with construction teams and schedules',
        'Window cleaning: Interior and exterior of all new windows',
        'Floor protection removal and deep cleaning of all surfaces',
        'Cabinet and fixture cleaning: New hardware and appliance preparation',
        'HVAC system cleaning: Removing construction dust from air systems',
        'Final walkthrough and quality assurance with satisfaction guarantee'
      ]
    },
    {
      title: 'Suburban Deep Cleaning',
      icon: Sparkles,
      frequency: 'Quarterly or Seasonal',
      duration: '4-8 hours',
      pricing: '$180-400',
      description: 'Intensive seasonal cleaning for Cedar Park homes and neighborhoods',
      includes: [
        'Seasonal transitions: Spring cleaning, winter prep, holiday preparation',
        'Garage and storage areas: Organization and cleaning of family storage',
        'Attic and basement cleaning: Complete cleaning of all levels',
        'Outdoor living spaces: Patios, decks, and entertaining areas',
        'Window cleaning: Interior and exterior window cleaning service',
        'Ceiling fan and light fixture deep cleaning throughout home',
        'Baseboards, trim, and door frame detailed cleaning',
        'Appliance deep cleaning: Inside ovens, refrigerators, washers, dryers',
        'Closet organization and seasonal wardrobe transitions'
      ]
    },
    {
      title: 'Busy Professional Service',
      icon: Award,
      frequency: 'Weekly or Bi-weekly',
      duration: '2-4 hours',
      pricing: '$140-250',
      description: 'Efficient cleaning for working professionals commuting to Austin',
      includes: [
        'Early morning or evening appointments to fit work schedules',
        'Home office cleaning: Desk organization and electronics dusting',
        'Quick turnaround service: Efficient cleaning while you\'re at work',
        'Wardrobe care: Closet organization and clothing maintenance',
        'Kitchen efficiency: Meal prep area cleaning and organization',
        'Bathroom express service: Quick but thorough bathroom maintenance',
        'Key holder service: Secure access for busy professional schedules',
        'Commuter-friendly: Service completed before your return from Austin',
        'Flexible rescheduling for business travel and schedule changes'
      ]
    },
    {
      title: 'Senior Living Support',
      icon: Users,
      frequency: 'Weekly or Bi-weekly',
      duration: '2-4 hours',
      pricing: '$110-200',
      description: 'Gentle, supportive cleaning for Cedar Park seniors and assisted living',
      includes: [
        'Senior-safe products: Gentle, non-slip cleaning methods and solutions',
        'Medication area cleaning: Careful, respectful cleaning around medical supplies',
        'Mobility-friendly service: Work around wheelchairs, walkers, and mobility aids',
        'Social companionship: Friendly, respectful interaction during service',
        'Safety focus: Extra attention to fall prevention and clear pathways',
        'Light housekeeping: Laundry, dishes, and daily living support',
        'Grocery and supply restocking: Basic household supply management',
        'Family coordination: Communication with adult children and caregivers',
        'Consistent team: Same cleaning professionals for comfort and trust'
      ]
    },
    {
      title: 'Holiday & Event Preparation',
      icon: Star,
      frequency: 'Event-based',
      duration: '3-6 hours',
      pricing: '$150-350',
      description: 'Special event cleaning for Cedar Park family gatherings and celebrations',
      includes: [
        'Pre-holiday deep cleaning: Complete home preparation for family gatherings',
        'Guest room preparation: Clean and organize spaces for visiting family',
        'Kitchen and dining area focus: Extra attention to cooking and serving areas',
        'Living and entertainment areas: Perfect presentation for hosting',
        'Outdoor party preparation: Patios, decks, and backyard entertaining spaces',
        'Post-party cleanup: Complete restoration after celebrations and gatherings',
        'Same-day emergency service: Last-minute preparation for unexpected events',
        'Decoration assistance: Help with setup and takedown of seasonal decorations',
        'Family-friendly coordination: Working around children and family schedules'
      ]
    }
  ];

  const cedarParkNeighborhoods = [
    {
      name: 'New Subdivision Homes',
      type: '2,000-4,000 sq ft Family Homes',
      area: 'Cedar Park & Leander',
      specialty: 'New construction expertise',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000'
    },
    {
      name: 'Established Neighborhoods',
      type: 'Traditional Family Communities',
      area: 'Northwest Austin',
      specialty: 'Family-focused service',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2000'
    },
    {
      name: 'Active Adult Communities',
      type: '55+ Senior Living',
      area: 'Cedar Park Central',
      specialty: 'Senior support services',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000'
    },
    {
      name: 'Executive Properties',
      type: 'Professional Residences',
      area: 'Hill Country Suburbs',
      specialty: 'Professional scheduling',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000'
    }
  ];

  const cedarParkFeatures = [
    {
      icon: School,
      title: 'Family-First Service',
      description: 'Child-safe products and scheduling around school and family activities'
    },
    {
      icon: Car,
      title: 'Suburban Convenience',
      description: 'Understanding of Cedar Park lifestyle and commuter schedules'
    },
    {
      icon: Trees,
      title: 'Neighborhood Expertise',
      description: 'Familiar with local developments and community needs'
    },
    {
      icon: Heart,
      title: 'Community Focused',
      description: 'Trusted by Cedar Park families and long-term residents'
    }
  ];

  const familyServices = [
    {
      title: 'Child-Safe Cleaning',
      description: 'Non-toxic products safe for crawling babies and playing children',
      icon: Baby,
      features: ['Toy sanitization', 'Playroom organization', 'Safe product guarantee']
    },
    {
      title: 'Pet-Friendly Service',
      description: 'Specialized cleaning for homes with dogs, cats, and other pets',
      icon: Dog,
      features: ['Pet odor elimination', 'Hair removal', 'Litter box area cleaning']
    },
    {
      title: 'Busy Parent Support',
      description: 'Flexible scheduling and comprehensive service for working parents',
      icon: Clock,
      features: ['School schedule flexibility', 'Laundry assistance', 'Meal prep area focus']
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>House Cleaning Cedar Park Austin TX | Family Home & New Construction Cleaning | Aura Spring</title>
      <meta name="description" content="Professional house cleaning services in Cedar Park Austin. Specializing in family homes, new construction, suburban communities, and busy professional households. Child-safe and pet-friendly." />
      <meta name="keywords" content="house cleaning cedar park austin, family home cleaning cedar park, new construction cleaning cedar park, suburban cleaning service, child safe cleaning, pet friendly cleaning cedar park texas, leander cleaning service" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="Cedar Park, Austin" />
      <meta name="geo.position" content="30.5052;-97.8203" />
      <meta name="ICBM" content="30.5052, -97.8203" />
      <link rel="canonical" href="https://aurasprings.com/areas/cedar-park" />

      {/* Structured Data for Local SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Cedar Park Austin Family House Cleaning Services",
          "description": "Professional house cleaning services for Cedar Park families, new construction, and suburban communities",
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
            "name": "Cedar Park, Austin",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.5052,
              "longitude": -97.8203
            }
          },
          "serviceType": "Family Home Cleaning Service",
          "audience": {
            "@type": "Audience",
            "audienceType": "Families with children and pets"
          }
        })
      }} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2940)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <TreePine className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cedar Park
              <span className="block text-green-200 mt-2">Family Cleaning</span>
            </h1>
            <p className="text-xl text-green-100 mb-4 max-w-3xl mx-auto">
              Professional cleaning services for Cedar Park families, new construction homes, and suburban communities with child-safe, pet-friendly practices
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Family Homes • New Construction • Suburban Communities
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cedar Park Family Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cedarParkFeatures.map((feature, index) => (
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

      {/* Family-Focused Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Family-Focused Specialties
            </h2>
            <p className="text-lg text-gray-400">
              Cleaning services designed for busy Cedar Park families
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {familyServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-500 mb-3 text-center">{service.title}</h3>
                <p className="text-gray-400 mb-4 text-center">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
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
              <span className="text-gray-500">Cedar Park </span>
              <span className="text-green-600">Cleaning Services</span>
            </h2>
            <p className="text-xl text-gray-400">
              Complete cleaning solutions for suburban families and professionals
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
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
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
                        <h5 className="font-semibold text-green-800 mb-2">Perfect for:</h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Cedar Park family homes</li>
                          <li>• Busy working parents</li>
                          <li>• New construction homes</li>
                          <li>• Pet-owning families</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Service Includes:
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

      {/* Cedar Park Neighborhoods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Cedar Park Communities We Serve
            </h2>
            <p className="text-lg text-gray-400">
              Trusted by families across Cedar Park and Leander
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {cedarParkNeighborhoods.map((neighborhood, index) => (
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
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{neighborhood.name}</h3>
                    <p className="text-green-200">{neighborhood.type}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-green-600">{neighborhood.area}</span>
                    <span className="text-sm font-semibold text-gray-500">{neighborhood.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Family-focused service available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Integration */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-500">Part of the </span>
                <span className="text-green-600">Cedar Park Community</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: School,
                    title: 'School District Friendly',
                    description: 'We understand Cedar Park ISD schedules and work around school pickup times, events, and family activities.'
                  },
                  {
                    icon: Car,
                    title: 'Commuter-Conscious',
                    description: 'Flexible scheduling for parents commuting to Austin, with early morning and evening availability.'
                  },
                  {
                    icon: Trees,
                    title: 'Suburban Expertise',
                    description: 'Experience with larger family homes, yards, garages, and the unique needs of suburban living.'
                  },
                  {
                    icon: Building2,
                    title: 'New Development Ready',
                    description: 'Working with Cedar Park\'s growing communities and new construction neighborhoods since they break ground.'
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
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2000"
                alt="Cedar Park family home cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 border-2 border-green-500">
                <Heart className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-bold text-gray-500">1,000+ Happy</p>
                <p className="text-sm text-gray-400">Cedar Park Families</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cedar Park Statistics */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Cedar Park by the Numbers
            </h2>
            <p className="text-xl text-green-100">
              Proudly serving Austin's fastest-growing suburban community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '2,500+', label: 'Family Homes', sublabel: 'Cleaned monthly' },
              { number: '95%', label: 'Parent Satisfaction', sublabel: 'Child-safe guarantee' },
              { number: '500+', label: 'New Construction', sublabel: 'Homes cleaned' },
              { number: '4.9★', label: 'Community Rating', sublabel: 'Family-trusted service' }
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
      <section className="py-16 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Family-Friendly Cedar Park Cleaning?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Child-safe, pet-friendly service that fits your busy family schedule
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Family Service
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
              <Baby className="w-8 h-8 mx-auto mb-2 text-green-200" />
              <div className="text-sm font-semibold">Child-Safe Products</div>
            </div>
            <div className="text-center">
              <Dog className="w-8 h-8 mx-auto mb-2 text-green-200" />
              <div className="text-sm font-semibold">Pet-Friendly Service</div>
            </div>
            <div className="text-center">
              <School className="w-8 h-8 mx-auto mb-2 text-green-200" />
              <div className="text-sm font-semibold">School Schedule Friendly</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Local SEO Footer */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            <strong>Service Area:</strong> Cedar Park, Leander, Round Rock, Georgetown, Northwest Austin, 
            Brushy Creek, Anderson Mill, and surrounding family communities
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/areas/the-domain" className="text-green-600 hover:underline">The Domain</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/west-lake-hills" className="text-green-600 hover:underline">West Lake Hills</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/downtown-austin" className="text-green-600 hover:underline">Downtown Austin</Link>
            <span className="text-gray-300">|</span>
            <Link href="/services" className="text-green-600 hover:underline">All Services</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CedarParkPage;