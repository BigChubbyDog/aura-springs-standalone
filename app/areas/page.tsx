'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Shield, Sparkles, Building2, Home, Users, ChevronRight, Phone, Calendar } from 'lucide-react';

const AreasPage = () => {
  const serviceAreas = [
    {
      name: 'Downtown Austin',
      slug: 'downtown-austin',
      zipCodes: '78701, 78702, 78703',
      image: 'https://images.unsplash.com/photo-1588993608283-7f0eda4438be?q=80&w=2940',
      description: 'High-rise condos, luxury penthouses, and premier office spaces',
      highlights: ['The Independent', 'Austonian Tower', '70 Rainey', 'The Bowie'],
      priceRange: '$150-$500',
      responseTime: 'Same Day Available'
    },
    {
      name: 'Rainey Street District',
      slug: 'rainey-street',
      zipCodes: '78701',
      image: 'https://images.unsplash.com/photo-1609918578226-e0ae5c3a5c43?q=80&w=2940',
      description: 'Austin\'s hottest high-rise district with stunning skyline views',
      highlights: ['44 East Ave', 'Millennium Rainey', 'Windsor on the Lake', 'Skyhouse Austin'],
      priceRange: '$175-$550',
      responseTime: '2-Hour Response'
    },
    {
      name: 'The Domain',
      slug: 'the-domain',
      zipCodes: '78758, 78759',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940',
      description: 'Upscale shopping district with modern luxury apartments',
      highlights: ['Domain Northside', 'Alexan', 'Standard Domain', 'Mosaic'],
      priceRange: '$125-$400',
      responseTime: 'Next Day Service'
    },
    {
      name: 'South Congress (SoCo)',
      slug: 'south-congress',
      zipCodes: '78704',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2940',
      description: 'Trendy neighborhood with boutique condos and unique homes',
      highlights: ['The Catherine', 'Soco Lofts', 'Travis Heights', 'Bouldin Creek'],
      priceRange: '$125-$375',
      responseTime: 'Same Week Booking'
    },
    {
      name: 'East Austin',
      slug: 'east-austin',
      zipCodes: '78702, 78721, 78723',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=2940',
      description: 'Hip area with modern developments and creative spaces',
      highlights: ['Arnold', 'Foundry Lofts', 'Platform', 'Corazon'],
      priceRange: '$100-$350',
      responseTime: 'Flexible Scheduling'
    },
    {
      name: 'West Lake Hills',
      slug: 'west-lake-hills',
      zipCodes: '78746, 78733',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940',
      description: 'Exclusive estates and luxury homes with hill country views',
      highlights: ['Westlake Hills', 'Rollingwood', 'Lake Austin', 'Barton Creek'],
      priceRange: '$200-$800',
      responseTime: 'White Glove Service'
    },
    {
      name: 'Cedar Park & Round Rock',
      slug: 'cedar-park',
      zipCodes: '78613, 78664, 78665',
      image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2940',
      description: 'Growing suburbs with modern homes and family communities',
      highlights: ['Avery Ranch', 'Brushy Creek', 'Twin Creeks', 'Teravista'],
      priceRange: '$100-$300',
      responseTime: 'Weekly Service'
    },
    {
      name: 'Mueller District',
      slug: 'mueller',
      zipCodes: '78723',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940',
      description: 'Sustainable urban village with modern green homes',
      highlights: ['Aldrich 51', 'Origin', 'Mosaic', 'Wildflower Terrace'],
      priceRange: '$125-$350',
      responseTime: 'Eco-Friendly Options'
    }
  ];

  const stats = [
    { number: '50+', label: 'High-Rise Buildings', icon: Building2 },
    { number: '2,500+', label: 'Happy Customers', icon: Users },
    { number: '15min', label: 'Average Response', icon: Clock },
    { number: '4.9★', label: 'Service Rating', icon: Star }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Service Areas | Luxury Cleaning in Austin TX | Aura Spring Cleaning</title>
      <meta name="description" content="Premium cleaning services across Austin's most prestigious neighborhoods. Downtown high-rises, Rainey Street, Domain, West Lake Hills. Same-day service available." />
      <meta name="keywords" content="austin cleaning service areas, downtown austin cleaning, rainey street cleaning, domain cleaning service, west lake hills maid service, luxury cleaning austin neighborhoods" />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=2940)',
            filter: 'brightness(0.4)'
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">
              Serving Austin's
            </span>
            <br />
            <span className="text-green-300">Premier Neighborhoods</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            From downtown high-rises to lakeside estates, we bring luxury cleaning to your doorstep
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-800">Choose Your </span>
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Neighborhood
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Location-based pricing • Priority scheduling • Specialized teams for each area
            </p>
          </motion.div>

          {/* Service Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/areas/${area.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {area.responseTime}
                    </div>
                    
                    {/* Area Name Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{area.name}</h3>
                      <p className="text-sm opacity-90">{area.zipCodes}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{area.description}</p>
                    
                    {/* Highlights */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Popular Buildings:</p>
                      <div className="flex flex-wrap gap-2">
                        {area.highlights.slice(0, 3).map(highlight => (
                          <span key={highlight} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {highlight}
                          </span>
                        ))}
                        {area.highlights.length > 3 && (
                          <span className="text-xs text-gray-500">+{area.highlights.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-xl font-bold text-green-600">{area.priceRange}</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-green-500 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Services by Area */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-800">Specialized Services </span>
              <span className="text-green-600">by Location</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Building2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">High-Rise Specialists</h3>
              <p className="text-gray-600 mb-4">
                Downtown & Rainey Street towers require special expertise. Our teams are trained for:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Floor-to-ceiling window cleaning
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Balcony & terrace detailing
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Concierge coordination
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Home className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Estate Cleaning</h3>
              <p className="text-gray-600 mb-4">
                West Lake Hills & Barton Creek estates receive white-glove treatment:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Multi-room deep cleaning
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Wine cellar & gym areas
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Pool house & guest quarters
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Airbnb Turnovers</h3>
              <p className="text-gray-600 mb-4">
                SoCo & East Austin short-term rentals need quick, reliable service:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  2-hour turnover service
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Linen management
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Supply restocking
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-500 to-blue-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Luxury Cleaning?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get location-based pricing instantly • Same-day service available
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Your Service
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              (512) 781-0527
            </a>
          </div>
          
          <div className="mt-12 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-300" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-300" />
              <span>4.9 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-300" />
              <span>On-Time Guarantee</span>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AreasPage;