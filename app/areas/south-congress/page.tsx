'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Music, 
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
  Camera,
  Coffee,
  Heart,
  TreePine,
  Building2,
  Palette,
  Eye,
  Target,
  Zap
} from 'lucide-react';

const SouthCongressPage = () => {
  const serviceMenus = [
    {
      title: 'Historic Home Cleaning',
      icon: Home,
      frequency: 'Weekly, Bi-weekly, Monthly',
      duration: '3-5 hours',
      pricing: '$160-350',
      description: 'Specialized cleaning for South Congress historic homes and vintage properties',
      includes: [
        'Gentle care for original hardwood floors and vintage fixtures',
        'Living areas: Dust antique furniture, clean vintage rugs, maintain wood floors',
        'Kitchen: Clean vintage appliances, maintain original cabinetry, sanitize surfaces',
        'Bathrooms: Special care for clawfoot tubs, vintage tile, antique fixtures',
        'Historic windows: Gentle cleaning of original glass and frames',
        'Preservation-safe products: Non-damaging cleaners for vintage materials',
        'Detailed dusting: Special attention to architectural details and moldings',
        'Careful handling: Trained in historic property care and preservation'
      ]
    },
    {
      title: 'Artist Loft & Creative Space',
      icon: Palette,
      frequency: 'Weekly or Bi-weekly',
      duration: '2-4 hours',
      pricing: '$140-280',
      description: 'Tailored cleaning for creative spaces, studios, and artist lofts',
      includes: [
        'Art-safe cleaning: Products safe around paintings, sculptures, and materials',
        'Studio organization: Careful arrangement of art supplies and equipment',
        'Dust-free environment: Thorough dusting for artwork preservation',
        'Floor protection: Special care for paint-splattered and creative flooring',
        'Supply organization: Arrange brushes, paints, and creative materials',
        'Inspiration preservation: Maintain creative chaos while ensuring cleanliness',
        'Gallery preparation: Deep clean for art showings and studio visits',
        'Equipment care: Clean easels, work tables, and creative tools'
      ]
    },
    {
      title: 'Airbnb & Creative Rentals',
      icon: Camera,
      frequency: 'Between Guests',
      duration: '2-3 hours',
      pricing: '$110-200',
      description: 'Turnover cleaning for South Congress vacation rentals and creative spaces',
      includes: [
        'Instagram-ready styling: Arrange spaces for social media appeal',
        'Quick turnaround: Fast service between SoCo visitors',
        'Local guide setup: Arrange Austin guidebooks and local recommendations',
        'Artistic touches: Maintain the creative South Congress vibe',
        'Photography staging: Ensure spaces are photo-ready for guests',
        'Music venue prep: Setup for guests attending nearby venues',
        'Coffee station: Maintain local coffee setup with Austin favorites',
        'Creative amenities: Stock art supplies for artistically-inclined guests'
      ]
    },
    {
      title: 'Boutique & Vintage Store',
      icon: Award,
      frequency: 'Daily or Weekly',
      duration: '1-3 hours',
      pricing: '$80-180',
      description: 'Commercial cleaning for South Congress boutiques and vintage shops',
      includes: [
        'Retail display cleaning: Careful dusting of merchandise and displays',
        'Vintage item care: Gentle cleaning around antique and vintage pieces',
        'Customer area maintenance: Keep browsing areas welcoming and clean',
        'Window displays: Maintain eye-catching storefront presentations',
        'Changing room upkeep: Regular cleaning and organization of fitting areas',
        'Inventory protection: Dust-free environment for clothing and accessories',
        'Floor care: Maintain original wood floors and vintage surfaces',
        'After-hours cleaning: Work around business hours for minimal disruption'
      ]
    },
    {
      title: 'Deep Clean & Restoration',
      icon: Sparkles,
      frequency: 'Quarterly or One-time',
      duration: '5-10 hours',
      pricing: '$350-650',
      description: 'Intensive cleaning for historic properties and creative spaces',
      includes: [
        'Historic preservation cleaning with period-appropriate methods',
        'Antique furniture restoration cleaning and conditioning',
        'Original hardwood floor deep cleaning, conditioning, and protection',
        'Vintage fixture restoration: Careful cleaning of period lighting and hardware',
        'Historic window restoration: Deep clean of original glass and frames',
        'Architectural detail cleaning: Crown molding, baseboards, and period features',
        'Attic and basement cleaning: Full property deep clean including storage areas',
        'Art and collectible care: Professional cleaning around valuable pieces',
        'Period-appropriate products: Using cleaners safe for historic materials'
      ]
    },
    {
      title: 'Event & Photo Shoot Prep',
      icon: Camera,
      frequency: 'Event-based',
      duration: '3-6 hours',
      pricing: '$200-400',
      description: 'Specialized cleaning for South Congress events, photo shoots, and creative projects',
      includes: [
        'Camera-ready spaces: Deep clean for photography and videography',
        'Event staging: Arrange and clean spaces for parties and gatherings',
        'Backdrop preparation: Clean walls and areas for photo backgrounds',
        'Art installation prep: Clean galleries and creative spaces for shows',
        'Music venue cleaning: Prepare spaces for intimate concerts and performances',
        'Social media optimization: Style spaces for Instagram and social sharing',
        'Last-minute touch-ups: Quick response for urgent event preparation',
        'Post-event cleanup: Complete restoration after parties and shoots'
      ]
    }
  ];

  const southCongressSpots = [
    {
      name: 'Historic Homes',
      type: '1920s-1940s Properties',
      area: 'Travis Heights',
      specialty: 'Period preservation cleaning',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000'
    },
    {
      name: 'Artist Lofts',
      type: 'Creative Living Spaces',
      area: 'SoCo District',
      specialty: 'Art-safe cleaning',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000'
    },
    {
      name: 'Boutique Shops',
      type: 'Retail Spaces',
      area: 'South Congress Ave',
      specialty: 'Commercial cleaning',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000'
    },
    {
      name: 'Music Venues',
      type: 'Performance Spaces',
      area: 'Live Music District',
      specialty: 'Event preparation',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000'
    }
  ];

  const socoFeatures = [
    {
      icon: Music,
      title: 'Music Scene Integration',
      description: 'Flexible scheduling around live music events and festivals'
    },
    {
      icon: Palette,
      title: 'Art-Safe Products',
      description: 'Specialized cleaners safe for artwork and creative materials'
    },
    {
      icon: TreePine,
      title: 'Historic Preservation',
      description: 'Expertise in cleaning vintage and historic properties'
    },
    {
      icon: Camera,
      title: 'Photo-Ready Spaces',
      description: 'Instagram-worthy styling and social media preparation'
    }
  ];

  const creativeServices = [
    {
      title: 'Gallery Prep',
      description: 'Art show and exhibition cleaning',
      price: '$150-300',
      duration: '2-4 hours'
    },
    {
      title: 'Studio Maintenance',
      description: 'Regular creative space upkeep',
      price: '$120-200',
      duration: '2-3 hours'
    },
    {
      title: 'Event Staging',
      description: 'Party and event space preparation',
      price: '$200-400',
      duration: '3-6 hours'
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>House Cleaning South Congress Austin TX | Historic Home & Creative Space Cleaning | Aura Spring</title>
      <meta name="description" content="Professional house cleaning services in South Congress Austin. Specializing in historic homes, artist lofts, creative spaces, and boutique shops. Art-safe products and preservation expertise." />
      <meta name="keywords" content="house cleaning south congress austin, historic home cleaning austin, artist loft cleaning, creative space cleaning, soco cleaning service, vintage home cleaning austin, boutique cleaning, music venue cleaning austin" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="South Congress, Austin" />
      <meta name="geo.position" content="30.2515;-97.7507" />
      <meta name="ICBM" content="30.2515, -97.7507" />
      <link rel="canonical" href="https://aurasprings.com/areas/south-congress" />

      {/* Structured Data for Local SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "South Congress Austin House Cleaning Services",
          "description": "Professional house cleaning services for South Congress Austin historic homes and creative spaces",
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
            "name": "South Congress, Austin",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.2515,
              "longitude": -97.7507
            }
          },
          "serviceType": "Historic Home Cleaning Service"
        })
      }} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-pink-500 via-red-500 to-orange-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1514509253149-d2d00b17b65a?q=80&w=2940)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Music className="w-16 h-16 text-pink-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              South Congress
              <span className="block text-pink-200 mt-2">Creative Cleaning</span>
            </h1>
            <p className="text-xl text-pink-100 mb-4 max-w-3xl mx-auto">
              Specialized cleaning for historic homes, artist lofts, creative spaces, and the vibrant SoCo lifestyle
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Historic • Creative • Artistic • Authentic Austin
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SoCo-Specific Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-200"
              >
                <feature.icon className="w-10 h-10 mx-auto mb-3 text-pink-600" />
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
              <span className="text-gray-500">South Congress </span>
              <span className="text-pink-600">Cleaning Specialties</span>
            </h2>
            <p className="text-xl text-gray-400">
              Tailored services for historic properties and creative spaces
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
                <div className="bg-gradient-to-r from-pink-500 to-orange-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <service.icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-pink-100 mt-1">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{service.pricing}</div>
                      <div className="text-pink-200 text-sm">{service.frequency}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-pink-600" />
                        Duration: {service.duration}
                      </h4>
                      <div className="bg-pink-50 rounded-lg p-4">
                        <h5 className="font-semibold text-pink-800 mb-2">Perfect for:</h5>
                        <ul className="text-sm text-pink-700 space-y-1">
                          <li>• Historic South Congress homes</li>
                          <li>• Artist studios and creative lofts</li>
                          <li>• Boutiques and vintage shops</li>
                          <li>• Music venues and event spaces</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-pink-600" />
                        What's Included:
                      </h4>
                      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
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

      {/* Creative Services Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Creative Space Specialties
            </h2>
            <p className="text-lg text-gray-400">
              Unique services for South Congress creative community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {creativeServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-6 border border-pink-200 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-500 mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-pink-600">{service.price}</div>
                  <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* South Congress Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              South Congress Spaces We Serve
            </h2>
            <p className="text-lg text-gray-400">
              From historic homes to creative venues across SoCo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {southCongressSpots.map((spot, index) => (
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
                    <p className="text-pink-200">{spot.type}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-pink-600">{spot.area}</span>
                    <span className="text-sm font-semibold text-gray-500">{spot.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Specialized cleaning available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SoCo Culture Integration */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gray-500">Keep Austin </span>
                <span className="text-pink-600">Weird & Clean</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Music,
                    title: 'Music Scene Friendly',
                    description: 'We work around live music schedules, SXSW, ACL, and local venue events.'
                  },
                  {
                    icon: Palette,
                    title: 'Art & Creativity Safe',
                    description: 'Specialized products and techniques safe for artwork, musical instruments, and creative materials.'
                  },
                  {
                    icon: TreePine,
                    title: 'Historic Preservation',
                    description: 'Trained in caring for vintage properties and maintaining architectural integrity.'
                  },
                  {
                    icon: Coffee,
                    title: 'Local Culture Respect',
                    description: 'Understanding of South Congress lifestyle and community values.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-pink-600" />
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
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000"
                alt="South Congress creative space cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 border-2 border-pink-500">
                <Heart className="w-6 h-6 text-pink-600 mb-2" />
                <p className="font-bold text-gray-500">Keep SoCo</p>
                <p className="text-sm text-gray-400">Weird & Clean</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SoCo Statistics */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-orange-600">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              South Congress by the Numbers
            </h2>
            <p className="text-xl text-pink-100">
              Trusted by the SoCo creative community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '200+', label: 'Historic Properties', sublabel: 'Carefully maintained' },
              { number: '50+', label: 'Artist Studios', sublabel: 'Creativity preserved' },
              { number: '25+', label: 'Music Venues', sublabel: 'Event-ready spaces' },
              { number: '4.9★', label: 'Community Rating', sublabel: 'Local love' }
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
                <div className="text-sm text-pink-200 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 via-red-600 to-orange-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Keep SoCo Clean & Creative?
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Specialized cleaning that respects your creative space and historic property
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Creative Cleaning
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink-700 text-white font-bold rounded-lg hover:bg-pink-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call (512) 781-0527
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <Music className="w-8 h-8 mx-auto mb-2 text-pink-200" />
              <div className="text-sm font-semibold">Music Scene Friendly</div>
            </div>
            <div className="text-center">
              <Palette className="w-8 h-8 mx-auto mb-2 text-pink-200" />
              <div className="text-sm font-semibold">Art-Safe Products</div>
            </div>
            <div className="text-center">
              <TreePine className="w-8 h-8 mx-auto mb-2 text-pink-200" />
              <div className="text-sm font-semibold">Historic Preservation</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Local SEO Footer */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            <strong>Service Area:</strong> South Congress Avenue, SoCo District, Travis Heights, 
            Bouldin Creek, Zilker, South Austin, and surrounding historic neighborhoods
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/areas/downtown-austin" className="text-pink-600 hover:underline">Downtown Austin</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/east-austin" className="text-pink-600 hover:underline">East Austin</Link>
            <span className="text-gray-300">|</span>
            <Link href="/areas/west-lake-hills" className="text-pink-600 hover:underline">West Lake Hills</Link>
            <span className="text-gray-300">|</span>
            <Link href="/services" className="text-pink-600 hover:underline">All Services</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SouthCongressPage;