'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Star, Clock, Users, ChevronRight, Map } from 'lucide-react';

const AustinLocations = () => {
  const [selectedArea, setSelectedArea] = useState('downtown');

  const locations: Record<string, any> = {
    downtown: {
      name: 'Downtown Austin',
      zip: '78701',
      description: 'The heart of Austin\'s urban living',
      image: '/images/downtown-austin.jpg',
      highlights: [
        'Luxury high-rise condos',
        'The Austonian & The Independent',
        'Rainey Street District',
        '2nd Street District'
      ],
      stats: {
        customers: '300+',
        responseTime: '2 hours',
        rating: '4.9'
      },
      specialties: [
        'High-rise window cleaning',
        'Penthouse deep cleaning',
        'Move-in/out services',
        'Same-day turnovers'
      ]
    },
    domain: {
      name: 'The Domain',
      zip: '78758',
      description: 'Austin\'s premier shopping and living destination',
      image: '/images/the-domain.jpg',
      highlights: [
        'Domain NORTHSIDE',
        'Rock Rose Avenue',
        'Luxury apartments',
        'Corporate housing'
      ],
      stats: {
        customers: '250+',
        responseTime: '3 hours',
        rating: '4.8'
      },
      specialties: [
        'Recurring maintenance',
        'Airbnb turnovers',
        'Post-construction cleanup',
        'Green cleaning options'
      ]
    },
    soco: {
      name: 'South Congress (SoCo)',
      zip: '78704',
      description: 'Eclectic neighborhood with vintage charm',
      image: '/images/soco-austin.jpg',
      highlights: [
        'Historic homes',
        'Modern condos',
        'Travis Heights',
        'Bouldin Creek'
      ],
      stats: {
        customers: '200+',
        responseTime: '2.5 hours',
        rating: '5.0'
      },
      specialties: [
        'Eco-friendly cleaning',
        'Pet-safe products',
        'Vintage home care',
        'Outdoor space cleaning'
      ]
    },
    eastaustin: {
      name: 'East Austin',
      zip: '78702',
      description: 'Creative hub with modern developments',
      image: '/images/east-austin.jpg',
      highlights: [
        'East 6th Street',
        'Mueller Development',
        'Holly Neighborhood',
        'Cherrywood'
      ],
      stats: {
        customers: '180+',
        responseTime: '2 hours',
        rating: '4.9'
      },
      specialties: [
        'Artist loft cleaning',
        'Restaurant residences',
        'New construction',
        'Weekly services'
      ]
    },
    westlake: {
      name: 'West Lake Hills',
      zip: '78746',
      description: 'Prestigious hillside community',
      image: '/images/westlake-hills.jpg',
      highlights: [
        'Luxury estates',
        'Lake Austin views',
        'Rollingwood',
        'Bee Cave'
      ],
      stats: {
        customers: '150+',
        responseTime: '4 hours',
        rating: '5.0'
      },
      specialties: [
        'Estate cleaning',
        'Pool house service',
        'Guest house prep',
        'Event cleanup'
      ]
    },
    zilker: {
      name: 'Zilker/Barton Hills',
      zip: '78704',
      description: 'Nature-centric urban living',
      image: '/images/zilker-austin.jpg',
      highlights: [
        'Barton Springs',
        'Zilker Park area',
        'Barton Hills',
        'South Lamar'
      ],
      stats: {
        customers: '220+',
        responseTime: '3 hours',
        rating: '4.9'
      },
      specialties: [
        'Green cleaning',
        'Family-safe products',
        'Patio/deck cleaning',
        'Seasonal deep cleans'
      ]
    }
  };

  const serviceFeatures = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Rapid Response',
      description: 'Same-day service for downtown properties'
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: 'High-Rise Experts',
      description: 'Specialized training for luxury buildings'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Local Teams',
      description: 'Dedicated crews for each neighborhood'
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: 'Area Knowledge',
      description: 'We know your building\'s specific needs'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#4c673d]">Serving Austin's</span>{' '}
            <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
              Premier Neighborhoods
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From downtown high-rises to lakeside estates, we bring our signature 
            cleaning excellence to every corner of Austin.
          </p>
        </motion.div>

        {/* Interactive Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Location Selector */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Your Area</h3>
            {Object.entries(locations).map(([key, location]) => (
              <motion.button
                key={key}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedArea(key)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  selectedArea === key
                    ? 'bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {location.name}
                    </div>
                    <div className={`text-sm mt-1 ${
                      selectedArea === key ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      ZIP: {location.zip}
                    </div>
                  </div>
                  {selectedArea === key && (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Location Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArea}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Area Header */}
                <div className="relative h-48 bg-gradient-to-r from-[#7c9768] to-[#4c673d]">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold mb-2">
                        {locations[selectedArea].name}
                      </h3>
                      <p className="text-white/90">
                        {locations[selectedArea].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 border-b border-gray-100">
                  <div className="p-4 text-center border-r border-gray-100">
                    <div className="text-2xl font-bold text-[#7c9768]">
                      {locations[selectedArea].stats.customers}
                    </div>
                    <div className="text-sm text-gray-600">Active Customers</div>
                  </div>
                  <div className="p-4 text-center border-r border-gray-100">
                    <div className="text-2xl font-bold text-[#443474]">
                      {locations[selectedArea].stats.responseTime}
                    </div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#4c673d]">
                      {locations[selectedArea].stats.rating}★
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Popular Areas We Serve</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {locations[selectedArea].highlights.map((highlight: string, index: number) => (
                        <motion.div
                          key={highlight}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#7c9768]" />
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Area Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {locations[selectedArea].specialties.map((specialty: string, index: number) => (
                        <motion.span
                          key={specialty}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-3 py-1 bg-gradient-to-r from-[#7c9768]/10 to-[#4c673d]/10 text-[#4c673d] rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Book Service in {locations[selectedArea].name}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Service Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {serviceFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-[#7c9768] to-[#4c673d] text-white mb-4">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Coverage Map CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#ddddde] to-white rounded-2xl p-8 text-center"
        >
          <Map className="w-12 h-12 text-[#7c9768] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Don't See Your Area?
          </h3>
          <p className="text-gray-600 mb-6">
            We're expanding! Contact us to check if we service your location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-semibold rounded-lg shadow-md"
            >
              Check Coverage
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-[#4c673d] font-semibold rounded-lg border-2 border-[#7c9768]"
            >
              View Full Map
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AustinLocations;